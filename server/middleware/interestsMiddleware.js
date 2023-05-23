const { legacy_createStore } = require('redux')
const User=require('../models/userSchema.js')

class interestsMiddleWare{
    constructor(){

    }
    // sharePost view-comments
    // view-community
    //  post comment create-communty 
    // delete-post  delete-comment 
    // like-post like-comment-with-attiude
    // unlike-post
    // join-community leave-community
    // create-community
    // delete-community
    // see-post-with-duration
    // unlike-negative/positive-comment
    
    static async updateScore(interest,action,user){
        try{
            
            const actionsScores={
            deleteCommunity:-17,
                viewCommunity:6,
            viewComments:3,
            unLikePost:-5,
            sharePost:20,
            createPost:15,
            negativeComment:-5,
                positiveComment:5,
                createCommunity:10,
                deletePost:-6,
                deleteNegativeComment:2,
                deletePositiveComment:-2,
                likePost:3,
                likeNegativeComment:-2,
                likePositiveComment:2,
                unlikeNegativeComment:2,
                unlikePositiveComment:-2,
                joinCommunity:22,
                leaveCommunity:-14,
                createCommunity:50,
                seePostWithDuration1:3,
                seePostWithDuration2:6,
                seePostWithDuration3:9,}
         let   historyLength=user.interests[interest].length
          let  lastInterestScore=user.interests[interest][historyLength-1].score
                  
          user.interests[interest].push({score:lastInterestScore+actionsScores[action],date:new Date()})
          await user.save()
        }
        catch(err){
            console.log(err)
        }
    }
        static async calcInterests(req,res,next){
            try
            {
                let derivatives=[]
                const {query,user}=req
                const qs=Object.keys(query)
                if(!qs.length)
                    return res.json({succuss:false,err:'no query was sent'})
                const interests=Object.keys(user.interests)
                interests.forEach(interest=>{
                   let scoreFunction= user.interests[interest]
                   if(!query[interest])
                        return
                   if(scoreFunction.length===1||scoreFunction.length===0)
                        return   
                    let score2=scoreFunction[scoreFunction.length-1].score
                    let time2=scoreFunction[scoreFunction.length-1].date
                    let score1=scoreFunction[scoreFunction.length-2].score
                    let time1=scoreFunction[scoreFunction.length-2].date
                    let derivative=(score2-score1)/(time2-time1)*1000  
                    derivative=derivative.toFixed(3)
                    derivatives.push({value:derivative,interest})
                })
              
            // Calculate the sum of all value properties
            let totalSum = derivatives.reduce((sum, obj) => sum + obj.value, 0);
  
            // Calculate the percentage of each value property and add it as a new key to each object
             derivatives.forEach(obj => obj.probability = (obj.value / totalSum).toFixed(1));
                req.derivatives=derivatives
                return next()
            }
            catch(err){
                console.log(err)
                return res.json({success:false,err:err.message})
            }
        }
}
module.exports=interestsMiddleWare