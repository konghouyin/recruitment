import css from './user_mobile.css';
var ajax=require("./Ajax.js").ajax;
var notice=require("./notice.js").notice;
var person_msg=require("./person_msg.js").person_msg;
var meet=require("./meet.js").meet;
var change=require("./change.js").change;

var notice_box=document.getElementsByClassName("notice_box")[0]; 
console.log(notice_box);
var person_box=document.getElementsByClassName("person_box")[0]; 
console.log(person_box);

ajax({
    url: "http://192.168.137.1:8082/new",
    type: 'post',  
    data: null,
    async: true,
    success: function (responseText) {
        var response=JSON.parse(responseText);
        if(response.style==1){
            //
        }else{
            //提醒重试
        }
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