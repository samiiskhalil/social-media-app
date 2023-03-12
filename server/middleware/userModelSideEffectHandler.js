const User=require('../models/userSchema.js')
class userModelSideEffectHandler{
    constructor(){

    }
    static async addLikedComment(req,res,next){
        try
        {
            let {like,user,comment}=req
          if(like)
            user.commentsLiked.push(comment.id)
            if(!like)
            user.commentsLiked=user.commentsLiked.filter(liekedCommentId=>liekedCommentId.toString()!==comment.id)
          await user.save()
          return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async addComment(req,res,next){
        try
        {
            console.log('aas')
           let user=await User.findById(req.user.id)
           user.comments.push(req.comment.id)
         await user.save()
         req.user=user
           return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async addPostToPublisherPosts(req,res,next){
        try
        {
            req.user.posts.push(req.post.id)
            let user=req.user
            await user.save()
            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async updateLikes(req,res,next){
        try
        {
            
           let user=req.user
            console.log(req.like)
            if(req.like)
            user.postsLiked.push(req.post.id)
            if(!req.like)
          user.postsLiked=user.postsLiked.filter(postId=>postId.toString()!==req.post.id.toString())
        
        await user.save()
            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    
}
module.exports=userModelSideEffectHandler