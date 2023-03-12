const Comment=require('../models/commentSchema.js')
const User=require('../models/userSchema.js')
class commentsMiddleware{
    constructor(){

    }
    static async deleteComment(req,res,next){
        try
        {
            let {comment} =req
            await comment.delete()
            return next()

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async updateComment(req,res,next){
        try
        {
            let {comment} =req
            comment.content=req.body.content
           await comment.save()
           console.log()
           req.comment=comment
            return next()

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async checkAuth(req,res,next){
        try
        {
        let comment =await Comment.findById(req.body.commentId||req.query.commentId)
        if(!comment)
        return res.json({success:false,err:'no comment was found'})
        if(comment.user.toString()!==req.user.id)
        return res.json({success:false,err:'you are not the owner of this comment'})
        req.comment=comment
        return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
static async updateCommentLikes(req,res,next){
    try
    {
    let {comment,user}=req
    console.log(user)
    // check if user liked
    if(comment.likedBy.some(userId=>userId.toString()===user.id))
    {   // remove like
        req.like=false
        comment.likedBy=comment.likedBy.filter(userId=>userId.toString()!==user.id)
    await comment.save()
    return next()}
    // otherwise like
    req.like=true
    comment.likedBy.push(user.id)
    await comment.save()
    req.comment=comment
    return next()
    }
    catch(err){
        return res.json({success:false,err:err.message})
    }
}
static async verifyComment(req,res,next){
    try
    {
        let comment=await Comment.findById(req.body.commentId)
        if(!comment)
        return res.json({success:false,err:'no comment was found'})
        req.comment=comment
        return next()
    }
    catch(err){
        return res.json({success:false,err:err.message})
    }
}
static async checkForOgComment(req,res,next){
    try
    {
        if(!req.body.repliedCommentId)
        return next()
        const ogComment=await Comment.findById(req.body.repliedCommentId)
        if(!ogComment)
        return res.json({success:false,err:'no replied comment was found'})
        req.ogComment=ogComment
        return next()
    }
    catch{
        return res.json({success:false,err:err.message})
    }
}
    static async createComment(req,res,next){
        try
        {
          
            let comment =await Comment.create({
                user:req.user.id,
                postId:req.body.postId,
                content:req.body.content,
                repliedTo:req.body.repliedCommentId||null
            })
            req.comment=comment
            return next()
        }
        catch(err)
        {
            return res.json({success:false,err:err.message})
        }
    }
    
} 


























// static async addCommentToUser(userId,commentId){
  
//     const user=await User.findById(userId)
//     user.comments.push(commentId)
//     await user.save()
// console.log('after')

// }
// //remove comment from user record
// static async removeCommentFromUserComments(userId,commentId){

//     const user=await User.findById(userId)
//     user.comments=user.comments.filter(id=>id.toString()!==commentId.toString())
//     await user.save()
   
 
   
// }
module.exports=commentsMiddleware