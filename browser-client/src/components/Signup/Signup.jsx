import React from 'react'
import axios from 'axios'
import { useRef,useEffect,useState } from 'react'
import { height } from '@mui/system'
import './signup.css'

const Signup = () => {
  const inpRef=useRef('')
  const [country, setCountry] = useState('')
  const [countryList,setCountryList]=useState([])
  const [showToggle,setShowToggle]=useState(false)
  const [countries,setCountries]=useState([])
  const [user,setUser]=useState({})
  
  const handleSubmit=()=>console.log('as')
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

const handleChange=(e)=>{
  setUser(pre=>{return{...pre,[e.target.name]:e.target.value,[inpRef.current.name]:inpRef.current.value}})
}
return (
  <>
<div onClick={(e)=>{
  if(!inpRef.current.contains(e.target))
  setShowToggle(false)
}} className="container wrap form-container">
  <form >
    <div className="row">
<div className="col-sm-6 col-12 ">

    <div className="form-floating  m-3">

    <input onChange={handleChange} placeholder='first name' required type="text" className="form-control" name='first-name' id='first-name' />
    <label htmlFor="first-name">first name</label>
    </div>
    <div className="form-floating m-3">

    <input onChange={handleChange} placeholder='last name' required type="text" className="form-control" name='last-name' id='last-name' />
    <label htmlFor="last-name">last name</label>
    </div>
    <div className="form-floating m-3">

    <input onChange={handleChange} placeholder='middle name'  type="text" className="form-control" name='middle-name' id='middle-name' />
    <label htmlFor="middle-name">middle name</label>
    </div>
    <div className="form-floating m-3">

    <input onChange={handleChange} required placeholder='age'  type="number" className="form-control" name='middle-name' id='middle-name' />
    <label htmlFor="age">age</label>
    </div>
    <div  className="form-floating m-3">

    <input onChange={handleChange} type="text" ref={inpRef}  className='form-control' name="country" id="country"
    onKeyUpCapture=
    {(e)=>{setShowToggle(true)
      setCountryList([])
      countries.forEach(country=>
        {
          if(country.name.slice(0,e.target.value.length).toLowerCase()===e.target.value.toLowerCase())
          
          setCountryList(pre=>[...pre,country])
          
        }
        )        
      }
    }  />

{
}
    {showToggle?(<>
    <div className="items-container"
    >
        {countryList.map((country,index)=>
        <button 
        onClick={()=>
          { setShowToggle((pre)=>!pre)
            inpRef.current.value=country.name
            setUser(((pre)=>{return{...pre,country:country.name}}))
          }}
          key={index} name='country' className='item-btn' 
          >
         <span>{country.name}</span> <img height='20' width='30' src={country.flag} alt="falg" />

      </button>)} 

    </div>
  
    </>):null}    
    <label htmlFor="country">country </label>
    </div>
            </div>
            <div className="col">

    <div className="form-floating m-3">
      <input onChange={handleChange} type="text" className='form-control' placeholder='city' name='city' id='city' />
      <label htmlFor="city">city</label>
    </div>
    <div className="form-floating m-3">
      <input onChange={handleChange} placeholder='street' className='form-control' type="text" name="street" id="street" />
      <label htmlFor="street">street</label>
    </div>
    
    <div className="form-floating m-3">
      <input onChange={handleChange} required placeholder='phone number' className='form-control' type="number" name="phone-number" id="phone-number" />
      <label htmlFor="phone-number">phone number</label>
    </div>
    <div className="form-floating m-3">
      <input onChange={handleChange} required placeholder='email' className='form-control' type="email" name="email" id="email" />
      <label htmlFor="email">email</label>
           </div>
    <div className="form-floating m-3">
      <input onChange={handleChange} required placeholder='birth date' className='form-control' type="date" name="birth-data" id="birth-data" />
      <label htmlFor="birth-data">birth date</label>
           </div>
           <div onChange={handleChange} className="form-check-inline m-3">

<input onChange={handleChange} required type="radio" value='male' className='form-check-input' name="sex" id="sex" />
 <label className='form-check-label' htmlFor="sex">male</label>          
           </div>
 
           <div className="form-check-inline m-3 ">

<input onChange={handleChange} required type="radio" value='female' className='form-check-input' name="sex" id="sex" />
 <label className='form-check-label' htmlFor="sex">female</label>          
           </div>
 
            </div>
    </div>
 <div className="row">
  <div className="col ">
  <button onSubmit={handleSubmit} type='submit' className='btn btn-primary  m-3'>submit</button>
  </div>
  </div>
    </form>
{console.log(user)}
</div>
</>
    )
  }
  
  export default Signup