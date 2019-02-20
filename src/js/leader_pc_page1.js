var ajax = require('./public_Ajax.js').ajax;


var Highcharts = require('./leader_highcharts.js').a;
Highcharts.setOptions({
	lang: {
		noData: '暂无数据'
	}
});
var options = {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	credits: {
		enabled: false
	},
	title: {},
	legend: {
		layout: 'vertical',
		align: 'center',
		maxHeight: 80,
		navigation: {
			activeColor: '#3E576F',
			animation: true,
			arrowSize: 12,
			inactiveColor: '#CCC',
			style: {
				fontWeight: 'bold',
				color: '#333',
				fontSize: '12px'
			}
		}
	},
	tooltip: {
		pointFormat: '{series.name}: {point.percentage:.1f}%<br>人数：{point.y}',
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: false
			},
			showInLegend: true
		}
	},

};

//引入绘图模块

var allPeopleMessage = new Array();

exports.getmessage = function getmessage() {
	ajax({
		url: "http://localhost:8083/allpeople", //请求地址
		type: 'get', //请求方式
		data: {}, //请求json参数
		async: false, //是否异步
		success: function(text) {
			var obj = JSON.parse(text).obj;
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].level == 1) {
					allPeopleMessage.push(obj[i]);
				}
			}
			showall();
		},
		fail: function(err) {
			alert("网络错误");
		}
	})
}
// 请求所有的人员数据

function showall() {
	var mid = midMessage();
	var side = sideMessage(allPeopleMessage);
	showMid(mid);
	showSide(side);
}
//数组筛选所有面试人员

function show(num) {
	var out = new Array();
	for (var i = 0; i < allPeopleMessage.length; i++) {
		if (allPeopleMessage[i].selfgroup == num) {
			out.push(allPeopleMessage[i]);
		}
	}
	var side = sideMessage(out);
	showSide(side);
}

function midMessage() {
	var back = {
		allnum: allPeopleMessage.length,
		group1: 0,
		group2: 0,
		group3: 0,
		group4: 0,
		group5: 0
	}

	for (var i = 0; i < allPeopleMessage.length; i++) {
		if (allPeopleMessage[i].selfgroup == 1) {
			back.group1++;
		} else if (allPeopleMessage[i].selfgroup == 2) {
			back.group2++;
		} else if (allPeopleMessage[i].selfgroup == 3) {
			back.group3++;
		} else if (allPeopleMessage[i].selfgroup == 4) {
			back.group4++;
		} else if (allPeopleMessage[i].selfgroup == 5) {
			back.group5++;
		}
	}
	return back;
}
//统计中间部分数据

function sideMessage(out) {
	var back = {
		biao: {
			"in1": 0,
			"pass1": 0,
			"in2": 0,
			"pass2": 0,
			"in3": 0,
			"pass3": 0
		},
		xingbie: {
			boy: 0,
			girl: 0
		},
		xueyuan: {
			"计算机学院": 0
		},
		zhuanye: {
			rj: 0,
			jk: 0,
			wl: 0,
			dsj: 0
		},
		nianji: {
			grand1: 0,
			grand2: 0
		}

	}



	for (var i = 0; i < out.length; i++) {
		if (out[i].xingbie == "男") {
			back.xingbie.boy++;
		} else if (out[i].xingbie == "女") {
			back.xingbie.girl++;
		}


		if (out[i].xueyuan == "计算机学院" && out[i].zhuanye == "软件工程") {
			back.zhuanye.rj++;
		} else if (out[i].xueyuan == "计算机学院" && out[i].zhuanye == "网络工程") {
			back.zhuanye.wl++;
		} else if (out[i].xueyuan == "计算机学院" && out[i].zhuanye == "计算机科学与技术") {
			back.zhuanye.jk++;
		} else if (out[i].xueyuan == "计算机学院" && out[i].zhuanye == "数据科学与大数据技术") {
			back.zhuanye.dsj++;
		}

		var rex1 = /[0-9]{2}18[0-9]{4}/;
		var rex2 = /[0-9]{2}17[0-9]{4}/;
		if (rex1.test(out[i].xuehao)) {
			back.nianji.grand1++;
		} else if (rex2.test(out[i].xuehao)) {
			back.nianji.grand2++;
		}


		if (back.xueyuan[out[i].xueyuan] == undefined) {
			back.xueyuan[out[i].xueyuan] = 0;
		}
		back.xueyuan[out[i].xueyuan]++;


		if (out[i].pass == 0) {
			back.biao["in1"]++;
		} else if (out[i].pass == 1 && out[i].style == 2) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
		} else if (out[i].pass == 1) {
			back.biao["in1"]++;
		} else if (out[i].pass == 2 && out[i].style == 2) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
			back.biao["in2"]++;
			back.biao["pass2"]++;
		} else if (out[i].pass == 2) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
			back.biao["in2"]++;
		} else if (out[i].pass == 3 && out[i].style == 2) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
			back.biao["in2"]++;
			back.biao["pass2"]++;
			back.biao["in3"]++;
			back.biao["pass3"]++;
		} else if (out[i].pass == 3) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
			back.biao["in2"]++;
			back.biao["pass2"]++;
			back.biao["in3"]++;
		} else if (out[i].pass == 4) {
			back.biao["in1"]++;
			back.biao["pass1"]++;
			back.biao["in2"]++;
			back.biao["pass2"]++;
			back.biao["in3"]++;
			back.biao["pass3"]++;
		}

	}
	return back;

}
//统计两侧数据

function showMid(mid) {
	var peopleNum = document.getElementsByClassName('people-num');
	peopleNum[0].innerHTML = parseInt(mid.allnum / 1000 % 10);
	peopleNum[1].innerHTML = parseInt(mid.allnum / 100 % 10);
	peopleNum[2].innerHTML = parseInt(mid.allnum / 10 % 10);
	peopleNum[3].innerHTML = parseInt(mid.allnum % 10);

	var num = document.getElementsByClassName('num');
	num[0].innerHTML = mid.group1;
	num[1].innerHTML = mid.group2;
	num[2].innerHTML = mid.group3;
	num[3].innerHTML = mid.group4;
	num[4].innerHTML = mid.group5;
	num[5].innerHTML = mid.allnum;
	options.title.text = "各组占比分布";
	options.legend.layout = 'horizontal';
	options.series = [{
		name: '占比',
		colorByPoint: true,
		data: [{
			name: 'Android',
			y: mid.group1,
		}, {
			name: 'IOS',
			y: mid.group2
		}, {
			name: 'Web',
			y: mid.group3
		}, {
			name: '后台',
			y: mid.group4
		}, {
			name: '产品',
			y: mid.group5
		}]
	}]

	var chart = Highcharts.chart('group-part', options);
}
//中间部分展示

function showSide(side) {
	options.title.text = "性别占比分布";
	options.legend.layout = 'vertical',
		options.series = [{
			name: '性别',
			colorByPoint: true,
			data: [{
				name: '男',
				y: side.xingbie.boy
			}, {
				name: '女',
				y: side.xingbie.girl
			}]
		}]
	var chart = Highcharts.chart('circle3', options);

	options.title.text = "专业占比分布";
	options.series = [{
		name: '专业',
		colorByPoint: true,
		data: [{
			name: '软件工程',
			y: side.zhuanye.rj
		}, {
			name: '网络工程',
			y: side.zhuanye.wl
		}, {
			name: '计算机科学与技术',
			y: side.zhuanye.jk
		}, {
			name: '大数据',
			y: side.zhuanye.dsj
		}]
	}]
	var chart = Highcharts.chart('circle2', options);


	var xy = new Array();
	for (each in side.xueyuan) {
		xy.push({
			name: each,
			y: side.xueyuan[each]
		})
	}

	options.title.text = "学院占比分布";
	options.series = [{
		name: '学院',
		colorByPoint: true,
		data: xy
	}]
	var chart = Highcharts.chart('circle1', options);

	options.title.text = "年级占比分布";
	options.series = [{
		name: '年级',
		colorByPoint: true,
		data: [{
			name: '大一',
			y: side.nianji.grand1
		}, {
			name: '大二',
			y: side.nianji.grand2
		}]
	}]
	var chart = Highcharts.chart('circle4', options);

	var writein = document.getElementsByClassName('writein');
	writein[0].innerHTML = side.biao.in1;
	writein[1].innerHTML = side.biao.in2;
	writein[2].innerHTML = side.biao.in3;
	writein[3].innerHTML = side.biao.pass1;
	writein[4].innerHTML = side.biao.pass2;
	writein[5].innerHTML = side.biao.pass3;
	if (side.biao.in1 == 0) {
		writein[6].innerHTML = "**"
	} else {
		writein[6].innerHTML = side.biao.pass1 / side.biao.in1 * 100 + "%";
	}
	if (side.biao.in2 == 0) {
		writein[7].innerHTML = "**"
	} else {
		writein[7].innerHTML = side.biao.pass2 / side.biao.in2 * 100 + "%";
	}
	if (side.biao.in3 == 0) {
		writein[8].innerHTML = "**"
	} else {
		writein[8].innerHTML = side.biao.pass3 / side.biao.in3 * 100 + "%";
	}

}
//使用实例



var groupchange = document.getElementsByClassName('group-change')[0];
groupchange.addEventListener('click',function(e){
	if(e.path.length>9){
		if(e.path[e.path.length-10].nonce<6){
			show(e.path[e.path.length-10].nonce);
		}else{
			showall();
		}
	}
})
//page1小组切换