import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AddDelineation from './AddDelineation'
import DelineationPrivilegeList from './DelineationPrivilegeList'

const DelineationRoute = () => {
  return (
    <Routes>
    <Route path='/all' element={<DelineationPrivilegeList/>}></Route>
    <Route path='/create'element={<AddDelineation/>}></Route>
   <Route path='/update/:templateId'element={<AddDelineation/>}></Route>
   
   
   </Routes>
  )
}

export default DelineationRoute