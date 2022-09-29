import React from 'react'
import axios from 'axios'
import { useRef,useEffect,useState } from 'react'
import { height } from '@mui/system'
import './signup.css'

const Signup = () => {
  const [countryList,setCountryList]=useState([])
  const [showToggle,setShowToggle]=useState(false)
  const [countries,setCountries]=useState([])
  const countrySearch=useRef(null)
  useEffect( ()=>
  async ()=>{
    
  try{
      
const response= await axios.get('https://restcountries.com/v3.1/all')
if(response.status!==200)
console.log('no')
console.log('data arrived')
const {data}=response
const temp=data.map(country=>{
const {name:{common:name},flags:{png:flag}}=country
return {name,flag}
})
setCountries(temp)

}catch(err){
  console.log(err)
}
}
,[])
let tempList=[]
return (
<>
<div className="container">
  <form >
    
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

    <input type="text" ref={countrySearch} className='form-control' name="country" id="country"
    onKeyUpCapture=
    {(e)=>{setShowToggle(true)
      setCountryList([])
      countries.forEach(country=>
        {
          if(country.name.slice(0,e.target.value.length).toLowerCase()===e.target.value.toLowerCase())
           
            setCountryList(pre=>[...pre,country])
            
          }
          )
          console.log(e.target.value)

        }
    }  />

{console.log(countryList)}
    {showToggle?(<>
    <div className="items-container"
     style={{overflow:'scroll',height:'400px',width:'auto'
     ,border:'2px black solid'}}>
        {countryList.map((country,index)=>
        <button onClickCapture={
          country.name=countrySearch.current.value    
        } key={index} className='item-btn' 
         >
         <span>{country.name}</span> <img height='20' width='30' src={country.flag} alt="falg" />

      </button>)} 

    </div>
  
    </>):null}    
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