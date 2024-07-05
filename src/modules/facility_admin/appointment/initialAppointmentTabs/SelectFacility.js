import React, { useEffect } from "react";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
const SelectFacility = ({
  facility,
  settingDetailstate,
  profileData,
  dataSubmit,
  appName,
}) => {
  const submit = async () => {
    profileData["facilityId"] = data?.facilityId

    
    dataSubmit(profileData, "Build Application Packet");
  };

  const { data, setValues, handleCheckboxTwo, handleSubmit,addObject } =
    UseFormValidations({
      initialValues: {
        facilityId: [""],
      },
      validationSchema: {
        facilityId: {
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
      submit: submit,
    });
data["facilityId"]=Object.values(data).filter((v)=>v!=""&&v!=undefined&&v!=null)
  useEffect(() => {
    let obj = {};
    console?.log(profileData?.facilityId, "check");
    if (profileData?.facilityId) {
      profileData?.facilityId
        ?.filter((v) => v != undefined)
        ?.map((v) => {
          obj[v?.value] = v?.value;
          obj["facilityId"] = v?.value;
        });
      setValues(obj);
    }
  }, [profileData?.facilityId]);
 
  console?.log("profileData?.facilityId", data?.facilityId);

  const isCheck = (value) => {
    return data?.[value] == value ? true : false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" p-3">
        <div className="mediumf17 appts_subheaders py-2">
          Select Facility Locations <span className="text-danger">*</span>
          <label className="ms-2">(Select all that apply)</label>
        </div>
        <div className="row p-2">
          {facility &&
            facility?.map((v) => {
              return (
                <div className="col-md-6">
                  <div className="checkboxWithText1">
                    <input
                      type="checkbox"
                      name="alcs"
                      checked={isCheck(v?.facilityId)}
                      value={v?.facilityId}
                      id={v?.facilityId}
                      onChange={handleCheckboxTwo(v?.facilityId, "facilityId")}
                    />
                    <label for={v?.facilityId} className="">
                      {v?.facilityName}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
        <hr className="p-0 m-0" />
      </div>

      <div className=" d-flex align-items-between justify-content-between align-items-center py-4 px-4 f13">
        <div
          className="btn btn-white border"
          onClick={() =>
            settingDetailstate(
              appName == "reappointment" ? "Select Provider" : "Add Profile"
            )
          }
          style={{ color: "#6D6D6D", fontSize: "14px" }}
        >
          Back
        </div>
        <button className="btn btn-primary " style={{ fontSize: "14px" }}>
          Next: Build Application Packet
        </button>
      </div>
    </form>
  );
};
export default SelectFacility;
