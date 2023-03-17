const userController = require('../controllers/userRoute.js')
const middleware = require('../middleware/middleware.js');
const authentication =require('../middleware/authentication.js')
const userModelSideEffect=require('../middleware/userModelSideEffectHandler.js')
const userMiddleware=require('../middleware/userMiddleware')
const express = require('express')
const router=express.Router()
router.get('/login',middleware.findUser,authentication.generateToken,userController.sendUser)
router.post('/signup',middleware.checkEmailExists,middleware.createUser,authentication.generateToken,userController.sendUser)
router.patch('/profile-image',authentication.verifyToken,userMiddleware.updateProfileImage,userMiddleware.saveUserImage,userController.sendImage)
router.patch('/cover-image',authentication.verifyToken,userMiddleware.updateCoverImage,userMiddleware.saveUserImage,userController.sendImage)
router.post('/add-friend',authentication.verifyToken,userMiddleware.getSecondUser,userModelSideEffect.addFriends,middleware.updateActivity,userController.sendFriends)
module.exports=router