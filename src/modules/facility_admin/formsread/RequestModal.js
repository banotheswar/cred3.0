import React from 'react'
import { Modal } from 'react-bootstrap'
import { RxCross2 } from 'react-icons/rx'
import { UseFormValidations } from '../../../validations/UseFormValidation'
import { urls } from '../../../api_services/url'
import { save } from '../../../api_services/SharedServices'

const RequestModal = (props) => {


  const submit =async()=>{
    let jsonObjects={
      id:0,
      documentId:props?.obj?.id||props?.state?.id,
      subject:props?.formData?.formName,
      type:props?.formData?.type,
      sendFrom:parseInt(sessionStorage?.getItem("userId")),
      sentTo:parseInt(props?.providerId),
      message:data?.message,
      appointmentId:props?.formData?.appointmentId,
      type:"NeedAttention",
      templateType:props?.formData?.formName,
      facilityId:props?.facilityId
    }
      console?.log(jsonObjects,"jsonObjects")
    let res=await save(urls?.sendMessage?.saveMessage,{jsonObjects})
    if (res?.data?.status) {
      props?.setState(new Date())
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
    
      message:""
    },
    validationSchema: {
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
  console?.log(props?.formData,"formData")
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
      <div  >
 
        <Modal.Body  >
          <>
          <div className='f20 medium'>Request Edits to {props?.formData?.formName} </div>
          <hr/>
          <div className='mt-4'>
            <div className='f17'>Your Message *</div>
            <textarea  
                  rows={5}
                  style={{minHeight:"20vh"}}
                  placeholder="Message..."
                    type="text"
                    className={emailErrorColor("message")}
                    name="message"
                    value={data?.message}
                    onChange={handleCapitalChange("message")}
            ></textarea>
          </div>
  
          </>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex gap-2 px-2">
              <button
                type="submit"
                className=" col-md-auto save-user  border pointer rounded "
                style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
              >
                Send Message
              </button>
              <button
                className="col-md-auto border cancel-user pointer rounded"
                style={{ background: "#ffff" }}
                onClick={props?.onHide}
              >
                Cancel
              </button>
            </div>
          </Modal.Footer>

      </div>
      </form>
    </Modal>
  )
}

export default RequestModal
