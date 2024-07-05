import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../../validations/UseFormValidation";
import {
  IoAlertCircleSharp,
  IoCloudDownloadSharp,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Image_Base_Url, urls } from "../../api_services/url";
import download from "../../assets/images/folder-download.svg";
import { getList, save } from "../../api_services/SharedServices";
import { IoIosCheckmarkCircle } from "react-icons/io";
import moment from "moment";

const BoardCertifications = ({
  setNotify,
  setState,
  id,
  updateMsg,
  formname,
  setFormName,
  category,
  providerId,
  Deleteuploads,
  DoctorFormsView,
  requestMsgPopUp,
  setUpdateAppointmentList,
  setId,
  doctordtails,
  AppointmentList
}) => {
  const [getAll, setAll] = useState([]);
  console?.log(formname?.saveLog, "090909099");
  const [update, setUpdate] = useState([]);
  const [flag, setFlag] = useState(true);
  const [temp, setTemp] = useState([]);
  const [additionaldocData, setAdditionaldocData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const submit = async () => {
    let fomvalues = [
      { value: data?.certificationType },
      { value: data?.speciality },
      { value: data?.certification },
      { value: data?.issueDateBC },
      { value: data?.expirationDateBC },
      { value: data?.certificationStatus },
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
    let formdata = new FormData();
    let array = [
      {
        id: data?.id ? data?.id : 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        formId: formname?.formId,
        isSubmitted: greentick,
        templateType: "Certification",
        category: category,
        type: data?.certificationType,
        // percentage:(id?.isSubmitted!="Yes")?(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length+1)/(AppointmentList?.length - 1)) *100)?.toFixed(2):(((AppointmentList.slice(0, -1)?.filter((v) => v?.finalSubmit === "Yes")?.length)/(AppointmentList?.length - 1)) *100)?.toFixed(2),
        documentData: data,
      },
    ];
    formdata.append("JsonString", JSON.stringify(array));
    formdata.append("Image", data?.image);
    let res = await save(urls.forms.saveCertifications, formdata);
    setFlag(false);
    if (res?.data?.status) {
      setUpdate(res);
      setUpdateAppointmentList(res);
    }
  };
  const getallCertificate = async () => {
    let jsonObjects = {
      templateType: "Certification",
      category: category,
      appointmentId: formname?.appointmentId,
      // providerId:providerId
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
    handleImageUpload,
    addObject,
  } = UseFormValidations({ submit: submit });

  const add = () => {
    setFlag(false);
    setValues({});
  };

  const returnvalue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };
  let fields = [
    { label: "Certification Type/Name", value: data?.certificationType },
    { label: "Speciality/Subspecialty Certificate ", value: data?.speciality },
    { label: "Certification # ", value: data?.certification },
    {
      label: "Issue Date",
      // value: moment(data?.issueDateBC)?.format("MM/DD/YYYY"),
      value: data?.issueDateBC && moment(data?.issueDateBC)?.format("MM/DD/YYYY"),
    },
    {
      label: "Expiration Date",
      // value: moment(data?.expirationDateBC)?.format("MM/DD/YYYY"),
      value: data?.expirationDateBC && moment(data?.expirationDateBC)?.format("MM/DD/YYYY"),

    },
    { label: "Certification Status", value: data?.certificationStatus },
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
        id: 0,
        providerId: providerId,
        appointmentId: formname?.appointmentId,
        templateType: "Health Documents",
        formId: formname?.formId,
        documentName: data?.certifyingBoard,
        documentDescription: data?.certificationNumber,
        documentType: "Certification Verification",
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
      documentType: "Certification Verification",
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

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control  bg-white ";
  };

  useEffect(() => {
    setValues(temp);
    setState("");
  }, [temp]);
  useEffect(() => {
    if (getAll && data?.check) {
      let res = getAll?.filter(
        (v) => v?.documentData?.certificationType == data?.check
      );
      setValues(res[0]?.documentData);
      setId(res[0] || []);
      setNotify(res[0])

      formname["notify"] = res[0]?.requested;
      formname["saveLogKey"] = res[0]?.saveLog;
      setFormName(formname);
    }
  }, [getAll, data?.check]);

  useEffect(() => {
    category && getallCertificate();
  }, [category, update, updateMsg]);
  console?.log(getAll, "getAll");
  return (
    <>
      <div className="row p-2 mt-2 bg-white">
        <div className="col-md-8 d-flex gap-2">
          {
            <div className="col-md-auto ">
              {getAll &&
                getAll?.map((v) => {
                  return (
                    <button
                      onClick={() =>
                        addObject({
                          certificationType: v?.type,
                          check: v?.type,
                        })
                      }
                      className={
                        v?.type ==
                        (data?.certificationType != undefined &&
                          data?.certificationType)
                          ? `border pointer  ${
                              v?.requested == "Yes"
                                ? "requestedactive-bar"
                                : "active-bar"
                            } mx-1  text-white  p-2`
                          : "  border pointer  not-active   p-2 mx-1"
                      }
                      //  style={{ background: "#ECECEC", color: "#7E7E7E" }}
                    >
                      {v?.type != undefined &&
                        v?.type?.charAt(0).toUpperCase() +
                          v?.type?.slice(1)}{" "}
                      {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage.getItem("roleId")==6)&&
                        v?.isSubmitted == "Yes" && (
                          <IoIosCheckmarkCircle
                            className="mx-2"
                            color={
                              v?.type == data?.certificationType
                                ? "#ffff"
                                : "#7E7E7E"
                            }
                            size={16}
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      {sessionStorage.getItem("roleId") <= 4 && v?.isSubmitted == "Yes"&&
                        v?.saveLog === "Yes" && (
                          <IoIosCheckmarkCircle
                            color={
                              v?.type == data?.certificationType
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
                            v?.type == data?.certificationType
                              ? "#ffff"
                              : "#D5352F"
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
        {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") >3:sessionStorage?.getItem("roleId") >4) &&formname?.finalLock=="No"&& (
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="save text-white  border rounded py-2 px-2"
              onClick={add}
            >
              {" "}
              + Add Certification
            </button>
          </div>
        )}
      </div>
      {DoctorFormsView ? (
        <form onSubmit={handleSubmit}>
          <div className="row bg-white p-2 mt-2" style={{ minHeight: "130vh" }}>
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mt-1">{requestMsgPopUp()}</div>
            )}
            <div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label>
                    Certification Type/Name{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Type/Name"
                    value={returnvalue("certificationType")}
                    onChange={handleChange("certificationType")}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label>
                    Speciality/Subspecialty Certificate{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Speciality"
                    value={returnvalue("speciality")}
                    onChange={handleChange("speciality")}
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    Certification # <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Certification #…"
                    value={returnvalue("certification")}
                    onChange={handleChange("certification")}
                  />
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
                    selected={data?.issueDateBC && new Date(data?.issueDateBC)}
                    autoComplete="off"
                    name="issueDateBC"
                    onChange={(e) => {
                      handleDateChange(e, "issueDateBC");
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
                      data?.expirationDateBC && new Date(data?.expirationDateBC)
                    }
                    autoComplete="off"
                    name="expirationDateBC"
                    onChange={(e) => {
                      handleDateChange(e, "expirationDateBC");
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
                    Certification Status <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-white"
                    name="certificationStatus"
                    value={returnvalue("certificationStatus")}
                    onChange={handleChange("certificationStatus")}
                  >
                    <option value={""}>Select</option>
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
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
              <div className="mt-1">{requestMsgPopUp()}</div>
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
                      value={returnvalue("certifyingBoard")}
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
                      value={returnvalue("certificationNumber")}
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
                  className=" text-white col-md-2 f16 medium border rounded py-2 pointer ms-1"
                  disabled={formname?.isLogged=="Yes"}
                  style={{ background: formname?.isLogged=="Yes"?"#649dff":"#00B948" }}
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
                   
                 <div className="col-md-4">     <label className="">
                        <a
                          href={Image_Base_Url + `/FormUploads/${v?.fileName}`}
                          target={"_blank"}
                          download={true}
                        >
                          {" "}
                          <img
                            src={download}
                            alt="cred"
                         
                            title="Download"
                            className="me-2 "
                            style={{
                              objectFit: "fill",
                              width: "17px",
                              height: "16px",
                            }}
                          />
                          {v && v?.originalFileName}
                        </a>
                      </label></div>
                      <div className="col-md-4" title={v && v?.documentName} >   <label>{v && v?.documentName}</label></div>
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

export default BoardCertifications;
