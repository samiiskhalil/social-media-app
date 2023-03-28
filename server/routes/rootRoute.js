const express = require('express')
const userController=require('../controllers/userRoute')
const postController=require('../controllers/postsRoute.js')
const router=express.Router()
router.get('/post-file/:fileName',postController.getFile)
router.get('/user-image/:imageName',userController.getImage)

module.exports=router