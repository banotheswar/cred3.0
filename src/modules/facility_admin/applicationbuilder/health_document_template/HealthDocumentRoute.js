import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HealthdocumentList from "./HealthDocList"
import AddHeaithDoc from "./AddHeaithDoc"
const HealthDocumentRoute = () => {
  return (
   <Routes>
    <Route path='/' element={<HealthdocumentList/>}></Route>
    <Route path='/create'element={<AddHeaithDoc/>}></Route>
    <Route path='/create/:tempId'element={<AddHeaithDoc/>}></Route>
    <Route path='/update/:templateId'element={<AddHeaithDoc/>}></Route>
   
   
   </Routes>
  )
}

export default HealthDocumentRoute