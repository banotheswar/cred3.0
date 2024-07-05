import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { UseFormValidations } from '../validations/UseFormValidation';
import Select from "react-select"
import { RxCross2 } from 'react-icons/rx';
import { getList, save } from '../api_services/SharedServices';
import { urls } from '../api_services/url';
const PeerRequestModel = (props) => {
    console?.log(props?.id)
    const submit=async()=>{
        let jsonObjects={type:props?.obj?.type, appointmentId:props?.id?.appointmentId,email:props?.obj?.peeremail,formId:data?.formName?.value,firstName:props?.obj?.peerfirstName,lastName:props?.obj?.peerlastName}
        console?.log(jsonObjects,"jsonObjects")
        let res=await save(urls?.forms?.peerReferenceSentRequest,{jsonObjects})
        if(res?.data?.status){
            props?.onHide()
        }

        console?.log(data)
    }
    const {data,handleMultiSelectDropdown,handleSubmit}=UseFormValidations({
        initialValues:{},
        validationSchema:{
            formName: {
                required: {
                    value: true,
                    message: "Please select",
                },
            },
        },
submit:submit
    })

    const [peerList,setpeerList]=useState([])
    const getAllPeer=async()=>{
     let jsonObjects=   {
            formId: 0,
            packageId: 0,
            type: "Peer References"
        }
        let res=await getList(urls?.applicationBuilder.getallForm,{jsonObjects})
        res?.map((v)=>{
            v["label"]=v?.formName
            v["value"]=v?.formId
        })
        setpeerList(res)
    }
    useEffect(()=>{
        getAllPeer()
    },[])
  return (
    <Modal
    {...props}
    size="md"
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
          Send Request
          </div>{" "}
        </Modal.Title>

        <div className="d-flex">
          <div className="pointer" onClick={props?.onHide}>
            <RxCross2 size={25} />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className=" bg-white p-2 py-4">
          
          <div className='col-md-12 py-2'>
            <label>Select Peer References<span className='text-danger'>*</span></label>
<Select options={peerList} onChange={handleMultiSelectDropdown("formName")}/>


          </div>
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
  )
}

export default PeerRequestModel