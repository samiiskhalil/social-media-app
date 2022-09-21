const {createUser} = require('../controllers/userRoute.js')
const express = require('express')
const userRouter=express.Router()
userRouter.post('/signup',createUser)
module.exports=userRouter
//update test