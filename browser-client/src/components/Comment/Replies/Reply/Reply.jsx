import {useState,useEffect,useRef} from 'react'
import Replies from '../Replies'
const Reply = ({comment}) => {
const [reply,setReply]=useState(comment)
const leftLine=useRef('')
useEffect(() => {
    // const beforeElement = window.getComputedStyle(replyRef.current, '::before');
    // console.log(beforeElement.content);
    if(!leftLine.current)
    return
        leftLine.current.style.left='0'
      let repliesContainer  =leftLine.current.parentNode.parentNode
    //   leftLine.current.style.minWidth
      console.log(repliesContainer)  
      
  }, []);
return (
    <>
    {
     <>   
        <div  className="reply-container position-relative m-4  p-2" style={{marginLeft:'10%',backgroundColor:'rgba(240,240,240,1)'}} >
          <span ref={leftLine} className="left-line"> </span>
            {reply._id?<>
                    <div className="reply-container">
                <div className="reply-header">
                reply header
                </div>
                <div className="reply-body">
                    reply body
                </div>
                <div className="reply-tail">
                    reply tail
                  
                </div>
            </div>    
             
</>
        :null}
        </div>
       </> }
        {reply._id&&reply.repliedBy.length?

<Replies comments={reply.repliedBy}/>
               :null}
    </>
    )
}

export default Reply