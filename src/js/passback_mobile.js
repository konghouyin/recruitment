import css from './passback_mobile.css';
var ajax=require("./Ajax.js").ajax;
var hex_md5 = require("./md5.js").md5;
var passback_yzm=require("./passback_yzm.js").passback_yzm;
var passback_success=require("./passback_success.js").passback_success;

var html = document.querySelector('html');
var btn1_text=document.getElementsByClassName("btn1_text")[0];
var btn1_dlt=document.getElementsByClassName("btn1_dlt")[0];
btn1_dlt.addEventListener("mousedown",function(){
    btn1_text.value='';
})

var div = document.createElement("div"); //手机号码不等于11位
div.setAttribute("class","phone_noenf");
html.appendChild(div); 
var phone_noenf=document.getElementsByClassName("phone_noenf")[0];
phone_noenf.innerHTML="请输入11位手机号";
phone_noenf.style.display="none";

var see=document.getElementById("see");//眼睛
var btn3_text=document.getElementsByClassName("btn3_text")[0];
var set_count=0;
see.addEventListener("mousedown", function () {
    console.log(set_count);
    if(set_count%2){
        see.className  = "pass_notsee";
        btn3_text.type="text";
    }else if(btn3_text.value!='请设置新密码'){
        see.className  = "pass_see";
        btn3_text.type="password";
    }
    set_count++; 
})

passback_yzm();
passback_success();






