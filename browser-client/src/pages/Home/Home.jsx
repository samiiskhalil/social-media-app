import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import './home.css'
import { useNavigate } from 'react-router'
const Home = () => {
  const [user,setUser]=useState({})
  const [userLoggedFlage,setUserLoggedFlage]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
axios.get('http://localhost:1000/api/users/user',{
      Headers:{
        "authorization":`BEARER ${Cookies.get('token')}`
      }
    })
    .then(({data})=>{
      setUser(data)
    })
    .catch(err=>
      console.log(err.message)
    )
},[])
  return (
    <div className="container">
      <div className="row">
    <div className="col">

      <div className=  {`  mt-5 user-logger-container ${userLoggedFlage&&'hide'}`}>
    <h1>seems you are not logged</h1>
    <div className='btns-container' >

    <button className="btn p-3 m-3">sign up</button>
    <button className="btn p-3 p m-3 ">log in</button>
    </div>
      </div>
    </div>
      </div>
    </div>
    )
}

export default Home