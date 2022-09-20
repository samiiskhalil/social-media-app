const mongoose = require('mongoose')
const commentsSchema=new mongoose.Schema({
         commentatoresId:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
         commentsCount:Number,
         relpies:{
            repliersId:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
            repliesCount:Number,
            
         }
})



const postSchema=new mongoose.Schema({
    puplisherId:{
        type:mongoose.SchemaTypes.ObjectId,ref:'User'
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
    likersId:{
        type:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
    },
    likesCount:Number,
    default:0
},
comments:commentsSchema
,
shares:{
    sharesCount:{
            type:Number
        },
        type:Number,
        sharersId:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}]
  }
   ,updatedAt:{
    type:Date
}
})

postSchema.pre('save',function(next){
    this.comments.commentsCount=this.comments.commentatoresId.length
    this.likes.likesCount=this.likes.likersId.length
    this.shares.sharersCount=this.shares.sharersId.length
    this.updatedAt=Date.now()
    
    next()

})

module.exports=mongoose.model('Post',postSchema)
