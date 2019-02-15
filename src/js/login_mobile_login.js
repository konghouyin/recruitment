var ajax = require('./public_Ajax.js').ajax;
var md5 = require('./public_md5.js');

var message_flag = 1; //ajax节流
var btn = document.getElementsByClassName('login_btn')[0];
var yhm = document.getElementById('login_yhm');
var password = document.getElementById('login_password');

btn.addEventListener('click', function() {
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.innerHTML = "";
	var returnflag = 0;
	if (!(yhm.value.length == 11 || yhm.value.length == 8)) {
		returnflag = 1;
		wrong.innerHTML = "请输入正确的学号或手机号<br>";
		yhm.style.borderBottom = "5px solid #f40"
	}
	if (password.value.length == 0) {
		returnflag = 1;
		wrong.innerHTML += "请输入密码";
		password.style.borderBottom = "5px solid #f40"
	}
	if (message_flag != 1) {
		returnflag = 1;
	}

	if (returnflag) {
		return;
	}
	//判断是否发送ajax
	var loginPic = document.getElementsByClassName('login-pic')[0];
	loginPic.style.display = 'block';


	message_flag = 0;
	ajax({
		url: "http://192.168.137.1:8082/login", //请求地址
		type: 'post', //请求方式
		data: {
			yhm: yhm.value,
			password: md5.hex_md5(password.value)
		}, //请求json参数
		async: true, //是否异步
		success: function(responseText) {
			var mess = JSON.parse(responseText)
			message_flag = 1;
			if (mess.style == 1) {
				window.location.href = mess.url;
			} else {
				var msg = document.getElementsByClassName('back-mess')[0];
				msg.innerHTML = mess.msg;
				var loading = document.getElementsByClassName('loading')[0];
				loading.style.display = "none";
			}
		},
		fail: function(err) {
			message_flag = 1;
			var msg = document.getElementsByClassName('back-mess')[0];
			msg.innerHTML = "网络错误，请稍后重试";
			var loading = document.getElementsByClassName('loading')[0];
			loading.style.display = "none";

		}
	});
})
//请求登录
var login = document.getElementsByClassName('login')[0];
var backimg = document.getElementsByClassName('backimg')[0];

yhm.addEventListener('focus', function() {
	yhm.style.borderBottom = "5px solid #ccc";
		login.style.marginTop = "0";
		backimg.style.opacity="0";
})
password.addEventListener('focus', function() {
	password.style.borderBottom = "5px solid #ccc";
		login.style.marginTop = "0";
		backimg.style.opacity="0";
})
//还原红色文本
yhm.addEventListener('blur', function() {
		login.style.marginTop = "250px";
		backimg.style.opacity="1";

})
password.addEventListener('blur', function() {
		login.style.marginTop = "250px";
		backimg.style.opacity="1";
})


var back = document.getElementsByClassName('back')[0];
back.addEventListener('click', function() {
	var loading = document.getElementsByClassName('loading')[0];
	loading.style.display = "block";
	var loginPic = document.getElementsByClassName('login-pic')[0];
	loginPic.style.display = 'none';
})
//再试一次

