const {user} = require('../controllers/userRoute.js')
const middleware = require('../middleware/middleware.js');
const authentication =require('../middleware/authentication.js')
const express = require('express')
const userRouter=express.Router()
userRouter.post('/signup',middleware.checkEmailExists,middleware.createUser,authentication.generateToken,user.sendUser)
userRouter.get('/login',middleware.findUser,authentication.generateToken,user.sendUser)
userRouter.get('/user/:userId',user.getUser)

module.exports=userRouter