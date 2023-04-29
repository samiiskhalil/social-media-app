const fs=require('fs')
const {promisify}=require('util')
const {resolve}=require('path')
const exists=promisify(fs.exists)
const unlink=promisify(fs.unlink)
const Community = require('../models/communitySchema.js');
class communityController{


    constructor(){

    }
 
    static async getImage(req,res,next){
        try
        {
            console.log('asdsad')
            const {imageName}=req.params
            const imagePath=resolve(__dirname,'..','uploaded-files','communities-images',req.query.communityId||req.body.communityId,imageName)
            if(await !exists(imagePath))
                return res.json({success:false,err:'file was found'})
            return res.sendFile(imagePath)
            }   
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async checkCommunityExists(req,res){
        try{
            if(!req.query.communityName)
            return res.json({success:false,err:'no community name was sent'})
                const community=await Community.findOne({communityName:req.query.communityName})
                if(!community.id)
                    return res.json({success:true,msg:'no community was found'})
                  return res.json({success:false,err:'this name name is taken'})  
                }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async getCommunity(req,res,next){
        try{
                const community=await Community.findById(req.community.id)
                if(!community)
                return res.json({success:false,err:'no community was found'})
                return res.json({success:true,community})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async sendCommunity(req,res,next){
        try{
            console.log('done')
            const community=await Community.findById(req.query.communityId||req.body.communityId)
            return res.json({success:true,community})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async sendCommunityCoverImageName(req,res,next){
        try{
            let {community}=req
            let coverImageName=community.coverImageName
            if(!coverImageName)
            return res.json({success:false,err:'no image name was found was found'})
            return res.json({success:true,coverImageName})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=communityController