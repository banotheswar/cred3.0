import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllSettings from '../../facility_admin/settings/AllSettings'
import AllFacilityUsers from '../../facility_admin/settings/AllFacilityUsers'
import Config from '../../facility_admin/settings/Config'

const SettingsRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<AllSettings/>}></Route>
        <Route path='users' element={<AllFacilityUsers/>}></Route>
        <Route path='configuration' element={<Config/>}></Route>
    </Routes>
  )
}

export default SettingsRoute
