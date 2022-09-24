import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { useState } from 'react'
import './signup.css'
const Signup = () => {
  const [showPopup,setShowPopup]=useState(false)
setTimeout(()=>{
  setShowPopup(true)
},7000)
return (
<>
{showPopup? <>
<div className="hidden">
  <h2>give us premisson to use your location</h2>
  <div className="">
    <button className=''>approve</button>
    <button className=''>disapprove</button>
  </div>
</div>
</>:null}
<div className="container">
<form  >
<div className="insCont">
<div className="inpCont">
<input placeholder='first name' type="text" name='firstName' id='firstName' required />
</div>
<div className="inpcont">
<input placeholder='last name' type="text" name='lastName' id='lastName' required/>
</div>
<div className="inpcont">
<input placeholder='middle name (not required)' type="text" name="middleName" id="middleName" />
</div>
<div className="inpcont">
<input placeholder='age' type="number" name='age' id='age' min='0' max='130' required/>
</div>
<div className="inpcont">
<label htmlFor="birthDate">birth date</label>  
<input type="date" name='birthDate' id='birthDate' required />
</div>
</div>
<div className="insCont">
<div className="inpcont">
<input placeholder='email' type="email" name='email' id='email' />
</div>
<div className="inpcont">
<input placeholder='phone number' type="number" name="phoneNumber" id="poneNumber" />
</div>
<div className="inpcont">
<label htmlFor="male">male</label>
<input type="radio" value='male' name="sex" id="male" />  

<label htmlFor="female">male</label>
<input type="radio" value='female' name="sex" id="female" />
</div>
</div>
<button type='submit' >submit</button>
</form>
</div>
</>
    )
}

export default Signup