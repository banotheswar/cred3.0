import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { urls } from "../../../../../api_services/url";
import { getList, save } from "../../../../../api_services/SharedServices";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";

const AddTemplateModal = (props) => {
  console?.log(props, "Add Application Template");
  const [specialityList, setSpecialityList] = useState([]);
  const [template, setTemplate] = useState([]);
  const submit = async () => {
    let jsonObjects = {
      packageId: props?.show > 0 ? props?.show : 0,
      packageName: data?.packageName,
      type: data?.type,
      speciality: data?.speciality,
    };

    let res = await save(urls.applicationBuilder.saveTemplate, { jsonObjects });
    if (res?.data?.status) {
      props?.onHide();
      props?.update && props?.update(res);
      data["type"] = data?.type;
    }
  };

  
  const getSpecialityList = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });

    let obj = res?.map((value) => {
      return { label: value?.specialityName, value: value?.specialityId };
    });
    setSpecialityList(obj);
  };




  const getByIdTemplate = async () => {
    let jsonObjects = { packageId: props?.show,
      type:"Application"
     };
    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    if (res) {
      setTemplate(res[0] || {});
    }
  };


  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleMultiSelect,
    setValues,
  } = UseFormValidations({
    initialValues: {
      packageName: "",
      type: "",
    },
    validationSchema: {
      packageName: {
        required: {
          value: true,
          message: "Please enter packageName",
        },
      },
      type: {
        required: {
          value: true,
          message: "Please enter type",
        },
      },
    },
    submit: submit,
  });

  const returnErrorCssMultiple = (key) => {
    return errors && errors?.[key] && errors?.[key]
      ? "border border-danger rounded "
      : "border  rounded ";
  };
  const values = (key) => {
    return data?.[key] && data?.[key] != "" ? data?.[key] : "";
  };
  const errorCss = (key) =>
    errors?.[key] && errors?.[key]
      ? "form-control border border-danger"
      : "form-control";



  useEffect(() => {
    template["type"] = "Application";
    setValues(template);
  }, [template]);



  useEffect(() => {
    getSpecialityList();
  }, []);



  useEffect(() => {
    if (props?.show && props?.show > "0") {
      getByIdTemplate();
    }
  }, [props?.show]);
  console?.log(props, "show");
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {props && props?.show && props?.show > 0
                ? "Edit Application Template"
                : "Add Application Template"}
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-md-6 ">
                <label>Template Name *</label>
                <input
                  placeholder="Template Name..."
                  className={errorCss("packageName")}
                  value={values("packageName")}
                  onChange={handleChange("packageName")}
                />
              </div>
              <div className="col-md-6">
                <label>Type</label>
                <select
                  placeholder="Type..."
                  disabled
                  className="form-select"
                  value={values("type")}
                  onChange={handleChange("type")}
                >
                  <option value={""}>Select</option>
                  <option>Application</option>
                  <option>Facility Documents</option>
                  <option>Health Document</option>
                  <option>Peer References</option>
                </select>
              </div>

              <div className="col-md-6">
                <label> Assigned To</label>

                <Select
                  options={specialityList}
                  className={returnErrorCssMultiple("speciality")}
                  isClearable={true}
                  closeMenuOnSelect={false}
                  isMulti={true}
                  value={data?.speciality || []}
                  name="speciality"
                  onChange={handleMultiSelect("speciality")}
                />
              </div>
            </div>
            <hr />
            <div className="row px-2 gap-2">
              <button
                className=" col-md-auto border rounded p-2 px-3    pointer text-white "
                style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
              >
                Save
              </button>
              <div
                className="col-md-auto border rounded  p-2 px-3   pointer text-black "
                style={{ background: "#ffff" }}
                onClick={props?.onHide}
              >
                Cancel
              </div>
            </div>
          </Modal.Body>
        </div>
      </form>
    </Modal>
  );
};

export default AddTemplateModal;
