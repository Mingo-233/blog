//导入集合模块,解构。 因为导出的时候是放在对象里{}导出的，所以这里接受要用对象形式解构接收
const {User} = require('../../model/user');
const login = async (req,res)=>{
    //解构
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
        res.status(400).render('./admin/error',{msg:'输入的邮箱或者密码错误'});
        //阻止代码向下执行
        return;
    }
    //第一个email是数据库中属性 ，第二个email是用户传过来的实际邮箱
    //如果查询到用户 user里面的值是对象类型，没有查询到为空
    let user = await User.findOne({email:email});
    if(user){
        if(password == user.password){
            //req.session这个属性 是session模块为我们添加的
            //此时我们登录时候服务器会在服务器内部创建一块区域，然后为账户信息添加一个唯一id标识，并存入服务器的session中
            //在把这个id标识发送回客户端，在cookie中保存，下次登录时，客户端直接发送id标识，服务器会去sessio区域查找是否有匹配的id
            //有就登录成功，没有就失败
            req.session.username = user.username;
            req.session.role = user.role
            //将用户名信息放到app公共方法中，就不用每次去引用模板了
            //res.app 就是app.js中的app  ，这里自定义了一个叫userInfo的属性
            res.app.locals.userInfo = user;
            //登录成功判断用户身份，是管理员重定向到用户列表页面，普通用户到首页
            if(user.role == 'admin'){
                res.redirect('/admin/user');
            }else{
                res.redirect('/home');
                console.log('wdnms');
            } 
            
        }else{
            res.status(400).render('./admin/error',{msg:'输入的邮箱或者密码错误'});
        }
    }else{
        res.status(400).render('./admin/error',{msg:'输入的邮箱或者密码错误'});
    }
}
module.exports = login;