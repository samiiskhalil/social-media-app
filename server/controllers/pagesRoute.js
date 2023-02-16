class pagesController{
    static async creatPage(req,res){
        try{

        }
        catch(err){
            return res.json({success:false,err:err.message})
        }
    }
}
module.exports=pagesController