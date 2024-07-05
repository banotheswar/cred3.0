import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { usphoneFormat } from "../api_services/SharedServices";
import moment from "moment";
import { useParams } from "react-router-dom";

const PracticeAffiliations = ({ values, getFormdata ,id,formname,DoctorFormsView,requestMsgPopUp}) => {
 
  const{formId}=useParams()
  const submit = () => {
    const checkForKeyEmpty = () => {
      for (let i = 0; i < data?.practiceAffiliations?.length; i++) {
        const obj = data?.practiceAffiliations[i];
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === "") {
            return "No";
          }
        }
      }
      return "Yes";
    };
    const greentick = checkForKeyEmpty();
    console?.log(greentick, "09098")
    values(id, { practiceAffiliations: data?.practiceAffiliations }, greentick);
  };
  const {
    data,
    errors,
    writeData,
    writeMultiSelect,
    handleSubmit,
    writeDate,
    removeItem,
    addItem,
    setValues,
    addObject,
  } = UseFormValidations({


    submit: submit,
  });
  console?.log(data?.practiceAffiliations, "data?.practiceAffiliations");
  const returnPatientError = (index, key) => {
    return errors &&
      errors?.practiceAffiliations?.length > 0 &&
      errors?.practiceAffiliations[index]?.[key] &&
      errors?.practiceAffiliations[index]?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control bg-white";
  };

  const returnPatientErrorSelect = (index, key) => {
    return errors &&
      errors?.practiceAffiliations?.length > 0 &&
      errors?.practiceAffiliations[index]?.[key] &&
      errors?.practiceAffiliations[index]?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };
  let fields=[{label:"Name",value:data?.firstName},{label:"Birth Date ",value:data?.birthDate},];
  useEffect(() => {
    let obj = {
      practiceAffiliations: getFormdata?.practiceAffiliations || [{
        practiceName: "",
        practiceType: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        practiceEndDate: "",
        practiceStartDate: "",
        status: "",
        phone: "",

      }],
    };

    setValues(obj);
  }, [getFormdata]);
  return (
    <>
     { DoctorFormsView||formId ?<form onSubmit={handleSubmit}>
        <div className="row p-2 mt-2 bg-white">
        {!formId&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          {data?.practiceAffiliations?.map((v, i) => {
            return (
              <>
                <div className="row mt-3">
                  <div className="col f20 medium"> Practice #{i+1}</div>
                  <div className="col-md-auto d-flex-justify-content-end">
                    {i > 0 && (
                      <button
                        className="remove pointer border rounded text-white p-1"
                        onClick={() => removeItem("practiceAffiliations", i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="formssubheading">Practice Information</div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Pratice Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className={returnPatientError(i, "practiceName")}
                      placeholder="Practice Name…"
                      name="practiceName"
                      value={v?.practiceName}
                      onChange={writeData(
                        i,
                        "practiceAffiliations",
                        "practiceName"
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Pratice Type <span className="text-danger">*</span>
                    </label>

                    <select
                      className={returnPatientErrorSelect(i, "practiceType")}
                      name="practiceType"
                      value={v?.practiceType}
                      onChange={writeData(
                        i,
                        "practiceAffiliations",
                        "practiceType"
                      )}
                    >
                      <option value={""}>Select Type</option>
                      <option> Orthopedic Clinic</option>
                      <option>Cardio Clinic</option>
                      <option>ENT Clinic </option>
                    </select>
                  </div>
                </div>
                <div className="formssubheading">
                  Address <span className="text-danger">*</span>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <input
                      className={returnPatientError(i, "address")}
                      placeholder="Address…"
                      name="address"
                      value={v?.address}
                      onChange={writeData(i, "practiceAffiliations", "address")}
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
                      onChange={writeData(i, "practiceAffiliations", "city")}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className={returnPatientError(i, "state")}
                      placeholder="State"
                      name="state"
                      value={v?.state}
                      onChange={writeData(i, "practiceAffiliations", "state")}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className={returnPatientError(i, "zipCode")}
                      placeholder="Zip"
                      name="zipCode"
                      value={v?.zipCode}
                      onChange={writeData(i, "practiceAffiliations", "zipCode")}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className={returnPatientError(i, "practiceStartDate")}
                      selected={
                        v?.practiceStartDate
                          ? new Date(v?.practiceStartDate)
                          : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "practiceAffiliations",
                        "practiceStartDate"
                      )}
                      autoComplete="off"
                      name="practiceStartDate"
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
                    <label>
                      End Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className={returnPatientError(i, "practiceEndDate")}
                      selected={
                        v?.practiceEndDate ? new Date(v?.practiceEndDate) : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "practiceAffiliations",
                        "practiceEndDate"
                      )}
                      autoComplete="off"
                      name="practiceEndDate"
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
                      Current Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className={returnPatientErrorSelect(i, "status")}
                      name="status"
                      value={v?.status}
                      onChange={writeData(i, "practiceAffiliations", "status")}
                    >
                      <option value={""}>Select Status</option>
                      <option >Active</option>
                      <option >InActive</option>
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
                        "practiceAffiliations",
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
                      onChange={writeData(i, "practiceAffiliations", "email")}
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
                      onChange={writeData(i, "practiceAffiliations", "phone")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Fax
                    </label>
                    <input
                      className="form-control"
                      placeholder="Fax"
                      name="fax"
                      value={usphoneFormat(v?.fax)}
                      onChange={writeData(i, "practiceAffiliations", "fax")}
                    />
                  </div>
                </div>
                {/* <hr className="mt-4" /> */}
                <div className="mt-3">
                  {data?.practiceAffiliations?.length - 1 == i && (
                    <button
                      className="save border rounded text-white px-2 py-1"
                      onClick={() =>
                        addItem("practiceAffiliations", {
                          practiceName: "",
                          practiceType: "",
                          address: "",
                          city: "",
                          state: "",
                          zipCode: "",
                          practiceEndDate: "",
                          practiceStartDate: "",
                          status: "",
                          phone: "",
                          email: ""
                        })
                      }
                    >
                      + Add Hospital
                    </button>
                  )}
                </div>

                <hr className="mt-4" />
              </>
            );
          })}
          <div className="mt-2">
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
         {requestMsgPopUp!=""&&<div className='my-2'>{requestMsgPopUp()}</div>}
      {
         data?.practiceAffiliations?.map((v,index)=>{
          return(
              <>
              <div className='row  py-2 pb-2'>
                 <h6 className='pt-2' >{`Practice #${index+1}`}</h6> 
                 
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Pratice Name</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.practiceName}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Pratice Type</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.practiceType}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Address</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.address}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">City</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.city}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">State</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.state}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">ZiP Code</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.zipCode}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Start Date</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.practiceStartDate&&moment(v?.practiceStartDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">End Date</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.practiceEndDate&&moment(v?.practiceEndDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Current Status</label></div>
                  <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.status}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Contact Name </label></div>
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

export default PracticeAffiliations;
