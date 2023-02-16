const express = require('express')
const auth=require('../middleware/authentication.js')
const middleware=require('../middleware/middleware.js')
const Page=require('../controllers/pagesRoute.js')
const router=express.Router()
router.post('/',,auth.generateToken,Page.sendPage)