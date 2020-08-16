const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async(req,res)=>{
    let page = req.query.page;
    const result =await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();

    res.render('home/default',{
        result:result
    })
}