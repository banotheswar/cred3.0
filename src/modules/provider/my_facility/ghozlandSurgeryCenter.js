import React from 'react'
import { SharedServices } from '../../../api_services/SharedServices'

const GhozlandSurgeryCenter = () => {
    const {state}=SharedServices({})

    return (
      <div  className={state?'page_panel   py-2':"page_close "}>
        GhozlandSurgeryCenter
      </div>
    )
}

export default GhozlandSurgeryCenter
