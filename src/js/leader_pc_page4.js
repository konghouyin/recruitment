var ajax = require('./public_Ajax.js').ajax;


Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}
//data格式化


var allPeopleMessage;
var now = new Array();
var group = {};
var page = 1; //查找默认其实页
var groups = document.getElementsByClassName('gpst');
var table = document.getElementById('main-list-message');

exports.getmessage = getmessage;

function getmessage() {
	ajax({
		url: "http://localhost:8083/peoplelist", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			allPeopleMessage = JSON.parse(text).obj;
			for (var i = 5; i >= 1; i--) {
				groups[i - 1].innerHTML = groups[i - 1].innerHTML.split('：')[0]
				groups[i - 1].innerHTML += "：" + allPeopleMessage[i].length
				group[i] = allPeopleMessage[i].length;
				if (group[i] != 0) {
					page = i;
				}
			}
			show(page);
		},
		fail: function(err) {
			alert("网络错误");
		}
	})
}

function show(num) {
	for (var i = 0; i < groups.length; i++) {
		groups[i].classList.remove('activeb');
	}
	groups[num - 1].classList.add('activeb');
	now = new Array();
	for (var i = 0; i < allPeopleMessage[num].length; i++) {
		if (allPeopleMessage[num][i].selfgroup == num) {
			now.push(allPeopleMessage[num][i]);
		}
	}
	var message = document.getElementsByClassName('message')[0];
	message.innerHTML = "总共" + now.length + "人（0/" + now.length + "）";
	inHtml();
}
//显示页面

function inHtml() {

	while (table.children.length != 1) {
		table.removeChild(table.lastElementChild);
	}
	if (now.length == 0) {
		return;
	}
	for (var n = 0; n < now.length; n++) {
		var tr = document.createElement('tr');
		if (n % 2 == 0) {
			tr.setAttribute('class', 'less');
		}
		tr.innerHTML = '<td><input class="inputlist" type="checkbox" value="' + now[n].xuehao + '" /></td>' +
			'<td>' + now[n].xuehao + '</td><td>' + now[n].name + '</td>' +
			'<td>' + xz(now[n].selfgroup) + '</td><td>' + new Date(now[n].time).format("yyyy-MM-dd hh:mm:ss") + '</td>' +
			'<td>' + lc(now[n].pass) + '</td>' + '<td>详细</td>'
		table.appendChild(tr);
	}
}
//添加页面


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


var change = document.getElementsByClassName('group-list')[0];
change.addEventListener('click', function(e) {
	if (e.path.length == 9) {
		var allinput = document.getElementsByClassName('allinput')[0];
		allinput.checked = false;
		show(e.path[0].nonce);
		page = e.path[0].nonce;
	}
})
//组别切换

table.addEventListener('click', function(e) {
	if (e.path.length == 13) {
		var list = document.getElementsByClassName('inputlist');
		if (e.path[0].nonce == 'all') {
			if (e.path[0].checked == true) {
				for (var i = 0; i < list.length; i++) {
					list[i].checked = true;
				}
			} else {
				for (var i = 0; i < list.length; i++) {
					list[i].checked = false;
				}
			}
		}
		changenum();
	}
})
//选中标记


function changenum() {
	var num = 0;
	var list = document.getElementsByClassName('inputlist');
	for (var i = 0; i < list.length; i++) {
		if (list[i].checked == true) {
			num++;
		} else {


		}
	}
	var allinput = document.getElementsByClassName('allinput')[0];
	if (num == now.length) {
		allinput.checked = true;
	} else {
		allinput.checked = false;
	}

	var message = document.getElementsByClassName('message')[0];
	message.innerHTML = "总共" + now.length + "人（" + num + "/" + now.length + "）";
}
//改变显示的选中个数

var passbtn = document.getElementsByClassName('passbtn')[0];
var ajaxflag = 1;

passbtn.addEventListener('click', function() {
	if (ajaxflag != 1) {
		return;
	}

	var send = {
		selfgroup:page,
	};
	var list = document.getElementsByClassName('inputlist');
	for (var i = 0; i < list.length; i++) {
		if (list[i].checked == true) {
			send[i] = list[i].value;
		}
	}

	ajaxflag = 0;
	ajax({
		url: "http://localhost:8083/peoplepass", //请求地址
		type: 'post', //请求方式
		data: send, //请求json参数
		async: false, //是否异步
		success: function(text) {
			ajaxflag = 1;
			back = JSON.parse(text);
			alert(back.msg);
			getmessage();
		},
		fail: function(err) {
			ajaxflag = 1;
			alert("网络错误");
		}
	})


})
//人员通过请求
