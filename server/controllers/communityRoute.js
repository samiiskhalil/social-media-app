const Community = require('../models/communitySchema.js');
class communityController{


    constructor(){

    }
 
    static async getCommunity(req,res,next){
        try{
                const community=await Community.findById(req.community.id)
                if(!community)
                return res.json({success:false,err:'no community was found'})
                return res.json({success:true,community})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
    static async sendCommunity(req,res,next){
        try{
            console.log('done')
            const community=await Community.findById(req.query.communityId||req.body.communityId)
            return res.json({success:true,community})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=communityController