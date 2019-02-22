var sql = require('./server/public_sql');
var teach = require('./server/finish_teachSystem.js');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var validate = require('./server/public_validate.js');
var express = require('express');
var crypto = require('crypto');


var router = express.Router(); //路由
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
	res.header("Access-Control-Allow-Origin", 'http://192.168.137.1:8858'); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//处理跨域


server.get('/new', function(req, res) {
	if (req.session.style == 1) {
		res.write(JSON.stringify({
			xuehao: req.session.xuehao,
			selfgroup: req.session.selfgroup,
			name: req.session.name,
			style: 1
		}));
		res.end();
	}else{
		validate.prove(pool, req, res, 1);
	}
})

// server.all('*', function(req, res, next) {
// 	if (req.session.style != 1) {
// 		res.write(JSON.stringify({
// 			msg: "sesson失效",
// 			url: "跳转到登录页面",
// 			style: 0
// 		}));
// 		res.end();
// 	} else {
// 		next();
// 	}
// })


server.use('/person', router);


router.all('*', function(req, res, next) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		req.obj = querystring.parse(message);
		if (rexXuehao(req.obj.xuehao)) {
			var sqlString = sql.select(['xuehao'], 'registryinformation', 'xuehao=' + sql.escape(req.obj.xuehao));
			sql.sever(pool, sqlString, end); //验证学号唯一性
		} else {
			res.write(JSON.stringify({
				msg: "没有查询到这个学号",
				style: 0
			}));
			res.end();
		}

		function end(data) {
			if (data.length == 0) {
				next();
			} else {
				res.write(JSON.stringify({
					msg: "此学号已经绑定",
					style: -5
				}));
				res.end();
			}
		}
	})
})
//验证学号是否占用

router.post('/computer', function(req, res) {
	var findfirst = sql.select(['xuehao'], 'registryinformation', 'phoneNum=' + sql.escape(
		req.session.phone));
	sql.sever(pool, findfirst, function(data) {
		console.log(data[0].xuehao!=null);
		if (data.length != 1) {
			res.write(JSON.stringify({
				msg: "查询数据异常，数据库中电话不匹配",
				style: -3
			}));
			res.end();
		} else if (data[0].xuehao != null) {
			res.write(JSON.stringify({
				msg: "账号已经绑定学号",
				style: -2
			}));
			res.end();
		} else {
			var sqlString = sql.select(['zhuanye', 'banji', 'xingming', 'xingbie', 'xuehao'], 'studentinformation',
				'xuehao=' + sql.escape(
					req.obj.xuehao));
			sql.sever(pool, sqlString, end); 
		}
	});

	function end(data) {
		if (data.length == 1) {
			if (data[0].xingming == req.obj.name) {
				var sqlString = sql.update('registryinformation', ['zhuanye', 'banji', 'name', 'xingbie', 'xuehao', 'xueyuan'],
					[
						sql.escape(data[0].zhuanye), sql.escape(data[0].banji), sql.escape(data[0].xingming), sql.escape(data[0].xingbie),
						sql.escape(data[0].xuehao), "'计算机学院'"
					], 'phoneNum=' +
					sql.escape(req.session.phone));
				sql.sever(pool, sqlString, function() {
					res.write(JSON.stringify({
						msg: "身份绑定成功",
						style: 1
					}));
					res.end();
				});
			} else {
				res.write(JSON.stringify({
					msg: "姓名不一致",
					style: -1
				}));
				res.end();
			}
		} else {
			res.write(JSON.stringify({
				msg: "没有查询到这个学号",
				style: 0
			}));
			res.end();
		}

	}
})
//请求--计算机学院绑定账号

router.post('/teach', function(req, res) {
	var findfirst = sql.select(['xuehao'], 'registryinformation', 'phoneNum=' + sql.escape(
		req.session.phone));
	sql.sever(pool, findfirst, function(data) {
		if (data.length != 1) {
			res.write(JSON.stringify({
				msg: "查询数据异常，数据库中电话不匹配",
				style: -3
			}));
			res.end();
		} else if (data[0].xuehao != null) {
			res.write(JSON.stringify({
				msg: "已经绑定学号",
				style: -2
			}));
			res.end();
		} else {
			teach.prove(req.obj.xuehao, req.obj.password, req, res, end);
		}
	})

	function end(data) {
		var sqlString = sql.update('registryinformation', ['zhuanye', 'banji', 'name', 'xingbie', 'xuehao', 'xueyuan'],
			[
				sql.escape(data.zhuanye), sql.escape(data.banji), sql.escape(data.name), sql.escape(data.xingbie),
				sql.escape(data.xuehao), sql.escape(data.xueyuan)
			], 'phoneNum=' +
			sql.escape(req.session.phone));
		sql.sever(pool, sqlString, function() {
			res.write(JSON.stringify({
				msg: "身份绑定成功",
				style: 1
			}));
			res.end();
		});
	}

})
//请求--教务系统绑定账号


server.use('*', function(req, res, next) {
	var sqlString = sql.select(['style'], 'process');
	sql.sever(pool, sqlString, end); //验证报名时间

	function end(data) {
		if (data[0].style == 0) {
			next();
		} else {
			res.write(JSON.stringify({
				msg: "报名已截止！",
				style: 0
			}));
			res.end();
		}
	}
})
//验证报名时间 

server.post('/signin', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		var findfirst = sql.select(['selfgroup', 'xuehao'], 'registryinformation', 'phoneNum=' + sql.escape(
			req.session.phone));
		sql.sever(pool, findfirst, function(data) {
			if (data.length != 1) {
				res.write(JSON.stringify({
					msg: "查询数据异常，数据库中电话不匹配",
					style: -3
				}));
				res.end();
			} else if (data[0].xuehao == null) {
				res.write(JSON.stringify({
					msg: "还未完成身份信息",
					style: -2
				}));
				res.end();
			} else if (data[0].selfgroup != null) {
				var sqlString = sql.select(['phoneNum', 'password'], 'registryinformation', 'phoneNum=' + sql.escape(
					req.session.phone));
				sql.sever(pool, sqlString, end1);
			} else {
				var sqlupdate = sql.update('registryinformation', ['selfgroup'], [sql.escape(obj.selfgroup)], 'phoneNum=' +
					sql.escape(
						req.session.phone));
				sql.sever(pool, sqlupdate, function() {
					var sqlString = sql.select(['phoneNum', 'password'], 'registryinformation', 'phoneNum=' + sql.escape(
						req.session.phone));
					sql.sever(pool, sqlString, end2);
				});
			}
		})
	})

	function end1(data) {
		if (data.length == 1) {
			var cookieSend = "" + data[0].phoneNum + "~" + data[0].password + "~" + new Date().getTime(); //保存cookie验证，防止跨站session失效

			var str = JSON.stringify(cookieSend); //明文
			var secret = 'niyidingjiebuchulai'; //密钥--可以随便写
			var cipher = crypto.createCipher('aes192', secret);
			var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
			enc += cipher.final('hex'); //编码方式从转为hex;

			res.cookie('pbl', enc, {
				path: '/',
				maxAge: 5 * 1000,
				signed: true
			});
			res.write(JSON.stringify({
				msg: "组别已设置，请勿重复选择！",
				url: "http://127.0.0.1:8848/test/index.html", //跳转个人主页
				style: -1
			}));
			res.end();

		} else {
			res.write(JSON.stringify({
				msg: "查询数据异常，数据库中电话不匹配！",
				style: -3
			}));
			res.end();
		}
	}

	function end2(data) {
		if (data.length == 1) {
			var cookieSend = "" + data[0].phoneNum + "~" + data[0].password + "~" + new Date().getTime(); //保存cookie验证，防止跨站session失效

			var str = JSON.stringify(cookieSend); //明文
			var secret = 'niyidingjiebuchulai'; //密钥--可以随便写
			var cipher = crypto.createCipher('aes192', secret);
			var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
			enc += cipher.final('hex'); //编码方式从转为hex;

			res.cookie('pbl', enc, {
				path: '/',
				maxAge: 5 * 1000,
				signed: true
			});
			res.write(JSON.stringify({
				msg: "报名成功！",
				url: "http://127.0.0.1:8848/test/index.html", //跳转个人主页
				style: 1
			}));
			res.end();

		} else {
			res.write(JSON.stringify({
				msg: "查询数据异常，数据库中电话不匹配！",
				style: -3
			}));
			res.end();
		}
	}
})

server.listen(8083);


function rexJSJXuehao(text) {
	var reg = /^04[0-9]{6}$/;
	return reg.test(text);
}
//计算机学院人员信息

function rexXuehao(text) {
	var reg = /[0-9]{8}$/;
	return reg.test(text);
}
//计算机学院人员信息
