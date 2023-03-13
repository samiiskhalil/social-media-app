const Comment =require('../models/commentSchema.js')
class commentModelSideEffectHandler{
    constructor(){

    }
    static async removeCommentFromOgComment(req,res,next){
        try 
        {
            let {comment}=req
            if(!comment.repliedTo)
            return next()            
            
            let ogComment=await Comment.findById(comment.repliedTo)
            ogComment.repliedBy.filter(async(commentId)=>
                commentId.toString()!==comment.id)
                return next()
            }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async addCommentToOgComment(req,res,next){
        try 
        {
            if(!req.comment.repliedTo)
            return next()
            req.ogComment.repliedBy.push(req.comment.id)
           let ogComment=req.ogComment
            await  ogComment.save()
            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=commentModelSideEffectHandler