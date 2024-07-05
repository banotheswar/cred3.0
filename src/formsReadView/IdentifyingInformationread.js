import React, { useEffect } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import { usphoneFormat } from "../api_services/SharedServices";
import moment from "moment";


const IdentifyingInformationread = ({getFormdata,uploadeddata})=>{
  let keys=["email","phone"]
console?.log([getFormdata],"getFormdata111",getFormdata&&keys?.map((v)=>{
  return [getFormdata]?.map((val)=>{ return val[v]})
}))


  const {data,setValues} = UseFormValidations({});
    let fields=[{label:"Email",value:data?.email},{label:"Phone",value:usphoneFormat(data?.phone)},{label:"Mobile",value:usphoneFormat(data?.mobile)},
    {label:"Pager",value:usphoneFormat(data?.pager)},{label:"Address",value:data?.address},{label:"Driver's License State",value:data?.licenseState},
    {label:"Driver's License #",value:data?.licenseNumber},{label:"Social Security #",value:data?.ssn},{label:"Birth Date ",value:moment(data?.birthDate)?.format("MM/DD/YYYY")},
    {label:"Birth City ",value:data?.birthCity},{label:"Birth State ",value:data?.birthState},{label:"Are You U.S.Citizen?",value:data?.usCitizen&&data?.usCitizen=="usCitizen_Yes"&&"Yes"},
    {label:"Languages Spoken",value:data?.languageSpoken}];




    useEffect(() => {
   setValues(getFormdata);
    }, [getFormdata]);

console?.log(getFormdata,"getFormdata12345")
    return(
      <div className='row bg-white mt-2 p-4' >
      {fields?.map((v)=>{
        return(
            <>
            <div className='row border-top-bottom py-2'>
                {v?.heading&&<h6 className='m-0 p-0'>{v?.heading}</h6>}
                <div className='col-md-3 px-2 label'>{v?.label}</div>
                <div className='col-md-8 '> <label>{v?.value}</label></div>

            </div>
           
            </>
        )
    })}
    {sessionStorage?.getItem("roleId")==2?
    <div className='row py-2'>
    <div className='col-md-2'>
    <button
  type="button"
  className="bg-success text-white col-md-12  border rounded py-2 pointer"
>
  Save & Log
</button>
    </div>
<div
  className="bg-danger text-white text-center col-md-2 border rounded py-2 col-md-auto pointer"
  // onClick={()=>setRequestModal(true)}
>
  Request Edits
</div>
    </div>:
    <div className='row py-2'>
    <div className='col-md-2'>
    <button
  type="button"
  className="bg-danger text-white col-md-12  border rounded py-2 pointer"
>
  Unlock & Edit
</button>
    </div> </div>}
    </div>
    )
}
export default IdentifyingInformationread