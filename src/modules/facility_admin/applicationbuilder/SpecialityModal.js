import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciality } from './../../../redux/Action';
import { RxCross2 } from "react-icons/rx";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { getList, save } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";

const SpecialityModal = (props) =>{
    const [specialitydata,setSpecialitydata]= useState()

    console?.log(props,"SpecialityModal",props?.show?.globalId,)
    const submit = async() =>{
        let jsonObjects = {
            globalId:props?.show?.globalId>0?props?.show?.globalId:0,
            type:"Speciality",
            name:data?.name,
            status:"active"
        };
        let res = await save(urls?.masters?.save,{jsonObjects});
        if(res?.data?.status){
            props?.update(res)
            props?.onHide(false)
        }
    }


    const getById = async() =>{
        let jsonObjects = {
            globalId:props?.show?.globalId&&props?.show?.globalId,
            type:"Speciality",
            name:props?.show?.name,
        }
        ;
        let res = await getList(urls?.masters?.getList,{jsonObjects});
        setSpecialitydata(res[0])
    }


    const { data,errors,handleSubmit,handleChange,setValues } = UseFormValidations({
        initialValues: {
            name: "",
          },
          validationSchema: {
             name: {
              required: {
                value: true,
                message: "Please enter your First Name",
              },
            }
          },
          submit:submit,
    })

    useEffect(()=>{  
        setValues(specialitydata)             
    },[specialitydata])
        
useEffect(()=>{
    if(props?.show?.globalId>0){
        getById()
    }
   
},[props?.show?.globalId])

    const ErrorColor = (key) => {
        return errors && errors?.[key]
          ? "form-control bg-white border border-danger"
          : "form-control border bg-white ";
      };
    return(
        <Modal

        {...props}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="no-border-radius-modal"
  
      >
        <div  >
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">Add Speciality</Modal.Title>
  
            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body  >
            <form onSubmit={handleSubmit} >
            {/* onSubmit={handleSubmit} */}
              <div className=" bg-white p-2">
                <div className='row'>
                  <div className='col-md-12'>
                  <label>Name *</label>
                  <input className={ErrorColor("name")} placeholder='Name...'value={data?.name} name='name'onChange={handleChange("name")}></input>
                  </div>
                </div>
                <div></div>
                <hr />
                <div className="row gap-2 px-2">
                  <button
                    className=" col-md-auto save border rounded p-2 px-3    pointer text-white "
                   
                  >
                    Save
                  </button>
                  <div
                    className="col-md-auto border f16 rounded  p-2 px-3   pointer text-black "
                    style={{ background: "#ffff" }}
                    onClick={props?.onHide}
                  >
                    Cancel
                  </div>
                </div>
  
              </div>
            </form>
          </Modal.Body>
  
        </div>
      </Modal>
    )

}
export default SpecialityModal;