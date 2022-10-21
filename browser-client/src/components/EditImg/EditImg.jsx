import React from 'react'
import image from '../../resources/sami.jpg'
import { useState,useRef,useEffect } from 'react'

const EditImg = (props) => {
    const imgRef=useRef('')
    function handleClick(e){
        console.log('a')
    }
  return (
    <>
    <div className="edit-iamge-container">
<div className={`filter ${props.imgType}`} >
<img ref={imgRef} initPos={{ x:0,y:0 }}
 currentPos={{ x:0,y:0 }} lastOffset={{ x:0,y:0 }}
   src={image} alt="image"
   onClick={handleClick}
   />
</div>


    </div>
    </>
    )
}

export default EditImg