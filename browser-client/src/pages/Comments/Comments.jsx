import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router'
import postApi from '../../resources/api/post_requests'
import {Comment} from '../../components/index.js'
import utilApi from '../../resources/api/util_requests'
const Comments = () => {
    const params=useParams()
const [users,setUsers]=useState([])
const [comments,setComments]=useState([])
const [commentsFlage,setCommentsFlage]=useState(false)
useEffect(()=>{
    async function getComments(){
        const data =await postApi.getComments(params.postId)
        setComments(data.comments)    
        setCommentsFlage(true)
    }
    getComments()
},[])   
function displayComments(comments){
return comments.map((comment,i)=><Comment passedPostId={params.postId} key={comment._id} passedUser={users[i]} passedComment={comment} /> )


}
useEffect(()=>{
  
  async function getUsers(){

      console.log('as')
      let ids=comments.map(({user})=>user)
      const data=await utilApi.getUsers(ids)
      if(!data.success)
      return
      setUsers(data.users)
    }
    getUsers() 
// setUsers(ids)
},[comments])
return (
<>
<div style={{minHeight:'100vh',minWidth:'100vw' }} className=' position-absolute' >

{comments.length&&users.length?
<div  className="container pt-4   position-relative comments-container ">
<div className="row">
    <div className="col">
    <div style={{ width:'100vw' }} className="d-flex flex-column  align-items-center comments-container">
        {displayComments(comments)}
        {/* {comments.map(comment=><div className='comment-container'>
s
        </div>)} */}
    
    </div>
    </div>
</div>
</div>
 :commentsFlage?'no comments was found':'loading'}
 </div>
</>
    )
}

export default Comments