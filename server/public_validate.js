const sql = require('./public_sql.js');
const crypto = require('crypto');


module.exports = {
	prove: prove
}

function prove(pool,req, res) {
	let ss = req.signedCookies.pbl;
	var ans = decodeCookies(ss);
	if (ans.style == 0) {
		res.write(JSON.stringify({
			msg: "没有cookie！",
			style: 0,
			url: "登陆页面url"
		}));
		res.end();
	} else if (ans.style == -1) {
		res.write(JSON.stringify({
			msg: "cookie解析错误！",
			style: -1,
			url: "登陆页面url"
		}));
		res.end();
	} else if (ans.style == -2) {
		res.write(JSON.stringify({
			msg: "cookie超时！",
			style: -2,
			url: "登陆页面url"
		}));
		res.end();
	} else if (ans.style == 1) {
		var where = "phoneNum="+ans.name+" and "+"password="+ans.pass;
		var sqlString = sql.select(['*'],'registryinformation',where);
		sql.sever(pool,sqlString, function(data) {
			if (data.length == 1) {
				req.session.selfgroup = data[0].selfgroup;
				req.session.xuehao = data[0].xuehao;
				req.session.name = data[0].name;
				req.session.style = 1;
				res.write(JSON.stringify({
					xuehao: data[0].xuehao,
					selfgroup: data[0].selfgroup,
					name: data[0].name,
					style: 1
				}));
				res.end();
			} else {
				connection.release();
				res.write(JSON.stringify({
					msg: "两次验证不同！",
					style: -3,
					url: "登陆页面url"
				}));
				res.end();
			}
		});
	}


	function decodeCookies(ss) {
		let obj = {};
		if (!ss) {
			obj.style = 0; //没有cookie
			return obj;
		}

		const secret = 'niyidingjiebuchulai';
		let decipher = crypto.createDecipher('aes192', secret);
		try {
			var dec = decipher.update(ss, 'hex', 'utf8'); //编码方式从hex转为utf-8;
			dec += decipher.final('utf8'); //编码方式从utf-8;
		} catch (e) {
			obj.style = -1; //cookie解析错误
			return obj;
		}
		let out = JSON.parse(dec).split('~'); //这是解密后的结果
		obj.name = out[0];
		obj.pass = out[1];

		if (new Date() - out[2] < 5000) {
			obj.style = 1; //cookie正常
			return obj;
		} else {
			obj.style = -2; //cookie超时
			return obj;
		}
	}

}
