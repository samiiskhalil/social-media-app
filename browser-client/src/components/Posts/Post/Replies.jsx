import {useState,useEffect} from 'react'
import Reply from '../../Comment/Replies/Reply/Reply'
import  store  from 'store'
import utilApi from '../../../resources/api/util_requests'
const Replies = ({comments}) => {
  const [replies,setReplies]=useState(comments)
  const [users,setUsers]=useState([])
  useEffect(()=>{
    async function getUsers(){
        
       const ids=replies.map(reply=>reply.user)
       if(!ids.length)
       retrun 
    const data =await utilApi.getUsers(ids)
    if(!data.success)
    return 
    setUsers(data.users)
    }
    getUsers()
  },[])  
    return (<>
                
                {replies.length&&users.length?

            <div className="replies-container m-4 " style={{ marginLeft:'30px' }}>
                {replies.map((comment,i)=><Reply   key={comment._id} passedUser={users[i]} comment={comment} />
                        
                        )}
                        </div>
                    
        :null}
        </>
    )
}

export default Replies