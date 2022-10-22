import React from 'react'
import image from '../../resources/sami.jpg'
import { useParams } from 'react-router'
import { useState,useRef,useEffect } from 'react'
import './editImg.css'
const EditImg = (props) => {
    const imgRef=useRef('')
    const {imageSrc}=useParams()
    function handleClick(e){
      console.log('a')
    }
    
  return (
    <>
    <div className="container container-md ">
<div className="row">
<div className="col">
  <div className="">

  <div className="edited-image-container">

<img className='edited-image' ref={imgRef} initPos={{ x:0,y:0 }}
 currentPos={{ x:0,y:0 }} lastOffset={{ x:0,y:0 }}
 src={`blob:http://localhost:3000/${imageSrc}`} alt="image"
onClick={handleClick} 
/>
  </div>
</div>
 </div>

 </div>

    </div>
    </>
    )
}

export default EditImg