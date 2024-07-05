import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const TemplateModal = (props) => {
  const [specialityList, setSpecialityList] = useState([]);

  const submit = () => {};
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

    handleMultiSelect,
  } = UseFormValidations({
    initialValues: {
      specialityId: "",
    },
    validationSchema: {
      specialityId: {
        required: {
          value: true,
          message: "Please enter your Facility Name",
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
    getSpecialityList();
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
    >
      <div>
        <Modal.Header style={{ background: "#F7F7F7" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* {returnEstId() ? "Update User" : "New User"} */} New Template
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
              <input className="form-control" placeholder="Template Name..." />
            </div>
            <div className="col-md-6">
              <label>Type</label>
              <input className="form-control" placeholder="Type..." />
            </div>
         

            <div className="col-md-6">
              <label> Assigned To *</label>

              <Select
                options={specialityList}
                className={returnErrorCssMultiple("specialityId")}
                isClearable={true}
                isMulti={true}
                value={data?.specialityId}
                name="specialityId"
                onChange={handleMultiSelect("specialityId")}
              />
            </div>
          </div>
          <hr />
          <div className="row px-2 gap-2">
            <div
              className=" col-md-auto border rounded p-2 px-3    pointer text-white "
              style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
            >
              Save
            </div>
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
    </Modal>
  );
};

export default TemplateModal;
