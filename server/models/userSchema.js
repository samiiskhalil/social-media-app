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
    profilePicture:{
        type:String
    },
    wallpaperPicture:String
    ,birthDate:{
        type:Date
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
    },
  
pagesLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Page'}],
joinedGroupes:[{type:mongoose.SchemaTypes.ObjectId,ref:'Group'}],
hobbies:[String],
photosUrl:[String],
email:{
    type:String,

},phoneNumber:{
    type:Number
}
,postsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}],

commentsLiked:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}],
comments:[{type:mongoose.SchemaTypes.ObjectId,ref:'Comment'}]
})
userSchema.post('save',async function(doc,next){
    console.log('a')
    return next()
  })
module.exports=mongoose.model('User',userSchema)