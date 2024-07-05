import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AlliedHealthListing from '../../facility_admin/alliedHealth/AlliedHealthListing'

const AlliedHealthRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<AlliedHealthListing/>}></Route>
        <Route path='users/' element={<AlliedHealthListing/>}></Route>
    </Routes>
  )
}

export default AlliedHealthRoute
