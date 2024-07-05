import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Select from "react-select"
import { UseFormValidations } from '../../../../validations/UseFormValidation'
import { RxCross2 } from 'react-icons/rx'
import { DropdownMaster, getList, save } from '../../../../api_services/SharedServices'
import { urls } from '../../../../api_services/url'
const AddDelineation = (props) => {
const [stateList,setStateList]=useState([])
const submit=async()=>{
    let body={
        formId:data?.formId?data?.formId:0,
        type:"DOP",
        packageId:0,
        formName:data?.formName,
        optional:data?.speciality,
        additionalData:[]
    }
      props?.saveForm(body)
    
}
    const {data,errors,handleChange,handleMultiSelect,handleSubmit,setValues}=UseFormValidations({
        initialValues:{
            formName:"",
            speciality:[]
        },
        validationSchema:{
            formName: {
                required: {
                    value: true,
                    message: "Please enter password",
                },
            },
            speciality: {
                minlength: {
                    value: "1",
                    message: "Please enter your Last Name",
                },
                required: {
                    value: "1",
                    message: "Please enter your Last Name",
                },
            },
        },
        submit:submit
    })
    
    const errorCss=(key)=>{
        return errors?.[key]&&errors?.[key]?"form-control bg-white border border-danger":"form-control bg-white"
    }
    const returnErrorCssMultiple=(key)=>{
        return errors?.[key]&&errors?.[key]?"bg-white border border-danger rounded":"bg-white"
    }
    useEffect(()=>{
        DropdownMaster("Speciality", setStateList)
    },[])

    
    useEffect(()=>{
        if(props?.show?.formId){
         
          props["show"]["speciality"]=props?.show?.optional
            setValues(props?.show)
        }

    },[props?.show])
    console?.log(props?.show)

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
        { data?.formId?"Edit Page":"Add Page"}
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
              <label>Form Name *</label>
              <input
                placeholder="Form Name..."
                className={errorCss("formName")}
                value={data?.formName}
                onChange={handleChange("formName")}
              />
            </div>
            <div className="col-md-6">
              <label>Type</label>
              <select
                placeholder="Type..."
                disabled
                className="form-select"
                value={"Delineation Of Privileges"}
                onChange={handleChange("type")}
              >
                
                <option>Delineation Of Privileges</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Speciality</label>

              <Select
                options={stateList?.map((v)=>{return {label:v?.specialityName,value:v?.specialityId}})}
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
  )
}

export default AddDelineation