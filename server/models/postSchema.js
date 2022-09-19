const mongoose = require('mongoose')
const commentsSchema=new mongoose.Schema({
         commentatorsId:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
         commentsCount:Number,
         relpies:{
            repliersId:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
            repliesCount:Number,
            
         }
})



const postSchema=new mongoose.Schema({
    puplisherId:{
        required:true,
        type:mongoose.SchemaTypes.ObjectId
    }
    ,
    tags:{
        type:[String],

    },
description:{
    type:String,
},
 
pictures:{
    type:[String]
},
likes:{
    required:true,
    likersId:{
        type:[mongoose.SchemaTypes.ObjectId],
    },
    likesCount:Number,
    default:0
},
shares:{
        sharesCount:Number,
        required:true,
        type:Number,
        sharersId:[mongoose.SchemaTypes.ObjectId]
  }
   ,updatedAt:{
    type:Date
}
})
//  postSchema.methods.getLikers= function(User){
// let likers=[]
// this.likes.likersId.forEach(id=>{
// const {firstName,lastName,profilePicture}=  User.findById(id)
// likers.push({firstName,lastName,profilePicture})
// })
//  postSchema.methods.getCommentators= function(User){
// let Commentators=[]
// this.comments.commentatorsId.forEach(id=>{
// const {firstName,lastName,profilePicture}=  User.findById(id)
// commentators.push({firstName,lastName,profilePicture})
// })
// return commentators
// }}

//middleware that runs pre save()
postSchema.pre('save',function(next){

    this.comments.commentsCount=this.comments.commentatorsId.length
    this.likes.likesCount=this.likes.likersId.length
    this.shares.sharesCount=this.shares.sharersId.length
    this.updatedAt=Date.now()
    next()
})
module.exports=mongoose.model('postModel',postSchema)