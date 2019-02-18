// import css from './change_pass_mobile.css';
// var ajax=require("./Ajax.js").ajax;
// var hex_md5 = require("./md5.js").md5;

var html = document.querySelector('html');
var btn1_text=document.getElementsByClassName("btn1_text")[0];
var btn2_text=document.getElementsByClassName("btn2_text")[0];
var btn1_dlt=document.getElementsByClassName("btn1_dlt")[0];
btn1_dlt.addEventListener("mousedown",function(){
    btn1_text.value='';
})
var btn2_dlt=document.getElementsByClassName("btn2_dlt")[0];
btn2_dlt.addEventListener("mousedown",function(){
    btn2_text.value='';
})

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

var div = document.createElement("div"); 
div.setAttribute("class","phone_noenf");//未输入信息
html.appendChild(div); 
var phone_noenf=document.getElementsByClassName("phone_noenf")[0];
phone_noenf.innerHTML="请输入相关信息";
phone_noenf.style.display="none";
console.log(phone_noenf);

var passback_con=document.getElementsByClassName("passback_con")[0];
passback_con.addEventListener("mousedown", function () {
    if(btn1_text.value!=''&&btn2_text.value!=''&&btn3_text.value!=''){
        ajax({
            url: "http://192.168.137.1:8082/修改密码",
            type: 'post',  
            data: {password:hex_md5(btn3_text.value),yhm:btn1_text.value},
            async: true,
            success: function (responseText) {
                var response=JSON.parse(responseText);
                if(response.style==0||response.style==-1){
                    //
                }else if(response.style==1){
                    //
                }
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






