const Comment=require('./commentSchema.js')
const User=require('./userSchema.js')
const Post=require('./postSchema.js')
const Page=require('./pageSchema.js')
class deleteEventSideEffects{
    constructor(){

    }
    static async removeCommentFromParent(comment,next){
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

}
module.exports={deleteEventSideEffects}