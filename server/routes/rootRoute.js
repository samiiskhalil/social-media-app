const express = require('express')
const userController=require('../controllers/userRoute')
const rootRouteController = require('../controllers/rootRoute.js');
const Post=require('../controllers/postsRoute.js')
const router=express.Router()
router.get('/:fileName',Post.getFile)
router.get('/getUser/:userId',userController.getUser)

module.exports=router