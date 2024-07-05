import React, { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SharedServices } from '../../api_services/SharedServices'
const AllDashboard =lazy(()=>import("./dashboard/DelegateDashboardRoute"))
const AllProviders =lazy(()=>import("./providers/DelegateProvidersRouting"))
const AllDelegateFacilities =lazy(()=>import("./facility/DelegateFacilityRout"))
const AllDelegateNeedAttention =lazy(()=>import("./needattention/DelegateNeedAttentionRout"))
const AllDelegateNotifications =lazy(()=>import("./notifications/DelegateNotificationsRoute"))
const AllDelegateAccount =lazy(()=>import("./myaccount/DelegateAccountRoute"))


const DelegateRouting = () => {
    const { state } = SharedServices({});
    console.log(state,"state123")
    // useEffect(()=>{
    //   window.scrollTo(500, 0)
    // },[])
  return (
   <div 
  //  className={state=="true" ? "page_panel p-3" : "page_close p-3 "}
   >
    <Routes>
    <Route path='alldashboard/*'element={<AllDashboard/>}></Route>
    <Route path='allproviders/*'element={<AllProviders/>}></Route>
    <Route path='alldelegatefacility/*' element={<AllDelegateFacilities/>}></Route>
    <Route path='alldelegateneedattention/*' element={<AllDelegateNeedAttention/>}></Route>
    <Route path='alldelegatenotifications/*' element={<AllDelegateNotifications/>}></Route>
    <Route path='alldelegatemyaccount/*' element={<AllDelegateAccount/>}></Route>

   </Routes>
   </div>
  )
}

export default DelegateRouting