const {User} = require('../../model/user');
const e = require('express');
module.exports = async(req,res)=>{
    //标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    //req.quert可以获取地址栏的参数
    const {message,id} = req.query;
    //如果有id参数说明是修改操作
    if(id){
        let user = await User.findOne({_id:id})
        // res.send(user);
        res.render('./admin/user-edit',{
            message:message,
            user:user,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        })
    }else{
        res.render('./admin/user-edit',{
        message:message,
        link:'/admin/user-edit',
        button:'添加'     
    })
    }
    
}