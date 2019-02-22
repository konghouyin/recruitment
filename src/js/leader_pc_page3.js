var ajax = require('./public_Ajax.js').ajax;
var style;
var alllist;
var passlist;

exports.getmessage = getmessage;

function getmessage() {
	ajax({
		url: "http://localhost:8083/getstyle", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			console.log(JSON.parse(text));
			style = JSON.parse(text).obj.style;
			alllist = JSON.parse(text).obj.message;
			showstyle();
			showmgroup(1);
		},
		fail: function(err) {
			alert("网络错误");
		}
	})
}
var ajaxflag=1;
var list = document.getElementsByClassName('liucheng-show')[0];

function showstyle() {
	for (var i = 0; i < 5; i++) {
		if (i < style) {
			list.children[i].className = "old";
		} else if (i == style) {
			list.children[i].className = "now";
		} else {
			list.children[i].className = "new";
		}
	}
}
//显示当前面试流程


function showmgroup(num){
	var groups = document.getElementsByClassName('ap');
	for (var i = 0; i < groups.length; i++) {
		groups[i].classList.remove('activeb');
		groups[i].classList.remove('error');
	}
	groups[num - 1].classList.add('activeb');
	
	
}
//显示面试安排计划



list.addEventListener('click', function(e) {
	if (e.path.length == 12) {
		if (e.path[0].nonce != style + 1) {
			alert("操作非法，只能将面试流程调整到下一面");
		} else {
			if(ajaxflag!=1){
				return ;
			}
			if (confirm("是否确认将面试调整到" + lc(style + 1))) {
				ajax({
					url: "http://localhost:8083/changestyle", //请求地址
					type: 'post', //请求方式
					data: {styleto:(style+1)}, //请求json参数
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
		}
	}
})

function lc(num) {
	if (num == 0) {
		return "报名"
	} else if (num == 1) {
		return "一面"
	} else if (num == 2) {
		return "二面"
	} else if (num == 3) {
		return "三面"
	} else if (num == 4) {
		return "进入实验室"
	}
}
//面试流程文字切换








