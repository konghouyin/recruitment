
var Highcharts = require('highcharts');//引入基本模块
require('highcharts/modules/exporting')(Highcharts);// 引入导出模块

Highcharts.setOptions({
    lang:{
       contextButtonTitle:"图表导出菜单",
       decimalPoint:".",
       downloadJPEG:"下载JPEG图片",
       downloadPDF:"下载PDF文件",
       downloadPNG:"下载PNG文件",
       downloadSVG:"下载SVG文件",
       drillUpText:"返回 {series.name}",
       loading:"加载中",
       months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       noData:"没有数据",
       numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
       printChart:"打印图表",
       resetZoom:"恢复缩放",
       resetZoomTitle:"恢复图表",
       shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
       thousandsSep:",",
       weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
    }
}); 
//全局中文化配置
exports.a=Highcharts;



// var options = {
// 	chart: {
// 		type: 'line' //指定图表的类型，默认是折线图（line）
// 	},
// 	title: {
// 		text: '我的第一个图表' // 标题
// 	},
// 	xAxis: {
// 		categories: ['苹果', '香蕉', '橙子'] // x 轴分类
// 	},
// 	yAxis: {
// 		title: {
// 			text: '吃水果个数' // y 轴标题
// 		}
// 	},
// 	series: [{ // 数据列
// 		name: '小明', // 数据列名
// 		data: [1, 4, 4] // 数据
// 	}, {
// 		name: '小红',
// 		data: [5, 2, 3]
// 	}]
// };
// // 图表初始化函数
// 
// Highcharts.chart('container',options);
// 使用实例

