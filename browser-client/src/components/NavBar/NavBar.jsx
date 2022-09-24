import React from 'react'
import {useLocation,NavLink,Outlet} from 'react-router-dom'
const NavBar = () => {
  let location=useLocation()
  console.log(location.pathname)
  return (<>



<nav className='nav-bar' >
<ul>
  <li>NavBar</li>
</ul>

</nav>
<Outlet/>





</>
    )
}

export default NavBar