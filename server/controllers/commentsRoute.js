const { model } = require("mongoose")

class commentController{
    constructor(){

    }
    static async sendComment(req,res){
        try
        {
            return res.json({success:true,comment:req.comment})
        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=commentController