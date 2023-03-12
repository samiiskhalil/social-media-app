const mongoose = require('mongoose')
// const User
const postSchema=new mongoose.Schema({
    publisher:{
        type:mongoose.SchemaTypes.ObjectId,ref:'User'
    }
    ,
   
    
describtion:{
    type:String,
},
//post that was shared
sharedPost:{post:{type:mongoose.SchemaTypes.ObjectId,ref:'Post'},removed:{
  type:Boolean,
  default:false
} }
,
files:[{
    fileName:String,
  style:{
    top:String,
    bottom:String,
    scale:Number
  }  
}],
likes:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
comments:[{comment:{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'},user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'}}],
//people who shared
shares:[{user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
post:{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}
}],

})
//add post to user
postSchema.post('validate',async function(doc,next){
  console.log('a')
  return next()
})
module.exports=mongoose.model('Post',postSchema)
