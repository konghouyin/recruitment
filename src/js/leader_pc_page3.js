var ajax = require('./public_Ajax.js').ajax;

exports.getmessage = function() {
	ajax({
		url: "http://localhost:8083/getstyle", //请求地址
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

