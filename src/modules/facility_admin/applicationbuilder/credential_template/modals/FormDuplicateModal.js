import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { urls } from "../../../../../api_services/url";
import { getList, save } from "../../../../../api_services/SharedServices";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";

const FormDuplicateModal = (props) => {
 

  const submit = async () => {
   data[props?.type?"packageName":"templateName"]=data?.templateName
   props?.submit(data,props?.update)
   props?.onHide()
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
     templateName: [],
    },
    validationSchema: {
      templateName: {
        required: {
          value: true,
          message: "Please enter template Name",
        },
      },
    },
    submit: submit,
  });

  const returnErrorCssMultiple = (key) => {
    return errors && errors?.[key] && errors?.[key]
      ? "border border-danger rounded form-control "
      : "border  rounded form-control";
  };
useEffect(()=>{
  let obj= props?.show
  obj["templateName"]=props?.type?props?.show?.packageName:props?.show?.templateName
  setValues(props?.show)
},[props?.show])
console?.log(props,"props",data)
  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {props?.title?"Form Duplicate":"Template Duplicate"} 
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row  ">
              <div className="col-md-12 p-4">
                <label>Template Name <span className="text-danger">*</span></label>

                <input className={returnErrorCssMultiple("templateName")} value={data?.templateName} placeholder="Template Name" onChange={handleChange("templateName")}/>
              </div>
            </div>
            
           
          </Modal.Body>
        </div>
        <Modal.Footer>
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
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormDuplicateModal;
