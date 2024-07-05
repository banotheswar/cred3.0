import React from 'react'
import MyApplication from './MyApplication'
import { Route, Routes } from 'react-router-dom'

const MyApplicationRoute = () => {
  return (
    <Routes>
        <Route  path='/' element={<MyApplication/>}></Route>
    </Routes>
  )
}

export default MyApplicationRoute
