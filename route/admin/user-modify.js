const {User} =  require('../../model/user');
const e = require('express');
module.exports = async (req,res,next)=>{
    //接受用户传递过来的请求参数 post   解构
    const {username ,email,role,state,password} = req.body;

    //获得传递过来的id  get
    const id = req.query.id;
    let user = await User.findOne({_id:id});
    let pwd = user.password;
    //比对用户输入密码和数据库中密码，相同才能进行此次修改操作
    function istrue(){
        if(password == pwd){
            return true;
        }else{
            return false;
        }
    } 
    if(istrue()){
        // res.send('密码比对成功')
        //更新用户信息 这里不更新密码，因为密码是用于比对的，我这里这不操不操作其实都一样，因为我没有对密码进行加密算法
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        //更新成功后，将页面重定向到用户列表页面
        res.redirect('/admin/user');
    }else{
        let obj = {path:'/admin/user-edit',message:'输入的密码错误，无法进行此次信息更改',id:id}
        next(JSON.stringify(obj));
    }
    // res.send(user);
}