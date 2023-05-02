import store from "store"
import communityApi from "../../resources/api/community_requests"
import { useEffect,useState } from "react"
import { Await, useParams } from "react-router"
const Community = () => {
  const params=useParams()
 const [community,setCommunity]=useState({_id:''})
 useEffect(()=>{
  async function getCommunity(){
    const data=await communityApi.getCommunity(params.communityId)
   console.log(data)
    if(!data.success)
    console.log('a')
    setCommunity(data.community)
  }
  getCommunity()
 },[]) 
 return (
    community._id?<>
    {community._id}
    </>:null
    )
}

export default Community