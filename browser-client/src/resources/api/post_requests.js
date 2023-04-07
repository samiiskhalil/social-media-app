import axios from "axios"
export default class postApi{
    constructor(){

    }
     static async getPost(postId)
     {
        try
        {
            console.log(process.env.SERVER_ADDRESS)
            const {response}=await axios.get(`http://localhost:1000/api/posts?postId=${postId}`)
            return response.data
        }
        catch(err){
            return err.response.data
        }
     }
}