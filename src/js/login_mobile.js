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

function flogup() {
    // html.style.backgroundColor = color;
    
}
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
    input1.onfocus= function () {
        if(this.value=='Mobile phone'){
            this.value='';
        }
        var div = document.createElement("div");
        div.setAttribute("class","btn_text1");
        login_btn1.insertBefore(btn_text1,login_btn1.children[1]);   
    }
    input1.onblur= function () {
        this.value='Mobile phone';
    }
    
    var div = document.createElement("div");
    div.setAttribute("class","login_btn2");
    html.appendChild(div);
    var input2 = document.createElement('input'); 
    input2.type="text";
    input2.name="pass";
    input2.value="Password";
    var login_btn2=document.getElementsByClassName("login_btn2")[0];
    login_btn2.insertBefore(input2,login_btn2.children[0]); 
    input2.onfocus= function () {
        if(this.value=='Password'){
            this.value='';
        }
    }

    var div = document.createElement("div");
    div.setAttribute("class","login_btn3");
    html.appendChild(div);
    var input3 = document.createElement('input'); 
    input3.type="text";
    input3.name="code";
    input3.value="Identifying code";
    var login_btn3=document.getElementsByClassName("login_btn3")[0];
    login_btn3.insertBefore(input3,login_btn3.children[0]); 
    input3.onfocus= function () {
        if(this.value=='Identifying code'){
            this.value='';
        }
    }

    var div = document.createElement("div");
    div.setAttribute("class","register");
    html.appendChild(div);
    div.innerHTML="登录";

    var div = document.createElement("div");
    div.setAttribute("class","back_btn");
    html.appendChild(div);


}

//注册界面
Router.route('/login', function() {
    flogin();
});

//登录界面

Router.route('/logup', function() {
    flogup();
});

 


