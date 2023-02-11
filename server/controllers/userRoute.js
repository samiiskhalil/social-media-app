const mongoose = require('mongoose')
const User = require('../models/userSchema.js');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()
class user{
  constructor(){

  }
  // log in user
  static async  loginUser(req,res,next) {
    try{
    const user =await User.findOne({email:req.query.email}) 
    if(!user)
      return res.status(404).json({success:false,err:'user not found'})
      const password= req.headers['authorization']
      const res=await bcrypt.compare(password,user.password)
      if(res)
      req.user=user
      return next()      
  }
catch(err){
  console.log(err.message)
  res.status(400).json({success:false,err:err.message})
}}
  static generateToken=async(req,res,next)=>{
   try{
    const token= await jwt.sign({id:req.user.id,},process.env.JWT_SECRET,{expiresIn:'2w'})
    return res.status(200).json({sucess:true,token:token,userId:req.user.id})
  }
catch(err){
  console.log(err.message)
  return res.status(400).json({success:false,err:err.message})
}
}
  static signup=async(req,res,next)=>{
    try{ const {firstName,lastName,middleName,birthDate,city,country,age,phoneNumber,sex,street,email}= req.body
      
    const user =await User.create({
      password:req.hashedPassword,  
      firstName,
          lastName,
          middleName,
          birthDate,
          age,
         address:{
                  country,
                  city,
                  street
         },
          phoneNumber,
          sex,
          email
      })
      console.log('a')
      req.user=user
      return next()
    }
  
  catch(err){
  res.status(400).json({success:false,data:err.message})
  }
  }
  //send user and token
  // req.user req.token
  static async getUser(req,res){
    try{
        const {userId}=req.params
        let user=await User.findById(userId)
        user=await user.populate('posts')
        console.log(user)
        res.json({success:true,user:user})
      }
    catch(err){
      console.log(err.message)
      res.json({success:false,err:err.message})
    }
  }
  static async sendUser(req,res){
    try{
      res.status(201).json({success:true,token:req.token,user:req.user})
    }
    catch(err){
      console.log(err)
      res.status(400).json({sucess:false,err:err.message})
    }
  }
}
  
module.exports={user}