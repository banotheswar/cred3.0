import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { DropdownMaster,usphoneFormat,} from "../api_services/SharedServices";
import { Image_Base_Url } from "../api_services/url";
import moment from "moment";
import { useParams } from "react-router-dom";

const IdentifyingInformation = ({values,getFormdata,Deleteuploads,id, requestMsgPopUp,DoctorFormsView}) => {
  const [state, setState] = useState();
  const{formId}=useParams()
  console?.log(id?.isSubmitted,"iiii")
  const submit = () => {
    let fomvalues = [
      { value: data?.address },
      { value: data?.city },
      { value: data?.state },
      { value: data?.zipCode },
      { value: data?.pager },
      { value: data?.phone },
      { value: data?.email },
      { value: data?.licenseState },
      { value: data?.licenseNumber },
      { value: data?.ssn },
      { value: data?.birthDate },
      { value: data?.birthState },
      { value: data?.birthCity },
      { value: data?.mobile },
      { value: data?.languageSpoken },
      { value: data?.usCitizen }
    ];
    const someValueIsMissingData = fomvalues.some(
      (item) => item.value === undefined || item.value === ""
    );
    const greentick = someValueIsMissingData == true ? "No" : "Yes";
    if (data?.fileName && data?.image != undefined && data?.image != "") {
      Deleteuploads(id?.uploadId);
    }

    values(id, data, greentick, data?.image);
  };
  const {
    data,
    errors,
    handleNumberChange,

    handleCheckbox,
    handleChange,
    handleEmailChange,
    handleSubmit,
    handleDateChange,
    handlePhoneChange,
    handleImageUpload,
    setValues,
  } = UseFormValidations({
    submit: submit,
  });

  let identifyingInformation = [
    { label: "Email", value: data?.email },
    { label: "Phone", value: usphoneFormat(data?.phone) },
    { label: "Mobile", value: usphoneFormat(data?.mobile) },
    { label: "Pager", value: usphoneFormat(data?.pager) },
    { label: "Address", value: data?.address },
    { label: "Driver's License State", value: data?.licenseState },
    { label: "Driver's License #", value: data?.licenseNumber },
    { label: "Social Security #", value: data?.ssn },
    {
      label: "Birth Date ",
      value: data?.birthDate && moment(data?.birthDate)?.format("MM/DD/YYYY"),
    },
    { label: "Birth City ", value: data?.birthCity },
    { label: "Birth State ", value: data?.birthState },
    {
      label: "Are You U.S.Citizen?",
      value: data?.usCitizen && ((data?.usCitizen == "usCitizen_Yes" && "Yes")||(data?.usCitizen == "usCitizen_No" && "No")),
    },
    { label: "Languages Spoken", value: data?.languageSpoken },
    {
      label: "Driver’s License",
      link: data?.fileName,
      originalFile: data?.originalFileName,
    },
  ];

 const validateSave=Object.keys(data).some((v)=>data[v]!="")

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };
  const emailErrorColorRadio = (key) => {
    return errors && errors?.[key] ? " bg-white  border-danger" : "  bg-white ";
  };
  const emailErrorColorSelect = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };

  useEffect(() => {
    if (getFormdata) {
      getFormdata["fileName"] = id?.fileName;
      getFormdata["originalFileName"] = id?.originalFileName;
      getFormdata["image"] = "";
      setValues(getFormdata);
    }
  
  }, [getFormdata]);
  useEffect(() => {
    DropdownMaster("State", setState);
  }, []);

  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  return (
    <>
      <div className="row py-2 px-2  mt-2 bg-white ">
        {" "}
        <div className="">
          {!formId&&requestMsgPopUp != "" && (
            <div className="py-2">{requestMsgPopUp()}</div>
          )}
          {DoctorFormsView||formId ? (
            <form onSubmit={handleSubmit}>
              <div className=" formssubheading ">
                Contact Information <span className="text-danger">*</span>
              </div>
              <div className="row mt-2">
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("email")}
                    placeholder="emcdaniel@gmail.com"
                    name="email"
                    value={data?.email}
                    onChange={handleEmailChange("email")}
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <label>
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("phone")}
                    placeholder="(xxx) xxx-xxxx"
                    name="phone"
                    value={usphoneFormat(data?.phone)}
                    onChange={handlePhoneChange("phone")}
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <label>
                    Mobile <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("mobile")}
                    placeholder="(xxx) xxx-xxxx"
                    name="mobile"
                    value={usphoneFormat(data?.mobile)}
                    onChange={handlePhoneChange("mobile")}
                  ></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <label>Fax</label>
                  <input
                    className="form-control bg-white"
                    placeholder="Fax"
                    name="fax"
                    value={usphoneFormat(data?.fax)}
                    onChange={handlePhoneChange("fax")}
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <label>
                    Pager <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("pager")}
                    placeholder="Pager"
                    name="pager"
                    value={usphoneFormat(data?.pager)}
                    onChange={handlePhoneChange("pager")}
                  ></input>
                </div>
              </div>
              <div className=" formssubheading " style={{ height: "20px" }}>
                Home Address <span className="text-danger">*</span>
              </div>
              <div className="mt-2 row">
                <div className="col-md-12 ">
                  <input
                    placeholder="Address"
                    className={emailErrorColor("address")}
                    value={data?.address}
                    onChange={handleChange("address")}
                  ></input>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <input
                    className={emailErrorColor("city")}
                    value={data?.city}
                    onChange={handleChange("city")}
                    placeholder="City"
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <input
                    className={emailErrorColor("state")}
                    value={data?.state}
                    onChange={handleChange("state")}
                    placeholder="State"
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-4 col-md-12  col-sm-12">
                  <input
                    className={emailErrorColor("zipCode")}
                    value={data?.zipCode}
                    onChange={handleNumberChange("zipCode")}
                    maxLength={5}
                    placeholder="Zip Code"
                  ></input>
                </div>
              </div>
              <div
                className=" formssubheading py-2 "
                style={{ height: "20px" }}
              >
                Additional Information <span className="text-danger">*</span>
              </div>
              <div className="row mt-3">
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Driver’s License State{" "}
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    className={emailErrorColor("licenseState")}
                    value={data?.licenseState}
                    onChange={handleChange("licenseState")}
                    placeholder="Driver’s License State"
                  ></input>
                </div>
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Driver’s License # <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("licenseNumber")}
                    value={data?.licenseNumber}
                    onChange={handleChange("licenseNumber")}
                    placeholder="Driver’s License #"
                  ></input>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Social Security # <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("ssn")}
                    value={data?.ssn}
                    onChange={handleChange("ssn")}
                    placeholder="Social Security #"
                  ></input>
                </div>
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Birth Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("birthDate")} py-2`}
                    minDate={new Date(1900, 1, 1)}
                    selected={data?.birthDate && new Date(data?.birthDate)}
                    autoComplete="off"
                    name="birthDate"
                    onChange={(e) => {
                      handleDateChange(e, "birthDate");
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
              <div className="row mt-2">
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Birth City <span className="text-danger">*</span>
                  </label>
                  <input
                    className={emailErrorColor("birthCity")}
                    value={data?.birthCity}
                    onChange={handleChange("birthCity")}
                    placeholder="Birth City"
                  ></input>
                </div>
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <label>
                    Birth State <span className="text-danger">*</span>
                  </label>
                  <select
                    className={emailErrorColorSelect("birthState")}
                    name="birthState"
                    value={data?.birthState}
                    onChange={handleChange("birthState")}
                  >
                    <option value={""}>Select State</option>
                    {state &&
                      state?.map((v) => (
                        <option value={v?.stateId}>{v?.stateName}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div
                className={`formssubheading ${emailErrorColorRadio(
                  "usCitizen"
                )}`}
                style={{ height: "20px" }}
              >
                Are you a U.S. citizen? <span className="text-danger">*</span>
              </div>
              <div className="row ">
                <div className="checkboxWithText  col-md-auto">
                  <input
                    type="radio"
                    style={{ height: "14px", width: "14px" }}
                    name="usCitizen"
                    value="usCitizen_Yes"
                    id="Yes"
                    checked={checkFun("usCitizen", "usCitizen_Yes")}
                    onChange={handleCheckbox("usCitizen")}
                  />
                  <label for="Yes">Yes</label>
                </div>
                <div className="checkboxWithText  col-md-auto">
                  <input
                    type="radio"
                    style={{ height: "14px", width: "14px" }}
                    name="usCitizen"
                    value="usCitizen_No"
                    id="No"
                    checked={checkFun("usCitizen", "usCitizen_No")}
                    onChange={handleCheckbox("usCitizen")}
                  />
                  <label for="No" style={{ color: "", opacity: "" }}>
                    No
                  </label>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-6 col-xl-6 col-md-12">
                  <div
                    className="formssubheading py-1"
                    style={{ height: "20px" }}
                  >
                    Languages Spoken <span className="text-danger">*</span>
                  </div>
                  <textarea
                    className={emailErrorColor("languageSpoken")}
                    value={data?.languageSpoken}
                    onChange={handleChange("languageSpoken")}
                    style={{ minHeight: "100px" }}
                  ></textarea>
                </div>
              </div>

              <div
                className="formssubheading-upload mt-5  col-lg-12 col-xl-12 col-md-12"
                style={{ height: "20px" }}
              >
                Upload a photo or scan of your Driver’s License{" "}
                {/* <span className="text-danger">*</span> */}
              </div>

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

                  {id && id?.originalFileName && (
                    <div className=" row vertical-scrolbar px-3 py-1 mt-2">
                      <label className="px-0 py-2 upload-file-css border-top-bottom py-1">
                        <MdDelete
                          onClick={() => Deleteuploads(id?.uploadId)}
                          style={{ width: "13px", height: "16px" }}
                          className="me-2 mb-1 mt-1 pointer"
                          color="#ABAAB5"
                        />{" "}
                        <a
                          href={Image_Base_Url + `/FormUploads/${id?.fileName}`}
                          target={"_blank"}
                          download={true}
                        >
                          {id && id?.originalFileName}
                        </a>
                        {/* {uploadeddata[0]?.fileName} */}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <hr className=" mt-5" style={{ marginLeft: "10px" }} />
              <div className="py-3">
                <button
                disabled={validateSave==false?true:false}
                  type="submit"
                  className={validateSave==false?"btn button  col-md-2 border rounded py-2":"button text-white col-md-2 border rounded py-2"}
                >
                  Save & Continue
                </button>
              </div>
            </form>
          ) : (
            <div>
              {identifyingInformation?.map((v) => {
                return (
                  <>
                    <div className="row border-top-bottom py-2">
                      {v?.heading && (
                        <h6 className="m-0 p-0 mt-4">{v?.heading}</h6>
                      )}
                      <div className="col-md-3 px-2 label">{v?.label}</div>
                      {v?.value && (
                        <div className="col-md-8 ">
                          {" "}
                          <label>{v?.value}</label>
                        </div>
                      )}

                      {v?.link && (
                        <div className="col-md-8 ">
                          <a
                            href={Image_Base_Url + `/FormUploads/${v?.link}`}
                            target={"_blank"}
                            download={true}
                          >
                            {v?.originalFile}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IdentifyingInformation;
