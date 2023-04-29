const Post = require('../models/postSchema.js')
const User=require('../models/userSchema.js')
const multer=require('multer')
const mongoose = require('mongoose');
const Comment=require('../models/commentSchema.js')
const fs = require('fs')
const path=require('path')
const util = require('util');
const rmdir=util.promisify(fs.rm)
const readFile = util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const mkdir=util.promisify(fs.mkdir)
const postMiddleware=require('../middleware/postModelSideEffecthandler.js');
const commentsMiddleware = require('../middleware/commentMiddleware.js');
const { ClickAwayListener } = require('@mui/material');
async function  saveFiles(files,postId){
    let filesNames=[]
    let dir=`./uploaded-files/posts-files/${postId}`
    await mkdir(dir,{recursive:true})
   for(let i=0;i<files.length;i++){
    const random=await require('crypto').randomBytes(8).toString('hex')
    const filePath=`${dir}/${random}-${files[i].originalname}`
    await writeFile(filePath,files[i].buffer)
    filesNames.push(`${random}-${files[i].originalname}`)    
}
    return filesNames
}
class postController{

static async sendPost(req,res){
    try
    {
        return res.json({success:true,post:req.post})
    }
    catch(err){
        return res,json({success:false,err:err.message})
    }
}


    //












    //

    static async getShares(req,res){
        try{
             let post =await Post.findById(req.query.postId)
            await post.populate('shares.user')
             console.log(post.shares)
                const users=post.shares.map((share)=>share.user)
                console.log(users)
                return res.json({success:true,users})
            }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async getLikes(req,res){
        try
        {
            let post=await Post.findById(req.query.postId)
            // if(!post.likes.length)
                // return res.json({success:false,err:'there are no likes'})
            post =await post.populate('likes')
           let users=post.likes.map(like=>like)
            console.log(users)
            return res.json({success:true,users})
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async getFile(req,res){
        try{
            const filePath=path.join(__dirname,'..','uploaded-files','posts-files',req.query.postId,req.params.fileName)
            return res.sendFile(filePath)
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async deleteComment(req,res){
        try{
                          const comment  =await Comment.findById(req.query.commentId)
                            console.log(comment.user.toString())
                            console.log(req.userId)
                          if(comment.user.toString()!==req.userId.toString())
                          return res.json({success:false,err:'not the commenter'})                            
                        if(comment.repliedTo){
                const parentComment=await Comment.findById(comment.repliedTo)
                parentComment.repliedBy=parentComment.repliedBy.filter
                (commentId=>commentId.toString()!==comment.id.toString())
                await parentComment.save()
            } 
              //input is comment.repliedBy [array] 
                //original comment must be deleted
                // removes comment from repliedBy with father comment
                const recursiveDeleteComment=async (oldList,k)=>{
                        let newList=[] 
                            for (let i = 0; i < oldList.length; i++) {
                                const comment=await Comment.findByIdAndDelete(oldList[i])
                                console.log(users,'a')
                                console.log(comment.id,'deleted',k)
                                    k++
                                    newList=newList.concat(comment.repliedBy)
                                
                            }                                 
                            
                                // console.log(list)
                            if(!newList.length)
                            {
                            console.log('out')
                                return k
                            }
                           return recursiveDeleteComment(newList,k)
                        
                }                
                    if(comment.repliedBy.length)
                   await recursiveDeleteComment(comment.repliedBy,1)
                  
                  return res.json({succes:true,comment:comment})
            }
        catch(err){
              return res.json({success:false,err:err.message})
        }
    }
    static async createComment(req,res){
        try{
            const comment=await Comment.create({
                user:req.userId,
            content:req.body.content,
            postId:req.body.postId,
            repliedTo:req.body.repliedCommentId||""
        })
        let post=await Post.findById(comment.postId)
        post.comments.push(comment)
       await post.save()
       console.log('before')
     await  commentsMiddleware.addCommentToUser(req.userId,comment.id)
        if(req.body.repliedCommentId){
            //repliedComment is the original comment
            const repliedComment=await Comment.findById(req.body.repliedCommentId)
            repliedComment.repliedBy.push(comment.id)
            await repliedComment.save()
        return res.json({success:true,comment,repliedComment})
    }

    return res.json({success:true,comment})
} 

catch(err){
    return res.json({success:false,err:err.message})
}
}
static async commentReaction(req,res){
    try{
        const comment=await Comment.findById(req.body.commentId)
        if(!comment)
        return req.json({success:false,err:'no coomment found'})
        let user=await User.findById(req.userId)
        const reaction=req.body.reaction
        if(reaction==='like'){
            if(comment.likedBy.some(userId=>userId.toString()===req.userId))
            {
                comment.likedBy=comment.likedBy.filter(userId=>userId.toString()!==req.userId)
                user.commentsLiked=user.commentsLiked.filter(commentId=>commentId.toString()!==comment.id)
                await comment.save()
                await user.save()
                return res.json({success:true,comment})
            }
            
            comment.likedBy.push(req.userId)
            await comment.save()
            
            user.commentsLiked.push(comment.id)
            await user.save()
            console.log(user.commentsLiked)
            return res.json({success:true,comment})
        }
        return res.json({success:false,err:'no reaction was set'})
       }
        catch(err){
        return res.json({success:false,err:err.message})
    }
}
    static async postReaction(req,res){
        try{
                let post=await Post.findById(req.body.postId)
                if(!post)
                return res.json({success:false,err:'post was not found'})
                let user=await User.findById(req.userId)
                if(req.body.reaction==='like')
                {
                    console.log(post.likes)
                    if(post.likes.some(like=>like.user.toString()===req.userId))
                    {
                        post.likes= post.likes.filter(like=>!like.user.toString()===req.userId.toString())
                        console.log('aa')
                        post= await   post.populate('likes.user')
                        await post.save()

                     await   postMiddleware.addPostToUserLikedPosts(req.userId,post.id,false)
                        return res.json({success:true,post})
                    }
                     post.likes.push({user:req.userId})
                     await post.save()   
                    post= await post.populate('likes.user')
                    
                  await  postMiddleware.addPostToUserLikedPosts(req.userId,post.id,true)
                    return res.json({success:true,post})
                }
                if(req.body.reaction==='share'){
                    if(req.userId===post.publisher.toString())
                    return res.json({success:false,err:"you are the poster :)"})
                    if(post.shares.some(share=>(share.user.toString()===req.userId)))
                        return res.json({success:false,err:'you already shared the post  '})
                        await postMiddleware.addUserToPostShares(req.userId,post.id)
                        await    postMiddleware.addPostToUserSharedPost(req.userId,post.id)
                    const newSharedPost=await Post.create({
                        publisher:req.userId,
                        describtion:req.body.describtion,
                        shared:{post:post._id,removed:false}

                    })
                    postMiddleware.addPostToUserPosts(req.userId,newSharedPost.id)
                        return res.json({success:true,newSharedPost,oldPost:post})
                }
                return res.json({success:false,err:'no reaction was specifeid'})
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async getPostComments(req,res){
        try
        {
            console.log('aa')
            let comments=await Comment.find({postId:req.query.postId,repliedTo:null}) 

               async function getReplies(comments){
                if(!comments.length)
                return 0
                for (let i = 0; i < comments.length; i++) {
                     await comments[i]
                   .populate('repliedBy')
                    await   getReplies(comments[i].repliedBy) 
                }
            }
                await getReplies(comments)
                // console.log(comments)
            //    comments= comments.reverse()
                return res.json({success:true,comments})
         }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async getPost(req,res){
        try{
            const post=await Post.findById(req.query.postId)
            if(!post)
            return res.json({success:false,err:'post was not found'})
            res.json({success:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})

        }
    }
    static async createPost(req,res){

        try{
            const {describtion}=req.body
               let style=JSON.parse(req.body.style)
            const post= await Post.create({
                publisher:req.userId,describtion
            })
            const names=await saveFiles(req.files,post.id)
            for (let i = 0; i < names.length; i++) {
                post.files.push({fileName:names[i],style:style[i]})
                
            }
                await post.save()
            await    postMiddleware.addPostToUserPosts(req.userId,post.id)
            return res.json({success:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})
        }
    }
    // // delete post and comment
    // static async deletePost(req,res){
    //     try{
    //         const postId=req.query.postId

    //             const comments=await Comment.find({postId:postId}) 
    //             console.log(comments.length)
    //             comments.forEach(async(comment)=>{
    //                 await comment.delete()
    //                 //delete comment from user record
    //                 console.log('removeing user comments')
    //               await  commentsMiddleware.removeCommentFromUserComments(req.userId,comment.id)
    //             })
             
    //             // remove post from user record
    //             console.log('removing post from user')
    //        await      postMiddleware.deletePostFromUserRecord(req.userId,postId)
    //             // submit that the post was reomved from posts that shared it
    //             console.log('removing post from post')
    //            await postMiddleware.removePostFromPostRecord(postId)
    //             // delete post
    //             const post=await Post.findByIdAndDelete(postId)
    //             if(!post)
    //             return res.json({success:false,err:'post was alreaday deleted'})
    //             post.files.forEach(async(file)=>{

    //                 await rmdir(`./uploaded-files/posts-files/${postId}`,{recursive:true})

    //             })
    //             return res.json({success:true,post})
    //         }
    //     catch(err){
    //         console.log(err)
    //         return res.json({success:false,err:err.message})
    //     }

    // }
}
module.exports=postController