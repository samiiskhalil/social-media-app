const User=require('../models/userSchema.js')
const Comment=require('../models/commentSchema.js')
const fs=require('fs')
const util=require('util')
const mkdir=util.promisify(fs.mkdir)
const readFile=util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)

class userModelSideEffectHandler{
    constructor(){
    }
   
   
    static async removePosts(req,res,next){
        try{    
            let {postsList}=req
            console.log('started removing post')
            for (let i = 0; i < postsList.length; i++) 
                {
                    let user=await User.findById(postsList[i].publisher)
                    for (let j = 0; j < user.posts.length; j++) 
                    if(user.posts[j].toString()===postsList[i].id)
                    user.posts.splice(j,1)
                    await user.save()
                }
                console.log('post removed')
                return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async removeLikedPosts(req,res,next){
        try
        {
            const {postsList}=req
            for (let i = 0; i < postsList.length; i++) 
                for (let j = 0; j < postsList[i].likes.length; j++) {
                    let user=await User.findById(postsList[i].likes[j])
                    console.log(user)
                        for (let k = 0; k < user.postsLiked.length; k++) 
                            if(user.postsLiked[k].toString()===postsList[i].id)
                                user.postsLiked.splice(k,1)
                    await user.save()
                            }   
                            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async removeComments(req,res,next){
        try{
                let {commentsList}=req
                    for (let i = 0; i < commentsList.length; i++) {
                        let user=await User.findById(commentsList[i].user)
                        console.log('found user with comments of',user.comments)
                        console.log('now iterating the user')
                        for (let j = 0; j < user.comments.length; j++){ 
                        console.log('uesr comment',commentsList[i].id)
                        console.log('iterated comment',user.comments[j].toString())    
                        if(user.comments[j].toString()===commentsList[i].id)
                            {
                                    console.log('found a match')
                                    user.comments.splice(j,1)
                                    await user.save()
                            }
                        }
                            
                        }
                        console.log('done removing comments')
                        return next()
                        
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async removeLikes(req,res,next){
        try
        {
            let {commentsList}=req
            console.log('removing likes',commentsList.length)
         for (let i = 0; i < commentsList.length; i++) 
         {
            for (let j = 0; j < commentsList[i].likedBy.length; j++) {
                let user=await User.findById(commentsList[i].likedBy[j])
                for (let k = 0; k < user.commentsLiked.length; k++) 
                    if(user.commentsLiked[k].toString()===commentsList[i].id)
                            user.commentsLiked.splice(k,1)
            
                await user.save()
                        }
         }
         console.log('done removing likes')
         return next()
    }
        catch(err){
            return res.json({success:false,err:err.message})
        }
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
            
           let {user}=req
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
    static async deletePost(req,res,next){
        try
        {
            let user={req}
            user.posts=user.posts.filter(postId=>postId.toString()!==req.post.id)
            return next()

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    
}
module.exports=userModelSideEffectHandler