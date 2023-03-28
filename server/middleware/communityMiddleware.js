const Community=require('../models/communitySchema.js')
const express=require('express')
const auth=require('../middleware/authentication.js')
class communityMiddleware{
    constructor(){

    }
    static async convertPostApproval(req,res,next){
        try{
            let {community}=req
            communtiy.postApproval=!community.postApproval
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
            communtiy.publicity=!community.publicity
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
            let {joiner,communty}=req
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
            let {joiner,communty}=req
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
           return res.json({success:false,err:'you are an admin'})
           if(user.managedCommunities.some(id=>id.toString()===community.id))
           return res.json({success:false,err:'you are the manager'})
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
            let {community,user}=req
            if(req.query.joinerId||req.body.joinerId){
                community.waitingList=community.waitingList.filter(({userId})=>userId.toString()!==req.query.joinerId)
                await community.save()
                return next()
            }
         community.waitingList=community.waitingList.filter(({userId})=>userId.toString()!==user.id)
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
            community.waitingList.push({user:user.id})
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
            await community.psots()
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
            let {post,community}=req
            community.posts.push({post:post.id,approved:!community.postApproval})
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
            const community=await Community.findById(req.body.communityId)
            if(!community)
            return res.json({success:false,err:'no community was found'})
            req.community=community
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