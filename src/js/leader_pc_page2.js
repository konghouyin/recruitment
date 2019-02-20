var ajax = require('./public_Ajax.js').ajax;

var allPeopleMessage;
var now = new Array();
var page = {};

exports.getmessage = function() {
	ajax({
		url: "http://localhost:8083/allpeople", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			allPeopleMessage = JSON.parse(text).obj;
			showlist(0, -1, -1, 0, 1);
		},
		fail: function(err) {
			alert("网络错误");
		}
	})
}

function showlist(selfgroup, pass, style, grand, level) {
	now = new Array();
	now = selfgroupF(selfgroup, allPeopleMessage);
	now = passF(pass, now);
	now = styleF(style, now);
	now = grandF(grand, now);
	now = levelF(level, now);
	pageF();
}
//筛选符合条件的数组

function showxuehao(xuehao) {
	now = new Array();
	for (var i = 0; i < allPeopleMessage.length; i++) {
		if (allPeopleMessage[i].xuehao == xuehao) {
			now.push(allPeopleMessage[i]);
			break;
		}
	}
	pageF();
}
//学号查询


var changepage = document.getElementsByClassName('changepage')[0];

function pageF() {
	page.all = (parseInt(now.length / 15) * 15 == now.length) ? (now.length / 15) : (parseInt(now.length / 15) + 1);
	page.now = 1;
	for (var i = 1; changepage.children.length != 2;) {
		changepage.children[1].remove();
	}
	for (var i = 1; i <= page.all; i++) {
		var dom = document.createElement('div');
		dom.setAttribute('class', 'pointer');
		dom.innerHTML = i;
		dom.nonce = i
		changepage.insertBefore(dom, changepage.lastElementChild);
	}
	if (now.length != 0) {
		changepage.children[1].classList.add('active');
	}

	pageto(1);

}
//计算页数，生成翻页按钮

changepage.addEventListener('click', function(e) {
	if (e.path.length == 10) {
		if (e.path[0].nonce == 'pre') {
			if (page.now != 1) {
				pageto(parseInt(page.now) - 1);
			}
		} else if (e.path[0].nonce == 'next') {
			if (page.now != page.all) {
				pageto(parseInt(page.now) + 1);
			}
		} else {
			if (page.now != e.path[0].nonce) {
				pageto(parseInt(e.path[0].nonce));
			}
		}

	}
})
//翻页按钮点击事件

function pageto(num) {
	changepage.children[page.now].classList.remove('active');
	if (now.length != 0) {
		changepage.children[num].classList.add('active');
	}
	page.now = num;
	var start;
	var end;

	var message = document.getElementsByClassName('left')[0];
	if (now.length == 0) {
		start = 0;
		end = 0;
	} else if (page.now != page.all) {
		start = page.now * 15 - 14;
		end = page.now * 15;
	} else {
		start = page.now * 15 - 14;
		end = now.length;
	}
	console.log(start, end);
	message.innerHTML = "查询到：" + now.length + "条数据---本页显示" + start + "-" + end;
	inHtml(start, end)

}
//翻页x页
function inHtml(start, end) {
	while (personlist.children.length != 1) {
		personlist.removeChild(personlist.lastElementChild);
	}
	if (now.length == 0) {
		return;
	}
	for (var n = start - 1; n < end; n++) {
		var tr = document.createElement('tr');
		if (n % 2 == 0) {
			tr.setAttribute('class', 'less');
		}
		tr.innerHTML = "<td>" + qx(now[n].level) + "</td><td>" + now[n].xuehao + "</td><td>" + now[n].name + "</td>" +
			"<td>" + now[n].xueyuan + "/" + now[n].zhuanye + "/" + now[n].banji + "</td>" +
			"<td>" + now[n].phoneNum + "</td><td>" + lc(now[n].pass) + "</td><td>" + zt(now[n].style) + "</td><td>详细</td>";
		personlist.appendChild(tr);
	}
}
//添加元素

function qx(num) {
	if (num == 1) {
		return "面试者"
	} else if (num == 2) {
		return "组员"
	} else if (num == 3) {
		return "组长"
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

function zt(num) {
	if (num == 0) {
		return "未面试"
	} else if (num == 1) {
		return "待审核"
	} else if (num == 2) {
		return "通过"
	} else if (num == 3) {
		return "未通过"
	}
}
//数值转义


function selfgroupF(num, list) {
	var back = new Array();
	if (num == 0) {
		return list;
	} else {
		for (var i = 0; i < list.length; i++) {
			if (list[i].selfgroup == num) {
				back.push(list[i])
			}
		}
		return back;
	}
}

function passF(num, list) {
	var back = new Array();
	if (num == -1) {
		return list;
	} else {
		for (var i = 0; i < list.length; i++) {
			if (list[i].pass == num) {
				back.push(list[i])
			}
		}
		return back;
	}
}

function styleF(num, list) {
	var back = new Array();
	if (num == -1) {
		return list;
	} else {
		for (var i = 0; i < list.length; i++) {
			if (list[i].style == num) {
				back.push(list[i])
			}
		}
		return back;
	}
}

function levelF(num, list) {
	var back = new Array();
	for (var i = 0; i < list.length; i++) {
		if (list[i].level == num) {
			back.push(list[i])
		}
	}
	return back;
}

function grandF(num, list) {
	if (num == 0) {
		return list;
	}
	var back = new Array();
	var rex1 = /[0-9]{2}18[0-9]{4}/;
	var rex2 = /[0-9]{2}17[0-9]{4}/;
	for (var i = 0; i < list.length; i++) {
		if (num == 1 && rex1.test(list[i].xuehao)) {
			back.push(list[i])
		} else if (num == 2 && rex2.test(list[i].xuehao)) {
			back.push(list[i])
		}
	}
	return back;
}
//筛选规则

var searchbtn = document.getElementsByClassName('searchbtn')[0];
searchbtn.addEventListener('click', function() {
	var select = document.getElementsByTagName('select');
	showlist(select[0].value, select[1].value, select[2].value, select[3].value, select[4].value);
})

var searchxuehao = document.getElementById('search-xuehao')
searchxuehao.addEventListener('blur', function() {
	if (searchxuehao.value.length == 8) {
		showxuehao(searchxuehao.value);
	}
})
