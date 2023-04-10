import axios from "axios"
import Cookies from "js-cookie"
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
     static async makePost(post,community,sharedPostId){
        try
        {
            let formData=new FormData()
            formData.set('image',post.image)
            formData.set('describtion',post.describtion)
            formData.set('communityId',post.communityId||'')
            const headers={
                'authorization':Cookies.get('token'),
                'shared-post-id':post.sharedPostId||''
            }
            const {data}=await axios.post('http://localhost:1000/api/posts',formData,{headers})
            return data
        }
        catch(err){
            console.log(err.response.data)
            return err.response.data
        }
     }
}
