const mongoose = require('mongoose');
const commentSchema =new mongoose.Schema({
    //关联文章的id
    aid :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    //关联用户的id
    uid :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    time :{
        type:Date
    },
    content :{
        type:String
    }
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = {
    Comment
}