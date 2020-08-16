
const {User,validareUser} = require('../../model/user')
module.exports = async(req,res,next)=>{

    try{//req.body中就是表单提交后传递过来的参数值
        await validareUser(req.body);
    }
    catch(e){
        //next方法只能传递一个参数，并且需要是字符串类型
        //这里我们将2个参数放在1个对象里传过来
        //JOSN.stringify()将对象数据类型转换为字符串数据类型
        // res.redirect(`/admin/user-edit?message=${e.message}`)    
        return next(JSON.stringify({path:'/admin/user-edit',message: e.message}))
    }
    let user= await User.findOne({email: req.body.email})
    //如果用户存在，说明邮箱地址已被注册
    if(user){
        //在redirect这个方法内部做了一步res.end 所以这边用return中止代码继续向下执行，否则和我们后面写的res.send就冲突了
        // return res.redirect(`/admin/user-edit?message=邮箱地址已被注册`)
        return next(JSON.stringify({path:'/admin/user-edit',message: '邮箱地址已被注册'}))
    }
    await User.create(req.body);
    res.redirect('/admin/user');
} 
    
   
