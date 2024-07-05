import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { urls } from "../../../../../api_services/url";
import { getList, save } from "../../../../../api_services/SharedServices";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";

const AddTagsModal = (props) => {
  
  const [specialityList, setSpecialityList] = useState([]);

  const submit = async () => {
    console?.log(data,"data123")
    props?.submit(data)
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

 
  
  const {
    data,
    errors,
    
    handleSubmit,
    handleMultiSelect,
    setValues,
  } = UseFormValidations({
    initialValues: {
      speciality: [],
    },
    validationSchema: {
      speciality: {
        required: {
          value: true,
          message: "Please enter tagName",
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
 

 
  useEffect(()=>{
   
    setValues(props?.obj)
  },[props?.obj])
  useEffect(()=>{
    getSpecialityList()
   
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
      <form onSubmit={handleSubmit}>
        <div>
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Tag
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
        

            <div>
            <Select
                options={specialityList}
                className={returnErrorCssMultiple("speciality")}
                isClearable={true}
                closeMenuOnSelect={false}
                isMulti={true}
                value={data?.speciality}
                name="speciality"
                onChange={handleMultiSelect("speciality")}
              />
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

export default AddTagsModal;
