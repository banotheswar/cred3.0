// import { Modal } from "react-bootstrap";
// import React, { useEffect } from "react";
// import { UseFormValidations } from "../../../../../validations/UseFormValidation";
// import { RxCross2 } from "react-icons/rx";
// import { save } from "../../../../../api_services/SharedServices";
// import { urls } from "../../../../../api_services/url";
// import Select from "react-select";

// const Duplicate = (props) => {
//   console?.log(props?.formName?.type, "type");

//   const submit = async () => {

//     data["formId"] = 0;
//     data["additionalData"] = props?.additionalData;
//     data["type"] = props?.formName?.type;
//     let jsonObjects = data;
//     let res = await save(urls?.applicationBuilder.saveFrom, { jsonObjects });
//     if (res?.data?.status) {
//       props?.update(res);
//       props?.onHide();
//     }
//   };
//   const {
//     errors,
//     data,
//     setValues,
//     handleChange,
//     handleSubmit,
//     handleChangeSearch,
//   } = UseFormValidations({
//     initialValues: {
//       formName: "",
//       packageId: "",
//     },
//     validationSchema: {
//       formName: {
//         required: {
//           value: true,
//           message: "Please enter form name",
//         },
//       },
//       packageId: {
//         required: {
//           value: true,

//           message: "Please enter form name",
//         },
//       },
//     },
//     submit: submit,
//   });
//   const returnErrorCssSelect = (key) => {
//     return errors && errors?.[key] && errors?.[key]
//       ? "border border-danger rounded select"
//       : "border  rounded select ";
//   };

//   const returnOptionValue = (array, key, label, value) => {
//     let filterObject = (array?.filter((v) => v?.[key] == data?.[value]))[0];

//     return filterObject?.[label] != undefined
//       ? { label: filterObject?.[label], value: filterObject?.[value] }
//       : "";
//   };

//   const errorCss = (key) =>
//     errors?.[key] && errors?.[key]
//       ? "form-control border border-danger"
//       : "form-control";
//   useEffect(() => {
//     setValues({ type: props?.formName?.type });
//   }, [props?.formName]);
//   console?.log(props, "props123");

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       backdrop="static"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       className="no-border-radius-modal"
//     >
//       <form onSubmit={handleSubmit}>
//         <div>
//           <Modal.Header style={{ background: "#F7F7F7" }}>
//             <Modal.Title id="contained-modal-title-vcenter">
//               Add Duplicate Form
//             </Modal.Title>

//             <div className="d-flex">
//               <div className="pointer" onClick={props?.onHide}>
//                 <RxCross2 size={25} />
//               </div>
//             </div>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="col-md-6">
//                 <label className="p-0 m-0">Form Name*</label>
//                 <input
//                   className={errorCss("formName")}
//                   value={data?.formName}
//                   placeholder="Form Name*"
//                   name="formName"
//                   onChange={handleChange("formName")}
//                 />
//               </div>
//               <div className=" col-md-6">
//                 <label>Form Type*</label>
//                 <select
//                   className={`${errorCss("type")} form-select`}
//                   value={data?.type}
//                   disabled="true"
//                   placeholder="Form Name*"
//                   name="type"
//                   onChange={handleChange("type")}
//                 >
//                   <option value={""}>Select Form Type</option>
//                   <option>Application</option>
//                   <option>Facility Document</option>
//                   <option>Health Document</option>
//                   <option>Peer References</option>
//                 </select>
//               </div>
//               {/* <div className=" col-md-12">
//                 <label>Template Name*</label>

//                 <Select
//                   options={
//                     props?.template &&
//                     props?.template
//                       ?.filter((v) => v?.packageId != props?.templateId)
//                       ?.map((v) => {
//                         return { label: v?.packageName, value: v?.packageId };
//                       })
//                   }
//                   className={returnErrorCssSelect("packageId")}
//                   isClearable={true}
//                   value={returnOptionValue(
//                     props?.template || [],
//                     "packageId",
//                     "packageName",
//                     "packageId"
//                   )}
//                   name="packageId"
//                   onChange={handleChangeSearch("packageId")}
//                 />
//               </div> */}
//               {props?.formName?.type !== "Peer References" && props?.formName?.type !== "DOP" && (
//   <div className="col-md-12">
//     <label>Template Name*</label>

//     <Select
//       options={
//         props?.template &&
//         props?.template
//           ?.filter((v) => v?.packageId != props?.templateId)
//           ?.map((v) => {
//             return { label: v?.packageName, value: v?.packageId };
//           })
//       }
//       className={returnErrorCssSelect("packageId")}
//       isClearable={true}
//       value={returnOptionValue(
//         props?.template || [],
//         "packageId",
//         "packageName",
//         "packageId"
//       )}
//       name="packageId"
//       onChange={handleChangeSearch("packageId")}
//     />
//   </div>
// )}

//             </div>
//           </Modal.Body>
//           <hr />
//           <div className="row px-2 gap-2 pb-3" style={{ marginLeft: "10px" }}>
//             <button
//               className=" col-md-auto border rounded p-2 px-3    pointer text-white "
//               style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
//             >
//               Save
//             </button>
//             <div
//               className="col-md-auto border rounded  p-2 px-3   pointer text-black "
//               style={{ background: "#ffff" }}
//               onClick={props?.onHide}
//             >
//               Cancel
//             </div>
//           </div>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default Duplicate;
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../../../validations/UseFormValidation";
import { RxCross2 } from "react-icons/rx";
import { save } from "../../../../../api_services/SharedServices";
import { urls } from "../../../../../api_services/url";
import Select from "react-select";

const Duplicate = (props) => {
  console?.log(props?.formName?.type, "type");


  const [validationSchema, setValidationSchema] = useState({
    formName: {
      required: {
        value: true,
        message: "Please enter form name",
      },
    },
    packageId: {
      required: {
        value: true,
        message: "Please select template",
      },
    },
  });


  const submit = async () => {

    data["formId"] = 0;
    data["additionalData"] = props?.additionalData;
    data["type"] = props?.formName?.type;
    let jsonObjects = data;
    let res = await save(urls?.applicationBuilder.saveFrom, { jsonObjects });
    if (res?.data?.status) {
      props?.update(res);
      props?.onHide();
    }
  };

  const {
    errors,
    data,
    setValues,
    handleChange,
    handleSubmit,
    handleChangeSearch,
  } = UseFormValidations({
    initialValues: {
      formName: "",
      packageId: "",
    },
    validationSchema: validationSchema,
    submit: submit,
  });

  const returnErrorCssSelect = (key) => {
    return errors && errors?.[key] && errors?.[key]
      ? "border border-danger rounded select"
      : "border  rounded select ";
  };

  const returnOptionValue = (array, key, label, value) => {
    let filterObject = (array?.filter((v) => v?.[key] == data?.[value]))[0];

    return filterObject?.[label] != undefined
      ? { label: filterObject?.[label], value: filterObject?.[value] }
      : "";
  };

  const errorCss = (key) =>
    errors?.[key] && errors?.[key]
      ? "form-control border border-danger"
      : "form-control";

  // useEffect(() => {
  //   setValues({ type: props?.formName?.type });
  // }, [props?.formName]);

  
  useEffect(() => {
    setValues({ type: props?.formName?.type });
    if (props?.formName?.type === "Peer References" || props?.formName?.type === "DOP") {
      setValidationSchema({
        formName: {},
        packageId: {},
      });
    } else {
      setValidationSchema({
        formName: {
          required: {
            value: true,
            message: "Please enter form name",
          },
        },
        packageId: {
          required: {
            value: true,
            message: "Please select template",
          },
        },
      });
    }
  }, [props?.formName]);

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
              Add Duplicate Form
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <label className="p-0 m-0">Form Name*</label>
                <input
                  className={errorCss("formName")}
                  value={data?.formName}
                  placeholder="Form Name*"
                  name="formName"
                  onChange={handleChange("formName")}
                />
              </div>
              <div className=" col-md-6">
                <label>Form Type*</label>
                <select
                  className={`${errorCss("type")} form-select`}
                  value={data?.type}
                  disabled="true"
                  placeholder="Form Name*"
                  name="type"
                  onChange={handleChange("type")}
                >
                  <option value={""}>Select Form Type</option>
                  <option>Application</option>
                  <option>Facility Document</option>
                  <option>Health Document</option>
                  <option>Peer References</option>
                </select>
              </div>
              {props?.formName?.type !== "Peer References" && props?.formName?.type !== "DOP" && (
                <div className="col-md-12">
                  <label>Template Name*</label>
                  <Select
                    options={
                      props?.template &&
                      props?.template
                        ?.filter((v) => v?.packageId != props?.templateId)
                        ?.map((v) => {
                          return { label: v?.packageName, value: v?.packageId };
                        })
                    }
                    className={returnErrorCssSelect("packageId")}
                    isClearable={true}
                    value={returnOptionValue(
                      props?.template || [],
                      "packageId",
                      "packageName",
                      "packageId"
                    )}
                    name="packageId"
                    onChange={handleChangeSearch("packageId")}
                  />
                </div>
              )}

            </div>
          </Modal.Body>
          <hr />
          <div className="row px-2 gap-2 pb-3" style={{ marginLeft: "10px" }}>
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
        </div>
      </form>
    </Modal>
  );
};

export default Duplicate;

