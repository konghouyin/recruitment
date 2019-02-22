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
div.setAttribute("class","phone_noenf");//输入信息位数不正确
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
msg2_headline.appendChild(div); 
var div = document.createElement("div"); 
div.setAttribute("class","msg2_headtext");//标题文字
msg2_headline.appendChild(div);
var msg2_back=document.getElementsByClassName("msg2_back")[0];
var msg2_headtext=document.getElementsByClassName("msg2_headtext")[0];
msg2_back.addEventListener("mousedown", function (){
    msg_path2.style.display='none';
    cloth.style.display="none";
    console.log('aa');
})

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

var arr = new Array(4);
btn1_text.addEventListener("input", function()
{
    if(btn1_text.value.length==4){
        arr=btn1_text.value.split("", 4);//"hello".split("", 3)	//可返回 ["h", "e", "l"]
        // console.log(arr[0]);
        // console.log(arr[1]);
        if(arr[1]==4){
            msg2_headtext.innerHTML='请输入您的姓名';
            msg2_head.innerHTML='姓名';
            msg2_text.placeholder='请输入您的姓名';
        }else{
            msg2_headtext.innerHTML='请进行身份验证';
            msg2_head.innerHTML='密码';
            msg2_text.placeholder='请输入您的教务系统密码';
        }
    }
})
msg_path2.style.display="none";
cloth.style.display="none";

//确认按钮
var passback_con=document.getElementsByClassName("passback_con")[0];
passback_con.addEventListener("mousedown", function () {
    
    if(btn1_text.value!=''&&btn1_text.value.length==8)//学号不为空且为八位
    {
        cloth.style.display="block";
        msg_path2.style.display="block";
        // ajax({
        //     url: "http://192.168.137.1:8082/完善信息",
        //     type: 'post',  
        //     data: {password:hex_md5(btn3_text.value),yhm:btn1_text.value},
        //     async: true,
        //     success: function (responseText) {
        //         var response=JSON.parse(responseText);
        //         //
        //     },
        //     fail: function (err) {
        //         //空
        //     }
        // });
    }else{
        phone_noenf.style.display="block";
        setTimeout(function(){
           phone_noenf.style.display="none";
        },2500);

    }
})

var head_text=document.getElementsByClassName("head_text")[0];
var div = document.createElement("div"); 
// div.setAttribute("class","line_back");//选组1
// head_text.appendChild(div);
// var back_btn=document.getElementsByClassName("back_btn")[0];

// var line_back=document.getElementsByClassName("line_back")[0];
// line_back.style.display="none";

var bodybox=document.getElementsByClassName("bodybox")[0];
var btn1=document.getElementsByClassName("btn1")[0];
var div = document.createElement("div"); 
div.setAttribute("class","line_box");//line_box
html.appendChild(div); 
var line_box=document.getElementsByClassName("line_box")[0];

var div = document.createElement("div"); 
div.setAttribute("class","line1");//选组1
line_box.appendChild(div);
var line1=document.getElementsByClassName("line1")[0];
var div = document.createElement("div"); 
div.setAttribute("class","line1_pic");//前
line1.appendChild(div);
var div = document.createElement("div"); 
div.setAttribute("class","line1_text");//中
line1.appendChild(div);
var line1_text=document.getElementsByClassName("line1_text")[0];
line1_text.innerHTML='android组';
var div = document.createElement("div"); 
div.setAttribute("class","line1_btn");//后
line1.appendChild(div);


var div = document.createElement("div"); 
div.setAttribute("class","line2");//选组2
line_box.appendChild(div); 
var line2=document.getElementsByClassName("line2")[0];
var div = document.createElement("div"); 
div.setAttribute("class","line2_pic");//前
line2.appendChild(div);
var div = document.createElement("div"); 
div.setAttribute("class","line2_text");//中
line2.appendChild(div);
var line2_text=document.getElementsByClassName("line2_text")[0];
line2_text.innerHTML='ios组';
var div = document.createElement("div"); 
div.setAttribute("class","line2_btn");//后
line2.appendChild(div);


var div = document.createElement("div"); 
div.setAttribute("class","line3");//选组3
line_box.appendChild(div); 
var line3=document.getElementsByClassName("line3")[0];
var div = document.createElement("div"); 
div.setAttribute("class","line3_pic");//前
line3.appendChild(div);
var div = document.createElement("div"); 
div.setAttribute("class","line3_text");//中
line3.appendChild(div);
var line3_text=document.getElementsByClassName("line3_text")[0];
line3_text.innerHTML='web组';
var div = document.createElement("div"); 
div.setAttribute("class","line3_btn");//后
line3.appendChild(div);

var div = document.createElement("div"); 
div.setAttribute("class","line4");//选组4
line_box.appendChild(div); 
var line4=document.getElementsByClassName("line4")[0];
var div = document.createElement("div"); 
div.setAttribute("class","line4_pic");//前
line4.appendChild(div);
var div = document.createElement("div"); 
div.setAttribute("class","line4_text");//中
line4.appendChild(div);
var line4_text=document.getElementsByClassName("line4_text")[0];
line4_text.innerHTML='后台组';
var div = document.createElement("div"); 
div.setAttribute("class","line4_btn");//后
line4.appendChild(div);

// var div = document.createElement("div"); 
// div.setAttribute("class","line_con");//确认按钮
// line_box.appendChild(div); 

var line_box=document.getElementsByClassName("line_box")[0];
line_box.style.display="none";

var back_btn=document.getElementsByClassName("back_btn")[0];
// var line_back=document.getElementsByClassName("line_back")[0];
msg2_con.addEventListener("mousedown", function () //二次验证发送成功
{
    if(msg2_text.value!='')//姓名不为空
    {
        // ajax({
        //     url: "http://192.168.137.1:8082/完善信息确定键",
        //     type: 'post',  
        //     data: {password:hex_md5(btn3_text.value),yhm:btn1_text.value},
        //     async: true,
        //     success: function (responseText) {
        //         var response=JSON.parse(responseText);
        //         //
        //     },
        //     fail: function (err) {
        //         //空
        //     }
        // });
    }else{
        phone_noenf.style.display="block";
        setTimeout(function(){
           phone_noenf.style.display="none";
        },2500);
    }

    //在ajax里面if验证正确了,才{放进去} 
    cloth.style.display="none";
    head_text.innerHTML='选择分组';
    bodybox.style.display="none";
    line_box.style.display="block";
    back_btn.style.display="none";
    // line_back.style.display="block";
})

// line_back.addEventListener("mousedown", function (){
//     head_text.innerHTML='完善个人信息';
//     bodybox.style.display="block";
//     line_box.style.display="none";
//     back_btn.style.display="block";
//     line_back.style.display="none";
// })

line1.addEventListener("mousedown", function (){
    //a标签
    console.log('sss');
})
line2.addEventListener("mousedown", function (){
    //a标签
})
line3.addEventListener("mousedown", function (){
    //a标签
})
line4.addEventListener("mousedown", function (){
    //a标签
})

