const express = require('express');
//创建页面路由
const home = express.Router();
//博客前台首页的展示页面
home.get('/',require('./home/index'))
//博客前台文章显示页面
home.get('/article',require('./home/article'))
//博客评论路由
home.post('/comment',require('./home/comment'))
//home路由模块导出
module.exports = home ;