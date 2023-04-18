import axios from "axios";
import Cookies from "js-cookie";
const baseUrl=`http://localhost:1000/api`
class utilApi{
    constructor(){

    }
    static async getUsersAndCommunities(){
        try{
            let {data} =await axios.get('http://localhost:1000/api/users-communities')
            return data
        }
        catch(err){
            console.log(err)
            return err.data
        }
    }
    static async getFollowers(userId){
        const headers={
            'authorization':Cookies.get('token')
        }
        try{
const {data}=await axios.get(`http://localhost:1000/api/followers?userId=${userId}`,{
    headers
})
console.log(data)
return data      
}
        catch(err){
            console.log(err)
            return err.response.data
        }
    }
    static async getFollowes(userId){
        const headers={
            'authorization':Cookies.get('token')
        }
        try{
const {data}=await axios.get(`http://localhost:1000/api/followes?userId=${userId}`,{
    headers
})
console.log(data)
return data      
}
        catch(err){
            console.log(err)
            return err.response.data
        }
    }
    static async getUsers(ids)
{
try{
    const {data}=await axios.get(`${baseUrl}/get-users`,{
       
        params:{
            usersIds:ids
        },
        headers:{
            'Authorization':Cookies.get('token')
        } 
    })
    console.log(data)
    return data
}
catch(err){
    console.log(err.response.data)
    return err.response.data
}
}
}
export default utilApi