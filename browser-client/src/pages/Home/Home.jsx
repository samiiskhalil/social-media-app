import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import store from 'store'
import axios from 'axios'
import './home.css'
import { useNavigate } from 'react-router'
const Home = () => {
  const [user,setUser]=useState({})
  const [userLoggedFlage,setUserLoggedFlage]=useState(false)
  const navigate=useNavigate()
async function checkLogger(){

  if(store.get('user')){
    navigate(`user/${store.get('user')._id}`)
  }
  if(Cookies.get('token')){
    const data =await userAPI.getTheUser(Cookies.get('token'))
    store.set('user',data.user)
    navigate(`/user/${data.user._id}`)
  } 
    
    }
  return (
<>
      <div className=  {` d-flex flex-column align-items-center  mt-5 user-logger-container ${userLoggedFlage&&'hide'}`}>
    <h1>seems you are not logged</h1>
      
      <div className=" mt-3 container d-flex flex-row justify-content-center">

    <button onClick={()=>navigate('/signup')} className="btn p-3 m-3">sign up</button>


    <button onClick={()=>navigate('/login')} className="btn p-3 p m-3 ">log in</button>
      </div>
    </div>
   </>
    )
}

export default Home