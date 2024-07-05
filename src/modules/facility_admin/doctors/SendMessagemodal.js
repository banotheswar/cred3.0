import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { urls } from "../../../api_services/url";
import { save } from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const SendMessagemodal = (props) => {

console.log(props,"props1234567")

const submit =async()=>{
  let jsonObjects={
    id:0,
    documentId:props?.obj?.id,
    formId:props?.show?.formId,
    sendFrom:parseInt(sessionStorage?.getItem("userId")),
    sentTo:parseInt(props?.providerId),
    subject:data?.subject,
    message:data?.message}
  let res=await save(urls?.sendMessage?.saveMessage,{jsonObjects})
  if (res?.data?.status) {
    props?.onHide(false);
  }
}



const {
  data,
  errors,
  handleSubmit,
  handleChange,
  handleCapitalChange,
  setValues,
} = UseFormValidations({
  initialValues: {
    subject:"",
    message:""
  },
  validationSchema: {

    subject: {
      required: {
        value: true,
        message: "Please enter your First Name",
      },
    },
    message: {
      required: {
        value: true,
        message: "Please enter your First Name",
      },
    },
  },
  submit: submit,
});

const emailErrorColor = (key) => {
  return errors && errors?.[key]
    ? "form-control bg-white border border-danger"
    : "form-control border bg-white ";
};
  
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
             <div className="modal-header-text"> Send Message</div>
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="">
                <label>Select Form <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  placeholder="Subject..."
                  value={props?.show?.formName}
                  disabled
                ></input>
              </div>
              <div className="">
                <label>Subject <span className="text-danger">*</span></label>
               

                 <input
                    placeholder="Subject..."
                    type="text"
                    className={emailErrorColor("subject")}
                    name="subject"
                    value={data?.subject}
                    onChange={handleCapitalChange("subject")}
                  ></input>
              </div>
              <div className="">
                <label className="mt-2">Message <span className="text-danger">*</span></label>
                
                <textarea
                  rows={5}
                  placeholder="Message..."
                    type="text"
                    className={emailErrorColor("message")}
                    name="message"
                    value={data?.message}
                    onChange={handleCapitalChange("message")}
                ></textarea>
              </div>
            </>
            <hr />
            <div className="row px-2 gap-2">
              <button
            type="submit"
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

export default SendMessagemodal;
