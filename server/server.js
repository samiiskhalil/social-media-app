const express = require('express')
const multer = require('multer');
const upload=multer()
require('dotenv').config()
const cors = require('cors')
const postsRouter = require('./routes/postsRoute.js');
const userRouter = require('./routes/userRoute.js');
const rootRouter=require('./routes/rootRoute.js')
const mongoose = require('mongoose');
const User=require('./models/userSchema.js')
const commentsRouter=require('./routes/commentsRoute.js')
const app=express()
mongoose.connect(process.env.DATABASE_URL,()=>console.log('connected to database'),err=>console.log(err))
app.use(cors({
    origin:'*',
    credentials:true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
mongoose.set('strictQuery', false)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(upload.any())

app.use('/api',rootRouter)
app.use('/api/user',userRouter)
app.use('/api/posts',postsRouter)
app.use('/api/comments',commentsRouter)
app.listen(1000,()=>console.log('http://localhost:1000'))