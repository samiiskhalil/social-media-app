const Post = require('./models/postSchema.js')
const P = require('./models/userSchema.js');
const express = require('express')
const multer = require('multer');
const upload=multer()
require('dotenv').config()
const cors = require('cors')
const postsRouter = require('./routes/postsRoute.js');
const userRouter = require('./routes/userRoute.js');
const rootRouter=require('./routes/rootRoute.js')
const mongoose = require('mongoose');
const app=express()
mongoose.connect(process.env.DATABASE_URL,()=>console.log('connected to database'),err=>console.log(err))
app.use(cors({
    origin:'*',
    credentials:true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(upload.any())
app.use('/api',rootRouter)
app.use('/api',userRouter)
app.use('/api/posts',postsRouter)
app.listen(1000,()=>console.log('http://localhost:1000'))