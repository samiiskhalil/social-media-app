const User = require('../models/userSchema.js')
const path = require('path')
const multer = require('multer')
const fs = require('fs');
const { resolve } = require('path');
const makeUserDir=(userDirPath)=>new Promise((resolve,reject)=>{
    fs.mkdir(userDirPath,error=>{
        if(error)
        reject(error.message)
        resolve('success')
    })
})


const createUser=async(req,res)=>{
    try
    {
        const  {firstName,lastName,age,profilePicture,birthDate,address,job,education,hobbies,email,phoneNumber}=req.body
        const user =await new User({firstName,lastName,age,profilePicture,birthDate,address,job,education,hobbies,email,phoneNumber})
    await makeUserDir(`${__dirname}/../models/resources/users/${user.id}`)
    await user.save()
    return  res.status(200).json({success:true,response:user})
}catch(error){
    return res.status(400).json({success:false,response:error.message})
}
}
module.exports={createUser}