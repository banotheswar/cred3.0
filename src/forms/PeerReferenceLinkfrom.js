import React, { useEffect, useState } from 'react'
import DynamicFormBuilder from './Certifications/DynamicFormBuilder'
import { getById, getList, save } from '../api_services/SharedServices'
import { urls } from '../api_services/url'
import { useParams } from 'react-router-dom'
import { SiAdobecreativecloud } from 'react-icons/si'

const PeerReferenceLinkfrom = () => {
    const {type,appId,formId,guid}=useParams()
    const [formList,setList]=useState({})
    const [update,setUpdate]=useState([])
    const getAllRef=async()=>{
        let  jsonObjects= {formId:formId,appointmentId:appId,type:type}
        let res=await getById(urls?.forms?.getPeerReferenceSentRequest,{jsonObjects})
        setList(res )
        console?.log(res,"check")
    }
    const submit=async(id,documentData)=>{
        
           let jsonObjects= {"id":0,"documentData":documentData,appointmentId:appId,formId:formId,type:type,guid:guid,formType:"DOP"}
          console?.log(jsonObjects,"jsonObjects")
        let res=await save(urls?.forms?.savePeerQuestinary,{jsonObjects})
        if(res?.data?.status){
            setUpdate(res)
        }
    }
   
    useEffect(()=>{formId&&getAllRef()},[formId,update])
  return (
    <div className='bg-white'style={{background:"#ffff"}}>
        <div lg={12} className="bgheader d-flex justify-content-center p-2 ">
            <div lg={12} className=" d-flex justify-content-center ">
              <SiAdobecreativecloud size={34} color="white" className="py-1" />
              <span className="text-white px-2 headerfont1">OutPatientPro</span>
            </div>
          </div>
          <div className="mt-2 bg-white py-2">
            <div className="d-flex justify-content-between">
              <div className="f24 medium col-md-7  px-5">
                {/* Questionary */}
              </div>
              <div className="f17 medium  col-md-3 mt-2">
                Reference Name: {formList?.userName}
              </div>
            </div>
          </div>
          <div className='px-4 bg-white'>
          <DynamicFormBuilder array={formList?.additionalData||[]} saveForm={submit} title={"Save Questionnaire"}/>
          </div>
        </div>
  )
}

export default PeerReferenceLinkfrom