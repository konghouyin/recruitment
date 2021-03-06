# 西安邮电大学移动应用开发实验室纳新系统

## 一、项目介绍

​	一套基于H5前端和Node后台的纳新系统。前端使用原生开发，并进行Webpack工程化打包，使用 flex 配合 rem 适配了主流移动端，通过 session、 cookie 机制判别用户身份，并完成检测恶意登录和过期掉线等需求，实现了登录注册、报名、审核、打分、评论、查询等功能。服务端主要使用 Nodejs、Express、MySQL ，在完成常规的数据存读的基础上，还实现了按权限页面分发、短信电子邮件发送、代理登录校园教务系统获取学生身份、生成系统日志、系统异常崩溃检测和自动重启等功能。

## 二、项目框架

![网站架构图](design/网站架构.png)

## 三、开发规范

### 1.命名规范

- 公共：public
- 登录注册：login
- 密码找回：passback
- 面试：user
- 组长：chargehand
- 组员：group
- 管理员：leader

文件统一命名格式：lead_mobile/pc_xxx.xxx

### 2.gitignore

​	整个项目中node_modules文件夹和webpack配置文件不上传。通过上传package-lock文件，来统一管理可能应用到的工具。在单独安装第三方模块的时候，需要在安装工具记录中更新。

> 安装命令：npm install xxx 
>
> 更新命令：npm install

 

- 已安装的工具
     - webpack
     - webpack-cli
     - express
     - express-static
     - mysql
     - cookie-paser
     - cookie-session
     - svg-captcha（图片验证码）
     - crypto（加密函数）
     - cheerio（解析网页）
     - request（发送网络请求）
     - zlib（网络请求gzip解密）
     - nodemailer（邮件请求）

### 3.项目目录

```mariadb
|README.md
├──dist #webpack输出
├── src#资源
│ ├── pic
│ │ └── logo.png
│ ├── style
│ │ └── xxx.css
│ ├── js
│ │ └── xxx.js
│ ├── xxx.html
├── server#后台自定义共用文件
├── xxx_server.js #服务后台
├── package.json #项目配置文件
├── package-lock.json #模块配置文件
└── webpack.config.js #webpack配置文件（不上传）
```

### 4.分支管理

- master:主分支

- fan：樊宗渤的分支

- zhao：赵雅旋的分支

- yao：姚锦的分支

- zhang：张银鸽的分支

**注意：**

master为主分支，需要时刻保持准确。个人完成一部分功能后，可以自己往主分支上合。但禁止在master分支上直接开发。

### 5.数据库

为方便统一管理数据库，保证数据一致性，开发时统一连接到远程数据库。数据库ip地址：132.232.169.227，端口号：3306，数据库名称：recruitment。数据库连接密码表，会单独发送给相关开发人员。

由于本项目属于github开源项目，对于数据库密码从代码中暴露的问题，通过限制数据库访问ip，保证开发过程中数据库安全。

项目正式上线后，数据库将严格按照后台对应权限设置数据库，重置所有密码，并将连接设置权限为localhost。最大程度上保证数据安全。

- 数据表内容

| 编号 |   名称   | 表名 |
| :--------: | :--: | :--------: |
| 1 | 计算机学院18级学生信息表 | studentinformation |
| 2 | 注册人员信息 | registryinformation |
| 3 | 打分标准 | scoringstandard |
| 4 | 打分记录 | scoringrecord |
| 5 | 人员审核队列 | personnelqueue |
| 6 | 公告 | notice |
| 7 | 公告审核队列 | noticequeue |
| 8 | 报名流程 | process |


- 数据库连接名与权限


|对应后台| 数据库连接名 | 权限 |
|:----: |:----: | :----: |
|测试开发| admin | 全局读写 |
|注册登录| login | 读：18   读写：2 |
|面试| user | 读：268   读写： |
|组长| chargehand | 读：268   读写：3457 |
|组员| group | 读：235678   读写：4 |
|管理| leader | 读：34   读写：25678 |
|密码找回| passback | 读：   读写：2 |




## 四、开发记录

### 1.公共

#### a.前端

#### b.后端

##### 1）.自定义后端模块public_sql.js

主要提供连接数据库，便捷调用服务，sql语句拼接（mysql模块的再次封装）。

1. 创建mysql数据库连接池

```js
var sql = require('./server/public_sql');
var pool  = sql.createPool({
  connectionLimit : 10,
  host            : '132.232.169.227',
  user            : 'admin',
  password        : 'xxx',
  database        : 'recruitment'
});
```

使用createPool方法进行数据库连接池创建，通过数据库连接池，提高与mysql之间交互效率。

2. 通过连接池进行数据库操作

```js
function out1(data){
	return "SELECT * FROM registryinformation WHERE xuehao='"+data[0].xuehao+"'"
}
function out2(data){
	return "SELECT * FROM registryinformation WHERE xuehao='"+data[0].xuehao+"'"
}
function end(data){
	console.log(data);
}

sql.sever(pool,SQLString,function(data){
	sql.sever(pool,out1(data),function(data){
		sql.sever(pool,out2(data),function(data){
			end(data);
		});
	});
});
```

​     封装sql数据库命令sever，通过获取sql命令以及回调函数，实现包括从连接池获取连接，使用完释放连接的完整SQL查询。

**参数说明：** 

- pool：<Object> 连接池

- SQLString：<String> sql语句

- fn：<Function> 回调函数（传入参数是查询结果的数组）

**提示：** 可以将SQLString生成函数，最后的回调函数，提取出来，优化代码。

**注意：** 输入的SQLString要求要进行转义，防止SQL注入。

3. sql语句转换

```js
sql.escape(name);
```

不同类型的值转义的方式是有区别的，其区别如下：

- 数字不会被转义
- 布尔值会被转移成 true / false
- Date 对象会被转义成形如 'YYYY-mm-dd HH:ii:ss' 的字符串
- Buffer 会被转义成十六进制字符串，如： X'0fa5'
- 字符串会被安全地转义
- 数组会被转义成列表，例如： ['a', 'b'] 会被转义成 'a', 'b'
- 嵌套数组会被转义成多个列表（在大规模插入时），如： [['a', 'b'], ['c', 'd']] 会被转义成 ('a', 'b'), ('c', 'd')
- 对象的所有可遍历属性会被转义成键值对。如果属性的值是函数，则会被忽略；如果属性值是对象，则会使用其 toString() 方法的返回值。
- undefined / null 会被转义成 NULL
- NaN / Infinity 将会被原样传入。由于MySQL 并不支持这些值，在它们得到支持之前，插入这些值将会导致MySQL报错。

**注意：** 所有从前端获取的内容，不能直接拼接进入sql语句，必须转换后再使用。

4. SELECT语句拼接

```js
sql.select（type，tablename[，where]）;
```

数据库查询命令拼接select，通过输入对应参数，返回拼接好的sql查询语句。

**参数说明：** 

- type：<Array> 查询的字段
- tablename：<String> 查询的表
- where：<String> where过滤语句（参数可选）

**注意：** 当有多条Where过滤条件时，注意拼接时的空格。

**示例：** 

```js
obj={
	name:"樊宗渤",
	xuehao:"04173167"
}

function out1(){
	var where ="xingming="+sql.escape(obj.name)+" and xuehao="+sql.escape(obj.xuehao);
	return sql.select(["xuehao","xingming"],"studentinformation",where);
}
function out2(data){
	return sql.select(["*"],"registryinformation","name='"+data[0].xingming+"'");
}
function end(data){
	console.log(data);
}

sql.sever(pool,out1(),function(data){
	sql.sever(pool,out2(data),function(data){
			end(data);
	});
});
```

5. INSERT语句拼接

```js
sql.insert(tablename,type,value,ignore);
return sql.insert("registryinformation",["password","phoneNum"],["asd",13345]);
```

数据库插入命令拼接insert，通过输入对应参数，返回拼接好的sql插入语句。

**参数说明：** 

- tablename：<String> 查询的表
- type：<Array> 插入的字段
- valuse：<Array> 插入的值
- ignore：<Boole> 筛选防止多重添加（可选参数）

**注意：** 插入字段与插入值的个数应该相同。

6. UPDATE语句拼接

```js
sql.update(tablename, type, value[,where]);
sql.update("registryinformation",["password","phoneNum"],["123",123],"name='樊宗渤'");
```

**参数说明：** 

- tablename：<String> 查询的表
- type：<Array> 插入的字段
- valuse：<Array> 插入的值
- where：<String> where过滤语句（参数可选）

**注意：** 当有多条Where过滤条件时，注意拼接时的空格。修改字段与修改值的个数应该相同。

7. DELETE语句拼接

```js
sql.del(tablename[,where]);
sql.del("registryinformation","name='樊宗渤'");
```

**参数说明：** 

- tablename：<String> 查询的表
- where：<String> where过滤语句（参数可选）

**注意：** 当有多条Where过滤条件时，注意拼接时的空格。

**警告：** 此接口不使用where参数会导致删除数据表，请谨慎使用。

##### 2）.自定义后端模块public_message.js

与飞鸽传书短信平台，进行数据对接，进行短信推送服务。

- 使用实例

```js
var shortMessage = require('./server/public_message');
shortMessage.send(phone,style,message);
shortMessage.send(['153...'],'85776','xxx||xxx');
```

**参数说明：** 

- phone：<Array> 发送到的手机号

- style：<String> 模版编号（飞鸽传书平台获取）

- message：<String> 模版内插入的值（||进行分割） 

     

**注意：** 考虑到后台效率，短信功能没有添加回调。即只能触发短信任务，不知道短信是否发送成功。通过用户反馈，来判断发送是否成功前端注意60秒，做好前端节流。

##### 3）.自定义后端模块public_mail.js

提供邮箱发送邮件服务，在需要管理员审核时，给管理员发送一封邮件，通知管理员及时处理信息。

- 使用实例

```js
var m = require('./server/public_mail.js');
m.mailepass(message);
m.mailepass("Android组 提出公告申请，请及时审核！");
```

**参数说明：** 

- message：<String> 发送的内容   

**注意：** 不用传入邮箱地址，已经把管理员邮箱在模块内写好了。邮件功能没有添加回调。只发送指令即可。

##### 4）.自定义后端模块public_validate.js

提供跳转身份验证，并下发session，返回登录信息。

- 使用实例

```js
var validate = require('./server/public_validate.js');
server.get('/new',function(req,res){
	validate.prove(pool,req,res,level);
})
```

**参数说明：** 

- pool：<Pool> 数据库连接池
- req：<Object>请求
- res：<Object>  响应
- level: <Int> 登录权限（1.用户2.组员3.组长4.管理员）

**注意：** 使用时一定要在调用之前处理好cookie，session。使用这个模块，会自动向前端返回状态，即new接口的返回结果。

```json
失败返回：
{
    msg: "cookie超时！",//错误原因
	style: 0,//0没有cookie，-1cookie解析错误，-2cookie超时，-3权限有误
	url: "登陆页面url"
}
成功返回：
{
    style:1，
    name:"xxx",
    xuehao:"xxx",
    selfgroup:3//1.Android,2.ios,3.web,4.后台,5.产品
}
```

### 2.注册登录

#### a.前端

#### b.后端

##### 1.申请图片验证图像

- url：/picyzm

- 方法：GET

- 参数：无

- 返回

```json
{
    pic："<svg>...</svg>"，
    style：1	//1成功，
}
```

##### 2.验证图片验证码，并发送短信

- url：/phone
- 方法：post
- 参数：phone=153····&picyzm=4s5d
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0验证码错误，-1验证码失效，-2此电话已注册，-3其他异常（输入不是11位手机号），
}
```

##### 3.注册验证

- url：/reg
- 方法：post
- 参数：password=（MD5加密）&yzm=4s5d
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0验证码错误，-1验证码失效，
}
```

注册时数据库插入冲突：

- 触发情况：在不同设备，使用同一手机号注册，下发两个session绑定同一手机号，有可能会触发数据库多次插入。
- 解决方案：sql语句添加ignore来保证不会添加重复，防止数据库主键冲突。

##### 4.登录验证

- url：/login
- 方法：post
- 参数：password=（MD5加密）&yhm=8位或11位
- 返回

```json
{
    msg："具体情况"，
    url："http",//跳转路径（两种跳转路径，个人页面或是补全页面）
    style：0	//1成功，0用户名或错误
}
```

登录部分考虑到用户体验和开发周期，没有设计图片验证码，但考虑到接口安全，未来可以在这个地方继续升级完善。（连续三次输错密码，需要图片验证码）

### 3.密码找回

#### a.前端

#### b.后端

##### 1.申请图片验证图像

- url：/picyzm
- 方法：GET
- 参数：无
- 返回

```json
{
    pic："<svg>...</svg>"，
    style：1	//1成功
}
```

##### 2.验证图片验证码，并发送短信

- url：/phone
- 方法：post
- 参数：phone=153····&picyzm=4s5d
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0验证码错误，-1验证码失效，-2此手机号没有注册，-3其他异常（输入不是11位手机号），
}
```

##### 3.密码找回

- url：/passback
- 方法：post
- 参数：password=（MD5加密）&yzm=728332
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0验证码错误，-1验证码失效
}
```

### 4.面试者

#### a.前端

#### b.后端 

##### 1）接口

### 5.组长

#### a.前端

#### b.后端
1.身份验证，下发session
- url：/new
- 方法：GET
- 参数：无
- 返回
```js
{
    msg:"具体情况"，
    style:1代表成功，0代表失败
}
```
2.添加修改打分标准
- url: /addrule
- 方法：post
- 参数：'{"C语言":50,"沟通能力":10....}'  (字符串)
- 举个例子
```js
let a={xingming:1,xuehao:2};
res.send(JSON.stringify(a));
```
- 返回
```js
{
    msg:"具体情况"，
    style:1代表成功，0代表失败
}
```
3.查询打分规则
- url: /searchrule
- 方法：get
- 参数：number=1或2
- 返回
```js
{
    msg:"具体情况"，
    style:1代表成功，0代表失败
}
```
注：前端记得对返回的打分规则进行转义

4.登录用户查看个人信息
- url: /selfInfo
- 方法：get
- 参数：无
- 返回
```js
{
    "style":1代表成功，0代表失败，
    "msg":"具体情况"，
    "selfInfo":[{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":"计科1706","xingbie":"女","selfgroup":3,"style":0,"pass":1}]
}
```
5.查看本组报名数据
- url: /viewgroupreg
- 方法：get
- 参数：无
- 返回
```js
{
    "selfInfo":[{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":0,"pass":1},{},{}...]
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
6.查询每面排名数据
- url: /rank
- 方法：get
- 参数：number=1
- 返回
```js
{
    "score":[{"id":2,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10,\"第三题\":10}","advice":"继续努力","history":"xxxx"},{},...]
    "info":[{"xuehao":4171197,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程","banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},{},{}...]
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
7.查询某人所有面试信息
- url: /rankdetails
- 方法：post
- 参数：xuehao=4171xxx
- 返回
```js
{
    "scoreInfo":[{"id":2,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":20,...}","advice":"继续努力","history":"xxxx"},{"id":4,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":19,...}","advice":"继续努力","history":"xxxx"},{"id":7,"xuehao":4171196,"selfgroup":3,"type":2,"time":"2019-02-02T16:48:05.000Z","person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","history":"xxxx"}],,//包括这人目前为止所有面试信息,其中一面有几个人给面试者打分就有几条一面成绩信息，二面面试信息只有一条
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
8.一面打分
- url: /mark
- 方法：post
- 参数：'{xuehao:123xxx,context:"xxxx",advince:"xxxx",history:"xxxx"}'
- 返回
```js
{
    "msg":"具体情况"，//成功或失败原因
    "style":1代表成功，0代表失败
}
```
9.二面打分
- url: /secondmark
- 方法：post
- 参数：{present:2,xuehao:123xxx,obj:"打分内容",history:"面试记录"}(转字符串)
- 返回
```js
{
    "msg":"具体情况"，//成功或失败原因
    "style":1代表成功，0代表失败
}
```
10.发布公告
- url: /releasenotice
- 方法：post
- 参数：
 ```js
message={
                title:"111",
                context:"22233"
}//转字符串
 ```
 - 返回
 ```
 {
       "style": 1成功0失败,
       "msg": "具体情况"
 }
 ```
11.查询正式公告
- url: /shownotice
- 方法：get
- 参数：无
- 返回
```js
{
    "style":1成功，0失败,
    "msg":"具体状态",
    "group":"{\"title\":\"通知\"，\"context\":\"hhhh\"}",
    "mian":"{\"title\":\"通知\"，\"context\":\"hhhh\"}"
}
```
- 注明：经过讨论，这个接口的使用要基于公告数据表的初始化。即，面试开始前每组公告内容为null。
12.查询公告队列公告
- url: /shownoticeque
- 方法：get
- 参数：无
- 返回
```js
{
    "text":"{\"title\":\"通知\"，\"context\":\"hhhh\"}",
    "style":1成功，0失败,
    "msg":"具体状态"
}
```
13.输入学号查看个人信息
- url: /searchinfobynum
- 方法：get
- 参数：xuehao=4171196
- 返回
```js
{
    "info":{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":"计科1706","xingbie":"女","selfgroup":3,"style":0,"pass":1},
    "style":1成功，0失败
    "msg":"具体情况"
}
```
14.查找二面上次打分时间和打分内容
- url: /findSecond
- 方法：get
- 参数：xuehao=4171196
- 返回
```js
{
    "style":1,
    "msg":"查找成功",
    "lastTime":"2019-02-02T16:48:05.000Z",
    "lastobj":"{\"第一题\":10,\"第二题\":10}"
}
```
15.通过人员选择
- url: /selectviews
- 方法：post
- 参数：
```js
message = {
            xuehao: [4171196, 4171197],
            state:1//当前是几面
}//转字符串
```
- 返回
```
{   
    "style":1成功0失败,
    "msg":"具体原因"
}
```
16.查看本组审核人员队列
- url: /searchperson
- 方法：get
- 参数：无
- 返回
```js
{
    "style":1成功，0失败,
    "person":[{"xuehao":4171196,"name":"张银鸽","selfgroup":3,"time":"2019-02-11T09:56:49.000Z"}],
    "msg":"具体情况"
}
```
### 6.组员

#### a.前端

#### b.后端
1.身份验证，下发session
- url：/new
- 方法：GET
- 参数：无
- 返回
```js
{
    "msg":"具体情况"，
    "style":1代表成功，0代表无cookie,-1代表cookie解析错误，-2代表cookie超时，
    "url":登录页面
}
```
2.查询打分规则
- url: /searchrule
- 方法：get
- 参数：number=1或2
- 返回
```js
{
   "rules":"{\"C语言\":50,\"沟通能力\":20}",
   "style":1,
    "msg":具体情况
}

```
注：前端记得对返回的打分规则进行转义

3.登录用户查看个人信息
- url: /selfInfo
- 方法：get
- 参数：无
- 返回
```js
{
    "style":1代表成功，0代表失败，
    "msg":"具体情况"，
    "selfInfo":[{"name":1,"xuehao":2,.....}]
}
```
4.查看本组报名数据
- url: /viewgroupreg
- 方法：get
- 参数：无
- 返回
```js
{
    "selfInfo":[{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":0,"pass":1},{},{}...]
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
5.查询每面排名数据
- url: /rank
- 方法：get
- 参数：number=1
- 返回
```js
{
    "score":[{"id":2,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10,\"第三题\":10}","advice":"继续努力","history":"xxxx"},{},...]
    "info":[{{"xuehao":4171197,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程","banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1}},{},{}...]
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
6.查询某人所有面试信息
- url: /rankdetails
- 方法：get
- 参数：xuehao=4171xxx
- 返回
```js
{
    "scoreInfo":[{"id":2,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":20,...}","advice":"继续努力","history":"xxxx"},{"id":4,"xuehao":4171196,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z","person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":19,...}","advice":"继续努力","history":"xxxx"},{"id":7,"xuehao":4171196,"selfgroup":3,"type":2,"time":"2019-02-02T16:48:05.000Z","person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","history":"xxxx"}],,//包括这人目前为止所有面试信息,其中一面有几个人给面试者打分就有几条一面成绩信息，二面面试信息只有一条
    "msg":"具体情况"，
    "style":1代表成功，0代表失败
}
```
7.一面打分
- url: /mark
- 方法：post
- 参数：{present:1,xuehao:123xxx,obj:"打分内容",advice:"xxxx",history:"xxxx"}(转字符串)
- 返回
```js
{
    "msg":"具体情况"，//成功或失败原因
    "style":1代表成功，0代表失败
}
```
8.二面打分
- url: /secondmark
- 方法：post
- 参数：{present:2,xuehao:123xxx,obj:"打分内容",history:"面试记录"}(转字符串)
- 返回
```js
{
    "msg":"具体情况"，//成功或失败原因
    "style":1代表成功，0代表失败
}
```
9.查询正式公告
- url: /shownotice
- 方法：get
- 参数：无
- 返回
```js
{
    "style":1成功，0失败,
    "msg":"具体状态",
    "group":"{\"title\":\"通知\"，\"context\":\"hhhh\"}",
    "mian":"{\"title\":\"通知\"，\"context\":\"hhhh\"}"
}
```
- 注明：经过讨论，这个接口的使用要基于公告数据表的初始化。即，面试开始前每组公告内容为null。
10.输入学号查看个人信息
- url: /searchinfobynum
- 方法：get
- 参数：xuehao=4171196
- 返回
```js
{
    "info":{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":"计科1706","xingbie":"女","selfgroup":3,"style":0,"pass":1},
    "style":1成功，0失败
    "msg":"具体情况"
}
```
11.查找二面上次打分时间和打分内容
- url: /findSecond
- 方法：get
- 参数：xuehao=4171196
- 返回
```js
{
    "style":1,
    "msg":"查找成功",
    "lastTime":"2019-02-02T16:48:05.000Z",
    "lastobj":"{\"第一题\":10,\"第二题\":10}"
}
```
### 7.管理员

#### a.前端

#### b.后端

### 8.页面分发

#### a.前端

#### b.后端

### 9.补全用户信息和报名

#### a.前端

#### b.后端

##### 1.计算机学院完善个人信息

- url：/person/computer
- 方法：post
- 参数：xuehao=04xxxxxx&name=xxx
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0没有查到此学号，-1姓名与学号不匹配，-2账号已经绑定学号，-3数据库异常，-5此学号已绑定
}
```

验证逻辑：session---> 学号合法性---> 学号唯一性--->当前账号是否已有绑定---> 输入信息正确性---> 存入

##### 2.教务系统验证补全个人信息

- url：/person/teach
- 方法：post
- 参数：xuehao=xxxxxxxx&password=xxx
- 返回

```json
{
    msg："具体情况"，
    style：0	//1成功，0用户名或密码有误，-2已经绑定学号，-3数据库异常，-4教务代理请求异常，-5此学号已绑定
}
```

验证逻辑：session---> 学号合法性---> 学号唯一性--->当前账号是否已有绑定---> 教务密码正确性---> 存入

user_teachSystem.js为教务系统验证文件，验证输入学号，密码是否正确，并可以从个人页面爬取个人信息。此模块用于身份验证绑定。

西安邮电大学新教务系统代理登录请求交互步骤

- 请求session-id，之后的所有请求必须要添加此session-id，否则会被返回至主页面。
- 解析html从中提取csrftoken
- 请求加密公钥，将用于用户RSA加密。
- 验证身份，发送csrftoken，学号，加密后的用户密码
- 请求并解析个人数据

##### 3.分组报名

- url：/signin
- 方法：post
- 参数：selfgroup=1（1Android，2ios，3web，4后台，5产品）
- 返回
```json
{
    msg："具体情况"，
    style：0	//1成功，0报名已截止，-1已经分组，-2还未完成身份信息填写，-3数据库异常
    url："http://xxx.com"//报名成功后跳转页面
}
```

- 注意：报名成功和已分组都会返回跳转个人主页的操作，跳转有效时间暂定5秒。

## 五、重要问题记录

### 1.上线需要调整参数

- 跨域参数Allow-origin
- 跨后台登录，携带cookie。两后台验证加密秘钥
- 数据库登录密码
- 各后台session，cookie，秘钥数组，签名
- 短信平台秘钥，配置ip

### 2.安全问题

#### 1.恶意绑定学号

​	存在一个安全隐患，根据之前收集的数据，有1/5的人会忘记教务密码，为了减小手动输入的问题，引入计算机学院学号，姓名验证模式。但是这样存在恶意绑定的问题。考虑到恶意注入数据量（每个手机号只能绑定一个），以及恶意注入可能性，暂时不修复此漏洞。

​	修复方案：数据库筛选信息，过滤掉无意义数据，保证此手机号无法再次注入，新增电话号码黑名单，并提交到短信平台，进行封杀。

几个问题：

1.重复创建节点与控制display方法的选择

如果重复创建节点，

第一，会造成空间的浪费。

第二，单从效果来看，即使在同一个位置重复创建的节点的变量名相同，也是独立的，互不相同的。比如说第一次创建节点a，通过js设置了elemen.innerHtml=abc，在下面的程序又创建了节点a，第二个a节点上是没有innerHtml属性的，而第二个a又是覆盖第一个a的，所以现在显示出来的样式是覆盖后的无样式。

所以想让元素的样式在切换页面后始终生效，是不能通过在新页面插入同样类名的节点来实现的（除非给新类名再次加入样式），这时候我们就应该通过控制display方法来控制元素样式在不同页面上的显隐。

2.作用域的问题

我们有两个独立的函数用了相同的变量名，而且变量都是局部的，通常情况下，函数作用完释放掉变量，所以相同变量名的使用是不受任何影响的。

这里要明晰节点在创建后获取，是将所获取的节点赋值给一个变量的，但它本质上还是一个节点，当我们在函数外获取节点时，获取的是最后一起作用的函数里的那个节点（覆盖）。所以要区分与上面所说的情况的不同。

