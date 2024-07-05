import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseFormValidations } from '../../../../validations/UseFormValidation'

const AllApplicationList = () => {
    const navigate= useNavigate()
    const {headerlink}=UseFormValidations({})
    useEffect(()=>{
      headerlink([{name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder",active:true}])
      
    },[])
  return (
    <div >
    
      <div className="bg-white">  <div className="p-3 f30 medium mb-2 f20mobile">Application Builder</div></div>
  
<div className='bg-white p-4 row gap-2 increased-height'>
      <div className=" ">
        <div className="pointer  f23 temp_list_text" style={{ color: "#1e98d7 " }}
       onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/application_template")} 
          
          >
          Application Templates
        </div>
        <label className= 'f14 temp_name_text'>Build and save Applications for each group of Providers. Choose from our pre-built forms or customize your own.</label>
      </div>
      <div className="  ">
        <div className="pointer f23 temp_list_text" style={{ color: "#1e98d7" }}
    
    onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/facilitydocuments")}
         >
          Facility Documents
        </div>
        <label className= 'f14 temp_name_text'>Build and save your Facility Documents for each group of Providers. Choose from our pre-built forms or customize your own.</label>
      </div>
      <div className="  ">
        <div className="pointer f23 temp_list_text" style={{ color: "#1e98d7" }}
       
        onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/credentialing")}
         
         >
          Credential Preferences
        </div>
        <label className= 'f14 temp_name_text'>
        Select the credentials to include in the application packet for each type of Provider - Doctors and Allied Health Professionals.
        </label>
      </div>
      <div className="  ">
        <div className="pointer f23 pointer temp_list_text" style={{ color: "#1e98d7" }}
      onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/healthdocument")} 
        
        >
          Health Documents
        </div>
        <label className= 'f14 temp_name_text'>
        Setup your health documents. Choose from our pre-built forms or customize your own.
        </label>
      </div>
      <div className="  ">
        <div className="pointer f23 temp_list_text" style={{ color: "#1e98d7" }}
      
      onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/peerreferences")}
        >
          Peer References
        </div>
        <label className= 'f14 temp_name_text temp_name_text'>
        Build your peer reference templates. Choose from our pre-built forms or customize your own.
        </label>
      </div>
      <div className="  ">
        <div className="pointer f23 temp_list_text" style={{ color: "#1e98d7" }}
         onClick={()=> navigate(`/outpatientpro/facility/applicationBuilder/delineationofprivileges/all/`)}
        
        >
         Delineation Of Privileges
        </div>
        <label className= 'f14 temp_name_text'>
          Build your DOP Forms. Choose from our pre-built forms or customize your own.
        </label>
      </div>
    </div>
    </div>
  )
}

export default AllApplicationList