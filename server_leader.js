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
	res.header("Access-Control-Allow-Origin", 'http://localhost:8848'); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//处理跨域


server.get('/new', function(req, res) {
	validate.prove(pool, req, res, 1);
})

server.get('/allpeople', function(req, res) {
	var sqlString = sql.select(['xuehao', 'name', 'xueyuan', 'zhuanye', 'banji', 'xingbie', 'phoneNum', 'selfgroup',
		'level', 'pass', 'style'
	], 'registryinformation', 'xuehao<>""');
	sql.sever(pool, sqlString, end); //验证学号唯一性

	function end(data) {
		res.write(JSON.stringify({
			obj: data,
			msg: "数据查询成功",
			style: 1
		}));
		res.end();

	}
})

server.get('/peoplelist', function(req, res) {
	var sqlString = sql.select(['*'], 'personnelqueue');
	sql.sever(pool, sqlString, end); //验证学号唯一性

	function end(data) {
		var back = {
			"1": new Array(),
			"2": new Array(),
			"3": new Array(),
			"4": new Array(),
			"5": new Array()
		}
		for (var i = 0; i < data.length; i++) {
			back[data[i].selfgroup].push(data[i]);
		}


		res.write(JSON.stringify({
			obj: back,
			msg: "数据查询成功",
			style: 1
		}));
		res.end();

	}
})



server.post('/peoplepass', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		var selfgroup = obj.selfgroup;
		var num = -1;

		var deleteString = sql.del("personnelqueue", "selfgroup=" + sql.escape(selfgroup));

		var sqlString = sql.update('registryinformation', ['style'], ['2']);
		sqlString += " WHERE ";

		for (each in obj) {
			sqlString += "xuehao=" + obj[each] + " OR ";
			num++;
		}
		if (num == 0) {
			sql.sever(pool, deleteString, function() {
				res.write(JSON.stringify({
					msg: "审核通过" + num + "人",
					style: 1
				}));
				res.end();
			})
			return;
		}
		sqlString = sqlString.slice(0, -4);
		sql.sever(pool, sqlString, function() {
			sql.sever(pool, deleteString, function() {
				res.write(JSON.stringify({
					msg: "审核通过" + num + "人",
					style: 1
				}));
				res.end();
			})
		})
	})
})


server.get('/notice', function(req, res) {
	var sqlString = sql.select(['*'], 'notice');
	sql.sever(pool, sqlString, end); //验证学号唯一性

	function end(data) {
		res.write(JSON.stringify({
			obj: data,
			msg: "数据查询成功",
			style: 1
		}));
		res.end();

	}
})


server.get('/noticequeue', function(req, res) {
	var sqlString = sql.select(['*'], 'noticequeue');
	sql.sever(pool, sqlString, end); //验证学号唯一性

	function end(data) {
		res.write(JSON.stringify({
			obj: data,
			msg: "数据查询成功",
			style: 1
		}));
		res.end();

	}
})

server.get('/noticequeuepass', function(req, res) {
	var num = querystring.parse(req.url.split("?")[1])[0];

	var sqlString = sql.select(['obj'], 'noticequeue', 'type=' + sql.escape(num));
	sql.sever(pool, sqlString, end); //验证学号唯一性

	function end(data) {
		if (data.length == 1) {
			var sqlString = sql.update('notice', ['obj'], [sql.escape(data[0].obj)], 'type=' + sql.escape(num));
			sql.sever(pool, sqlString, function(data) {
				var deleteString = sql.del("noticequeue", "type=" + sql.escape(num));
				sql.sever(pool, deleteString, function(data) {
					res.write(JSON.stringify({
						obj: data,
						msg: "公告审核通过",
						style: 1
					}));
					res.end();
				})
			});
		} else {
			res.write(JSON.stringify({
				obj: data,
				msg: "公告队列没有此消息",
				style: 0
			}));
			res.end();
		}
	}
})


server.get('/noticequeuefinish', function(req, res) {
	var num = querystring.parse(req.url.split("?")[1])[0];

	var deleteString = sql.del("noticequeue", "type=" + sql.escape(num));
	sql.sever(pool, deleteString, function(data) {
		res.write(JSON.stringify({
			obj: data,
			msg: "公告已经驳回",
			style: 1
		}));
		res.end();
	})

})


server.post('/sysnotice', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj=querystring.parse(message);
		var sqlString = sql.update('notice', ['obj'], [sql.escape(JSON.stringify(obj))], 'type=6');
		sql.sever(pool, sqlString, function() {
			res.write(JSON.stringify({
				msg: "公告已添加",
				style: 1
			}));
			res.end();
		})
	})
})

server.listen(8083);
