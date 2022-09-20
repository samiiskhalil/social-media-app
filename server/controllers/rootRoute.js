const Post = require('../models/postSchema.js');
const User =require('../models/userSchema.js')
// fetching posts
const fetchPosts=async(req,res)=>{
  try
  {
    const existingPostsCount=req.body.postsCount
    const posts=await Post.find().skip(existingPostsCount).limit(10)
    return res.status(200).json({success:true,respone:posts})
}
catch(error){
  return  res.status(400).json({success:false,response:error.message})
}
}
module.exports=fetchPosts
