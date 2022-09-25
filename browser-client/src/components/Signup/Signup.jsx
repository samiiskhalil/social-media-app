import React from 'react'
import { FormControlLabel,InputLabel,Select,MenuItem,TextField,Container } from '@mui/material'
import {useState,useMemo,useEffect } from 'react'
const Signup = () => {
  const [countries,setCountries]=useState([{}])

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
const getCntryInfo=useMemo(()=>countries.map(country=>
  <MenuItem  value={country.name}> <img height='20' width='30' src={country.flag} alt='flag'></img> {country.name}</MenuItem>
  ),[countries])
return (

<>
<Container fixed >
  <form >
<TextField id='firstName' variant='outlined' label="first name" />
<TextField id='lastName' variant='outlined' label="last name" />
<TextField id='middleName'  variant='outlined' label="middle name (optional)" />
<TextField id='age' type='number' min='0' max='130' variant='outlined' label="age" />
<TextField type='Date' id='birth date' label='birth date' name='birth date'  />
<InputLabel id='country'>country</InputLabel>
<Select sx={{ minWidth:200 }} labelId='country'   label='country' id='country'>
  {
getCntryInfo
}
  </Select>   
  </form>
  </Container>
</>
  )
}

export default Signup