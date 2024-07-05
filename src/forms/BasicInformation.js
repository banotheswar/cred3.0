import React, { useEffect, useRef } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getById, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import { useParams } from "react-router-dom";
import moment from "moment";

const BasicInformation = ({
  setupdate1,
  getFormdata,
  doctordtails,
  formname,
  requestMsgPopUp,
  setId,
  id,
  DoctorFormsView,
  AppointmentList
}) => {
  const { providerId } = useParams();
  const datePickerRef = useRef(null);
  console?.log(id?.isSubmitted,"iiii")
  const submit = async () => {
    let jsonObjects = {
      userId: providerId,
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      dob: data?.dob,
      templateType: "Basic Information",
      type: "Basic Information",
      appointmentId: formname?.appointmentId,
      percentage:(id?.isSubmitted!="Yes")?(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100)?.toFixed(2):(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length)/(AppointmentList?.length - 1)) *100)?.toFixed(2),
      isSubmitted:"Yes",
      documentId:id?.id ? id?.id : 0
    };
    let res = await save(urls?.forms?.updateBasicInfo, { jsonObjects });
    setupdate1(res);
  };
console?.log(id,"formnameformname121",id?.id)
  const {
    data,
    errors,
    handleChange,
    handleDateChange,
    setValues,
    handleSubmit,
  } = UseFormValidations({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
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
      dob: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
    },
    submit: submit,
  });

  let fields = [
    { label: "Name", value: data?.firstName + " " + data?.lastName },

    {
      label: "Birth Date ",
      value: moment(data?.birthDate)?.format("MM/DD/YYYY"),
    },
  ];

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const getUserDocData = async () => {
    let jsonObjects = {
      appointmentId: formname?.appointmentId,
      formId: 0,
      type: "Basic Information",
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    setId(res)
  }
  useEffect(() => {
    setValues(doctordtails);
  }, [doctordtails]);


  useEffect(()=>{
    if(formname?.appointmentId){
      getUserDocData()
    }
    
  },[formname?.appointmentId])

  return (
    <>
      {DoctorFormsView ? (
        <form onSubmit={handleSubmit}>
          <div className="row py-2   mt-2 bg-white ">
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mb-3 px-4">{requestMsgPopUp()}</div>
            )}
            <div className="">
              <div className="formssubheading mt-4">Your Name</div>

              <div className="row mt-1">
                <div className="row mt-1">
                  <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
                    <label>
                      First Name <span className="text-danger"> * </span>
                    </label>
                    <input
                      className={emailErrorColor("firstName")}
                      value={data?.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
                    <label>Middle Name</label>
                    <input
                      className="form-control bg-white"
                      value={data?.middleName}
                      onChange={handleChange("middleName")}
                      placeholder="Middle Name"
                    />
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
                    <label>
                      Last Name <span className="text-danger"> * </span>
                    </label>
                    <input
                      className={emailErrorColor("lastName")}
                      value={data?.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12 mt-2">
                    <label>
                      Date Of Birth <span className="text-danger"> * </span>
                    </label>
                    <div
                      className="position-relative"
                      onClick={() => datePickerRef.current.setFocus()}
                    >
                      <DatePicker
                        ref={datePickerRef}
                        className={`${emailErrorColor("dob")} py-2`}
                        minDate={new Date(1900, 1, 1)}
                        selected={data?.dob && new Date(data?.dob)}
                        autoComplete="off"
                        name="dob"
                        onChange={(e) => handleDateChange(e, "dob")}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/DD/YYYY"
                        popperClassName="react-datepicker-popper"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="#B2B2B2"
                        className="bi bi-calendar position-absolute"
                        style={{
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />
              <div className="py-3">
                <button
                  type="submit"
                  className="button text-white col-md-2 border rounded py-2"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
<div className="bg-white mt-2 p-4 row " >        <div className="  ">
          {requestMsgPopUp && requestMsgPopUp != "" && (
            <div className="mb-3 px-4">{requestMsgPopUp()}</div>
          )}
          {fields?.map((v) => {
            return (
              <>
                <div className="row border-top-bottom py-2 ">
                  {v?.heading && <h6 className="m-0 p-0 mt-4">{v?.heading}</h6>}
                  <div className="col-md-3 px-2 label">{v?.label}</div>
                  <div className="col-md-8 ">
                    {" "}
                    <label>{v?.value}</label>
                  </div>
                </div>
              </>
            );
          })}
        </div></div>
      )}
    </>
  );
};

export default BasicInformation;
