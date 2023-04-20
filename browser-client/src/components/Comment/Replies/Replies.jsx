import {useState,useEffect} from 'react'
import Reply from './Reply/Reply'
import utilApi from '../../../resources/api/util_requests'
import { commentApi } from '../../../resources/api'
const Replies = ({comments}) => {
  const [replies,setReplies]=useState(comments)
  const [users,setUsers]=useState([])
  // useEffect(()=>{
  //   async function getReplies(){
  //     const data=await commentApi.getReplies()
  //     if(!data.success)
  //     return
  //     setReplies(data.comments)

  //   }
  //   getReplies()
  // },[])
  useEffect(()=>{
    async function getUsers(){
        console.log('fetching users')
       const ids=replies.map(reply=>reply.user)
       if(!ids.length)
       retrun 
    const data =await utilApi.getUsers(ids)
    if(!data.success)
    return 
    console.log(data)
    setUsers(data.users)
    }
    getUsers()
  },[])  
//   console.log(users)
    return (<>
                
                {replies.length&&users.length?

            <div className="replies-container " style={{ marginLeft:'30px' }}>
                {replies.map((comment,i)=><Reply key={comment._id} passedUser={users[i]} comment={comment} />
                        
                        )}
                        </div>
                    
        :null}
        </>
    )
}

export default Replies