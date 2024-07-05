

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ApplicationProcess from './ApplicationProcess'

const MyApplicationProcessRoute = () => {
  return (
    <Routes>
        <Route  path='/' element={<ApplicationProcess/>}></Route>
    </Routes>
  )
}

export default MyApplicationProcessRoute
