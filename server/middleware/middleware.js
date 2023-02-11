const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('../models/userSchema.js');
class middleware{
    constructor(){

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
        
        const user=await User.findOne({email:req.body.email})
        if(!user){
            console.log('aaa')
            res.status(404).json({success:false,err:'no user was found'})
        
    }const res=await bcrypt.compare(req.body.password,user.password)
        if(!res)
        return res.status(400).json({sucess:false,err:'the password is wrong'})
        req.user=user
        return next()
    }
    catch(err){

    }
}
static async createUser(req,res,next){
    try{
        const user=await User.create({
            ... req.body
        })
        req.user=user
        return next()
    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,err:err.message})
    }
}
}
module.exports=middleware