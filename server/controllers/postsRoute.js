const Post = require('../models/postSchema.js')
const multer=require('multer')
const mongoose = require('mongoose');
const Comment=require('../models/commentSchema.js')
const fs = require('fs')
const path=require('path')
const util = require('util');
const readFile = util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const mkdir=util.promisify(fs.mkdir)
async function  saveImages(req,post){
    const dir=`./images/posts images/${post._id}`
    await mkdir(dir,{recursive:true})
    req.files.forEach(async (image)=>{
        await writeFile(`${dir}/${image.originalname}`,image.buffer)
    })
}
function convertToObjectId(id){
    return mongoose.Types.ObjectId(id)
}
class postController{
static async commentReaction(req,res){
    try{
        const comment=await Comment.findById(req.body.commentId)
        if(!comment)
        return req.json({success:false,err:'no coomment found'})
        const reaction=req.body.reaction
        if(reaction==='like'){
            if(comment.likedBy.some(userId=>userId.toString()===req.userId))
            {
                comment.likedBy=comment.likedBy.filter(userId=>userId.toString()!==req.userId)
                await comment.save()
                return res.json({success:true,comment})
            }
            comment.likedBy.push(req.userId)
            await comment.save()
            return res.json({success:true,comment})
        }
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
                if(req.body.reaction==='like')
                {
                    if(post.likes.some(like=>like.user.toString()===req.userId))
                    {
                        post.likes= post.likes.filter(like=>!like.user.toString()===req.userId)
                        await post.save()
                        post= await   post.populate('likes.user')
                        return res.json({success:true,post})
                    }
                    await post.likes.push({user:req.userId})
                    await post.save()
                    post= await   post.populate('likes.user')

                    return res.json({success:true,post})
                }
                if(req.body.reaction==='share'){
                    console.log(req.userId,post.publisher.toString())
                    if(req.userId===post.publisher.toString())
                    return res.json({success:false,err:"you are the poster :)"})
                    if(post.shares.some(share=>(share.user.toString()===req.userId)))
                        return res.json({success:false,err:'you already shared the post  '})
                    await post.shares.push({user:req.userId})
                    await post.save()
                    const newSharedPost=await Post.create({
                        publisher:req.userId,
                        describtion:req.body.describtion,
                        shared:post._id

                    })

                    return res.json({success:true,newSharedPost,oldPost:post})
                }
                if(req.body.reaction='comment'){
                    
                    const comment=await Comment.create({
                    user:req.userId,
                    content:req.body.content,
                    postId:req.body.postId
                })
                console.log(comment)
                // post.comments.push(comment)
                // await post.save()
                
                return res.json({success:true,comment})
            }
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async fetchPost(req,res){
        try{
            const post=await Post.findById(req.params.postId)
            post=await post.populate('publisher')
            post=await post.populate('likes')
            post=await post.populate('comments')
            post=await post.populate('shares')
            console.log(post)
            res.json({sucess:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})

        }
    }
    static async createPost(req,res){

        try{
            const {describtion}=req.body
            const post= await Post.create({
                publisher:req.userId,describtion
            })
            saveImages(req,post)
            return res.json({success:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=postController