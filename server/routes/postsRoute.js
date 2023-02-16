const express=require('express')
const post=require('../controllers/postsRoute.js')
const multer = require('multer');
const auth = require('../middleware/authentication.js');
const router=express.Router()
router.get('/',post.getPost)
router.post('/',auth.verifyToken,post.createPost)
router.delete('/',auth.verifyToken,post.deletePost )
router.patch('/',auth.verifyToken,post.postReaction)
router.patch('/comments',auth.verifyToken,post.commentReaction)
router.post('/comments',auth.verifyToken,post.createComment)
router.delete('/comments',auth.verifyToken,post.deleteComment)
router.get('/comments',auth.verifyToken,post.getPostComments)
router.get('/likes',auth.verifyToken,post.getLikes)
router.get('/shares',auth.verifyToken,post.getShares)
// for files
module.exports=router