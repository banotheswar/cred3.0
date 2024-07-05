import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { useParams } from "react-router-dom";
import { getById, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
const SignSubmit = ({setupdate1,doctordtails,AppointmentList,formname}) => {
  const { providerId } = useParams();
  const [update,setUpdate]=useState()
  const [userData,setUserData]=useState({})


  const submit =async()=>{
    let jsonObjects = {
      userId:providerId,
      firstName:data?.firstName,
      middleName:data?.middleName,
      lastName:data?.lastName,
      templateType: "Sign & Submit",
      type: "Sign & Submit",
      isSubmitted:"Yes",
      percentage:100.00,
      appointmentId:formname?.appointmentId,
      documentData:[{todayDate:data?.todayDate}]
    };
    
    let res = await save(urls?.forms?.updateBasicInfo, { jsonObjects });
    setupdate1(res)
    setUpdate(res)
  }


  const {
    data,
    errors,
    handleCheckbox,
    setValues,
    handleSubmit,
    handleChange,
    handleDateChange,
  } = UseFormValidations({
    initialValues: {
      firstName: "",
      lastName: "",
      todayDate: "",
      // authorization:"",
 
    },
    validationSchema: {
      firstName: {
        required: {
          value: true,
          message: "Please Select Facility Document Template",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter your Template Name",
        },
      },
      todayDate: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      // authorization: {
      //   required: {
      //     value: true,
      //     message: "Please enter your Last Name",
      //   },
      // },


  

    },

    submit: submit,
  });


  const getUserData =async()=>{
    let jsonObjects = {
      appointmentId:doctordtails?.appointmentId,
      formId:0,
      type: "Sign & Submit",
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    setUserData(res?.documentData&&res?.documentData[0]||[])
  }

  
  
  useEffect(()=>{
    getUserData()
   
  },[providerId,update])

  const isCheck=(key,value)=>{
console.log(value,"636848")
    return  data?.[key]&& data?.[key]==value?true:false
    }
    
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };

  
 useEffect(()=>{
  userData["firstName"]=doctordtails?.firstName
  userData["middleName"]=doctordtails?.middleName
  userData["lastName"]=doctordtails?.lastName
 
  setValues(userData)},[doctordtails,userData])
 console.log(data?.authorization=="Yes"&&AppointmentList?.filter((v) => v?.finalSubmit === "Yes")?.length == (AppointmentList?.length - 1),"tete",(data?.authorization!="Yes"&&AppointmentList?.filter((v) => v?.finalSubmit === "Yes")?.length == (AppointmentList?.length - 1)))
  return (
    <>
   <form onSubmit={handleSubmit}>
   <div className="row p-3 mt-2 bg-white">
        <div className="col-md-12 " style={{textAlign:"justify"}}>
          <p>
            I understand and acknowledge that, as an applicant for
            medical/professional staff at the hospital or ambulatory care
            center, state and county medical society membership, or affiliation
            with a health care network or plan (hereafter referred ot as
            “Organizations”) indicated in this Application, it is my
            responsibility ot provide sufficient information upon which a proper
            evaluation can be undertaken of my current licensure, relevant
            training and/or experience, current competence, judgment, health
            status, character, ethics and any other criteria adopted by
            Organizations for medical/professional staff membership or medical
            and/or surgical privileges or affiliation.
          </p>

          <p>
            I further acknowledge that I am responsible for knowing the contents
            of the bylaws, rules and regulations of the Organizations and their
            medical/ professional staffs and agree to be bound by them if
            granted membership and/or privileges or affiliation.
          </p>
          <p>
            I y submitting this Application, I agree and consent ot such
            investigation activities of Acme and Organizations as follows:
          </p>
          <p>
            Authorization of Investigation and Release of Information Concerning
            Application for Appointment. | authorize al individuals,
            institutions and entities, including but not limited ot
            administrators and members of the medical/professional staffs of
            other facilities, organizations or institutions with which I have
            been associated and all professional liability insurers with which I
            have had or currently have professional liability insurance, who
            have knowledge concerning information requested in this Application,
            who have knowledge concerning information requested in this
            Application, ot consult with and release relevant information ot
            Acme and Organizations, their medical/professional staffs,
            credentialing committees and agents.
          </p>
          <p>
            Release from Liability. I hereby release from liability Acme and
            their respective agents, and all other individuals, institutions and
            entities providing information in accordance with the authorizations
            contained herein for their acts performed in good faith and without
            malice in connection with the investigation of this Application for
            Appointment. This release shall be cumulative and in addition ot any
            other applicable immunities provided by law for medical care review
            activities.
          </p>

          <p>
            Use of Information. acknowledge that part of the information ot be
            provided by me is for identification purposes only and will not be
            used ot form the basis of decisions regarding medical/professional
            staff membership or credentialed status.
          </p>
          <p>
            I understand and agree that the authorizations I have provided are
            irrevocable so long as I am an applicant for or have
            medical/professional staff privileges at or am affiliated with any
            Organizations participating in Acme’s central verification service.
          </p>
          <p>
            I acknowledge that the investigation of information in this
            Application by the Organizations, Acme and their agents is done ot
            achieve maintain and improve quality patient care.
          </p>
          <p>

            I pledge ot provide continuous care for each of my patients and
            recognize my responsibilities therein.
          </p>
          <p>
            I consent to an inspection of my records and agree ot an interview
            if requested.
          </p>
          <p>
            All information provided by me in the Application is true and
            complete ot the best of my knowledge and belief. I understand and
            agree that any material misstatement in or omission from the
            Application may constitute grounds for denial of appointment or for
            summary dismissal from the medical/professional staff. I understand
            and acknowledge that the Organizations shall be solely responsible
            for all decisions concerning medical/professional staff membership
            and the granting of medical and/or surgical privileges or
            credentialed status. Medical/professional staff membership are
            determined independently. I further understand and acknowledge that
            Acme has no responsibility or liability with respect to
            medical/professional staff membership or credentialing decisions by
            Organizations.
          </p>
        </div>

        <div className="checkboxWithText1 col-md-12 ">
          <input
            type="checkbox"
            name={"authorization"}
            value={"Yes"}
            checked={isCheck("authorization","Yes")}
            onChange={handleCheckbox("authorization")}
            id="authorization"
          />


          
          <label for="authorization" className="">
            {" "}
            I further acknowledge that I have read and understand the foregoing
            Authorization and Release.
          </label>
        </div>
        {/* {errors && errors.authorization && (
                  <p className="text text-danger">{errors.authorization}</p>
                )} */}

        <div className="col-md-3">
          <label className="f15 medium">
            First Name <span className="text-danger">*</span>
          </label>
          <input
              className={emailErrorColor("firstName")}
              value={data?.firstName}
              onChange={handleChange("firstName")}
              placeholder="First Name"
            ></input>
        </div>
        <div className="col-md-2">
          <label className="f15 medium">Middle Initial</label>
          <input
              className="form-control bg-white"
              value={data?.middleName}
              onChange={handleChange("middleName")}
              placeholder="Middle Name"
            ></input>
        </div>
        <div className="col-md-3">
          <label className="f15 medium">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
              className={emailErrorColor("lastName")}
              value={data?.lastName}
              onChange={handleChange("lastName")}
              placeholder="Last Name"
            ></input>
        </div>
        <div className="col-md-4">
          <label className="f15 medium">Today’s Date <span className="text-danger">*</span></label>
          <DatePicker
             className={`${emailErrorColor("todayDate")} py-2`}
             minDate={new Date(1900, 1, 1)}
             selected={data?.todayDate && new Date(data?.todayDate)}
             autoComplete="off"
             name="todayDate"
             onChange={(e) => {
                 handleDateChange(e, "todayDate");
             }}
             dateFormat="MM/dd/yyyy"
             placeholderText="MM/DD/YYYY"
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

        <hr className="mt-4" />

        <div>
          <button type="submit" className={data?.todayDate&&data?.authorization=="Yes"&&AppointmentList.slice(0,-1)?.filter((v) => v?.finalSubmit === "Yes")?.length == (AppointmentList?.length - 1)?"save rounded border text-white p-2 pointer":`savedisable rounded border text-white p-2 `} 
          disabled={!(data?.todayDate&&data?.authorization=="Yes"&&AppointmentList.slice(0,-1)?.filter((v) => v?.finalSubmit === "Yes")?.length == (AppointmentList?.length - 1))}>
            Accept & Sign
          </button>
        </div>
      </div>
   </form>
    </>
  );
};

export default SignSubmit;
