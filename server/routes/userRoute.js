const {user} = require('../controllers/userRoute.js')
const {userRouteMiddleware} = require('./middleware/userRouteMiddleware.js');
const express = require('express')
const userRouter=express.Router()
userRouter.post('/signup',userRouteMiddleware.hashPassword,user.signup)
userRouter.post('/login',userRouteMiddleware.authenticateToken)
module.exports=userRouter
//activity test