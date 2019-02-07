const express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const validate = require('./server/public_validate.js');
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

app.use(cookieParser('sadssdasdasdasd'));
//为cookie添加签名，防篡改

var arr = [];
for (var i = 0; i < 10000; i++) {
	arr.push(Math.random() * 9999999 + "");
}
//生成加密数组作为秘钥
app.use(cookieSession({
	name: 'sess', //session名称
	keys: arr, //手动设置session密钥.这个秘钥必须是字符串数组
	maxAge: 20 * 60 * 1000 //手动设置session过期时间，单位为毫秒

}));
//设置session

/* 
app.use('/new', function (req, res) {//身份验证下发session
  validate.prove(pool,req,res);
});

app.use('*', function (req, res, next) {//查看session是否存在
  if (req.session) {
    next();//如果session存在，则可以进入
  } else if (!req.session) {
    res.write(JSON.stringify({ "msg": "抱歉，您未登录", "style": 0 ,"url":"登录页面url"}));
    res.end();
  }
}); */

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
  operation.searchMarkRules(req,res, pool);
});

app.get('/selfInfo', function (req, res) {//登陆者查看个人信息
  operation.serachSelfInfo(req,res, pool);
});

app.get('/searchinfobynum',function(req,res){//通过学号查找个人信息
    operation.searchInfoBynum(req,res, pool);
})
app.get('/viewgroupreg', function (req, res) {//查看报名数据
  operation.showInfoOfView(req,res, pool);
});

app.post('/firstmark', function (req, res) {//一面打分 前端参数为json字符串 时间问题
    operation.firstmark(req,res,pool,markText);
})
app.post('/secondmark',function(req,res){//二面打分
  operation.secondmark(req,res,pool);
})
app.get('/rank', function (req, res) {//查询每面排名数据
    operation.rank(req,res,pool);
});

app.get('/rankdetails', function (req, res) {//当前每面信息!!!
    operation.rankDetails(req,res, pool);
});


app.get('/searchState',function(req,res){//查找当前面试进度，即第几面
  operation.searchState(res,pool);
})
app.get('/findSecondTime',function(req,res){//查找二面上次提交时间
    operation.findSecondTime(req,res,pool,);

});
app.post('/addnotice', function (req, res) {//添加公告 添加至公告队列 发送邮件等待管理员审核
    operation.addNotice(req,res,pool)
})

app.get('/shownotice', function (req, res) {//查看公告
  operation.showNotice(req,res,pool);
});

app.post('/selectviews',function(req,res){
  operation.selectViews(req,res,pool);
})
app.listen(8080);