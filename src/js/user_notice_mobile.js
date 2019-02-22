module.exports={
    notice:function(){
        var ajax=require("./Ajax.js").ajax;
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
        var content=document.getElementsByClassName("content")[0]; 
        var dot1=document.getElementsByClassName("dot1")[0];
        var person_box=document.getElementsByClassName("person_box")[0]; 
        var mid=document.getElementsByClassName("mid")[0];

        //大盒子
        var div = document.createElement("div"); 
        div.setAttribute("class","notice_box");
        content.appendChild(div);
        var notice_box=document.getElementsByClassName("notice_box")[0]; 
        //实验室公告
        var div = document.createElement("div"); 
        div.setAttribute("class","lab_notice");
        notice_box.appendChild(div);
        var lab_notice=document.getElementsByClassName("lab_notice")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","notice_headline");
        lab_notice.appendChild(div);
        var notice_headline=document.getElementsByClassName("notice_headline")[0];
        notice_headline.innerHTML='实验室公告';
        lab_notice.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","notice_text");
        lab_notice.appendChild(div);
        var notice_text=document.getElementsByClassName("notice_text")[0];
        notice_text.innerHTML='实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告';
        
        //小组公告
        var div = document.createElement("div"); 
        div.setAttribute("class","group_notice");
        notice_box.appendChild(div);
        var group_notice=document.getElementsByClassName("group_notice")[0]; 
        var div = document.createElement("div"); 
        div.setAttribute("class","group_headline");
        group_notice.appendChild(div);
        var group_headline=document.getElementsByClassName("group_headline")[0];
        group_headline.innerHTML='小组公告';
        group_notice.appendChild(div);
        var div = document.createElement("div"); 
        div.setAttribute("class","group_text");
        group_notice.appendChild(div);
        var group_text=document.getElementsByClassName("group_text")[0];
        group_text.innerHTML='实验室公告实验室公告实验室公告实验室公告实验室公告实验室公告';

        notice_box.style.display="none";

        pic_border3.addEventListener("mousedown",function(){
            var change_box=document.getElementsByClassName("change_box")[0];

            mid.innerHTML="面试公告";
            pic_border3.className="active";
            notice_pic.className="notice_newpic";
            pic_border2.className="pic_border2";
            pic_border1.className="pic_border1";
            pic_border4.className="pic_border4";
            meet_pic.className="meet_pic";
            person_pic.className="person_pic";
            change_pic.className="change_pic";

            meet_result.style.display="none";
            explain.style.display="none";
            person_box.style.display="none";
            notice_box.style.display="block";
            change_box.style.display="none";

            ajax({
                url: "http://192.168.137.1:8082/personmessage",
                type: 'post',  
                data: null,
                async: true,
                success: function (responseText) {
                    var response=JSON.parse(responseText);
                    //if
                    // notice_text.innerHTML=response.msg;
                    // group_text.innerHTML=response.msg;
                },
                fail: function (err) {
                    //空
                }
            });

        })
    }
}