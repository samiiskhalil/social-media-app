import React from 'react'
import { Button,FormControlLabel,InputLabel,Select,MenuItem,TextField,Container } from '@mui/material'
import {useState,useMemo,useEffect } from 'react'
import './style.css'
const Signup = () => {
  // const [firstName,setFirstName]=useState('')
  // const [lastName,setLastName]=useState('')
  // const [middleName,setMiddleName]=useState('')
  // const [age,setAge]=useState('')
  // const [date,setDate]=useState('')
  const [countries,setCountries]=useState([])
  // const [country,setCountry]=useState('')
  // const [city,setCity]=useState('')
  // const [neighborhood,setNeighborhood]=useState('')
  const [user,setUser]=useState({})
  useEffect(()=>{
fetch('https://restcountries.com/v3.1/all',{
  method:'GET'
}).then(data=>{
  if(data.ok)
  return data.json()
else
console.log('err')
})
.then(response=>{
  response.forEach(country=>
    setCountries(preState=>
      [... preState,{name:country.name.common,flag:country.flags.png}] )  )
})
},[])
const getCntryInfo=useMemo(()=>countries.map((country,id)=>
  <MenuItem key={id} value={country.name}> <img height='20' width='30' src={country.flag} alt='flag'></img> {country.name}</MenuItem>
  ),[countries])
  const handleChange=e=>setUser(prevUser=>{return{... prevUser,
    [e.target.id] : e.target.value}})
return (

<>
<div className='form-signup-container' >
  <form className='signup-form' >
    <div className="input-container">

<TextField id='firstName' value={user.firstName} required onChange={handleChange} variant='outlined' label="first name" />
<TextField id='lastName' required value={user.lastName} onChange={handleChange} variant='outlined' label="last name" />
<TextField id='middleName' value={user.middleName} onChange={handleChange}  variant='outlined' label="middle name (optional)" />
    </div>
    <div className="input-container">

<TextField id='age' required value={user.age} type='number' min='0' max='130' variant='outlined' label="age" />
<TextField type='Date' id='birthDate' value={user.birthDate} required name='birth date'  />
<InputLabel id='country'>country</InputLabel>
<Select sx={{ minWidth:200 }} labelId='country' value={user.country} label='country' id='country' onChange={handleChange} >
  {
    getCntryInfo
}
  </Select  >   
    </div>
    <div className="input-container">

  <TextField id='city' onChange={handleChange} value={user.city} label='city' />
  <TextField id='neighborhood' onChange={handleChange} value={user.neighborhood} label='neighborhood' />
    </div>
  <Button type='submit' >submitt</Button>
  </form>
  </div>
</>
  )
}

export default Signup