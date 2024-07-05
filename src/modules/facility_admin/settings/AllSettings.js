import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const AllSettings = () => {
  const navigate = useNavigate();
  const { headerlink } = UseFormValidations({});
  useEffect(() => {
    headerlink(sessionStorage?.getItem("roleId")==2?[
      {
        name: "Settings",
        link: "/outpatientpro/enterprise/settings",
        active: true,
      },
    ]:[
      {
        name: "Settings",
        link: "/outpatientpro/facility/settings",
        active: true,
      },
    ]);
  }, []);



  const gotousers=(roleId)=>{
    switch(roleId){
      case "1":return navigate("/outpatientpro/admin/settings/users")
      case "2":return navigate("/outpatientpro/enterprise/settings/users")
      default:return navigate("/outpatientpro/facility/settings/users")
    }
  }

  const gotoApiConnections=(roleId)=>{
    switch(roleId){
      case "1":return navigate("/outpatientpro/admin/settings/configuration")
      case "2":return navigate("/outpatientpro/enterprise/settings/api_connections")
      default:return navigate("/outpatientpro/facility/settings/api_connections")
    }
  }

  return (
    <div class="">
      <div class="bg-white mb-2">
        {/* <div class="px-4  py-4 f30 medium f20mobile">Settings</div> */}
        <div class="p-3 f30 medium mb-2 f20mobile">Settings</div>
      </div>

      <div class="vh-auto py-4  px-5 bg-white">
        <div class="py-1">
          <div class="settings-subheader">Users</div>
          <div class="row align-items-center">
            <div class="col-md-12 py-3">
              <div class="settings-text">
                Add, edit, and delete users for your Facility.
              </div>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-2    mb-3">
              <div
                class="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                onClick={()=>gotousers(sessionStorage?.getItem("roleId"))
                  // sessionStorage?.getItem("roleId") != 1
                  //   ? () => navigate("/outpatientpro/facility/settings/users")
                  //   : () => navigate("/outpatientpro/admin/settings/users")
                }
              >
                Edit User
              </div>
            </div>
          </div>
        </div>
        <hr className="py-1 " />

        {sessionStorage.getItem("roleId") != 1 && (
          <>
            <div class="settings-subheader">Facility Locations</div>
            <div class="row align-items-center">
              <div class="col-md-12 py-3">
                <div class="settings-text">
                  Add, edit, and delete facility locations.
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3    mb-3">
                <div
                  class="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                  onClick={() =>
                    sessionStorage?.getItem("roleId")==2?navigate("/outpatientpro/enterprise/settings/location"): navigate("/outpatientpro/facility/settings/location")
                  }
                >
                  Edit Locations
                </div>
              </div>
            </div>
            <hr className="py-1 " />
          </>
        )}

        {sessionStorage.getItem("roleId") != 1 && (
          <>
            <div class="settings-subheader">Expiration Notifications</div>
            <div class="row align-items-center">
              <div class="col-md-12 py-3">
                <div class="settings-text">
                  Set triggers for notifying your facility and your providers
                  for when appointments, credentials, and health documents are
                  set to expire.
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3    mb-3">
                <div
                  class="button-user d-flex align-items-center justify-content-center  text-white rounded pointer"
                  onClick={() =>
                    sessionStorage?.getItem("roleId")==2?navigate(
                      "/outpatientpro/enterprise/settings/expiration_notification"
                    ):navigate("/outpatientpro/facility/settings/expiration_notification" )
                  }
                >
                  Edit Notifications
                </div>
              </div>
            </div>

            <hr className="py-1 " />

            <div class="settings-subheader">API Connections</div>
            <div class="row align-items-center">
              <div class="col-md-12 py-3">
                <div class="settings-text">
                  Connect your NPDB accounts for automatic sanction checks.
                </div>
              </div>
              <div class="col-xl-1 col-lg-2 col-md-2    mb-3">
                <div
                  class="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                  onClick={()=>gotoApiConnections(sessionStorage?.getItem("roleId"))
                    // sessionStorage?.getItem("roleId") != 1
                    //   ? () =>
                    //       navigate(
                    //         "/outpatientpro/facility/settings/api_connections"
                    //       )
                    //   : () =>
                    //       navigate(
                    //         "/outpatientpro/admin/settings/configuration"
                    //       )
                  }
                >
                  Connect
                </div>
              </div>
            </div>
            <hr className="py-1 " />
          </>
        )}

        {sessionStorage.getItem("roleId") == 1 && (
          <>
            <div class="settings-subheader">Enterprise Management</div>
            <div class="row align-items-center">
              <div class="col-md-12 py-3"></div>
              <div class="col-md-auto    mb-3">
                <div
                  class="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                  onClick={() =>
                    navigate(
                      "/outpatientpro/facility/settings/facility_management"
                    )
                  }
                >
                  Edit Enterprise
                </div>
              </div>
            </div>
            <hr className="py-1 " />
          </>
        )}

        {sessionStorage.getItem("roleId") != 1 &&
          (
            <>
              <div class="settings-subheader">Configuration</div>
              <div class="row align-items-center">
                <div class="col-md-12 py-3"></div>
                <div class="col-xl-2 col-lg-2 col-md-3    mb-3">
                  <div
                    class="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                    onClick={() =>
                      sessionStorage?.getItem("roleId")==2?navigate("/outpatientpro/enterprise/settings/configuration"):navigate("/outpatientpro/facility/settings/configuration")
                    }
                  >
                    Edit Configuration
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default AllSettings;
