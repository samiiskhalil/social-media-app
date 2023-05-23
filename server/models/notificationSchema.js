const mongoose = require('mongoose')
const notificationSchema=new mongoose.Schema({
    seq: { type: Number},
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    sent:{type:Boolean,default:false,require:true},
       notifier:{type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
       },
       subject:{
        model:String,
        action:String,
        id:String
       },
       message:String
    }
,{versionKey:false,timestamps:true})    
notificationSchema.pre('save',function(next){
    const doc=this
    if(doc.isNew){
        mongoose.model('notification',notificationSchema).countDocuments({},function(err,count){
            if(err)
                return next(err)
            doc.seq=count+1
            return next()

        })
        return next()
    }
})
module.exports=mongoose.model('Notification',notificationSchema)