const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,required:true
    },age:{
        type:Number,required:true
    },
    lastName:{
        type:String
        ,required:true
    },
    middleName:{ 
    type:String
    },
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
photos:[String],
email:{
    type:String,

},phoneNumber:{
    type:Number
}

})
module.exports=mongoose.model('User',userSchema)