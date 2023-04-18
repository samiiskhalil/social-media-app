import {useState,useEffect} from 'react'
import Reply from './Reply/Reply'
const Replies = ({comments}) => {
  const [replies,setReplies]=useState(comments)
    return (<>
                
                {replies.length?
            <div className="replies-container" style={{ marginLeft:'30px' }}>
                {replies.map(comment=><Reply key={comment._id} comment={comment} />)}
                    
            </div>
        :null}
        </>
    )
}

export default Replies