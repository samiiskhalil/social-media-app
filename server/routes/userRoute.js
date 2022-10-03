const {userSignup} = require('../controllers/userSignup.js')
const express = require('express')
const userRouter=express.Router()
userRouter.post('/signup',userSignup)
module.exports=userRouter
//activity test