const express = require('express')
const rootRouteController = require('../controllers/rootRoute.js');
const router=express.Router()
router.get('/',rootRouteController.fetchPosts)
module.exports=router