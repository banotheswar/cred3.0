import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { useParams, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { FcPrint } from "react-icons/fc";
import DelineationOfPrivileges from "../../../forms/DelineationOfPrivileges";
import { urls } from "../../../api_services/url";
import { getById, getList, save } from "../../../api_services/SharedServices";
import BoardSignatures from "./BoardSignatures";
import MDSignature from "./MDSignature";
import BSBDSignatures from "./BSBDSignatures";

const DOPFacilityView = ({formname,DoctorFormsView, requestMsgPopUp,getFormdata, setUpdateAppointmentList}) => {
  const containerRef = useRef(null);
  const [detailsState, setDetailsState] = useState("View Summary");
  const [DOPId,SetDOPId]=useState()
  const [MdData,setMdData]=useState()
  const [update, setUpdate] = useState();

  const { data, errors, handleChange, handleSubmit ,setValues} = UseFormValidations({})
  const getMdFormData =async(id)=>{
    let jsonObjects = {
      appointmentId:id,
      type:detailsState=="Medical Director Signature"?"MD":detailsState=="Board Signatures"?"BD":"",
      formType:"DOP",
      filterType:'Link'
    };
    let res = await getList(urls?.forms?.GetAllBoardSummary, { jsonObjects });
    setMdData(res)
  }
const getData=(v)=>{
 
  SetDOPId(v)
}


  useEffect(()=>{
    setValues(MdData)
  },[MdData,update])

  useEffect(()=>{
    // if(detailsState=="Medical Director Signature"||detailsState=="Board Signatures"){
      formname?.appointmentId&&getMdFormData(formname?.appointmentId)
    // }
   
  },[formname?.appointmentId,detailsState,update])
  const handleTabClick = (e) => {
    
    if(e=="Board Signatures"&&MdData&&MdData[0]?.isApproved=="Yes"){
      settingDetailstate(e)
    }
    if(e!="Board Signatures"){
      settingDetailstate(e)
    }
    
  };
  const viewsummary = () => {
    return (
      <div className="">
        <DelineationOfPrivileges
       
        getAllData={getData}
          formname={formname}
          DoctorFormsView={DoctorFormsView}
          requestMsgPopUp={requestMsgPopUp}
          getFormdata={getFormdata}
          setUpdateAppointmentList={setUpdateAppointmentList}
        />
     
      </div>
    );
  };

  const medicaldirectorsignature = () => {
    return (
      <div className="bg-white mt-2">
     <MDSignature formname={formname}  MdData={MdData} Update={setUpdate} formType={"DOP"}/>
     </div>
    );
  };

  const boardsignatures = () => {
    return (
     
      <div className="bg-white mt-2">
<BSBDSignatures
          formname={formname}
          MdData={MdData}
          Update={setUpdate}
          formType={"DOP"}
        />
      </div>
    );
  };

  const settingDetailstate = (name) => {
    setDetailsState(name);
  };

  const tabs = () => {
    switch (detailsState) {
      case "View Summary":
        return viewsummary();
      case "Medical Director Signature":
        return medicaldirectorsignature();
      case "Board Signatures":
        return boardsignatures();
      default:
        return <></>;
    }
  };

  return (
    <div className=" mt-2 ">
      <div className="row bg-white px-3 py-4">
        <div className="d-flex px-2 gap-1 " ref={containerRef}>
          {[
            "View Summary",
            "Medical Director Signature",
            "Board Signatures",
          ].map((e, i) => (
            <div
              className={
                detailsState === e
                  ? "border pointer active-bar text-white p-2"
                  : "border pointer not-active p-2"
              }
            
              onClick={() => handleTabClick(e)}
              key={i}
            >
              {e}
            </div>
          ))}
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="f13 medium text-white  border rounded "
              style={{ background: "#46A1AE" }}
            >
              <FcPrint size={20} /> Print Summary
            </button>
          </div>
        </div>
      </div>
      <div className="row">{tabs()}</div>
    </div>
  );
};

export default DOPFacilityView;
