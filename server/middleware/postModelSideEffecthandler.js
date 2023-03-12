const User=require('../models/userSchema.js')
const Post=require('../models/postSchema.js')
const Comment=require('../models/commentSchema.js')
const CommentModelSideEffectHandler=require('./commentMiddleware.js')
class postModelSideEffectHandler{
    constructor(){

    }
    static async addComment(req,res,next){
        try{
            let post=await Post.findById(req.body.postId)
                if(!post)
                return res.json({success:false,err:'no post was found'})
            post.comments.push(req.comment.id)
              await post.save()
              return next()

        }
        catch(err){

        }
    }
    static async addPosterIdToOriginalPostShares(req,res,next){
        try{
            if(!req.post.sharedPost.post)
            return next()
            // console.log(req.post.sharedPost.post)
            let originalPost=await Post.findById(req.post.sharedPost.post)
            originalPost.shares.push({user:req.userId,post:req.post.id})
            await originalPost.save()
            console.log(originalPost)
           return next()
        }
        catch(err){
            console.log('as')
            return res.json({success:false,err:err.message})
        }
    }
    
    

























    
    static async addPostToUserPosts(userId,postId){
        try{
        let  user=await User.findById(userId)
      user.posts.push(postId)
      await user.save()
      console.log(user.posts)}
      catch(err){
        console.log(err.message)
        return res.jsoN
    }
    }
    static async addUserToPostShares(userId,postId){
        const post=await Post.findById(postId)
        post.shares.push({user:userId})
        await post.save()
    }
    static async addPostToUserLikedPosts (userId,postId,like){
        try{
        let  user=await User.findById(userId)
        console.log(like)
        if(like){
        user.postsLiked.push(postId)
        await user.save()
    }
if(!like){
    console.log('aaa')
user.postsLiked=user.postsLiked.filter(id=>id.toString()!==postId.toString())
await user.save()
}}
catch(err){
console.log(err.message)
}
}
    static async addPostToUserSharedPost(userId,postId){
        try{const user=await User.findById(userId)
        user.postsShared.push(postId)
        await user.save()}
        catch(err){
console.log(err.message)       
 }
    
    }
    //delete post from user record
    //remove the shared post

    static async deletePostFromUserRecord(userId,postId){
      try{
        let user=await User.findById(userId)
        if(user.posts.length){
        user.posts=user.posts.filter(id=>id.toString()!==postId.toString())
       await user.save()
        const userPost=await Post.findById(postId)
        console.log(userPost)
        // find people who shared and delete post from their postsShared record
        if(userPost.shares.length){
            // share is the id of the user who shared
        userPost.shares.forEach(async(share)=>{
            // get the user who shared the post
            let sharer=await User.findById(share.user)
            // filter the shared posts list from user doc            
            sharer.postsShared=sharer.postsShared.filter(id=>id.toString()!==postId.toString())
            console.log(sharer)
            await sharer.save()
        })}
        //see if post has likes
        if(userPost.likes.length){
            // remove post from posts liked record in user doc
 
            userPost.likes.forEach(async(like)=>{
                  // find likers and filter the post from postsLiked list             
                console.log(like.user)
                  let liker =await User.findById(like.user)
                console.log(liker)
                liker.postsLiked=liker.postsLiked.filter(id=>id.toString()!==postId.toString())
                await liker.save()
            })
        }
        }
    await user.save()

}
    catch(err){
console.log(err)    }
    }
    // remove the post from the shares list



    static async removePostFromPostRecord(postId){
        try{
            // find posts that shared the post
            let posts=await Post.find({shared:{post:postId,removed:false}})
            if(posts.length){
console.log(posts)
            posts.forEach(async(post)=>{
                // remove the post from the record
                post.shared.removed=true
                await post.save()}
            )
        }}
        catch(err){
            console.log(err)
        }
    }
    // check if the user if the post owner
    static async validatePostAction(req,res,next){
        try{
            const post =await Post.findById(req.query.postId)
            if(req.userId.toString()===post.publisher.toString())
            return next()
            return res.json({success:false,err:'your not the owner of the post'})
        }
        catch(err){
            console.log(err)
            }
    }
}
module.exports=postModelSideEffectHandler