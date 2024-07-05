import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../facility_admin/dashboard/Dashboard'
import MyApplication from '../../provider/myApplications/MyApplication'

const DashboardRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='applicationinprogress' element={<MyApplication/>}></Route>

    </Routes>
  )
}

export default DashboardRoute
