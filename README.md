# 西安邮电大学移动应用开发实验室纳新系统

## 一、项目介绍

​	一套基于node后台，适配移动以及PC端的纳新网站。通过将面试流程化，信息数字化，为用户提供面试状态查询，信息查询等功能。为管理者决策提供数据可视化支持等服务。通过用户，组长，组员，管理员的4端权限分隔，提供数字化面试的一体化解决方案。

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

##### 1）.引入自定义后端模块public_sql.js

主要提供连接数据库，便捷调用服务，sql语句拼接（mysql模块的再次封装）。

1. 创建mysql数据库连接池

```js
var sql = require('./sever/public_sql');
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
sql.insert(tablename,type,value);
return sql.insert("registryinformation",["password","phoneNum"],["asd",13345]);
```

数据库插入命令拼接insert，通过输入对应参数，返回拼接好的sql插入语句。

**参数说明：** 

- tablename：<String> 查询的表
- type：<Array> 插入的字段
- valuse：<Array> 插入的值

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

### 2.注册登录

#### a.前端

#### b.后端

### 3.密码找回

#### a.前端

#### b.后端

### 4.面试者

#### a.前端

#### b.后端

### 5.组长

#### a.前端

#### b.后端

### 6.组员

#### a.前端

#### b.后端

### 7.管理员

#### a.前端

#### b.后端

### 8.页面分发

#### a.前端

#### b.后端

## 五、重要问题记录



