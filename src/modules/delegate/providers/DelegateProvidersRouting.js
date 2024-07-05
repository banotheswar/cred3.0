
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllProviders from './AllProviders'

const DelegateProvidersRouting = () => {
  return (
    <Routes>
    <Route path='/'element={<AllProviders/>}></Route>
   </Routes>
  )
}

export default DelegateProvidersRouting