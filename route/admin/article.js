const {Article} = require('../../model/article');
//引入数据分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req,res)=>{
    //接收url地址中的page参数，用于页码跳转
    const page = req.query.page;
    //标识，标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //集合联合查询 查找到后将在articles这个对象中在创建出一个author对象，里面有User集合的所有相关数据
    //因为和User这个集合绑定了 
    // page是当前页 size是一页显示多少条数据 display是客户端显示的页码数 exec 向数据库发送查询请求
    //
    //
    let articles = await pagination(Article).find().page(page).size(5).display(3).populate('author').exec();



    res.render('admin/article',{
        //此时查询的数据库中的对象是在articles中的records这个数组里面
        articles:articles
    })
}