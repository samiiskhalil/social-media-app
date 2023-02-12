const jwt=require('jsonwebtoken')
const User=require('../models/userSchema.js')
const bcrypt = require('bcrypt');
class authentication{
    constructor(){

    }
    static async verifyToken(req,res,next){
        try{
            const bearer =req.headers['authorization']
            const token=bearer.split(' ')[1]
            if(!token)
            res.status(400).json({success:false,err:'you are not signed in'})
            const data=await jwt.verify(token,process.env.JWT_SECRET)
            req.userId=data.userId
            return next()
        }
        catch(err){
            // console.log(err)
            res.status(400).json({success:false,err:err.message})
        }
    }
    static async generateToken(req,res,next){
        try{
            const token=jwt.sign({userId:req.user.id},process.env.JWT_SECRET)
            req.token=token
            return next()
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({sucess:false,err:err.message})
        }
    }
    // req.body.email req.body.password 
    // returns req.user
    
}
module.exports=authentication