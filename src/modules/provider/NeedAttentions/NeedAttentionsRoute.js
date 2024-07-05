
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNeedAttentionsList from './AllNeedAttentionsList'

const NeedAttentionsRoute = () => {
    return (
        <Routes>
            <Route  path='/allneedattention' element={<AllNeedAttentionsList/>}></Route>
        </Routes>
      )
}

export default NeedAttentionsRoute
