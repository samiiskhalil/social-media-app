import {useState,useEffect} from 'react'
import store from 'store'
import { commentApi } from '../../../resources/api'
const CommentForm = ({comment,user}) => {
    const [commentContent,setCommentContent]=useState('')
    const handleChange=(e)=>setCommentContent(e.target.value)
    const handleCreateComment=async ()=>{
        const data=await commentApi.createComment()
    }
    return (
    <>
    <div className="card shadow position-fixed bottom-0">

    <form>
  <div className="form-group">
    <label for="exampleFormControlTextarea1"> write your comment ... </label>
    <textarea onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <button onClick={handleCreateComment} className="btn">submit comment</button>
</form>
    </div>
    </>
    )
}

export default CommentForm