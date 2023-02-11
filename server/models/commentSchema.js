const mongoose = require('mongoose')
const commentSchema=new mongoose.Schema({
    comment:{user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},content:String,repliedTo:{type:mongoose.Schema.ObjectId,ref:'Comment'}}
})
module.exports=mongoose.model('Comment',commentSchema)