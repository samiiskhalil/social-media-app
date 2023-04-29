import React from 'react'
import axios from 'axios'
import userApi from '../../resources/api/user_requests.js'
import { Navigate, useNavigate } from 'react-router'
import { useRef,useEffect,useState } from 'react'
import store from 'store'
import Cookies from 'js-cookie'
const CommunityForm = () => {
function handleChange() {
    console.log('as')
}  
function handleSubmit()
{
    console.log('s')
}
    return (
      <>
      <div style={{borderRadius:'30px'  }} className="d-flex justify-content-center align-items-center m-5  shadow border ">
      <form className='' >
    
        <div className="form-floating  m-3">
        <input onChange={handleChange} placeholder='first name' required type="text" className="form-control" name='communityName' id='first-name' />
        <label htmlFor="communityName">community name</label>
        </div>
        <div className="form-floating m-3">
    
        <textarea style={{ minWidth:'300px' ,minHeight:'300px'}} onChange={handleChange} placeholder='community describtion'  type="text" className="form-control" name='middleName' id='middleName' />
        <label htmlFor="communityDescrbtion">community describtion</label>
        </div>
                <div className="col">
    
        
               <div onChange={handleChange} className="form-check-inline m-3">
    
    <input onChange={handleChange} required type="radio" value='male' className='form-check-input radio-input' name="sex" id="male" />
     <label className='form-check-label' htmlFor="sex">male</label>          
               </div>
     
     
                </div>
     <div className="row">
      <div className="col ">
    <button type='button' className='btn btn-primary m-3 '   >Next</button>
    </div>
      </div>
             
        </form>
        </div>
    </>
        )
      }
      

export default CommunityForm