const { ClassNames } = require('@emotion/react');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('../../models/userSchema.js');
class userRouteMiddleware{
    constructor(){

    }
        //validate user 
        static validate= async (req,res,next)=>{
        const user = await User.findOne({'email':req.body.email})
        if(!user)
        return next()
        return res.status(401).json({success:false,data:`you already have an account ${req.body.email}`})    
            }
        static authenticateToken=(req,res,next)=>{
        const authHeader=req.headres['authorization']        
        const token= authHeader && authHeader.split(' ')[1]
        if(token==null)
        return res.status(401).json({success:false,data:'no token was recieved'})    
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
            if(err)
            return res.status(403).json({succuss:false,data:'token is invalid'})
            req.token=data
           return next()
        })    
    }
        static hashPassword=async(req,res,next)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.passwordSalt=salt
        req.hashedPassword=hashedPassword
        next()   
    }
    catch(err){
        res.status(400).json({success:false,data:err.message})
    }
}}
module.exports={userRouteMiddleware}