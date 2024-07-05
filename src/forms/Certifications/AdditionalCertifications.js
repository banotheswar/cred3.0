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
import {

  getById,
  getList,
  save,
} from "../../../api_services/SharedServices";
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

import UnlockAndEditmodal from "../../../formsReadView/UnlockAndEditmodal";
import RequestModal from "../../facility_admin/formsread/RequestModal";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import BoardSummary from "../../facility_admin/formsread/BoardSummary";
import DOPFacilityView from "../../facility_admin/formsread/DOPFacilityView";
import Sanctions from "../../../forms/Sanctions";
const MyApplication = () => {
  const navigate = useNavigate();
  const [AppointmentList, setAppointmentList] = useState([]);
  const [formname, setFormName] = useState();
  const [childformname, setChildFormName] = useState("");
  const { headerlink } = UseFormValidations({});
  const location = useLocation();
  const [opemform, setOpenform] = useState(false);
 
  const { providerId } = useParams();
  const [formData, setFormData] = useState([]);
  const [update, setUpdate] = useState();
  const [doctordtails, setDoctordeatils] = useState();
  const [getFormdata, setGetFormdata] = useState();
  const [uploadeddata, setuploadeddata] = useState();
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [id, setId] = useState();
  const [message, setGetMessage] = useState([]);
  const [status, setStatus] = useState("")
  const [isSubmitted, SetisSubmitted] = useState("No")
  const [licensuredata, setLicensuredata] = useState([])
  const [click, setClick] = useState("")
  const [updateAppointmentList, setUpdateAppointmentList] = useState();
  const [editModal, setEditModal] = useState(false)
  const [requestModel, setRequestModal] = useState(false)
  const [byformMsg, setByFormMsg] = useState()
  const [errorMsghide, setErrorMsg] = useState(true)
  const [state,setState]=useState({})

  console?.log()
  const toggole = (id, v) => {

    if (click === id) {

      setClick(id);
      return setClick("");
    }
    return setClick(id);
  };
  const getMessageByForm = async (id) => {
    let jsonObjects = { documentId: id }
    let res = await getList(urls?.forms?.getRequestMessageForm, { jsonObjects })
    console?.log(res,"resdddd")
    setByFormMsg(res)

  }


  console?.log(formname,"subdbdb")
  const Facility = [
    { name: "All Providers", link: "/outpatientpro/facility/doctors" },
    { name: "Doctors", link: "/outpatientpro/facility/doctors" },
    {
      name: "Profile",
      link: `/outpatientpro/facility/doctors/details/${providerId}`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`,
      active: true,
    },
  ];
  const Enterprise = [
    { name: "All Providers", link: "/outpatientpro/enterprise/doctors" },
    { name: "Doctors", link: "/outpatientpro/enterprise/doctors" },
    {
      name: "Profile",
      link: `/outpatientpro/enterprise/doctors/details/${providerId}`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/enterprise/doctors/details/${providerId}/applicationinprogress`,
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
      link: `/outpatientpro/provider/facility/facilityprofile/${providerId}`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/provider/facility/facilityprofile/${providerId}/applicationinprogress`,
      active: true,
    },
  ];
  const Breadcrumb = (name) => {
    switch (name) {
      case `/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`:
        return Facility;

      case `/outpatientpro/enterprise/doctors/details/${providerId}/applicationinprogress`:
        return Enterprise;

      case `/outpatientpro/provider/facility/facilityprofile/${providerId}/applicationinprogress`:
        return Provider;

      default:
        break;
    }
  };
  useEffect(() => {
    headerlink(Breadcrumb(location.pathname));
  }, [doctordtails]);


  const submit = async (id, val, status, img) => {
    let formdata = new FormData()
    let array = [{
      "id": id,
      "userId": providerId,
      "appointmentId": formname?.appointmentId,
      "delegateId": 0,
      "packageId": formname?.packageId,
      "formId": formname?.formId,
      "isSubmitted": status,
      "formData": val
    }]

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", img ? img : undefined);
    let res = await save(urls?.forms?.saveformdata, formdata);
    if (res?.data?.status) {
     
        setUpdate(new Date());
        setErrorMsg(false)
      
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
        documentDescription: childformname
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", files);
    let res = await save(urls?.forms?.saveUpload, formdata);
    if (res) {
      setUpdate(res);
    }
  };


  const getuploadeddata = async () => {
    let jsonObjects = {
      providerId: providerId,
      appointmentId: formname?.appointmentId,
      formId: formname?.formId,
      type: "Single",

    };
    let res = await getList(urls?.forms?.getuploadForms, { jsonObjects });
    setuploadeddata((res && res[0]) || []);
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
      packageId: formname?.packageId,
      formId: formname?.formId,
      appointmentId: formname?.appointmentId,
    };

    let res = formname?.formName=="Malpractice Insurance"||formname?.formName=="Education & Training"?await getList(urls?.forms?.getformsdata, { jsonObjects }): await getById(urls?.forms?.getformsdata, { jsonObjects });
    setFormData(res?.additionalData);
    setGetFormdata(res?.additionalData);
    setId(res);
  };






  const getAppointmentList = async () => {
    let jsonObjects = { providerId: providerId, roleId: sessionStorage.getItem("roleId") };
    let res = await getList(urls?.forms?.getformNames, { jsonObjects });

    setAppointmentList(res);
    
    let obj=res?.filter((v)=>v?.formId==formname?.formId&&v?.formName==formname?.formName)[0]
    // let activeform=obj&&obj!=undefined?obj:res[0]
    sessionStorage.getItem("roleId")<=4&&setFormName(obj)

  };


  const getAllInformation = async () => {
    let jsonObjects = {
      userId: providerId,
    };
    let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
    setDoctordeatils(res);
  };


  const getMessageList = async () => {
    let jsonObjects = {
      sendFrom: sessionStorage?.getItem("userId"),
    };
    let res = await getList(urls?.sendMessage?.getMessage, { jsonObjects });

    setGetMessage(res);
  };
  const saveLogsForm = async (flage) => {
    let jsonObjects = {
      id: id?.id||state&&state?.id,
      saveLog: flage
    }
    let res = await save(urls?.forms?.saveLogForms, { jsonObjects })
    if (res?.data?.status) {
      setUpdate(new Date());
    }
  }



  const requestMsgPopUp = () => {
    return (
      <>
        { formname?.requested&&formname?.requested == "Yes"&& errorMsghide ? <div className="row col-md-6 py-2" style={{ background: "#EFEFEF" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          {byformMsg?.map((v, index) => (
            <div key={index} className="f13 d-flex align-items-start">
              <GoDotFill style={{ flexShrink: 0, marginTop: '2px'}} />
              <span className="px-1">{v?.message}</span>
            </div>
          ))}
        </div>
        {sessionStorage?.getItem("roleId")>4&&<div className="pointer" onClick={() => setErrorMsg(false)}>
          <RxCrossCircled color="#D5352F" size={18} />
        </div>}
      </div>
    </div>: ""}</>
    )
  }
  const DoctorFormsView = (formname?.requested == "Yes" ? formname?.finalLock == "Yes" && formname?.requested == "Yes": formname?.finalLock != "Yes") && sessionStorage?.getItem("roleId") > 4
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
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
          />
        );
      case "Work Experience":
        return (
          <WorkExperience values={submit} requestMsgPopUp={requestMsgPopUp} DoctorFormsView={DoctorFormsView} formname={formname} getFormdata={getFormdata} Uploadfilessave={Uploadfilessave} uploadeddata={uploadeddata} Deleteuploads={Deleteuploads} id={id}
          />
        );
      case "Practice Affiliations":
        return (
          <PracticeAffiliations values={submit} requestMsgPopUp={requestMsgPopUp} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} id={id} formname={formname} />
        );
      case "Hospital/Facility Affiliations":
        return (
          <HospitalorFacilityAffiliations values={submit} requestMsgPopUp={requestMsgPopUp} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} id={id}
          />
        );
      case "Malpractice Insurance":
        return (
          <MalpracticeInsurance values={submit } setId={setId} setStateObj={setState} getFormdata={getFormdata} id={id}formname={formname} setFormName={setFormName}   Deleteuploads={Deleteuploads} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />
        );
      case "Peer References":
        return <PeerReferences values={submit} requestMsgPopUp={requestMsgPopUp} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} id={id} formname={formname} />;
      case "Practice Information":
        return (
          <PracticeInformation values={submit} getFormdata={getFormdata} id={id} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} />
        );
      case "Identifying Information":
        return (
          <IdentifyingInformation
            values={submit}
            id={id}
            getFormdata={getFormdata}
            formname={formname}
            uploadeddata={uploadeddata}
            Deleteuploads={Deleteuploads}
            requestMsgPopUp={requestMsgPopUp}
            DoctorFormsView={DoctorFormsView}
          />
        );
      case "Education & Training":
        return <Education values={submit} setId={setId} setFormName={setFormName} setStateObj={setState} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} state={setStatus} formname={formname} id={id} requestMsgPopUp={requestMsgPopUp} />;
      case "Sign & Submit":
        return <SignSubmit doctordtails={doctordtails} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} setupdate1={setUpdate} AppointmentList={AppointmentList} requestMsgPopUp={requestMsgPopUp} />;
      case "Log Privileges":
        return <LogPrivileges values={submit} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata} />;
      case "Health Documents":
        return <HealthDocuments setFormName={setFormName} setId={setId} values={submit} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} formname={formname} getFormdata={getFormdata} state={setStatus} setupdate1={setUpdate} />;

      case "Facility Documents":
        return <FacilityDocuments setFormName={setFormName} setId={setId} submitData={submit} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} formname={formname} getFormdata={getFormdata} state={setStatus} setupdate1={setUpdate} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Delineation of Privileges":
        return <DelineationOfPrivileges formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} getFormdata={getFormdata} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Military Experience":
        return <MilitaryExperience setId={setId} values={submit} DoctorFormsView={DoctorFormsView} getFormdata={getFormdata} requestMsgPopUp={requestMsgPopUp} id={id} formname={formname} />;
      case "Additional Documents":
     
     return <AdditionalDocuments getFormdata={getFormdata} DoctorFormsView={DoctorFormsView} formname={formname} requestMsgPopUp={requestMsgPopUp} SetisSubmitted={SetisSubmitted} />;;
     case "Sanctions":
      return <Sanctions getFormdata={getFormdata} formname={formname} SetisSubmitted={SetisSubmitted} />;;
    
     case "Licensure":
        return <MedicalAndStateLicense setErrorMsg={setErrorMsg} setId={setId} setFormName={setFormName} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} category={childformname} providerId={providerId} uploadFile={Uploadfilessave} uploadeddata={uploadeddata} Deleteuploads={Deleteuploads} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Certification": return <BoardCertifications setErrorMsg={setErrorMsg} setFormName={setFormName} setId={setId} formname={formname} DoctorFormsView={DoctorFormsView} requestMsgPopUp={requestMsgPopUp} category={childformname} providerId={providerId} uploadFile={Uploadfilessave} uploadeddata={uploadeddata} Deleteuploads={Deleteuploads} setUpdateAppointmentList={setUpdateAppointmentList} />;
      case "Signatures": return childformname=="Board Summary"?<BoardSummary/>:<DOPFacilityView/>
      case "Log & Previleges": return <LogPrivileges/>
      default:
        break;
    }
  };

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
    console?.log(v,"vvvvvvvvv",AppointmentList[0])
    setErrorMsg(true)
    setFormName(v);
    setFormData(v?.formData);



    if (v?.formName != "Health Documents" || v?.formName != "Education & Training") {
      setStatus("")
    }

  };
  const openchild = (v, index) => {
    setErrorMsg(true)
    toggole(index, v)
    setChildFormName("")
  }
  useEffect(() => {
    if(formname?.formName!="Licensure"&&formname?.formName!="Certification"){
      getformdata()
    }
    // formname?.formName&& getformdata();
    // getuploadeddata();
  }, [formname, update, formname?.formName]);



  useEffect(() => {
    // getMessageList()
  }, []);
  useEffect(() => {
    if (id?.id||state?.id) {
      getMessageByForm(state?.id||id?.id)
    }
  }, [state,id?.id,update])
  console?.log(id,"checkId",state)
  useEffect(() => {
    getAllInformation();
  }, [providerId, update])



  useEffect(() => {
    if (providerId) {
      getAppointmentList()
    }

  }, [providerId, update, updateAppointmentList])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [formname?.formName])

console?.log("child",childformname,formname,id)
console?.log(AppointmentList,"AppointmentList")
  const setChildFormValue=(name)=>{
    setChildFormName(name)
  }


  return (
    <div className="row">

      {opemform && (
        <div className="show_header">
          <CredFormsMobile
            open={setOpenform}
            state={setOpenform}
            formname={formname}
            openForm={openForm}
            formList={AppointmentList || []}
          />
        </div>
      )}
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
            {doctordtails?.userName ? doctordtails?.userName : "-"}{" "}
          </div>
          <p className="doctor-profile-desig">{doctordtails?.roleName}</p>
          <div className="d-flex  gap-2 align-items-center justify-content-center mb-2">
            <div
              className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center pointer"
              style={{ opacity: "0.6" }}

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
            //    onClick={() => setSendMessageModal(true)}
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
            <div className="col-11 mediumf15 ">Reappointment</div>
            <div className="col-1 f15 " color="#3A3952">
              64%
            </div>
          </div>
        </div>
        <div
          className="btn btn-primary f12 mt-1"
          onClick={() => setOpenform(!opemform)}
        >
          <SiGoogleforms className="mb-1" size={12} /> All Forms
        </div>
        <div className="d-flex flex-wrap py-2  justify-content-between show_header ">
          <div className="col-sm-6 ">
            <div className="form-header mediumf15 ">{formname?.formName}</div>
          </div>
          <div className=" d-flex flex-column progress-bar-tab  ">
            <div>
              <label className="progressbartext" style={{ opacity: "1" }}>
                3 of 14 steps completed{" "}
              </label>
              <img
                src={incomplete}
                alt="cred"
                className="ms-3"
                style={{
                  objectFit: "fill",
                  height: "14px",
                  width: "14px",
                  opacity: "1",
                  borderColor: "#707070",
                  borderWidth: " 2px",
                }}
              />
            </div>
            <div className=" ">
              <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12  mt-1  ">
                <ProgressBar
                  now={(3 / 14) * 100}
                  style={{
                    borderRadius: "0",
                    height: "3px",
                    backgroundColor: "rgba(112, 112, 112, 0.3)",
                  }}
                  className="custom-progress-bar-forms"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex  containersgap">
        <div className="container-width3  mobile_Header   bg-white p-3 ">
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
              {doctordtails?.userName ? doctordtails?.userName : "-"}{" "}
            </div>
            <p className="doctor-profile-desig">{doctordtails?.roleName}</p>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
              <div
                className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center pointer"
                style={{ opacity: "0.6" }}
                onClick={

                  () => navigate(`/outpatientpro/facility/doctors/details/${providerId}`)
                // () => navigate(`/outpatientpro/provider/facility/facilityprofile/${providerId}`)
                }
              >
                <PiUserFill color="#c2c2c2" className="me-1 mb-1 " size={15} />
                Profile
              </div>
              <div
                className="rounded button-user-profile-1 p-3 d-flex justify-content-center align-items-center pointer"
                style={{ opacity: "0.6" }} onClick={() => setSendMessageModal(formname)}
              >
                {" "}
                <BiSolidSend color="#c2c2c2" className="me-1 mb-1" size={15} />
                Send Message
              </div>
            </div>
          </div>
          <div className="col-md-12 p-2 py-3 mb-2">
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
                {sessionStorage?.getItem("roleId") > 4 ? ((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length / (AppointmentList?.length - 1)) * 100)?.toFixed(2) : ((AppointmentList.slice(0, -1)?.filter((v) => v?.saveLog === "Yes")?.length / (AppointmentList?.length - 1)) * 100)?.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="col-md-12">
            {AppointmentList?.filter((v) => v?.formName)?.map((v, index) => {
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
                        onClick={() => !(v?.additionalData && v?.additionalData?.some((v) => v?.credCategory)) ? openForm(v, index) : openchild(v, index)}

                      >
                        <span>{v?.formName}</span>

                      </div>



                      {

                        <div
                          className="col-md-1 d-flex  align-items-center"

                        >


                          {(sessionStorage.getItem("roleId") == 5|| sessionStorage.getItem("roleId") == 6) && v?.finalSubmit === "Yes" && v?.requested == "No" &&
                            <IoIosCheckmarkCircle
                              color={formname?.formName == v?.formName ? "#0073E6" : "#00B948"}
                              size={16}
                              style={{ fontSize: "16px" }}
                            />
                          }
                          {sessionStorage.getItem("roleId") <= 4 && v?.saveLog === "Yes" && v?.finalLock == "Yes" &&
                            <IoIosCheckmarkCircle
                              color={formname?.formName == v?.formName ? "#0073E6" : "#00B948"}
                              size={16}
                              style={{ fontSize: "16px" }}
                            />
                          }
                          {
                           (sessionStorage.getItem("roleId") == 5|| sessionStorage.getItem("roleId") == 6) && v?.finalSubmit === "No" && v?.requested == "Yes"
                            &&
                            <IoAlertCircleSharp
                              color={formname?.formName == v?.formName ? "#0073E6" : "#D5352F"}
                              size={16}
                              style={{ fontSize: "16px" }}
                            />
                          }

                        </div>
                      }
                    </div>
                    <div>
                      {click == index && v?.additionalData && v?.additionalData?.map((sub, i) => {
                        return (
                          <>
                            {sub?.credCategory && <div
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
                                onClick={() => setChildFormValue(sub?.credCategory, i)}
                              >

                                <span>{sub?.credCategory}</span>

                              </div>


                              {

                                <div
                                  className="col-md-1 d-flex  align-items-center"

                                >
                                  {sessionStorage.getItem("roleId") == 5 && sub?.finalSubmit === "Yes" && sub?.requested == "No" &&
                                    <IoIosCheckmarkCircle
                                      color={childformname == sub?.credCategory ? "#0073E6" : "#00B948"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                  {sessionStorage.getItem("roleId") <= 4 && sub?.saveLog === "Yes" && v?.finalLock == "Yes" &&
                                    <IoIosCheckmarkCircle
                                      color={childformname == sub?.credCategory? "#0073E6" : "#00B948"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                  {
                                    sessionStorage.getItem("roleId") == 5 && sub?.finalSubmit === "No" && sub?.requested == "Yes"
                                    &&
                                    <IoAlertCircleSharp
                                      color={childformname == sub?.credCategory ? "#0073E6" : "#D5352F"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                  {/* {
                                    (sub?.finalSubmit === "Yes")
                                    &&
                                    <IoIosCheckmarkCircle
                                      color="#00B948"
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  } */}

                                </div>
                              }
                            </div>}</>

                        )
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
                    <label
                      className="progressbartext"
                      style={{ opacity: "1" }}
                    >
                      {/* 3 of 14 steps completed{" "} */}
                      {sessionStorage?.getItem("roleId") > 4 ?
                        <span>{AppointmentList?.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length} of {AppointmentList?.length - 1} steps completed{" "}</span> :
                        <span>{AppointmentList.slice(0, -1)?.filter((v) => v?.saveLog === "Yes")?.length} of {AppointmentList?.length - 1} steps completed{" "}</span>}
                      {/* {AppointmentList.slice(0,-1)?.filter((v) => v?.finalSubmit === "Yes")?.length} of {AppointmentList?.length - 1} steps completed{" "} */}
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
                        now={sessionStorage?.getItem("roleId") > 4 ? (AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length / (AppointmentList?.length - 1)) * 100 : (AppointmentList.slice(0, -1)?.filter((v) => v?.saveLog === "Yes")?.length / (AppointmentList?.length - 1)) * 100}
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

          {formname?.formName == " Federal Income Tax" ? (
            <div className=" row bg-white mt-2  px-3">
              <div className="   row ">
                {formData?.length > 0
                  ? formData?.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className={`col-md-${element?.width || 3} pt-3 `}
                      >
                        <div className="d-flex">
                          <div className="col-md-11">
                            {element?.heading &&
                              element?.type == "heading" && (
                                <div className=" formssubheading">
                                  {element?.label}
                                  {element?.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                              )}

                            {element?.label && element?.type != "heading" && (
                              <label>
                                {element?.label}
                                {element?.required && (
                                  <span className="text-danger">*</span>
                                )}
                              </label>
                            )}
                            {["text", "time", "file"]?.some(
                              (e, i) => e == element?.type
                            ) && (
                                <div>
                                  <input
                                    type={element?.type}
                                    name="value"
                                    placeholder={element?.placeholder}
                                    className="form-control"
                                    value={element?.value || ""}
                                    onChange={(event) =>
                                      handleChangeData(event, index)
                                    }
                                  />
                                </div>
                              )}
                            {element?.type === "date" && (
                              <div>
                                <DatePicker
                                  name="value"
                                  className="form-control py-2"
                                  minDate={new Date(1900, 1, 1)}
                                  maxDate={new Date()}
                                  onChange={(event) =>
                                    handleDateChange(event, index, `value`)
                                  }
                                  autoComplete="off"
                                  selected={
                                    element?.value
                                      ? new Date(element?.value)
                                      : new Date()
                                  }
                                  dateFormat="MM/dd/yyyy"
                                  placeholderText="MM/dd/yyyy"
                                  popperClassName="react-datepicker-popper"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  showIcon
                                  icon={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="#B2B2B2"
                                      class="bi bi-calendar"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                  }
                                />
                              </div>
                            )}
                            {element?.type === "upload" && (
                              <div>
                                <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                                  <div className="text-center py-2 mt-1 ">
                                    <IoCloudUploadOutline
                                      color="#9C9CA8"
                                      opacity={0.49}
                                      style={{
                                        height: "36px",
                                        width: "42px",
                                      }}
                                    />
                                    <div
                                      className="f18 px-4 mt-2"
                                      style={{
                                        height: "46px",
                                        color: "#3A3952",
                                      }}
                                    >
                                      Upload a copy of your license or <br />{" "}
                                      drag and drop in this box
                                    </div>

                                    <input
                                      type="file"
                                      id="fileInput"
                                      style={{ display: "none" }}
                                      accept=".pdf,.doc,.docx"
                                    //  onChange={(e) => handleFileUpload(e.target.files)}
                                    />

                                    <button
                                      className="  upload40 border"
                                      style={{ background: "#3A3952B3" }}
                                      onClick={() =>
                                        document
                                          .getElementById("fileInput")
                                          .click()
                                      }
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {element?.type === "Under Line" && (
                              <div className="underline py-3"></div>
                            )}

                            {element?.type === "textarea" && (
                              <div className=" ">
                                <textarea
                                  id={`field_${index}`}
                                  placeholder={element?.placeholder}
                                  className="form-control"
                                  value={element?.value || ""}
                                  name="value"
                                  onChange={(event) =>
                                    handleChangeData(event, index)
                                  }
                                ></textarea>
                              </div>
                            )}

                            {element?.type === "Signature" && (
                              <div
                                className=" "
                                style={{ maxWidth: "500px" }}
                              >
                                <SignatureCanvas
                                  // ref={signatureRef}
                                  canvasProps={{
                                    className: "signature-canvas border",
                                  }}
                                />
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                // onClick={handleClearSignature}
                                >
                                  Clear Signature
                                </button>
                              </div>
                            )}

                            {element?.type === "Select" && (
                              <div className=" ">
                                <select
                                  id={`field_${index}`}
                                  className="form-control"
                                >
                                  <option value="">{element?.label}</option>
                                  {element?.options?.map(
                                    (option, optionIndex) => (
                                      <option
                                        key={optionIndex}
                                        value={option}
                                      >
                                        {option?.value}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            )}

                            {element?.type === "checkbox" && (
                              <div className={`d-flex flex-wrap gap-2 `}>
                                {element?.options?.map((e, i) => (
                                  <div
                                    className={` d-flex  align-items-center gap-2 form-check`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`flexCheckDefaul${index}${i}`}
                                      value={e?.value}
                                      key={i}
                                      onChange={handleChangeCheckbox(
                                        e?.value.toLowerCase() + index,
                                        index
                                      )}
                                      checked={
                                        element[
                                        e?.value.toLowerCase() + index
                                        ] == e?.value
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefaul${index}${i}`}
                                      className="pointer text-black"
                                    >
                                      {e?.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                            {element?.type === "radio" && (
                              <div
                                className={"d-flex gap-2 align-items-center"}
                              >
                                {element?.options?.map((e, i) => (
                                  <div
                                    className={` d-flex  align-items-center gap-2 form-check`}
                                  >
                                    <input
                                      type="radio"
                                      name={`value${index}${i}`}
                                      className="form-check-input"
                                      id={`flexCheckDefaul${index}${i}`}
                                      onChange={handleChangeCheckbox(
                                        `value${index}`,
                                        index
                                      )}
                                      value={e.value}
                                      checked={
                                        element[`value${index}`] == e.value
                                      }
                                      key={i}
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefaul${index}${i}`}
                                      className="pointer text-black"
                                    >
                                      {e.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  : " no data found"}
              </div>

              {formData?.length > 0 && (
                <div className="py-3 ">
                  <hr className=" mt-5 " style={{ marginLeft: "10px" }} />
                  <div
                    className="saveandnext  d-flex justify-content-center align-items-center pointer"
                    onClick={submit}
                  >
                    Save & Continue
                  </div>
                </div>
              )}
            </div>
          ) : 
          <>{tabs()}

            {(formname?.formName!="Log & Previleges"&&formname?.formName!="Signatures"&&formname?.formName!="Sanctions"&&formname?.formName!="Additional Documents")&&<div className="bg-white row">
              {
                (formname && formname?.finalLock == "Yes" && sessionStorage?.getItem("roleId") <= 4 && formname?.saveLog == "No") && <div className='row pb-3'>
                  <div className='d-flex gap-3 mx-3'>
                    <button 
                    onClick={() => saveLogsForm("Yes")}
                    disabled={formname?.requested == "Yes"}
                      type="button"
                      className=" text-white col-md-2 f16 medium border rounded py-2 pointer"
                      style={{ background: formname?.requested == "Yes"?"#a1f2c0":"#00B948"}}
                    >
                      <FaCheckCircle size={14} /> Save & Log
                    </button>
                    <button
                      className="text-white text-center f16 medium col-md-2 border rounded py-2 col-md-auto pointer  "
                      onClick={() => setRequestModal(true)}
                      style={{ background: "#D4352F" }}
                    >
                      <BsFillQuestionCircleFill size={14} />  Request Edits
                    </button>
                  </div>

                </div>
              }
              {
                (formname && formname?.finalLock == "Yes" && sessionStorage?.getItem("roleId") <= 4 && formname?.saveLog == "Yes") && <div className='row py-2'>
                  <div className='col-md-2'>
                    <button
                      type="button"
                      className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                      style={{ background: "#D4352F" }}
                      onClick={() => saveLogsForm("No")}
                    >
                      Unlock & Edit
                    </button>
                  </div> </div>
              }

            </div>}

          </>
          }

        </div>
      </div>
      
      {
        requestModel && <RequestModal setState={setUpdate} show={setRequestModal} onHide={() => setRequestModal(false)} formData={formname} obj={id} state={state} providerId={providerId} childFormData={childformname} />
      }

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
