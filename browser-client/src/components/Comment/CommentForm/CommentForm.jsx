import {useState,useEffect} from 'react'
import store from 'store'
import { commentApi } from '../../../resources/api'
const CommentForm = ({postId,updateCommentFormFlage}) => {
    const [commentContent,setCommentContent]=useState('')
    const handleChange=(e)=>setCommentContent(e.target.value)
    const handleCreateComment=async ()=>{
        const data=await commentApi.createComment()
    }
    return (
    <>
    <div className="position-absolute  top-0 left-0  "   style={{ backgroundColor:'rgba(0,0,0,0.6)',width:'100vw',height:'1000vh',zIndex:'99999999999999999999' }} >

    <div className="  comment-form card  shadow position-fixed bottom-20 ">

    <form>
  <div className="d-flex flex-column justify-content-center align-items-center form-group">
    <label for="exampleFormControlTextarea1"> write your comment ... </label>
    <textarea onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  <button onClick={handleCreateComment} className="btn">submit comment</button>
  </div>
</form>
    </div>
    </div>
    </>
    )
}

export default CommentForm