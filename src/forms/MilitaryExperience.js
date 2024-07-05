import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import { notify } from "../api_services/SharedServices";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

const MilitaryExperience = ({ values, getFormdata, id ,formname,DoctorFormsView,requestMsgPopUp}) => {
  const [temp, setTemp] = useState("")
  const{formId}=useParams()
  const submit = () => {


    let fomvalues = temp == "Yes" ? [{ value: data?.rank },
    { value: data?.militaryExperience },
    { value: data?.branch },
    { value: data?.service },
    { value: data?.dichargType },
    { value: data?.serviceLocation }] : [{ value: data?.militaryExperience }]

    const someValueIsMissingData = fomvalues.some(item => item.value === undefined || item.value === '');
    const greentick = someValueIsMissingData == true ? "No" : "Yes"
    console?.log(greentick, "greentick")
    values(id, data, greentick);


  };

  const {
    data,
    errors,
    handleCheckbox,
    handleChange,
    handleSubmit,
    setValues,
  } = UseFormValidations({ submit: submit });





  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const emailErrorColorRadio = (key) => {
    return errors && errors?.[key]
      ? " bg-white  border-danger"
      : "  bg-white ";
  };
  const emailErrorColorSelect = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };
  
  let milatary=[
    {label:"Do you have military experience ? ",value:data?.militaryExperience&&((data?.militaryExperience=="militaryExperienceNo"&&"No")||(data?.militaryExperience=="militaryExperienceYes"&&"Yes"))}, {label:"Branch",value:data?.branch},
    {label:"Rank",value:data?.rank}, {label:"Role",value:data?.role}, {label:"Service #",value:data?.service}, 
    {label:"Discharge Type",value:data?.dichargType}, {label:"Last Military Location",value:data?.serviceLocation}, 
   ]

  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  useEffect(() => {
    setValues(getFormdata);
  }, [getFormdata]);
  useEffect(() => {
    setTemp(data?.militaryExperience == "militaryExperienceYes" ? "Yes" : "No")

  }, [data?.militaryExperience])
  console?.log(DoctorFormsView, "2", data);

  return (
    <>
      {DoctorFormsView ||formId? <form onSubmit={handleSubmit}>
        <div className="row p-2 mt-2 bg-white">
        {!formId&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          <div class="row py-1">
            <label className={`col-sm-12 col-form-label mt-3 ${emailErrorColorRadio("militaryExperience")}`}>
              Do you have military experience? <span className="text-danger">*</span>
            </label>
            <div class="col-sm-12 d-flex gap-3">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="militaryExperience"
                  value="militaryExperienceYes"
                  id="Yes"
                  checked={checkFun(
                    "militaryExperience",
                    "militaryExperienceYes"
                  )}
                  onChange={handleCheckbox("militaryExperience")}
                />

                <label for="Yes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="militaryExperience"
                  value="militaryExperienceNo"
                  id="No"
                  checked={checkFun("militaryExperience", "militaryExperienceNo")}
                  onChange={handleCheckbox("militaryExperience")}
                />
                <label for="No">No</label>
              </div>
            </div>
          </div>

          {data?.militaryExperience == "militaryExperienceYes" && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Branch <span className="text-danger">*</span>
                  </label>
                  <select
                    name="branch"
                    className={emailErrorColorSelect("branch")}
                    value={data?.branch}
                    onChange={handleChange("branch")}
                  >
                    <option value={""}>Select</option>
                    <option>Army</option>
                    <option>Marine Corps</option>
                    <option>Navy</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Rank <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("rank")}
                    name="rank"
                    placeholder="Rank"
                    value={data?.rank}
                    onChange={handleChange("rank")}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    name="role"
                    className={emailErrorColorSelect("role")}
                    value={data?.role}
                    onChange={handleChange("role")}
                  >
                    <option value={""}>Select</option>
                    <option>Captain</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Service # <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("service")}
                    name="service"
                    placeholder="Service"
                    value={data?.service}
                    onChange={handleChange("service")}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>
                    Discharge Type <span className="text-danger">*</span>
                  </label>
                  <select
                    name="dichargType"
                    className={emailErrorColorSelect("dichargType")}
                    value={data?.dichargType}
                    onChange={handleChange("dichargType")}
                  >
                    <option value={""}>Select</option>
                    <option>General</option>
                    <option>Honorable</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Last Military Service Location{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("serviceLocation")}
                    name="serviceLocation"
                    placeholder="Last Military Service Location"
                    value={data?.serviceLocation}
                    onChange={handleChange("serviceLocation")}
                  />
                </div>
              </div>
            </>
          )}

          <hr className="mt-5 " />
          <div className="py-3">
            <button
              type="submit"
              className="button text-white col-md-2 border rounded py-2"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form> :
        <div className='row bg-white mt-2 p-4' >
 {requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          {milatary?.map((v) => {
            return (
              <>
                <div className='row border-top-bottom py-2'>
                  {v?.heading && <h6 className='m-0 p-0 mt-4' >{v?.heading}</h6>}
                  <div className='col-md-3 px-2 label'>{v?.label}</div>
                  <div className='col-md-8 '> <label>{v?.value}</label></div>

                </div>

              </>
            )
          })}


         
         
        </div>
        }
    </>
  );
};

export default MilitaryExperience;
