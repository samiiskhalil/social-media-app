import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router'
import postApi from '../../resources/api/post_requests'
import {Comment,CommentForm} from '../../components/index.js'
import utilApi from '../../resources/api/util_requests'
const Comments = () => {
    const params=useParams()
const [showCommentFormFlage,setShowCommentFormFlage]=useState(true)
const [users,setUsers]=useState([])
const [comments,setComments]=useState([])
const [commentsFlage,setCommentsFlage]=useState(false)
useEffect(()=>{
    async function getComments(){
        const data =await postApi.getComments(params.postId)
        setComments(data.comments)    
        console.log(data)
        setCommentsFlage(true)
    }
    getComments()
},[])   
function displayComments(comments){
return comments.map((comment,i)=><Comment postId={params.postId} key={comment._id} user={users[i]} passedComment={comment} /> )
}
useEffect(()=>{
  
  async function getUsers(){

      let ids=comments.map(({user})=>user)
      const data=await utilApi.getUsers(ids)
      if(!data.success)
      return
      setUsers(data.users)
    }
    getUsers() 
// setUsers(ids)
},[comments])
const updateCommentFormFlage=()=>setShowCommentFormFlage(pre=>!pre)
return (
<>
<div style={{minHeight:'100vh',minWidth:'100vw' }} className=' position-relative' >
{showCommentFormFlage&&<CommentForm updateCommentFormFlage={updateCommentFormFlage} />}
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