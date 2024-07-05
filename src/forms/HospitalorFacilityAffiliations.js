import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { usphoneFormat } from "../api_services/SharedServices";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import moment from "moment";
import { useParams } from "react-router-dom";

const HospitalorFacilityAffiliations = ({ values, getFormdata ,id,formname,DoctorFormsView,requestMsgPopUp}) => {
  const{formId}=useParams()
  const submit = () => {
    const checkForKeyEmpty = () => {
      for (let i = 0; i < data?.hospitalorFacilityAffiliations?.length; i++) {
        const obj = data?.hospitalorFacilityAffiliations[i];
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === "") {
            return "No";
          }
        }
      }
      return "Yes";
    };
    const greentick = checkForKeyEmpty();

    values(id,
      { hospitalorFacilityAffiliations: data?.hospitalorFacilityAffiliations },
      greentick
    );
  };
  const {
    data,
    writeData,
    writeMultiSelect,
    writeDate,
    removeItem,
    addItem,
    setValues,
    addObject,
    handleSubmit,
    errors,
  } = UseFormValidations({
    submit: submit,
  });
  const returnPatientError = (index, key) => {
    return errors &&
      errors?.hospitalorFacilityAffiliations?.length > 0 &&
      errors?.hospitalorFacilityAffiliations[index]?.[key] &&
      errors?.hospitalorFacilityAffiliations[index]?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control bg-white";
  };

  const returnPatientErrorSelect = (index, key) => {
    return errors &&
      errors?.hospitalorFacilityAffiliations?.length > 0 &&
      errors?.hospitalorFacilityAffiliations[index]?.[key] &&
      errors?.hospitalorFacilityAffiliations[index]?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };

  useEffect(() => {
    let obj = {
      hospitalorFacilityAffiliations:
        getFormdata?.hospitalorFacilityAffiliations || [
          {
            facilityName: "",
            facilityType: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            reappointmentDate: "",
            appontmentDate: "",
            appointmentExpirationDate: "",
            status: "",
          },
        ],
    };

    setValues(obj);
  }, [getFormdata]);

  return (
    <>
     {DoctorFormsView||formId? <form onSubmit={handleSubmit}>
        <div className="row p-2 mt-2 bg-white">
        {!formId&&requestMsgPopUp&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          {data?.hospitalorFacilityAffiliations?.map((v, i) => {
            return (
              <>
                {/* <div className="row py-1"> */}
                <div className="row">
                  <div className="col ">
              
                    <div className="policyInformation">
                      Hospital/Facility Name Information
                    </div>
                  </div>
                  <div className="col-md-auto mt-4 d-flex-justify-content-end">
                    {i > 0 && (
                      <button
                        className="remove pointer border "
                        onClick={() =>
                          removeItem("hospitalorFacilityAffiliations", i)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* </div> */}

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Facility Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className={returnPatientError(i, "facilityName")}
                      placeholder="Facility Name…"
                      name="facilityName"
                      value={v?.facilityName}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "facilityName"
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Facility Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={returnPatientErrorSelect(i, "facilityType")}
                      name="facilityType"
                      value={v?.facilityType}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "facilityType"
                      )}
                    >
                      <option value={""}>Select Type</option>
                      <option>Hospital</option>
                      <option>Diagnostic</option>
                      <option>Clinic</option>
                    </select>
                  </div>
                </div>
                <div className="formssubheading">Address </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <input
                      className={returnPatientError(i, "address")}
                      placeholder="Address…"
                      name="address"
                      value={v?.address}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "address"
                      )}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <input
                      className={returnPatientError(i, "city")}
                      placeholder="City"
                      name="city"
                      value={v?.city}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "city"
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className={returnPatientError(i, "state")}
                      placeholder="State"
                      name="state"
                      value={v?.state}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "state"
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className={returnPatientError(i, "zipCode")}
                      placeholder="Zip"
                      name="zipCode"
                      value={v?.zipCode}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "zipCode"
                      )}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <label>
                      Appontment Date <span className="text-danger">*</span>
                    </label>

                    <DatePicker
                      className={returnPatientError(i, "appontmentDate")}
                      selected={
                        v?.appontmentDate ? new Date(v?.appontmentDate) : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "hospitalorFacilityAffiliations",
                        "appontmentDate"
                      )}
                      autoComplete="off"
                      name="appontmentDate"
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

                  <div className="col-md-6">
                    <label>Reappointment Date</label>

                    <DatePicker
                      className={returnPatientError(i, "reappointmentDate")}
                      selected={
                        v?.reappointmentDate
                          ? new Date(v?.reappointmentDate)
                          : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "hospitalorFacilityAffiliations",
                        "reappointmentDate"
                      )}
                      autoComplete="off"
                      name="reappointmentDate"
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
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Appointment Expiration{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <DatePicker
                      className={returnPatientError(
                        i,
                        "appointmentExpirationDate"
                      )}
                      selected={
                        v?.appointmentExpirationDate
                          ? new Date(v?.appointmentExpirationDate)
                          : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "hospitalorFacilityAffiliations",
                        "appointmentExpirationDate"
                      )}
                      autoComplete="off"
                      name="appointmentExpirationDate"
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
                  <div className="col-md-6 ">
                    <label>
                      Current Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className={returnPatientErrorSelect(i, "status")}
                      name="status"
                      value={v?.status}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "status"
                      )}
                    >
                      <option value={""}>Select Status</option>
                      <option>Privileged</option>
                      <option>InActive</option>
                    </select>
                  </div>
                </div>

                <div className="formssubheading">Contact Information </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Contact Name <span className="text-danger">*</span>
                    </label>

                    <input
                      className={returnPatientError(i, "contactName")}
                      placeholder="First and Last Name…"
                      name="contactName"
                      value={v?.contactName}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "contactName"
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className={returnPatientError(i, "email")}
                      placeholder="Email"
                      name="email"
                      value={v?.email}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "email"
                      )}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Phone <span className="text-danger">*</span>
                    </label>

                    <input
                      className={returnPatientError(i, "phone")}
                      placeholder="Phone"
                      name="phone"
                      value={usphoneFormat(v?.phone)}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "phone"
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Fax</label>
                    <input
                      className="form-control"
                      placeholder="Fax"
                      name="fax"
                      value={usphoneFormat(v?.fax)}
                      onChange={writeData(
                        i,
                        "hospitalorFacilityAffiliations",
                        "fax"
                      )}
                    />
                  </div>
                </div>
                {/* <hr className='mt-4'/> */}
                <div className="mt-3">
                  {data?.hospitalorFacilityAffiliations?.length - 1 == i && (
                    <button
                      className="save border rounded text-white py-1 px-2"
                      onClick={() =>
                        addItem("hospitalorFacilityAffiliations", {
                          facilityName: "",
                          facilityType: "",
                          address: "",
                          city: "",
                          state: "",
                          zipCode: "",
                          reappointmentDate: "",
                          appontmentDate: "",
                          appointmentExpirationDate: "",
                          status: "",
                  
                        })
                      }
                    >
                      + Add Practice
                    </button>
                  )}
                </div>
                <hr className="mt-4" />
              </>
            );
          })}

          <div>
            <button
              type="submit"
              className="button border rounded text-white p-2"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>:
      <div className="bg-white row mt-2 px-3">
        {requestMsgPopUp&&requestMsgPopUp!=""&&<div className='my-2'>{requestMsgPopUp()}</div>}
      {
         data?.hospitalorFacilityAffiliations?.map((v,index)=>{
          return(
              <>
              <div className='row  py-2 pb-2'>
                 <h6 className='pt-2' >{`Hospital/Facility #${index+1}`}</h6> 
                 
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Facility Name</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.facilityName}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Facility Type</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.facilityType}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Address</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.address}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">City</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.city}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">State</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.state}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">ZiP Code</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.zipCode}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Appontment Date</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.appontmentDate&&moment(v?.appontmentDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Reappointment Date</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.reappointmentDate&&moment(v?.reappointmentDate).format("MM/DD/YYYY")}</label></div>
                 
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Appointment Expiration</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.appointmentExpirationDate&&moment(v?.appointmentExpirationDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Current Status</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.status}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Contact Name</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.contactName}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Email</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.email}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Phone</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.phone}</label></div>
                  <div className='col-md-4  py-2 '> <label className="label">Fax</label></div>
                  <div className='col-md-8   py-2 '> <label>{v?.fax}</label></div>
  
              </div>
              <hr className="row col-md-12"/>
             
             
              </>
          )
      })
      }
       
     </div>}
    </>
  );
};

export default HospitalorFacilityAffiliations;
