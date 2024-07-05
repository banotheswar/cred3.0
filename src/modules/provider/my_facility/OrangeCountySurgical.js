import React from 'react'
import { SharedServices } from '../../../api_services/SharedServices'

const OrangeCountySurgical = () => {
  const {state}=SharedServices({})

    return (
      <div  className={state?'page_panel   py-2':"page_close "}>
        OrangeCountySurgical
      </div>
    )
}

export default OrangeCountySurgical
