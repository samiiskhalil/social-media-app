const mongoose = require('mongoose')
const User = require('../models/userSchema.js');
const userSignup=async(req,res)=>{
  try{ const {firstName,lastName,middleName,birthDate,city,country,age,phoneNumber,sex,street,email,password}= req.body
    const user =await User.create({
        password
      ,firstName,
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
    res.status(201).json({success:true,userId:user._id})
  }

catch(err){
res.status(400).json({success:false,data:err.message})
}
}
module.exports={userSignup}