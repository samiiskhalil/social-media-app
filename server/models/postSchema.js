const mongoose = require('mongoose')

const postSchema=new mongoose.Schema({
    publisher:{
        type:mongoose.SchemaTypes.ObjectId,ref:'User'
    }
    ,
 
describtion:{
    type:String,
},
shared:{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}
, 
photosUrl:{
    type:[String]
},
likes:[{user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'}}],
comments:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}],
shares:[{user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'}}],

})
module.exports=mongoose.model('Post',postSchema)
