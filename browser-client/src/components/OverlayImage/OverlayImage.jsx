import React from 'react'
import store from 'store'
import { useEffect,useState } from 'react'
import './overlay.css'
const OverlayImage = ({imageSrc}) => {
const [flage,setFlage]=useState(store.get('overlayFlage'))
    return (
    <div style={{ display:!flage&&'none' }} className='overlay-container'>
    <div className="relative-container">

        <button className='exit-btn' onClick={()=>{
            store.set('overlayFlage',false)
            setFlage(false)
            }} >Exit</button>
        <img src='*' alt="" />
    </div>
    </div>
  )
}

export default OverlayImage