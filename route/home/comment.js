const {Comment} = require('../../model/comment');

module.exports = async (req,res)=>{
    //解构 req.body是评论表单中以post格式上传过来的参数
    const {content,uid,aid} = req.body;
    
    const aa= await Comment.create({
        content:content,
        //用户id
        uid:uid,
        // 文章id
        aid:aid,
        time:new Date()
    });
    // res.send(aa)
    res.redirect('./article?id='+aid);
}