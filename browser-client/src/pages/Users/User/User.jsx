import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {EditImg} from '../../EditImg/EditImg.jsx'
import axios from 'axios'
import './user.css'
import {Posts} from '../../../components/index.js'
import wallpaper from '../../../resources/sami.jpg'
import {useEffect,useRef,useState} from 'react'
const User = () => {
  const profilePictureUploadInputRef=useRef('')
  const profilePictureRef=useRef('')
  const[profilePictureEditigFlage,setProfilePictureEditingFlage]=useState(false)
  const [profilePictureMenuFlage,setProfilePictureMenuFlage]=useState(false)
  const [backgroundImageMenuFlage,setBackgroundImageMenuFlage]=useState(false)
  const [backgroundImageEditFlage,setBackgroundImageFlage]=useState(false)  
  const backgroundImageUploadRef =useRef('')
  const backgroundImageRef=useRef('')
  const navigate=useNavigate()   
    const handleImgUpload=(inputRef)=>{
      const [file]=inputRef.current.files
      const imageSrc=URL.createObjectURL(file).split('3000/')[1]
      // pass type of image to the Edit image component
      // console.log(inputRef.current.attributes.for)
      localStorage.setItem('type',inputRef.current.attributes['for'])
      console.log(localStorage.getItem('type'))
      navigate(`/edit-image/${imageSrc}`)
    }
return (
<>
<div className="container container-fluid ">
<div className="row">
  <div className="col">

<div className="images-holder">
  <div className="background-image-container">

<img  draggable='false' ref={backgroundImageRef}
     src='#' alt='background-image' className='background-image '/>
     </div>
    <div   className='update-background-container  '>
   <button onClick={()=>setBackgroundImageMenuFlage(pre=>!pre)} className='btn-background' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg></button>
  <div className={`background-menu ${!backgroundImageMenuFlage&& 'hide'}`}>
    <label className='upload-image' htmlFor="background">

    <input for='background-image' accept='image/*'   onChange={(e)=>handleImgUpload(backgroundImageUploadRef)} 
    ref={backgroundImageUploadRef}  placeholder='upload' className='upload-background'  
    type="file" name="background" id="background" />
    upload
    </label>
   </div>

  </div>
   
   
<div  className="profile-picture-container">
  <div  className="profile-img-container">
  <img clicking={false} draggable='false' ref={profilePictureRef}
  
  src="#" alt="profile-picture" />
  </div>
  <div className={`profile-picture-options-container `}>
    <button onClick={e=>setProfilePictureMenuFlage(pre=>!pre)}  type='button' className='profile-picture-update-button'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>
    </button >
      <div className={`profile-picture-update-menu-container ${!profilePictureMenuFlage&&'hide'}`}>
    <label htmlFor="update-profile-picture">
        <input for='profile-image' ref={profilePictureUploadInputRef}   onChange={(e)=>handleImgUpload(profilePictureUploadInputRef)} accept='image/*' placeholder='upload' type='file' name='update-profile-picture' id='update-profile-picture' className=' profile-picture-update-menu-item '/>
         upload
    </label>
      </div>
  </div>

</div>
</div>
</div>
  </div>
  <div className="row">
    <div className="col">
  <Posts/>

    </div>
  </div>
</div>
</>
    )
}

export default User