const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');

module.exports = async(req,res)=>{
    // 接收url地址栏传递过来id参数，这里的id是文章的id
    const id = req.query.id;
    //根据id查询文章详情信息
    const article =await Article.findOne({_id:id}).populate('author');
    //查询文章所对应的评论信息，并且和评论用户关联
    const comments =await Comment.find({aid:id}).populate('uid');

    // res.send(comments)
    res.render('home/article.art',{ 
        article:article,
        comments:comments
    })
}