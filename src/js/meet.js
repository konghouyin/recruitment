module.exports={
    meet:function(){
        var pic_border1=document.getElementsByClassName("pic_border1")[0];
        var pic_border2=document.getElementsByClassName("pic_border2")[0];
        var pic_border3=document.getElementsByClassName("pic_border3")[0];
        var pic_border4=document.getElementsByClassName("pic_border4")[0];
        var person_pic=document.getElementsByClassName("person_pic")[0];
        var meet_pic=document.getElementsByClassName("meet_pic")[0];
        var notice_pic=document.getElementsByClassName("notice_pic")[0];
        var change_pic=document.getElementsByClassName("change_pic")[0];
        var dot1=document.getElementsByClassName("dot1")[0];
        pic_border2.addEventListener("mousedown",function(){
            pic_border2.className="active";
            meet_pic.className="meet_newpic";
            pic_border1.className="pic_border1";
            pic_border3.className="pic_border3";
            pic_border4.className="pic_border4";
            person_pic.className="person_pic";
            notice_pic.className="notice_pic";
            change_pic.className="change_pic";
        })
    }
}