const Post=require('../models/postSchema.js')
const fs = require('fs')
const path=require('path')
const util = require('util');
const { post } = require('../routes/postsRoute.js');
const rmdir=util.promisify(fs.rm)
const readFile = util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const mkdir=util.promisify(fs.mkdir)
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
class postMiddleware{
    constructor() {
        
    }static async getPosts(req,res,next){
        try
        {
            let {user}=req
            let postsList=[]
            for (let i = 0; i < user.posts.length; i++) {
                let post=await Post.findById(user.posts[i])
                postsList.push(post)
                
            }
            req.postsList=postsList
            return next()
            }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async getPost(req,res,next){
        try
        {   
            const post=await Post.findById(req.body.postId||req.query.postId)
            if(!post)
            return res.json({success:false,err:'post was not found'})
            req.post=post
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }}
    static async getComments(req,res,next){
        try
        {
            let {postsList}=req
            let commentsList=[]
            for (let i = 0; i < postsList.length; i++) 
            {await postsList[i].populate('comments') 
            for (let j = 0; j < postsList[i].comments.length; j++) 
                commentsList.push(postsList[i].comments[j])
            }
        req.commentsList=[... commentsList]
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }  static async getPostsList(req,res,next){
        try
        {
            
            let postsList=[]
            postsList.push(req.post)
            req.postsList=postsList
                return next()
        
    }
        catch(err){
            return res.json({success:false,err:err.message})
        }}
        static async getQueriedPost(req,res,next){
            try
            {
                const post=await Post.findById(req.query.postId)
                if(!post)
                return res.json({success:false,err:'no post was found'})
                req.post=post
                return next()
            }
            catch(err){
                return res.json({success:false,err:err.message})
            }}
    static async deletePosts(req,res,next){
        try
        {
            let {postsList}=req
            postsList.forEach(async(post)=>await post.delete())
           console.log('ssssssssdddddddddddddddd')
            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async updateLikes(req,res,next){
        try{
            let post=await Post.findById(req.body.postId)
            // like is a user id
            //check if liked
            if(post.likes.some(like=>like.toString()===req.user.id))
             {
                 post.likes = post.likes.filter(like=>like.toString()!==req.user.id)
                   await post.save()
                   req.post=post
                   req.like=false
                   return next()
            }     
            // otherwise user like
            post.likes.push(req.user.id)
            await post.save()
            req.post=post
            req.like=true
            return next()

        }
        catch(err)
        {
                return res.json({success:false,err:err.message})
        }
    }
    static async updatePostDescribtion(req,res,next){
        try{
            req.post.describtion=req.body.describtion
            let post=req.post
            await post.save()
            return res.json({success:true,post})
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async verifyPostAuthor(req,res,next){
        try{
            let {user}=req
        let post=await Post.findById(req.body.postId||req.query.postId)
        if(!post)
        return res.json({success:false,err:'post was not found'})    
        if(post.publisher.toString()!==user.id)
        return res.json({success:false,err:'you are not the publisher'})
        return next()
    }

        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async createPost(req,res,next){
    try{
        const {describtion}=req.body
        if(!describtion&&!req.files[0])
        return res.json({success:false,err:'you have sent nothing'})
        let communityId=null
        let {community}=req
        if(community)
        communityId=community.id
     const post= await Post.create({
         publisher:req.user.id
         ,describtion
         ,sharedPost:{post:req.headers['shared-post-id']||null},
        community:{communityId:communityId||null,removed:false}     })
     const names=await saveFiles(req.files,post.id)
     for (let i = 0; i < names.length; i++) {
         post.files.push({fileName:names[i]})
         
        }
         await post.save()
         req.post=post
         return next()
    }
    catch(err){
        console.log(err)
        return res.json({success:false,err:'post was not added to req object'})
    }
    }
    
    static async validateShare(req,res,next){
        try{
            if(!req.headers['shared-post-id'])
            return next()
            if(req.user.posts.some(postId=>postId.toString()===req.headers['shared-post-id'].toString()))
            return res.json({success:false,err:'you are the publisher of the post'})
            let ogPost=await Post.findById(req.headers['shared-post-id'])
            if(!ogPost.shares.length)
            return next()
            if(ogPost.shares.some(share=>share.user.toString()===req.user.id.toString()))
            return res.json({succcess:false,err:'you already shared the post'})
            return next()
        }   
 
            catch(err){
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=postMiddleware