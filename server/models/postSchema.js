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
comments:commentsSchema
,
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

postSchema.pre('save',function(next){
    this.comments.commentsCount=this.comments.commentatorsId.length
    this.likes.likesCount=this.likes.likersId.length
    this.shares.sharesCount=this.shares.sharersId.length
    this.updatedAt=Date.now()
    next()
})

postSchema.pre('save',function(next){
    this.populate('comments.commentatoresId')
    this.populate('comments.relies.repliresId')
})
module.exports=mongoose.model('postModel',postSchema)