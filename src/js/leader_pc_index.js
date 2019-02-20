import '../style/public_reset.css';
import '../style/leader_pc_index.css';
import '../style/leader_pc_list.css';
import '../style/leader_pc_clock.css';
import '../leader_pc_index.html';
//引入样式模块


var pagechange = document.getElementsByTagName('ul')[0];
pagechange.addEventListener('click',function(e){
	if(e.path.length>7){
		showpage(e.path[e.path.length-8].nonce);
	}
})
//翻页

function showpage(num){
	var page = document.getElementsByClassName('page');
	for(var i=0;i<5;i++){
		if(i==num){
			page[i].style.display="block";
		}else{
			page[i].style.display="none";
		}
	}
}




var page1=require('./leader_pc_page1.js');
var page2=require('./leader_pc_page2.js');
var page4=require('./leader_pc_page4.js');
var page5=require('./leader_pc_page5.js');

function init(){
	page4.getmessage();
}
init();



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

