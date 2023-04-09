import axios from "axios"
export default class postApi{
    constructor(){

    }
     static async getPost(postId)
     {
        try
        {
            const {response}=await axios.get(`http://localhost:1000/api/posts?postId=${postId}`)
            return response.data
        }
        catch(err){
            return err.response.data
        }
     }
     // get 10 posts
    //  static async getPosts(){}
}
const a=3
if(a>5)
console.log('a is bigger than 5')