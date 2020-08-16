//创建集合规则
const mongoose = require('mongoose');
const Joi = require('joi');
const blogSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength:10,
        minlength:2
    },
    email:{
        type:String,
        //保证不重复
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        //admin 超级管理员
        //normal 普通用户 
        type:String,
        required:true
    },
    state:{
        //0 为启用，1为禁用
        type:Number,
        default:0
    }
})
const User = mongoose.model('User',blogSchema);
//用户的创建
// User.create({
//     username:'mingo',
//     email:'mingo233@qq.com',
//     password:'123',
//     role:'admin',
//     state:0
// }).then(()=>{console.log('用户创建成功');})
// .catch(()=>{console.log('用户创建失败');})
const validareUser = (user)=>{
    const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    state: Joi.number().valid('0', '1').required().error(new Error('状态值非法'))
    };
    return  Joi.validate(user,schema);
}

//将用户集合作为模块导出
module.exports = {
   User,
   validareUser
}