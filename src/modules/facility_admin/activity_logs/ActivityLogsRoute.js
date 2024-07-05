import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ActivityLogList from './ActivityLogList'
import Activitydetail from './Activitydetail'

const ActivityLogsRoute = () => {
  return (
    <Routes>
        <Route path={"/"} element={<ActivityLogList/>}></Route>
        <Route path={"activitydetail"} element={<Activitydetail/>}></Route>
        
    </Routes>
  )
}

export default ActivityLogsRoute