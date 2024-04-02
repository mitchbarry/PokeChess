import React from 'react'
import { Container } from 'react-bootstrap'
const LoginHeader = ({message}) => {
  return (
    <div className='text-danger'>
      <h5>{message}</h5>
    </div>
    
  )
}

export default LoginHeader