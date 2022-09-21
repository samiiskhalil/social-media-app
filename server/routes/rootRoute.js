const express = require('express')
const {fetchPosts} = require('../controllers/rootRoute.js');
const router=express.Router()
router.get('/',fetchPosts)
module.exports=router