module.exports={
    meet:function(){
        var ajax=require("./Ajax.js").ajax;
        var pic_border1=document.getElementsByClassName("pic_border1")[0];
        var pic_border2=document.getElementsByClassName("pic_border2")[0];
        var pic_border3=document.getElementsByClassName("pic_border3")[0];
        var pic_border4=document.getElementsByClassName("pic_border4")[0];
        var person_pic=document.getElementsByClassName("person_pic")[0];
        var meet_pic=document.getElementsByClassName("meet_pic")[0];
        var notice_pic=document.getElementsByClassName("notice_pic")[0];
        var change_pic=document.getElementsByClassName("change_pic")[0];
        var person_text1=document.getElementsByClassName("person_text")[0]; 
        var person_text2=document.getElementsByClassName("person_text")[1]; 
        var person_text3=document.getElementsByClassName("person_text")[2]; 
        var person_text4=document.getElementsByClassName("person_text")[3]; 
        var person_text5=document.getElementsByClassName("person_text")[4]; 
        var meet_result=document.getElementsByClassName("meet_result")[0];
        var explain=document.getElementsByClassName("explain")[0];
        var you_meet=document.getElementsByClassName("you_meet")[0];
        var you_state=document.getElementsByClassName("you_state")[0];
        var dot1=document.getElementsByClassName("dot1")[0];
        var dot2=document.getElementsByClassName("dot2")[0];
        var dot3=document.getElementsByClassName("dot3")[0];
        var dot1=document.getElementsByClassName("dot1")[0];
        var dot2=document.getElementsByClassName("dot2")[0];
        var dot3=document.getElementsByClassName("dot3")[0];
        var dot4=document.getElementsByClassName("dot4")[0];
        var person_box=document.getElementsByClassName("person_box")[0]; 
        var mid=document.getElementsByClassName("mid")[0];
        dot1.className="newdot1";
        // console.log(notice_box);
        // console.log(person_box);


        pic_border2.addEventListener("mousedown",function(){
            
            var notice_box=document.getElementsByClassName("notice_box")[0]; 
            pic_border2.className="active";
            meet_pic.className="meet_newpic";
            pic_border1.className="pic_border1";
            pic_border3.className="pic_border3";
            pic_border4.className="pic_border4";
            person_pic.className="person_pic";
            notice_pic.className="notice_pic";
            change_pic.className="change_pic";
            mid.innerHTML="面试查询";

            meet_result.style.display="block";
            explain.style.display="block";
            person_box.style.display="none";
            notice_box.style.display="none";

           
            //个人的面试状态
            // ajax({
            //     url: "http://192.168.137.1:8082/personmessage",
            //     type: 'post',  
            //     data: null,
            //     async: true,
            //     success: function (responseText) {
            //         var response=JSON.parse(responseText);
            //         // you_meet.innerHTML=response.msg;
            //         // you_state.innerHTML=response.msg;
            //         //if
            //         // dot2.className="passdot2";通过的状态 绿色
            //         // dot2.className="notpass_dot2";未通过的状态 红色
            //     },
            //     fail: function (err) {
            //         //空
            //     }
            // });
            // //实验室面试进程
            // ajax({
            //     url: "http://192.168.137.1:8082/style",
            //     type: 'post',  
            //     data: null,
            //     async: true,
            //     success: function (responseText) {
            //         var response=JSON.parse(responseText);
            //         //if
            //         // dot1.className="newdot1";
            //     },
            //     fail: function (err) {
            //         //空
            //     }
            // });

        })
    }
}