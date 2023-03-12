const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { restart } = require('nodemon');
const Page=require('../models/commentSchema.js')
const User = require('../models/userSchema.js');
class middleware{
    constructor(){

    }
    // manager is the person who created the page id was taken from the token
    static async creatPage(req,res,next){
        const {adminsIds,pageName,describtion,pageWallpaperImageName,pageImageName}=req.body
        try
        {
            const page=await Page.create({
                manager:req.userId,
                admins:adminsIds,    
                pageName,
                describtion,
                pageWallpaperImageName,
                pageImageName            
            })
            console.log(page)
            req.page=page
            return next()
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
static async checkEmailExists(req,res,next){
try{
const user=await User.findOne({email:req.body.email})
if(!user)
return next()
res.status(400).json({sucess:false,err:'this email is already in use'})
}
catch(err){
    console.log(err.message)
    res.status(400).json({success:false,err:err.message})
}
}
// returns req.ser
static async findUser(req,res,next){
    try{
        console.log(req.headres)
        console.log('aaa')
        const user=await User.findOne({email:req.query.email})
        if(!user){
           return res.status(404).json({success:false,err:'email does not exist'})
        
    }
    console.log(user)    
    const password=req.headers['password']

    const boolRes=await bcrypt.compare(password,user.password)
        if(!boolRes)
        return res.status(400).json({sucess:false,err:'the password is wrong'})
        req.user=user
        console.log(user)
        return next()
    }
    catch(err){
        console.log(err.message)
        return res.json({success:false,err:err.message})
    }
}
static async createUser(req,res,next){
    try{ const {firstName,lastName,middleName,birthDate,city,country,age,phoneNumber,sex,street,email,password}= req.body
      const hashedPassword=await bcrypt.hash(password,10)
    const user =await User.create({
      password:hashedPassword,  
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
      user.firstName='aaa'
      await user.save()
      console.log('bb')
      return next()
    }
  
  catch(err){
  res.status(400).json({success:false,err:err.message})
  }
  }
}

module.exports=middleware