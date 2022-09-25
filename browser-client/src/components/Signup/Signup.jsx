import React from 'react'
import { Button,FormControlLabel,InputLabel,Select,MenuItem,TextField,Container } from '@mui/material'
import {useState,useMemo,useEffect } from 'react'
const Signup = () => {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [middleName,setMiddleName]=useState('')
  const [age,setAge]=useState('')
  const [date,setDate]=useState('')
  const [countries,setCountries]=useState([])
  const [country,setCountry]=useState('')
  const [city,setCity]=useState('')
  const [neighborhood,setNeighborhood]=useState('')
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
return (

<>
<Container fixed >
  <form >
<TextField id='firstName' required onSubmit={(e)=>{setFirstName(e.target.value)
  console.log('s')}} variant='outlined' label="first name" />
<TextField id='lastName' required onSubmit={(e)=>setLastName(e.target.value)} variant='outlined' label="last name" />
<TextField id='middleName' onSubmit={(e)=>setMiddleName(e.target.value)}  variant='outlined' label="middle name (optional)" />
<TextField id='age' required type='number' min='0' max='130' variant='outlined' label="age" />
<TextField type='Date' id='birth date' required name='birth date'  />
<InputLabel id='country'>country</InputLabel>
<Select sx={{ minWidth:200 }} labelId='country' value={country} label='country' id='country' onChange={e=>setCountry(()=>e.target.value)} >
  {
getCntryInfo
}
  </Select  >   
  <TextField id='city' onSubmit={e=>setCity(e.target.value)} label='city' />
  <TextField id='neighborhood' onSubmit={e=>setNeighborhood(e.target.value)} label='neighborhood' />
  <Button type='submit' >submitt</Button>
  </form>
  </Container>
</>
  )
}

export default Signup