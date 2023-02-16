const mongoose=require('mongoose')
const PageSchema=new mongoose.Schema({
    admins:[
        {type:mongoose.SchemaTypes.ObjectId
        ,ref:'User',required:true}]
    ,pageName:{
        type:String,
        required:true
    },
    describtion:{
        required:true,
        type:String
    },
    posts:[{type:mongoose.SchemaTypes.ObjectId,ref:'Post'}],
    followers:[{type:mongoose.SchemaTypes.ObjectId,red:'User'}],
    pageWallpaperImageName:String,
    wallpaperImageName:String,
    pageImageName:String

})