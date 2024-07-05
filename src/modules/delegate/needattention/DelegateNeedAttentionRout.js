
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNeedAttentionDelegate from './AllNeedAttentionDelegate'

const DelegateNeedAttentionRout = () => {
  return (
    <Routes>
    <Route path='/'element={<AllNeedAttentionDelegate/>}></Route>
   </Routes>
  )
}

export default DelegateNeedAttentionRout