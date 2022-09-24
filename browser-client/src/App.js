import React from 'react'
import { useEffect} from 'react'
import {NavBar} from './components'
import './app.css'
import {useNavigate,Routes,Route} from 'react-router-dom'
const App = () => {
const navigate=useNavigate()

  return (
<>
<Routes>
  <Route path='/' />
  <Route path='/user/signup' />

</Routes>
</>
    )
}

export default App