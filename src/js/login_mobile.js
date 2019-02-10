function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) //url与callback绑定
{
    this.routes[path] = callback || function(){};//给不同的hash设置不同的回调函数
};
Router.prototype.refresh = function() //refresh 执行当前url对应的回调函数，更新页面
{
    this.currentUrl = location.hash.slice(1) || '/';//如果存在hash值则获取到，否则设置hash值为/
    this.routes[this.currentUrl]();//根据当前的hash值来调用相对应的回调函数
};
Router.prototype.init = function() 
{
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();

//封装了一个简易的前端路由

// var script=document.getElementsByTagName("script")[1];  //引入ajax
// var md5=document.getElementsByTagName("script")[2];  //引入md5加密

var html = document.querySelector('html');
var btn_login=document.getElementsByClassName("login")[0];
var btn_logup=document.getElementsByClassName("logup")[0];
var login_count =1;  //页面切换的总计数器
var logup_count =1;

function flogin() {
    if(login_count!=1)  //不是第一次点击了
    {
        btn_login.style.display="none";
        btn_logup.style.display="none"; 
        var pagepic=document.getElementsByClassName("pagepic")[0];
        pagepic.style.display="block";
        var login_btn1=document.getElementsByClassName("login_btn1")[0];
        login_btn1.style.display="block";
        var login_btn2=document.getElementsByClassName("login_btn2")[0];
        login_btn2.style.display="block";
        var login_btn3=document.getElementsByClassName("login_btn3")[0];
        login_btn3.style.display="block";
        var register=document.getElementsByClassName("register")[0];
        register.style.display="block";
        var back_a_btn=document.getElementsByClassName("back_a_btn")[0];
        back_a_btn.style.display="block";
    }
    else    //此时是第一次点击，需要创建各节点
    {
        btn_login.style.display="none";
        btn_logup.style.display="none";
        var div = document.createElement("div");//0是图标,1是小字
        div.setAttribute("class","pagepic");
        html.appendChild(div);

        var div = document.createElement("div");
        div.setAttribute("class","text");  
        html.appendChild(div);
        div.innerHTML="2019年纳新报名";

        var div = document.createElement("div");
        div.setAttribute("class","login_btn1"); 
        html.appendChild(div);
        var input1 = document.createElement('input'); 
        input1.setAttribute("class","input1"); 
        input1.type="text";
        input1.name="user";
        input1.value="Mobile phone";
        var login_btn1=document.getElementsByClassName("login_btn1")[0];
        login_btn1.insertBefore(input1,login_btn1.children[0]); 

        var div = document.createElement("div");
        div.setAttribute("class","btn_text1");
        login_btn1.insertBefore(div,login_btn1.children[1]);  
        var btn_text1=document.getElementsByClassName("btn_text1")[0];
        btn_text1.style.display="none";

        input1.onfocus= function () {
            if(this.value=='Mobile phone'){
                this.value='';
            }
            btn_text1.style.display="block";
            btn_text1.innerHTML='手机号';
        }
        input1.onblur= function () {
            if(this.value==''){
                this.value='Mobile phone';
            }
            var btn_text1=document.getElementsByClassName("btn_text1")[0];
            btn_text1.innerHTML='';
        }

    var div = document.createElement("div");
    div.setAttribute("class","btn_picnum");
    login_btn1.insertBefore(div,login_btn1.children[2]);  
    var btn_picnum=document.getElementsByClassName("btn_picnum")[0];
    btn_picnum.innerHTML="获取验证码";
    btn_picnum.className = "newbtn_picnum"; 
    btn_picnum.style.display="none";
    input1.addEventListener("input", function(){
    if(input1.value.length==11){
        btn_picnum.style.display="block";
    }else{
        btn_picnum.style.display="none";
    }
})

//5分钟后重新获取
//样式
var flag = 1;
btn_picnum.addEventListener("mousedown", function () {
    clearInterval(timer);
    var time = 61;
    if (flag) {
        flag = 0;
        var timer = setInterval(function(){
            time--;
            if(time<=61&&time>0){
                btn_picnum.innerText = time + '秒后重试';
                this.setAttribute("disabled","true" );
            }
            if (time === 0) {
                clearInterval(timer);
                btn_picnum.innerText = '重新获取';
                flag = 1;
            }
        }, 1000);
    }
    //功能
    if(btn_picnum.innerText == '获取验证码'||btn_picnum.innerText == '重新获取'){
        this.onmousedown=obtain_yzm;
        cloth.style.display="block"
        reminder_pic.style.display="block";
    }else{
        this.onmousedown=null;
        cloth.style.display="none"
        reminder_pic.style.display="none";
    }
});
//5分钟后重新获取结束
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
   
    // picnum_pic.style.display="none";

    btn_picnum.addEventListener("mousedown",obtain_yzm );
    function obtain_yzm()//图片验证码完成，未测试
    {
        obj_pic={       //定义图片验证码的对象
            url: "/picyzm",
            type: 'get',  
            data: null,
            async: true,
            success: function (responseText) {
                response_reminder_pic=JSON.parse(responseText);
                var svg = document.getElementsByTagName("svg")[0]; 
                var img_yzm = svg.innerHTML;     //获取svg标签里的innerHTML       
                var a=new Image();
                a.src=img_yzm;
                picnum_pic.appendChild(a)

                picnum_pic.style.display="block";
            },
            fail: function (err) {
                // console.log("aaa123456");
            }
        }
        ajax(obj_pic);   //调用ajax函数，传入一个对象
    }

    picnum_pic_change.addEventListener("mousedown", function(){
        ajax(obj_pic);
    })    
    //请求到了图片

    
    unconfirm.addEventListener("mousedown", function()  //取消键
    {
        cloth.style.display="none"
        reminder_pic.style.display="none";
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

    var input1=document.getElementsByClassName("input1")[0];//获取手机号填写框的input   
    var div = document.createElement("div");  //提示文字
    div.setAttribute("class","phone_text");
    phone_num.appendChild(div);
    var phone_text=document.getElementsByClassName("phone_text")[0];
    phone_text.innerHTML="我们将发送验证码短信到下面的号码："+input1.value;

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

    var div = document.createElement("div");  //输入提示框
    div.setAttribute("class","phone_giveinfor");
    reminder_pic.appendChild(div);
    var phone_giveinfor=document.getElementsByClassName("phone_giveinfor")[0]; 
    phone_giveinfor.style.display="none";

    confirm.addEventListener("mousedown", function()  //图片验证码的确定键，验证码对了，就开始短信验证码
    {
        ajax  //调用ajax函数，传入一个对象
        ({
            url: "/phone",
            type: 'post',  
            data: {phone:'input1.value',picyzm:'picnum_input1.value'}, //只有11位的时候验证码才会出来，所以不用再判断了
            async: true,
            success: function (responseText) {
                var response_reminder_text=JSON.parse(responseText);
                if(response_reminder_text.style==0||response_reminder_text.style==-2){
                    phone_giveinfor.style.display="block";
                    phone_giveinfor.innerHTML=response_reminder_text.msg;
                }else if(response_reminder_text.style==1){
                    phone_giveinfor.style.display="none";
                    reminder_pic.style.display="none";
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


//input2
        var div = document.createElement("div");
        div.setAttribute("class","login_btn2");
        html.appendChild(div);
        var input2 = document.createElement('input'); 
        input2.type="text";
        input2.name="pass";
        input2.value="Password";
        input2.id = "input2";
        var login_btn2=document.getElementsByClassName("login_btn2")[0];
        login_btn2.insertBefore(input2,login_btn2.children[0]); 

        var div = document.createElement("div");
        div.setAttribute("class","btn_text2");
        login_btn2.insertBefore(div,login_btn2.children[1]);  
        var btn_text2=document.getElementsByClassName("btn_text2")[0];
        btn_text1.style.display="none";

        input2.onfocus= function () {
            if(this.value=='Password'){
                this.value='';
                input2.type="password";
            }
            btn_text2.style.display="block";
            btn_text2.innerHTML='密码';
            see.style.display="block";
        }

        var div = document.createElement("div");//眼睛
        div.setAttribute("id","see"); 
        login_btn2.insertBefore(div,login_btn2.children[2]);
        see=document.getElementById("see");
        see.style.display="none";
        //眼睛部分
        function blur()  {
            if(this.value==''){
                this.value='Password';
                input2.type="text";
            }
            var btn_text2=document.getElementsByClassName("btn_text2")[0];
            btn_text2.style.display = "none";
            see.style.display="none";
        }
        input2.onblur = blur; //回调函数执行

        count=1;
        see.addEventListener("mousedown", function () {
            console.log(count);
            input2.onblur = null;
            if(count%2){
                see.className  = "btn_notsee";
                input2.type="text";
            }else{
                see.className  = "btn_see";
                input2.type="password";
            }
            count++; 

            setTimeout(function(){
                input2.focus();
                input2.onblur = blur;
            },1)
        })

        var div = document.createElement("div");
        div.setAttribute("class","login_btn3");
        html.appendChild(div);
        var input3 = document.createElement('input'); 
        input3.type="text";
        input3.name="code";
        input3.value="Identifying code";
        var login_btn3=document.getElementsByClassName("login_btn3")[0];
        login_btn3.insertBefore(input3,login_btn3.children[0]); 

        var div = document.createElement("div");
        div.setAttribute("class","btn_text3");
        login_btn3.insertBefore(div,login_btn3.children[1]);  
        var btn_text3=document.getElementsByClassName("btn_text3")[0];
        btn_text3.style.display="none";
        input3.onfocus= function () {
            if(this.value=='Identifying code'){
                this.value='';
            }
            btn_text3.style.display="block";
            btn_text3.innerHTML='验证码';
        }
        input3.onblur= function () {
            if(this.value==''){
                this.value='Identifying code';
            }
            var btn_text3=document.getElementsByClassName("btn_text3")[0];
            btn_text3.innerHTML='';
        }

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

        var div = document.createElement("div");
        div.setAttribute("class","register");
        html.appendChild(div);
        div.innerHTML="注册";
        var register=document.getElementsByClassName("register")[0];
        register.addEventListener("click", function () {
            console.log('hgiughil');
            finish.style.display="block";
            ajax  //调用ajax函数，传入一个对象
            ({
                url: "/login",
                type: 'post',  
                data: {password:'hex_md5(input2.value)',yzm:'picnum_input1.value'}, //只有11位的时候验证码才会出来，所以不用再判断了
                async: true,
                success: function (responseText) {
                    var response=JSON.parse(responseText);
                    if(response==0||response==-1){
                        finish_pic.style.className="notfinish_pic";
                        finish_text.innerHTML=response.msg;
                    }else if(response==1){
                        finish_pic.style.className="finish_pic";
                        finish_text.innerHTML=response.msg+'，'+'请返回首页进行登录';
                    }
                },
                fail: function (err) {
                    // console.log("aaa123456");
                }
            }); 
        })
        finish_confirm.addEventListener("mousedown", function()//不论确定还是取消都是回到前一页
        {
            finish.style.display="none"
        })
        finish_unconfirm.addEventListener("mousedown", function()  
        {
            finish.style.display="none"
        })

        var a = document.createElement("a"); //a包div
        a.setAttribute("class","back_a_btn");
        a.href="#/main";
        html.appendChild(a);
        var back_a_btn=document.getElementsByClassName("back_a_btn")[0];
        var div = document.createElement("div"); //div back
        div.setAttribute("class","back_btn");
        back_a_btn.appendChild(div);
        var back_btn=document.getElementsByClassName("back_btn")[0];
        back_btn.addEventListener("mousedown", function () {
            Router.route('/main', function() //主页面路径
            {  
                mark='login';  //分装函数标志
                fmain();
                // console.log("aaa");
            });
        })

    }
}

function flogup() {                       
    if(logup_count!=1)  //不是第一次点击了
    {
        btn_login.style.display="none";
        btn_logup.style.display="none"; 
        var logup_pagepic=document.getElementsByClassName("logup_pagepic")[0];
        logup_pagepic.style.display="block";
        var logup_btn1=document.getElementsByClassName("logup_btn1")[0];
        logup_btn1.style.display="block";
        var logup_btn2=document.getElementsByClassName("logup_btn2")[0];
        logup_btn2.style.display="block";
        var logup_register=document.getElementsByClassName("logup_register")[0];
        logup_register.style.display="block";
        var back_a_logup_btn=document.getElementsByClassName("back_a_logup_btn")[0];
        back_a_logup_btn.style.display="block";
        
    }
    else{
        btn_login.style.display="none";
        btn_logup.style.display="none";
        var div = document.createElement("div");//图标
        div.setAttribute("class","logup_pagepic");
        html.appendChild(div);

        var div = document.createElement("div");//小字
        div.setAttribute("class","text");  
        html.appendChild(div);
        div.innerHTML="2019年纳新报名";

        var div = document.createElement("div");
        div.setAttribute("class","logup_btn1"); 
        html.appendChild(div);
        var input1 = document.createElement('input'); 
        input1.setAttribute("class","logup_input1"); 
        input1.type="text";
        input1.name="user";
        input1.value="Mobile Phone/Student ID";
        var logup_btn1=document.getElementsByClassName("logup_btn1")[0];
        logup_btn1.insertBefore(input1,logup_btn1.children[0]); 
        var logup_btn1=document.getElementsByClassName("logup_btn1")[0];
        
        var div = document.createElement("div");
        div.setAttribute("class","logup_text1");
        logup_btn1.insertBefore(div,logup_btn1.children[1]);  
        var logup_text1=document.getElementsByClassName("logup_text1")[0];
        logup_text1.style.display="none";
        
        input1.onfocus= function () {
            if(this.value=='Mobile Phone/Student ID'){
                this.value='';
            }
            logup_text1.style.display="block";
            logup_text1.innerHTML='手机号/学号';
        }
        input1.onblur= function () {
            if(this.value==''){
                this.value='Mobile Phone/Student ID';
            }
            var logup_text1=document.getElementsByClassName("logup_text1")[0];
            logup_text1.innerHTML='';
        }
        
        var div = document.createElement("div");//2
        div.setAttribute("class","logup_btn2");
        html.appendChild(div);
        var input2 = document.createElement('input'); 
        input2.type="text";
        input2.name="pass";
        input2.value="Password";
        input2.id = "input2";
        var logup_btn2=document.getElementsByClassName("logup_btn2")[0];
        logup_btn2.insertBefore(input2,logup_btn2.children[0]); 

        var div = document.createElement("div");
        div.setAttribute("class","logup_text2");
        logup_btn2.insertBefore(div,logup_btn2.children[1]);  
        var logup_text2=document.getElementsByClassName("logup_text2")[0];
        logup_text1.style.display="none";

        input2.onfocus= function () {
            if(this.value=='Password'){
                this.value='';
                input2.type="password";
            }
            logup_text2.style.display="block";
            logup_text2.innerHTML='密码';
            logup_see.style.display="block";
        }

        var div = document.createElement("div");//眼睛
        div.setAttribute("id","logup_see"); 
        logup_btn2.insertBefore(div,logup_btn2.children[2]);
        logup_see=document.getElementById("logup_see");
        logup_see.style.display="none";
        //眼睛部分
        function blur()  {
            if(this.value==''){
                this.value='Password';
                input2.type="text";
            }
            var logup_text2=document.getElementsByClassName("logup_text2")[0];
            logup_text2.style.display = "none";
            logup_see.style.display="none";
        }
        input2.onblur = blur;

        count=1;
        logup_see.addEventListener("mousedown", function () {
            console.log(count);
            input2.onblur=null;
            if(count%2){
                logup_see.className  = "btn_notsee";
                input2.type="text";
            }else{
                logup_see.className  = "btn_see";
                input2.type="password";
            }
            count++; 
            
            setTimeout(function(){
                input2.focus();
                input2.onblur = blur;
            },1)
        })

        
        var div = document.createElement("div");  //背景遮罩
        div.setAttribute("class","logup_cloth");
        html.appendChild(div); 
        var logup_cloth=document.getElementsByClassName("logup_cloth")[0];
        logup_cloth.style.display="none";

        var div = document.createElement("div");  //登录成功与否提示框
        div.setAttribute("class","logup_finish");
        html.appendChild(div); 
        var logup_finish=document.getElementsByClassName("logup_finish")[0];
        logup_finish.style.display="none";
        var div = document.createElement("div");  //图标
        div.setAttribute("class","logup_finish_pic");
        logup_finish.appendChild(div); 
        var div = document.createElement("div");  //提示文字
        div.setAttribute("class","logup_finish_text");
        logup_finish.appendChild(div); 

        var logup_finish_pic=document.getElementsByClassName("logup_finish_pic")[0];
        var logup_notfinish_text=document.getElementsByClassName("logup_finish_text")[0];

        var div = document.createElement("div"); //取消
        div.setAttribute("class","logup_finish_unconfirm");
        logup_finish.appendChild(div); 
        var logup_finish_unconfirm=document.getElementsByClassName("logup_finish_unconfirm")[0];
        logup_finish_unconfirm.innerHTML="取消";    
        var div = document.createElement("div");  //确定
        div.setAttribute("class","logup_finish_confirm");
        logup_finish.appendChild(div); 
        var logup_finish_confirm=document.getElementsByClassName("logup_finish_confirm")[0];
        logup_finish_confirm.innerHTML="确定";


        var div = document.createElement("div");
        div.setAttribute("class","logup_register");
        html.appendChild(div);
        div.innerHTML="登录";
        var logup_register=document.getElementsByClassName("logup_register")[0];
        logup_register.addEventListener("click", function () {
            logup_cloth.style.display="block";
            logup_finish.style.display="block";
            ajax  //调用ajax函数，传入一个对象
            ({
                url: "/login",
                type: 'post',  
                data: {password:'hex_md5(input2.value)',yhm:'logup_btn1.value'}, //只有11位的时候验证码才会出来，所以不用再判断了
                async: true,
                success: function (responseText) {
                    var logup_response=JSON.parse(responseText);
                    if(logup_response==0){
                        logup_finish_pic.style.className="logup_notfinish_pic";
                        logup_finish_text.innerHTML=logup_response.msg;
                    }else if(logup_response==1){
                        logup_finish_pic.style.className="logup_finish_pic";
                        logup_finish_text.innerHTML=logup_response.msg;
                    }
                },
                fail: function (err) {
                }
            }); 
        })
        logup_finish_confirm.addEventListener("mousedown", function()//不论确定还是取消都是回到前一页
        {
            logup_finish.style.display="none"
        })
        logup_finish_unconfirm.addEventListener("mousedown", function()  
        {
            logup_finish.style.display="none"
        })
        var a = document.createElement("a");  //a包图片
        a.setAttribute("class","back_a_logup_btn");
        a.href="#/main";
        html.appendChild(a);
        var back_a_logup_btn=document.getElementsByClassName("back_a_logup_btn")[0];
        var div = document.createElement("div"); //back按钮
        div.setAttribute("class","back_logup_btn");
        back_a_logup_btn.appendChild(div);
        var back_logup_btn=document.getElementsByClassName("back_logup_btn")[0];
        back_logup_btn.addEventListener("mousedown", function () {
            Router.route('/main', function() //主页面路径
            {  
                mark='logup';  //分装函数标志
                fmain();
            });
        })
    }
}

//注册界面
Router.route('/login', function() {
    flogin();
    login_count++;  //从第二次开始login_count就不等于一了
});

//登录界面
Router.route('/logup', function() {
    flogup();
    logup_count++;
});

//主页面函数
function fmain() {
    if(mark=='login')  //从login往main跳
    { 
        console.log('bbbb');
        var pagepic=document.getElementsByClassName("pagepic")[0];
        pagepic.style.display="none";
        var login_btn1=document.getElementsByClassName("login_btn1")[0];
        login_btn1.style.display="none";
        var login_btn2=document.getElementsByClassName("login_btn2")[0];
        login_btn2.style.display="none";
        var login_btn3=document.getElementsByClassName("login_btn3")[0];
        login_btn3.style.display="none";
        var register=document.getElementsByClassName("register")[0];
        register.style.display="none";
        var back_a_btn=document.getElementsByClassName("back_a_btn")[0];
        back_a_btn.style.display="none";
    }
    if(mark=='logup')  //从logup往main跳
    {
        console.log('aaaaa');
        var logup_pagepic=document.getElementsByClassName("logup_pagepic")[0];
        logup_pagepic.style.display="none";
        var logup_btn1=document.getElementsByClassName("logup_btn1")[0];
        logup_btn1.style.display="none";
        var logup_btn2=document.getElementsByClassName("logup_btn2")[0];
        logup_btn2.style.display="none";
        var logup_register=document.getElementsByClassName("logup_register")[0];
        logup_register.style.display="none";
        var back_a_logup_btn=document.getElementsByClassName("back_a_logup_btn")[0];
        back_a_logup_btn.style.display="none";
    }
    var main_a_login=document.getElementsByClassName("main_a_login")[0]; //主页左按钮
    main_a_login.style.display="block";
    btn_login.style.display="block";
    var main_a_logup=document.getElementsByClassName("main_a_logup")[0]; //主页右按钮
    main_a_logup.style.display="block";
    btn_logup.style.display="block";
}

