import React from 'react'
import './signup.css'
import { TextField,Container } from '@mui/material'
const Signup = () => {
  return (
<>
<Container fixed >
  <form >
<TextField id='firstName' variant='outlined' label="first name" />
<TextField id='lastName' variant='outlined' label="last name" />
<TextField id='middleName'  variant='outlined' label="middle name (optional)" />
<TextField id='age' type='number' min='0' max='130' variant='outlined' label="age" />
  <TextField type='Date' />
  </form>
  </Container>
</>
  )
}

export default Signup