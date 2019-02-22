module.exports={
    person_msg:function(){
        var ajax=require("./Ajax.js").ajax;
        //
        var pic_border1=document.getElementsByClassName("pic_border1")[0];
        var pic_border2=document.getElementsByClassName("pic_border2")[0];
        var pic_border3=document.getElementsByClassName("pic_border3")[0];
        var pic_border4=document.getElementsByClassName("pic_border4")[0];
        var person_pic=document.getElementsByClassName("person_pic")[0];
        var meet_pic=document.getElementsByClassName("meet_pic")[0];
        var notice_pic=document.getElementsByClassName("notice_pic")[0];
        var change_pic=document.getElementsByClassName("change_pic")[0];
        var meet_result=document.getElementsByClassName("meet_result")[0];
        var explain=document.getElementsByClassName("explain")[0];
        var mid=document.getElementsByClassName("mid")[0];
        var content=document.getElementsByClassName("content")[0];
        
        
        //大盒子
        var div = document.createElement("div"); 
        div.setAttribute("class","person_box");
        content.appendChild(div);
        var person_box=document.getElementsByClassName("person_box")[0]; 
        //个人主页第一行
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        person_box.appendChild(div);
        var person_text1=document.getElementsByClassName("person_text")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","form_head");
        person_text1.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","form_msg");
        person_text1.appendChild(div);
        var form_head1=document.getElementsByClassName("form_head")[0]; 
        var form_msg1=document.getElementsByClassName("form_msg")[0]; 
        form_head1.innerHTML='姓名';
        form_msg1.innerHTML='姓名';
        
        //第二行
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        person_box.appendChild(div); 
        var person_text2=document.getElementsByClassName("person_text")[1]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","form_head");
        person_text2.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","form_msg");
        person_text2.appendChild(div);
        var form_head2=document.getElementsByClassName("form_head")[1]; 
        var form_msg2=document.getElementsByClassName("form_msg")[1]; 
        form_head2.innerHTML='学号';

        //第三行
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        person_box.appendChild(div); 
        var person_text3=document.getElementsByClassName("person_text")[2]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","form_head");
        person_text3.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","form_msg");
        person_text3.appendChild(div);
        var form_head3=document.getElementsByClassName("form_head")[2]; 
        var form_msg3=document.getElementsByClassName("form_msg")[2]; 
        form_head3.innerHTML='所在学院';

        //第四行
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        person_box.appendChild(div); 
        var person_text4=document.getElementsByClassName("person_text")[3]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","form_head");
        person_text4.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","form_msg");
        person_text4.appendChild(div);
        var form_head4=document.getElementsByClassName("form_head")[3]; 
        var form_msg4=document.getElementsByClassName("form_msg")[3]; 
        form_head4.innerHTML='所在班级';

        //第五行
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        person_box.appendChild(div);
        var person_text5=document.getElementsByClassName("person_text")[4]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","form_head");
        person_text5.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","form_msg");
        person_text5.appendChild(div);
        var form_head5=document.getElementsByClassName("form_head")[4]; 
        var form_msg5=document.getElementsByClassName("form_msg")[4]; 
        form_head5.innerHTML='您选择的小组';

        person_box.style.display="none";
        pic_border1.addEventListener("mousedown",function(){
            var change_box=document.getElementsByClassName("change_box")[0];
            var notice_box=document.getElementsByClassName("notice_box")[0]; 
            pic_border1.className="active";
            person_pic.className="person_newpic";
            pic_border2.className="pic_border2";
            pic_border3.className="pic_border3";
            pic_border4.className="pic_border4";
            meet_pic.className="meet_pic";
            notice_pic.className="notice_pic";
            change_pic.className="change_pic";

            mid.innerHTML="个人信息";

            meet_result.style.display="none";
            explain.style.display="none";

            person_box.style.display="block";
            notice_box.style.display="none";
            change_box.style.display="none";

            // ajax({
            //     url: "http://192.168.137.1:8082/personmessage",
            //     type: 'post',  
            //     data: null,
            //     async: true,
            //     success: function (responseText) {
            //         var response=JSON.parse(responseText);
            //         // form_msg1.innerHTML=response.msg;
            //         // form_msg2.innerHTML=response.msg;
            //         // form_msg3.innerHTML=response.msg;
            //         // form_msg4.innerHTML=response.msg;
            //         // form_msg5.innerHTML=response.msg;
            //     },
            //     fail: function (err) {
            //         //空
            //     }
            // });
        })

        


        //
    }
}