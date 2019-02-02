const express = require('express');
var querystring = require('querystring');
const decryption = require('./server/public_decryption_server.js');
const sql = require('./server/public_sql.js');
const operation = require('./server/public_operation.js')

let app = express();

app.all('*', function (req, res, next) {//cors跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});//主后台

let pool = sql.createPool({
  connectionLimit: 10,
  host: '132.232.169.227',
  user: 'god',
  password: 'godmanager',
  database: 'recruitment'
});

// 解密cookie 再次验证用户名密码 比对时间5s之内 身份保存012 组别等存到session 下发 
// 若session存在，则进行逻辑代码 

/* app.use('/new', function (req, res) {//身份验证下发session
  let result = {};
  let ss = req.signedCookies.pbl;
  result = decryption.decodeCookies(ss);
  if (result.style == 0) {//判断是否登陆异常
    res.write(JSON.stringify({ msg: "登录异常！", style: 0, url: "登陆页面url" }));
    res.end();
  } else if (result.timeout == 1) {//判断是否登陆超时
    res.write(JSON.stringify({ msg: "登录超时！", style: 0, url: "登陆页面url" }));
    res.end();
  } else {//查询数据库，下发session
    sql.sever(pool, findGroupState(result), function (data) {
      decryption.myCallback(req, res, data);
    });
  }
  function findGroupState(result) {
    let where = "phoneNum=" + sql.escape(result.name);
    return sql.select(["*"], "registryinformation", where);
  }
});
/*
app.use('*', function (req, res, next) {//查看session是否存在
  if (req.session) {
    next();//如果session存在，则可以进入
  } else if (!req.session) {
    res.write(JSON.stringify({ "msg": "抱歉，您未登录", "style": 0 }));
    res.end();
  }
});
 */
app.post('/addrule', function (req, res) {//添加打分标准 post请求 
  let message = "";
  req.on('data', function (data) {
    message += data;
  }); 
  req.end('end', function () { 
   sql.sever(pool, sql.select(["style"], "process"), function (data) {
      if (data[0].style == 0) {//一面前可以添加
        let selfgroup = req.session.selfgroup;
        sql.sever(pool, sql.select(["obj"], "scoringstandard", "selfgroup=" + selfgroup), function (data) {//判断打分标准是否存在
          if (!data.length) {//无打分标准
           sql.sever(pool, sql.insert("scoringstandard", ["selfgroup", "obj"], [selfgroup, message]), function (data) {
              res.write(JSON.stringify({ "msg": "添加成功", "style": 1 }));
              res.end();
            });
          } else {
            res.write(JSON.stringify({ "msg": "已有打分标准", "style": 0 }));
            res.end();
          }
        });
      } else {//面试已开始不能添加
        res.write(JSON.stringify({ "msg": "面试已开始，不能添加打分标准", "style": 0 }))
        res.end();
      }
    })
  });
});

app.post('/moderule', function (req, res) {//修改打分标准 一面前可修改
  let message = '';
  req.on('data', function (data) {
    message += data;
  });
  req.end('end', function () { 
   sql.sever(pool, sql.select(["style"], "process"), function (data) {
      if (data[0].style == 0) {//面试开始前可修改
        let selfgroup = req.session.selfgroup;
        sql.sever(pool, sql.select(["obj"], "scoringstandard", "selfgroup=" + selfgroup), function (data) {//判断打分标准是否存在
          if (data.length) {//已经添加过，则可修改
           sql.sever(pool, sql.update("scoringstandard", ["obj"], [message], "selfgroup=" + selfgroup), function (data) {
              res.write(JSON.stringify({ msg: "修改成功", style: 1 }));
              res.end();
            });
          } else {//未添加
            res.write(JSON.stringify({ msg: "无打分标准", style: 0 }))
            res.end();
          }
        });
      } else {
        res.write(JSON.stringify({ msg: "面试已开始，不能修改打分标准", style: 0 }))
        res.end();
      }
    })
  });
});

app.get('/searchrule', function (req, res) {//查询打分规则
  let result = req.session;
 //let result={selfgroup:3};
  operation.searchMarkRules(res, pool, result);
});

app.get('/selfInfo', function (req, res) {//登陆者查看个人信息 session
  let result = req.session;
  operation.serachSelfInfo(res, pool, result);
});

app.get('/viewgroupreg', function (req, res) {//查看报名数据
  let result = req.session;
  operation.showInfoOfView(res, pool, result);
});

app.get('/rank', function (req, res) {//查询每面排名数据
  let message = "";
  let result = req.session;
  res.on('data', function (data) {
    message += data;
  });
  req.on('end', function () {
    let num = querystring.parse(message);
    number = num.number;
    operation.rank(res,pool, result, number);
  })
});

app.post('/rankdetails', function (req, res) {//当前每面信息!!!
  let message = "";
  let result = req.session;
  res.on('data', function (data) {
    message += data;
  });
  req.on('end', function () {
    let num = querystring.parse(message);
    operation.rankDetails(res, pool, result, num.xuehao);
  })
});

app.post('/mark', function (req, res) {//打分 前端参数为json字符串
  let message = "";
  let markText = {};
  let result = req.session;
  res.on('data', function (data) {
    message += data;
  });
  req.on('end', function () {
    markText = JSON.parse(message);
    operation.mark(res,pool, result, markText);
  })
})
app.get('/searchState',function(req,res){//查找当前面试进度，即第几面
  operation.searchState(res,pool);
})
app.get('/findSecondTime',function(req,res){//查找二面上次提交时间
  let message = "";
  let obj={};
  req.on('data',function(data){
    message+=data;
  });
  req.on('end',function(){
    obj = querystring.parse(message);
    operation.findSecondTime(res,pool,obj.xuehao);
  });

});
/* app.post('/addnotice', function (req, res) {//添加公告 添加至公告队列 发送邮件等待管理员审核
  let noticeText = {};
  let message="";
  let group = req.session.selfgroup;
  req.on('on', function (data) {
    message+=data;
  });
  req.on('end',function(){
    noticeText = JSON.parse(message);
    operation.add
  })
  
}) */

app.get('/shownotice', function (req, res) {//查看公告
  let result = req.session;
  opertation.showNotice(res,pool, result);
  
});

app.listen(8080);