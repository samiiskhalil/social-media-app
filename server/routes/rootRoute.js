const express = require('express')
const rootRouteController = require('../controllers/rootRoute.js');
const Post=require('../controllers/postsRoute.js')
const router=express.Router()
router.get('/:fileName',Post.getFile)

module.exports=router