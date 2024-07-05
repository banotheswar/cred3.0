import React, { useEffect, useState } from "react";
import {
  IoAlertCircleSharp,
  IoCloudDownloadSharp,
  IoCloudUploadOutline,
} from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { UseFormValidations } from "../../validations/UseFormValidation";
import {
  DropdownMaster,
  getList,
  save,
} from "../../api_services/SharedServices";
import { Image_Base_Url, urls } from "../../api_services/url";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import download from "../../assets/images/folder-download.svg";

const MedicalAndStateLicense = ({
  setNotify,
  setState,
  id,
  updateMsg,
  setErrorMsg,
  setFormName,
  formname,
  category,
  providerId,
  DoctorFormsView,
  requestMsgPopUp,
  Deleteuploads,
  setUpdateAppointmentList,
  setId,
  doctordtails
}) => {
  const [temp, setTemp] = useState([]);
  const [getAll, setAll] = useState([]);
  const [stateList, setstateList] = useState();
  const [licenseList, setlicenseList] = useState();
  const [update, setUpdate] = useState([]);
  const [additionaldocData, setAdditionaldocData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  console.log(id?.id,"idid")

  const submit = async () => {
    let fomvalues = [
      { value: data?.licenseType },
      { value: data?.issuedAuthority },
      { value: data?.multiLicense },
      { value: data?.licenseState },
      { value: data?.licenseNumber },
      { value: data?.issueDate },
      { value: data?.expirationDate },
      { value: data?.licenseStatus },
      { value: data?.taxonomyCode },
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
    // let txt = data?.licenseState;
    // let abbreviation = txt.split(' ').map(word => word[0]).join('');
    let formdata = new FormData();

    let array = [
      {
        id: data?.id ? data?.id : 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        formId: formname?.formId,
        isSubmitted: greentick,
        templateType: "Licensure",
        category: category,
        type: data?.licenseType,
        documentData: data,
      },
    ];
    formdata.append("JsonString", JSON.stringify(array));
    formdata.append("Image", data?.image);
    let res = await save(urls.forms.saveCertifications, formdata);
    if (res?.data?.status) {
      setUpdate(res);
      setErrorMsg(false);
      setUpdateAppointmentList(res);
    }
  };
  const getallCertificate = async () => {
    let jsonObjects = {
      templateType: "Licensure",
      category: category,
      appointmentId: formname?.appointmentId,
    };
    let res = await getList(urls?.forms?.getAllCertificates, { jsonObjects });
    res &&
      res?.map((v, i) => {
        res[i]["documentData"]["id"] = v?.id;
      });
    let array = res?.filter((v) => v?.id == id?.id);
    let arrayTwo = array?.length != 0 ? array : res;
    setAll(res);
    setTemp(arrayTwo[0]?.["documentData"]);
    setId(arrayTwo[0] || []);
    setNotify(arrayTwo[0])
    if (formname?.finalLock) {
      formname["notify"] = arrayTwo[0]?.requested;
      formname["saveLogKey"] = arrayTwo[0]?.saveLog;
      setFormName(formname);
    }
  };

  const {
    errors,
    data,
    setValues,
    handleChange,
    handleSubmit,
    handleDateChange,
    handleCheckbox,
    addObject,
    handleImageUpload,
  } = UseFormValidations({ submit: submit });

  useEffect(() => {
    DropdownMaster("State", setstateList);
    DropdownMaster("License Type", setlicenseList);
  }, []);

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control  bg-white ";
  };

  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  const retunvalue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };

  const add = () => {
    setValues({});
  };
  let fields = [
    { label: "License Type", value: data?.licenseType },
    { label: "License State", value: data?.licenseState },
    { label: "Issued Authority", value: data?.issuedAuthority },
    { label: "Multi-State License", value: data?.multiLicense },
    { label: "License Number", value: data?.licenseNumber },
    {
      label: "Issue Date",
      // value: moment(data?.issueDate)?.format("MM/DD/YYYY"),
      value: data?.issueDate && moment(data?.issueDate)?.format("MM/DD/YYYY"),
    },
    {
      label: "Expiration Date",
      // value: moment(data?.expirationDate)?.format("MM/DD/YYYY"),
      value: data?.expirationDate && moment(data?.expirationDate)?.format("MM/DD/YYYY"),
    },
    { label: "License Status", value: data?.licenseStatus },
    { label: "Taxonomy Code", value: data?.taxonomyCode },
  ];

  const submitdocuments = async () => {
    if (!data?.certifyingBoard || !data?.certificationNumber) {
      setErrorMessage(
        "Certifying Board and Certification Number are required."
      );
      return;
    }
    let formdata = new FormData();
    let array = [
      {
        uploadId: 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
    templateType: "Health Documents",
        formId: formname?.formId,
        documentName: data?.certifyingBoard,
        documentDescription: data?.certificationNumber,
        documentType: "Licensure Verification",
        documentId: id?.id,
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", data?.imageOne);
    let res = await save(urls?.forms?.saveAdditonalDoc, formdata);
    setValues({});
    if (res?.data?.status) {
      setUpdate(res);
      setErrorMessage("");
    }
  };

  const getAdditionaldocData = async () => {
    let jsonObjects = {
      documentType: "Licensure Verification",
      appointmentId: formname?.appointmentId,
   documentId: id?.id,
    };
    let res = await getList(urls?.forms?.getAdditionalDoc, { jsonObjects });
    setAdditionaldocData(res || []);
  };

  const DeleteuploadsOne = async (Id) => {
    let jsonObjects = { uploadId: Id };
    let res = await save(urls?.forms?.deleteuploads, { jsonObjects });
    if (res) {
      setUpdate(res);
    }
  };

  useEffect(() => {
    if (id?.id) {
      getAdditionaldocData();
    }
  }, [providerId, update, id?.id]);

  useEffect(() => {}, [additionaldocData]);

  useEffect(() => {
    setState("");
    setValues(temp);
  }, [temp]);
  useEffect(() => {
    if (getAll && data?.check) {
      let res = getAll?.filter(
        (v) => v?.documentData?.licenseType == data?.check
      );
      setValues(res[0]?.documentData);
      setId(res[0] || []);
      setNotify(res[0])
      if (formname?.finalLock) {
        formname["notify"] = res[0]?.requested;
        formname["saveLogKey"] = res[0]?.saveLog;
        setFormName(formname);
      }
    }
  }, [getAll, data?.check]);
  useEffect(() => {
    category && getallCertificate();
  }, [category, update, updateMsg]);

  return (
    <>
      <div className="row p-2 mt-2 bg-white">
        <div className="col-md-8 d-flex gap-2">
          {
            <div className="col-md-auto ">
              {getAll &&
                getAll?.map((v) => {
                  console?.log(v, "784512");
                  return (
                    <button
                      onClick={() =>
                        addObject({ licenseType: v?.type, check: v?.type })
                      }
                      className={
                        v?.type ==
                        (data?.licenseType != undefined && data?.licenseType)
                          ? // " rounded-0 button text-white border rounded py-2 mx-1" : " button bg-white  border rounded-0 py-2 mx-1"
                            `border pointer  ${
                              v?.requested == "Yes"
                                ? "requestedactive-bar"
                                : "active-bar "
                            } mx-1  text-white  p-2`
                          : "  border pointer  not-active  mx-1 p-2 "
                      }
                      //  style={{ background: "#ECECEC", color: "#7E7E7E" }}
                    >
                      {v?.type != undefined &&
                        v?.type?.charAt(0).toUpperCase() + v?.type?.slice(1)}
                      {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage.getItem("roleId")==6)&&
                        v?.isSubmitted == "Yes" && (
                          <IoIosCheckmarkCircle
                            className="mx-2"
                            color={
                              v?.type == data?.licenseType ? "#ffff" : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      {sessionStorage.getItem("roleId") <= 4 && v?.isSubmitted == "Yes"&&
                        v?.saveLog === "Yes" && (
                          <IoIosCheckmarkCircle
                            color={
                              v?.type == data?.licenseType ? "#ffff" : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      {v?.isSubmitted === "No" && v?.requested == "Yes" && (
                        <IoAlertCircleSharp
                          color={
                            v?.type == data?.licenseType ? "#ffff" : "#D5352F"
                          }
                          size={16}
                          style={{ fontSize: "16px" }}
                        />
                      )}
                    </button>
                  );
                })}
            </div>
          }
        </div>
        {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") >3:sessionStorage?.getItem("roleId") >4)&&formname?.finalLock=="No" && (
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="save text-white  border rounded py-2 px-2"
              onClick={add}
            >
              {" "}
              + Add License
            </button>
          </div>
        )}
      </div>
      {DoctorFormsView ? (
        <form onSubmit={handleSubmit}>
          <div className="row bg-white p-2 mt-2" style={{ minHeight: "130vh" }}>
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mb-3">{requestMsgPopUp()}</div>
            )}
            <div>
              <div className="row">
                <div className="col-md-6">
                  <label>
                    License Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-white"
                    name="licenseType"
                    value={retunvalue("licenseType")}
                    onChange={handleChange("licenseType")}
                  >
                    <option value={""}>Select</option>
                    {licenseList &&
                      licenseList?.map((v) => (
                        <option value={v?.name}>{v?.name}</option>
                      ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    License State <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-white"
                    name="licenseState"
                    value={retunvalue("licenseState")}
                    onChange={handleChange("licenseState")}
                  >
                    <option value={""}>Select</option>
                    {stateList &&
                      stateList?.map((v) => (
                        <option value={v?.stateName}>{v?.stateName}</option>
                      ))}
                  </select>
                </div>
                <div class="col-md-6 py-1">
                  <label class="col-sm-12 col-form-label">
                    Issued Authority <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control bg-white"
                    placeholder="Issued Authority"
                    name="issuedAuthority"
                    value={retunvalue("issuedAuthority")}
                    onChange={handleChange("issuedAuthority")}
                  ></input>
                </div>
                <div class="col-md-6 py-1">
                  <label class="col-sm-12 col-form-label">
                    Multi-State License? <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 d-flex gap-3">
                    <div class="checkboxWithText">
                      <input
                        type="radio"
                        name="multiLicense"
                        value="Yes"
                        id="yes"
                        checked={checkFun("multiLicense", "Yes")}
                        onChange={handleCheckbox("multiLicense")}
                      />
                      <label for="yes">Yes</label>
                    </div>
                    <div class="checkboxWithText">
                      <input
                        type="radio"
                        name="multiLicense"
                        value="No"
                        id="no"
                        checked={checkFun("multiLicense", "No")}
                        onChange={handleCheckbox("multiLicense")}
                      />
                      <label for="no">No</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label>
                    License Number <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control bg-white"
                    placeholder="License Number *"
                    name="licenseNumber"
                    value={retunvalue("licenseNumber")}
                    onChange={handleChange("licenseNumber")}
                  ></input>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-6 col-xl-6 col-md-6">
                  <label>
                    Issue Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={"form-control py-2"}
                    minDate={new Date(1900, 1, 1)}
                    selected={data?.issueDate && new Date(data?.issueDate)}
                    autoComplete="off"
                    name="issueDate"
                    onChange={(e) => {
                      handleDateChange(e, "issueDate");
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
                <div className="col-lg-6 col-xl-6 col-md-6">
                  <label>
                    Expiration Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={"form-control py-2"}
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
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label>
                    License Status <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-white"
                    name="licenseStatus"
                    value={retunvalue("licenseStatus")}
                    onChange={handleChange("licenseStatus")}
                  >
                    <option value={""}>Select</option>
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Taxonomy Code <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control bg-white"
                    placeholder="Taxonomy Code "
                    name="taxonomyCode"
                    value={retunvalue("taxonomyCode")}
                    onChange={handleChange("taxonomyCode")}
                  ></input>
                </div>
              </div>
              <div className="formssubheading">Document Upload (optional)</div>
              <div className="row py-2">
                <div className="col-xl-6 col-lg-6 col-xl-6 col-md-12 col-sm-12">
                  <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                    <div className="text-center py-2 mt-1 ">
                      <IoCloudUploadOutline
                        color="#9C9CA8"
                        opacity={0.49}
                        style={{ height: "36px", width: "42px" }}
                        className="me-2"
                      />
                      <div
                        className="f18 px-4 mt-2"
                        style={{ height: "46px", color: "#3A3952" }}
                      >
                        Upload a copy of your license or <br /> drag and drop in
                        this box
                      </div>

                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        name="image"
                        onChange={handleImageUpload("image")}
                      />

                      <div
                        className="  upload40 d-flex justify-content-center align-items-center"
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

                <div className="col-xl-6 col-lg-8  col-md-12 col-sm-12 px-4 mt-2">
                  <div
                    className="formschildheading  px-1 f16"
                    style={{ height: "19px" }}
                  >
                    Uploads
                  </div>

                  {data?.uploadFiles && data?.uploadFiles?.length > 0 && (
                    <div className=" row vertical-scrolbar px-3 py-1 mt-2">
                      {data?.uploadFiles &&
                        data?.uploadFiles[0]?.map((v) => {
                          return (
                            <label className="px-0 py-2 upload-file-css border-top-bottom py-1">
                              <MdDelete
                                onClick={() => Deleteuploads(v?.uploadId)}
                                style={{ width: "13px", height: "16px" }}
                                className="me-2 mb-1 mt-1 pointer"
                                color="#ABAAB5"
                              />{" "}
                              <a
                                href={
                                  Image_Base_Url + `/FormUploads/${v?.fileName}`
                                }
                                target={"_blank"}
                                download={true}
                              >
                                {v && v?.originalFileName}
                              </a>
                              {/* {uploadeddata[0]?.fileName} */}
                            </label>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>

              <hr className="mt-4" />
              <button
                type="submit"
                className="button text-white col-md-2 border rounded py-2"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="row bg-white mt-2 p-4">
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mb-3">{requestMsgPopUp()}</div>
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

            {/* {editModal&&<UnlockAndEditmodal saveData={funData}  show={editModal} onHide={()=>setEditModal(false)} />} */}
          </div>
          {formname?.saveLogKey == "No" ? (
            <div className="row bg-white mt-2 p-4">
              <div className="f18 medium">Verify</div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="">
                    <label>
                      Certifying Board <span className="text-danger"> *</span>
                    </label>

                    <input
                      className={emailErrorColor("certifyingBoard")}
                      placeholder="Certifying Board…"
                      name="certifyingBoard"
                      value={retunvalue("certifyingBoard")}
                      onChange={handleChange("certifyingBoard")}
                    />
                  </div>
                  <div className="mt-3">
                    <label>
                      Certification Number{" "}
                      <span className="text-danger"> *</span>
                    </label>

                    <input
                      className={emailErrorColor("certificationNumber")}
                      placeholder="Certification Number"
                      name="certificationNumber"
                      value={retunvalue("certificationNumber")}
                      onChange={handleChange("certificationNumber")}
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                </div>

                <div className="col-md-6 mt-3 px-4">
                  <div className="col-xl-6 col-lg-6 col-xl-6 col-md-12 col-sm-12">
                    <div>
                      <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                        <div className="text-center py-2 mt-1 ">
                          <IoCloudUploadOutline
                            color="#9C9CA8"
                            opacity={0.49}
                            style={{ height: "36px", width: "42px" }}
                            className="me-2"
                          />
                          <div
                            className="f18 px-4 mt-2"
                            style={{ height: "46px", color: "#3A3952" }}
                          >
                            Upload your documents or <br /> drag and drop in
                            this box
                          </div>

                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept=".pdf,.doc,.docx"
                            name="imageOne"
                            onChange={handleImageUpload("imageOne")}
                          />

                          <div
                            className="  upload40 d-flex justify-content-center align-items-center"
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
                      {errors && errors.imageOne && (
                        <p className="text text-danger">{errors.imageOne}</p>
                      )}
                    </div>
                  </div>

                  <div className=" row vertical-scrolbar px-3 py-1 mt-2">
                    {additionaldocData &&
                      additionaldocData?.map((v) => {
                        return (
                          <label className="px-0 py-2 upload-file-css border-top-bottom py-1">
                            <MdDelete
                              onClick={() => DeleteuploadsOne(v?.uploadId)}
                              style={{ width: "13px", height: "16px" }}
                              className="me-2 mb-1 mt-1 pointer"
                              color="#ABAAB5"
                            />{" "}
                            <a
                              href={
                                Image_Base_Url + `/FormUploads/${v?.fileName}`
                              }
                              target={"_blank"}
                              download={true}
                            >
                              {v && v?.originalFileName}
                            </a>
                          </label>
                        );
                      })}
                  </div>
                </div>
              </div>
             
                <button
                  onClick={submitdocuments}
                  disabled={formname?.isLogged=="Yes"}
                  style={{ background: formname?.isLogged=="Yes"?"#649dff":"#00B948" }}
                  className=" text-white col-md-2 f16 medium border rounded py-2 pointer ms-1"
                  // style={{background:"#357FFA"}}
                
                >
                  Verify
                </button>
              
            </div>
          ) : (
            <div className="row bg-white mt-2 p-4">
              <div className="f20 medium">Downloads</div>
              <div className=" row vertical-scrolbar px-3 py-1 mt-2">
              <div className="row">
<div className="col-md-4 f14 medium">File Name</div>
<div className="col-md-4 f14 medium">Certifying Board</div>
<div className="col-md-4 f14 medium">Certification Number</div>
<hr className="m-0 p-0"/>

                   </div>
                {additionaldocData &&
                  additionaldocData?.map((v) => {
                    return (
                   <>
                   
                     <div className="row px-2 py-2 upload-file-css border-top-bottom py-1">
                      <div className="col-md-4">
                      <label className="">
                        <a
                          href={Image_Base_Url + `/FormUploads/${v?.fileName}`}
                          target={"_blank"}
                          download={true}
                        >
                          <img
                            src={download}
                            alt="cred"
                            className="me-2 "
                            title="Download"
                            style={{
                              objectFit: "fill",
                              width: "17px",
                              height: "16px",
                            }}
                          />

                          {v && v?.originalFileName}
                        </a>
                      </label>  
                      </div>
                      <div className="col-md-4" title={v && v?.documentName}>   <label>{v && v?.documentName}</label></div>
                     <div className="col-md-4" title= {v && v?.documentDescription}> <label>{v && v?.documentDescription}</label></div>
                     </div>
                   
                   </>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MedicalAndStateLicense;
