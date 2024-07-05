


import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllApointmentTypes from './AllApointmentTypes'
import NewAppointment from './NewAppointment'
import DoctorSearching from './DoctorSearching'
import ReAppointment from './ReAppointment'
import OnBoardAppointment from './OnBoardAppointment'
import AppointmentSentFinalScreen from './AppointmentSentFinalScreen'
import MyApplication from '../../provider/myApplications/MyApplication'


const AppointmentRoute = () => {
  
  return (
    <Routes>
    <Route path='/'element={<AllApointmentTypes/>}></Route>
    <Route path='/:newappointment/:provider'element={<NewAppointment/>}></Route>
    <Route path='/:newappointment/:provider/:providerId'element={<NewAppointment/>}></Route>
    {/* <Route path='/:newappointment/:provider/:providerId/:appId'element={<NewAppointment/>}></Route> */}
    <Route path='searchdoctor'element={<DoctorSearching/>}></Route>
    <Route path='searchdoctor/:providerType'element={<DoctorSearching/>}></Route>
    {/* <Route path='reappointment'element={<ReAppointment/>}></Route> */}
    <Route path='/:onboardappointment/:provider'element={<NewAppointment/>}></Route>
    <Route path='/:onboardappointment/:provider/:providerId'element={<NewAppointment/>}></Route>
    <Route path='/:reappointment/:provider'element={<NewAppointment/>}></Route>
    <Route path='/:reappointment/:provider/:providerId'element={<NewAppointment/>}></Route>
    <Route path='appointmentsendprovider/:provider/:providerId/:facilityId/:appId'element={<AppointmentSentFinalScreen/>}></Route>
    <Route  path='onboardappointment/applicationinprogress/:providerId/:facilityId/:appId' element={<MyApplication/>}></Route>
    <Route  path='reappointment/newappointment' element={<NewAppointment/>}></Route>

    
    
   </Routes>
  )
}

export default AppointmentRoute