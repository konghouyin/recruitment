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


server.get('/new', function(req, res) {
	validate.prove(pool, req, res, 1);
})

// server.all('*', function(req, res, next) {
// 	if (req.session.style != 1) {
// 		res.write(JSON.stringify({
// 			msg: "sesson失效",
// 			url: "跳转到登录页面",
// 			style: -200
// 		}));
// 		res.end();
// 	} else {
// 		next();
// 	}
// })



// 具体业务
const operation = require('./server/public_operation.js');

server.get('/personmessage', function() { //查询个人信息
	operation.serachSelfInfo(req, res, pool);
})


server.get('/notice', function() { //查询公告
	operation.showNotice(req, res, pool);
})


server.get('/style', function(req, res) { //查找当前面试进度，即第几面
	operation.searchState(res, pool);
})

server.post('passchange', function() { //修改密码
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		var obj = querystring.parse(message);
		var sqlString = sql.select(['password'], 'registryinformation', 'phoneNum=' + sql.escape(req.session.phone));
		sql.sever(pool, sqlString, end); //验证学号唯一性
	})

	function end(data) {
		if (data.length != 1) {
			res.write(JSON.stringify({
				msg: "session记录电话不匹配",
				style: -1
			}));
			res.end();
		} else if (data[0].password != obj.old) {
			res.write(JSON.stringify({
				msg: "旧密码错误",
				style: -2
			}));
			res.end();
		} else {
			var sqlString = sql.update('registryinformation', ['password'],
				[
					sql.escape(obj.new)
				], 'phoneNum=' +
				sql.escape(req.session.phone));
			sql.sever(pool, sqlString, function() {
				res.write(JSON.stringify({
					msg: "密码修改成功",
					style: 1
				}));
				res.end();
			});
		}
	}

})


server.listen(8082);
