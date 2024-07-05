import React from 'react'
import AccessLevel from './AccessLevel'
import UpdateUserAccessLevel from './UpdateUserAccessLevel'
import { Route, Routes } from 'react-router-dom'

const AccessLevelRoute = () => {
  return (
    <Routes>
        <Route path='/all'element={<AccessLevel/>}></Route>
        <Route path='/all/:userId'element={<UpdateUserAccessLevel/>}></Route>
  
</Routes>
  )
}

export default AccessLevelRoute