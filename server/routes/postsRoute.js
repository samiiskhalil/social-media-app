const express=require('express')
const post=require('../controllers/postsRoute.js')
const auth = require('../middleware/authentication.js');
const router=express.Router()
router.get('posts/:postId',post.createPost)
router.post('posts',auth.verifyToken,post.fetchPost)