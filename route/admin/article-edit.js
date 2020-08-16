module.exports = (req,res)=>{
    //标识，标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    console.log('123');
    res.render('./admin/article-edit')
   
}