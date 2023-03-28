const mongoose = require('mongoose')
const commentSchema=new mongoose.Schema(
    {
        user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'}
        ,content:{
            type:String,
            reqiured:true
        },
        postId:{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}
        ,
        //comment
        repliedBy:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}],
        repliedTo:String,
        likedBy:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],

    }
,{versionKey:false,timestamps:true})    
module.exports=mongoose.model('Comment',commentSchema)