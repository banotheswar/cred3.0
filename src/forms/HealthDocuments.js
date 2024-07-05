import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { UseFormValidations } from "../validations/UseFormValidation";
import {
  checkForKeyEmpty,
  getById,
  getList,
  save,
} from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import { useParams } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import moment from "moment";
import { IoAlertCircleSharp } from "react-icons/io5";

const HealthDocuments = ({
  setNotify,
  setState,
  id,
  setFormName,
  formname,
  updateMsg,
  setupdate1,
  DoctorFormsView,
  requestMsgPopUp,
  setId,
  doctordtails,
  AppointmentList
}) => {
  const [healthDocumentsList, setHealthDocumentsList] = useState([]);
  const [detailsState, setDetailsState] = useState();
  const [detailsStateChild, setDetailsStateChild] = useState();
  const [healthDocData, sethealthdocData] = useState();
  const [update, setUpdate] = useState();
  const { providerId } = useParams();
  console?.log(healthDocData,"AppointmentList")
  
  const submit = async () => {
    let formdata = new FormData();
    let arr =
      data && data?.healthDoc && data?.healthDoc === "healthDocYes"
        ? [
            { key: data?.completionDate },
            { key: data?.expirationDate },
            { key: data?.status },
            { key: data?.healthDoc },
          ]
        : [{ key: data?.healthDoc }];

    const greentick = checkForKeyEmpty(arr);
    data["type"] = detailsStateChild?.credCategory;

    let array = [
      {
        id: healthDocData && healthDocData?.id ? healthDocData?.id : 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        templateType: "Health Documents",
        formId: detailsState?.formId,
        type: detailsStateChild?.credCategory,
        category: detailsStateChild?.credType,
        isSubmitted: greentick,
        documentData: data,
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata.append("Image", null);
    let res = await save(urls?.forms?.savehealthdoc, formdata, setUpdate);
    setupdate1(res);
    setUpdate(res);
  };

  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleDateChange,
    handleCheckbox,
    setValues,
  } = UseFormValidations({ submit: submit });

  const getHealthDocumentsList = async () => {
    let jsonObjects = {type: "Health Document",appointmentId: formname?.appointmentId};
    let res = await getList(urls?.forms?.getHDList, { jsonObjects });
     setHealthDocumentsList(res || []);
    setDetailsState(res[0]);
    formname["notify"] = res[0]?.optional[0]?.requested;
    formname["saveLogKey"] = res[0]?.optional[0]?.saveLog;
    setFormName(formname);
  };

  const gethealthdocData = async () => {
    let jsonObjects = {
      appointmentId: formname?.appointmentId,
      formId: detailsState?.formId,
      type: detailsStateChild?.credCategory,
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    sethealthdocData(res);
    setId(res);
    setNotify(res)
  };

  let fields = [
    { label: "Are you vaccinated", value: data?.healthDoc&&((data?.healthDoc=="healthDocNo"&&"No"||(data?.healthDoc=="healthDocYes"&&"Yes"))) },
    {
      label: "Completion Date",
      value: data?.completionDate && moment(data?.completionDate)?.format("MM/DD/YYYY"),
    },
    {
      label: "Expiration Date",
      value: data?.expirationDate && moment(data?.expirationDate)?.format("MM/DD/YYYY"),
    },
    { label: "Status", value: data?.status },
  ];

  useEffect(() => {
    let childactive = healthDocumentsList
      ?.filter((v) => v?.formName === detailsState?.formName)
      ?.map((e) => e?.optional?.filter((f) => f?.credCategory)[0]);
    setDetailsStateChild(childactive && childactive[0]);
  }, [healthDocumentsList, detailsState]);

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const emailErrorColorSelect = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };
  useEffect(() => {
    setValues(healthDocData?.documentData || {});
    setId(healthDocData);
    setState("");
  }, [healthDocData, healthDocData?.documentData]);

  useEffect(() => {
    getHealthDocumentsList();
  }, [update, updateMsg]);
  useEffect(() => {
    if (detailsState && detailsStateChild) {
      gethealthdocData();
    }
  }, [update,detailsState, detailsStateChild]);

  const settingDetailstate = (name) => {
    setDetailsStateChild("");
    setDetailsState(name);
  };

  const settingDetailstateChild = (name) => {
    setDetailsStateChild(name);
    formname["notify"] = name?.requested;
    formname["saveLogKey"] = name?.saveLog;
    setNotify(name)
    setFormName(formname);
    
  };

  const returnValues = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };

  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };
  return (
    <>
      <div className="row bg-white p-2 mt-2">
        <div className="bg-white  d-flex  px-2 gap-1 ">
          {healthDocumentsList?.length > 0 &&
            healthDocumentsList?.map((e, i) => (
              <div
                className={
                  detailsState?.formName === e?.formName
                    ? `border pointer  ${
                        e?.requested == "Yes"
                          ? "requestedactive-bar"
                          : "active-bar"
                      }   text-white  p-2`
                    : "  border pointer  not-active   p-2 "
                }
                onClick={() => {
                  settingDetailstate(e);
                }}
                key={i}
              >
                {e?.formName}
                {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage.getItem("roleId")==6)&&
                  e?.finalSubmit == "Yes" && (
                    <IoIosCheckmarkCircle
                      className="mx-2"
                      color={
                        e?.formName == detailsState?.formName
                          ? "#ffff"
                          : "#7E7E7E"
                      }
                      size={16}
                      style={{ fontSize: "16px" }}
                    />
                  )}
                {sessionStorage.getItem("roleId") <= 4 && e?.finalSubmit == "Yes"&&
                  e?.saveLog === "Yes" && (
                    <IoIosCheckmarkCircle
                      color={
                        e?.formName == detailsState?.formName
                          ? "#ffff"
                          : "#7E7E7E"
                      }
                      size={16}
                      style={{ fontSize: "16px" }}
                    />
                  )}
                {e?.finalSubmit === "No" && e?.requested == "Yes" && (
                  <IoAlertCircleSharp
                    color={
                      e?.formName == detailsState?.formName
                        ? "#ffff"
                        : "#D5352F"
                    }
                    size={16}
                    style={{ fontSize: "16px" }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="row bg-white p-2 mt-2">
        <div className="bg-white  d-flex  px-2 gap-1 ">
          {healthDocumentsList?.length > 0 &&
            healthDocumentsList
              ?.filter((v) => v?.formName === detailsState?.formName)
              ?.map((e) =>
                e?.optional
                  ?.filter((f) => f?.credCategory)
                  ?.map((v, i) => (
                    <div
                      className={
                        detailsStateChild?.credCategory === v?.credCategory
                          ? `border pointer  ${
                              v?.requested == "Yes"
                                ? "requestedactive-bar"
                                : "active-bar"
                            }   text-white  p-2`
                          : "  border pointer  not-active   p-2 "
                      }
                      onClick={() => {
                        settingDetailstateChild(v);
                      }}
                      key={i}
                    >
                      {v?.credCategory}

                      {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage.getItem("roleId")==6)&&
                        v?.isSubmitted == "Yes" && (
                          <IoIosCheckmarkCircle
                            className="mx-2"
                            color={
                              detailsStateChild?.credCategory ===
                              v?.credCategory
                                ? "#ffff"
                                : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      {sessionStorage.getItem("roleId") <= 4 && v?.isSubmitted == "Yes" &&
                        v?.saveLog === "Yes" && (
                          <IoIosCheckmarkCircle
                            color={
                              detailsStateChild?.credCategory ===
                              v?.credCategory
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
                            detailsStateChild?.credCategory === v?.credCategory
                              ? "#ffff"
                              : "#D5352F"
                          }
                          size={16}
                          style={{ fontSize: "16px" }}
                        />
                      )}
                    </div>
                  ))
              )}
        </div>
      </div>

      <div className="row bg-white p-2 mt-2">
        {DoctorFormsView ? (
          <form onSubmit={handleSubmit}>
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="py-2">{requestMsgPopUp()}</div>
            )}
            <label className={`col-sm-12 col-form-label mt-3 `}>
              Are you vaccinated? <span className="text-danger">*</span>
            </label>
            <div class="col-sm-12 d-flex gap-3">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="healthDoc"
                  value="healthDocYes"
                  id="Yes"
                  checked={checkFun("healthDoc", "healthDocYes")}
                  onChange={handleCheckbox("healthDoc")}
                />

                <label for="Yes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="healthDoc"
                  value="healthDocNo"
                  id="No"
                  checked={checkFun("healthDoc", "healthDocNo")}
                  onChange={handleCheckbox("healthDoc")}
                />
                <label for="No">No</label>
              </div>
            </div>
            {data && data?.healthDoc && data?.healthDoc == "healthDocYes" && (
              <div className="row py-3">
                <div className="col-md-6">
                  <label>
                    Completion Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("completionDate")} py-2`}
                    minDate={new Date(1900, 1, 1)}
                    selected={
                      data?.completionDate && new Date(data?.completionDate)
                    }
                    autoComplete="off"
                    name="completionDate"
                    onChange={(e) => {
                      handleDateChange(e, "completionDate");
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
                <div className="col-md-6">
                  <label>
                    Expiration Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("expirationDate")} py-2`}
                    minDate={new Date(1900, 1, 1)}
                    selected={
                      data?.expirationDate && new Date(data?.expirationDate)
                    }
                    autoComplete="off"
                    name="expirationDate"
                    onChange={(e) => {
                      handleDateChange(e, "expirationDate");
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

                <div className="col-md-6 mt-2">
                  <label>
                    Status <span className="text-danger">*</span>
                  </label>

                  <select
                    name="status"
                    className={emailErrorColorSelect("status")}
                    value={returnValues("status")}
                    onChange={handleChange("status")}
                  >
                    <option value={""}>Select</option>
                    <option>Complete</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
            )}
            <hr />
            <div>
              <button className="button border rounded text-white p-2">
                Save & Continue
              </button>
            </div>
          </form>
        ) : (
          <div className="row mt-2 p-4">
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className=" bg-white">{requestMsgPopUp()}</div>
            )}
            {fields?.map((v) => {
              return (
                <>
                  <div className="row border-top-bottom py-2">
                    {v?.heading && (
                      <h6 className="m-0 p-0 mt-4">{v?.heading}</h6>
                    )}
                    <div className="col-md-3 px-2 label">{v?.label}</div>
                    <div className="col-md-8 ">
                      {" "}
                      <label>{v?.value}</label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default HealthDocuments;
