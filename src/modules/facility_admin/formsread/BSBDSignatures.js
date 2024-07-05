

import React, { useEffect, useState } from 'react'
import { UseFormValidations } from '../../../validations/UseFormValidation';
import { save } from '../../../api_services/SharedServices';
import { urls } from '../../../api_services/url';
import { useParams } from 'react-router-dom';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import moment from 'moment';

const BSBDSignatures = ({formname,formType,MdData,Update}) => {
  const [unlockrequest,setunlockrequest] = useState("")
    const [update, setUpdate] = useState();
    const {providerId}=useParams()
    const submit = async () => {
        let jsonObjects = {
          appointmentId: formname?.appointmentId,
          userId: providerId,
          firstName: data?.boarddirectorname,
          lastName: "",
          email: data?.boarddirectorEmail,
          type: "BD",
          formType:formType,
          id:"0",
          userType:"board Director"
        };
        let res = await save(urls?.forms.saveDirectorsSig, { jsonObjects });
    
        if (res) {
          setUpdate(res);
        }
      };
      
  const { data, errors, handleChange, handleSubmit ,setValues} = UseFormValidations({
    submit: submit,
  });
 
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border-danger"
      : "form-control bg-white";
  };
  useEffect(()=>{
    setValues(MdData?.length==1?MdData&&MdData[0]:MdData&&MdData[1])
    
  },[MdData,update,Update])
  return (
    <div className='p-2 mt-2 vh-auto bg-white'>
      {(data?.userId==undefined||(data?.userId!=undefined&&unlockrequest==true))?
        <form onSubmit={handleSubmit}>
       <div className="">
         <div className="mt-4 px-3">
           <>
             <div className="f16 medium mt-4 "> Verify Online</div>
             <div className="col-md-4 mt-3">
               <label>
                 Medical Director Name <span className="text-danger">*</span>
               </label>
               <input
                 className={emailErrorColor("userName")}
                 placeholder="First and Last Name…"
                 name="userName"
                 value={data?.userName}
                 onChange={handleChange("userName")}
               />
             </div>
             <div className="col-md-4 mt-4">
               <label>
                 Email <span className="text-danger">*</span>
               </label>
               <input
                 className={emailErrorColor("email")}
                 placeholder="Medical Director Email…"
                 name="email"
                 value={data?.email}
                 onChange={handleChange("email")}
               />
               {errors && errors?.email && (
                                      <p className="text text-danger">{errors?.email}</p>
                                  )}
             </div>
  
             <p
               className="col-xl-5 col-lg-8 col-md-12 p-3 mt-4"
               style={{
                 background: "#EFEFEF 0% 0% no-repeat padding-box",
                 borderRadius: "4px",
                 opacity: "1",
               }}
             >
               Enter the name and email of your medical director. When he or
               she completes the signature, it will be automatically verified
               and logged here.
               <br />
               <span className="link-hover-line py-2 mt-2">
                 Don’t show this again
               </span>
             </p>
             {/* <div>
               <button
               type="submit"
                 className="button border rounded text-white p-2"
               >
                 Request Signature
               </button>
             </div> */}
                   <div>
                <button
                  type="submit"
                  disabled={formname?.isLogged == "Yes"}
                style={{ background: formname?.isLogged=="Yes"?"#649dff":"#00B948" }}
                  className="text-white p-2 text-white col-md-2 f16 medium border rounded  pointer"
                >
                  Request Signature
                </button>
              </div>
           </>
         </div>
       </div>
     </form>
:
     <div className="px-4">
     <div className="py-2 f18 medium">Status : {data?.isApproved==""?"Pending":"Verifed"} {data?.isApproved=="Yes"&&<span><IoIosCheckmarkCircle
                                      color={"#00B948"}
                                      // {childformname == sub?.credCategory? "#0073E6" : "#00B948"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    /></span>}</div>
     <div className="mt-4 f16 medium">The Medical Director’s signature as been {data?.isApproved==""?"Pending":"Verifed"}</div>
     
     <div className='row border-top p-2 mt-3'>
                <div className='col-md-3 px-2 label'>Name</div>
                <div className='col-md-8 '> <label>{data?.userName}</label></div>

            </div>
            <div className='row border-top p-2 '>
                <div className='col-md-3 px-2 label'>Email</div>
                <div className='col-md-8 '> <label>{data?.email}</label></div>

            </div>
            <div className='row border-top border-bottom p-2 '>
                <div className='col-md-3 px-2 label'>Signed On</div>
                <div className='col-md-8 '> <label>{data?.createdDate?moment(data?.createdDate)?.format("MM/DD/YYYY"):"-"}</label></div>

            </div>
            <div className='col-md-2 mt-2'>
                    <button
                      type="button"
                      className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                      style={{ background: "#D4352F" }}
                      onClick={() => setunlockrequest(true)}
                    >
                      Unlock & Edit
                    </button>
                  </div>
     </div>
     }  
    </div>
  )
}

export default BSBDSignatures