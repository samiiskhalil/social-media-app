const User= require('../models/userSchema.js')
const fs=require('fs')
const util=require('util')
const mkdir=util.promisify(fs.mkdir)
const readdir=util.promisify(fs.readdir)
const unlink=util.promisify(fs.unlink)
const readFile=util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)

async function saveUserImage(imageFile,dir){
    try{
        // delete old image
        let imagesNames= await readdir(dir)
        console.log('read files',imagesNames)
        imagesNames.forEach(async(imageName)=>await unlink(`${dir}/${imageName}`))
        await mkdir(dir,{recursive:true})
        const random=await require('crypto').randomBytes(8).toString('hex')
        const filePath=`${dir}/${random}-${imageFile.originalname}`
        await writeFile(filePath,imageFile.buffer)
        return `${random}-${imageFile.originalname}`
    }
    catch(err){
        console.log(err)
        
    }
    }
class userMiddleware{
    constructor(){

    } 
    static async updateCoverImage(req,res,next){
        try
        {
            const coverImage=req.files[0]
            let {style}=req.body
            style=JSON.parse(style)
            const profileDir='./uploaded-files/user-images/user-cover-image'
            const imageName= await saveUserImage(coverImage,profileDir)
            const image={imageName,style}
                req.image=image
                req.imageType='cover'
                return next()

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
    static async updateProfileImage(req,res,next){
        try
        {
            const profileImage=req.files[0]
            console.log(profileImage)
            let {style}=req.body
            style=JSON.parse(style)
            console.log(style)
            const profileDir='./uploaded-files/user-images/user-profile-image'          
            const imageName= await saveUserImage(profileImage,profileDir)
            const image={imageName,style}
                req.image=image
                req.imageType='profile'
                return next()
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async saveUserImage(req,res,next){
        try
        {
            let {user}=req
            if(req.imageType==='profile')
            user.profileImage=req.image
            if(req.imageType==='cover')
            user.coverImage=req.image
            await user.save()
            return next()

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=userMiddleware