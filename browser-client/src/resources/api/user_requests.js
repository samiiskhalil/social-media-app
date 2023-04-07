import axios from 'axios'
import Cookies from 'js-cookie'
export default class  userAPI{
    constructor(){

    }
    static async getUser(userId){
        try{
            const {data}=await axios.get(`http://localhost:1000/api/user/${userId}`)
            console.log(data)
            return data
        }
        catch(err){
            console.log(err)
            return err.response.data
        }
    }
    static async getTheUser(userToken){
    try{

        let {response}= await  axios.get('http://localhost:1000/api/users/user',{
            Headers:{
                "authorization":`BEARER ${Cookies.get('token')}`
            }
        })
        return response.data
    }
    catch(err){
        return err.response.data
    }
} 
static async createUser(user){
    try{

        let response=await axios.post('http://localhost:1000/api/user/signup',user)        
      console.log(response)
        return response.data
    }
    catch(err){
        return err.response.data
    }

    
} 
static async logUser(email,password){
    try{
      let headers={
            password
        }
        let response=await axios.get(`http://localhost:1000/api/user/login?email=${email}`,{
            headers
        })
        console.log(response)

        return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}
static async updateUserImage(formData,imageType){
    try
    {
      let  headers={
            'authorization':Cookies.get('token'),
            'Content-Type': 'multipart/form-data'        }
        const response=await axios.patch(`http://localhost:1000/api/user/${imageType}`,formData,{
            headers
        })
    return response.data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}
static async getUserImage(userId,imageName,imageType){
    try
    {
        console.log(userId,imageName,imageType)
            const {data}=await axios.get(`http://localhost:1000/api/user-image/${imageName}?userId=${userId}`,{headers:{
                'image-type':imageType
            }})
            return data
        }
    catch(err){
        return err.response.data
    }
}
}