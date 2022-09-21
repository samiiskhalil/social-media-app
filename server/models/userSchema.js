const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },age:{
        type:Number,
    },
    lastName:{
        type:String
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
        neighborhood:String
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