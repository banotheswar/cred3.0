import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import MyApplication from '../../provider/myApplications/MyApplication'
const Dashboardrouting = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='applicationinprogress' element={<MyApplication/>}></Route>
    </Routes>
  )
}

export default Dashboardrouting