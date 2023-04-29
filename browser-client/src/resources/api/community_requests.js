import Cookies from "js-cookie"
const baseUrl='http://locahost:1000/api'
export default class communityApi{
    constructor(){

    }
    static async createCommunity(community){
        try
        {
            const headers={
                'Authorization':Cookies.get('token')
            }
            const {data}=await axios.get(`${baseUrl}/community?communityName=${communityName}`,{headers})
            return data
         }
        catch({response}){
            console.log(response.data)
            return response.data
        }
    }
}