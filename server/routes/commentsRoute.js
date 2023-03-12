const express=require('express')
const post=require('../controllers/postsRoute.js')
const multer = require('multer');
const auth = require('../middleware/authentication.js');
const postMiddleware=require('../middleware/postMiddleware.js')
const postModelSideEffectHandler=require('../middleware/postModelSideEffecthandler.js')
const commentMiddleware=require('../middleware/commentMiddleware.js')
const commentModelSideEffectHandler=require('../middleware/commentModelSideEffectHandler.js')
const userModelSideEffectHandler=require('../middleware/userModelSideEffectHandler.js');
const postController = require('../controllers/postsRoute.js');
const commentController=require('../controllers/commentsRoute.js');
const { verifyToken } = require('../middleware/authentication.js');
const router=express.Router()
// create comment
// if comment is a reply then find the orginal comment and handle error if found and add it to req object
// hande user side effect and handle post side effect eventually send comment
router.post('/',auth.verifyToken,commentMiddleware.checkForOgComment,commentMiddleware.createComment,commentModelSideEffectHandler.addCommentToOgComment
,postModelSideEffectHandler.addComment,userModelSideEffectHandler.addComment,commentController.sendComment)

// edit comment 
router.patch('/',auth.verifyToken,commentMiddleware.checkAuth,commentMiddleware.updateComment,commentController.sendComment)
// like a comment
router.patch('/likes',auth.verifyToken,commentMiddleware.verifyComment,commentMiddleware.updateCommentLikes,userModelSideEffectHandler.addLikedComment,commentController.sendComment)
// on delete users RepliedComments will be deleted--user who liked each comment commentsLiked record updated--
router.delete('/',auth.verifyToken,commentMiddleware.checkAuth,commentMiddleware.deleteComment,async (req,res)=>res.send('hi'))
module.exports=router