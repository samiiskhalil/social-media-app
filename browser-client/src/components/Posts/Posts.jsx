import React from 'react'
import './posts.css'
import Post from './Post/Post.jsx'
import { useEffect } from 'react'
import postApi from '../../resources/api/post_requests.js'
const Posts = ({postsId}) => {
  useEffect(()=>{
  },[])
  // make api call to posts
  return (
  <div className="posts-container" >
    <Post/>
  </div>
  )
}

export default Posts