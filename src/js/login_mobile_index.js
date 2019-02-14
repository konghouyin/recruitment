import '../style/public_reset.css';
import '../style/login_mobile_index.css';
require('./login_mobile_login');
require('./login_mobile_reg');


var start = document.getElementsByClassName('button')[0];
var index = document.getElementsByClassName('index')[0];
var back = document.getElementsByClassName('img')[0];
var flash = document.getElementsByClassName('flash')[0];
var reg = document.getElementsByClassName('reg')[0];
var login = document.getElementsByClassName('login')[0];


start.addEventListener('click', function() {
	index.style.opacity = "0";
	setTimeout(function() {
		index.style.display = "none";
	}, 400);
	back.style.bottom = document.body.offsetHeight - 600 + "px";
	flash.classList.add("ship");
	login.style.display = "block";
	setTimeout(function() {
		login.style.opacity = "1";
	}, 2500);
})

var reg_jump = document.getElementsByClassName('reg_jump')[0];
reg_jump.addEventListener('click', function() {

	login.style.opacity = "0";
	setTimeout(function() {
		reg.style.display = "block";
	}, 300);
	setTimeout(function() {
		login.style.display = "none";
		reg.style.opacity = "1";
	}, 400);
})


var login_jump = document.getElementsByClassName('login_jump')[0];
login_jump.addEventListener('click', function() {
	var yhm = document.getElementById('login_yhm');
	var password = document.getElementById('login_password');
	var wrong = document.getElementsByClassName('wrong')[0];
	yhm.value = "";
	password.value = "";
	wrong.innerHTML = "";
	yhm.style.borderBottom = "5px solid #ccc";
	password.style.borderBottom = "5px solid #ccc"
	//恢复表单样式，避免之前的错误呈现
	
	reg.style.opacity = "0";
	setTimeout(function() {
		login.style.display = "block";
	}, 300);
	setTimeout(function() {
		reg.style.display = "none";
		login.style.opacity = "1";
	}, 400);
})

//组件跳转
