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

const AddHealthDocumentModal = (props) => {
  const [CategoryList, setCategoryList] = useState([]);
  const [licenseList, setLicenseList] = useState();
  const [update, setUpdate] = useState("");
  const [uploadeddata, setuploadeddata] = useState();
  const { providerId } = useParams();
  const [healthMaster, setHealthMaster] = useState([]);


  const submit = async () => {
    let formdata = new FormData();
    let array = [
      {
        id: props?.show?.id ? props?.show?.id : 0,
        appointmentId: props?.show?.appointmentId,
        providerId: providerId,
        templateType: "Health Document",
        formId: 0,
        type: data?.type,
        category:"Immunization",
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

  const healthDocumentMaster = async () => {
    let jsonObjects = {
      type: "Health Document",
      globalId: 0,
      credentialType:"Immunization",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setHealthMaster(res);
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
    handleCapitalChange,
    handleDateChange,
  } = UseFormValidations({
    initialValues: {
      type: "",
      completionDate: "",
      expirationDate: "",
      verifiedBy: "",
      verifiedDate: "",
    },
    validationSchema: {
      type: {
        required: {
          value: true,
          message: "Please enter your Facility Name",
        },
      },
      completionDate: {
        required: {
          value: true,
          message: "Please enter your mobile",
        },
      },

      expirationDate: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      verifiedBy: {
        required: {
          value: true,
          message: "Please enter your Role Name",
        },
      },
      verifiedDate: {
        required: {
          value: true,
          message: "Please enter your Role Name",
        },
      },
    },
    submit: submit,
  });
  const returnEstId = () => {
    return props?.show?.id &&
      props?.show?.id != undefined &&
      props?.show?.id != "" &&
      props?.show?.id != "0"
      ? true
      : false;
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



  useEffect(() => {
    if (data?.credType) {
      DropdownMaster("Credentialing Category", setCategoryList, data?.credType);
    }
  }, [data?.credType]);


  useEffect(() => {
    healthDocumentMaster();
  }, []);

  useEffect(() => {
    getbyid();
  }, [props?.show?.id]);

  useEffect(() => {
    setValues(licenseList?.documentData);
  }, [licenseList]);



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
              {returnEstId() ? "Edit Health Document" : " Add Health Document"}
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
                <div className="col-md-4 mt-2">
                  <label>
                    Health Document <span className="text-danger">*</span>
                  </label>

                  <select
                    className={emailErrorColor1("type")}
                    value={data?.type}
                    onChange={handleChange("type")}
                  >
                    <option value={""}>Select</option>
                    {healthMaster &&
                      healthMaster?.map((v) => {
                        return <option value={v?.name}>{v?.name}</option>;
                      })}
                  </select>
                </div>

                <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                  <label>
                    Completion Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("completionDate")} py-2`}
                    minDate={new Date(1900, 1, 1)}
                    maxDate={new Date()}
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
                <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                  <label>
                    Expiration Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("expirationDate")} py-2`}
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
                <div className="col-lg-4 col-xl-4 col-md-4 mt-2 ">
                  <label>
                    Verified By <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Verified By "
                    className={emailErrorColor("verifiedBy")}
                    name="verifiedBy"
                    value={data?.verifiedBy}
                    onChange={handleCapitalChange("verifiedBy")}
                  />
                </div>
                <div className="col-lg-4 col-xl-4 col-md-4 mt-2">
                  <label>
                    Verified On <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className={`${emailErrorColor("verifiedDate")} py-2`}
                    minDate={new Date(1900, 1, 1)}
                    selected={
                      data?.verifiedDate && new Date(data?.verifiedDate)
                    }
                    autoComplete="off"
                    name="verifiedDate"
                    onChange={(e) => {
                      handleDateChange(e, "verifiedDate");
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

export default AddHealthDocumentModal;
