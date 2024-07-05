import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { UseFormValidations } from "../../../validations/UseFormValidation";
import { notify } from "../../../api_services/SharedServices";

const AllApointmentTypes = () => {
  const navigate = useNavigate();
  

  const { data, headerlink, handleCheckbox } = UseFormValidations({});


  const goto = (name)=>{
    if(data?.providerType){
      navigate(name)

    }
    else{
      notify(false,"Please Select Provider")
    }
  
  }
  


  useEffect(() => {
    headerlink([
      {
        name: "Create Appointment",
        link: "/outpatientpro/facility/appointment",
        active: true,
      },
    ]);
  }, []);
  return (
    <div className="bg-white px-3 pb-4 ">
      <div className="regularf30 regularf20  py-4">Create a New Appointment</div>
      
      <div className="border rounded py-4 px-4">
        <div className="d-flex align-items-center gap-4">
          <div className="border rounded-circle number-circle  d-flex justify-content-center align-items-center ">
            1
          </div>

          <div className="mediumf18 mediumf15 ">Select Provider Type</div>
        </div>

        <div className="row ms-5  ">
          <div className=" d-flex  flex-wrap">
            <div className="checkboxWithText col-auto">
              <input
                type="radio"
                name="providerType"
                value="doctor"
                id="doctor"
                onChange={handleCheckbox("providerType")}
              />
              <label for="doctor" className="pointer f14  ">
                Doctor
              </label>
            </div>
            <div className="checkboxWithText col">
              <input
                type="radio"
                name="providerType"
                value="ahp"
                id="alliedHealthProfessional"
                onChange={handleCheckbox("providerType")}
              />
              <label for="alliedHealthProfessional" className="pointer f14 ">
                Allied Health Professional
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="border rounded mt-4 ">
          <div className="d-flex align-items-center gap-4 px-4">
            <div className="border rounded-circle number-circle  d-flex justify-content-center align-items-center ">
              2
            </div>

            <div className="mediumf18 mediumf15 py-4 ">Select Appointment Type</div>
          </div>

          <div className=" ms-5 px-1">
            <div className="ms-2 row col-lg-12 col-md-12  d-flex gap-5 py-3">
              <div className="col-lg-3 col-md-4 ">
                <button
                  className="app-type border rounded  pointer  "
                  onClick={() =>
                    goto(
                      `/outpatientpro/facility/appointment/searchdoctor/${data?.providerType}`
                    )
                  }
                >
                  Initial Appointment
                </button>
                <div className="py-3 app-type-text ">
                  Add a Provider who is not currently privileged at your
                  Facility
                </div>
              </div>

              <div className="col-lg-3 col-md-4 ">
                <button
                  className="app-type  border rounded  pointer"
                  onClick={() =>
                    goto(
                      `/outpatientpro/facility/appointment/reappointment/${data?.providerType}`
                      // "/outpatientpro/facility/appointment/reappointment"
                    )
                  }
                >
                  Reappointment
                </button>
                <div
                  className="py-3 app-type-text "
                  
                >
                  Reappoint a Provider who is currently privileged at your
                  Facility
                </div>
              </div>
              <div className="col-lg-3 col-md-6  ">
                <button
                  className="app-type  border rounded  pointer"
                  onClick={() =>
                    goto(`/outpatientpro/facility/appointment/onboardappointment/${data?.providerType}` )
                  }
                >
                  Onboard Existing Provider
                </button>
                <div
                  className=" py-3 app-type-text"
                 
                >
                  Add a Provider to OPP. This Provider must be currently
                  privileged at your Facility.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApointmentTypes;
