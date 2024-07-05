import React, { useEffect } from "react";
import { UseFormValidations } from "../../../../validations/UseFormValidation";

const SelectCredentials = ({ setDetailsState,credList, profileData, dataSubmit,appName}) => {
  const submit = async () => {
    let state = appName !=="onboardappointment"?"Confirm & Send":"Begin Application"
    dataSubmit(data,state );
  };
  const { data, errors, setValues, handleCheckbox, handleSubmit } =
    UseFormValidations({
      initialValues: {
        credentialing:""
      },
      validationSchema: {
        credentialing: {
          required: {
              value: true,
              message: "Please Select Credentials",
          },
      },
        },
        
        
      submit: submit,
    });
  useEffect(() => {
   
    setValues(profileData);
  }, [profileData]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
      <div className="mediumf17 appts_subheaders py-2">
        Select Credentials <span className="text-danger">*</span>
      </div>
      <div className="row p-2">
        {credList &&
          credList?.map((v) => {
            return (
              <div className="col-md-6">
                <div className="checkboxWithText1">
                <input type="radio" name="alcs"checked={data?.credentialing==v?.formId} value={v?.formId} id={v?.formId} onChange={handleCheckbox("credentialing")}/>
                <label for={v?.formId} className="">
                 {v?.formName}
                </label>
              </div>
              </div>
            );
          })}
          {/* {errors && errors.credentialing && (
                  <p className="text text-danger">{errors.credentialing}</p>
                )} */}
        <div className="col-md-6 "></div>
      </div>
      <hr />

      <div className="py-3 px-4 d-flex align-items-between justify-content-between">
        <button
          className="btn btn-white border"
          onClick={() => setDetailsState("Build Application Packet")}
          style={{ color: "#6D6D6D",fontSize:"14px" }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          style={{fontSize:"14px"}}
        >
          Next: Confirm & Send
        </button>
      </div>
    </div>
    </form>
  );
};
export default SelectCredentials;
