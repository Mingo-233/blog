const mongoose = require('mongoose');
//连接数据库
mongoose.set('useCreateIndex',true);
mongoose.connect('mongodb://mingo:123@localhost:27017/blog',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{console.log('连接数据库成功');})
.catch(()=>{console.log('连接数据库失败');})