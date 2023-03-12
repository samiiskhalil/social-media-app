const express = require('express')
const {user}=require('../controllers/userRoute')
const rootRouteController = require('../controllers/rootRoute.js');
const Post=require('../controllers/postsRoute.js')
const router=express.Router()
router.get('/:fileName',Post.getFile)
router.get('/getUser/:userId',user.getUser)

module.exports=router