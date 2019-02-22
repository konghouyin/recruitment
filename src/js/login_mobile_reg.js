var ajax = require('./public_Ajax.js').ajax;
var md5 = require('./public_md5.js');

var message_flag = 1; //ajax节流
var phone_btn = document.getElementsByClassName('phonebtn')[0];
var yhm = document.getElementById('reg_yhm');
var passwordinput = document.getElementById('reg_password');
var yzminput = document.getElementById('reg_yzm');

phone_btn.addEventListener('click', function() {
	var wrong = document.getElementsByClassName('wrong')[1];
	wrong.innerHTML = "";
	var returnflag = 0;

	if (yhm.value.length != 11) {
		wrong.innerHTML = "请输入11位手机号";
		yhm.style.borderBottom = "5px solid #f40";
		return;
	}
	if (message_flag != 1) {
		returnflag = 1;
	}
	if (returnflag) {
		return;
	}
	//判断条件

	open_reg(1);
	showpage(1);

	message_flag = 0;
	ajax({
		url: "http://192.168.137.1:8082/picyzm", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: true, //是否异步
		success: function(responseText) {
			reg_picyzm.value = "";
			message_flag = 1;
			var obj = JSON.parse(responseText);
			if (obj.style == 1) {
				var svg = document.getElementsByClassName('svg')[0];
				svg.innerHTML = obj.pic;
				showpage(3);
			} else {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "错 误"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "再试一次"
				showpage(2);
			}
		},
		fail: function(err) {
			reg_picyzm.value = "";
			message_flag = 1;
			var tittle = document.getElementsByClassName('reg-wrong')[0];
			tittle.innerHTML = "错 误"
			var msg = document.getElementsByClassName('back-mess')[1];
			msg.innerHTML = "网络错误，请稍后重试";
			var back = document.getElementsByClassName('back')[1];
			back.innerHTML = "再试一次"

			showpage(2);
		}
	});
})
//请求图片验证码

var back = document.getElementsByClassName('back')[1];
back.addEventListener('click', function() {
	showpage(1);
	open_reg(0);
})
//再试一次

var reg = document.getElementsByClassName('reg')[0];
var backimg = document.getElementsByClassName('backimg')[0];

yhm.addEventListener('focus', function() {
	yhm.style.borderBottom = "5px solid #ccc";
	reg.style.marginTop = "0";
	backimg.style.opacity="0";
})
passwordinput.addEventListener('focus', function() {
	passwordinput.style.borderBottom = "5px solid #ccc";
	reg.style.marginTop = "0";
	backimg.style.opacity="0";
})
yzminput.addEventListener('focus', function() {
	yzminput.style.borderBottom = "5px solid #ccc";
	reg.style.marginTop = "0";
	backimg.style.opacity="0";
})

yhm.addEventListener('blur', function() {
	reg.style.marginTop = "250px";
	backimg.style.opacity="1";
})
passwordinput.addEventListener('blur', function() {
	reg.style.marginTop = "250px";
	backimg.style.opacity="1";
})
yzminput.addEventListener('blur', function() {
	reg.style.marginTop = "250px";
	backimg.style.opacity="1";
})
//页面适配input显示，恢复红线




var picyzmbtn = document.getElementsByClassName('picyzmbtn')[0];
picyzmbtn.addEventListener('click', function() {
	var returnflag = 0;

	if (reg_picyzm.value.length != 4) {
		returnflag = 1;
		reg_picyzm.placeholder = "验证码错误";
		reg_picyzm.value = "";
		reg_picyzm.style.border = "3px solid #f40";
		return;
	}
	if (message_flag != 1) {
		returnflag = 1;
	}
	if (returnflag) {
		return;
	}
message_flag=0;

	ajax({
		url: "http://192.168.137.1:8082/phone", //请求地址
		type: 'post', //请求方式
		data: {
			phone: reg_yhm.value,
			picyzm: reg_picyzm.value
		}, //请求json参数
		async: true, //是否异步
		success: function(responseText) {
			message_flag = 1;
			var obj = JSON.parse(responseText);
			if (obj.style == 1) {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "成 功"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "返回"
				showpage(2);
			} else if (obj.style == 0) {
				reg_picyzm.placeholder = "验证码错误";
				reg_picyzm.value = "";
				reg_picyzm.style.border = "3px solid #f40";
			} else {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "错 误"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "再试一次"
				showpage(2);
			}
		},
		fail: function(err) {
			message_flag = 1;
			var tittle = document.getElementsByClassName('reg-wrong')[0];
			tittle.innerHTML = "错 误"
			var msg = document.getElementsByClassName('back-mess')[1];
			msg.innerHTML = "网络错误，请稍后重试";
			var back = document.getElementsByClassName('back')[1];
			back.innerHTML = "再试一次"

			showpage(2);
		}
	});
})
//验证图片验证码

reg_picyzm.addEventListener('focus', function() {
	reg_picyzm.placeholder = "输入图片验证码";
	reg_picyzm.value = "";
	reg_picyzm.style.border = "3px solid #ccc";
	var card = document.getElementsByClassName('pic')[1];
	console.log(card);
	card.style.margin="0 auto";
})

reg_picyzm.addEventListener('blur', function() {
	var card = document.getElementsByClassName('pic')[1];
	card.style.margin="200px auto";
})
//图片验证码-恢复,适配input

function showpage(e) {
	if (e == 1) {
		var loading = document.getElementsByClassName('loading')[1];
		loading.style.display = "block";
	} else if (e == 2) {
		var loading = document.getElementsByClassName('loading')[1];
		loading.style.display = "none";
		var wrongmessage = document.getElementsByClassName('wrong-message')[1];
		wrongmessage.style.display = "block";
	} else {
		var loading = document.getElementsByClassName('loading')[1];
		loading.style.display = "none";
		var wrongmessage = document.getElementsByClassName('wrong-message')[1];
		wrongmessage.style.display = "none";
	}
}
//提示页面翻动

function open_reg(e) {
	if (e == 1) {
		var regPic = document.getElementsByClassName('reg-pic')[0];
		regPic.style.display = 'block';
	} else {
		var regPic = document.getElementsByClassName('reg-pic')[0];
		regPic.style.display = 'none';
	}
}
//卡片显示隐藏


var picchange = document.getElementsByClassName('picchange')[0];
picchange.addEventListener('click', function() {
	message_flag = 0;
	ajax({
		url: "http://192.168.137.1:8082/picyzm", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: true, //是否异步
		success: function(responseText) {
			reg_picyzm.value = "";
			message_flag = 1;
			var obj = JSON.parse(responseText);
			if (obj.style == 1) {
				var svg = document.getElementsByClassName('svg')[0];
				svg.innerHTML = obj.pic;
				showpage(3);
			} else {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "错 误"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "再试一次"
				showpage(2);
			}
		},
		fail: function(err) {
			reg_picyzm.value = "";
			message_flag = 1;
			var tittle = document.getElementsByClassName('reg-wrong')[0];
			tittle.innerHTML = "错 误"
			var msg = document.getElementsByClassName('back-mess')[1];
			msg.innerHTML = "网络错误，请稍后重试";
			var back = document.getElementsByClassName('back')[1];
			back.innerHTML = "再试一次"

			showpage(2);
		}
	});
})

var reg_btn = document.getElementsByClassName('reg_btn')[0];
reg_btn.addEventListener('click', function() {
	var wrong = document.getElementsByClassName('wrong')[1];
	wrong.innerHTML = "";
	var returnflag = 0;

	if (reg_password.value.length < 6) {
		wrong.innerHTML = "密码长度6-18位";
		reg_password.style.borderBottom = "5px solid #f40";
		return;
	}
	if (reg_yzm.value.length != 6) {
		wrong.innerHTML = "请输入6位短信验证码";
		reg_yzm.style.borderBottom = "5px solid #f40";
		return;
	}
	if (message_flag != 1) {
		returnflag = 1;
	}
	if (returnflag) {
		return;
	}
	//判断条件

	open_reg(1);
	showpage(1);

	message_flag = 0;
	ajax({
		url: "http://192.168.137.1:8082/reg", //请求地址
		type: 'post', //请求方式
		data: {
			yzm: reg_yzm.value,
			password: md5.hex_md5(reg_password.value)
		} ,//请求json参数
		async: true, //是否异步
		success: function(responseText) {
			message_flag = 1;
			var obj = JSON.parse(responseText);
			if (obj.style == 1) {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "成 功"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "返回"
				showpage(2);
			} else {
				var tittle = document.getElementsByClassName('reg-wrong')[0];
				tittle.innerHTML = "错 误"
				var msg = document.getElementsByClassName('back-mess')[1];
				msg.innerHTML = obj.msg;
				var back = document.getElementsByClassName('back')[1];
				back.innerHTML = "再试一次"
				showpage(2);
			}
		},
		fail: function(err) {
			message_flag = 1;
			var tittle = document.getElementsByClassName('reg-wrong')[0];
			tittle.innerHTML = "错 误"
			var msg = document.getElementsByClassName('back-mess')[1];
			msg.innerHTML = "网络错误，请稍后重试";
			var back = document.getElementsByClassName('back')[1];
			back.innerHTML = "再试一次"

			showpage(2);
		}
	});
})
//注册请求
