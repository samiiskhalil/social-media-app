const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,required:true
    },age:{
        type:Number,required:true
    },
    password:{
        required:true,
        type:String
    }
    ,
    lastName:{
        type:String
        ,required:true
    },
    middleName:{ 
    type:String
    },
posts:[{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}]
    ,
    profileImage:{
            imageName:String,
            style:{
                top:String,
                bottom:String,
                scale:Number
            }            
    },
    coverImage:{
            imageName:String,
            style:{
                top:String,
                bottom:String,
                scale:Number
            }            
    },
   
    friends:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
    address:{
        country:String,
        city:String,
        street:String
    }
    ,
    job:String,
   education:{
       educationLevel:String,
    studyPlace:{
        school:String,
        college:{
            name:String,
            graduated:Boolean,
            major:String
        },
        other:String
    },
    }
  ,
    managedCommunities:[{type:mongoose.SchemaTypes.ObjectId,ref:'Community'}],
    adminedCommunities:[{type:mongoose.SchemaTypes.ObjectId,ref:'Community'}]
  ,
communities:[{communityId:{type:mongoose.SchemaTypes.ObjectId,ref:'Community'},approved:{
    type:Boolean,
    default:false
}}],
interests:[String],
photosUrl:[String],
email:{
    type:String,

},phoneNumber:{
    type:Number
}
,postsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}],

commentsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}],
comments:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}]
},{versionKey:false,timestamps:true})
module.exports=mongoose.model('User',userSchema)