import React from 'react'
import {User,Users,Login,Signup,Home,UsersRoute} from './pages/index.js'
import { NavBar } from './components/index.js'
import './app.css'
import {useNavigate,useLocation,Routes,Route} from 'react-router-dom'
const App = () => {
  let location=useLocation()
  return (
<>

<Routes  >
  <Route path='/' element={<NavBar/>} >
    <Route index element={<Home/>} />
    <Route path='users/*' element={<UsersRoute/>} />
    
</Route>
<Route path='/signup' element={<Signup />}/>
<Route path='/login' element={<Login />}/>

</Routes>
</>
    )
}

export default App