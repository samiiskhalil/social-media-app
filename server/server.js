const express = require('express')
const multer = require('multer')
const cors = require('cors');
require('dotenv').config()
const Post= require('./models/postSchema.js');
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
app.use('/',rootRouter)
 app.use('/users',userRouter)

app.listen(1000,()=>console.log('http://localhost:1000'))