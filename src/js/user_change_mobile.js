module.exports={
    change:function(){
        var ajax=require("./Ajax.js").ajax;
        var pic_border1=document.getElementsByClassName("pic_border1")[0];
        var pic_border2=document.getElementsByClassName("pic_border2")[0];
        var pic_border3=document.getElementsByClassName("pic_border3")[0];
        var pic_border4=document.getElementsByClassName("pic_border4")[0];
        var person_pic=document.getElementsByClassName("person_pic")[0];
        var meet_pic=document.getElementsByClassName("meet_pic")[0];
        var content=document.getElementsByClassName("content")[0]; 
        var notice_pic=document.getElementsByClassName("notice_pic")[0];
        var change_pic=document.getElementsByClassName("change_pic")[0];
        var meet_result=document.getElementsByClassName("meet_result")[0];
        var explain=document.getElementsByClassName("explain")[0];
        var person_box=document.getElementsByClassName("person_box")[0]; 
        var notice_box=document.getElementsByClassName("notice_box")[0]; 
        var mid=document.getElementsByClassName("mid")[0];
        var dot1=document.getElementsByClassName("dot1")[0];

        //大盒子
        var div = document.createElement("div"); 
        div.setAttribute("class","change_box");
        content.appendChild(div);
        var change_box=document.getElementsByClassName("change_box")[0];
        //box1
        var div = document.createElement("div"); 
        div.setAttribute("class","box1");
        change_box.appendChild(div);
        var box1=document.getElementsByClassName("box1")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_msg");
        box1.appendChild(div);
        var box_msg=document.getElementsByClassName("box_msg")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_pic1");
        box_msg.appendChild(div);
        var box_pic1=document.getElementsByClassName("box_pic1")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_text1");
        box_msg.appendChild(div);
        var box_text1=document.getElementsByClassName("box_text1")[0]; 
        box_text1.innerHTML="修改密码";

        //box2
        var div = document.createElement("div"); 
        div.setAttribute("class","box2");
        change_box.appendChild(div);
        var box2=document.getElementsByClassName("box2")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_msg");
        box2.appendChild(div);
        var box_msg=document.getElementsByClassName("box_msg")[1]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_pic2");
        box_msg.appendChild(div);
        var box_pic2=document.getElementsByClassName("box_pic2")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_text2");
        box_msg.appendChild(div);
        var box_text2=document.getElementsByClassName("box_text2")[0]; 
        box_text2.innerHTML="帮助";

        //box3
        var div = document.createElement("div"); 
        div.setAttribute("class","box3");
        change_box.appendChild(div);
        var box3=document.getElementsByClassName("box3")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_msg");
        box3.appendChild(div);
        var box_msg=document.getElementsByClassName("box_msg")[2]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_pic3");
        box_msg.appendChild(div);
        var box_pic3=document.getElementsByClassName("box_pic3")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_text3");
        box_msg.appendChild(div);
        var box_text3=document.getElementsByClassName("box_text3")[0]; 
        box_text3.innerHTML="小组介绍";

        //box4
        var div = document.createElement("div"); 
        div.setAttribute("class","box4");
        change_box.appendChild(div);
        var box4=document.getElementsByClassName("box4")[0];  var div = document.createElement("div"); 
        div.setAttribute("class","box_msg");
        box4.appendChild(div);
        var box_msg=document.getElementsByClassName("box_msg")[3]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_pic4");
        box_msg.appendChild(div);
        var box_pic4=document.getElementsByClassName("box_pic4")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","box_text4");
        box_msg.appendChild(div);
        var box_text4=document.getElementsByClassName("box_text4")[0]; 
        box_text4.innerHTML="实验室介绍";
        change_box.style.display="none";
        
        pic_border4.addEventListener("mousedown",function(){
            mid.innerHTML="更多功能";
            change_box.style.display="block";
            pic_border4.className="active";
            change_pic.className="change_newpic";
            pic_border2.className="pic_border2";
            pic_border3.className="pic_border3";
            pic_border1.className="pic_border1";
            meet_pic.className="meet_pic";
            notice_pic.className="notice_pic";
            person_pic.className="person_pic";

            meet_result.style.display="none";
            explain.style.display="none";
            person_box.style.display="none";
            notice_box.style.display="none";
        })

        //四个a标签
        var box_pic1=document.getElementsByClassName("box_pic1")[0]; 
        box_pic1.addEventListener("mousedown",function(){
            //跳转1
        })
        var box_pic2=document.getElementsByClassName("box_pic2")[0]; 
        box_pic2.addEventListener("mousedown",function(){
            //跳转1
        })
        var box_pic3=document.getElementsByClassName("box_pic3")[0]; 
        box_pic3.addEventListener("mousedown",function(){
            //跳转1
        })
        var box_pic4=document.getElementsByClassName("box_pic4")[0]; 
        box_pic4.addEventListener("mousedown",function(){
            //跳转1
        })
        


    }    
}