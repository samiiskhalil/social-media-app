import React from 'react'
import './posts.css'
import Post from './Post/Post.jsx'
import { useEffect,useState } from 'react'
import postApi from '../../resources/api/post_requests.js'

const Posts = ({posts,user}) => {

  // make api call to posts
  return (
  <div className="row" >
    <div className="col d-flex flex-column align-items-center justify-content-center">

    {posts.map(post=>< Post post={post} key={post._id} />)}
    </div>

  </div>
  )
}

export default Posts