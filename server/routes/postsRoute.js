const express=require('express')
const post=require('../controllers/postsRoute.js')
const multer = require('multer');
const auth = require('../middleware/authentication.js');
const router=express.Router()
router.get('/:postId',post.fetchPost)
router.post('/',auth.verifyToken,post.createPost)
router.patch('/',auth.verifyToken,post.postReaction)
router.patch('/comments',auth.verifyToken,post.commentReaction )
module.exports=router