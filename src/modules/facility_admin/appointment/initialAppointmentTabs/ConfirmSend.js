import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import moment from "moment";
import { phoneFormat, save } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";

const ConfirmSend = ({
  setDetailsState,
  settingDetailstate,
  profileData,
  template,
  providerId,
  appName,
}) => {
  console?.log(appName, "appName", profileData?.fId);
  const navigate = useNavigate();
  const {provider}=useParams()

  const { data, setValues, handleMultiSelect, handleChange } =
    UseFormValidations({});

  console?.log(data, "message");
  const submit = async () => {
    let jsonObjects = {
      userId: providerId,
      subject: data?.subject,
      message: data?.message,
      email: data?.email,
      appointmentId: data?.appointmentId,
    };
    let res = await save(urls?.Appointments?.sendmailtoprovider, {
      jsonObjects,
    });
    if (res?.data?.status == true) {
      sessionStorage?.setItem("providerName", data?.userName);
      navigate(
        `/outpatientpro/facility/appointment/appointmentsendprovider/${provider}/${providerId}/${ profileData?.fId}/${profileData?.appointmentId}`
      );
    }
  };

  useEffect(() => {
    setValues(profileData);
  }, [profileData]);
  console?.log(template, "templatetemplatetemplate");
  return (
    <>
      <div className=" p-3">
        <div className="f20 medium py-2 appts_subheaders">Provider Profile</div>
        <div className="row ">
          <div className="col-md-6">
            <hr className="px-0 py-1 m-0 mt-1" />
            <div className="row">
              <div className="col-md-6 f14 medium f13_mobile">Name</div>
              <label className="col-md-6 mt-1 f12">{data?.userName} </label>
            </div>
            <hr className="px-0 py-1 m-0 mt-1" />
            <div className="row">
              <div className="col-md-6  f14 medium f13_mobile ">DOB</div>
              <label className="col-md-6 mt-1 f12">
                {" "}
                {moment(data?.dob)?.format("MM/DD/YYYY")}
              </label>
            </div>
            <hr className="px-0 py-1 m-0 mt-1" />
            <div className="row">
              <div className="col-md-6  f14 medium f13_mobile">Email</div>
              <label className="col-md-6 mt-1 f12"> {data?.email}</label>
            </div>
            <hr className="px-0 py-1 m-0 mt-1" />
          </div>

          <div className="col-md-6">
            <hr className="px-0 py-1 m-0 mt-1" />

            <div className="row">
              <div className="col-md-6  f14 medium f13_mobile">Specialty</div>
              <label className="col-md-6 mt-1 f12">
                {" "}
                {data?.speciality?.map((v, i) => {
                  return (
                    <>
                      {v?.label && <>{v.label}</>}
                      {i !== data.speciality.length - 1 && ", "}
                    </>
                  );
                })}
              </label>
            </div>

            <hr className="px-0 py-1 m-0 mt-1" />
            <div className="row">
              <div className="col-md-6 f14 medium f13_mobile">NPI #</div>
              <label className="col-md-6 mt-1 f12"> {phoneFormat(data?.npi)}</label>
            </div>
            <hr className="px-0 py-1 m-0 mt-1" />
            <div className="row">
              <div className="col-md-6 f14 medium f13_mobile">DEA #</div>
              <label className="col-md-6 mt-1 f12"> {phoneFormat(data?.dea)}</label>
            </div>
            <hr className="px-0 py-1 m-0 mt-1" />
          </div>
        </div>

        <div className="col-auto">
          <button
            className="button  border p-2 px-4 mt-4 text-white rounded"
            onClick={() => settingDetailstate("Add Profile")}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="row p-4 ">
        <div className="col-md-6">
          <div className="f20 medium py-2 appts_subheaders">Application Packet</div>
          <hr className="px-0 py-1 m-0 mt-1" />
          <div className="row">
            <div className="col-md-6  f14 medium  f13_mobile">Application</div>
            <label className="col-md-6 mt-1 f12">{template?.application} </label>
          </div>
          <hr className="px-0 py-1 m-0 mt-1" />
          <div className="row">
            <div className="col-md-6  f14 medium  f13_mobile">Facility Documents</div>
            <div className="col-md-6 f12">
            {template?.facilityDocument?.map((v, i) => {
                return (
                  <label className=" mt-1">
                    {v?.formName}
                    {i !== template?.facilityDocument?.length - 1 && ` ,${" "}`}
                  </label>
                );
              })}
            </div>
          </div>
          <hr className="px-0 py-1 m-0 mt-1" />
          <div className="row ">
            <div className="col-md-6 f14 medium f13_mobile">Health Documents</div>
            <div className="col-md-6 f12">
            {template?.healthDocument?.map((v, i) => {
                return (
                  <label className=" mt-1">
                    {v?.healthDocument}
                    {i !== template?.healthDocument?.length - 1 && ` ,${" "}`}
                  </label>
                );
              })}
            </div>
          </div>
          <hr className="px-0 py-1 m-0 mt-1" />
          <div className="row ">
            <div className="col-md-6 f14 medium f13_mobile">Delineation Of Privileges</div>
            <div className="col-md-6 f12">
            {template?.dop?.map((v, i) => {
                return (
                  <label className=" mt-1">
                    {v?.dop}
                    {i !== template?.dop?.length - 1 && ` ,${" "}`}
                  </label>
                );
              })}
            </div>
          </div>
          <hr className="px-0 py-1 m-0 mt-1" />

          <div className="col-auto">
            <button
              onClick={() => setDetailsState("Build Application Packet")}
              className="button border p-2 px-4 mt-4 text-white rounded"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="f20 medium py-2 appts_subheaders">Credentials</div>

   
          {template?.credentialingOptional &&
            template?.credentialingOptional
              ?.filter((cred) => Object.keys(cred).length !== 0)
              ?.map((v) => {
                return (
                  <>
                    <hr className="px-0 py-1 m-0 mt-1" />
                    <div className="row ">
                      <label className="col-md-6 mt-1 f12 ">
                        {v?.credCategory}{" "}
                      </label>
                    </div>
                  </>
                );
              })}
          <hr className="px-0 py-1 m-0 mt-1" />

          <div className="col-auto">
            <button
              className="button border p-2 px-4 mt-4 text-white rounded"
              onClick={() => settingDetailstate("Select Credentials")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {appName == "newappointment" && (
        <div className="p-4">
          <div className="f20 medium py-2 appts_subheaders">Compose Your Email</div>

          <div className="col-md-5">
            <input
              type="text"
              name="subject"
              value={data?.subject}
              className="form-control border-none"
              placeholder="Subject"
              onChange={handleChange("subject")}
            />
          </div>
          <div className="col-md-5 mt-2">
            <textarea
            className="p-2"
              type="text"
              rows={8}
              name="message"
              value={data?.message}
              onChange={handleChange("message")}
              placeholder="Your message…"
            />
          </div>
        </div>
      )}
      <hr />
      <div className="p-4 d-flex align-items-between justify-content-between">
        <button
          className="btn btn-white border"
          onClick={() => settingDetailstate("Select Credentials")}
          style={{ color: "#6D6D6D", fontSize: "14px" }}
        >
          Back
        </button>
        <div
          style={{ fontSize: "14px" }}
          className="border rounded save pointer  py-2 px-4 justify-content-center text-center text-white pointer"
          
          onClick={() => appName !== "onboardappointment"?submit():navigate(`/outpatientpro/facility/${provider=="ahp"?"alliedhealth":"doctors"}/details/${providerId}/${ profileData?.fId}/${profileData?.appointmentId}/applicationinprogress`
            // `/outpatientpro/facility/appointment/onboardappointment/applicationinprogress/${providerId}/${ profileData?.fId}/${profileData?.appointmentId}`
          )
             
            }
        >
          {appName!="onboardappointment"?"Send to Provider":"Begin Application"}
        </div>
      </div>
    </>
  );
};
export default ConfirmSend;
