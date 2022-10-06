const jwt = require('jsonwebtoken')
class tokenManager{
static createToken=async(req,res,next)=>{
    const userId=req.locals.userId
    jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET)
    
}
}