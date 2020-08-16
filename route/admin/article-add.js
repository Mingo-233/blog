//导入解析文件的第三方模块
const formidable = require('formidable');
const {Article} = require('../../model/article');
const path = require('path');
module.exports = (req,res)=>{
// 创建表单解析对象 
const form = new formidable.IncomingForm();
// 设置文件上传路径 
form.uploadDir = path.join(__dirname,'../','../','public','uploads');
// 是否保留表单上传文件的扩展名 
form.keepExtensions = true;
// 对表单进行解析 
// err存储文件上传错误信息，若上传成功，里面为null
// fields 存储普通请求参数 
// files 存储上传的文件信息 
form.parse(req,async(err,fields,files)=>{
    //files下cover对象下path路径用public为分隔符切成前后两端，取后面那段[1]，前面那段是[0]
    // res.send(files.cover.path.split('public')[1]);
    await Article.create({
        title:fields.title,
        author:fields.author,
        publishDate:fields.publishDate,
        cover:files.cover.path.split('public')[1],
        content:fields.content,
    });
    // console.log(err);
    res.redirect('/admin/article')
})
  
}


