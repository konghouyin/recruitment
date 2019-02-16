module.exports={
    person_msg:function(){
        //
        var html = document.querySelector('html');
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

        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        content.appendChild(div); 
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        content.appendChild(div); 
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        content.appendChild(div); 
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        content.appendChild(div); 
        var div = document.createElement("div"); 
        div.setAttribute("class","person_text");
        content.appendChild(div); 

        var person_text1=document.getElementsByClassName("person_text")[0]; 
        person_text1.style.display="none";
        var person_text2=document.getElementsByClassName("person_text")[1]; 
        person_text2.style.display="none";
        var person_text3=document.getElementsByClassName("person_text")[2]; 
        person_text3.style.display="none";
        var person_text4=document.getElementsByClassName("person_text")[3]; 
        person_text4.style.display="none";
        var person_text5=document.getElementsByClassName("person_text")[4]; 
        person_text5.style.display="none";

        pic_border1.addEventListener("mousedown",function(){
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

            person_text1.style.display="block";
            person_text2.style.display="block";
            person_text3.style.display="block";
            person_text4.style.display="block";
            person_text5.style.display="block";
        })

        


        //
    }
}