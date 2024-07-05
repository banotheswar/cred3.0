import React, { useEffect, useState,useRef } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import { useParams } from "react-router-dom";
import { getById, getList, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";

import DynamicFormBuilder from "./Certifications/DynamicFormBuilder";
import { IoIosCheckmarkCircle } from "react-icons/io";
const DelineationOfPrivileges = ({ getAllData, formname ,AppointmentList,setUpdateAppointmentList,DoctorFormsView}) => {
  

  const{providerId}=useParams()
  const [update,setUpdate]=useState()
  const [delineationData,setDelineationData]=useState()
 const [privilegeList,setPrivilegeList]=useState([])
  const [detailsState, setDetailsState] = useState();
  const submit = async(id,formData) => {
    let formdata = new FormData()
   

    let array = [{
      "id":delineationData?.id?delineationData?.id:0,
       "facilityUserId": providerId,
      "appointmentId":formname?.appointmentId,
      "templateType": "Delineation of Privileges",
      "formId":detailsState?.formId,
      "type": "Delineation of Privileges",
      "isSubmitted":"Yes",
      // "percentage":(delineationData?.isSubmitted!="Yes")?(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100)?.toFixed(2):(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length)/(AppointmentList?.length - 1)) *100)?.toFixed(2),
      "documentData":detailsState?.defaultForm=="Yes"? data:formData
    }]

    formdata.append("JsonString", JSON.stringify(array));
    let res = await save(urls?.forms?.savehealthdoc,formdata,setUpdate)
   
    setUpdate(res)
    setUpdateAppointmentList(res)
  };

  const {
    data,
    errors,
    handleChange,
    handleCheckbox,
    setValues,
    handleSubmit,
  } = UseFormValidations({

    submit: submit,
  });
console?.log(data,"7878")

const getPrivilageList = async () => {
  let jsonObjects = {
    type: "DOP",
    appointmentId: formname?.appointmentId,
  };
  let res = await getList(urls?.forms?.getHDList, { jsonObjects });
setPrivilegeList(res||[]);
  
  setDetailsState(res[0])
  
 
  

};
const getDelineationData =async(appointmentId,formId)=>{
  let jsonObjects = {
    appointmentId:appointmentId,
    formId:formId,
    type: "DOP",
  };
  let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
  setDelineationData(res)
 
}
useEffect(()=>{
  
  
  setValues(delineationData?.documentData)
  // getAllData(delineationData)
 
},[delineationData])
useEffect(()=>{
  if(sessionStorage?.getItem("roleId")<=4){
    getAllData(delineationData)
  }
  
 
},[delineationData],sessionStorage?.getItem("roleId"))

useEffect(()=>{
  if(formname?.appointmentId){
   
    getPrivilageList(formname?.appointmentId)
  }
  
 
},[providerId,formname?.appointmentId,update])
useEffect(()=>{
  if(detailsState?.formId){
    getDelineationData(formname?.appointmentId,detailsState?.formId)
  }
},[detailsState?.formId,update])

const settingDetailstate = (name) => {
  setDetailsState(name);
};

  const checkedFn = (key, value) => {
    console?.log(data?.[key],"check",data,key)
    return data?.[key] && data?.[key] == value ? true : false;
  };
  
const array1=[{name:"Anesthesiologist only: Direct supervision of anesthesia services provided by qualified Licensed Providers or Allied Health Providers (i.e. CRNA’s, AA’s)",type:"anesthesiologist"},
{name:"ANESTHESIA PROCEDURE",font:"bold"},
{name:"Topical Agents",type:"topical",field:"topicalAgents"},
{name:"Peribulbar injection",type:"peribulbar",field:"peribulbarInjection"},
{name:"Retrobulbar injection",type:"retrobulbar",field:"retrobulbarInjection"},
{name:"Intravenous sedation",type:"intravenous",field:"intravenousSedation"},
{name:"Moderate sedation /analgesia (conscious sedation) including the administration of Propofol",type:"moderateSedation",field:"moderateInAnalgesia"},
{name:"Deep sedation/analgesia including the administration of Propofol",type:"deepSedation",field:"deepsedationAnalgesia"},
{name:"General Anesthesia Administration",type:"generalanesthesia",field:"generalAnesthesia"},
{name:"Regional blocks/Nerve blocks/treatments",type:"RegionalblocksNerve",field:"RegionalBlocksNerve"},
{name:"Ankle block",type:"ankle",field:"ankleBlock"},
{name:"Axillary Nerve Block",type:"axillary",field:"axillaryNerve"},
{name:"Bier Block",type:"bier",field:"bierBlock"},
{name:"Femoral Nerve Block",type:"femoral",field:"femoralNerve"},
{name:"Fornical",type:"fornical",field:"fornical1"},
{name:"Intercostal",type:"intercostal",field:"intercostal1"},
{name:"Interscalene Nerve Block",type:"interscalene",field:"interscaleneNerve"},
{name:"Local infiltration",type:"localinfiltration",field:"localInfiltration"},
{name:"Lower extremity",type:"lowerextremity",field:"lowerExtremity"},
{name:"Peripheral",type:"peripheral",field:"peripheral1"},
{name:"Spinal/Epidural",type:"spinal",field:"epidural"},
{name:"Steroid injection",type:"steroidinjection",field:"steroidInjection"},
{name:"Supraclavicular / Infraclavicular Block",type:"supraclavicular",field:"Supraclavicular1"},
{name:"Upper extremity",type:"upperextremity",field:"upperExtremity"},
{name:"OTHER ANESTHESIA",font:"bold"},
{name:"Pediatric Anesthesia care",type:"pediatricanesthesia",field:"pediatricAnesthesia"},
{name:"Pre-anesthesia assessment",type:"preanesthesia",field:"preAnesthesia"},
{name:"Request laboratory/diagnostic studies",type:"requestlaboratory",field:"requestLaboratory"},
{name:"Review of laboratory/diagnostic studies",type:"reviewoflaboratory",field:"reviewofLaboratory"},
{name:"Administer pre-anesthesia medications",type:"administerpreanesthesia",field:"administerPreanesthesia"},
{name:"Administer adjuvant drugs",type:"administeradjuvant",field:"administerAdjuvant"},
{name:"Post-anesthesia care/release procedures",type:"postanesthesia",field:"postAnesthesia"},
{name:"Medication management",type:"medicationmanagement",field:"medicationManagement"},
{name:"ANESTHESIA MANAGEMENT",font:"bold"},
{name:"Accessory drugs for homeostasis",type:"accessorydrugs",field:"accessoryDrugs"},
{name:"Mechanical ventilation/oxygen therapy",type:"mechanicalventilation",field:"mechanicalVentilation"},
{name:"Fluids, electrolytes, acid/base",type:"fluids",field:"fluids1"},
{name:"Insertion of peripheral intravenous catheter",type:"insertionofperipheral",field:"insertionofPeripheral"},
{name:"Management of patient pain: Acute",type:"managementofpatient",field:"managementofPatient"},
{name:"Chronic",type:"chronic",field:"chronic"},
{name:"MISCELLANEOUS PROCEDURES",font:"bold"},
{name:"Use of C-arm for verification/guidance/assistance with procedures",type:"useofcarm",field:"useofCarm"},
{name:"Use of Ultrasound for verification/guidance/assistance with procedures",type:"useofultrasound",field:"useofUltrasound"},
{name:"Other",type:"other1",field:"other11"},
{name:"Other",type:"other2",field:"other22"},
{name:"Other",type:"other3",field:"other33"},


]


  return (
    <>
  
    <div className="row bg-white p-2 mt-2">
        <div className="bg-white  d-flex  px-2 gap-1 ">
          {privilegeList?.map((e, i) => (
            <div
              className={e?.formName==detailsState?.formName 
                  ? "  border pointer  active-bar  text-white  p-2"
                  : "  border pointer  not-active  p-2 "
              }
              onClick={() => {""
                settingDetailstate({formName:e?.formName,defaultForm:e?.defaultForm,additionalData:e?.additionalData,formId:e?.formId});
              }}
              key={i}
            >
              {e?.formName}{e?.isSubmitted=="Yes"&&<IoIosCheckmarkCircle
                                 className='mx-2'
                                    color={e?.formName==detailsState?.formName?"#ffff":"#7E7E7E"}
                                    size={16}
                                    style={{ fontSize: "16px" }}
                                  />}
            </div>
          ))}


        </div>

      </div>
   
     
    <div className="row p-3  bg-white mt-2">
    {delineationData?.defaultForm=="Yes"?
     <form onSubmit={handleSubmit}>
      <div>
        <div
          className="row border text-white py-3 p-2"
          style={{ background: "#8B8B8B 0% 0% no-repeat padding-box" }}
        >
          <div className="col-md-5 f15 ">Individual Privilege</div>
          <div className="col-md-2 f15 ">Requested</div>
          <div className="col-md-5 f15 border-primary">Notes</div>
        </div>
        {array1&&array1?.map((v,i)=>{return(<>


          <div className="row border d-flex align-items-center "style={{ background:i%2==0&& "#F5F7F8" }}>
          <div className={v?.font?"col-md-5 f16 medium py-3":i==0?"col-md-5 f14 py-2":"col-md-5 f14 "}>
           {v?.name}
          </div>

          <div className="col-md-2">
          {v?.type&&<input
              type={"checkbox"}
              onChange={handleCheckbox(v?.type)}
              name={v?.type}
              checked={checkedFn(v?.type, "yes")}
              value={"yes"}
              className="me-1"
            />}
          </div>
          <div className="col-md-5 f14  mb-2">
          {v?.field&&<input
                className="form-control bg-white "
                value={data?.[v?.field]}
                onChange={handleChange(v?.field)}
                placeholder="Notes..."
                name={v?.field}
              ></input>}
          </div>
        </div>
        </>)})}

        
      </div>
      <hr className="mt-4" />

  {sessionStorage.getItem("roleId") != 4 &&   <div>
        <button type="submit" className="button border rounded text-white p-2">
          Save & Continue
        </button>
      </div>}
      </form>:<>
    <DynamicFormBuilder array={delineationData?.documentData} saveForm={submit} DoctorFormsView={DoctorFormsView}/>
          </>
          }
    </div>
    
    
    </>
  );
};

export default DelineationOfPrivileges;
