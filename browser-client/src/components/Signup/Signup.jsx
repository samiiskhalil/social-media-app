import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { height } from '@mui/system'


const Signup = () => {
  const [showToggle,setShowToggle]=useState(false)
  const [countries,setCountries]=useState([])
  useEffect( ()=>
  async ()=>{
    
  try{
      
const response= await axios.get('https://restcountries.com/v3.1/all')
if(response.status!==200)
console.log('no')
const countriesNames=response.data.map(country=>{return{country.name.common,country.flags.common}})
setCountries(countriesNames.sort())
}catch(err){
  console.log(err)
}
}
,[])

return (
<>
<div className="container">
  <form >
    <input type="text" name="c" id="c" onKeyDownCapture={()=>setShowToggle(true)}  />
    {showToggle?(<>
    <div className="items-container" style={{overflow:'scroll',width:'auto',height:'400px',border:'2px black solid'}}>
        {countries.map(country=><div 
        style={{ width:'inherit',height:'50px'
      }} >
        country
      </div>)}

    </div>
  
    </>):null}
    <div className="form-floating  m-3">

    <input placeholder='first name' required type="text" className="form-control" name='first-name' id='first-name' />
    <label htmlFor="first-name">first name</label>
    </div>
    <div className="form-floating m-3">

    <input placeholder='last name' required type="text" className="form-control" name='last-name' id='last-name' />
    <label htmlFor="last-name">last name</label>
    </div>
    <div className="form-floating m-3">

    <input placeholder='middle name'  type="text" className="form-control" name='middle-name' id='middle-name' />
    <label htmlFor="middle-name">middle name</label>
    </div>
    <div className="form-floating m-3">

    <input placeholder='age'  type="number" className="form-control" name='middle-name' id='middle-name' />
    <label htmlFor="age">age</label>
    </div>
    <div className="form-floating m-3">

    <select  className='form-select ' name="country" id="country">{countries.map((country,index)=>
      
      <option key={index} style={{ backgroundImage:'url(lagcdn.com/w320/gt.png)' }} value={country.name}>
        
       {country}  </option>
      
      )}</select>
    <label htmlFor="country">country </label>
    </div>
    <div className="form-floating m-3">
      <input type="text" className='form-control' placeholder='city' name='city' id='city' />
      <label htmlFor="city">city</label>
    </div>
    <div className="form-floating m-3">
      <input placeholder='steet' className='form-control' type="text" name="street" id="street" />
      <label htmlFor="street">street</label>
    </div>
    </form>
</div>
</>
    )
}

export default Signup