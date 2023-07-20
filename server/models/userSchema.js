const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    blockedCommunities:[{type:mongoose.SchemaTypes.ObjectId,ref:'Community'}]    
,
    blockedUsers:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],

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
            imageName:{type:String,default:''},
            style:{
                top:{type:String,default:''},
                scale:{type:String,default:''}
            }            
    },
    coverImage:{
            imageName:{type:String,default:''},
            style:{
                top:{type:String,default:''},
                scale:{type:String,default:''}
            }            
    },
   
    followers:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
    followes:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
    address:{
        country:String,
        city:String,
        street:String
    }
    ,
    job:String,
   education:{
        educationLevel:String,
        educationPlace:String,
        finished:Boolean
}
  ,
    managedCommunities:[{type:mongoose.SchemaTypes.ObjectId,ref:'Community'}],
    adminedCommunities:[{type:mongoose.SchemaTypes.ObjectId,ref:'Community'}]
  ,
communities:[{communityId:{type:mongoose.SchemaTypes.ObjectId,ref:'Community'},approved:{
    type:Boolean,
    default:false
}}],
interests:{
    business:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,scienceAndEnviroment:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,technology:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,health:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,travel:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}],
    entertainment:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,sport:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}],
    politics:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,basketBall:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,football:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,tennis:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,fashion:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,news:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,food:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,music:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
    ,car:[{score:{type:Number,default:0},date:{type:Date,default:new Date()}}]
},
photosUrl:[String],
email:{
    type:String,

},phoneNumber:{
    type:Number
},notifications:[{type:mongoose.SchemaTypes.ObjectId,ref:'Notification'}]
,postsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}],

commentsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}],
comments:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}]
},{versionKey:false,timestamps:true})
module.exports=mongoose.model('User',userSchema)