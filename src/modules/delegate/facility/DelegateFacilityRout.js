
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllFacilityList from './AllFacilityList'

const DelegateFacilityRout = () => {
  return (
    <Routes>
    <Route path='/'element={<AllFacilityList/>}></Route>
   </Routes>
  )
}

export default DelegateFacilityRout