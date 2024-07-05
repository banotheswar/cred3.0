import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import {
  getById,
  getList,
  phoneFormat,
  save,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
const FacilityLocationCreateModal = (props) => {

console?.log(props,"propswww")


  const [statesList, setStatesList] = useState([]);
  const [facilityObj, setFacilityObj] = useState({});

  const submit = async () => {
    data["facilityId"] =
      props?.show != true && props?.show > 0 ? props?.show : 0;
      data["organizationId"]=sessionStorage.getItem("organizationId")
    let jsonObjects = data;
    let res = await save(urls?.settings?.createFacilityLocation, {
      jsonObjects,
    });
    if (res?.data?.status) {
      props?.updateList(res);
      props?.onHide();
    }
  };
  const ByIdFacilityLocation = async () => {
    let jsonObjects = { facilityId: props?.show, };
    let res = await getById(urls?.settings?.getAllFacilityLocation, {
      jsonObjects,
    });
    setFacilityObj(res);
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

  const {
    data,
    errors,
    setValues,
    handleChange,
    handlePhoneChange,
    handleEmailChange,
    handleSubmit,
    handleCheckbox,
    handleAlphabetChange,
    handleNumberChange,
  } = UseFormValidations({
    initialValues: {
      email: "",
      phone: "",
      fax: "",
      address: "",
      city: "",
      abbreviation:"",
      facilityName: "",
      zipCode: "",
      managerFirstName: "",
      managerLastName: "",
    },
    validationSchema: {
      email: {
        required: {
          value: true,
          message: "Please enter email id",
        },
        pattern: {
          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          message: "Please enter a valid email id",
        },
      },
      facilityName: {
        required: {
          value: true,
          message: "Please enter facilityName",
        },
      },
      address: {
        required: {
          value: true,
          message: "Please enter address",
        },
      },
      city: {
        required: {
          value: true,
          message: "Please enter password",
        },
      },
      abbreviation: {
        minlength: {
          value: 0,
          message: "Please enter 10 digite phone number",
        },
        maxlength: {
          value: 4,
          message: "Please enter 10 digite phone number",
        },
        required: {
          value: true,
          message: " ",
        },
      },
      zipCode: {
        required: {
          value: true,
          message: "Please enter password",
        },
      },
      phone: {
        minlength: {
          value: 10,
          message: "Please enter 10 digite phone number",
        },
        maxlength: {
          value: 10,
          message: "Please enter 10 digite phone number",
        },
        required: {
          value: true,
          message: "Please enter password ",
        },
      },
      fax: {
        minlength: { value: 10, message: "Please enter 10 digite fax number" },
        maxlength: { value: 10, message: "Please enter 10 digite fax number" },
        required: {
          value: true,
          message: " Please enter password",
        },
      },
      managerFirstName: {
        required: {
          value: true,
          message: "Please enter password",
        },
      },
      managerLastName: {
        required: {
          value: true,
          message: "Please enter password",
        },
      },
    },
    submit: submit,
  });
  const dataValue = (key) => {
    return data?.[key] && data?.[key] != "" ? data?.[key] : "";
  };
  const errorCss = (key) => {
    return errors?.[key] && errors?.[key]
      ? "form-control border border-danger"
      : "form-control";
  };


  useEffect(() => {
    setValues(facilityObj);
  }, [facilityObj]);
  useEffect(() => {
    getStatesList();
  }, []);
  useEffect(() => {
    if (props?.show > 0) {
      ByIdFacilityLocation();
    }
  }, [props?.show]);
  console?.log(props?.show)
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
      style={{ borderRadius: "0px" }}
    >
      <Modal.Header style={{ background: "#F7F7F7" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="modal-header-text">
            {/* Add Locations */}
            {props&&props?.show&&props?.show!=true? "Edit Location" : " Add Location"}
          </div>
        </Modal.Title>

        <div className="d-flex">
          <div className="pointer" onClick={props?.onHide}>
            <RxCross2 size={25} />
          </div>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <div>
          <Modal.Body>
            <div className=" bg-white p-2">
             

          <div className="row">
     <div className="col-md-6">     <div className="col-xl-12 col-lg-4  col-md-12">
              <label className="">
                Location Name <span className="text-danger">*</span>
              </label>
                <input
                  className={errorCss("facilityName")}
                  placeholder="Location Name..."
                  type="text"
                  name="locationName"
                  value={dataValue("facilityName")}
                  onChange={handleAlphabetChange("facilityName")}
                />
              </div>
              <div className=" form-check py-1  ">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isMainLocation"
                  value={"yes"}
                  checked={data?.isMainLocation == "yes" ? true : false}
                  onChange={handleCheckbox("isMainLocation")}
                />
                <label class="form-check-label  pointer" for="isMainLocation">
                  Set As Main Location
                </label>
              </div></div>
          <div className="col-md-6">

          <div className="col-xl-6 col-lg-4  col-md-12">
              <label className="">
              Code  <span className="text-danger">*</span>
              </label>
                <input
                  className={errorCss("abbreviation")}
                  placeholder="Code..."
                  type="text"
                  name="abbreviation"
                  maxLength={4}
                  value={dataValue("abbreviation")}
                  onChange={handleChange("abbreviation")}
                />
              </div>


          </div>
          </div>

       
          

              <div className="row ">
                <div className="formssubheading mb-3">
                  Address <span className="text-danger">*</span>
                </div>

                <div className="col-md-12">
                  <input
                    className={errorCss("address")}
                    placeholder="Address"
                    type="text"
                    name="street"
                    value={dataValue("address")}
                    onChange={handleChange("address")}
                  />
                </div>

                <div className="col-xl-4 col-lg-4  col-md-6 mt-2">
                  <input
                    className={errorCss("city")}
                    placeholder="City"
                    type="text"
                    value={dataValue("city")}
                    onChange={handleAlphabetChange("city")}
                  />
                </div>
                <div className="col-xl-4 col-lg-4  col-md-6 mt-2">
                 
                  <select
                    className={`form-select ${errorCss("state")}`}
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
                <div className="col-xl-4 col-lg-4  col-md-6 mt-2">
                  <input
                    className={errorCss("zipCode")}
                    placeholder="Zip Code"
                    type="text"
                    maxLength={5}
                    value={dataValue("zipCode")}
                    onChange={handleNumberChange("zipCode")}
                  />
                </div>
              </div>
              <div className="row  ">
                <div className="formssubheading mb-3">
                  Office Manager / Administrator
                </div>

                <div className="col-xl-4 col-lg-4  col-md-6">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className={errorCss("managerFirstName")}
                    placeholder="First Name..."
                    type="text"
                    value={dataValue("managerFirstName")}
                    onChange={handleAlphabetChange("managerFirstName")}
                  />
                </div>

                <div className="col-xl-4 col-lg-4  col-md-6">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>

                  <input
                    className={errorCss("managerLastName")}
                    placeholder="Last Name..."
                    type="text"
                    value={dataValue("managerLastName")}
                    onChange={handleAlphabetChange("managerLastName")}
                  />
                </div>
                <div className="col-xl-4 col-lg-4  col-md-6">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>

                  <input
                    className={errorCss("email")}
                    placeholder="name@example.com"
                    type="text"
                    value={dataValue("email")}
                    onChange={handleEmailChange("email")}
                  />
                </div>
                <div className="col-xl-4 col-lg-4  col-md-6">
                  <label>
                    Phone <span className="text-danger">*</span>
                  </label>

                  <input
                    className={errorCss("phone")}
                    placeholder="(xxx) xxx-xxxx"
                    type="text"
                    value={phoneFormat(data?.phone)}
                    onChange={handlePhoneChange("phone")}
                  />
                  {
                    <p className="text-danger">
                      {errors?.phone && errors?.phone}
                    </p>
                  }
                </div>
                <div className="col-xl-4 col-lg-4  col-md-6">
                  <label>Fax</label>

                  <input
                    className={errorCss("fax")}
                    placeholder="(xxx) xxx-xxxx"
                    type="text"
                    value={phoneFormat(data?.fax)}
                    onChange={handlePhoneChange("fax")}
                  />
                  {<p className="text-danger">{errors?.fax && errors?.fax}</p>}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end  gap-2">
            {sessionStorage?.getItem("roleId") != 4 && (    <button
                className="border btn  rounded   pointer text-white "
                style={{ background: "#00B948" }}
                type="submit"
              >
                Save
              </button>)}

              <dbutton
                className=" border btn cancel-user rounded    pointer "
                onClick={props?.onHide}
              >
                Cancel
              </dbutton>
            </div>
          </Modal.Footer>
        </div>
      </form>
    </Modal>
  );
};

export default FacilityLocationCreateModal;
