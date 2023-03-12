const {user} = require('../controllers/userRoute.js')
const middleware = require('../middleware/middleware.js');
const authentication =require('../middleware/authentication.js')
const express = require('express')
const userRouter=express.Router()
userRouter.get('/login',middleware.findUser,authentication.generateToken,user.sendUser)
userRouter.post('/signup',middleware.checkEmailExists,middleware.createUser,authentication.generateToken,user.sendUser)


module.exports=userRouter