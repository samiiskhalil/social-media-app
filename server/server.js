const express = require('express')
require('dotenv').config()
const rootRoute=require('./routes/rootRoute')
const mongoose = require('mongoose');
const app=express()
mongoose.connect(process.env.DATABASE_URL,()=>console.log('connected to database'),err=>console.log(err))





app.listen(1000,()=>console.log('http://localhost:1000'))