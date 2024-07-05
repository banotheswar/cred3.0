

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNotifications from './AllNotifications'

const DelegateNotificationsRoute = () => {
  return (
    <Routes>
    <Route path='/'element={<AllNotifications/>}></Route>
   </Routes>
  )
}

export default DelegateNotificationsRoute