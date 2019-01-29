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

var html = document.querySelector('html');
var btn_login=document.getElementsByClassName("login")[0];
var btn_logup=document.getElementsByClassName("logup")[0];

// function setFocus() {
//     var range = this.createTextRange(); 
//      range.moveStart('character', this.value.length); 
//      range.collapse(true);
//     range.select();
// }

function flogin() {
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
        if(count%2){
            see.className  = "btn_notsee";
            input2.type="text";
        }else{
            see.className  = "btn_see";
            input2.type="password";
        }
        if(input2.value!=''){
            count++;  //还未输入就按，第一次会失效
        }
        setTimeout(function(){
            input2.focus();
            // input2.onblur = blur;
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

    var div = document.createElement("div");
    div.setAttribute("class","register");
    html.appendChild(div);
    div.innerHTML="注册";

    var a = document.createElement("a"); //a包div
    a.setAttribute("class","back_a_btn");
    a.href="#/main";
    html.appendChild(a);
    var back_a_btn=document.getElementsByClassName("back_a_btn")[0];
    var div = document.createElement("div"); //div back
    div.setAttribute("class","back_btn");
    back_a_btn.appendChild(div);
    var back_btn=document.getElementsByClassName("back_btn")[0];
    back_btn.addEventListener("touchstart", function () {
        Router.route('/main', function() //主页面路径
        {  
            mark=login;  //分装函数标志
            fmain();
            // console.log("aaa");
        });
    })
}

function flogup() {
    btn_login.style.display="none";
    btn_logup.style.display="none";
    var div = document.createElement("div");//图标
    div.setAttribute("class","pagepic");
    html.appendChild(div);

    var div = document.createElement("div");//小字
    div.setAttribute("class","text");  
    html.appendChild(div);
    div.innerHTML="2019年纳新报名";

    var div = document.createElement("div");
    div.setAttribute("class","logup_btn1"); 
    html.appendChild(div);
    var input1 = document.createElement('input'); 
    input1.type="text";
    input1.name="user";
    input1.value="Mobile Phone/Student ID";
    var logup_btn1=document.getElementsByClassName("logup_btn1")[0];
    logup_btn1.insertBefore(input1,logup_btn1.children[0]); 
    
    var div = document.createElement("div");
    div.setAttribute("class","btn_text1");
    logup_btn1.insertBefore(div,logup_btn1.children[1]);  
    var btn_text1=document.getElementsByClassName("btn_text1")[0];
    btn_text1.style.display="none";
    
    input1.onfocus= function () {
        if(this.value=='Mobile Phone/Student ID'){
            this.value='';
        }
        btn_text1.style.display="block";
        btn_text1.innerHTML='手机号/学号';
    }
    input1.onblur= function () {
        if(this.value==''){
            this.value='Mobile Phone/Student ID';
        }
        var btn_text1=document.getElementsByClassName("btn_text1")[0];
        btn_text1.innerHTML='';
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
    div.setAttribute("class","btn_text2");
    logup_btn2.insertBefore(div,logup_btn2.children[1]);  
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
    logup_btn2.insertBefore(div,logup_btn2.children[2]);
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
    input2.onblur = blur;

    count=1;
    see.addEventListener("mousedown", function () {
        console.log(count);
        if(count%2){
            see.className  = "btn_notsee";
            input2.type="text";
        }else{
            see.className  = "btn_see";
            input2.type="password";
        }
        if(input2.value!=''){
            count++;  //还未输入就按，第一次会失效
        }
        setTimeout(function(){
            input2.focus();
            // input2.onblur = blur;
        },1)
    })
   
    var div = document.createElement("div");
    div.setAttribute("class","register");
    html.appendChild(div);
    div.innerHTML="登录";

    var a = document.createElement("a"); 
    a.setAttribute("class","back_a_btn");
    a.href="#/main";
    html.appendChild(a);
    var back_a_btn=document.getElementsByClassName("back_a_btn")[0];
    var div = document.createElement("div"); //back按钮
    div.setAttribute("class","back_btn");
    back_a_btn.appendChild(div);
    var back_btn=document.getElementsByClassName("back_btn")[0];
    back_btn.addEventListener("touchstart", function () {
        Router.route('/main', function() //主页面路径
        {  
            mark=logup;  //分装函数标志
            fmain();
        });
    })

}

//注册界面
Router.route('/login', function() {
    flogin();
});

//登录界面
Router.route('/logup', function() {
    flogup();
});

//主页面函数
function fmain() {

    if(mark==login){
        // 删除相关
        var btn_login=document.getElementsByClassName("login")[0];
        btn_login.style.display="none";
    }
    if(mark==logup){
        // 删除相关
        var btn_logup=document.getElementsByClassName("logup")[0];
        btn_logup.style.display="none";
    }


    var div = document.createElement("div");
    div.setAttribute("class","headline");
    html.appendChild(div);
    div.innerHTML="移动应用开发实验室";

    var a = document.createElement("a"); 
    a.setAttribute("class","main_a_login");
    a.href="#/login";
    html.appendChild(a);
    var main_a_login=document.getElementsByClassName("main_a_login")[0];
    var div = document.createElement("div"); 
    div.setAttribute("class","login");
    main_a_login.appendChild(div);
    var login=document.getElementsByClassName("login")[0];
    login.innerHTML="注册";

    var a = document.createElement("a"); 
    a.setAttribute("class","main_a_logup");
    a.href="#/logup";
    html.appendChild(a);
    var main_a_logup=document.getElementsByClassName("main_a_logup")[0];
    var div = document.createElement("div"); 
    div.setAttribute("class","logup");
    main_a_logup.appendChild(div);
    var logup=document.getElementsByClassName("logup")[0];
    logup.innerHTML="登录";
}


