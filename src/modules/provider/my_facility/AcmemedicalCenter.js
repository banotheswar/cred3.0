import React from 'react'
import { SharedServices } from '../../../api_services/SharedServices'

const AcmemedicalCenter = () => {
    const {state}=SharedServices({})

    return (
      <div  className={state?'page_panel   py-2':"page_close "}>
        AcmemedicalCenter
      </div>
    )
}

export default AcmemedicalCenter
