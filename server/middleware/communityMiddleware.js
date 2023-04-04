const Community=require('../models/communitySchema.js')
const express=require('express')
const fs=require('fs')
const {resolve}=require('path')
let {promisify}=require('util')
const unlink=promisify(fs.unlink)
const readdir=promisify(fs.readdir)
const mkdir=promisify(fs.mkdir)
const exists=promisify(fs.exists)
const writeFile=promisify(fs.writeFile)
const auth=require('../middleware/authentication.js')
async function saveCommunityImage(imageFile,dir){
    try{
        let imagesNames=[]
        if(!await exists(dir))
        await mkdir(dir,{recursive:true})
       
        if(await exists(dir))
        {

        imagesNames= await readdir(dir)
        if(imagesNames.length)
        imagesNames.forEach(async(imageName)=>await unlink(`${dir}/${imageName}`))
    }
        const random=await require('crypto').randomBytes(8).toString('hex')
        const filePath=`${dir}/${random}-${imageFile.originalname}`
        await writeFile(filePath,imageFile.buffer,{recursive:true})
        return `${random}-${imageFile.originalname}`
    }
    catch(err){
        console.log(err)
        
    }
    }
class communityMiddleware{
    constructor(){

    }  
    static async verifyCommunityPublic(req,res,next){
        try
        {
            let {user,community}=req
            if(!community.public)
            return res.json({success:false,err:'community is not public'})
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async checkUserBlock(req,res,next){
        try
        {
            let {user,community}=req
            if(community.blockedUsers.some(id=>id.toString()===user.id))
            return res,json({success:false,err:'you are blocked by this community'})
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async blockUser(req,res,next){
        try
        {
            let {blockedUser,community}=req
            if(community.blockedUsers.some(id=>id.toString()===blockedUser.id))  
            {community.blockedUsers= community.blockedUsers.filter(id=>id.toString()!==blockedUser.id)
                    await community.save()
                    req.community=community
                    console.log('dasdas')
                    return next()
                }
                community.blockedUsers.push(blockedUser.id)
                req.community=community
                await community.save()
                return next()
            }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
  static async  chechPoster(req,res,next){
        try
        {
            let {user,community,post}=req
            if(community.admins.some(id=>id.string()===userid))
            return next()
            if(community.manager===user.id)
            return next()
            if(community.postApproval)
            community.waitingList.push(post)
            await community.save()
            return next()
        }
        catch(err){
            console.log(Err)
            return res.josn({success:false,err:err.message})
        }
    }
    static async deleteImage(req,res,next){
        try
        {
            const {imageName}=req.params
            const imagePath=resolve(__dirname,'..','uploaded-files','communities-images',req.query.communityId||req.body.communityId,imageName)
            if(await !exists(imagePath))
                return res.json({success:false,err:'file was found'})
                await unlink(imagePath)   
                return next()
            }   
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async saveImage(req,res,next){
        try
        {
            let {community}=req
            const dir=resolve(__dirname,'..','uploaded-files','communities-images',req.query.communityId||req.body.communityId)
             const imageName=  await saveCommunityImage(req.files[0],dir)
            community.coverImageName=imageName
            await community.save()
            req.community=community
            return next()
        }   
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async getImage(req,res,next){
        try
        {
            const {imageName}=req.params
            const imagePath=resolve(__dirname,'..','uploaded-files','communities-images',req.query.communityId||req.body.communityId,imageName)
            if(await exists(imagePath))
                return res.json({success:false,err:'file was found'})
            return res.sendFile(imagePath)
            }   
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async convertPostApproval(req,res,next){
        try{
            let {community}=req
            community.postApproval=!community.postApproval
            await community.save()
            req.community=community
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async convertPublicity(req,res,next){
        try{
            let {community}=req
            community.public=!community.public
            await community.save()
            req.community=community
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async removePostsList(req,res,next){
        let {postsList}=req
        for (let i = 0; i < postsList.length; i++) {
            if(!postsList[i].community.communityId)
                continue
            let community= postsList[i].community.communityId
            if(!community)
                 return res.json({success:false,err:'no community was found'})            
            community.posts= community.posts.filter(({postId})=>postId.toString()!==postsList[i].id)
            await community.save()
        }
        return next()
    }
    static async verifyMember(req,res,next){
        try
        {    
            let {joiner,community}=req
            if(!joiner)
            joiner=req.user
            if(community.members.every(({memberId})=>memberId.toString()!==joiner.id))
                return res.json({success:false,err:'user is not a member'})
            return next()    
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async addMember(req,res,next){
        try
        {    
            let {joiner,user,community}=req
            if(!joiner)
            joiner=user
            if(community.members.some(({memberId})=>memberId.toString()===joiner.id))
                return res.json({success:false,err:'user is already a member'})
            community.members.push({memberId:joiner.id})
            await community.save()    
            req.community=community
            return next()    
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async verifyNoRole(req,res,next){
        try
        {    
           let {community,user}=req
           if(user.adminedCommunities.some(communityId=>communityId.toString()===community.id))
           return res.json({success:false,err:'you are an admin of a community '})
           if(user.managedCommunities.some(id=>id.toString()===community.id))
           return res.json({success:false,err:'you are the manager of a community'})
           return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async removeFromWaitList(req,res,next){
        try
        {    
            console.log('adsa')
            let {community,joiner}=req
                community.waitingList=community.waitingList.filter(({userId})=>userId.toString()!==joiner.id)
                await community.save()
                return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async removeMember(req,res,next){
        try
        {    
          let {community,joiner}=req
          if(!joiner)
            joiner=req.user
            community.members=community.members.filter(({memberId})=>memberId.toString()!==joiner.id)
            await community.save()
            req.community=community
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async addToWaitList(req,res,next){
        try
        {    
            let {community,user}=req
            if(community.waitingList.some(({userId})=>userId.toString()===user.id))
            return res.json({success:false,err:'user is already waiting'})
            community.waitingList.push({userId:user.id})
            await community.save()
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err})
        }
    }
    static async approvePost(req,res,next){
        try
        {
            let {community,post}=req
            for (let i = 0; i < community.posts.length; i++) 
                    if(community.posts[i].post.toString()===post.id)
                        Community.posts[i].approved=true                
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async removePost(req,res,next){
        try
        {
            let {post,community}=req
            community.posts=community.posts.filter(({postId})=>postId.toString()!==post.id)
            await community.save()
            req.community=community
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async addPost(req,res,next){
        try
        {
            let {user,post,community}=req
            if(!community)
            return next()
            let approval=!community.postApproval
            if(community.admins.some(id=>id.toString()===userId||community.manager.toString()===user.id))
            approval=true
            community.posts.push({postId:post.id,approved:approval})
            await community.save()
            req.community=community
            return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async checkIfManagerIsAdmin(req,res,next){
        try{
            let {newManager,community}=req
            let admins=[]
            for (let i = 0; i < community.admins.length; i++) 
                        if(community.admins[i].toString()===newManager.id)                
                            admins.push(newManager)
            
                    req.admins=admins
                    return next()
                        }
        catch(err){
            consoel.log(err)
            return res.json({success:false,err:err.message})
        }
    }
   static async switchManager(req,res,next){
    try
    {
        let {community,newManager}=req
        community.manager=newManager
        await community.save()
        req.community=community
        return next()
    }
    catch(err){
        console.log(err)
        return res.json({success:false,err:err.message})
    }
   }
   static async removeAdmin(req,res,next){
    try
    {
        let {user,community}=req
        community.admins= community.admins.filter(adminId=>adminId.toString()!==user.id)
        await community.save()
        req.community=community
        return next()
    }
    catch(err){
        console.log(err)
        return res.json({success:false,err:err.message})
    }
}
    static async removeAdmins(req,res,next){
        try
        {
            let {admins,community}=req
            if(!admins.length)
            return next()
            for (let i = 0; i < community.admins.length; i++)
                    for (let j = 0; j < admins.length; j++) 
                        if(admins[j].id===community.admins[i].toString())
                            community.admins.splice(i,1)
            await  community.save()
            console.log('asd')
            return next()
                        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async getCommunity(req,res,next){

        try
        {
            if(!req.query.comunityId&&!req.body.communityId)
           {
            console.log('no community was found')
              req.community=null  
               return next()
           }
            const community=await Community.findById(req.body.communityId||req.query.communityId)
            if(!community)
            return res.json({success:false,err:'no community was found'})
            req.community=community
            console.log('xxxxxxxxxxxx')
            return next()
            }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async createCommunity(req,res,next){
        try
        {
            let community=await Community.create({
                communityName:req.body.communityName,
                describtion:req.body.describtion,
                admins:[... req.body.adminsId],
                manager:req.user.id
            })
            req.manager=community.manager
            req.community=community
        return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async addAdmins(req,res,next){
        try
            {
            let {community}=req
            let {admins}=req
            console.log(admins,'asdasdsa')
            for (let i = 0; i < admins.length; i++) 
                community.admins.push(admins[i].id)                
        
            community.save()  
            req.community=community
            return next()  
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }    
    
}
module.exports=communityMiddleware