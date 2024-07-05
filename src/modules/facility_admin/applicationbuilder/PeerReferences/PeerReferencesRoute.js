
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllPeerReferencesList from './AllPeerReferencesList'

const PeerReferencesRoute = () => {
  return (
    <Routes>
    <Route path='/' element={<AllPeerReferencesList/>}></Route>
   
  
</Routes>
  )
}

export default PeerReferencesRoute