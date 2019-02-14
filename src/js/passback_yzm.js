module.exports={
    passback_yzm:function(){
        var html = document.querySelector('html');
        var phone_noenf=document.getElementsByClassName("phone_noenf")[0];
        pic_num_count=1;
        var btn2_yzm=document.getElementsByClassName("btn2_yzm")[0];
        btn2_yzm.addEventListener("mousedown",function(){
        if(pic_num_count != 1){
            return;
        }
        if(btn1_text.value.length!=11){
            phone_noenf.style.display="block";
            setTimeout(function(){
            phone_noenf.style.display="none";
            },2500);
                return;
        }
        obtain_yzm();
        })

        var div = document.createElement("div");  //背景遮罩
        div.setAttribute("class","cloth");
        html.appendChild(div); 
        var cloth=document.getElementsByClassName("cloth")[0];
        var div = document.createElement("div");  //图片验证码提示框
        div.setAttribute("class","reminder_pic");
        html.appendChild(div); 
        var reminder_pic=document.getElementsByClassName("reminder_pic")[0];
        reminder_pic.style.display="none";
        cloth.style.display="none"

        var div = document.createElement("div");  //提示框里的内容
        div.setAttribute("class","picnum_headline");
        reminder_pic.appendChild(div); 
        var picnum_headline=document.getElementsByClassName("picnum_headline")[0];
        picnum_headline.innerHTML="请输入图片中的验证码";
        var div = document.createElement("div");  //提示框里的图片
        div.setAttribute("class","picnum_pic");
        reminder_pic.appendChild(div); 
        var div = document.createElement("div");  //看不清，换一张
        div.setAttribute("class","picnum_pic_change");
        reminder_pic.appendChild(div); 
        var picnum_pic_change=document.getElementsByClassName("picnum_pic_change")[0];
        picnum_pic_change.innerHTML="看不清，换一张";
        var picnum_pic=document.getElementsByClassName("picnum_pic")[0];
        var div = document.createElement("div");  //验证码前
        div.setAttribute("class","picnum_text1");
        reminder_pic.appendChild(div); 
        var picnum_text1=document.getElementsByClassName("picnum_text1")[0];
        picnum_text1.innerHTML="验证码:"

        var div = document.createElement("div");  //div包input提示框
        div.setAttribute("class","picnum_reminder_text"); 
        reminder_pic.appendChild(div);
        var picnum_reminder_text=document.getElementsByClassName("picnum_reminder_text")[0];
        picnum_reminder_text.innerHTML="不区分大小写，请在一分钟之内完成验证";
        var div = document.createElement("div");
        div.setAttribute("class","picnum_input1_div"); 
        reminder_pic.appendChild(div);
        var picnum_input1_div=document.getElementsByClassName("picnum_input1_div")[0];
        var input = document.createElement('input'); 
        input.setAttribute("class","picnum_input1"); 
        picnum_input1_div.appendChild(input);
        var picnum_input1=document.getElementsByClassName("picnum_input1")[0];
        picnum_input1.type="text";
        picnum_input1.name="yanzm";
        var div = document.createElement("div");  //验证码前
        div.setAttribute("class","unconfirm");
        reminder_pic.appendChild(div);  
        var unconfirm=document.getElementsByClassName("unconfirm")[0];
        unconfirm.innerHTML="取消";    
        var div = document.createElement("div");
        div.setAttribute("class","confirm");
        reminder_pic.appendChild(div);  
        var confirm=document.getElementsByClassName("confirm")[0];
        confirm.innerHTML="确定";    

        var pic_num_conut_flag=0;
    

        function obtain_yzm()//图片验证码
        {
            obj_pic={       //定义图片验证码的对象
                url: "http://192.168.137.1:8082/picyzm",
                type: 'get',  
                data: null,
                async: true,
                success: function (responseText) {
                    var response_reminder_pic=JSON.parse(responseText);
                    var picnum_pic = document.getElementsByClassName("picnum_pic")[0];
                    var svg=response_reminder_pic.pic;
                    picnum_pic.innerHTML=svg;
                    picnum_pic.style.display="block";
                    reminder_pic.style.display="block";
                },
                fail: function (err) {
                    // console.log("aaa123456");
                }
            }
            ajax(obj_pic);   //调用ajax函数，传入一个对象
        }

        picnum_pic_change.addEventListener("mousedown", function(){
            phone_giveinfor.style.display="none";
            ajax(obj_pic);
        })    
        //请求到了图片


        unconfirm.addEventListener("mousedown", function()  //取消键
        {
            cloth.style.display="none"
            reminder_pic.style.display="none";
            phone_giveinfor.style.display="none";
        })

        //图片验证码的核对，短信验证码的准备
        var div = document.createElement("div");  //短信验证码提示框
        div.setAttribute("class","phone_num");
        html.appendChild(div); 
        var phone_num=document.getElementsByClassName("phone_num")[0];

        var div = document.createElement("div");  //标题
        div.setAttribute("class","phone_headline");
        phone_num.appendChild(div);
        var phone_headline=document.getElementsByClassName("phone_headline")[0];
        phone_headline.innerHTML="确认手机号码";

        var btn1_text=document.getElementsByClassName("btn1_text")[0];//获取手机号填写框的input   
        var div = document.createElement("div");  //提示文字
        div.setAttribute("class","phone_text");
        phone_num.appendChild(div);
        var phone_text=document.getElementsByClassName("phone_text")[0];
        phone_text.innerHTML="我们将发送验证码短信到下面的号码："+btn1_text.value;

        var div = document.createElement("div"); //取消
        div.setAttribute("class","phone_unconfirm");
        phone_num.appendChild(div); 
        var phone_unconfirm=document.getElementsByClassName("phone_unconfirm")[0];
        phone_unconfirm.innerHTML="取消";    
        var div = document.createElement("div");  //确定
        div.setAttribute("class","phone_confirm");
        phone_num.appendChild(div); 
        var phone_confirm=document.getElementsByClassName("phone_confirm")[0]; 
        phone_confirm.innerHTML="确定";
        var phone_num=document.getElementsByClassName("phone_num")[0];
        phone_num.style.display="none"; 


        var flag = 1;
        phone_confirm.addEventListener("mousedown", function () {
        pic_num_count=0;
        setTimeout(function(){
            pic_num_count=1;
        },60000);
        clearInterval(timer);
        var time = 61;
        if (flag) {
            flag = 0;
            var timer = setInterval(function(){
                time--;
                if(time<=61&&time>0){
                    btn2_yzm.innerText = time + '秒后重试';
                }
                if (time === 0) {
                    clearInterval(timer);
                    btn2_yzm.innerText = '重新获取';
                    flag = 1;
                    pic_num_conut_flag=1;
                }
            }, 1000);
        }
        });    


        var div = document.createElement("div");  //输入提示框
        div.setAttribute("class","phone_giveinfor");
        reminder_pic.appendChild(div);
        var phone_giveinfor=document.getElementsByClassName("phone_giveinfor")[0]; 
        phone_giveinfor.style.display="none";

        confirm.addEventListener("mousedown", function()  //图片验证码的确定键，验证码对了，就开始短信验证码
        {
            ajax  //调用ajax函数，传入一个对象
            ({
                url: "http://192.168.137.1:8082/phone",
                type: 'post',  
                data: {phone:btn1_text.value,picyzm:btn2_text.value}, 
                async: true,
                success: function (responseText) {
                    var response_reminder_text=JSON.parse(responseText);
                    if(response_reminder_text.style==0||response_reminder_text.style==-2||response_reminder_text.style==-3){
                        phone_giveinfor.style.display="block";
                        phone_giveinfor.innerHTML=response_reminder_text.msg;
                    }else if(response_reminder_text.style==1){
                        phone_giveinfor.style.display="none";
                        reminder_pic.style.display="none";
                        phone_text.innerHTML="我们将发送验证码短信到下面的号码："+btn1_text.value;
                        phone_num.style.display="block";
                    }else if(response_reminder_text.style==-1){
                        picnum_input1.value='';
                        //验证码失效，换一张验证码
                        obtain_yzm;
                    }
                },
                fail: function (err) {
                    picnum_input1.value='';  //让用户重新输入
                }
            }); 
        }) 

        phone_unconfirm.addEventListener("mousedown", function()  //短信验证码取消键
        {
            cloth.style.display="none"
            phone_num.style.display="none";
        })
        phone_confirm.addEventListener("mousedown", function()  //短信验证码确定键
        {
            cloth.style.display="none"
            phone_num.style.display="none";
        })
    }
}