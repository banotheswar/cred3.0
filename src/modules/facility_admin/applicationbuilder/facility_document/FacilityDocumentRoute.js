import React from 'react'
import AllFacilityDocumentsList from './AllFacilityDocumentsList'
import { Route, Routes } from 'react-router-dom'

const FacilityDocumentRoute = () => {
  return (
    <Routes>
    <Route path='/' element={<AllFacilityDocumentsList/>}></Route>
   
  
</Routes>
  )
}

export default FacilityDocumentRoute
