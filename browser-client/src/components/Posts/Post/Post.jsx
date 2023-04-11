// `http://localhost:1000/api/${post.files[0].fileName}?postId=${post._id}
// if user is the the author or the the owner is the author then dont fetch the autor other wise fetch
import star from '../../../resources/images/star.png'
import React from 'react'
import userAPI from '../../../resources/api/user_requests'
import {useRef,useState,useEffect} from 'react'
import './post.css'
import store from 'store'
import {Comments} from './../../index.js'
import sami from '../../../resources/sami.jpg'
import { Link } from 'react-router-dom'
const Post = ({post}) => {
  const [author,setAuthor]=useState(()=>{
    if(store.get('owner')._id===post.publisher)
      return store.get('owner')
    if(store.get('user'._id===post.publisher))
      return store.get('user')
      return {_id:''}

  })  
  const postHeaderRef=useRef('')
  const [showCommentsFlage,setShowCommentsFlage]=useState(false)
  const [clickedSvgFlage,setClickedSvgFlage]=useState(false)
  const [hideDescribtionFlage,setHideDescribtionFlage]=useState(true)
  const [describtion,setDescribtion]=useState(post.describtion)
  const [visibleDescribtion,setVisibleDescribtion]=useState([])
  const [hiddenDescribtion,setHiddenDescribtion]=useState([])
  const handleStarClick=e=>{
  }
  const handleCommentClick=e=>{
    e.preventDefault()
setShowCommentsFlage(pre=>!pre)
}
const handleShareClick=e=>{
  
}
//fetch user data
const describtionRef=useRef('')
useEffect(()=>{
  const visibleDescribtion=describtion.slice(0,55)
  const hiddenDescribtion=describtion.slice(9)
  setHiddenDescribtion(hiddenDescribtion)
  setVisibleDescribtion(visibleDescribtion)
},[])
async function getUser (){
const data=await userAPI.getUser()
}
return (<>
            {author._id?
<>
            <div  style={{ minWidth:'400px',width:'70vw',maxWidth:'600px' }} className=" align-items-center card shadow border m-4 d-flex direction-column justify-start align-items-start p-2">
               <div  className="w-100 d-felx flex-wrap-nowrap flex-row justify-content-between border-3 border-bottom">

                <Link to={`/user/${author._id}`} style={{ minWidth:post.community&&'100%'
                }} className="  d-flex   flex-column justify-content-start align-items-start text-nowrap flex-basis-30">

                <img  className=' border poster-image' src={`http://localhost:1000/api/user-profile-image/${author.profileImage.imageName}?userId=${author._id}`} height='100'  alt="profile-image" />  
                <p className='p-3' >{author.firstName} {author.lastName}</p>
                </Link>
            {post.community.communityName?
            <Link style={{ width:'100%',height:'124.4px', }} className=' d-flex align-items-end justify-content-center pb-4 flex-basis-70' >
                <h4>{post.community.communityName}</h4>
                </Link>
                :null}
               </div>
                <div style={{ width:'100%' }} className="post-body">
                  <div style={{ minWidth:'100%' }} className="d-flex  p-2 mb-3  justify-start width-100 d-flex flex-row justify-content-start ">
                    <p ref={describtionRef}>{visibleDescribtion} 
                   {(describtion.length>50)&&<button onClick={()=>setHideDescribtionFlage(pre=>!pre)} className={`see-more-button ${!hideDescribtionFlage&&'hide'} `}> ...see more</button>}
                     <span className={`${hideDescribtionFlage&&'hide'}`}>{hiddenDescribtion}</span>   </p>            </div>
               {(describtion.length>50)&&<button onClick={()=>setHideDescribtionFlage(pre=>!pre)} className={` see-less-button ${hideDescribtionFlage&&'hide'}`} > see less</button>}
               {post.files.length? <div style={{ width:'100%',height:'400px' }} className="d-flex justify-center ">

               <img src={`http://localhost:1000/api/post-file/${post.files[0].fileName}?postId=${post._id}`} alt="post-photo" style={{ objectFit:'contain',width:'100%',height:'100%' }} className='border' />
                </div>:null}
                </div>
                <div style={{ width:'100%' }} className=" d-flex flex-row justify-content-between pt-4 border-top border-3 mt-4 pt-2">
                <div className="svg-container ">
             {true?<img src={star} alt="star" height='20px' width='20px' />:<svg className={`${post.likes.some(likeId=>likeId===store.get('user')._id)&&'liked-svg'}`}  onClick={handleStarClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>}
<span>22</span>
                  </div>
<div className="svg-container">

<svg  onClick={handleCommentClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
<span>77</span>
</div>
<div className="svg-container">
  <svg  className={post.shares.some(({user})=>store.get('user')._id===user)&&'shared-svg'} onClick={handleShareClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
  </svg>
  <span>10</span>
              </div>
              </div>
              </div>

              {showCommentsFlage&&<Comments/>}
</>:<h1>wait</h1>
            }
            </>
        )
}

export default Post