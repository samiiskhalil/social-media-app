const express = require('express')
require('dotenv').config()
const Post= require('./models/postSchema.js');
const rootRouter=require('./routes/rootRoute')
const mongoose = require('mongoose');
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',rootRouter)
mongoose.connect(process.env.DATABASE_URL,()=>console.log('connected to database'),err=>console.log(err))
app.post('/post', async (req,res)=>{
    try{
const post = await Post.create({... req.body})
return res.json(post)}catch(err){
   return res.json(err.message)
}
})
app.listen(1000,()=>console.log('http://localhost:1000'))