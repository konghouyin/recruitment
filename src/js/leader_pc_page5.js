var ajax = require('./public_Ajax.js').ajax;

exports.getmessage = getmessage;
var noticeall;
var noticequeue;

function getmessage() {
	ajax({
		url: "http://localhost:8083/notice", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			noticeall = JSON.parse(text).obj;
			publicInHtml();
		},
		fail: function(err) {
			alert("网络错误");
		}
	})

	ajax({
		url: "http://localhost:8083/noticequeue", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			noticequeue = JSON.parse(text).obj;
			queueInHtml();
		},
		fail: function(err) {
			alert("网络错误");
		}
	})
}

function publicInHtml() {
	var title = document.getElementsByClassName('title');
	var context = document.getElementsByClassName('context');
	for (var i = 0; i < 6; i++) {
		title[i].innerHTML = JSON.parse(noticeall[i].obj).title;
		context[i].innerHTML = JSON.parse(noticeall[i].obj).context;
	}
}

function queueInHtml() {
	var queue = document.getElementById('noticequeue');
	while (queue.children.length != 1) {
		queue.removeChild(queue.lastElementChild);
	}
	if(noticequeue.length==0){
		var wrap = document.createElement('div');
		wrap.setAttribute('class', 'notice-list');
		wrap.innerHTML="队列无数据";
		queue.appendChild(wrap);
	}

	for (var i = 0; i < noticequeue.length; i++) {
		var wrap = document.createElement('div');
		wrap.setAttribute('class', 'notice-list');
		var group = document.createElement('div');
		group.setAttribute('class', 'group');
		group.innerHTML = xz(noticequeue[i].type);
		var title = document.createElement('div');
		title.setAttribute('class', 'title');
		title.innerHTML = JSON.parse(noticequeue[i].obj).title;
		var context = document.createElement('div');
		context.setAttribute('class', 'context');
		context.innerHTML = JSON.parse(noticequeue[i].obj).context;
		var time = document.createElement('div');
		time.setAttribute('class', 'time');
		time.innerHTML = noticequeue[i].time.replace(/[TZ]/g, "  ").split('.')[0];

		var btn1 = document.createElement('div');
		btn1.setAttribute('class', 'btn1');
		btn1.innerHTML = "驳回";
		var btn2 = document.createElement('div');
		btn2.setAttribute('class', 'btn2');
		btn2.innerHTML = "通过";

		btn1.nonce = noticequeue[i].type;
		btn2.nonce = noticequeue[i].type;

		btn2.addEventListener('click', function(e) {
			pass(e.path[0].nonce);
		})
		btn1.addEventListener('click', function(e) {
			finish(e.path[0].nonce);
		})
		wrap.appendChild(group);
		wrap.appendChild(title);
		wrap.appendChild(context);
		wrap.appendChild(time);
		wrap.appendChild(btn1);
		wrap.appendChild(btn2);
		queue.appendChild(wrap);
	}

}

function xz(num) {
	if (num == 1) {
		return "Android"
	} else if (num == 2) {
		return "IOS"
	} else if (num == 3) {
		return "Web"
	} else if (num == 4) {
		return "后台"
	} else if (num == 5) {
		return "产品"
	}
}

var ajaxflag=1;


function pass(num) {
	if(ajaxflag!=1){
		return ;
	}
	ajaxflag=0;
	ajax({
		url: "http://localhost:8083/noticequeuepass", //请求地址
		type: 'get', //请求方式
		data: num, //请求json参数
		async: false, //是否异步
		success: function(text) {
			ajaxflag=1;
			alert(JSON.parse(text).msg);
			getmessage();
		},
		fail: function(err) {
			ajaxflag=1;
			alert("网络错误");
		}
	})
}

function finish(num) {
	if(ajaxflag!=1){
		return ;
	}
	ajaxflag=0;
	ajax({
		url: "http://localhost:8083/noticequeuefinish", //请求地址
		type: 'get', //请求方式
		data: num, //请求json参数
		async: false, //是否异步
		success: function(text) {
			ajaxflag=1;
			alert(JSON.parse(text).msg);
			getmessage();
		},
		fail: function(err) {
			ajaxflag=1;
			alert("网络错误");
		}
	})
}


var clear = document.getElementsByClassName('clear')[0];
var sysbtn = document.getElementsByClassName('sysnotice')[0];

clear.addEventListener('click', function() {
	title.value = "";
	context.value = "";
})

sysbtn.addEventListener('click', function() {
	if(title.value == ""){
		alert("请输入标题");
		return;
	}
	if(context.value == ""){
		alert("请输入内容");
		return;
	}
	if(ajaxflag!=1){
		return ;
	}
	ajaxflag=0;
	
	
	ajax({
		url: "http://localhost:8083/sysnotice", //请求地址
		type: 'post', //请求方式
		data: {
			title: title.value,
			context: context.value
		}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			ajaxflag=1;
			alert(JSON.parse(text).msg);
			getmessage();
		},
		fail: function(err) {
			ajaxflag=1;
			alert("网络错误");
		}
	})
})
