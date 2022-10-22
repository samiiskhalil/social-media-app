import React from 'react'
import {Routes,Route} from 'react-router-dom'
import User from './User/User'
const UsersRoute = () => {
  return (
        <Routes>
            <Route path='/:id' element={<User/>} >
            </Route>
        </Routes>
    )
}

export default UsersRoute