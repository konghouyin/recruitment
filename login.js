var sql = require('./sever/public_sql');
var cookiep = require('cookie-parser');
var cookies = require('cookie-session');
var express = require('express');
var svgCaptcha = require('svg-captcha');
var crypto = require('crypto');

var server = express();

server.all('*', function(req, res, next) {
	// console.log(req.headers);
    res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//处理跨域







server.listen(8081);
