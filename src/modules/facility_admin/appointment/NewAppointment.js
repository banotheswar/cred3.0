import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoPricetags } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { DropdownMaster, getById, getList, save, saveApp } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import Creatable from "react-select/creatable";
import AddProfile from "./initialAppointmentTabs/AddProfile";
import ConfirmSend from "./initialAppointmentTabs/ConfirmSend";
import SelectCredentials from "./initialAppointmentTabs/SelectCredentials";
import BuildApplicationPacket from "./initialAppointmentTabs/BuildApplicationPacket";
import SelectFacility from "./initialAppointmentTabs/SelectFacility";
import SelectProvider from "./initialAppointmentTabs/SelectProvider";

const NewAppointment = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

 
  const [facility, setFacility] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [licence, setLicence] = useState([])
  const [template, setTemplate] = useState([])
  const [facilityDocumnet, setFacilityDocumnet] = useState([])
  const [form, setForm] = useState([])
  const { newappointment, provider, providerId } = useParams()
  const [appointmentData, setAppointmentData] = useState({})
  const [update, setUpdate] = useState([])
  const [childData, setChildData] = useState({})
  const [cred, setCred] = useState([])
  const [getByTemplates, setGetByTemplates] = useState({})
  const [detailsState, setDetailsState] = useState(newappointment == "reappointment" ? "Select Provider" : "Add Profile");
const [dop,setDop]=useState([])
  const submit = async (obj, state) => {
    let obj2 = {}
    obj?.facilityId?.map((v) => {
      obj2[v?.value || v] = v?.value || v
    })
    obj["facilityId"] = Object?.values(obj2)
    obj["type"] = provider
    obj["appointmentType"]=newappointment=="newappointment"&&"Initial Appointment"||newappointment=="onboardappointment"&&"Onboarding"||newappointment=="reappointment"&&"Reappointment"
    let jsonObjects = obj;
    let path= detailsState =="Select Credentials"||detailsState =="Build Application Packet"?urls?.Appointments?.saveAppointment:urls?.Appointments?.createProvider
    let res = await saveApp(path, { jsonObjects }, providerId);
    if (res?.data?.status) {
      setUpdate(res)
      navigate(`/outpatientpro/facility/appointment/${newappointment}/${provider}/${res?.data?.data}`)
      settingDetailstate(state)
    }
  }
  console?.log(providerId, "providerId")

  const specialityAll = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });

    setSpeciality(res)
  }





  // const licenceAll=async()=>{
  //   let jsonObjects = {
  //     type: "State Medical License",
  //   };
  //   let res = await getList(urls?.settings?.getStatesdd, { jsonObjects});
  //   setLicence(res)
  // }


  const allFacilityLocation = async () => {
    let jsonObjects = { facilityId: 0,

      userId:sessionStorage.getItem("userId"), 
      organizationId:sessionStorage.getItem("organizationId"),
      type:"Location",
     };
    let path=sessionStorage.getItem("roleId")==4?urls?.doctor.getLocationsById:urls?.settings?.getStatesdd
    let res = await getList(path, { jsonObjects })
    setFacility(res)
  }
  const specilityByTemplate = async (specialityId) => {
    let jsonObjects = {
      type: "package", providerType: provider,templateType: "Application", speciality: specialityId
    }
    let res = await getList(urls?.Appointments?.specialityByTemplate, { jsonObjects })
    setTemplate(res)
  }

  const facilityDocumnetByTemplate = async (specialityId) => {
    let jsonObjects = {
      type: "package", providerType: provider,templateType: "Facility Document", speciality: specialityId
    }
    let res = await getList(urls?.Appointments?.specialityByTemplate, { jsonObjects })
   setFacilityDocumnet(res)
  }
  const DOPByTemplate = async (specialityId) => {
    let jsonObjects = {
      type: "forms", providerType: provider,templateType: "DOP", speciality: specialityId
    }
    let res = await getList(urls?.Appointments?.specialityByTemplate, { jsonObjects })
   setDop(res)
  }



  const specilityByForm = async (specialityId) => {
    let jsonObjects = { type: "forms", providerType: provider, templateType: "Health Document", speciality: specialityId }
    let res = await getList(urls?.Appointments?.specialityByTemplate, { jsonObjects })
    setForm(res)

  }
  const specilityByCredForm = async (specialityId) => {
    let jsonObjects = { type: "forms", providerType: provider, templateType: "Credentialing", speciality: specialityId }
    let res = await getList(urls?.Appointments?.specialityByTemplate, { jsonObjects })
    setCred(res)

  }
  console?.log(providerId, "providerIdproviderId")
  // const getAllList = async () => {
  //   let jsonObjects = { userId: providerId };
  //   let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
  //   setAppointmentData(res)

  // };
  const { data, errors, headerlink, handleCheckbox, handleChange, handleEmailChange, handleSubmit } = UseFormValidations({


    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: ""
    },
    validationSchema: {
      firstName: {
        required: {
          value: true,
          message: "Please enter your Template Name",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      email: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
    },

    // submit:submit
  });

  const getAllList = async () => {
    let jsonObjects = { userId: providerId ,
      appointmentId:"0",
       appointmentType:newappointment=="newappointment"&&"Initial Appointment"||newappointment=="onboardappointment"&&"Onboarding"||newappointment=="reappointment"&&"Reappointment"
    };
    let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
    setAppointmentData(res)

  };

  useEffect(() => {
    headerlink([

      {
        name: "Create Appointment",
        link: "/outpatientpro/facility/appointment",
      },
      {
        name: "Search Provider",
        link: `/outpatientpro/facility/appointment/searchdoctor/${provider}`,
        active: true,
      },
      {
        name: "Initial Appointment",
        link: "/outpatientpro/facility/appointment/newappointment",
        active: true,
      },
    ]);

    specialityAll()
    DropdownMaster("State", setLicence)
    allFacilityLocation()
  }, []);
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[detailsState])

  const getAllUserTemplates = async () => {
    let jsonObjects = { userId: providerId,appointmentId:appointmentData?.appointmentId }
    let res = await getById(urls?.Appointments?.getUserTemplates, { jsonObjects })
    setGetByTemplates(res)
    console?.log(res, "setGetByTemplates")
  }

  useEffect(() => {
    let obj = childData?.speciality?.map((v) => v?.value)
    // let obj = childData?.speciality?.filter((v)=>v?.)
    if (childData && detailsState == "Build Application Packet") {

      specilityByTemplate(obj)
      specilityByForm(obj)
      facilityDocumnetByTemplate(obj)
      DOPByTemplate(obj)
    }
    if (childData && detailsState == "Select Credentials") {
      specilityByCredForm(obj)
    }
  }, [childData, detailsState])

  useEffect(() => {
    if (providerId) {
      getAllList();
      getAllUserTemplates();
    }

  }, [providerId, update])
  useEffect(() => {
    // getAppointmentList()
  }, [update,appointmentData?.appointmentId])

  const settingDetailstate = (name) => {

    setDetailsState(name);
  };


  const progressbarArraylist = () => {
    switch (newappointment) {
      case "newappointment": return ["Add Profile", "Select Facility(s)", "Build Application Packet", "Select Credentials", "Confirm & Send"];
      case "onboardappointment": return [
        "Add Profile",
        "Select Facility(s)",
        "Build Application Packet",
        "Select Credentials",
        "Begin Application",
      ];
      case "reappointment": return ["Select Provider", "Select Facility(s)", "Build Application Packet", "Select Credentials", "Confirm & Send"];;
    }
  }


  const tabs = () => {
    switch (detailsState) {
      case "Add Profile":
        return <AddProfile speciality={speciality} licence={licence} profileData={appointmentData} dataSubmit={submit} childObj={setChildData} />;
      case "Select Facility(s)":
        return <SelectFacility facility={facility} state={detailsState} appName={newappointment}  settingDetailstate={settingDetailstate} profileData={appointmentData} dataSubmit={submit} />;
      case "Build Application Packet":
        return <BuildApplicationPacket template={template} dop={dop} facilityDocumnet={facilityDocumnet}  setDetailsState={settingDetailstate} form={form} profileData={appointmentData} dataSubmit={submit} />;
      case "Select Credentials":
        return <SelectCredentials setDetailsState={setDetailsState} credList={cred} appName={newappointment} profileData={appointmentData} dataSubmit={submit} />;
      case "Confirm & Send":
        return <ConfirmSend providerId={providerId} provider={provider} appName={newappointment} profileData={appointmentData} settingDetailstate={settingDetailstate} form={form} setDetailsState={setDetailsState} template={getByTemplates} />;
        case "Begin Application":
          return <ConfirmSend providerId={providerId} provider={provider} appName={newappointment} profileData={appointmentData} settingDetailstate={settingDetailstate} form={form} setDetailsState={setDetailsState} template={getByTemplates} />;
         
          case "Select Provider":
          return <SelectProvider providerId={providerId} provider={provider} appName={newappointment} profileData={appointmentData} settingDetailstate={settingDetailstate} form={form} setDetailsState={setDetailsState} template={getByTemplates} childObj={setChildData} />;
         
      default:
        return <></>;
    }
  };
  const appType = () => {
    switch (newappointment) {
      case "newappointment": return ("Initial Appointment");
      case "onboardappointment": return ("Onboarding");
      case "reappointment": return ("Reappointment");
    }
  }
  return (
    <>
      <div className="bg-white px-3 py-3">
        <div className=" row  ">
          <div className="regularf30  regularf20">
            {appType()}: Build Application

          </div>
          <label className="f16 py-2">
            Follows these simple steps to build the application for your
            Provider. To customize any of these settings, go to{" "}
            <span className="link-hover-line">the Application Builder</span>
          </label>

          <div className=" border rounded mt-3">
            <div className="show_header mt-3">
              <div className=" d-flex  align-items-center rounded " style={{ overflow: "scroll" }}>
              {progressbarArraylist()?.map((e, i) => (
                <>
                <button className={detailsState === e||progressbarArraylist().indexOf(detailsState) >= i?"bg-primary btn col-auto text-white f16":"bg-white btn col-auto text-primary border f16"}
               
                style={{ borderRadius: "20px" }}>{i+1}</button>
                <span className="col-auto px-2 label f16" style={{paddingRight:"16px !important"}}>{e}</span></>))}
               
              </div>
            </div>
            <div className="mobile_Header">
              <div
                className="tab-scrolbar p-4 d-flex py-4  "
                ref={containerRef}
                style={{ overflowX: "auto" }}
              >
                {progressbarArraylist()?.map((e, i) => (
                  <div
                    className={
                      detailsState === e || progressbarArraylist().indexOf(detailsState) >= i
                        ? "border-left-0 border d-flex gap-2 active-bar text-white pointer"
                        : "border-left-0 border d-flex gap-2 not-active pointer rounded"
                    }
                    style={{ width: `${100 / 5}%` }}
                    key={i}
                  >
                    <div
                      className={
                        detailsState === e || progressbarArraylist().indexOf(detailsState) >= i
                          ? "border label d-flex align-items-center justify-content-center active-circle text-white"
                          : "bg-white border label d-flex align-items-center justify-content-center text-primary"
                      }
                      style={{
                        marginLeft: "-15px",
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={
                        detailsState === e || progressbarArraylist().indexOf(detailsState) >= i
                          ? "d-flex align-items-center justify-content-center label text-white"
                          : "d-flex align-items-center justify-content-center label"
                      }
                    >
                      {e}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {tabs()}
          </div>

        </div>
      </div>
    </>
  );
};

export default NewAppointment;
