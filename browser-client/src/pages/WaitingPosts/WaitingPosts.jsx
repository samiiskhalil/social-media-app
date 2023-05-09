import { useState,useEffect } from "react"
import store from "store"
import communityApi from "../../resources/api/community_requests"
import { Posts } from "../../components"
import { useParams,useNavigate} from "react-router"
const WaitingPosts = () => {
    const [community,setCommunity]=useState({_id:''})
    const params=useParams() 
    useEffect(()=>{
       communityApi.getCommunity(params.communityId).then(data=>setCommunity(data.community)).catch(err=>console.log(err)) 

    },[community])
    return (<>
    {community._id&&<div style={{ marginTop:'30px' }} className="d-flex align-items-center flex-column ">
        <Posts   />

    </div>}
    </>
    )
}

export default WaitingPosts