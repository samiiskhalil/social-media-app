const express = require('express')
const auth=require('../middleware/authentication.js')
const userController=require('../controllers/userRoute')
const postController=require('../controllers/postsRoute.js')
const router=express.Router()
// will get posts after the latest post user has got 
// if user is fresh then send latest posts
router.get('/',auth.verifyToken
)
router.get('/post-file/:fileName',postController.getFile)
router.get('/user-image/:imageName',userController.getImage)

module.exports=router