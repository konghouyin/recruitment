// import css from './perfect_msg_mobile.css';
// var ajax=require("./Ajax.js").ajax;
// var hex_md5 = require("./md5.js").md5;

var html = document.querySelector('html');
var btn1_text=document.getElementsByClassName("btn1_text")[0];
var btn1_dlt=document.getElementsByClassName("btn1_dlt")[0];
btn1_dlt.addEventListener("mousedown",function(){
    btn1_text.value='';
})

var div = document.createElement("div"); 
div.setAttribute("class","phone_noenf");//未输入信息
html.appendChild(div); 
var phone_noenf=document.getElementsByClassName("phone_noenf")[0];

// //new
// ajax({
//     url: "http://192.168.137.1:8082/new",
//     type: 'post',  
//     data: null,
//     async: true,
//     success: function (responseText) {
//         var response=JSON.parse(responseText);
//         if(response.style==1){
//             //
//         }else{
//             //提醒重试
//             phone_noenf.innerHTML="网络错误，请重试";
//         }
//     },
//     fail: function (err) {
//         //空
//     }
// });

phone_noenf.innerHTML="请输入正确信息";
phone_noenf.style.display="none";

var div = document.createElement("div"); 
div.setAttribute("class","cloth");//未输入信息
html.appendChild(div); 
var cloth=document.getElementsByClassName("cloth")[0];
var div = document.createElement("div"); 
div.setAttribute("class","msg_path2");//第二条身份的验证框
cloth.appendChild(div); 
var msg_path2=document.getElementsByClassName("msg_path2")[0];

var div = document.createElement("div"); 
div.setAttribute("class","msg2_headline");
msg_path2.appendChild(div); 
var msg2_headline=document.getElementsByClassName("msg2_headline")[0];

var div = document.createElement("div"); 
div.setAttribute("class","msg2_back");//后退键
console.log(msg2_headline);
msg2_headline.appendChild(div); 
var msg2_back=document.getElementsByClassName("msg2_back")[0];
console.log(msg2_back);//没插入成功

var div = document.createElement("div"); 
div.setAttribute("class","msg2_btn");
msg_path2.appendChild(div); 
var msg2_btn=document.getElementsByClassName("msg2_btn")[0];
var div = document.createElement("div"); 
div.setAttribute("class","msg2_head");
msg2_btn.appendChild(div); 
var input2 = document.createElement("input"); 
input2.setAttribute("class","msg2_text");
msg2_btn.appendChild(input2); 
var div = document.createElement("div"); 
div.setAttribute("class","msg2_con");
msg_path2.appendChild(div);
var msg2_con=document.getElementsByClassName("msg2_con")[0];
msg2_con.innerHTML='确定';

var msg2_head=document.getElementsByClassName("msg2_head")[0];
var msg2_text=document.getElementsByClassName("msg2_text")[0];

var arr = new Array(2);
btn1_text.addEventListener("input", function()//测试过并不正确
{
    if(btn1_text.value.length==2){
        arr=btn1_text.value.split("", 2);//"hello".split("", 3)	//可返回 ["h", "e", "l"]
    }
})
if(arr[1]==4){
    msg2_headline.innerHTML='请输入您的姓名';
    msg2_head.innerHTML='姓名';
    msg2_text.placeholder='请输入您的姓名';
}else{
    msg2_headline.innerHTML='请进行身份验证';
    msg2_head.innerHTML='密码';
    msg2_text.placeholder='请输入您的教务系统密码';
}
msg_path2.style.display="none";

cloth.style.display="none";
//确认按钮
var passback_con=document.getElementsByClassName("passback_con")[0];
passback_con.addEventListener("mousedown", function () {
    
    if(btn1_text.value!=''&&btn1_text.value.length==8)//学号不为空且为八位
    {
        cloth.style.display="block";
        msg_path2.style.display="block";
        ajax({
            url: "http://192.168.137.1:8082/完善信息",
            type: 'post',  
            data: {password:hex_md5(btn3_text.value),yhm:btn1_text.value},
            async: true,
            success: function (responseText) {
                var response=JSON.parse(responseText);
                //
            },
            fail: function (err) {
                //空
            }
        });
    }else{
        phone_noenf.style.display="block";
        setTimeout(function(){
           phone_noenf.style.display="none";
        },2500);

    }
})






