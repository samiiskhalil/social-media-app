const mongoose = require('mongoose')
const fs=require('fs')
const util=require('util')
const {join}=require('path')
const readFile=util.promisify(fs.readFile)
const User = require('../models/userSchema.js');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()
class user{
  constructor(){

  }
  static async deleteUser(req,res,next){
    try
    {
      let user=await User.findByIdAndDelete(req.query.userId)
      return res.json({success:true,msg:'you account has been deleted'})
    }
    catch(err)
    {
      console.log(err)
      return res.json({success:false,err:err.message})
    }
  }
  static async getCoverImage(req,res,next){
    try
    {
      
      const path=join(__dirname,'..','uploaded-files','users-images',req.query.userId,`user-cover-image`,req.params.imageName)
      return res.sendFile(path)
    }
    catch(err)
    {
      console.log(err)
      return res.json({success:false,err:err.message})
    }
  }
  static async getProfileImage(req,res,next){
    try
    {
      
      const path=join(__dirname,'..','uploaded-files','users-images',req.query.userId,`user-profile-image`,req.params.imageName)
      return res.sendFile(path)
    }
    catch(err)
    {
      console.log(err)
      return res.json({success:false,err:err.message})
    }
  }
  // log in user
  static async sendFriend(req,res,next){
    try{
      const {friend}=req
      return res.json({success:true,friend})
    }
    catch(err){
      console.log(err)
      return res.json({success:false,err:err.message})
    }
  }
  static async generateToken(req,res,next){
   try{
    const token= await jwt.sign({id:req.user.id,},process.env.JWT_SECRET,{expiresIn:'2w'})
    return res.status(200).json({sucess:true,token:token,userId:req.user.id})
  }
catch(err){
  console.log(err.message)
  return res.status(400).json({success:false,err:err.message})
}
}


  //send user and token
  // req.user req.token
  static async getUser(req,res){
    try{
        const {userId}=req.params
        let user=await User.findById(userId)
        if(!user)
        user=req.user
        if(user.posts)
        user=await user.populate('posts')
        console.log(user)
        // await user.save()
        res.json({success:true,user:user})
      }
    catch(err){
      console.log(err.message)
      res.json({success:false,err:err.message})
    }
  }
  static async sendUser(req,res){
    try{
      
    return  res.status(201).json({success:true,token:req.token,user:req.user})
    }
    catch(err){
      console.log(err)
return      res.status(400).json({sucess:false,err:err.message})
    }
  }
  static async sendImage(req,res,next){
    try{
      const {image}=req
      console.log('done ',image)
      return res.json({success:true,image})
    }
    catch(err){
      console.log(err)
      return res.json({success:false,err:err.message})
    }
  }
}
  
module.exports=user