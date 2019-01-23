# 西安邮电大学移动应用开发实验室纳新系统

## 一、项目介绍

​	一套基于node后台，适配移动以及PC端的纳新网站。通过将面试流程化，信息的数字化，为用户提供面试状态查询，信息查询等功能。为管理者决策提供数据可视化，数据支持等功能。通过用户，组长，组员，管理员的4端权限分隔，提供数字化面试的一体化解决方案。

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

​	整个项目只有node_modules文件夹不上传。通过上传package-lock文件，来统一管理可能应用到的插架。在单独安装第三方模块的时候，需要在安装工具记录中更新。

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

为方便统一管理数据库，保证数据一致性，统一连接到远程数据库。数据库ip地址：132.232.169.227

数据库连接名与权限

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



