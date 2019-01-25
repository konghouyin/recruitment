function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function(){};
};
Router.prototype.refresh = function() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();

//封装了一个简易的前端路由

var html = document.querySelector('html');


function flogin() {
    // html.style.backgroundColor = color;
    
}
function flogup() {
    var btn_login=document.getElementsByClassName("login")[0];
    var btn_logup=document.getElementsByClassName("logup")[0];
    btn_login.style.display="none";

    var div = document.createElement("div");//0是图标,1是小字
    div.setAttribute("class","pagepic");
    html.appendChild(div);

    var div = document.createElement("div");
    div.setAttribute("class","text");  
    html.appendChild(div);

    var div = document.createElement("div");
    div.setAttribute("class","login_btn1"); 
    html.appendChild(div); 
    
    var div = document.createElement("div");
    div.setAttribute("class","login_btn2");
    html.appendChild(div);
    
    var div = document.createElement("div");
    div.setAttribute("class","login_btn3");
    html.appendChild(div);
}

// //注册界面
// Router.route('/login', function() {
//     flogin();
// });

// //登录界面
// Router.route('/logup', function() {
//     flogup();
// });


 
    
  
