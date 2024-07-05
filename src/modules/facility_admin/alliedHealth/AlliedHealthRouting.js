import React from 'react'
import AlliedHealthListing from './AlliedHealthListing'
import { Route, Routes } from 'react-router-dom'
import DoctorDetails from '../doctors/DoctorDetails'
import MyApplication from '../../provider/myApplications/MyApplication'

const AlliedHealthRouting = () => {
  return (
    <Routes>
    <Route path='/'element={<AlliedHealthListing/>}></Route>
    <Route path='details/:providerId/:facilityId/:appId'element={<DoctorDetails/>}></Route>
    <Route path='details/:providerId/:facilityId/:appId/applicationinprogress'element={<MyApplication/>}></Route>
   </Routes>
  )
}

export default AlliedHealthRouting
