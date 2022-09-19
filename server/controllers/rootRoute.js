const Post = require('../models/postSchema.js');
const User =require('../models/userSchema.js')
const fetchPosts=async(req,res)=>{try{
    const existingPostsCount=req.params.postsCount
    const posts=await postModel.find().skip(existingPostsCount).limit(10)
    res.status(200).json({success:true,respone:posts})
}
catch(error){
    res.status(400).json({success:false,response:error.message})
}
}
module.exports=fetchPosts