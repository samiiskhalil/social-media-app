import React from 'react'
import {UserPage} from '../components'
import { Route,Routes } from 'react-router'
const UsersRoutes = () => {
  return (
<>
<Routes> 
  <Route path=':id' element={<UserPage/>} >

  </Route>
</Routes>
</>
    )
}

export default UsersRoutes