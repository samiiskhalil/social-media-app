const userController = require('../controllers/userRoute.js')
const authentication=require('../middleware/authentication.js')
const userModelSideEffect=require('../middleware/userModelSideEffectHandler.js')
const userMiddleware=require('../middleware/userMiddleware')
const postModelSideEffectHandler=require('../middleware/postModelSideEffecthandler.js')
const postMiddleware=require('../middleware/postMiddleware.js')
const commentMiddleware=require('../middleware/commentMiddleware.js')
const express = require('express')
const router=express.Router()

router.get('/login',authentication.verifyUser,authentication.generateToken,userController.sendUser)
router.post('/signup',authentication.checkEmailExists,userMiddleware.createUser,authentication.generateToken,userController.sendUser)

router.patch('/profile-image',authentication.verifyToken,userMiddleware.updateProfileImage,userMiddleware.saveUserImage,userController.sendImage)

router.patch('/cover-image',authentication.verifyToken,userMiddleware.updateCoverImage,userMiddleware.saveUserImage,userController.sendImage)

router.patch('/friends',
authentication.verifyToken,
// input req.body.addedUser Id
userMiddleware.getUser,
// check if friends and delete
userMiddleware.checkIfFriend
// input is added user
,userModelSideEffect.addFriend
// input is activity
// sends friend
,userController.sendFriend)
router.delete('/',authentication.verifyUser,
userMiddleware.destructUser,)
router.get('/:userId',userController.getUser)
module.exports=router