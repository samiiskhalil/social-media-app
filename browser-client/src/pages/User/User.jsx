// important scale the profile picture down by 1/3
import React from 'react'
import store from 'store'
import { Await, Link,useNavigate, useParams } from 'react-router-dom'
import EditImg from '../EditImg/EditImg.jsx'
import axios from 'axios'
import './user.css'
import Cookies from 'js-cookie'
import '../../index.css'
import {Posts,OverlayImage} from '../../components/index.js'
import wallpaper from '../../resources/sami.jpg'
import {useEffect,useRef,useState} from 'react'
import userAPI from '../../resources/api/user_requests.js'
const User = () => {
  const [imageSrc,setImageSrc]=useState()
  const [errMsg,setErrMsg]=useState('')
  const[success,setSuccess]=useState(true)
  const [owner,setOwner]=useState(true)
  const [profileImageSrc,setProfileImageSrc]=useState()
  const [coverImageSrc,setCoverImageSrc]=useState()
  const [user,setUser]=useState({})
  const profilePictureUploadInputRef=useRef('')
  const profilePictureRef=useRef('')
  const [profilePictureEditigFlage,setProfilePictureEditingFlage]=useState(false)
  const [profilePictureMenuFlage,setProfilePictureMenuFlage]=useState(false)
  const [backgroundImageMenuFlage,setBackgroundImageMenuFlage]=useState(false)
  const [backgroundImageEditFlage,setBackgroundImageFlage]=useState(false)  
  const backgroundImageUploadRef =useRef('')
  const backgroundImageRef=useRef('')
  const navigate=useNavigate()   
  const params=useParams()
  // first check if the account belongs to the same user
  useEffect(()=>{
    if((!Cookies.get('token'))||(!store.get('user'))){
      navigate('../../login')
      
    }
    setUser(store.get('user'))

    },[])
  useEffect(()=>{
    async function checkUser(){
      if(params.id!==store.get('user')._id)
      {
        console.log('asd')
        setOwner(false)
        let {user}=await userAPI.getUser(params.id)
        setOwner(false)
        setUser(user)
      }
      setUser(store.get('user'))
        }
        checkUser()
    
  },[])
  useEffect(()=>{
    
    if(!user._id)
    {
      setSuccess(false)
      setErrMsg('no user was found')
      return 
    }
    if(user._id){
      setCoverImageSrc(`http://localhost:1000/api/user-cover-image/${user.coverImage.imageName}?userId=${user._id}`)
      setProfileImageSrc(`http://localhost:1000/api/user-profile-image/${user.profileImage.imageName}?userId=${user._id}`)
    }
},[user])
    const handleImgUpload=(inputRef,imageType)=>{
      const [file]=inputRef.current.files
      const imageSrc=URL.createObjectURL(file).split('/')[3]

      // pass type of image to the Edit image component
      // console.log(inputRef.current.attributes.for)
      store.set('image-name',file.name)
      console.log(store.get('image-name'))
      store.set('type',imageType)
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
     src={user._id?coverImageSrc:'*'}
     style={user._id&&{ transform:`scale(${user.coverImage.style.scale})` ,top:`${user.coverImage.style.top}px`}} 
     alt='background-image' />
     </div>
    <div   className='update-background-container  '>
   <button onClick={()=>setBackgroundImageMenuFlage(pre=>!pre)} className='btn-background' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg></button>
  <div className={`background-menu  `} style={{ display:!backgroundImageMenuFlage&&'none'}} >
    <label className='upload-image' htmlFor="background">

    <input for='background-image' accept='image/*'   onChange={(e)=>handleImgUpload(backgroundImageUploadRef,'background-image')} 
    ref={backgroundImageUploadRef}  placeholder='upload' className='upload-background'  
    type="file" name="background" id="background" />
    upload
    </label>
   </div>

  </div>
   
   
<div  className="profile-picture-container">
  <div  className="profile-image-container">

  <img  className='user-profile-image' draggable='false' ref={profilePictureRef}
      src={user._id?profileImageSrc:'*'}
      style={user._id&&{
         transform:`scale(${user.profileImage.style.scale*4 })`
         , top:`${user.profileImage.style.top}px`}}
         
         alt="user-profile-picture" />
  </div>
  <div className={`profile-picture-options-container `}>
    <button onClick={e=>setProfilePictureMenuFlage(pre=>!pre)}  type='button' className='profile-picture-update-button'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>
    </button >
      <div className={`profile-picture-update-menu-container `}style={{ display:!profilePictureMenuFlage&&'none'}}>
    <label htmlFor="update-profile-picture">
        <input for='profile-image' ref={profilePictureUploadInputRef}   onChange={(e)=>handleImgUpload(profilePictureUploadInputRef,'profile-image')} accept='image/*' placeholder='upload' type='file' name='update-profile-picture' id='update-profile-picture' className=' profile-picture-update-menu-item '/>
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
      <h1 className='user-name'>{user.firstName} {user.lastName}</h1>
      
  <Posts/>

    </div>
  </div>
</div>
</>
    )
}

export default User