//引入express框架
const express = require('express');
//导入路径拼接模块
const path = require('path');
//导入router文件下的2个路由模块
const admin = require('./route/admin');
const home = require('./route/home');
// 引入body-parser模块 
const bodyParser = require('body-parser');
//引入express-session 模块
const session = require('express-session');
//导入dateformat第三方模块，用于自定义时间格式的
const dateFormat = require('dateformat');
//导入art-template模块，用于配合dateformat的使用
const template = require('art-template');
//引入数据库模块
require('./model/conncet')
//像模板内部导入dateFormat变量，前面那个dateFormat名字是自己定义的，后面的那个是模块
template.defaults.imports.dateFormat = dateFormat;
const app = express();
//拦截请求，解析post参数,此时为req添加body属性，里面的值就是解析的post参数
app.use(bodyParser.urlencoded({extended:false}));
//配置session
app.use(session({
    secret:'secret key',
    resave: true,
    //是否在没登录时初始化保存一个
    saveUninitialized: false,
    //设置过期时间
    cookie:{
        maxAge:24*60*60*1000
    }
}))
// 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
app.engine('art',require('express-art-template'));
// 2.告诉express框架模板存放的位置是什么
app.set('views',path.join(__dirname,'views'))
// 3.告诉express框架模板的默认后缀是什么
app.set('view engine','art');
//开放静态资源跟目录
app.use(express.static(path.join(__dirname,'public')));
//拦截请求。判断用户登录状态 
app.use('/admin',require('./middleware/loginGuard'))


//为路由匹配请求路径
app.use('/admin',admin);
app.use('/home',home);
//错误处理中间件
app.use((err,req,res,next)=>{
    //将字符串类型转换为对象类型 JSON.parse()
    const result = JSON.parse(err);
    // let obj = {path:'admin/user-edit',message:'输入的密码错误，无法进行此次信息更改',id:id}
    let params = [];
    for(let attr in result){
        //刨去path这段
        if(attr != 'path'){
            //拼接字符串，并添加到空数组中 attr 是属性名。result[arr]是属性值
            params.push(attr +'='+ result[attr]);
        }
    }
    //params这个参数数组中 每一组用&进行分割，符合url地址栏的参数传递规格
    res.redirect(`${result.path}?${params.join('&')}`)
})
app.listen(80);
console.log('服务器启动成功');