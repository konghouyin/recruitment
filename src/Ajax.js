/*
ajax({
    url: "", //请求地址
    type: 'get',   //请求方式
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: true,   //是否异步
    success: function (responseText) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {
        // 此处为执行是失败后的代码 
    }
}); */

function ajax(object){
    xhr=new XMLHttpRequest();
    xhr.withCredentials = true;//携带cookie
    xhr.addEventListener("readystatechange",function(){
        if(xhr.readyState==4){
            var status=xhr.status;
            if(status>=200&&status<300){
                object.success(xhr.responseText);
            }else{
                object.fail(status);
            }
        }
    })
    var message=transfrom(object.data);
    if(object.type=="get"){
        xhr.open("get",object.url+"?"+message,object.async);
        xhr.send(null);
    }else if(object.type=="post"){
        xhr.open("post",object.url,object.async);
        xhr.setRequestHeader("Content-Type","application/X-www-form-urlencoded");
        xhr.send(message);
    }
}
function transfrom(data){
    var arr=[];
    for(thing in data){  //用thing来接收data的属性名
        arr.push(encodeURIComponent(thing)+"="+encodeURIComponent(data[thing]));//访问对象的方式
    }
    return arr.join("&");
}


