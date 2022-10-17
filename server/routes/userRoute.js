const {user} = require('../controllers/userRoute.js')
const {userRouteMiddleware} = require('./middleware/userRouteMiddleware.js');
const express = require('express')
const userRouter=express.Router()
userRouter.post('/signup',userRouteMiddleware.validate,userRouteMiddleware.hashPassword,user.signup,user.generateToken)
userRouter.post('/login',userRouteMiddleware.authenticateToken)
module.exports=userRouter
//activity test