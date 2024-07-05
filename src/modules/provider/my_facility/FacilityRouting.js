import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CalifoniaCountySurgical from './CalifoniaCountySurgical'
import OrangeCountySurgical from './OrangeCountySurgical'
import AcmemedicalCenter from './AcmemedicalCenter'
import GhozlandSurgeryCenter from './ghozlandSurgeryCenter'
import IrvineHealthGroup from './irvineHealthGroup'
import AllFacilityList from './AllFacilityList'
import FacilityProfile from './FacilityProfile'
import MyApplication from '../myApplications/MyApplication'
import FormsView from '../../facility_admin/formsread/FormsView'
import DoctorDetails from '../../facility_admin/doctors/DoctorDetails'

const FacilityRouting = () => {
    return (
        <Routes>
            <Route  path='califoniacountysurgical' element={<CalifoniaCountySurgical/>}></Route>
            <Route  path='irvinehealthgroup' element={<IrvineHealthGroup/>}></Route>
            <Route  path='orangecountysurgical' element={<OrangeCountySurgical/>}></Route>
            <Route  path='acmemedicalcenter' element={<AcmemedicalCenter/>}></Route>
            <Route  path='ghozlandsurgerycenter' element={<GhozlandSurgeryCenter/>}></Route>
            <Route  path='allfacilitylist' element={<AllFacilityList/>}></Route>
            <Route  path='facilityprofile/:providerId' element={<FacilityProfile/>}></Route>
            <Route  path='facilityprofile/:providerId/:facilityId/:appId' element={<FacilityProfile/>}></Route>
            <Route  path='facilityprofile/:providerId' element={<DoctorDetails/>}></Route>
            <Route  path='facilityprofile/formsview' element={<FormsView/>}></Route>
            <Route  path='facilityprofile/:providerId/:facilityId/:appId/applicationinprogress' element={<MyApplication/>}></Route>
        </Routes>
      )
}

export default FacilityRouting
