import React from 'react'
import store from 'store';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import './NavBar.css'
import {useLocation,NavLink,Outlet, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Input } from '@mui/material';
const NavBar = () => {
  const [results,setResults]=useState()
  const navigate=useNavigate()
  const [searchFlage,setSearchFlage]=useState(false)
  const [collapse,setCollapse]=useState(false)
  let location=useLocation()

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
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" id='searcgQuery' aria-label="Search"/>

        <button className="btn btn-outline-success" type="submit">Search</button>
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