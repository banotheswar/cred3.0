import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDelete } from "react-icons/md";
import { UseFormValidations } from "../validations/UseFormValidation";
import { IoAlertCircleSharp, IoCloudUploadOutline } from "react-icons/io5";
import { BiAccessibility, BiEdit } from "react-icons/bi";
import { getList, usphoneFormat } from "../api_services/SharedServices";
import { Image_Base_Url, urls } from "../api_services/url";
import moment from "moment";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useParams } from "react-router-dom";

const MalpracticeInsurance = ({
  setNotify,
  setStateObj,
  values,
  getFormdata,
  id,
  formname,
  state,
  setId,
  setFormName,
  Deleteuploads,
  requestMsgPopUp,
  DoctorFormsView,
  doctordtails
}) => {
  const [states, setStates] = useState();
  const {formId} =useParams()
  const submit = () => {
    const checkForKeyEmpty = () => {
      for (let i = 0; i < data?.malpracticeInsurance?.length; i++) {
        const obj = data?.malpracticeInsurance[i];

        for (const key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === "") {
            return "No";
          }
        }
      }
      return "Yes";
    };
    const greentick = checkForKeyEmpty();
    data?.malpracticeInsurance?.map((v) => {
      v["isSubmited"] = greentick;
    });

    console?.log(greentick, data?.malpracticeInsurance, "jjj");
    if (data?.fileName && data?.image != undefined && data?.image != "") {
      Deleteuploads(data?.uploadId);
    }
    values(
      data,
      { malpracticeInsurance: data?.malpracticeInsurance },
      greentick,
      data?.image
    );
    addObject({ image: "" });
  };

  const getAllInformation = async () => {
    let jsonObjects = { type: "State" };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });
    setStates(res);
  };

  const {
    data,
    errors,
    writeData,
    writeDate,
    writehandleChecked,
    writeDataCheckbox,
    removeItem,
    setValues,
    addObject,
    handleImageUpload,
    handleSubmit,
  } = UseFormValidations({
    initialValues: {
      malpracticeInsurance: [
        {
          carrierName: "",
          states: "",
          policy: "",
          organization: "",
          states: "",
          policyEffectiveDate: "",
          policyExpirationDate: "",
          aggregateAmount: "",
          coverageType: "",
          incidentAmount: "",
          yearscarrier: "",
          agentName: "",
          email: "",
          phone: "",
        },
      ],
    },

    submit: submit,
  });

  console?.log(data?.malpracticeInsurance, "malpracticeInsurance", getFormdata);
  const returnPatientError = (index, key) => {
    return errors &&
      errors?.malpracticeInsurance?.length > 0 &&
      errors?.malpracticeInsurance[index]?.[key] &&
      errors?.malpracticeInsurance[index]?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control bg-white";
  };

  useEffect(() => {
   
    if (id?.length != 0&&Array.isArray(id)) {
      let array= Array.isArray(id) &&id?.filter((v)=>v?.id==state?.id)
   let arrayTwo= array?.length!=0?array:id
      let obj = {
        malpracticeInsurance:
          arrayTwo[0]?.["additionalData"]["malpracticeInsurance"],
        id: arrayTwo[0]?.["id"],
        uploadId: arrayTwo[0]?.["uploadId"],
        fileName: arrayTwo[0]?.["fileName"],
        originalFileName: arrayTwo[0]?.["originalFileName"],
      };

      setValues(obj);
      setStateObj&&setStateObj(obj);
      setNotify&&setNotify(obj)
      if (arrayTwo[0] && formname?.finalLock) {
        formname["notify"] = arrayTwo[0]?.requested;
        formname["saveLogKey"] = arrayTwo[0]?.saveLog;
        let objTwo = formname;

        setFormName(objTwo);
      }
    }
  }, [id]);
  const changeData = (i) => {
    console?.log(id[i], "id[i]1");
    let obj = {
      malpracticeInsurance: id[i]?.["additionalData"]["malpracticeInsurance"],
      id: id[i]?.["id"],
      uploadId: id[i]?.["uploadId"],
      fileName: id[i]?.["fileName"],
      originalFileName: id[i]?.["originalFileName"],
    };
    formname["notify"] = id[i]?.requested;
    formname["saveLogKey"] = id[i]?.saveLog;
    let objTwo = formname;
    setFormName(objTwo);
    setStateObj&&setStateObj(obj);
    setNotify&&setNotify(obj)
    setValues(obj);
  };

  useEffect(() => {
    getAllInformation();
  }, []);
  const addInsurance = () => {
    setValues({
      malpracticeInsurance: [{
        carrierName: "",
        states: "",
        policy: "",
        organization: "",
        states: "",
        policyEffectiveDate: "",
        policyExpirationDate: "",
        aggregateAmount: "",
        coverageType: "",
        incidentAmount: "",
        yearscarrier: "",
        agentName: "",
        email: "",
        phone: "",

      }]
    })
  }
console?.log(data,"mmmmaaaall",data?.malpracticeInsurance)
  return (
    <>
      {!formId&&<div className="row px-3 py-2 mt-2 bg-white">
        <div className="col-md-9 d-flex flex-wrap">
          {data?.malpracticeInsurance &&
            Array.isArray(id) &&
            id?.map((v, i) => {
              return v?.additionalData?.malpracticeInsurance?.map((child) => {
                return (
                  <>
                    {" "}
                    <div
                      className={
                        child?.carrierName ==
                        data?.malpracticeInsurance[0]?.carrierName
                          ? `border pointer  ${
                              v?.requested == "Yes"
                                ? "requestedactive-bar"
                                : "active-bar"
                            } mx-1  text-white  p-2`
                          : "  border pointer  not-active   p-2 mx-1"
                        //  "pointer rounded-0 button text-white border rounded py-2 px-2 mx-1 "
                        // : " button bg-white  border rounded-0 py-2 px-2 mx-1 text-black pointer"
                      }
                      onClick={() => changeData(i)}
                    >
                      {child?.carrierName}

                      { (doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5)&& 
                        v?.isSubmitted == "Yes" && (
                          <IoIosCheckmarkCircle
                            className="mx-2"
                            color={
                              child?.carrierName ==
                              data?.malpracticeInsurance[0]?.carrierName
                                ? "#ffff"
                                : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}

                      {sessionStorage.getItem("roleId") <= 4 &&v?.isSubmitted=="Yes"&&
                        v?.saveLog === "Yes" && (
                          <IoIosCheckmarkCircle
                            color={
                              child?.carrierName ==
                              data?.malpracticeInsurance[0]?.carrierName
                                ? "#ffff"
                                : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      {v?.isSubmitted === "No" && v?.requested == "Yes" && (
                        <IoAlertCircleSharp
                          color={
                            child?.carrierName ==
                            data?.malpracticeInsurance[0]?.carrierName
                              ? "#ffff"
                              : "#D5352F"
                          }
                          size={16}
                          style={{ fontSize: "16px" }}
                        />
                      )}
                    </div>
                  </>
                );
              });
            })}
        </div>
        {((doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") >3:sessionStorage?.getItem("roleId") >4) &&formname?.finalLock=="No")&& (
          <div
            className="col-md-3 d-flex justify-content-end"
            onClick={addInsurance}
          >
            <div className="save text-white  border rounded py-2 px-2 pointer">
              + Malpractice Insurance
            </div>
          </div>
        )}
      </div>}
      {DoctorFormsView ||formId? (
        <form onSubmit={handleSubmit}>
          <div className="row px-4 py-2 mt-2 bg-white">
            {!formId&&requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mt-1">{requestMsgPopUp()}</div>
            )}
            {data?.malpracticeInsurance?.map((v, i) => {
              return (
                <>
                  <div className="row  py-3">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Carrier/Insurer Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        placeholder="Carrier Name…"
                        name="carrierName"
                        value={v?.carrierName || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "carrierName"
                        )}
                      />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Insurer State <span className="text-danger">*</span>
                      </label>

                      <select
                        className={"form-select bg-white"}
                        name="states"
                        value={v?.states || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "states"
                        )}
                      >
                        <option value="">Select State</option>
                        {states &&
                          states?.map((v) => (
                            <option value={v?.stateId}>{v?.stateName}</option>
                          ))}
                        <option></option>
                      </select>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Policy # <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="Policy #…"
                        name="policy"
                        value={v?.policy || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "policy"
                        )}
                      />
                    </div>
                    <div className="checkboxWithText1 mt-3 py-1 col-md-12">
                      <input
                        type="checkbox"
                        value={"Yes"}
                        id={`${i}1`}
                        style={{ height: "16px", width: "16px" }}
                        name="primaryCarrier"
                        checked={writehandleChecked(
                          data?.malpracticeInsurance,
                          i,
                          "primaryCarrier",
                          "Yes"
                        )}
                        onChange={writeDataCheckbox(
                          i,
                          "malpracticeInsurance",
                          "primaryCarrier",
                          "Yes"
                        )}
                      />

                      <label for={`${i}1`} className="">
                        {" "}
                        This my Primary Carrier
                      </label>
                    </div>
                  </div>
                  <div className="row py-1">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Policy Effective Date{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <DatePicker
                        className={returnPatientError(i, "policyEffectiveDate")}
                        selected={
                          v?.policyEffectiveDate
                            ? new Date(v?.policyEffectiveDate)
                            : ""
                        }
                        maxDate={new Date()}
                        onChange={writeDate(
                          i,
                          "malpracticeInsurance",
                          "policyEffectiveDate"
                        )}
                        autoComplete="off"
                        name="policyEffectiveDate"
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
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Policy Expiration Date{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        className={returnPatientError(
                          i,
                          "policyExpirationDate"
                        )}
                        selected={
                          v?.policyExpirationDate
                            ? new Date(v?.policyExpirationDate)
                            : ""
                        }
                        maxDate={new Date()}
                        onChange={writeDate(
                          i,
                          "malpracticeInsurance",
                          "policyExpirationDate"
                        )}
                        autoComplete="off"
                        name="policyExpirationDate"
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
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>Retroactive Date</label>
                      <DatePicker
                        className={returnPatientError(i, "retroActiveDate")}
                        selected={
                          v?.retroActiveDate ? new Date(v?.retroActiveDate) : ""
                        }
                        maxDate={new Date()}
                        onChange={writeDate(
                          i,
                          "malpracticeInsurance",
                          "retroActiveDate"
                        )}
                        autoComplete="off"
                        name="retroActiveDate"
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
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <label>
                        Coverage Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className={"form-select bg-white"}
                        name="coverageType"
                        value={v?.coverageType || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "coverageType"
                        )}
                      >
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <label>
                        Per Incident Amount{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <div class="input-group">
                        <span
                          class="input-group-text"
                          id="basic-addon1"
                          style={{
                            color: "#000000",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          $
                        </span>
                        <input
                          type="text"
                          class="border col"
                          style={{
                            borderColor: " 1px solid #ADADAD",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                          }}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="incidentAmount"
                          value={v?.incidentAmount || ""}
                          onChange={writeData(
                            i,
                            "malpracticeInsurance",
                            "incidentAmount"
                          )}
                        />
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <label>
                        Annual Aggregate Amount{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div class="input-group">
                        <span
                          class="input-group-text"
                          id="basic-addon1"
                          style={{
                            color: "#000000",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          $
                        </span>
                        <input
                          type="text"
                          class="border col"
                          style={{
                            borderColor: " 1px solid #ADADAD",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                          }}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="aggregateAmount"
                          value={v?.aggregateAmount || ""}
                          onChange={writeData(
                            i,
                            "malpracticeInsurance",
                            "aggregateAmount"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <label>
                        Person/Organization Insured{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="Insured Name…"
                        name="organization"
                        value={v?.organization || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "organization"
                        )}
                      />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <label>
                        Years with Carrier{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="Years…"
                        name="yearscarrier"
                        value={v?.yearscarrier || ""}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "yearscarrier"
                        )}
                      />
                    </div>
                  </div>

                  <div class="row py-1">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="formschildsubheading col-form-div">
                        Unlimited Coverage?
                      </div>
                      <div class="col-sm-12 d-flex gap-3 py-1">
                        <div class="checkboxWithText">
                          <input
                            type="radio"
                            style={{ height: "14px", width: "14px" }}
                            name={`coverageType${i}`}
                            value={`yes${i}` || ""}
                            id={`yes${i}`}
                            checked={writehandleChecked(
                              data?.malpracticeInsurance,
                              i,
                              `coverageType${i}`,
                              `yes${i}`
                            )}
                            onChange={writeDataCheckbox(
                              i,
                              "malpracticeInsurance",
                              `coverageType${i}`,
                              `yes${i}`
                            )}
                          />
                          <label for={`yes${i}`}>Yes</label>
                        </div>
                        <div class="checkboxWithText">
                          <input
                            type="radio"
                            name={`coverageType${i}`}
                            value={`no${i}`}
                            id={`no${i}`}
                            style={{ height: "14px", width: "14px" }}
                            checked={writehandleChecked(
                              data?.malpracticeInsurance,
                              i,
                              `coverageType${i}`,
                              `no${i}`
                            )}
                            onChange={writeDataCheckbox(
                              i,
                              "malpracticeInsurance",
                              `coverageType${i}`,
                              `no${i}`
                            )}
                          />
                          <label for={`no${i}`}>No</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6  col-lg-6   col-md-12 col-sm-12">
                      <div class="formschildsubheading col-form-div">
                        Statuatory Limit of Liability Endorsement?
                      </div>
                      <div class="col-sm-12 d-flex gap-3 py-1">
                        <div class="checkboxWithText">
                          <input
                            type="radio"
                            style={{ height: "14px", width: "14px" }}
                            name={`statuatoryLimit${i}`}
                            value={`statuatoryLimityes${i}`}
                            id={`statuatoryLimityes${i}`}
                            checked={writehandleChecked(
                              data?.malpracticeInsurance,
                              i,
                              `statuatoryLimit${i}`,
                              `statuatoryLimityes${i}`
                            )}
                            onChange={writeDataCheckbox(
                              i,
                              "malpracticeInsurance",
                              `statuatoryLimit${i}`,
                              `statuatoryLimityes${i}`
                            )}
                          />
                          <label for={`statuatoryLimityes${i}`}>Yes</label>
                        </div>
                        <div class="checkboxWithText">
                          <input
                            type="radio"
                            name={`statuatoryLimit${i}`}
                            value={`statuatoryLimitno${i}`}
                            id={`statuatoryLimitno${i}`}
                            style={{ height: "14px", width: "14px" }}
                            checked={writehandleChecked(
                              data?.malpracticeInsurance,
                              i,
                              `statuatoryLimit${i}`,
                              `statuatoryLimitno${i}`
                            )}
                            onChange={writeDataCheckbox(
                              i,
                              "malpracticeInsurance",
                              `statuatoryLimit${i}`,
                              `statuatoryLimitno${i}`
                            )}
                          />
                          <label for={`statuatoryLimitno${i}`}>No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 formssubheading py-0">
                    Contact Information{" "}
                  </div>

                  <div className="row ">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                      <label>
                        Agent Name <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="First and Last Name…"
                        name="agentName"
                        value={v?.agentName}
                        onChange={writeData(
                          i,
                          "malpracticeInsurance",
                          "agentName"
                        )}
                      />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                      <label>
                        Email <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="name@example.com"
                        name="email"
                        value={v?.email}
                        onChange={writeData(i, "malpracticeInsurance", "email")}
                      />
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                      <label>
                        Phone <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="(XXX) XXX-XXXX"
                        name="phone"
                        value={usphoneFormat(v?.phone)}
                        onChange={writeData(i, "malpracticeInsurance", "phone")}
                      />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                      <label>Fax</label>
                      <input
                        className="form-control"
                        placeholder="(XXX) XXX-XXXX"
                        name="fax"
                        value={v?.fax}
                        onChange={writeData(i, "malpracticeInsurance", "fax")}
                      />
                    </div>
                  </div>
                  <div className="formssubheading-upload mt-5 py-2 col-lg-12 col-xl-12 col-md-12 ">
                    Upload a copy of your Policy{" "}
                    <span className="text-danger">*</span>
                  </div>
                  <div className="row ">
                    <div className="col-xl-6 col-lg-6 col-xl-6 col-md-12 col-sm-12">
                      <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3">
                        <div className="text-center py-2 mt-1 ">
                          <IoCloudUploadOutline
                            color="#9C9CA8"
                            opacity={0.49}
                            className="me-2"
                            style={{ height: "36px", width: "42px" }}
                          />
                          <div
                            className="f18 px-4 mt-2"
                            style={{ height: "46px" }}
                          >
                            Upload a copy of your license or <br /> drag and
                            drop in this box
                          </div>

                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept=".pdf,.doc,.docx"
                            onChange={handleImageUpload("image")}
                          />

                          <div
                            className="  upload40  d-flex justify-content-center align-items-center"
                            style={{
                              background: "#3A3952B3",
                              marginLeft: "132.5px",
                              marginRight: "133.5px",
                            }}
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          >
                            Upload
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-8  col-md-12 col-sm-12 px-4 ">
                      <div className="formschildheading py-2 px-1 f16">
                        Uploads
                      </div>

                      {data && data?.originalFileName && (
                        <div className=" row vertical-scrolbar px-3 py-1 mt-2">
                          <label className="px-0 py-2 upload-file-css border-top-bottom py-1">
                            <MdDelete
                              onClick={() => Deleteuploads(data?.uploadId)}
                              style={{ width: "13px", height: "16px" }}
                              className="me-2 mb-1 mt-1 pointer"
                              color="#ABAAB5"
                            />{" "}
                            <a
                              href={
                                Image_Base_Url +
                                `/FormUploads/${data?.fileName}`
                              }
                              target={"_blank"}
                              download={true}
                            >
                              {data && data?.originalFileName}
                            </a>
                            {/* {uploadeddata[0]?.fileName} */}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
            <hr className="mt-3" />
            <div className="py-4">
              <button
                type="submit"
                className="button border rounded text-white p-2"
              >
                Save & Continue
              </button>
            </div>
          </div>
       
      </form>) :
        <div className="bg-white row mt-2 px-3">
          {requestMsgPopUp && requestMsgPopUp != "" && <div className='mt-2'>{requestMsgPopUp()}</div>}
          {
            data?.malpracticeInsurance?.map((v) => {
              return (
                <>
                  <div className='row  py-2 pb-2'>
                    <h6 className='pt-2' >{`Policy Information`}</h6>



                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Carrier/Insurer Name</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.carrierName}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Insurer State</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.practiceType}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Policy # </label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.policy}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Policy Effective Date</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.policyEffectiveDate && moment(v?.policyEffectiveDate).format("MM/DD/YYYY")}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Policy Expiration Date</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.policyExpirationDate && moment(v?.policyExpirationDate).format("MM/DD/YYYY")}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Retroactive Date</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.retroActiveDate && moment(v?.retroActiveDate).format("MM/DD/YYYY")}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Coverage Type</label></div>
                    <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.coverageType}</label></div>

                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Per Incident Amount </label></div>
                    <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.incidentAmount}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Annual Aggregate Amount</label></div>
                    <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.aggregateAmount}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Person/Organization Insured </label></div>
                    <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.organization}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Years with Carrier </label></div>
                    <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.yearscarrier}</label></div>
                    <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Unlimited Coverage</label></div>
                    <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.coverageType0 && v?.coverageType0 == "no0" ? "No" : "Yes"}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Statuatory Limit of Liability Endorsement?</label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label>{v?.statuatoryLimit0 && v?.statuatoryLimit0 == "statuatoryLimityes0" ? "Yes" : "No"}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Agent Name</label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label>{v?.agentName}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Email</label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label>{v?.email}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Phone </label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label>{v?.phone}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Fax</label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label>{v?.fax}</label></div>
                    <div className='col-md-4 border-0 border-bottom  py-2 '> <label className="label">Policy Documents</label></div>
                    <div className='col-md-8  border-0 border-bottom  py-2 '> <label><a href={Image_Base_Url+`/FormUploads/${data?.fileName}`} target={"_blank"} download={true}>{data?.originalFileName}</a></label></div>

                  </div>
                  <hr className="row col-md-12" />


                </>
              )
            })
          }
          {/* <div className="f18 medium">Document Uploads</div>
      <div className="border-top border-bottom row py-2">
        <div className="label col-md-4">Policy Documents</div>
        <div className="col-md-8"><label><a href={Image_Base_Url+`/FormUploads/${id?.fileName}`} target={"_blank"} download={true}>{id?.originalFileName}</a> </label></div>
      </div> */}

        </div>}
    </>
  );
};

export default MalpracticeInsurance;
