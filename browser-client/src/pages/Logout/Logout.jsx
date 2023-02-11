import React from 'react'
import Cookies from'js-cookie'
import { useNavigate } from 'react-router'
const Logout = () => {
  const navigate=useNavigate()
  return (
    <div className="container "style={{ display:'flex' ,justifyContent:'center',flexDirection:'column',marginTop:'50px'}}>
      <h1>do you want to log out ?</h1>
    <button onClick={(e)=>{
      Cookies.remove('token')
      Cookies.remove('userId')
      navigate('/')
    }} style={{ maxWidth:'100px' }} className="btn ">
      log out
    </button>
      </div>
    )
}

export default Logout