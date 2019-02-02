const express = require('express');
const decryption = require('./server/public_decryption.js');
const sql = require('./server/public_sql.js');
const operation =require('./server/public_operation.js')

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
  user: 'admin',
  password: 'allsystem',
  database: 'recruitment'
});

// 解密cookie 再次验证用户名密码 比对时间5s之内 身份保存012 组别等存到session 下发 
//若session存在，则进行逻辑代码 

let result = {};
app.use('/new', function (req, res) {
  req.on('data', function (data) {
    message += data;
  })
  req.on('end', function (req,res) {
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
  });
});

function findGroupState(result) {
  let where = result.nametype + sql.escape(result.name);
  return sql.select(["*"], "registryinformation", where);
}

app.use('*',function (req, res, next) {//查看session是否存在
  if (req.session) {
    next();//如果session存在，则可以进入
  } else if (!req.session) {
    res.write(JSON.stringify({ "msg": "抱歉，您未登录", "style": 0 }));
    res.end();
  }
});

app.use('/addrule', function (req, res) {//添加打分标准
  let message = '';
  req.on('data', function (data) {
    message += data;
  });
  req.end('end', function () {
    //判断几面
    sql.server(pool, sql.select(["style"], "process"), function (data) {//一面开始前不能添加打分标准
      if (data == 0) {
        res.write(JSON.stringify({ "msg": "一面未开始，不能添加打分标准", "style": 0 }))
        res.end();
      } else {
        group = req.session.group;
        sql.sever(pool, sql.select(["obj"], "scoringstandard", "group" + sql.escape(group)), function (data) {//判断打分标准是否存在
          if (data != null) {
            res.write(JSON.stringify({ "msg": "已有打分标准", "style": 0 }))
            res.end();
          } else {
            sql.server(pool, sql.insert("scoringstandard", ["group", "obj"], [group, message]), function (data) {
              res.write(JSON.stringify({ "msg": "添加成功", "style": 1 }));
            });
          }
        });
      }
    })
  });
});
app.use('/delerule', function (req, res) {//删除打分标准
  let message = '';
  req.on('data', function (data) {
    message += data;
  });
  req.end('end', function () {
    group = req.session.group;
    sql.sever(pool, sql.select(["obj"], "scoringstandard", "group" + sql.escape(group)), function (data) {//判断打分标准是否存在
      if (data == null) {
        res.write(JSON.stringify({ "msg": "无打分标准", "style": 0 }))
        res.end();
        return;
      } else {//删除评分标准
        sql.server(pool, sql.del("scoringstandard", "group=" + group), function (data) {
          res.write(JSON.stringify({ "msg": "删除成功", "style": 1 }));
          res.end();
        });
      }
    });

  })
});
app.use('/selfInfo', function (req, res) {//查看个人信息
  req.on('data', function (data) {
    //等待封装完成继续编写
  });

});
app.listen(3306);