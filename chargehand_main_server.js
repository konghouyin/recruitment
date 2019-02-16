const express = require('express');
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

app.post('/releaserule', function (req, res) {//添加打分标准 post请求 
  operation.releaseRules(req,res,pool);
})

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

app.get('/rankdetails', function (req, res) {//当前每面信息
    operation.rankDetails(req,res, pool);
});
app.get('/searchState',function(req,res){//查找当前面试进度，即第几面
  operation.searchState(res,pool);
})
app.get('/findSecond',function(req,res){//查找二面上次提交时间及打分记录
    operation.findSecond(req,res,pool);
});
app.post('/releasenotice', function (req, res) {//添加公告 添加至公告队列 发送邮件等待管理员审核
    operation.releaseNotice(req,res,pool)
})

app.get('/shownoticeque', function (req, res) {//查看公告队列
  operation.showNoticeQue(req,res,pool);
});
app.get('/shownotice', function (req, res) {//查看公告
  operation.showNotice(req,res,pool);
});

app.post('/selectviews',function(req,res){//通过人员选择
  operation.selectViews(req,res,pool);
})

app.get('/searchperson',function(req,res){//查找本组审核人员队列
  operation.searchPersQ(req,res,pool);
})
app.listen(8080);