const express = require('express')
const auth=require('../middleware/authentication.js')
const userModelSideEffectHandler=require('../middleware/userModelSideEffectHandler.js')
const communityMiddleware=require('../middleware/communityMiddleware.js')
const communityController=require('../controllers/communityRoute.js')
const userController=require('../controllers/userRoute.js')
const userMiddleware = require('../middleware/userMiddleware.js')
const postMiddleware = require('../middleware/postMiddleware.js')
const postModelSideEffectHandler = require('../middleware/postModelSideEffecthandler.js')
const { verifyCommunityAdmin, verifyCommunityRole } = require('../middleware/authentication.js')
const postController = require('../controllers/postsRoute.js')
const router=express.Router()
// create community
router.post('/',auth.verifyToken,userMiddleware.checkManagerNotAdmin,userMiddleware.getAdmins,
communityMiddleware.createCommunity,
userModelSideEffectHandler.addAdminedCommunity
,userModelSideEffectHandler.addManagedCommunity
,auth.generateToken,communityController.getCommunity)
// get community
// need to populate posts thoughs
router.get('/',communityController.sendCommunity)
// add admins 
router.post('/admins',auth.verifyToken,auth.verifyCommunityManager,userMiddleware.checkManagerNotAdmin,communityMiddleware.getCommunity,userMiddleware.getAdmins
,userMiddleware.checkAdmins,communityMiddleware.addAdmins,userModelSideEffectHandler.addAdminedCommunity
,communityController.sendCommunity)
// remove admins
router.patch('/admins/remove',auth.verifyToken,
auth.verifyCommunityManager,userMiddleware.getAdmins,communityMiddleware.removeAdmins
,userModelSideEffectHandler.removeAdmins,
communityController.sendCommunity)
// switch manager
router.patch('/manager',auth.verifyToken,auth.verifyCommunityManager
,userMiddleware.getNewManager
,communityMiddleware.switchManager,
userModelSideEffectHandler.updateManagersState,
communityMiddleware.checkIfManagerIsAdmin,
userModelSideEffectHandler.removeAdmins,
communityMiddleware.removeAdmins,communityController.sendCommunity)
// new new new
// add a post
router.post('/posts',auth.verifyToken,communityMiddleware.getCommunity,postMiddleware.createPost,communityMiddleware.addPost,userModelSideEffectHandler.addPostToPublisherPosts,postController.sendPost)
// approve post
// remove post only with roles
router.delete('/posts',auth.verifyToken,auth.verifyCommunityRole,postMiddleware.getPost,postMiddleware.getPostsList,postModelSideEffectHandler.removeCommunity,communityMiddleware.removePost,communityController.sendCommunity)
// approve post
router.patch('/posts/approve',auth.verifyToken,auth.verifyCommunityRole,postMiddleware.getPost,communityMiddleware.approvePost,communityController.sendCommunity)
// ask to join 
router.post('/members/join',auth.verifyToken,communityMiddleware.getCommunity,communityMiddleware.verifyNoRole,communityMiddleware.addToWaitList,userModelSideEffectHandler.requestCommunityMembership,communityController.sendCommunity)
// remove request by user
router.delete('/members/join',auth.verifyToken,communityMiddleware.getCommunity,communityMiddleware.verifyNoRole,communityMiddleware.removeFromWaitList,userModelSideEffectHandler.removeCommunity,communityController.sendCommunity)
// admin or manager remove request join
router.delete('/members/role/join',auth.verifyToken,auth.verifyCommunityRole,communityMiddleware.removeFromWaitList,userModelSideEffectHandler.removeCommunity)
// approve memeber 
router.post('/members/role/join',auth.verifyToken,auth.verifyCommunityRole,userMiddleware.getJoiner,userMiddleware.verifyJoinerNoRole,userModelSideEffectHandler.approvedCommunity,communityMiddleware.addMember,communityMiddleware.removeFromWaitList,communityController.sendCommunity)
// remove member
// this link is used to remove members only by those with roles not admins
router.delete('/members/role',auth.verifyToken,auth.verifyCommunityRole,userMiddleware.getJoiner,userMiddleware.verifyJoinerNoRole,userModelSideEffectHandler.removeCommunity,communityMiddleware.removeMember,communityController.sendCommunity)
// remove member by the same member used by useres with no role
router.delete('/members',auth.verifyToken,communityMiddleware.getCommunity,communityMiddleware.verifyMember,communityMiddleware.verifyNoRole,communityMiddleware.removeMember,userModelSideEffectHandler.removeCommunity,communityController.sendCommunity)
// change commnity params
router.patch('/manager/publicity',auth.verifyToken,auth.verifyCommunityManager,communityMiddleware.getCommunity,communityMiddleware.convertPublicity,communityController.sendCommunity)
router.patch('/manager/post-approval',auth.verifyToken,auth.verifyCommunityManager,communityMiddleware.getCommunity,communityMiddleware.convertPostApproval,communityController.sendCommunity)
router.patch('/cover-image',auth.verifyToken,auth.verifyCommunityManager,communityMiddleware.getImage)
module.exports=router