//解密cookie 再次验证用户名密码 比对时间5s之内 身份保存012 组别等存到session 下发 (req.session)
const crypto = require('crypto');

let decodeCookies = function(ss){
    let obj = {};
	//let ss = req.signedCookies.pbl; //这是user加密后的结果	赋值给变量ss
	const secret = 'niyidingjiebuchulai';
	let decipher = crypto.createDecipher('aes192', secret);
	try{
		let dec = decipher.update(ss, 'hex', 'utf8'); //编码方式从hex转为utf-8;
		dec += decipher.final('utf8'); //编码方式从utf-8;
	}catch(e){
		obj.style = 0;//登录异常
		return obj;
	}
	let out = JSON.parse(dec).split('~');//这是解密后的结果
	let obj = {
		name:out[0],
		pass:out[1],
		timeout:0
	}
	let timeNow = new Date();
	if(timeNow-out[2]<5000){
		if(obj.name.length==11){//根据登录账号长度区别是手机号还是学号，便于在数据库查找
			obj.nametype = "phoneNum";
		}else{
			obj.nametype = "xuehao";
		}
		obj.style = 1;
		return obj;
	}else{
		obj.timeout = 1;//登录跳转超时
		return obj;
	}
}

let myCallback = function(req,res,data){
	if(data.length==0){
		connection.release();
		res.write(JSON.stringify({msg:"登录异常！",style:0,url:"登陆页面url"}));
		res.end();
		return;
	}
	if(data[6].pass == obj.pass){
		req.session.group = data[8];
		req.session.level = data[9];
		connection.release();
		req.session.style = 1;
		res.write(JSON.stringify({msg:obj.name+"--登录成功！",style:1}));
		res.end();
		return;
	}
	else{
		connection.release();
		res.write(JSON.stringify({msg:"登录异常！！",style:0,url:"登陆页面url"}));
		res.end();
		return;
	}
}

exports.decodeCookies=decodeCookies;
exports.myCallback = myCallback;