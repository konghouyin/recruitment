import css from './user_mobile.css';
var ajax=require("./Ajax.js").ajax;
var person_msg=require("./person_msg.js").person_msg;
var meet=require("./meet.js").meet;
var notice=require("./notice.js").notice;
var change=require("./change.js").change;


ajax({
    url: "http://192.168.137.1:8082/new",
    type: 'post',  
    data: null,
    async: true,
    success: function (responseText) {
        //空
    },
    fail: function (err) {
        //空
    }
});


//个人信息
person_msg();
//面试
meet();
//公告
notice();
//修改密码
change();