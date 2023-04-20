import axios from "axios"
import store from "store"
import Cookies from "js-cookie"
const baseUrl='http://localhost:1000/api/comments'
class Comment{
    constructor(){

    }
    static async likeComment(commentId,postId)
    {
        try{
            let headers={
                'Authorization':Cookies.get('token')
            }
            const {data}=await axios.patch(`${baseUrl}/likes`,{commentId,postId},{headers})
            // console.log(data)
            return data
        }
        catch(err){
            console.log(err.response.data)
            return err.response.data
        }
    }
    // static async getReplies(commentId){
    //     try{
    //         headers={
    //             'Authorization':Cookies.get('token')
    //         }
    //         const data=await axios.get(`${baseUrl}/`)
    //     }
    // }
}
export default Comment