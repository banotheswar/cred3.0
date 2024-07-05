
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DelegateAccount from './DelegateAccount'

const DelegateAccountRoute = () => {
  return (
    <Routes>
    <Route path='/'element={<DelegateAccount/>}></Route>
   </Routes>
  )
}

export default DelegateAccountRoute