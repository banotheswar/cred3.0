
import React from 'react'
import { Routes,Route} from 'react-router-dom'
import DelegateDashboard from './DelegateDashboard'
const DelegateDashboardRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<DelegateDashboard/>}></Route>
    </Routes>
  )
}

export default DelegateDashboardRoute