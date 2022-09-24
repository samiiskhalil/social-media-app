import React from 'react'
import {Signup,Login,NavBar,Posts} from './components'
import UsersRoutes from './RoutesLayout/UsersRoutes.jsx'
import './app.css'
import {useNavigate,useLocation,Routes,Route} from 'react-router-dom'
const App = () => {
  let location=useLocation()
  return (
<>

<Routes>
  <Route path='/' element={<NavBar/>} >
    <Route index element={<Posts/>} />
    <Route path='users/*' element={<UsersRoutes/>} />
    
</Route>
<Route path='/signup' element={<Signup />}/>
<Route path='/login' element={<Login />}/>

</Routes>
</>
    )
}

export default App