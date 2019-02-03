var sql = require('./server/public_sql');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var validate = require('./server/public_validate.js');
var express = require('express');


var server = express(); //使用express框架
var pool = sql.createPool({
	host: '132.232.169.227',
	user: 'god',
	port: 3306,
	password: 'godmanager',
	database: 'recruitment'
});
//创建数据库连接池

server.use(cookieParser('sadssdasdasdasd'));
//为cookie添加签名，防篡改

var arr = [];
for (var i = 0; i < 10000; i++) {
	arr.push(Math.random() * 9999999 + "");
}
//生成加密数组作为秘钥
server.use(cookieSession({
	name: 'sess', //session名称
	keys: arr, //手动设置session密钥.这个秘钥必须是字符串数组
	maxAge: 20 * 60 * 1000 //手动设置session过期时间，单位为毫秒

}));
//设置session

server.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:8848'); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//处理跨域


server.get('/new',function(req,res){
	validate.prove(pool,req,res);
})



server.listen(8082);





















// server.post('/computer', function(req, res) {
// 	var obj = {};
// 	var message = '';
// 	req.on('data', function(data) {
// 		message += data;
// 	})
// 	req.on('end', function() {
// 		obj = querystring.parse(message);
// 		if (rexJSJXuehao(obj.xuehao)) {
// 			var sqlString = sql.select(['zhuanye', 'banji', 'xingming', 'xingbie'], 'studentinformation', "xuehao=" + sql.escape(
// 				obj.xuehao));
// 			sql.sever(pool, sqlString, end); //学号登录	
// 		} else {
// 			res.write(JSON.stringify({
// 				msg: "没有查询到这个学号",
// 				style: 0
// 			}));
// 			res.end();
// 		}
// 	})
// 
// 	function end(data) {
// 		if (data.length == 1) {
// 			if (name == )
// 		} else {
// 			res.write(JSON.stringify({
// 				msg: "没有查询到这个学号",
// 				style: 0
// 			}));
// 			res.end();
// 		}
// 
// 	}
// })
// //请求--计算机学院绑定账号
// 
// 
// 
// server.use('*', function(req, res, next) {
// 	var sqlString = sql.select(['style'], 'process');
// 	sql.sever(pool, sqlString, end); //验证报名时间
// 
// 	function end(data) {
// 		if (data[0].style == 0) {
// 			next();
// 		} else {
// 			res.write(JSON.stringify({
// 				msg: "报名已截止！",
// 				style: -200
// 			}));
// 			res.end();
// 		}
// 	}
// })
// //验证报名时间 