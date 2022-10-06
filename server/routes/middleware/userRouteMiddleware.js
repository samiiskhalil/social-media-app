const bcrypt = require('bcrypt')
class userRouteMiddleware{
    constructor(){

    }
           
           static authenticateToken=(req,res,next)=>{
        const authHeader=req.headres['Authorization']        
        const token= authHeader && authHeader.split(' ')[1]
        if(token==null)
        return res.status(401).json({success:false,data:'no token was recieved'})    
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
            if(err)
            return res.status(403).json({succuss:false,data:'token is invalid'})
            req.token=data
            next()
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
        resizeBy.status(400).json({success:false,data:err.message})
    }
}}
module.exports={userRouteMiddleware}