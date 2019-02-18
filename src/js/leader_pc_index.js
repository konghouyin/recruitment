import '../style/public_reset.css';
import '../style/leader_pc_index.css';
import '../style/leader_pc_list.css';
import '../style/leader_pc_clock.css';
import '../leader_pc_index.html';
//引入样式模块


var Highcharts = require('./leader_highcharts.js').a;
//引入绘图模块

// 图表初始化函数

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
	title: {
		text: '各组占比分布'
	},
	legend: {
		layout: 'horizontal',
		align: 'center',

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
	series: [{
		name: '占比',
		colorByPoint: true,
		data: [{
			name: 'Android',
			y: 120,
		}, {
			name: 'IOS',
			y: 55
		}, {
			name: 'Web',
			y: 210
		}, {
			name: '后台',
			y: 157
		}, {
			name: '产品',
			y: 32
		}]
	}]
};


var chart = Highcharts.chart('circle1', options);
var chart = Highcharts.chart('circle2', options);
var chart = Highcharts.chart('circle3', options);
var chart = Highcharts.chart('circle4', options);
var chart = Highcharts.chart('group-part', options);
//使用实例


$(function() {
	$("#ECalendar_date_start").ECalendar({
		type: "time", //模式，time: 带时间选择; date: 不带时间选择;
		offset: [0, 2], //弹框手动偏移量;
		stamp: false,
		skin: '#2E8AFE',
		format: "yyyy-mm-dd hh:ii",
		step: 30, //选择时间分钟的精确度;
		callback: function(v, e) {} //回调函数
	});
	$("#ECalendar_date_end").ECalendar({
		type: "time", //模式，time: 带时间选择; date: 不带时间选择;
		offset: [0, 2], //弹框手动偏移量;
		stamp: false,
		skin: '#2E8AFE',
		step: 30, //选择时间分钟的精确度;
		callback: function(v, e) {} //回调函数
	});
})
