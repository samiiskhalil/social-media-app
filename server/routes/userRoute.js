const userController = require('../controllers/userRoute.js')
const authentication=require('../middleware/authentication.js')
const userModelSideEffect=require('../middleware/userModelSideEffectHandler.js')
const userMiddleware=require('../middleware/userMiddleware')
const postModelSideEffectHandler=require('../middleware/postModelSideEffecthandler.js')
const postMiddleware=require('../middleware/postMiddleware.js')
const commentMiddleware=require('../middleware/commentMiddleware.js')
const express = require('express')
const communityController = require('../controllers/communityRoute.js')
const communityMiddleware = require('../middleware/communityMiddleware.js')
const commentModelSideEffectHandler=require('../middleware/commentModelSideEffectHandler.js')
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
router.delete('/',authentication.verifyToken,
communityMiddleware.verifyNoRole
,postMiddleware.getPosts
,commentMiddleware.getPostsListsCommnetsList,
userModelSideEffect.deleteFromFriends
,postMiddleware.deletePosts,
commentMiddleware.deleteComments,
userModelSideEffect.removeLikes
,userModelSideEffect.removeLikedPosts,
postModelSideEffectHandler.removePostsFromShares,
postModelSideEffectHandler.removePostsFromOgShares,
postModelSideEffectHandler.deleteFiles,
userController.deleteUser
)
// block/unblock a user
router.patch('/block',authentication.verifyToken,userMiddleware.getBlockedUser,userModelSideEffect.blockUser,userController.getUser)
// block/unblock a community
router.patch('/block/community',authentication.verifyToken,communityMiddleware.getCommunity,communityMiddleware.verifyNoRole,userModelSideEffect.blockCommunity,userController.getUser)

module.exports=router