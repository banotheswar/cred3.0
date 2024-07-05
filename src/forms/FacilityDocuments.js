import React, { useEffect, useState } from "react";

import { getById, getList, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import Attestations from "./facilityDoc/Attestations";
import Releases from "./facilityDoc/Releases";
import ProfessionalHistoryQuestions from "./facilityDoc/ProfessionalHistoryQuestions";
import CodeofConduct from "./facilityDoc/CodeofConduct";
import { useParams } from "react-router-dom";
import DynamicFormBuilder from "./Certifications/DynamicFormBuilder";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";

const FacilityDocuments = ({setNotify,setState,id,updateMsg, setFormName,formname, doctordtails,setUpdateAppointmentList, DoctorFormsView, requestMsgPopUp,setId }) => {
  const [update, setUpdate] = useState([])
  const [detailsState, setDetailsState] = useState();
  const [facilityDocumentsList, setFacilityDocumentsList] = useState()
  const [formByData, setFormByData] = useState([])
  const { providerId } = useParams()
console?.log(facilityDocumentsList,"facilityDocumentsList",detailsState)
  const submit = async (id,dataFrom) => {
    let formdata = new FormData()
    // let fomvalues = formByData?.documentData?.filter(field => field.required === true).every(field => field.value&&field.value!="");
    // [{ value: data?.firstName }, { value: data?.lastName }];
    // const someValueIsMissingData = fomvalues.some(
    //   (item) => item.value === undefined || item.value === ""
    // );
    // const greentick = fomvalues == true ? "No" : "Yes";
    // detailsState?.defaultForm=="No"&&
    // detailsState?.defaultForm=="No"?greentick:
    let array = [{
      "id": formByData?.id ? formByData?.id : 0,
      "facilityUserId": providerId,
      "appointmentId": formname?.appointmentId,
      "templateType": "Facility Document",
      "formId": detailsState?.formId,
      "type": "Facility Document",
      "isSubmitted": "Yes",
      "documentData": dataFrom
    }]

    formdata.append("JsonString", JSON.stringify(array));
    let res = await save(urls?.forms?.savehealthdoc, formdata)
    setUpdate(res)
    setUpdateAppointmentList(res)
  };


  const getFacilityDocuments = async () => {
    let jsonObjects = {
      type: "Facility Document",
      appointmentId: formname?.appointmentId,
    };
    let res = await getList(urls?.forms?.getHDList, { jsonObjects });
    setFacilityDocumentsList(res || []);
    let array=res?.filter((v)=>v?.id==id?.id)
    let arrayTwo= array?.length!=0?array:res
    setDetailsState(arrayTwo[0]||{})
    setNotify(arrayTwo[0])
    formname["notify"] = arrayTwo[0]?.requested
    formname["saveLogKey"] = arrayTwo[0]?.saveLog
    setFormName(formname)
    

  };

  const facilityFormById = async (appointmentId, formId) => {
    let jsonObjects = {
      appointmentId: appointmentId,
      formId: formId,
      type: "Facility Document",
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    setId(res)
    setNotify(res)
    console?.log(res, "res")
    setFormByData(res)

  }



  useEffect(() => {
    setState("")
    getFacilityDocuments();
  }, [update,updateMsg]);

  useEffect(() => {
    if (detailsState?.formId) {
      facilityFormById(formname?.appointmentId, detailsState?.formId)
    }
  }, [detailsState?.formId, update])


  const settingDetailstate = (name) => {
    setDetailsState(name);
    formname["notify"] = name?.requested
    formname["saveLogKey"] = name?.saveLog
    setFormName(formname)
    setNotify(name)
  };


  

  const tabs = () => {
    switch (detailsState?.formName) {
      case "Attestations":
        return <Attestations values={submit} formData={formByData} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />;
      case "Releases":
        return <Releases values={submit} formData={formByData} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />;
      case "Code of Conduct":
        return <CodeofConduct values={submit} formData={formByData} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />;
      case "Professional History Questions":
        return <ProfessionalHistoryQuestions values={submit} formData={formByData} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />

      default:
        return <></>;
    }
  };
  console?.log(formByData, detailsState, "detailsState")
  return (
    <>
      <div className="row bg-white p-2 mt-2">
        <div className="bg-white  d-flex  px-2 gap-1 " >
          {facilityDocumentsList?.map((e, i) => (
            <div
              className={
                detailsState?.formName === e?.formName
                  ? `border pointer  ${e?.requested=="Yes"?"requestedactive-bar":"active-bar"}   text-white  p-2`
                  : "  border pointer  not-active   p-2 "
              }
              onClick={() => { settingDetailstate({ formName: e?.formName, formId: e?.formId, id: e?.id, defaultForm: e?.defaultForm ,saveLog:e?.saveLog,requested:e?.requested}); }}
              key={i}
            >
              {e?.formName}
              {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage.getItem("roleId")==6)&& e?.isSubmitted == "Yes" && <IoIosCheckmarkCircle
                className='mx-2'
                color={e?.formName == detailsState?.formName ? "#ffff" : "#7E7E7E"}
                size={16}
                style={{ fontSize: "16px" }}
              />}

              {sessionStorage.getItem("roleId") <= 4 &&e?.isSubmitted == "Yes" &&  e?.saveLog === "Yes" &&
                <IoIosCheckmarkCircle
                  color={e?.formName == detailsState?.formName ? "#ffff" : "#7E7E7E"}
                  size={16}
                  style={{ fontSize: "16px" }}
                />
              }
              {e?.isSubmitted === "No" && e?.requested == "Yes"
                &&
                <IoAlertCircleSharp
                  color={e?.formName == detailsState?.formName ? "#ffff" :"#D5352F"}
                  size={16}
                  style={{ fontSize: "16px" }}
                />
              }
            </div>
          ))}
        </div>
      </div>
      <div className="row bg-white p-2 mt-2">
        {
          detailsState?.defaultForm == "No" ? <DynamicFormBuilder array={formByData?.documentData} saveForm={submit} DoctorFormsView={DoctorFormsView}/> : tabs()
        }</div>
    </>
  );
};

export default FacilityDocuments;
