const mongoose = require('mongoose')
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
require('dotenv').config()
class user{
  constructor(){

  }
  static createToken=async(req,res)=>{
    jwt.sign
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
      console.log(user._id)
      return res.status(201).json({success:true,userId:user._id})
    }
  
  catch(err){
  res.status(400).json({success:false,data:err.message})
  }
  }
  static login=async(req,res)=>{

  }
}
  
module.exports={user}