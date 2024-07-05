import React, { lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SharedServices } from '../../api_services/SharedServices'
import AccessLevelRoute from './accesslevel/AccessLevelRoute.js'
const Dashboardrouting=lazy(() =>import("./dashboard/Dashboardrouting"))
const Doctors=lazy(() =>import("./doctors/DoctorRoute"))
const Accounts=lazy(()=>import("./account/Account"))
const ActivityLogs=lazy(()=>import("./activity_logs/ActivityLogsRoute"))
const Settings=lazy(()=>import("./settings/SettingsRoute"))
const ApplicationBuilder=lazy(()=>import("./applicationbuilder/ApplicationBuilderRoute"))
const Notifications =lazy(()=>import("./notifications/FacilityNotificationRoute"))
const NewAppointment =lazy(()=>import("./appointment/AppointmentRoute"))
const AlliedHealthRouting =lazy(()=>import("./alliedHealth/AlliedHealthRouting.js"))
const FormsView =lazy(()=>import("./formsread/FormsView.js"))
const MyAccount =lazy(()=>import("./account/Account.js"))
const Master =lazy(()=>import("../masters/Master.js"))


const FacilityRouting = () => {
  const { pathname } = useLocation();

    const { state } = SharedServices({});
    console.log(state,"state123")
    useEffect(()=>{
      window.scrollTo(0, 0)
    },[pathname])
 
  return (
   <div 
  //  className={state ? "page_panel p-3" : "page_close p-3 "}
   >
    <Routes>
    <Route path='alliedhealth/*'element={<AlliedHealthRouting/>}></Route>
    <Route path='dashboard/*'element={<Dashboardrouting/>}></Route>
    <Route path='doctors/*'element={<Doctors/>}></Route>
    <Route path='account/details'element={<Accounts/>}></Route>
    <Route path='activitylogs/*'element={<ActivityLogs/>}></Route>
    <Route path='settings/*'element={<Settings/>}></Route>
    <Route path='applicationBuilder/*'element={<ApplicationBuilder/>}></Route>
    <Route path='facilitynotifications/*'element={<Notifications/>}></Route>
    <Route path='appointment/*'element={<NewAppointment/>}></Route>
    <Route path='formsview/*'element={<FormsView/>}></Route>
    <Route path='myaccount/*'element={<MyAccount/>}></Route>
    <Route path='masters/'element={<Master/>}></Route>
    {/* <Route path='accesslevel/*'element={<AccessLevelRoute/>}></Route> */}
   </Routes>
   </div>
  )
}

export default FacilityRouting