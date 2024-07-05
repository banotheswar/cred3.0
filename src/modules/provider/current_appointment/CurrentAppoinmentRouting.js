import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CaliforniaMedicalGroup from './CaliforniaMedicalGroup'
import IrvineHealthGroup from './IrvineHealthGroup'
import OrangeCountySurgical from './OrangeCountySurgical'

const CurrentAppoinmentRouting = () => {
  return (
    <Routes>
        <Route  path='californiamedicalgroup' element={<CaliforniaMedicalGroup/>}></Route>
        <Route  path='irvinehealthgroup' element={<IrvineHealthGroup/>}></Route>
        <Route  path='orangecountysurgical' element={<OrangeCountySurgical/>}></Route>
    </Routes>
  )
}

export default CurrentAppoinmentRouting
