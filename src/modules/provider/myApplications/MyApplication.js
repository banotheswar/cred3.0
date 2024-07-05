import React, { useState, useEffect } from "react";
import { BiSolidSend } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserFill } from "react-icons/pi";
import { ProgressBar } from "react-bootstrap";
import incomplete from "../../../assets/images/incomplete gray.svg";
import SignatureCanvas from "react-signature-canvas";
import IdentifyingInformation from "../../../forms/IdentifyingInformation";
import WorkExperience from "../../../forms/WorkExperience";
import MilitaryExperience from "../../../forms/MilitaryExperience";
import PracticeAffiliations from "../../../forms/PracticeAffiliations";
import HospitalorFacilityAffiliations from "../../../forms/HospitalorFacilityAffiliations";
import MalpracticeInsurance from "../../../forms/MalpracticeInsurance";
import HealthDocuments from "../../../forms/HealthDocuments";
import PracticeInformation from "../../../forms/PracticeInformation";
import Education from "../../../forms/Education";
import SignSubmit from "../../../forms/SignSubmit";
import FacilityDocuments from "../../../forms/FacilityDocuments";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import DelineationOfPrivileges from "../../../forms/DelineationOfPrivileges";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import CredFormsMobile from "../../../MobileComponents/CredFormsMobile";
import { getById, getList, save } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import { IoCloudUploadOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import BasicInformation from "../../../forms/BasicInformation";
import SendMessagemodal from "../../facility_admin/doctors/SendMessagemodal";
import AdditionalDocuments from "../../../forms/AdditionalDocuments";
import LogPrivileges from "../../../forms/LogPrivileges";
import PeerReferences from "../../../forms/PeerReferences";
import MedicalAndStateLicense from "../../../forms/Licensure/MedicalAndStateLicense";
import BoardCertifications from "../../../forms/Certifications/BoardCertifications";
import RequestModal from "../../facility_admin/formsread/RequestModal";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import BoardSummary from "../../facility_admin/formsread/BoardSummary";
import DOPFacilityView from "../../facility_admin/formsread/DOPFacilityView";
import Sanctions from "../../../forms/Sanctions";
import { useDispatch, useSelector } from "react-redux";
import { ProviderFromObj } from "../../../redux/Action";
import DynamicFormBuilder from "../../../forms/Certifications/DynamicFormBuilder";
const MyApplication = () => {
  const navigate = useNavigate();
  const [formname, setFormName] = useState({});
  const [childformname, setChildFormName] = useState("");
  const { headerlink } = UseFormValidations({});
  const location = useLocation();
  const [opemform, setOpenform] = useState(false);
  const [AppointmentList, setAppointmentList] = useState([]);
  const { providerId, facilityId, appId } = useParams();
  const [formData, setFormData] = useState([]);
  const [update, setUpdate] = useState();
  const [doctordtails, setDoctordeatils] = useState();
  const [getFormdata, setGetFormdata] = useState();
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [id, setId] = useState();
  const [click, setClick] = useState("");
  const [updateAppointmentList, setUpdateAppointmentList] = useState();
  const [requestModel, setRequestModal] = useState(false)
  const [byformMsg, setByFormMsg] = useState()
  const [errorMsghide, setErrorMsg] = useState(true)
  const [state,setState]=useState({})
  const formObject=useSelector((state)=>state.formObject)
  const dispatch=useDispatch()
const [FormBuilderData,setFormBuilderData]=useState()

const [getNotify,SetgetNotify]=useState()
  const toggole = (id) => {
    if (click === id) {
      setClick(id);
      return setClick("");
    }
    return setClick(id);
  };

  const getMessageByForm = async (id) => {
    let jsonObjects = { documentId: id };
    let res = await getList(urls?.forms?.getRequestMessageForm, {
      jsonObjects,
    });
    setByFormMsg(res);
  };


const percentage=((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100
console?.log(percentage,((AppointmentList?.length)+1 - 1),(AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length)+1,"percentage121",((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100,(8/9)*100)

  const Facility = [
    { name: "All Providers", link: `/outpatientpro/facility/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}` },
    { name: "Doctors", link: `/outpatientpro/facility/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}` },
    {name: "Profile",link: `/outpatientpro/facility/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}/details/${providerId}/${facilityId}/${appId}`},
    {name: doctordtails?.userName,link: `/outpatientpro/facility/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}/details/${providerId}/${facilityId}/${appId}/applicationinprogress`,active: true,
    },
  ];
  const Enterprise = [
    { name: "All Providers", link: `/outpatientpro/enterprise/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}` },
    { name: "Doctors", link: `/outpatientpro/enterprise/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}` },
    {
      name: "Profile",
      link: `/outpatientpro/enterprise/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}/details/${providerId}/${facilityId}/${appId}`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/enterprise/${doctordtails?.roleName=="AHP"?"alliedhealth":"doctors"}/details/${providerId}/${facilityId}/${appId}/applicationinprogress`,
      active: true,
    },
  ];
  const Provider = [
    {
      name: "Dashboard",
      link: "/outpatientpro/provider/dashboard",
    },
    {
      name: "Profile",
      link: `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}/applicationinprogress`,
      active: true,
    },
  ];
  const Breadcrumb = (name) => {
    // console?.log(name,"111111111199999999999999999999999")/outpatientpro/facility/doctors/details/42/3/26/applicationinprogress
    switch (name) {
      case "4":return Facility;
      case "2":return Enterprise;
      case "5":return Provider;
      case "6":return Provider;
}
  };
  useEffect(() => {
    headerlink(Breadcrumb(sessionStorage.getItem("roleId")));
    
  }, [formname]);
  

  const submit = async (id, val, status, img) => {
    let formdata = new FormData();
    let array = [
      {
        id: id?.id?id?.id:0,
        type: formname?.formName,
        userId: providerId,
        appointmentId: formname?.appointmentId,
        delegateId: 0,
        percentage:(id?.isSubmitted!="Yes"&&status=="Yes")?(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100)?.toFixed(2):(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length)/(AppointmentList?.length - 1)) *100)?.toFixed(2),
        packageId: formname?.packageId,
        formId: formname?.formId,
        isSubmitted: status,
        formData: val,
        templateType: "Application",
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", img ? img : undefined);
    let res = await save(urls?.forms?.saveformdata, formdata);
    if (res?.data?.status) {
      setUpdate(new Date());
      setErrorMsg(false);
      dispatch(ProviderFromObj({}))
    }
  };

  const Uploadfilessave = async (files, Type, documentName) => {
    let formdata = new FormData();
    let array = [
      {
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        formId: formname?.formId,
        type: Type,
        documentName: documentName,
        documentType: formname?.formName,
        documentDescription: childformname,
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", files);
    let res = await save(urls?.forms?.saveUpload, formdata);
    if (res) {
      setUpdate(res);
    }
  };

  const Deleteuploads = async (Id) => {
    let jsonObjects = { uploadId: Id };
    let res = await save(urls?.forms?.deleteuploads, { jsonObjects });
    if (res) {
      setUpdate(res);
    }
  };

  const getformdata = async () => {
    let jsonObjects = {
      userId: providerId,
      packageId: formname?.packageId||formObject?.packageId,
      formId: formname?.formId||formObject?.formId,
      appointmentId: formname?.appointmentId||formObject?.appointmentId,
    };

    let res =formname?.formName == "Malpractice Insurance" ||formname?.formName == "Education & Training"? await getList(urls?.forms?.getformsdata, { jsonObjects })
        : await getById(urls?.forms?.getformsdata, { jsonObjects });
    setFormData(res?.additionalData);
    setGetFormdata(res?.additionalData);
    setId(res);
    if(formname?.formName != "Malpractice Insurance" ||formname?.formName != "Education & Training"){
      SetgetNotify(res)
    }
    
  };

  const getAppointmentList = async () => {
    let jsonObjects = {
      providerId: providerId,
      appointmentId: appId,
      roleId: sessionStorage.getItem("roleId"),
    };
    let res = await getList(urls?.forms?.getformNames, { jsonObjects });
     setAppointmentList(res);
    
  };

  const getAllInformation = async () => {
    let jsonObjects = { userId: providerId, appointmentId: appId };
    let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
    setDoctordeatils(res);
  };

  const saveLogsForm = async (flage) => {
    let jsonObjects = { id: id?.id || state?.id, saveLog: flage };
    let res = await save(urls?.forms?.saveLogForms, { jsonObjects });
    if (res?.data?.status) {
      setUpdate(new Date());
    }
  };

  const requestMsgPopUp = () => {
    return (
      <>
        {formname?.notify == "Yes" && errorMsghide && (
          <div className="row col-md-6 py-2" style={{ background: "#EFEFEF" }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                {byformMsg?.map((v, index) => (
                  <div key={index} className="f13 d-flex align-items-start">
                    <GoDotFill style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span className="px-1">{v?.message}</span>
                  </div>
                ))}
              </div>
              {sessionStorage?.getItem("roleId") > 4 && (
                <div className="pointer" onClick={() => setErrorMsg(false)}>
                  <RxCrossCircled color="#D5352F" size={18} />
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };
  const DoctorFormsView = (formname?.notify=="Yes" ? formname?.finalLock == "Yes" && formname?.notify=="Yes": formname?.finalLock != "Yes") &&(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") > 3:sessionStorage?.getItem("roleId") > 4)
  
  const tabs = () => {
    switch (formname?.formName) {
      case "Basic Information":
        return (
          <BasicInformation
            values={submit}
            formname={formname}
            getFormdata={getFormdata}
            doctordtails={doctordtails}
            setupdate1={setUpdate}
            setId={setId}
            id={id}
            AppointmentList={AppointmentList}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            setNotify={SetgetNotify}
          />
        );
      case "Work Experience":
        return (
          <WorkExperience
            values={submit}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            formname={formname}
            getFormdata={getFormdata}
            Uploadfilessave={Uploadfilessave}
            Deleteuploads={Deleteuploads}
            id={id}
            setNotify={SetgetNotify}
          />
        );
      case "Practice Affiliations":
        return (
          <PracticeAffiliations
            values={submit}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            id={id}
            formname={formname}
            setNotify={SetgetNotify}
          />
        );
      case "Hospital/Facility Affiliations":
        return (
          <HospitalorFacilityAffiliations
            values={submit}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            id={id}
            setNotify={SetgetNotify}
          />
        );
      case "Malpractice Insurance":
        return (
          <MalpracticeInsurance
            values={submit}
            doctordtails={doctordtails}
            state={state}
            setStateObj={setState}
            getFormdata={getFormdata}
            id={id}
            formname={formname}
            setFormName={setFormName}
            setId={setId}
            Deleteuploads={Deleteuploads}
            DoctorFormsView={DoctorFormsView}
            requestMsgPopUp={requestMsgPopUp}
            setNotify={SetgetNotify}
          />
        );
      case "Peer References":
        return (
          <PeerReferences
            values={submit}
            setRequestModal={setRequestModal}
            saveLogsForm={saveLogsForm}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            id={id}
            formname={formname}
            setFormName={setFormName}
            setNotify={SetgetNotify}
          />
        );
      case "Practice Information":
        return (
          <PracticeInformation
            values={submit}
            getFormdata={getFormdata}
            id={id}
            DoctorFormsView={DoctorFormsView}
            requestMsgPopUp={requestMsgPopUp}
            setNotify={SetgetNotify}
          />
        );
      case "Identifying Information":
        return (
          <IdentifyingInformation
            values={submit}
            id={id}
            getFormdata={getFormdata}
            formname={formname}
            Deleteuploads={Deleteuploads}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
            setNotify={SetgetNotify}
          />
        );
      case "Education & Training":
        return (
          <Education
            values={submit}
            state={state}
            setStateObj={setState}
            doctordtails={doctordtails}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            formname={formname}
            setFormName={setFormName}
            id={id}
            requestMsgPopUp={requestMsgPopUp}
            setNotify={SetgetNotify}
          />
        );
      case "Sign & Submit":
        return (
          <SignSubmit
            doctordtails={doctordtails}
            formname={formname}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            setupdate1={setUpdate}
            AppointmentList={AppointmentList}
            requestMsgPopUp={requestMsgPopUp}
            setNotify={SetgetNotify}
            id={id}
          />
        );
      // case "Log Privileges": return <LogPrivileges values={submit} DoctorFormsView={DoctorFormsView}  formname={formname} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata} />;
      case "Health Documents":
        return (
          <HealthDocuments
            doctordtails={doctordtails}
            id={id}
            setState={setState}
            updateMsg={update}
            setFormName={setFormName}
            setId={setId}
            values={submit}
            DoctorFormsView={DoctorFormsView}
            requestMsgPopUp={requestMsgPopUp}
            formname={formname}
            getFormdata={getFormdata}
            setupdate1={setUpdate}
            setNotify={SetgetNotify}
            AppointmentList={AppointmentList}
          />
        );

      case "Facility Documents":
        return (
          <FacilityDocuments
            doctordtails={doctordtails}
            id={id}
            setState={setState}
            updateMsg={update}
            setFormName={setFormName}
            setId={setId}
            submitData={submit}
            DoctorFormsView={DoctorFormsView}
            requestMsgPopUp={requestMsgPopUp}
            formname={formname}
            getFormdata={getFormdata}
            setupdate1={setUpdate}
            setUpdateAppointmentList={setUpdateAppointmentList}
            setNotify={SetgetNotify}
            AppointmentList={AppointmentList}
          />
        );
      case "Delineation of Privileges":
        return (
          <DelineationOfPrivileges
            formname={formname}
            DoctorFormsView={DoctorFormsView}
            requestMsgPopUp={requestMsgPopUp}
            getFormdata={getFormdata}
            setUpdateAppointmentList={setUpdateAppointmentList}
            id={id}
            setNotify={SetgetNotify}
            AppointmentList={AppointmentList}
          />
        );
      case "Military Experience":
        return (
          <MilitaryExperience
            setId={setId}
            values={submit}
            DoctorFormsView={DoctorFormsView}
            getFormdata={getFormdata}
            requestMsgPopUp={requestMsgPopUp}
            id={id}
            formname={formname}
            setNotify={SetgetNotify}
          />
        );
      case "Additional Documents":
     
     return <AdditionalDocuments setNotify={SetgetNotify} getFormdata={getFormdata} DoctorFormsView={DoctorFormsView} formname={formname} requestMsgPopUp={requestMsgPopUp} SetisSubmitted={""}/>;;
     case "Sanctions":
      return <Sanctions getFormdata={getFormdata} formname={formname}  setNotify={SetgetNotify}/>;;
    
     case "Licensure":
        return <MedicalAndStateLicense AppointmentList={AppointmentList} setNotify={SetgetNotify} id={id} setState={setState} doctordtails={doctordtails} updateMsg={update} setErrorMsg={setErrorMsg} setId={setId} setFormName={setFormName} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} category={childformname} providerId={providerId} uploadFile={Uploadfilessave}  Deleteuploads={Deleteuploads} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Certification": return <BoardCertifications AppointmentList={AppointmentList} setNotify={SetgetNotify} doctordtails={doctordtails} id={id} setState={setState} updateMsg={update} setErrorMsg={setErrorMsg} setFormName={setFormName} setId={setId} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} category={childformname} providerId={providerId} uploadFile={Uploadfilessave}  Deleteuploads={Deleteuploads} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Signatures": return childformname=="Board Summary"?<BoardSummary  setNotify={SetgetNotify}formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata} setUpdateAppointmentList={setUpdateAppointmentList}/>:<DOPFacilityView formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata} setUpdateAppointmentList={setUpdateAppointmentList} />
      case "Log & Previleges": return <LogPrivileges setNotify={SetgetNotify}  DoctorFormsView={DoctorFormsView} setUpdateApp={setUpdate} formname={formname} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata}/>
      default: return <DynamicFormBuilder setNotify={SetgetNotify} id={id} array={getFormdata&&getFormdata!=undefined?getFormdata:formname?.additionalData} saveForm={submit} DoctorFormsView={DoctorFormsView}/>
        break;
    }
  };
console?.log(formname?.additionalData,"AppointmentList?.additionalData",AppointmentList)
  const handleChangeData = (event, index) => {
    const { name, value } = event.target;
    const newFormElements = [...formData];
    newFormElements[index][name] = value;
    setFormData(newFormElements);
  };

  const handleChangeCheckbox = (key, index) => (e) => {
    const newFormElements = [...formData];
    newFormElements[index][key] = e.target.checked ? e.target.value : "";
    setFormData(newFormElements);
  };

  const handleDateChange = (e, index, key) => {
    let str;
    if (e && e != null) {
      if (e && e != null) {
        e?.setMinutes(0);
        e?.setHours(0);
        str = new Date(
          e?.setMinutes(
            e?.getTimezoneOffset() < 0
              ? -e?.getTimezoneOffset()
              : e?.getTimezoneOffset()
          )
        );

        const newFormElements = [...formData];
        newFormElements[index][key] = str;
        setFormData(newFormElements);
      }
    } else {
      const newFormElements = [...formData];
      newFormElements[index][key] = "";
      setFormData(newFormElements);
    }
  };

  const openForm = (v) => {
    setErrorMsg(true);
    let obj = v;
    obj["notify"] = v?.requested;
    obj["saveLogKey"] = v?.saveLog;
    setFormName(obj);
    setFormData(v?.formData);
    setOpenform(false)
    dispatch(ProviderFromObj({}))
  };
  const openchild = (v, index) => {
    setErrorMsg(true)
    toggole(index, v)
    setChildFormName("")
    dispatch(ProviderFromObj({}))
  }
  useEffect(() => {
    if (
      formname?.formName != "Licensure" &&
      formname?.formName != "Certification" &&
      formname?.formName != "Health Documents" &&
      formname?.formName != "Facility Documents" &&
      formname?.formName != "Basic Information"
    ) {
      getformdata();
    }
   
  }, [update, formname?.formName,]);

 useEffect(() => {
  
    if (getNotify) {
      getMessageByForm(getNotify?.id)
     
    }
  }, [getNotify,update])
  
  useEffect(() => {
  if(providerId&&appId){
    getAllInformation();
  } 
  }, [providerId, appId,update,appId])

useEffect(()=>{

  let obj=AppointmentList?.filter((v)=>v?.formId==formname?.formId&&v?.formName==formname?.formName)[0]
 if(formname?.formName!="Education & Training"&&formname?.formName!="Malpractice Insurance"&&formname?.formName!="Licensure"
    &&formname?.formName!="Certification"&&formname?.formName!="Facility Documents"&&formname?.formName!="Health Documents"){
      
      if(obj){
        obj["notify"] = obj?.requested
        obj["saveLogKey"] = obj?.saveLog
        formObject["notify"]= obj?.requested
        formObject["saveLogKey"]= obj?.saveLog
        formObject["finalLock"]= obj?.finalLock
        formObject["packageId"]= obj?.packageId
        

        formObject?.formName?setFormName(formObject):setFormName(obj)
      }
      else{
        formObject?.formName?setFormName(formObject):setFormName(AppointmentList[0])
      }
    }
},[AppointmentList,formname,update])
console?.log(formname,"formname")
  useEffect(() => {
    appId && getAllInformation();
  }, [providerId, update, appId]);

  useEffect(() => {
    if (providerId&&appId) {
      getAppointmentList()
    }
 }, [providerId,appId, update, updateAppointmentList])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formname?.formName]);



  const setChildFormValue=(v,name)=>{
    setChildFormName(name)
    setFormName(v)
    dispatch(ProviderFromObj({}))
  }
  const gotoForms = (roleId) => {
    switch (roleId) {
      case "1":
        return `/outpatientpro/admin/${
          formname?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}`;

      case "2":
        return `/outpatientpro/enterprise/${
          formname?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}`;

      case "4":
        return `/outpatientpro/facility/${
          formname?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}`;

      case "5":
        return `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}`;

      default:
        return "";
    }
  };

  const roleId = sessionStorage.getItem("roleId");


  return (
    <div className="row">
      {opemform && (
        <div className="show_header">
          <CredFormsMobile
            open={setOpenform}
            state={setOpenform}
            formname={formname}
            openForm={openForm}
            doctordtails={doctordtails}
            setChildFormValue={setChildFormValue}
            openchild={openchild}
            click={click}
            formList={AppointmentList || []}
            childformname={childformname}
          />
        </div>
      )}



{/*==========================================================  mobile card *==========================================================*/}
     


      <div className="show_header   bg-white px-5 py-4 ">
        <div
          className="border  rounded  mt-4   border-0 d-flex flex-column align-items-center "
          style={{ background: " rgba(236, 236, 236, 0.45)" }}
        >
          <div className="doc_pro_icon" style={{}}>
            <FaRegCircleUser
              color="#8B8B8B"
              style={{ height: "40px", width: "40px" }}
            />
          </div>
          <div className=" doctor-profile-name">
          {roleId != "5" ? doctordtails?.userName || "-" : null}
              {roleId === "5" ? doctordtails?.facilityName || "-" : null}
          </div>
          <p className="doctor-profile-desig">  {roleId != "5" ? doctordtails?.roleName || "-" : null}</p>
          <div className="d-flex  gap-2 align-items-center justify-content-center mb-2">
            <div
              className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center pointer"
              style={{ opacity: "0.6" }}
              onClick={
                () => navigate(gotoForms(sessionStorage?.getItem("roleId")))
                
              }
            >
              <PiUserFill
                color="#C2C2C2"
                className="me-1  mb-1 pointer"
                height={11}
                width={11}
              />
              Profile
            </div>
            <div
              className="rounded button-user-profile-1 p-3 d-flex justify-content-center align-items-center pointer"
              style={{ opacity: "0.6" }}
              onClick={() => setSendMessageModal(formname)}
            >
              {" "}
              <BiSolidSend
                color="#C2C2C2"
                className="me-1 mb-1"
                height={11}
                width={11}
              />
              Send Message
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-2 show_header bg-white ">
        <div className="">
          <div className="d-flex">
            <div className="col-10 mediumf15 "> {doctordtails?.appointmentType
                  ? doctordtails?.appointmentType
                  : "-"}</div>
            <div className="col-2 f15 " color="#3A3952">
            {(
                  doctordtails?.appointmentType == "Onboarding"
                    ? sessionStorage?.getItem("roleId") > 3
                    : sessionStorage?.getItem("roleId") > 4
                )
                  ? (
                      (AppointmentList.slice(0, -1)?.filter(
                        (v) => v?.finalSubmit === "Yes"
                      )?.length /
                        (AppointmentList?.length - 1)) *
                      100
                    )?.toFixed(2)
                  : (
                      (AppointmentList.slice(0, -1)?.filter(
                        (v) => v?.saveLog === "Yes" && v?.finalLock == "Yes"
                      )?.length /
                        (AppointmentList?.length - 1)) *
                      100
                    )?.toFixed(2)}
                %
            </div>
          </div>
        </div>
        <div
          className="btn btn-primary f12 mt-1 mb-2"
          onClick={() => setOpenform(!opemform)}
        >
          <SiGoogleforms className="mb-1" size={12} /> All Forms
        </div>
        
      </div>


 {/*====================================================== web compont code *========================================================*/}


      <div className="d-flex  containersgap">
        <div className="container-width3   mobile_Header   bg-white p-3 ">
          <div
            className="border  rounded    pt-4 py-2  border-0  d-flex flex-column align-items-center "
            style={{
              background: " rgba(236, 236, 236, 0.45)",
              minHeight: "168px",
              marginTop: "71px",
            }}
          >
            <div
              className=" "
              style={{
                position: "absolute",
                top: "145px",
                background: "#FFFFFF",
                border: "3px solid #FFFFFF",
                borderRadius: "50%",
              }}
            >
              <FaRegCircleUser
                color="#8B8B8B"
                style={{ height: "60px", width: "60px" }}
              />
            </div>
            <div className=" doctor-profile-name py-2 ">
             
              {roleId != "5" ? doctordtails?.userName || "-" : null}
              {roleId === "5" ? doctordtails?.facilityName || "-" : null}
            </div>
            <p className="doctor-profile-desig">
              

            {roleId != "5" ? doctordtails?.roleName || "-" : null}
            </p>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
              <div
                className="rounded button-user-profile-1 px-2 p-2 d-flex justify-content-center align-items-center pointer"
                style={{ opacity: "0.6" }}
                onClick={
                  () => navigate(gotoForms(sessionStorage?.getItem("roleId")))
                  
                }
              >
                <PiUserFill color="#c2c2c2" className="me-1 mb-1 " size={15} />
                Profile
              </div>
              <div
                className="rounded button-user-profile-1 p-3 d-flex justify-content-center align-items-center pointer"
                style={{ opacity: "0.6" }}
                onClick={() => setSendMessageModal(formname)}
              >
                {" "}
                <BiSolidSend color="#c2c2c2" className="me-1 mb-1" size={15} />
                Send Message
              </div>
            </div>
          </div>
          <div className="col-md-12 p-2   py-3 mb-2">
            <div className="d-flex">
              <div className="f20 medium " style={{ height: "24px" }}>
                {doctordtails?.appointmentType
                  ? doctordtails?.appointmentType
                  : "-"}
              </div>
              <div
                className="col f15 d-flex justify-content-end mt-1"
                color="#3A3952"
                style={{ height: "18px" }}
              >
                {(
                  doctordtails?.appointmentType == "Onboarding"
                    ? sessionStorage?.getItem("roleId") > 3
                    : sessionStorage?.getItem("roleId") > 4
                )
                  ? (
                      (AppointmentList.slice(0, -1)?.filter(
                        (v) => v?.finalSubmit === "Yes"
                      )?.length /
                        (AppointmentList?.length - 1)) *
                      100
                    )?.toFixed(2)
                  : (
                      (AppointmentList.slice(0, -1)?.filter(
                        (v) => v?.saveLog === "Yes" && v?.finalLock == "Yes"
                      )?.length /
                        (AppointmentList?.length - 1)) *
                      100
                    )?.toFixed(2)}
                %
              </div>
            </div>
          </div>

          <div className="col-md-12">
            {AppointmentList?.map((v, index) => {
              return (
                <>
                  <>
                    <div
                      className={
                        formname?.formName == v?.formName
                          ? "  d-flex  border-top-bottom selectedformbg justify-content-between"
                          : " d-flex  border-top-bottom justify-content-between"
                      }
                      style={{ height: "40px" }}
                      key={index}
                    >
                      <div
                        className={
                          formname?.formName == v?.formName
                            ? "selected-form-font divointer col-md-11  d-flex align-items-center px-2"
                            : "pointer form-font col-md-11 d-flex align-items-center px-2"
                        }
                        onClick={() =>
                          !(
                            v?.additionalData &&
                            v?.additionalData?.some((v) => v?.credCategory)
                          )
                            ? openForm(v, index)
                            : openchild(v, index)
                        }
                      >
                        <span>{v?.formName}</span>
                      </div>

                      {
                        <div className="col-md-1 d-flex  align-items-center">
                          {(doctordtails?.appointmentType == "Onboarding"
                            ? sessionStorage?.getItem("roleId") == 4
                            : sessionStorage?.getItem("roleId") == 5 ||
                              sessionStorage.getItem("roleId") == 6) &&
                            // (sessionStorage.getItem("roleId") == 5|| sessionStorage.getItem("roleId") == 6)
                            v?.finalSubmit === "Yes" &&
                            v?.requested == "No" && (
                              <IoIosCheckmarkCircle
                                color={
                                  formname?.formName == v?.formName
                                    ? "#0073E6"
                                    : "#00B948"
                                }
                                size={16}
                                style={{ fontSize: "16px" }}
                              />
                            )}
                          {(doctordtails?.appointmentType == "Onboarding"
                            ? sessionStorage?.getItem("roleId") <= 3
                            : sessionStorage?.getItem("roleId") <= 4) &&
                            // sessionStorage.getItem("roleId") <= 4
                            v?.saveLog === "Yes" &&
                            v?.finalLock == "Yes" && (
                              <IoIosCheckmarkCircle
                                color={
                                  formname?.formName == v?.formName
                                    ? "#0073E6"
                                    : "#00B948"
                                }
                                size={16}
                                style={{ fontSize: "16px" }}
                              />
                            )}
                          {
                            //  (sessionStorage.getItem("roleId") == 5|| sessionStorage.getItem("roleId") == 6) &&
                            v?.finalSubmit === "No" &&
                              v?.requested == "Yes" && (
                                <IoAlertCircleSharp
                                  color={
                                    formname?.formName == v?.formName
                                      ? "#0073E6"
                                      : "#D5352F"
                                  }
                                  size={16}
                                  style={{ fontSize: "16px" }}
                                />
                              )
                          }
                        </div>
                      }
                    </div>
                    <div>
                      {click == index &&
                        v?.additionalData &&
                        v?.additionalData?.map((sub, i) => {
                          console?.log(doctordtails?.appointmentType=="Onboarding"?"sa":"i",(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)&& sub?.finalSubmit == "Yes" && sub?.requested == "No" ,"sss",sessionStorage?.getItem("roleId") ==4,sessionStorage?.getItem("roleId") ==5,sessionStorage?.getItem("roleId") ==6,"sess",sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)
                          return (
                            <>
                              {sub?.credCategory && (
                                <div
                                  onClick={() => openForm(v, index)}
                                  className={
                                    childformname == sub?.credCategory
                                      ? "  d-flex  border-top-bottom selectedformbg justify-content-between"
                                      : " d-flex  border-top-bottom justify-content-between"
                                  }
                                  style={{ height: "40px" }}
                                  key={index}
                                >
                                  <div
                                className={
                                  childformname == sub?.credCategory
                                    ? "selected-form-font divointer col-md-11  d-flex align-items-center px-4"
                                    : "pointer form-font col-md-11 d-flex align-items-center px-4"
                                }
                                onClick={() => setChildFormValue(sub, sub?.credCategory)}
                              >
                                <span>{sub?.credCategory}</span>
                              </div>{<div className="col-md-1 d-flex  align-items-center">
                                
                              {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)&& sub?.finalSubmit == "Yes" && sub?.requested == "No" &&
                                 
                                 <IoIosCheckmarkCircle
                                   color={childformname == sub?.credCategory ? "#0073E6" : "#00B948"}
                                   size={16}
                                   style={{ fontSize: "16px" }}
                                 />
                               }
                               {
                                
                                (doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") <=3:sessionStorage?.getItem("roleId") <=4)&& sub?.saveLog == "Yes" && v?.finalLock == "Yes" &&
                                  <IoIosCheckmarkCircle
                                    color={childformname == sub?.credCategory? "#0073E6" : "#00B948"}
                                    size={16}
                                    style={{ fontSize: "16px" }}
                                  />
                                }
                                {
                                     sub?.finalSubmit === "No" && sub?.requested == "Yes"
                                    &&
                                    <IoAlertCircleSharp
                                      color={childformname == sub?.credCategory ? "#0073E6" : "#D5352F"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                </div>}
                                  
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div>
                  </>
                </>
              );
            })}
          </div>
        </div>
        <div className=" container-width9 px-2">
          <div className="row bg-white py-4 px-1  ">
            <div className="row ">
              <div className="d-flex flex-wrap  justify-content-between">
                <div className="col-xl-10 col-lg-7 col-md-12">
                  <div className="form-header px-1 py-1">
                    {formname?.formName}
                  </div>
                </div>
                <div className="col-xl-2 col-lg-5 col-md-12  d-flex flex-column progress-bar-tab justify-content-end">
                  <div className=" p-bar-width ">
                    <label className="progressbartext" style={{ opacity: "1" }}>
                      {(
                        doctordtails?.appointmentType == "Onboarding"
                          ? sessionStorage?.getItem("roleId") > 3
                          : sessionStorage?.getItem("roleId") > 4
                      ) ? (
                        <span>
                          {
                            AppointmentList?.slice(0, -1)?.filter(
                              (v) => v?.finalSubmit === "Yes"
                            )?.length
                          }{" "}
                          of {AppointmentList?.length - 1} steps completed{" "}
                        </span>
                      ) : (
                        <span>
                          {
                            AppointmentList.slice(0, -1)?.filter(
                              (v) =>
                                v?.saveLog === "Yes" && v?.finalLock == "Yes"
                            )?.length
                          }{" "}
                          of {AppointmentList?.length - 1} steps completed{" "}
                        </span>
                      )}
                       </label>
                    <img
                      src={incomplete}
                      alt="cred"
                      className="ms-1"
                      style={{
                        objectFit: "fill",
                        height: "16px",
                        width: "16px",
                        opacity: "1",
                        borderColor: "#707070",
                        borderWidth: " 2px",
                      }}
                    />
                  </div>
                  <div className=" ">
                    <div className=" mt-1  p-bar-width ">
                      <ProgressBar
                        now={
                          (
                            doctordtails?.appointmentType == "Onboarding"
                              ? sessionStorage?.getItem("roleId") > 3
                              : sessionStorage?.getItem("roleId") > 4
                          )
                            ? // sessionStorage?.getItem("roleId") > 4
                              (AppointmentList.slice(0, -1)?.filter(
                                (v) => v?.finalSubmit === "Yes"
                              )?.length /
                                (AppointmentList?.length - 1)) *
                              100
                            : (AppointmentList.slice(0, -1)?.filter(
                                (v) => v?.saveLog === "Yes"
                              )?.length /
                                (AppointmentList?.length - 1)) *
                              100
                        }
                        style={{
                          borderRadius: "0",
                          height: "3px",
                          backgroundColor: "rgba(112, 112, 112, 0.3)",
                        }}
                        className="custom-progress-bar-forms "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          { (
            <>
              {tabs()}

              {formname?.formName != "Log & Previleges" &&
                formname?.formName != "Peer References" &&
                formname?.formName != "Signatures" &&
                formname?.formName != "Sanctions" &&
                formname?.formName != "Additional Documents" && (
                  <div className="bg-white row">
                    {formname?.finalLock == "Yes" &&
                      (doctordtails?.appointmentType == "Onboarding"
                        ? sessionStorage?.getItem("roleId") <= 3
                        : sessionStorage?.getItem("roleId") <= 4) &&
                      // sessionStorage?.getItem("roleId") <= 4
                      formname?.saveLogKey == "No" && (
                        <div className="row pb-3">
                          <div className="d-flex gap-3 mx-3">
                            <button
                              onClick={() => saveLogsForm("Yes")}
                              disabled={formname?.notify == "Yes"||formname?.isLogged=="Yes"}
                              type="button"
                              className=" text-white col-md-2 f16 medium border rounded py-2 pointer"
                              style={{
                                background:
                                  formname?.notify == "Yes"||formname?.isLogged=="Yes"
                                    ? "#a1f2c0"
                                    : "#00B948",
                              }}
                            >
                              <FaCheckCircle size={14} /> Save & Log
                            </button>
                            <button
                            disabled={formname?.isLogged=="Yes"}
                              className="text-white text-center f16 medium col-md-2 border rounded py-2 col-md-auto pointer"
                              onClick={() => setRequestModal(true)}
                              style={{ background: formname?.isLogged=="Yes"?"#FF7F7F":"#D4352F" }}
                            >
                              <BsFillQuestionCircleFill size={14} /> Request
                              Edits
                            </button>
                          </div>
                        </div>
                      )}
                    {formname &&
                      formname?.finalLock == "Yes" &&
                      (doctordtails?.appointmentType == "Onboarding"
                        ? sessionStorage?.getItem("roleId") <= 3
                        : sessionStorage?.getItem("roleId") <= 4) &&
                      // sessionStorage?.getItem("roleId") <= 4
                      formname?.saveLogKey == "Yes" && (
                        <div className="row py-2">
                          <div className="col-md-2">
                            <button
                            disabled={formname?.isLogged=="Yes"}
                              type="button"
                              className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                              style={{ background: formname?.isLogged=="Yes"?"#FF7F7F":"#D4352F" }}
                              onClick={() => saveLogsForm("No")}
                            >
                              Unlock & Edit
                            </button>
                          </div>{" "}
                        </div>
                      )}
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      {requestModel && (
        <RequestModal
          setState={setUpdate}
          show={setRequestModal}
          onHide={() => setRequestModal(false)}
          formData={formname}
          obj={id}
          state={state}
          providerId={providerId}
          childFormData={childformname}
          facilityId={facilityId}
        />
      )}

      {sendMessageModal && (
        <SendMessagemodal
          show={sendMessageModal}
          providerId={providerId}
          obj={id}
          onHide={() => setSendMessageModal(false)}
        />
      )}
    </div>
  );
};
export default MyApplication;
