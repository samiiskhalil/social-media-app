import './login.css'
import Cookies from 'js-cookie'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
const Login=()=>{
const [user,setUser]=useState({})
const [loggerFlage,setLoggerFlage]=useState(false)
const navigate=useNavigate()
function handleChange(e){
  setUser(pre=>{
    return {
      ...pre,[e.target.name]:e.target.value
    }
  })}
  async function handleClick(e){

    
    try{
      e.preventDefault()
 const {data}= await axios.get('http://localhost:1000/api/users/login',{params:{
      email:user.email
    },headers:{
      "authorization":user.password
    }})
    console.log('a')
    console.log(data)
    if(data.success)
    Cookies.set('token',data.token,data.userId)
    navigate(`/users/${data.userId}`)
  }

  catch(err){
    console.log(err)
  }
  }
 
  return(

  <div className="container">
    <form className='shadow' >
    <h2>please fill up the form to log you in :</h2>

    <div className="form-group">
        <input onChange={handleChange} type="email" placeholder="email" required name="email" className="form-control" />
    </div>
    <div className="form-group">
      <input onChange={handleChange} type="password" className="form-control" name='password' placeholder="password" required />

    </div>
    <button onClick={handleClick} type='button' className="btn">submit</button>
    </form>
  </div>
  )
}
export default Login