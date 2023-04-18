import React from 'react'

import {Comments,EditImg,Users,Search,Logout,Follow,User,Login,Signup,Home} from './pages/index.js'
import {  NavBar } from './components/index.js'
import {useNavigate,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
<>

<Routes  >
  <Route path='/' element={<NavBar/>} >
    <Route index element={<Home/>} />
    <Route path='/users/' element={<Users/>} />
    <Route path='user/follow/:type' element={<Follow/>} />
    <Route path='user/:id' element={<User/>} />
    <Route path='/search' element={<Search/>} />
    <Route path='comments/:postId' element={<Comments/>} />
</Route>
<Route path='/logout' element={<Logout/>}/>

<Route path='/signup' element={<Signup />}/>
<Route path='/login' element={<Login />}/>

<Route path='/edit-image/:imageSrc' element={<EditImg/>}/>
</Routes>
</>
    )
}

export default App