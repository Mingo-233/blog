const guard = (req,res,next)=>{
    //判断用户当前页面是否为登录页面
    // 判断用户登录状态
    // 如果是的，放行
    // 如果不是，则重定向到登录界面
    if(req.url != '/login' && req.session.username == null){
        res.redirect('/admin/login');
        console.log('123123');
    }else{
        if(req.session.role == 'normal'){
            return res.redirect('/home');
        }
        next();
    }
}
module.exports = guard;