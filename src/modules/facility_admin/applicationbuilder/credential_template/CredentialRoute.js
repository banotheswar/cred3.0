import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CredentialingTemlateList from './CredentialingTemlateList'
import CreateCredTemplate from './CreateCredTemplate'

const CredentialRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<CredentialingTemlateList/>}></Route>
        <Route path='/create' element={<CreateCredTemplate/>}></Route>
        <Route path='/create/:tempId'element={<CreateCredTemplate/>}></Route>
        <Route path='/update/:templateId'element={<CreateCredTemplate/>}></Route>
    </Routes>
  )
}

export default CredentialRoute