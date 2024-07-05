import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";

const CreateTemplateNameModal = (props) => {
  const submit = () => {
    props?.submit(data);
  };
  const { data, errors, handleChange, handleSubmit, setValues } =
    UseFormValidations({
      initialValues: {
        formName: "",
        type: "",
      },

      validationSchema: {
        formName: {
          required: {
            value: true,
            message: "Please enter formName",
          },
        },

        type: {
          required: {
            value: true,
            message: "Please enter type",
          },
        },
      },
      submit: submit,
    });

  const values = (key) => {
    return data?.[key] && data?.[key] != "" ? data?.[key] : "";
  };
  const errorCss = (key) =>
    errors?.[key] && errors?.[key]
      ? "form-control border border-danger"
      : "form-control";
  useEffect(() => {
    let obj = { type: "Application" };
    setValues(obj);
  }, [props]);

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
              {/* {returnEstId() ? "Update User" : "New User"} */} New Form
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
            {/* </div> */}
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-md-6 ">
                <label>Form Name *</label>
                <input
                  className={errorCss("formName")}
                  value={values("formName")}
                  placeholder="Form Name..."
                  onChange={handleChange("formName")}
                />
              </div>
              <div className="col-md-6">
                <label>Form Type</label>
                <select
                  className={errorCss("type")}
                  value={data?.type}
                  placeholder="Type..."
                  onChange={handleChange("type")}
                >
                  <option value={""}>Select</option>
                 {/* {props?.heading=="Application Template"? <option>Application</option>
                 : <option>Facility Documents</option>} */}
                  {props.heading === "Application Template" && <option>Application</option>}
      {props.heading === "Facility Document" && <option>Facility Document</option>}
      {props.heading === "Peer References" && <option>Peer References</option>}
                </select>
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

          {/* </div>
                        <hr />
                        <div className='row px-2 gap-2'>
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

                </div> */}
        </div>
      </form>
    </Modal>
  );
};

export default CreateTemplateNameModal;
