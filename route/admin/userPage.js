const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    //标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    //接受客户端传过来的当前页面参数 如果用户没有传入page值就默认1
    let page = req.query.page || 1;
    //设置每一页显示的数据数目
    let pagesize = 5;
    //获取数据库中数据总量 
    //countDocuments里的参数是查询条件，不写就默认查询全部。返回的是一个数值，所以不能直接输出，要转化为字符串显示到页面上
    let count = await User.countDocuments({});
    //设置总页数 向上取整
    let total = Math.ceil(count / pagesize) ;
    //页码对应的查询位置
    let start = (page-1)*pagesize;
    
    let users = await User.find().limit(pagesize).skip(start);
    res.render('./admin/user',{
        users:users,
        page:page,
        total:total
    })
}