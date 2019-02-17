module.exports={
    change:function(){
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
        var person_box=document.getElementsByClassName("person_box")[0]; 
        var notice_box=document.getElementsByClassName("notice_box")[0]; 
        var mid=document.getElementsByClassName("mid")[0];
        var dot1=document.getElementsByClassName("dot1")[0];
        console.log(notice_box);

        pic_border4.addEventListener("mousedown",function(){
            mid.innerHTML="修改密码";
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
    }    
}