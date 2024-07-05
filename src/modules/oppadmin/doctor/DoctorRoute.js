import React from 'react'
import DoctorsList from '../../facility_admin/doctors/DoctorsList'
import { Route, Routes } from 'react-router-dom'
import DoctorDetails from '../../facility_admin/doctors/DoctorDetails'
import MyApplication from '../../provider/myApplications/MyApplication'

const DoctorRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<DoctorsList />} />
      <Route path='details/:providerId' element={<DoctorDetails />}></Route>
      <Route path='details/:providerId/applicationinprogress' element={<MyApplication />}></Route>
    </Routes>
  )
}

export default DoctorRoute
