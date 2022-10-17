import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './user.css'
import wallpaper from '../../../resources/sami.jpg'
import {useEffect,useRef,useState} from 'react'
const User = () => {
  const [mousePos,setMousePos]=useState({})
  const intervalRef=useRef('')
  const [clicking,setClicking]=useState(false)
    const [editBackground,setEditBackground]=useState(false)
  const backgroundRef=useRef('')
  const imgRef=useRef('')
  const backgroundMenu1=useRef('')
  const [backgroundMenu,setBackgroundMenu]=useState(false)
  const [user, setUser] = useState({})
  const handleMouseUpdate=(e)=>{
    setMousePos({x:e.pageX,y:e.pageY})
  }
  function startMoving(e) {
  }
  function stopMoving(e){
    e.preventDefault()
intervalRef.current=null
}
  function handleImgUpload(e){
    const [file]=backgroundMenu1.current.files
    if(file)
    backgroundRef.current.src=URL.createObjectURL(file)
    setEditBackground(true)
  }

return (
<>
<div className="contianer container-md">
<div className="row">
  <div className="col">

<div className="images-holder">
  <div className="background-image-container">
    {editBackground&&<div className='form-update-background'>
      <button className="btn update-background-btn">
     Cancel   
      </button>
      <button type='button' className="btn btn-outline update-background-btn">
      confirm
      </button>
      </div>}
    <img  draggable='false' ref={backgroundRef}
     src='#'  onMouseMove={handleMouseUpdate} onMouseEnter={handleMouseUpdate} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} alt='sbackground-image' className=" background-image"/>
    <div className="update-background-container">

    <button onClick={()=>setBackgroundMenu(pre=>!pre)} className='btn-background' >Update</button>
  {backgroundMenu &&<div className='background-menu'>
    <label className='edit-image' htmlFor="background">

    <input accept='image/*' onChange={handleImgUpload} ref={backgroundMenu1} placeholder='upload' className='upload-background'  type="file" name="background" id="background" />
    upload
    </label>
   </div>}
  </div>
    </div>
   

</div>
</div>
  </div>
</div>
</>
    )
}

export default User