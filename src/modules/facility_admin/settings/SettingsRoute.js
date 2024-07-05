import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllSettings from './AllSettings'
import AllFacilityUsers from './AllFacilityUsers'
import AllFacilityLocation from './AllFacilityLocation'
import AllExpirationNotifications from './AllExpirationNotifications'
import AllApiConnections from './AllApiConnections'
import Config from './Config'
import FacilityManagement from './FacilityManagement'

const SettingsRoute = () => {
  return (
    <Routes>
    <Route path='/'element={<AllSettings/>}></Route>
    <Route path='users'element={<AllFacilityUsers/>}></Route>
    <Route path='location'element={<AllFacilityLocation/>}></Route>
    <Route path='expiration_notification'element={<AllExpirationNotifications/>}></Route>
    <Route path='api_connections'element={<AllApiConnections/>}></Route>
    <Route path='configuration'element={<Config/>}></Route>
    <Route path='facility_management'element={<FacilityManagement/>}></Route>
  
  
   </Routes>
  )
}

export default SettingsRoute