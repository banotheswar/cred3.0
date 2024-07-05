import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardRoute from './dashboard/DashboardRoute'
import DoctorRoute from './doctor/DoctorRoute'
import Account from '../facility_admin/account/Account'
import AlliedHealthRoute from './alliedhealth/AlliedHealthRoute'
import SettingsRoute from './settings/SettingsRoute'
import RoleMaster from './RoleMaster/RoleMaster'
import AccessLevel from '../facility_admin/accesslevel/AccessLevel'
import AccessLevelRoute from '../facility_admin/accesslevel/AccessLevelRoute'

const OppRouting = () => {
  return (
    <Routes>
        <Route path='dashboard/*'element={<DashboardRoute/>}></Route>
        <Route path='doctors/*'element={<DoctorRoute/>}></Route>
        <Route path='alliedhealth/*'element={<AlliedHealthRoute/>}></Route>
        <Route path='settings/*'element={<SettingsRoute/>}></Route>
        <Route path='myaccount/'element={<Account/>}></Route>
        <Route path='rolemaster/'element={<RoleMaster/>}></Route>
       
    </Routes>
  )
}

export default OppRouting
