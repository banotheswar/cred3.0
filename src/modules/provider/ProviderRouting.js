import React, { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SharedServices } from '../../api_services/SharedServices.js'
const MyAccount=lazy(()=>import("../provider/account/ProviderMyAccount.js"))

const DashboardRouting=lazy(()=>import("./my_dashboard/DashboardRouting"))
const CurrentAppoinmentRouting=lazy(()=>import("./current_appointment/CurrentAppoinmentRouting.js"))
const FacilityRouting=lazy(()=>import("./my_facility/FacilityRouting.js"))
const NeedAttentionsRoute=lazy(()=>import("./NeedAttentions/NeedAttentionsRoute.js"))
const MyApplicationRoute=lazy(()=>import("./myApplications/MyApplicationRoute.js"))
const ApplicationProcessRoute=lazy(()=>import("./myapplicationprocess/MyApplicationProcessRoute.js"))

const ProviderRouting = () => {
  const { state } = SharedServices({});
    // useEffect(()=>{
    //   window.scrollTo(500, 0)
    // },[])
  return (
    <div 
    // className={state=="true" ? "page_panel p-3" : "page_close p-3 "}
    >
    <Routes>
        <Route path='dashboard/*'element={<DashboardRouting/>}></Route>
        <Route path='applicationinprogress/*'element={<MyApplicationRoute/>}></Route>
        <Route path='currentappoinment/*'element={<CurrentAppoinmentRouting/>}></Route>
        <Route path='facility/*'element={<FacilityRouting/>}></Route>
        <Route path='needattentions/*'element={<NeedAttentionsRoute/>}></Route>
        <Route path='applicationinprogress/*'element={<MyApplicationRoute/>}></Route>
        <Route path='myaccountprovider/*'element={<MyAccount/>}></Route>
        <Route path='applicationprocess/*'element={<ApplicationProcessRoute/>}></Route>
    </Routes>
    </div>
  )
}

export default ProviderRouting