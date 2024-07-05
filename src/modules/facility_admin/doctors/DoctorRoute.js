import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DoctorsList from './DoctorsList'
import DoctorDetails from './DoctorDetails'
import MyApplication from '../../provider/myApplications/MyApplication'
const DoctorRoute = () => {
  return (
    <Routes>
    <Route path='/'element={<DoctorsList/>}></Route>
    <Route path='details/:providerId/:facilityId/:appId'element={<DoctorDetails/>}></Route>
    <Route path='details/:providerId/:facilityId/:appId/applicationinprogress'element={<MyApplication/>}></Route>
   </Routes>
  )
}

export default DoctorRoute  