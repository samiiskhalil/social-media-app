import React from 'react'
import { useState } from 'react'
import './NavBar.css'
import {useLocation,NavLink,Outlet} from 'react-router-dom'
const NavBar = () => {
  const [collapse,setCollapse]=useState(false)
  let location=useLocation()
  console.log(location.pathname)
  return (<>
<div className="container">

<nav className='navbar navbar-expand-lg bg-light '>
  <div className="container-fluid">
    <a href="/" className="navbar-brand">

<svg className='app-icon bi bi-stars"' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"  viewBox="0 0 16 16">
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
</svg>
    </a>
  <button onClickCapture={()=>{setCollapse(pre=>!pre)}} className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navCollapse' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
  <span
   className={`navbar-toggler-icon ${collapse&&'icon-active'}`}
  >
  <svg className='app-icon bi bi-list" ' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
  </span>

  </button>
  <div className="collapse navbar-collapse" id="navCollapse">

  </div>
  </div>

</nav>

<Outlet/>




</div>

</>
    )
}

export default NavBar