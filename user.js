





server.post('/computer', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		if (rexJSJXuehao(obj.xuehao)) {
			var sqlString = sql.select(['zhuanye', 'banji', 'xingming', 'xingbie'], 'studentinformation', "xuehao=" + sql.escape(
				obj.xuehao));
			sql.sever(pool, sqlString, end); //学号登录	
		} else {
			res.write(JSON.stringify({
				msg: "没有查询到这个学号",
				style: 0
			}));
			res.end();
		}
	})

	function end(data) {
		if (data.length == 1) {
			if (name == )
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



server.use('*', function(req, res, next) {
	var sqlString = sql.select(['style'], 'process');
	sql.sever(pool, sqlString, end); //验证报名时间

	function end(data) {
		if (data[0].style == 0) {
			next();
		} else {
			res.write(JSON.stringify({
				msg: "报名已截止！",
				style: -200
			}));
			res.end();
		}
	}
})
//验证报名时间 