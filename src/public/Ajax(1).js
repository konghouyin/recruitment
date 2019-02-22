/*
ajax({
    url: "", //请求地址
    type: 'get',   //请求方式
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: false,   //是否异步
    success: function (responseText) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {
        // 此处为执行失败后的代码 
    }
}); */

function Ajax(object) {
    xhr = new XMLHttpRequest();
	xhr.withCredentials = true;//携带cookie
    var message = getParmer(object.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                object.success(xhr.responseText,xhr.responseXML);
            } else {
                object.fail(xhr.status);
            }
        }
    };

    if (object.type == 'get') {
        xhr.open("get", object.url + "?" + message,object.async);
        xhr.send(null);
    } else if(object.type == 'post'){
        xhr.open("post", object.url, object.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(message);
    }
}

function getParmer(data) {
    var arr = [];
    for (var thing in data) {
        arr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));
    }
    return arr.join('&');
}