const mongoose = require('mongoose');
//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:2,
        required:[true,'请填写文章标题']
    },
    author:{
        //将作者和用户关联
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请填写作者']
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }

})
const Article = mongoose.model('Article',articleSchema);

//将用户集合作为模块导出
module.exports = {
   Article
}