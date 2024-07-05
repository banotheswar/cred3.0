
import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import {
  getList,
  phoneFormat,
  usphoneFormat,
} from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import Select from "react-select";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
const PracticeInformation = ({ values, getFormdata ,id,formname,requestMsgPopUp,DoctorFormsView}) => {
  const [Speciality, setSpeciality] = useState();
  const [statesList, setStatesList] = useState([]);
  const{formId}=useParams()
  console?.log(id?.isSubmitted,"iiiip")
  const specialityAll = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });
    setSpeciality(res);
  };
  const getStatesList = async () => {
    let jsonObjects = {
      type: "State",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setStatesList(res);
  };
  const submit = () => {
    let fomvalues=[{value:data?.sponsorPhysician},{value:data?.practiceAddress},{value:data?. practiceCity},
      {value:data?.state},{value:data?.practiceZipCode},{value:data?.practicePhone},
      {value:data?.practiceEmail},{value:data?. practiceFax},{value:data?.practiceContactName},
      {value:data?.practiceType},{value:data?.speciality},{value:data?.subspecialties}
  ]
  const someValueIsMissingData = fomvalues.some(item => item.value === undefined ||item.value === '');
  const greentick =  someValueIsMissingData==true?"No":"Yes"
    values(id,data,greentick);
  };
  const {
    data,
    errors,
    headerlink,
    handleNumberChange,
    handleCheckbox,
    handleChange,
    handleEmailChange,
    handleSubmit,
    handlePhoneChange,
    setValues,
    handleMultiSelect,
  } = UseFormValidations({
    submit: submit,
  });
  const emailErrorColorSelect = (key) => {
    return errors && errors?.[key]
    ? "form-select bg-white border border-danger"
    : "form-select bg-white";
  };
  const emailErrorColorRadio = (key) => {
    return errors && errors?.[key] ? " bg-white  border-danger" : "  bg-white ";
  };
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const isCheck = (value) => {
    return data?.[value] == value ? true : false;
  };
  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };
  const dataValue = (key) => {
    return data?.[key] && data?.[key] != "" ? data?.[key] : "";
  };
  let practiceInformation=[
    {label:"Are you an independent practitioner or sponsored by a Physician?",value:data?.physiciansponsored}, {label:"Sponsoring Physician/Practice",value:data?.sponsorPhysician},
     {label:"Address",value:data?. practiceCity}, {label:"Office Contact Name",value:data?.practiceContactName}, {label:"Phone",value:data?.practicePhone},
     {label:"Email",value:data?.practiceEmail}, {label:"Fax",value:data?. practiceFax},
     {label:"Specialties",value:data?.speciality?.map((v)=>v?.label)}, {label:"Subspecialties",value:data?.subspecialties}, {label:"Practice Type",value:data?.practiceType},
     {label:"Names of Partners",value:""} ,{label:"Tax ID"},
     {heading:"Second Office"},{label:"Secondary Practice Name"},
      {label:"Address"}, {label:"Office Contact Name"},
      {label:"Phone"}, {label:"Email"}, {label:"Fax"}
  ]
  
  useEffect(() => {
    setValues(getFormdata);
  }, [getFormdata]);
  useEffect(() => {
    specialityAll();
  }, []);
  useEffect(() => {
    getStatesList();
  }, []);

  return (
    <>
      {DoctorFormsView||formId?<form onSubmit={handleSubmit}>
        <div className="row px-4 py-4  mt-2 bg-white">

        {!formId&&requestMsgPopUp&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          <div className={`f17 medium mt-2 `}>
            Are you an independent practitioner or sponsored by a Physician?
          </div>
          {[
            "Independent",
            "Physician-sponsored",
            "Other (organization, etc.)",
          ]?.map((v) => (
            <div className="">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name={"physiciansponsored"}
                  checked={data?.physiciansponsored == v}
                  value={v}
                  onChange={handleCheckbox("physiciansponsored")}
                  id={v}
                />
                <label for={v}>{v}</label>
              </div>
            </div>
          ))}
          <div className="row mt-4">
            <div className="col-xl-6 col-lg-6 col-md-12  col-sm-12">
              <div className="f17 medium ">
                Sponsoring Physician/Practice{" "}
                <span className="text-danger">*</span>
              </div>
              <input
                className={emailErrorColor("sponsorPhysician")}
                placeholder="Sponsoring Physician/Practice"
                value={data?.sponsorPhysician}
                onChange={handleChange("sponsorPhysician")}
              ></input>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 mt-3">
            <div className="mt-4 f17 medium mb-3">
              Address <span className="text-danger">*</span>
            </div>
            <input
              placeholder="Address"
              className={emailErrorColor("practiceAddress")}
              value={data?.practiceAddress}
              onChange={handleChange("practiceAddress")}
            ></input>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12  mt-2">
            <input
              className={emailErrorColor("practiceCity")}
              value={data?.practiceCity}
              onChange={handleChange("practiceCity")}
              placeholder="City"
            ></input>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12  mt-2">
            {/* <input
              className={emailErrorColor("prcticestate")}
              value={data?.prcticestate}
              onChange={handleChange("prcticestate")}
              placeholder="State"
            ></input> */}
                 <select
                    className={`form-select ${emailErrorColorSelect("state")}`}
                    value={dataValue("state")}
                    name="state"
                    onChange={handleChange("state")}
                  >
                    <option value="">Select State</option>
                    {statesList?.map((e, i) => {
                      return (
                        <option  value={e.stateId}>
                          {e.stateName}
                        </option>
                      );
                    })}
                  </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12 mt-2">
            <input
              className={emailErrorColor("practiceZipCode")}
              value={data?.practiceZipCode}
              maxLength={5}
              // onChange={handleChange("practiceZipCode")}
              onChange={handleNumberChange("practiceZipCode")}
              placeholder="Zip Code"
            ></input>
          </div>
          <div className="mt-5 f17 medium ">
            Office Contact <span className="text-danger">*</span>
          </div>
          <div className="row">
            {" "}
            <div className=" col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
              <label>
                Contact Name <span className="text-danger">*</span>
              </label>
              <input
                placeholder="Contact Name"
                className={emailErrorColor("practiceContactName")}
                value={data?.practiceContactName}
                onChange={handleChange("practiceContactName")}
              ></input>
            </div>
            <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
              <label>
                Phone <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("practicePhone")}
                placeholder="(xxx) xxx-xxxx"
                name="practicePhone"
                value={usphoneFormat(data?.practicePhone)}
                onChange={handlePhoneChange("practicePhone")}
              ></input>
            </div>
            <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("practiceEmail")}
                placeholder="emcdaniel@gmail.com"
                name="practiceEmail"
                value={data?.practiceEmail}
                onChange={handleEmailChange("practiceEmail")}
              ></input>
            </div>
            <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
              <label>
                Fax <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("practiceFax")}
                placeholder="Fax"
                name="practiceFax"
                value={usphoneFormat(data?.practiceFax)}
                onChange={handlePhoneChange("practiceFax")}
              ></input>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6  col-md-12  mt-5 " >
            <div
              className="f17 medium"
            >
              Specialties (select all that apply){" "}
              <span className="text-danger">*</span>
            </div>
            <div className="col-md-12 mt-3">
              {/* {Speciality?.map((v) => {
              return (
                <div className="checkboxWithText1 col-md-6">
                  <input type="checkbox" name={"speciality"} checked={isCheck(v?.specialityId)} value={v?.specialityId} id={v?.specialityId} onChange={handleCheckbox(v?.specialityId)}/>
                  <label for={v?.specialityId} className="">
                    {v?.specialityName}
                  </label>
                </div>
              );
            })} */}
              <Select
                isMulti
                className={
                  errors && errors?.["speciality"]
                    ? "border border-danger col-md-12 rounded"
                    : " col-md-12"
                }
                onChange={handleMultiSelect("speciality")}
                value={data?.speciality}
                options={Speciality?.map((v) => {
                  return { label: v?.specialityName, value: v?.specialityId };
                })}
              ></Select>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6  col-md-12 mt-5">
            <div className="f17 medium ">
              Subspecialties <span className="text-danger">*</span>
            </div>
            <textarea
              className={emailErrorColor("subspecialties")}
              value={data?.subspecialties}
              onChange={handleChange("subspecialties")}
              style={{ minHeight: "180px" }}
            ></textarea>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="row mt-4">
              <div
                className={`f17 medium ${emailErrorColorRadio("practiceType")}`}
              >
                Practice Type <span className="text-danger">*</span>
              </div>
              {["Group", "Corporation", "Solo", "Other", "Partnership"]?.map(
                (v) => (
                  <div className="col-md-6 ">
                    <div className="checkboxWithText gap-1 ">
                      <input
                        type="radio"
                        name={"practiceType"}
                        checked={data?.practiceType == v}
                        value={v}
                        onChange={handleCheckbox("practiceType")}
                        id={v}
                      />
                      <label for={v}>{v}</label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 mt-4">
            <div className="f17 medium">Tax ID #</div>
            <input
              className={emailErrorColor("taxId")}
              name="taxId"
              value={data?.taxId}
              onChange={handleChange("taxId")}
              placeholder="Tax ID"
            ></input>
          </div>
          {data && data?.practiceType == "Partnership" && (
            <div className="col-xl-6 col-lg-6 col-md-12 mt-5">
              <div className="f17 medium">Names of Partners</div>
              <textarea
                className="form-control  bg-white "
                value={data?.partnersName}
                onChange={handleChange("partnersName")}
                style={{ minHeight: "100px" }}
              ></textarea>
            </div>
          )}
          {data && data?.practiceType == "Group" && (
            <div className="col-xl-6 col-lg-6 col-md-12 mt-5">
              <div className="f17 medium">Name of Group</div>
              <textarea
                className="form-control  bg-white "
                value={data?.groupName}
                onChange={handleChange("groupName")}
                style={{ minHeight: "100px" }}
              ></textarea>
            </div>
          )}
          {data && data?.practiceType == "Corporation" && (
            <div className="col-xl-6 col-lg-6 col-md-12 mt-5">
              <div className="f17 medium">Name of Corporation</div>
              <textarea
                className="form-control  bg-white "
                value={data?.groupName}
                onChange={handleChange("groupName")}
                style={{ minHeight: "100px" }}
              ></textarea>
            </div>
          )}
          {data && data?.practiceType == "Other" && (
            <div className="col-md-6 mt-4">
              <div className="f17 medium">
                Please specify
                {/* <span className="text-danger">*</span> */}
              </div>
              <input
                className="form-control  bg-white "
                value={data?.specifyOthers}
                onChange={handleChange("specifyOthers")}
                placeholder="Please specify"
              ></input>
            </div>
          )}

<hr className="mt-5 " />
          <div className="mt-4 f17 medium">
            Does this Practice have a second office?
          </div>
          <div className="checkboxWithText ">
            <input
              type="radio"
              name="secondOffice"
              value="secondOfficeYes"
              id="Yes"
              checked={checkFun("secondOffice", "secondOfficeYes")}
              onChange={handleCheckbox("secondOffice")}
            />
            <label for="Yes">Yes</label>
          </div>
          <div className="checkboxWithText ">
            <input
              type="radio"
              name="secondOffice"
              value="secondOfficeNo"
              id="No"
              checked={checkFun("secondOffice", "secondOfficeNo")}
              onChange={handleCheckbox("secondOffice")}
            />
            <label for="No">No</label>
          </div>
          {data && data?.secondOffice == "secondOfficeYes" && (
            <>
              <div className="col-xl-6 col-lg-6 col-md-12 mt-4">
                <div className="mt-4 f17 medium">Secondary Practice Name</div>
                <input
                  className="form-control  bg-white "
                  value={data?.secondPracticeName}
                  onChange={handleChange("secondPracticeName")}
                  placeholder="Name…"
                ></input>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 mt-3">
                <div className="mt-4 f17 medium mb-3">Address</div>
                <input
                  className="form-control  bg-white "
                  value={data?.addressOne}
                  onChange={handleChange("addressOne")}
                  placeholder="Address"
                ></input>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12  mt-2">
                <input
                  className="form-control  bg-white "
                  value={data?.cityOne}
                  onChange={handleChange("cityOne")}
                  placeholder="City"
                ></input>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12  mt-2">
                <input
                  className="form-control  bg-white "
                  value={data?.stateOne}
                  onChange={handleChange("stateOne")}
                  placeholder="State"
                ></input>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12 mt-2">
                <input
                  className="form-control  bg-white "
                  value={data?.zipCodeOne}
                  onChange={handleNumberChange("zipCodeOne")}
                  maxLength={5}
                  placeholder="Zip Code"
                ></input>
              </div>
              <div className="mt-5 f17 medium  ">Office Contact</div>
              <div className=" col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
                <label>Contact Name</label>
                <input
                  className="form-control  bg-white "
                  value={data?.contactNameOne}
                  onChange={handleChange("contactNameOne")}
                  placeholder="Contact Name"
                ></input>
              </div>
              <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
                <label>Phone</label>
                <input
                  className="form-control  bg-white "
                  placeholder="(xxx) xxx-xxxx"
                  name="phoneOne"
                  value={phoneFormat(data?.phoneOne)}
                  onChange={handlePhoneChange("phoneOne")}
                ></input>
              </div>
              <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
                <label>Email</label>
                <input
                  className="form-control  bg-white "
                  placeholder="emcdaniel@gmail.com"
                  name="emailOne"
                  value={data?.emailOne}
                  onChange={handleEmailChange("emailOne")}
                ></input>
              </div>
              <div className="col-xl-6 col-lg-4 col-md-12  col-sm-12 mt-3">
                <label>Fax</label>
                <input
                  className="form-control  bg-white "
                  placeholder="(xxx) xxx-xxxx"
                  name="faxOne"
                  value={usphoneFormat(data?.faxOne)}
                  onChange={handlePhoneChange("faxOne")}
                ></input>
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
      </form>: <div className='row bg-white mt-2 p-4' >
      {requestMsgPopUp&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          {practiceInformation?.map((v)=>{
            return(
                <>
                <div className='row border-top-bottom py-2'>
                    {v?.heading&&<h6 className='m-0 p-0 mt-4' >{v?.heading}</h6>}
                    <div className='col-md-3 px-2 label'>{v?.label}</div>
                    <div className='col-md-8 '> <label>{v?.value}</label></div>
                </div>
                </>
            )
        })}
        </div>}
    </>
  );
};
export default PracticeInformation;





