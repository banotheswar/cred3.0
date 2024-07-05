import React, { useEffect, useRef, useState } from "react";
import { IoAlertCircleSharp, IoCheckmarkCircleSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosCheckmarkCircle, IoMdInfinite } from "react-icons/io";
import { UseFormValidations } from "../validations/UseFormValidation";
import {
  DropdownMaster,
  getList,
  phoneFormat,
  usphoneFormat,
} from "../api_services/SharedServices";
import moment from "moment";
import { useParams } from "react-router-dom";
const Education = ({setNotify,values,setStateObj,state ,DoctorFormsView,requestMsgPopUp,id,formname,setFormName,doctordtails}) => {
  const [speciality, setSpeciality] = useState([]);
const form=useRef({})
const{formId}=useParams()
form.current=formname
 
  const submit = async () => {
   let fomvalues = [
      { value: data?.educationType },
      { value: data?.institutionName },
      { value: data?.acgmeCode },
      { value: data?.startDate },
      { value: data?.endDate },
      { value: data?.email },
      { value: data?.specialty },
      { value: data?.phone },
      { value: data?.programDirectionName },
    ];

    const checkForKeyEmpty = () => {
      for (let i = 0; i < fomvalues?.length; i++) {
        const obj = fomvalues[i];
        for (const key in obj) {
          if (
            (obj.hasOwnProperty(key) && obj[key] === "") ||
            obj[key] === undefined
          ) {
            return "No";
          }
        }
      }
      return "Yes";
    };

    const greentick = checkForKeyEmpty();
    data["isSubmited"] = greentick;
    values(data,data, greentick);
  };
  const {
    data,
    errors,
    handleChange,
    setValues,
    handleDateChange,
    addObject,
    handleCheckbox,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
  } = UseFormValidations({
    submit: submit,
  });
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const emailErrorColor2 = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control";
  };

  const returnValue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };
  const add = () => {
    setValues( {id:"",educationType:"",institutionName:"",acgmeCode:"",startDate:"",endDate:"",email:"",specialty:"",phone:"",programDirectionName:""}
  );
  };

  useEffect(() => {
   
    if(id?.length!=0&&Array.isArray(id)){
    let array=id?.filter((v)=>v?.id==state?.id)
   let arrayTwo= array?.length!=0?array:id
   let obj=arrayTwo[0]?.["additionalData"]
    obj["id"]=arrayTwo[0]?.["id"]
    let objTwo=form.current
    objTwo["notify"] = arrayTwo[0]?.requested
    objTwo["saveLogKey"] = arrayTwo[0]?.saveLog
    setFormName(objTwo)
    setValues(obj);
    setStateObj(obj);
    setNotify(obj)
    }
    
  }, [id]);
  

  const dataChange=(obj,val)=>{
    setStateObj(obj)
    setNotify(obj)
    setValues(obj);
    formname["notify"] = val?.requested
    formname["saveLogKey"] = val?.saveLog
    let objTwo=formname
    setFormName(objTwo)
   
  }
 


 
  const checkedFn = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  const emailErrorColorSelect = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };
  useEffect(() => {
    DropdownMaster("Speciality", setSpeciality);
  }, []);
  console?.log(state?.id,id,"education")
  return (
    <>
     {!formId&&<div className="row p-2 mt-2 bg-white">
          <div className="col-md-8 d-flex gap-2">
            
              <div className="col-md-auto ">
                {Array.isArray(id)&&id?.length!=0&&
                  id?.map((v) => {
                    let obj=v?.additionalData
                    obj["id"]=v?.id
                    obj["requested"] =v?.requested
                    obj["saveLog"] =v?.saveLog
                    return (
                      <button
                        type="button"
                        onClick={() => dataChange(obj,v)}
                        className={
                          v?.additionalData?.educationType ==
                          (data?.educationType != undefined &&
                            data?.educationType)
                            ? `border pointer  ${v?.requested=="Yes"?"requestedactive-bar":"active-bar"} mx-1  text-white  p-2`
                            : "  border pointer  not-active   p-2 mx-1"
                            
                        }
                       
                      >
                        {v?.additionalData?.educationType != undefined &&
                          v?.additionalData?.educationType?.charAt(0).toUpperCase() + v?.additionalData?.educationType.slice(1)}
                        
                              {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId")==6)
                              // sessionStorage.getItem("roleId") == 5 
                              && v?.isSubmitted=="Yes" && <IoIosCheckmarkCircle
                className='mx-2'
                color={v?.additionalData?.educationType == data?.educationType ? "#ffff" : "#7E7E7E"}
                size={16}
                style={{ fontSize: "16px" }}
              />}

              {
              // (doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") <=3:sessionStorage?.getItem("roleId") <=4)
              sessionStorage.getItem("roleId") <= 4 
              && v?.isSubmitted == "Yes" &&v?.saveLog === "Yes" &&
                <IoIosCheckmarkCircle
                  color={v?.additionalData?.educationType == data?.educationType ? "#ffff" : "#7E7E7E"}
                  size={16}
                  style={{ fontSize: "16px" }}
                />
              }
              { v?.isSubmitted=== "No" && v?.requested == "Yes"
                &&
                <IoAlertCircleSharp
                  color={v?.additionalData?.educationType == data?.educationType ? "#ffff" :"#D5352F"}
                  size={16}
                  style={{ fontSize: "16px" }}
                />
              }
                      </button>
                    );
                  })}
              </div>
            
          </div>
          {/* sessionStorage?.getItem("roleId") > 4 */}
          {((doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") >3:sessionStorage?.getItem("roleId") >4)&&formname?.finalLock=="No") && <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="save text-white  border rounded py-2 px-2"
              onClick={add}
            >
              + Add Education Type
            </button>
          </div>}
        </div>}
     { DoctorFormsView||formId?<form onSubmit={handleSubmit}>
       
       
        <div className="row bg-white px-2 mt-2" style={{ minHeight: "130vh" }}>
        {!formId&&requestMsgPopUp!=""&&<div className='mt-4'>{requestMsgPopUp()}</div>}
          <div>
            <div className="formssubheading">General Information</div>
            <div className="row mt-3">
              <div className="col-md-6 ">
                <label>
                  Education Type <span className="text-danger">*</span>
                </label>
                <select
                  className={
                    data?.educationType
                      ? `  ${emailErrorColor2("educationType")}`
                      : ` ${emailErrorColor2("educationType")}`
                  }
                  name="educationType"
                  value={returnValue("educationType")}
                  onChange={handleChange("educationType")}
                >
                  <option value={""}>Select</option>
                  <option value={"undergraduate"}>Undergraduate</option>
                  <option value={"graduate"}>Graduate</option>
                  <option value={"medicalSchool"}>Medical School</option>
                  <option value={"internship"}>Internship</option>
                  <option value={"residency"}>Residency</option>
                </select>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <label>
                Institution Name <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("institutionName")}
                placeholder="Institution Name"
                name="institutionName"
                value={returnValue("institutionName")}
                onChange={handleChange("institutionName")}
              ></input>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>
                  Specialty <span className="text-danger">*</span>
                </label>
                {/* <input className={emailErrorColor("specialty")} placeholder='Specialty' name='specialty' value={returnValue("specialty")} onChange={handleChange("specialty")}></input> */}
                <select
                  className={`form-select ${emailErrorColorSelect(
                    "specialty"
                  )}`}
                  placeholder="Specialty"
                  name="specialty"
                  value={returnValue("specialty")}
                  onChange={handleChange("specialty")}
                >
                  <option value=""> Speciality</option>
                  {speciality &&
                    speciality?.map((v) => (
                      <option value={v?.specialityId}>
                        {v?.specialityName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6">
                <label>
                  ACGME Code <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("acgmeCode")}
                  placeholder="ACGME Code"
                  name="acgmeCode"
                  value={returnValue("acgmeCode")}
                  onChange={handleChange("acgmeCode")}
                ></input>
                {/* <label className='text-primary '><span>{<IoMdInfinite size={20} />}</span>Code Lookup</label> */}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>
                  Start Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  className={`${emailErrorColor("startDate")} py-2`}
                  minDate={new Date(1900, 1, 1)}
                  selected={data?.startDate && new Date(data?.startDate)}
                  autoComplete="off"
                  name="startDate"
                  onChange={(e) => {
                    handleDateChange(e, "startDate");
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="col-md-6">
                <label>
                  End Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  className={`${emailErrorColor("endDate")} py-2`}
                  minDate={new Date(1900, 1, 1)}
                  selected={data?.endDate && new Date(data?.endDate)}
                  autoComplete="off"
                  name="endDate"
                  onChange={(e) => {
                    handleDateChange(e, "endDate");
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            </div>
            <div className="formssubheading">Program Completed?</div>
            <div className="row px-2 mt-3">
              <div className="checkboxWithText  col-md-auto">
                <input
                  type="radio"
                  name="programYes"
                  value="programYes"
                  id="Yes"
                  checked={checkedFn("program", "programYes")}
                  onChange={handleCheckbox("program")}
                />
                <label for="Yes">Yes</label>
              </div>
              <div className="checkboxWithText  col-md-auto">
                <input
                  type="radio"
                  name="programNo"
                  value="programNo"
                  checked={checkedFn("program", "programNo")}
                  id="No"
                  onChange={handleCheckbox("program")}
                />
                <label for="No">No</label>
              </div>
            </div>
            <div className="formssubheading">Contact Information </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>
                  Program Director Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("programDirectionName")}
                  placeholder="Program Director Name "
                  name="programDirectionName"
                  value={returnValue("programDirectionName")}
                  onChange={handleChange("programDirectionName")}
                ></input>
              </div>
              <div className="col-md-6">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("email")}
                  placeholder="emcdaniel@gmail.com"
                  name="email"
                  value={returnValue("email")}
                  onChange={handleEmailChange("email")}
                ></input>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("phone")}
                  placeholder="(xxx) xxx-xxxx"
                  name="Phone"
                  value={usphoneFormat(data?.phone)}
                  onChange={handlePhoneChange("phone")}
                ></input>
              </div>
              <div className="col-md-6">
                <label>Fax </label>
                <input
                  className="form-control bg-white"
                  placeholder="Fax"
                  name="fax"
                  value={returnValue("fax")}
                  
                  onChange={handlePhoneChange("fax")}
                ></input>
              </div>
            </div>
            <hr className="formssubheading" />
            <button
              type="submit"
              className="button text-white col-md-2 border rounded py-2"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>:
<>

      <div className="row bg-white mt-2 px-3 py-3">
      {requestMsgPopUp()}
<div className="row">
<div className="col-md-4 border-0 border-bottom py-2"><label className="label"> Education Type</label></div>
{/* <div className="col-md-8 border-0 border-bottom py-2"><label>{data?.educationType}</label></div> */}
<div className="col-md-8 border-0 border-bottom py-2">
  <label>
    {data?.educationType ? data.educationType.charAt(0).toUpperCase() + data.educationType.slice(1) : ''}
  </label>
</div>

<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Institution Name</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.institutionName}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Specialty</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label className="">{data?.specialty}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">ACGME Code</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.acgmeCode}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Start Date</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.startDate&&moment(data?.startDate).format("MM/DD/YYYY")}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">End Date</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.endDate&&moment(data?.endDate).format("MM/DD/YYYY")}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Program Completed?</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.program&&(data?.program=="programNo"&&"No"||data?.program=="programYes"&&"Yes")}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Program Director Name</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label className="">{data?.programDirectionName}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Email</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{data?.email}</label></div>
<div className="col-md-4 border-0 border-bottom py-2"><label className="label">Phone</label></div>
<div className="col-md-8 border-0 border-bottom py-2"><label>{usphoneFormat(data?.phone)}</label></div>
<div className="col-md-4  py-2"><label className="label">Fax</label></div>
<div className="col-md-8  py-2"><label className="">{usphoneFormat(data?.fax)}</label></div>

</div>
<hr/>
      </div>
      </>}
    </>
  );
};
export default Education;
