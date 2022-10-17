const mongoose = require('mongoose')
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
require('dotenv').config()
class user{
  constructor(){

  }
  static generateToken=async(user)=>{
   const token= await jwt.sign({id:user.id,name:`user.firstName`,email:user.email,password:user.password},process.env.JWT_SECRET,{expiresIn:'2w'})
    return token
  }
  static signup=async(req,res)=>{
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
      req.user=user
      const token= await this.generateToken(user)
      console.log(token)
      res.status(201).json({userId:user.id,userName:`${user.firstName} ${user.lastName}`,success:true,token:token})
    }
  
  catch(err){
  res.status(400).json({success:false,data:err.message})
  }
  }
  static login=async(req,res)=>{

  }
}
  
module.exports={user}