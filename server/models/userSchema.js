const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    firstName:{
        required:true,
        type:String
    },
    familyMemebers:{
       father:mongoose.SchemaTypes.ObjectId,
       mother:mongoose.SchemaTypes.ObjectId,
       siblings:[mongoose.SchemaTypes.ObjectId],
       uncles:[mongoose.SchemaTypes.ObjectId],
       ants:[mongoose.SchemaTypes.ObjectId],

    },
    lastName:{
        required:true,
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
        required:true,
        type:Date
    },
    friends:[mongoose.SchemaTypes.ObjectId],
    address:{
        country:String,
        city:String,
        neighborhood:String
    }
    ,
    job:String,
   education:{
       educationLevel:String,
    studiedAt:{
        school:String,
        college:{
            name:String,
            graduated:Boolean,
            major:String
        },
        other:String
    },
    },
  
pagesLiked:[mongoose.SchemaTypes.ObjectId],
joinedGroupes:[mongoose.SchemaTypes.ObjectId],
hobbies:[String],
photos:[String],
email:{
    type:String,

},phoneNumber:{
    type:Number
}

})
module.exports=mongoose.model('User',userSchema)