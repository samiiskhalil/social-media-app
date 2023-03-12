const express=require('express')
const post=require('../controllers/postsRoute.js')
const multer = require('multer');
const auth = require('../middleware/authentication.js');
const postMiddleware=require('../middleware/postMiddleware.js')
const postModelSideEffectHandler=require('../middleware/postModelSideEffecthandler.js')
const commentMiddleware=require('../middleware/commentMiddleware.js')
const userModelSideEffectHandler=require('../middleware/userModelSideEffectHandler.js');
const postController = require('../controllers/postsRoute.js');
const router=express.Router()
router.get('/',post.getPost)
// when a post is created 
// verify token
//check if its shared or not 
// create post and handle side effect on user (add post to user posts)
// 
//if shared handle side effect on original post(add poster id to shares list on original post) and user side effect
// eventually return the post
router.post('/',auth.verifyToken,postMiddleware.validateShare,
postMiddleware.createPost,
//check if post was shared then add publisher id to og post shares
postModelSideEffectHandler.addPosterIdToOriginalPostShares,
userModelSideEffectHandler.addPostToPublisherPosts,
postController.sendPost)

// update post 
// find post and check client is the author
// update post
// send post
router.patch('/',auth.verifyToken,postMiddleware.verifyPostAuthor,
postMiddleware.updatePostDescribtion,postController.sendPost)
// like a post 
// update likes 
// handle user likes update side effect
router.patch('/like',auth.verifyToken,postMiddleware.updateLikes,userModelSideEffectHandler.updateLikes,postController.sendPost)










// router.delete('/',auth.verifyToken,post.deletePost )
// //react to a post like or share
// router.post('/comments',auth.verifyToken,post.createComment)
// router.patch('/',auth.verifyToken,post.postReaction)
// router.patch('/comments',auth.verifyToken,post.commentReaction)
// router.delete('/comments',auth.verifyToken,post.deleteComment)
// router.get('/comments',auth.verifyToken,post.getPostComments)
// router.get('/likes',auth.verifyToken,post.getLikes)
// router.get('/shares',auth.verifyToken,post.getShares)
// for files
module.exports=router