const Post = require('../models/postSchema.js')
const multer=require('multer')
class Post{
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
            const {publisher,photosUrl,describtion,comments,likes,shares}=req.body
            const post= await Post.create({
                publisher,photosUrl,describtion,comments,likes,shares
            })
            console.log(post)
            return res.json({success:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=Post