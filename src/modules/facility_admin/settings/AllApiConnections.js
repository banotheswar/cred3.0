import React, { useEffect } from "react";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const AllApiConnections = () => {
  const { headerlink } = UseFormValidations({})

  useEffect(() => {
    headerlink(sessionStorage?.getItem("roleId") == 2 ? [
      { name: "Settings", link: "/outpatientpro/enterprise/settings" },
      { name: "Application Connections", link: "/outpatientpro/enterprise/settings/api_connections", active: true }
    ] : [
      { name: "Settings", link: "/outpatientpro/facility/settings" },
      { name: "Application Connections", link: "/outpatientpro/facility/settings/api_connections", active: true }
    ])
  }, []);
  return (
    <>
      <div className="bg-white mb-2">

        <div className="settings-user f30 py-4 px-4 ">API Connections</div>
      </div>
      <div className=" row bg-white px-4 py-4">


        <div className=" col-lg-12 ">
          <div className="f20"  >National Provider Data Bank</div>

          <div className="px-2 py-3 col-xl-6 col-lg-8 col-md-12 settings-text" style={{ opacity: "0.6" }}>
            OPP will automatically check for new sanctions for all of your
            Providers.<br /> Sanction checks will run in the background every 24
            hours.
          </div>

          <div className=" f17 medium mt-3"  >
            To begin, connect your NPDB account below.
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6 py-2 mt-4">
            <label className="f15" style={{ color: "#3A3952", opacity: "1" }}>Your NPDB Account Username <span className="text-danger">*</span></label>
            <input
              className="form-control"
              name="npdbUsername"
              placeholder="Username... "
            />

          </div>
          <div className="col-xl-4 col-lg-5 col-md-6 py-2 mt-4">
            <label className="f15 mt-2" style={{ color: "#3A3952", opacity: "1" }}>Your NPDB Account Password <span className="text-danger">*</span></label>
            <input
              className="form-control"
              name="npdbPassword"
              placeholder="Password... "
            />
          </div>
          <hr />
          <div className="">
            <button
              className="api-connections border    rounded mt-2"

            >
              Connect NPDB Account
            </button>
          </div>


        </div>
      </div>
    </>
  );
};

export default AllApiConnections;
