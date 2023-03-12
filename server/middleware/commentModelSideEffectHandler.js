const Comment =require('../models/commentSchema.js')
class commentModelSideEffectHandler{
    constructor(){

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