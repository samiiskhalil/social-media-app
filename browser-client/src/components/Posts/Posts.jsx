import React from 'react'
import './posts.css'
import Post from './Post/Post.jsx'
import { useEffect,useState } from 'react'
import postApi from '../../resources/api/post_requests.js'

const Posts = ({posts}) => {

  // make api call to posts
  return (
  <div className="row" >
    <div className="col"></div>
    {posts.map(post=>   < Post post={post} key={post._id} />)}

  </div>
  )
}

export default Posts