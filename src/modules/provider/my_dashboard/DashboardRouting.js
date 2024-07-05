import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
const DashboardRouting = () => {
  return (
    <Routes>
        <Route  path='/' element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default DashboardRouting