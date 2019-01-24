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

为方便统一管理数据库，保证数据一致性，开发时统一连接到远程数据库。数据库ip地址：132.232.169.227，端口号：3306。数据库连接密码表，会单独发送给相关开发人员。

由于本项目属于github开源项目，对于数据库密码从代码中暴露的问题，通过限制数据库访问ip，保证开发过程中数据库安全。

项目正式上线后，数据库将严格按照后台对应权限设置数据库，重置所有密码，并将连接设置权限为localhost。最大程度上保证数据安全。

- 数据表内容

| 编号 |   名称   |
| :--------: | :--: |
| 1 | 计算机学院18级学生信息表 |
| 2 | 注册人员信息 |
| 3 | 打分标准 |
| 4 | 打分记录 |
| 5 | 人员审核队列 |
| 6 | 公告 |
| 7 | 公告审核队列 |
| 8 | 报名流程 |


- 数据库连接名与权限


|对应后台| 数据库连接名 | 权限 |
|:----: |:----: | :----: |
|测试开发| admin | 全局读写 |
|注册登录| login | 读：18   读写：2 |
|面试| user | 读：268   读写： |
|组长| chargehand | 读：268   读写：3457 |
|组员| group | 读：235678   读写：4 |
|管理| leader | 读：34   读写：25678 |
|密码找回| passpack | 读：   读写：2 |




## 四、开发记录

### 1.公共

#### a.前端

#### b.后端

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



