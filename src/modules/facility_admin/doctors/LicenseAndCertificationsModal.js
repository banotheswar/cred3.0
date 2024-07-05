import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  DropdownMaster,
  getById,
  getList,
  save,
} from "../../../api_services/SharedServices";
import { Image_Base_Url, urls } from "../../../api_services/url";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { useParams } from "react-router-dom";
import { IoMdCloudDownload } from "react-icons/io";

const LicenseAndCertificationsModal = (props) => {
  console.log(props,"LicensoreProp")
  const [CategoryList, setCategoryList] = useState([]);
  const [licenseList,setlicenseList] = useState()
  const [stateList, setstateList] = useState();
  const [update, setUpdate] = useState("");
  const [uploadeddata, setuploadeddata] = useState();
  const { providerId } = useParams();
  const [licenseLists, setLicenseList] = useState();


  const submit = async () => {
    let formdata = new FormData();
    let array = [
      {
        id: props?.show?.id ? props?.show?.id : 0,
        appointmentId: props?.show?.appointmentId,
        providerId: providerId,
       templateType: "Licensure",
        formId: 0,
        type: data?.licenseType,
        isSubmitted: "Yes",
        documentData: data,
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", data?.image);
    let res = await save(urls?.forms?.saveCertifications, formdata);
    if (res?.data?.status) {
      if (data?.image) {
        Uploadfilessave(data?.image, "Single");
        data["image"] = "";
        props?.update(res);
        props?.onHide(false);
      } else {
        props?.update(res);
        props?.onHide(false);
      }
    }
  };

  const getbyid = async () => {
    let jsonObjects = {
      id: props?.show?.id && props?.show?.id,
    };
    let res = await getById(urls?.Appointments?.getLicenseCertifications, {
      jsonObjects,
    });
    setLicenseList(res);
    setuploadeddata(res);
  };

  const Uploadfilessave = async (files, Type, documentName) => {
    let formdata = new FormData();
    let array = [
      {
        providerId: providerId,
        appointmentId: props?.show?.appointmentId,
        formId: 0,
        documentName: data?.credCategory,
        documentType: data?.credType,
      },
    ];

    formdata.append("JsonString", JSON.stringify(array));
    formdata?.append("Image", files);
    let res = await save(urls?.forms?.saveUpload, formdata);
    if (res) {
      setUpdate(res);
    }
  };


  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    addObject,
    handleCapitalChange,
    handleCheckbox,
    handleDateChange,
    handleImageUpload,
  } = UseFormValidations({
    initialValues: {
        licenseType: "",
        licenseState:"",
        licenseNumber: "",
        issuedAuthority: "",
        // multiLicense: "",
        issueDate: "",
        expirationDate: "",
        licenseStatus: "",
        certificationrverifiedBy:"",
        certificationVerifiedDate:""
    },
    validationSchema: {
        licenseType: {
          required: {
            value: true,
            message: "Please enter your Facility Name",
          },
        },
        licenseState: {
          required: {
            value: true,
            message: "Please enter your mobile",
          },
        },
        licenseNumber: {
          required: {
            value: true,
            message: "Please enter your mobile",
          },
        },
        issuedAuthority: {
          required: {
            value: true,
            message: "Please enter your mobile",
          },
        },
        // multiLicense: {
        //   required: {
        //     value: true,
        //     message: "Please enter your mobile",
        //   },
        // },
        issueDate: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        expirationDate: {
          required: {
            value: true,
            message: "Please enter your Last Name",
          },
        },
        licenseStatus: {
          required: {
            value: true,
            message: "Please enter your Last Name",
          },
        },
        certificationrverifiedBy: {
          required: {
            value: true,
            message: "Please enter your Role Name",
          },
        },
        certificationVerifiedDate: {
          required: {
            value: true,
            message: "Please enter your Role Name",
          },
        },
    },
    submit: submit,
  });
  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control border bg-white ";
  };

  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger rounded"
      : "form-select border bg-white rounded";
  };
  useEffect(()=>{
    DropdownMaster("License Type",setlicenseList)
  
 },[])

  useEffect(() => {
    DropdownMaster("State", setstateList);
  }, []);

  useEffect(() => {
    getbyid();
  }, [props?.show?.id]);

  useEffect(() => {
    setValues(licenseLists?.documentData);
  }, [licenseLists]);

  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  const retunvalue = (key)=>{
    return data?.[key]&&data?.[key]?data?.[key]:""
}


const returnEstId = () => {
  return props?.show?.id &&
    props?.show?.id != undefined &&
    props?.show?.id != "" &&
    props?.show?.id != "0"
    ? true
    : false;
};
  return (
    <Modal
      {...props}
      size="xl"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
    >
      {" "}
      <form onSubmit={handleSubmit}>
        <Modal.Header style={{ background: "#F7F7F7" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            <div className="modal-header-text">
              
              {returnEstId() ? "Edit License" : " Add License"}
              
              </div>{" "}
          </Modal.Title>

          <div className="d-flex">
            <div className="pointer" onClick={props?.onHide}>
              <RxCross2 size={25} />
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className=" bg-white p-2">
            <div className="">
              <div className="row ">

                <div className="row">
                  <div className="col-lg-4 col-xl-4 col-md-4">
                    <label>
                      Type <span className="text-danger">*</span>
                    </label>
                    <select
                    className={emailErrorColor1("licenseType")}
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
                  <div className="col-lg-4 col-xl-4 col-md-4">
                    <label>
                      License State <span className="text-danger">*</span>
                    </label>
                    <select
                       className={emailErrorColor1("licenseState")}
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
                  <div class="col-lg-4 col-xl-4 col-md-4">
                    <label>
                      Issued Authority <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Issued Authority"
                      className={emailErrorColor("issuedAuthority")}
                      name="issuedAuthority"
                      value={data?.issuedAuthority}
                      onChange={handleCapitalChange("issuedAuthority")}
                    />
                  </div>
                  <div class="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      Multi-State License?{" "}
                      <span className="text-danger">*</span>
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
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      License Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className={emailErrorColor("licenseNumber")}
                      placeholder="License Number *"
                      name="licenseNumber"
                      value={data?.licenseNumber}
                      onChange={handleChange("licenseNumber")}
                    ></input>
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      Issue Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className={`${emailErrorColor("issueDate")} py-2`}
                      minDate={new Date(1900, 1, 1)}
                      maxDate={new Date()}
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
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      Expiration Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                     className={`${emailErrorColor("expirationDate")} py-2`}
                      //   minDate={new Date(1900, 1, 1)}
                      minDate={new Date()}
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
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      License Status <span className="text-danger">*</span>
                    </label>
                    <select
                     className={emailErrorColor1("licenseStatus")}
                      name="licenseStatus"
                      value={data?.licenseStatus}
                      onChange={handleChange("licenseStatus")}
                    >
                      <option value={""}>Select</option>
                      <option>Active</option>
                      <option>InActive</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      Taxonomy Code <span className="text-danger">*</span>
                    </label>
                    <input
                      className={emailErrorColor("taxonomyCode")}
                      placeholder="Taxonomy Code "
                      name="taxonomyCode"
                      value={data?.taxonomyCode}
                      onChange={handleChange("taxonomyCode")}
                    ></input>
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2 ">
                    <label>
                      Verified By <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=" Verified By "
                      className={emailErrorColor("certificationrverifiedBy")}
                      name="certificationrverifiedBy"
                      value={data?.certificationrverifiedBy}
                      onChange={handleCapitalChange("certificationrverifiedBy")}
                    />
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                    <label>
                      Verified On <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className={`${emailErrorColor("certificationVerifiedDate")} py-2`}
                      minDate={new Date(1900, 1, 1)}
                      selected={
                        data?.certificationVerifiedDate && new Date(data?.certificationVerifiedDate)
                      }
                      autoComplete="off"
                      name="certificationVerifiedDate"
                      onChange={(e) => {
                        handleDateChange(e, "certificationVerifiedDate");
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

                  <div className="col-lg-3 col-xl-3 col-md-4 mt-2">
                    <label>Upload File</label>
                    <input
                      className={emailErrorColor("image")}
                      type="file"
                      id="fileInput"
                      accept=".pdf,.doc,.docx"
                      name="image"
                      onChange={handleImageUpload("image")}
                    />
                  </div>
                  <div className="col-lg-1 col-xl-1 col-md-4 mt-2">
                    <label>Uploads</label>
                    <a
                      href={
                        Image_Base_Url +
                        `/FormUploads/${uploadeddata?.fileName}`
                      }
                      target={"_blank"}
                      download={true}
                    >
                      <IoMdCloudDownload size={20} />
                    </a>
                  </div>
                </div>
                {/* </>
                )} */}

                {data?.credType == "Certification" && (
                  <>
                    <div className="row mt-2">
                      <div className="col-lg-4 col-xl-4 col-md-4">
                        <label>
                          Certification Type/Name{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className={emailErrorColor1("credCategory")}
                          value={dataValue(data?.credCategory)}
                          name="credCategory"
                          onChange={handleChange("credCategory")}
                        >
                          <option value={""}>Select Type</option>
                          {CategoryList &&
                            CategoryList?.map((v) => {
                              return <option>{v?.name}</option>;
                            })}
                        </select>
                      </div>

                      <div className="col-lg-4 col-xl-4 col-md-4">
                        <label>
                          Speciality/Subspecialty Certificate{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Speciality"
                          name="speciality"
                          value={data?.speciality}
                          onChange={handleChange("speciality")}
                        />
                      </div>
                      <div className="col-lg-4 col-xl-4 col-md-4">
                        <label>
                          Certification # <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Certification #…"
                          value={data?.certification}
                          name="certification"
                          onChange={handleChange("certification")}
                        />
                      </div>

                      <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                        <label>
                          Issue Date <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          className={"form-control py-2"}
                          minDate={new Date(1900, 1, 1)}
                          maxDate={new Date()}
                          selected={
                            data?.certificationissueDate &&
                            new Date(data?.certificationissueDate)
                          }
                          autoComplete="off"
                          name="certificationissueDate"
                          onChange={(e) => {
                            handleDateChange(e, "certificationissueDate");
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
                      <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                        <label>
                          Expiration Date <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          className={"form-control py-2"}
                          minDate={new Date()}
                          selected={
                            data?.certificationexpirationDate &&
                            new Date(data?.certificationexpirationDate)
                          }
                          autoComplete="off"
                          name="certificationexpirationDate"
                          onChange={(e) => {
                            handleDateChange(e, "certificationexpirationDate");
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

                      <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                        <label>
                          Certification Status{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select bg-white"
                          name="certificationStatus"
                          value={data?.certificationStatus}
                          onChange={handleChange("certificationStatus")}
                        >
                          <option value={""}>Select</option>
                          <option>Active</option>
                          <option>InActive</option>
                        </select>
                      </div>

                      <div className="col-lg-4 col-xl-4 col-md-4 mt-2 ">
                        <label>
                          Verified By <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Verified By "
                          className={emailErrorColor(
                            "certificationrverifiedBy"
                          )}
                          name="certificationrverifiedBy"
                          value={data?.certificationrverifiedBy}
                          onChange={handleCapitalChange(
                            "certificationrverifiedBy"
                          )}
                        />
                      </div>
                      <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                        <label>
                          Verified On <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          className={`${emailErrorColor(
                            "certificationverifiedDate"
                          )} py-2`}
                          minDate={new Date(1900, 1, 1)}
                          selected={
                            data?.certificationverifiedDate &&
                            new Date(data?.certificationverifiedDate)
                          }
                          autoComplete="off"
                          name="certificationverifiedDate"
                          onChange={(e) => {
                            handleDateChange(e, "certificationverifiedDate");
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

                      <div className="col-lg-3 col-xl-3 col-md-4 mt-2">
                        <label>Upload File</label>
                        <input
                          className={emailErrorColor("image")}
                          type="file"
                          id="fileInput"
                          accept=".pdf,.doc,.docx"
                          name="image"
                          onChange={handleImageUpload("image")}
                        />
                      </div>
                      <div className="col-lg-1 col-xl-1 col-md-4 mt-2">
                        <label>Uploads</label>
                        <a
                          href={
                            Image_Base_Url +
                            `/FormUploads/${uploadeddata?.fileName}`
                          }
                          target={"_blank"}
                          download={true}
                        >
                          <IoMdCloudDownload size={20} />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="row gap-2 px-2">
            <button
              type="submit"
              className=" col-md-auto save-user  border rounded     pointer  "
            >
              Save
            </button>
            <button
              className="col-md-auto border cancel-user rounded    pointer "
              onClick={props?.onHide}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LicenseAndCertificationsModal;
