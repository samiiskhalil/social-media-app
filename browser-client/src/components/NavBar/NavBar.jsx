import React from 'react'
import store from 'store';
import { useState,useRef,useEffect } from 'react'
import userAPI from '../../resources/api/user_requests';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import './NavBar.css'
import {useLocation,NavLink,Outlet, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
const NavBar = () => {
  const navigate=useNavigate()
  const [results,setResults]=useState([])
  const [searchQuery,setSearchQuery]=useState()
  let location=useLocation()
  async function handleSearch(e)
  {
    e.preventDefault()
    const results=await userAPI.searchQeury(searchQeury)
   
    console.log(results)
  }
return (<>

<StickyBox className='sticky-nav' style={{ top:'0px',zIndex:'99999999'}}  >


<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a href="" className="nav-link">

            <Link to='/' >Home</Link>
          </a>
        </li>
        <li className="nav-item">
        <a  className="nav-link">
          <Link to={`/user/${store.get('userId')}`} >your page</Link>
        </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">

            <Link to={'/logout'} >log out</Link>
          </a>
                  </li>
      </ul>
      <form className="d-flex position-relative">
        <input  onChange={(e)=>{setSearchQuery(e.target.value)
        if(e.target.value==='')
        setResults([])
        
        }} className="form-control me-2" type="search" placeholder="Search" id='searcgQuery' aria-label="Search"/>

        <button onClick={async(e)=>  {
          e.preventDefault()
          const data= await userAPI.searchQuery(searchQuery)
          console.log(data) 
          setResults(data.results)
}} className="btn btn-outline-success" type="submit">Search</button>

        {Object.keys(results).length?<div style={{ top:'90px',minWidth:'200px',width:'30vw',maxWidth:'400px' }} className="list-container position-absolute  left-0">
          <ul className='list-group positoin-absolute' >
              <>
              <>
              {

                results.users.map((user,i)=>{
                  return  <li key={i} className='list-group-item'>
                        <a href="#" className=" text-dark list-group-item list-group-item-action">
                            <Link to={`user/${user.id}`} >
                               <h4 className='text-dark'>
                                 {user.firstName}  {user.lastName}
                               </h4>
                            </Link>
                        </a>

                    </li>
                    
                  })
                }
              </>                
              <>
              {
                
                results.communities.map((community,i)=>{
                  return  <li key={i} className='list-group-item'>
                        <a href="#" className=" text-dark list-group-item list-group-item-action">
                            <Link to={`user/${user.id}`} >
                               <h4 className='text-dark'>
                                 {community.communityName}
                               </h4>
                            </Link>
                        </a>

                    </li>
                    
                  })
              }
              </>  
              </>
          </ul>
        </div>:null}
      </form>
    </div>
  </div>
</nav>


    </StickyBox>
<Outlet/>

</>
    )
}

export default NavBar