import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { useParams } from "react-router-dom";

const BuildApplicationPacket = ({form,template,setDetailsState,
  facilityDocumnet,
  profileData,
  dataSubmit,
  dop
}) => {
  const [multiCheck, setMultiCheck] = useState({});
  const [dopObj,setDop] = useState({});

  
  const submit = async () => {
    profileData["healthDocument"] = Object.values(multiCheck)?.filter(
      (v) => v != null
    );
    profileData["facilityDocument"] = data?.facilityDocument;
    profileData["application"] = data?.application;
    profileData["dop"] = Object.values(dopObj)?.filter((v) => v != null);
    console?.log(profileData,"profileData")
    dataSubmit(profileData, "Select Credentials");
  };
  const handlecheck = (key) => (e) => {
    setMultiCheck({
      ...multiCheck,
      [key]: e?.target?.checked ? key : "",
    });
    data["healthDocument"] = e?.target?.checked ? key : "";
  };
  const handlecheckTwo = (key) => (e) => {
    setDop({
      ...dopObj,
      [key]: e?.target?.checked ? key : "",
    });
    data["dop"] = e?.target?.checked ? key : "";
  };
  console?.log(dopObj,"dopObj")
  const { data, errors, setValues, handleCheckbox,handleCheckboxTwo, handleSubmit } =
    UseFormValidations({
      initialValues: {
        application: "",
        facilityDocument: "",
        healthDocument: "",
      },
      validationSchema: {
        application: {
          required: {
            value: true,
            message: "Please Select an Application Template",
          },
        },
        facilityDocument: {
          required: {
            value: true,
            message: "Please Select Facility Document Template",
          },
        },
        healthDocument: {
          minlength: {
            value: "1",
            message: "Please Select Facility Document Template",
          },
        },
      },
      submit: submit,
    });
console.log(data,"data")
  useEffect(() => {
    
     profileData["application"]=profileData?.application||1
    setValues(profileData);
  }, [profileData]);

  useEffect(() => {
    let obj = {};
    let obj2={}
    if (profileData?.healthDocument &&profileData?.healthDocument?.length > 0) {
      profileData?.healthDocument?.map((v) => {
        obj[v] = v;
      });
      setMultiCheck(obj);
      profileData?.dop?.map((v) => {
        obj2[v] = v;
      });
      setDop(obj2)
    }
  }, [profileData]);

  const isCheck = (obj,value) => {
    return obj?.[value] == value ? true : false;
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="mediumf17 appts_subheaders py-2">
          Select an Application Template <span className="text-danger">*</span>
        </div>
        <div className="row">
          
          {template &&
            template
              ?.map((v) => {
                return (
                  <div className="col-md-6">
                    <div className="checkboxWithText gap-1 ">
                      <input
                        type="radio"
                        name="application"
                        value={v?.packageId}
                        id={`${v?.packageId}1`}
                        checked={data?.application == v?.packageId}
                        onChange={handleCheckbox("application")}
                      />
                      <label for={`${v?.packageId}1`}>{v?.packageName} {v?.defaultTemplate=="Yes"&&"(Default)"}</label>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <hr />
      <div className=" p-4">
        <div className="mediumf17 appts_subheaders py-2">
          Select Facility Document Template{" "}
          <span className="text-danger">*</span>
        </div>

        <div className="row">
          
               {facilityDocumnet &&
            facilityDocumnet
              ?.map((v) => {
                return (
                  <div className="col-md-6">
                    <div className="checkboxWithText gap-1 ">
                      <input
                        type="radio"
                        name="facilityDocument"
                        value={v?.packageId}
                        id={`${v?.packageId}2`}
                        checked={data?.facilityDocument == v?.packageId}
                        onChange={handleCheckbox("facilityDocument")}
                      />
                      <label for={`${v?.packageId}2`}>{v?.packageName}</label>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <hr />

      <div className=" p-4">
        <div className="mediumf17 appts_subheaders py-2">
         
          Select Health Documents <span className="text-danger">*</span>
          <label className="ms-2">(Select all that apply)</label>
        </div>
        <div className="row p-2">
          {form &&
            form?.map((v) => {
              return (
                <div className="col-md-6">
                  <div className="checkboxWithText1">
                    <input
                      type="checkbox"
                      name="fluVaccine"
                      checked={isCheck(multiCheck,v?.formId)}
                      value={v?.formId}
                      id={`${v?.formId}3`}
                      onChange={handlecheck(v?.formId)}
                    />
                    <label for={`${v?.formId}3`} className="">
                      {v?.formName}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
        {/* {errors && errors.fluVaccine && (
                  <p className="text text-danger">{errors.fluVaccine}</p>
                )} */}
      </div>
      <hr />
      <div className=" p-4">
        <div className="mediumf17 appts_subheaders py-2">Select Delineation Of Privileges <span className="text-danger">*</span>
          <label className="ms-2">(Select all that apply)</label>
        </div>
        <div className="row p-2">
          {dop &&
            dop?.map((v) => {
              return (
                <div className="col-md-6">
                  <div className="checkboxWithText1">
                    <input
                      type="checkbox"
                      name="fluVaccine"
                      checked={isCheck(dopObj,v?.formId)}
                      value={"yes"}
                      id={`${v?.formId}4`}
                      onChange={handlecheckTwo(v?.formId)}
                    />
                    <label for={`${v?.formId}4`} className="">
                      {v?.formName}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
       
      </div>
      <hr />
      <div className="py-3 px-4 d-flex align-items-between justify-content-between">
        <div
          className="btn btn-white border"
          onClick={() => setDetailsState("Select Facility(s)")}
          style={{ color: "#6D6D6D", fontSize: "14px" }}
        >
          Back
        </div>
        <button className="btn btn-primary" style={{ fontSize: "14px" }}>
          Next: Select Credentials
        </button>
      </div>
    </form>
  );
};
export default BuildApplicationPacket;
