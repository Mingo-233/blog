const express = require('express');
//创建页面路由

const admin = express.Router();
//渲染登录页面路由
admin.get('/login',require('./admin/loginPage'))
//实现登录功能
admin.post('/login',require('./admin/login'))
//创建列表页面路由
admin.get('/user',require('./admin/userPage'))
//创建退出登录页面路由
admin.get('/logout',require('./admin/logout'));
//创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'))
//创建用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'))
//修改用户功能路由
admin.post('/user-modify',require('./admin/user-modify'))
//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'))
//创建文章列表路由
admin.get('/article',require('./admin/article'))
//创建文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'))
//实现文章添加功能路由
admin.post('/article-add',require('./admin/article-add'))
//admin路由模块导出
module.exports = admin ;