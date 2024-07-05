import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { urls } from "../../../../../api_services/url";
import { getList, save } from "../../../../../api_services/SharedServices";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";

const AddTemplateDDModal = (props) => {
  const [template, setTemplate] = useState([]);

  const submit = async () => {
    let jsonObjects = {
      packageId: [...data?.packageId]?.map((v)=>v?.value),
      formId:props?.formId,
      additionalData:props?.array,
      type:"Template"
    
      
    };
    let res = await save(urls.applicationBuilder.sortingForms, { jsonObjects });
    if (res?.data?.status) {
      props?.onHide();
      props?.update && props?.update(res);
    }
  };

  const getByIdTemplate = async () => {
    let jsonObjects = {
      packageId: "packageId",
    };

    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    setTemplate(res[0]);
    console.log(res[0], "8989987887");
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
      packageId: [],
     
    },
    validationSchema: {
      packageId: {
        required: {
          value: true,
          message: "Please enter packageName",
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
 
  useEffect(() => {
    setValues(template);
  }, [template]);

  useEffect(() => {
    if (props?.show != true && props?.show > 0) {
      getByIdTemplate();
    }
  }, [props?.show != true]);
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
              Add Application Template
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
                <label>Template Name *</label>
               

                <Select
                  options={props?.alltemplate?.filter((val)=>val?.packageId!=props?.templateId)?.map((v)=>{
                    return {label:v?.packageName,value:v?.packageId}
                  })}
                   closeMenuOnSelect={false}
                  className={returnErrorCssMultiple("packageId")}
                  isClearable={true}
                  isMulti={true}
                  value={data?.packageId}
                  name="packageId"
                  onChange={handleMultiSelect("packageId")}
                />
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
  );
};

export default AddTemplateDDModal;
