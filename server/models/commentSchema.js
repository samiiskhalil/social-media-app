const mongoose = require('mongoose')
const {deleteEventSideEffects}=require('./deleteEventSideEffects.js')
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
        likedBy:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}]
    }
)
commentSchema.pre('remove',async (comment,next)=>{
    try
    {
        let parentComment=await Comment.findById(comment.repliedTo)
        if(!parentComment)
        return next()
        console.log(parentComment)
    }
    catch(err){
        console.log(err.message)
    }
}
)
module.exports=mongoose.model('Comment',commentSchema)