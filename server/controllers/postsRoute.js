const Post = require('../models/postSchema.js')
const User=require('../models/userSchema.js')
const multer=require('multer')
const mongoose = require('mongoose');
const Comment=require('../models/commentSchema.js')
const fs = require('fs')
const path=require('path')
const util = require('util');
const rmdir=util.promisify(fs.rmdir)
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

// input is comments   
async function getReplies(comments){
    if(!comments)
    return populatedComments
    for (let i = 0; i < comments.length; i++) {
        const populatedCommentsList= await comments[i]
       .populate('repliedBy') 

           getReplies(comments[i].repliedBy) 
    }
}
function convertToObjectId(id){
    return mongoose.Types.ObjectId(id)
} 
class postController{
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
            if(!post.likes.length)
                return res.json({success:false,err:'there are no likes'})
            post =await post.populate('likes.user')
           let users=post.likes.map(like=>like.user)
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
            console.log(path)
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async deleteComment(req,res){
        try{
              const comment  =await Comment.findByIdAndDelete(req.query.commentId)
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
            let user=await User.findById(req.userId)
            const comment=await Comment.create({
            content:req.body.content,
            postId:req.body.postId,
            repliedTo:req.body.repliedCommentId||""
        })
        let post=await Post.findById(comment.postId)
        post.comments.push(comment)
       await post.save()
        if(req.body.repliedCommentId){
            //repliedComment is the original comment
            const repliedComment=await Comment.findById(req.body.repliedCommentId)
            repliedComment.repliedBy.push(comment.id)
            user.commentsRepliedTo.push(comment.id)
            await user.save()
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
                return res.json({success:false,err:'no reaction was specifeid'})
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    // populates first layer of replies
    static async getPostComments(req,res){
        try
        {
            console.log('aa')
               let comments=await Comment.where({repliedTo:''}&&{postId:req.query.postId})
                
                await getReplies(comments)
                return res.json({success:true,comments})
         }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async getPost(req,res){
        try{
            const post=await Post.findById(req.params.postId)

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
               let style=JSON.parse(req.body.style)
            const post= await Post.create({
                publisher:req.userId,describtion
            })
            const names=await saveFiles(req.files,post.id)
            for (let i = 0; i < names.length; i++) {
                post.files.push({fileName:names[i],style:style[i]})
                
            }
          
                await post.save()
            return res.json({success:true,post:post})
        }
        catch(err){
            console.log(err.message)
            return res.json({success:false,err:err.message})
        }
    }
    static async deletePost(req,res){
        try{
                const postId=req.query.postId
                console.log(req.query)
                const post=await Post.findByIdAndDelete(postId)
                if(!post)
                return res.json({success:false,err:'post was alreaday deleted'})
                const comments=await Comment.find({postId:post.id}) 
                console.log(comments.length)
                comments.forEach(async(comment)=>{
                        await comment.delete()
                })
                post.filesNames.forEach(async(fileName)=>{

                    await rmdir(`./uploaded-files/posts-files/${post.id}`,{recursive:true})

                })
                return res.json({success:true,post})
            }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }

    }
}
module.exports=postController