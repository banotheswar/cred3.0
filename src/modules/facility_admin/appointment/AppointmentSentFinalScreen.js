import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const AppointmentSentFinalScreen = () => {
  const navigate = useNavigate();

  const {provider,providerId,facilityId,appId}=useParams()
  const { headerlink } = UseFormValidations({});
  useEffect(() => {
    headerlink([
      {
        name: "Create Appointment",
        link: "/outpatientpro/facility/appointment",
      },
      {
        name: "Initial Appointment",
        link: "/outpatientpro/facility/appointment/newappointment",
      },
      {
        name: "Send To Provider",
        link: `/outpatientpro/facility/appointment/appointmentsendprovider/${provider}/${providerId}/${facilityId}/${appId}`,
        active: true,
      },
    ]);
  }, []);
  return (
    <div className="row  bg-white ">
      <div className="p-5">
        <div className="border ">
          <div className="text-center f36 f20_mobile p-3 regular">
            Your Application Packet has been <br />
            sent to <span className="text-hover">{sessionStorage?.getItem("providerName")}</span>
          </div>
          <div className="text-center f16 regular">
            You can start the Appointment process in this <br />
            <div
              className="link-hover-line f16 mt-2 regular"
              onClick={() =>
                navigate(`/outpatientpro/facility/${provider=="ahp"?"alliedhealth":"doctors"}/details/${providerId}/${facilityId}/${appId}`)
              }
            >
              {" "}
              Provider’s Profile.
            </div>
          </div>

          <hr />
          <div className="p-4 d-flex justify-content-center ">
            <button
              className="border button rounded  px-4 py-2    text-center text-white"
              onClick={() => navigate("/outpatientpro/facility/dashboard")}
            >
              Back to My Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSentFinalScreen;
