module.exports={
    passback_success:function(){
        var html = document.querySelector('html');
        var div = document.createElement("div");  //注册成功与否提示框
        div.setAttribute("class","finish");
        html.appendChild(div); 
        var finish=document.getElementsByClassName("finish")[0];
        finish.style.display="none";
        var div = document.createElement("div");  //图标
        div.setAttribute("class","finish_pic");
        finish.appendChild(div); 
        var div = document.createElement("div");  //提示文字
        div.setAttribute("class","finish_text");
        finish.appendChild(div); 

        var finish_pic=document.getElementsByClassName("finish_pic")[0];
        var finish_text=document.getElementsByClassName("finish_text")[0];

        var div = document.createElement("div"); //取消
        div.setAttribute("class","finish_unconfirm");
        finish.appendChild(div); 
        var finish_unconfirm=document.getElementsByClassName("finish_unconfirm")[0];
        finish_unconfirm.innerHTML="取消";    
        var div = document.createElement("div");  //确定
        div.setAttribute("class","finish_confirm");
        finish.appendChild(div); 
        var finish_confirm=document.getElementsByClassName("finish_confirm")[0];
        finish_confirm.innerHTML="确定";


        var passback_con=document.getElementsByClassName("passback_con")[0];
        passback_con.addEventListener("click", function () {
            // if(phone_confirm_count==1){
                finish.style.display="block";
                ajax({
                    url: "http://192.168.137.1:8082/passback",
                    type: 'post',  
                    data: {password:hex_md5(btn3_text.value),yhm:btn1_text.value},
                    async: true,
                    success: function (responseText) {
                        var response=JSON.parse(responseText);
                        if(response.style==0||response.style==-1){
                            finish_pic.className="notfinish_pic";
                            finish_text.innerHTML=response.msg;
                        }else if(response.style==1){
                            finish_pic.className="finish_pic";
                            finish_text.innerHTML=response.msg;
                        }
                    },
                    fail: function (err) {
                        //空
                    }
                });
            // }
        })
        finish_confirm.addEventListener("mousedown", function()
        {
            finish.style.display="none"
        })
        finish_unconfirm.addEventListener("mousedown", function()  
        {
            finish.style.display="none"
        })
    }
}