import '../style/public_reset.css';
import '../style/login_mobile_index.css';



var start = document.getElementsByClassName('button')[0];
var index = document.getElementsByClassName('index')[0];
var back = document.getElementsByClassName('img')[0];
var flash = document.getElementsByClassName('flash')[0];
var reg = document.getElementsByClassName('reg')[0];
var login = document.getElementsByClassName('login')[0];
start.addEventListener('click', function() {
	index.style.opacity="0";
	setTimeout(function(){
		index.style.display="none";
	},400);
	back.style.bottom=document.body.offsetHeight-600+"px";
	flash.classList.add("ship");
	login.style.display="block";
	setTimeout(function(){
		index.style.opacity="1";
	},2000);
})
