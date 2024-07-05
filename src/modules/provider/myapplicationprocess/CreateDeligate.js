import React from 'react'
import { UseFormValidations } from '../../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import { RxCross2 } from 'react-icons/rx'
import { save } from '../../../api_services/SharedServices'
import { urls } from '../../../api_services/url'

const CreateDeligate = (props) => {
  const submit=async()=>{
 data["userId"]=sessionStorage.getItem("userId")
 data["delegateId"]=0
    let jsonObjects=data
    let res=await save(urls?.applicationInprogress?.createDeligate,{jsonObjects})
    if(res?.data?.status){
     props?.update(res)
     props?.onHide()
     
    }
  }
    const {data,errors,handleAlphabetChange,handleSubmit,handleEmailChange,addObject}=UseFormValidations({
      initialValues: {
        email: "",
        firstName: "",
        lastName:""
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
        lastName: {
            required: {
                value: true,
                message: "Please enter password",
            },
        },
        firstName: {
          required: {
              value: true,
              message: "Please enter password",
          },
      },
    },
    submit:submit
    })
    const errorsCss=(key)=>{
      return errors?.[key]&&errors?.[key]?"form-control border border-danger":"form-control"
    }
    const returnValue=(key)=>{
      return data?.[key]&&data?.[key]?data?.[key]:""
    }
   
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
              New Delegate
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
        

            <div className='row'>
                <div className='col-6'>
                    <label>First Name <span className='text-danger'>*</span></label>
                    <input className={errorsCss("firstName")}value={returnValue("firstName")} placeholder='First Name' onChange={handleAlphabetChange("firstName")}/>
                </div>
                <div className='col-6'>
                    <label>Last Name <span className='text-danger'>*</span></label>
                    <input className={errorsCss("lastName")}value={returnValue("lastName")} placeholder='Last Name'onChange={handleAlphabetChange("lastName")}/>
                </div>
                <div className='col-12'>
                    <label>E-mail <span className='text-danger'>*</span></label>
                    <input className={errorsCss("email")} value={returnValue("email")}placeholder='E-mail'onChange={handleEmailChange("email")}/>
                </div>
           
            </div>
           
           
          </Modal.Body>
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
        </div>
      </form>
    </Modal>
  )
}

export default CreateDeligate