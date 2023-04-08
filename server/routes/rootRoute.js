const express = require('express')
const User=require('../models/userSchema.js')
const Community=require('../models/communitySchema.js')
const auth=require('../middleware/authentication.js')
const userController=require('../controllers/userRoute')
const postController=require('../controllers/postsRoute.js')
const communitySchema = require('../models/communitySchema.js')
const router=express.Router()
// will get posts after the latest post user has got 
// if user is fresh then send latest posts
router.get('/',auth.verifyToken
)
router.get('/post-file/:fileName',postController.getFile)
router.get('/user-cover-image/:imageName',userController.getCoverImage)
router.get('/user-profile-image/:imageName',userController.getProfileImage)
router.get('/search',async(req,res)=>{
try
{
    let {searchQuery}=req.query
    if(!searchQuery)
    return res.json({success:false,err:'no query was send'})
    let results={
        users:[],
        communities:[]
    }
    let users=await User.find()
    users=users.filter(user=>{
        if(user.firstName.includes(searchQuery))
            return true
            if(user.lastName.includes(searchQuery))
            return true

    })
    users=users.map(user=>{
        return ({
            firstName:user.firstName,
            lastName:user.lastName,
            imageName:user.profileImage.imageName,
            id:user.id
            
        })
    })
    results.users=[... users]
    // find communities
    let communities=await Community.find({communityName:searchQuery})
    communities=communities.filter(community=>{
        if(community.communityName.includes(searchQuery))
            return true
    })
    communities=communities.map(community=>community.communityName)
    results.communities=[... communities]
    console.log(results)
    return res.json({success:true,results})
}
catch(err){
    console.log(err)
    return err.message
}
} )
module.exports=router