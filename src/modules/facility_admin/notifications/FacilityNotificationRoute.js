

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNotifications from './AllNotifications'


const FacilityNotificationRoute = () => {
  return (
    <Routes>
    <Route path='/'element={<AllNotifications/>}></Route>
  
  
   </Routes>
  )
}

export default FacilityNotificationRoute