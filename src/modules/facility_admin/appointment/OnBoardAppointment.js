import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoPricetags } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const OnBoardAppointment = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [detailsState, setDetailsState] = useState("Add Profile");
  const handleTabClick = (index) => {
    const tab = containerRef.current.children[index];
  };
  const {headerlink}=UseFormValidations({})
useEffect(()=>{
  headerlink([
    // {name:"All Provider",link:"/outpatientpro/facility/doctors/all"},
    // {name:"Doctors",link:"/outpatientpro/facility/doctors/details"},
    {name:"Create Appointment",link:"/outpatientpro/facility/appointment"},
    {name:"Onboarding Appointment",link:"/outpatientpro/facility/appointment/onboardappointment",active:true},
  ])
},[])
  const addprofile = () => {
    return (
      <>
        <div className="row p-4">
        <div className="mediumf17 ">
            Provider Name <span className="text-danger ">*</span>
          </div>

          <div className="row">
          <div className="col-md-4">
            <label>
              First <span  className="text-danger">*</span>
            </label>
            <input
              className="form-control "
              placeholder="First Name..."
              type="text"
            />
          </div>

          <div className="col-md-4">
            <label> Middle </label>
            <input
              className="form-control "
              placeholder="Middle Name..."
              type="text"
            />
          </div>
          <div className="col-md-4">
            <label>
              {" "}
              Last <span  className="text-danger">*</span>{" "}
            </label>
            <input
              className="form-control "
              placeholder="Last Name..."
              type="text"
            />
          </div>
          </div>

          <div className="row py-2">
          <div className="col-md-4 ">
            <label>
              DOB <span  className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control py-2"
              minDate={new Date(1900, 1, 1)}
              maxDate={new Date()}
              autoComplete="off"
              name="medicarePartADate"
              dateFormat="MM/dd/yyyy"
              placeholderText="MM/DD/YYYY"
              popperClassName="react-datepicker-popper"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className="col-md-4 ">
            <label>
              Email <span  className="text-danger">*</span>
            </label>
            <input
              className="form-control "
              placeholder="Email..."
              type="text"
            />
          </div>
          </div>

          <div className="mt-4">
            <div className="mediumf17 ">
              License Information <span  className="text-danger">*</span>
            </div>

            <div className="row ">
              <div className="col-md-4">
                <label>
                  License State <span  className="text-danger">*</span>
                </label>
                <select className="form-select" name="state">
                  <option value="">License State</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option> Arizona</option>
                  <option>Arkansas</option>
                  <option>Nevada</option>
                  <option>Washington</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>
                  NPI # <span  className="text-danger">*</span>
                </label>
                <input
                  className="form-control "
                  placeholder="NPI..."
                  type="text"
                />
              </div>
              <div className="col-md-4">
                <label>DEA (optional)</label>
                <input
                  className="form-control "
                  placeholder="Other License #*"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mediumf17 ">
            Specialty <span  className="text-danger">*</span>
          </div>
          <div className="col-3">
            <select className="form-select">
              <option value="">Select Specialty</option>
              <option>Cardiology</option>
              <option>ENT</option>
              <option>Gastrointestinal</option>
              <option>Neurosurgery</option>
              <option>Ophthalmology</option>
              <option>Orthopedic</option>
              <option>Pain</option>
              <option>Podiatry</option>
              <option>Urology</option>
            </select>
          </div>
        </div>

        <div className=" p-4">
          <div className="mediumf17 ">
            Tags <label>(Select all that apply)</label>
          </div>
          <div className="d-flex p-2">
            <div className="col-md-6">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthProfessional"
                  value="yes"
                  id="healthProfessional"
                />
                <label for="healthProfessional" className="">
                  {" "}
                  Allied Health Professional
                </label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="anesthesia"
                  value="yes"
                  id="anesthesia"
                />
                <label for="anesthesia">Anesthesia</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name=" orthopedicSurgery"
                  value="yes"
                  id="orthopedicSurgery"
                />
                <label for="orthopedicSurgery"> Orthopedic Surgery</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="general"
                  value="yes"
                  id="general"
                />
                <label for="general">General</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="plasticSurgery"
                  value="yes"
                  id="plasticSurgery"
                />
                <label for="plasticSurgery"> Plastic Surgery</label>
              </div>
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="surgeon"
                  value="yes"
                  id="surgeon"
                />
                <label for="surgeon">Surgeon</label>
              </div>
            </div>
          </div>
          <button
            className="border rounded tag-btn  p-2 mt-4 px-3  d-flex align-items-center justify-content-center pointer  "
            style={{ background: "#0073EEB3 0% 0% no-repeat padding-box" }}
          >
            <IoPricetags size={18} color="#A6CEF9" className="me-2" /> Edit Tags
          </button>

          <hr className="" />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded f16 medium col-1 p-2 justify-content-center bg-white text-center  pointer"
            onClick={() => navigate("/outpatientpro/facility/appointment")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <div
            className="border rounded f16 medium  p-2 justify-content-center text-center text-white pointer"
            style={{ background: "#357FFA" }}
            onClick={() => settingDetailstate("Select Facility(s)")}
          >
            Next: Select Facility(s)
          </div>
        </div>
      </>
    );
  };

  const selectFacility = () => {
    return (
      <>
        <div className=" p-4">
          <div className="mediumf17 ">
            Select Facility Locations <span  className="text-danger">*</span>
            <label className="ms-2">(Select all that apply)</label>
          </div>
          <div className="row p-2">
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input type="checkbox" name="alcs" value="yes" id="alcs" />
                <label for="alcs" className="">
                  Ghozland Health Partners North
                </label>
              </div>

              <div className="checkboxWithText1">
                <input type="checkbox" name="bls" value="yes" id="bls" />
                <label for="bls"> Ghozland Health Partners South</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="boardCertification"
                  value="yes"
                  id="boardCertification"
                />
                <label for="boardCertification">
                  Newport Beach Surgical Group
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input type="checkbox" name="alcs" value="yes" id="alcs1" />
                <label for="alcs1" className="">
                  San Diego Medical Partners
                </label>
              </div>

              <div className="checkboxWithText1">
                <input type="checkbox" name="bls" value="yes" id="bls1" />
                <label for="bls1"> Santa Monica Medical</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="boardCertification"
                  value="yes"
                  id="boardCertification1"
                />
                <label for="boardCertification1">South Bay Surgical</label>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <div
            className="border rounded f16 medium col-1 p-2 justify-content-center bg-white text-center  pointer"
            // onClick={buildApplicationPacket}
            onClick={() => settingDetailstate("Add Profile")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </div>
          <div
            className="border rounded f16 medium p-2 justify-content-center text-center text-white pointer"
            style={{ background: "#357FFA" }}
            onClick={() => settingDetailstate("Build Application Packet")}
          >
            Next: Build Application Packet
          </div>
        </div>
      </>
    );
  };

  const buildApplicationPacket = () => {
    return (
      <>
        <div className="p-4">
          <div className="mediumf17 ">
            Select an Application Template{" "}
            <span  className="text-danger">*</span>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="applicationTemplate"
                />
                <label for="applicationTemplate">Anesthesiologist</label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="handSurgeon"
                />
                <label for="handSurgeon">General Physician</label>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="handSurgen"
                />
                <label for="handSurgen">Hand Surgeon</label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="orthoSurgen"
                />
                <label for="orthoSurgen">Orthopedic Surgeon (default)</label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className=" p-4">
          <div className="mediumf17 ">
            Select Facility Document Template{" "}
            <span  className="text-danger">*</span>
          </div>

          <div className="row">
            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="anesthesiologistOne"
                />
                <label for="anesthesiologistOne">Anesthesiologist</label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="handSurgeonOne"
                />
                <label for="handSurgeonOne">General Physician</label>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="handSurgenOne"
                />
                <label for="handSurgenOne">Hand Surgeon</label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="orthoSurgenOne"
                />
                <label for="orthoSurgenOne">Orthopedic Surgeon (default)</label>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className=" p-4">
          <div className="mediumf17 ">
            {" "}
            Select Health Documents <span  className="text-danger">*</span>
            <label className="ms-2">(Select all that apply)</label>
          </div>
          <div className="row p-2">
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="fluVaccine"
                  value="yes"
                  id="fluVaccine"
                />
                <label for="fluVaccine" className="">
                  Flu Vaccine (default)
                </label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="tuberculosisScreening"
                  value="yes"
                  id="tuberculosisScreening"
                />
                <label for="tuberculosisScreening">
                  {" "}
                  Tuberculosis Screening
                </label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument3"
                  value="yes"
                  id="healthDocument3"
                />
                <label for="healthDocument3"> Health Document #3</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument4"
                  value="yes"
                  id="healthDocument4"
                />
                <label for="healthDocument4">Health Document #4</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument5"
                  value="yes"
                  id="healthDocument5"
                />
                <label for="healthDocument5">Health Document #5</label>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <div
            className="border rounded col-1 f16 medium p-2 justify-content-center bg-white text-center  pointer"
            onClick={() => settingDetailstate("Select Facility(s)")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </div>
          <button
            className="border rounded  p-2 f16 medium justify-content-center text-center text-white pointer"
            style={{ background: "#357FFA" }}
            onClick={() => setDetailsState("Select Credentials")}
          >
            Next: Select Credentials
          </button>
        </div>
      </>
    );
  };
  const selectCredentials = () => {
    return (
      <div className="p-3">
        <div className="mediumf17 ">
          Select Credentials <span  className="text-danger">*</span>
        </div>
        <div className="row p-2">
          <div className="col-md-6 ">
            <div className="checkboxWithText gap-2 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="orthoSurgen"
              />
              <label for="orthoSurgen">
                Orthopedic Surgeon Credentials (default)
              </label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="anesthesiologistCredentials"
              />
              <label for="anesthesiologistCredentials">
                Anesthesiologist Credentials
              </label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="mdCred"
              />
              <label for="mdCred">General MD Credentials</label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="otherSurgeonCred"
              />
              <label for="otherSurgeonCred">Other Surgeon Credentials</label>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="paCred"
              />
              <label for="paCred">PA Credentials</label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="ahpTypeThree"
              />
              <label for="ahpTypeThree">AHP Type #3 Credentials</label>
            </div>

            <div className="checkboxWithText gap-1">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="ahpTypeFour"
              />
              <label for="ahpTypeFour">AHP Type #4 Credentials</label>
            </div>
          </div>
        </div>
        <hr />

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded col-1 f16 medium p-2 justify-content-center bg-white text-center  pointer"
            onClick={() => setDetailsState("Build Application Packet")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <button
            className="border rounded  p-2 f16 medium justify-content-center text-center text-white pointer"
            style={{ background: "#357FFA" }}
            onClick={() => setDetailsState("Confirm & Send")}
          >
            Next: Confirm & Send
          </button>
        </div>
      </div>
    );
  };

  const confirmSend = () => {
    return (
      <>
        <div className=" p-4">
          <div className="f20">Provider Profile</div>
          <div className="row ">
            <div className="col-md-5">
              <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium ">Name</div>
                <label className="col-md-6 mt-1"> Elizabeth McDaniel </label>
              </div>
              <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6  f14 medium ">DOB</div>
                <label className="col-md-6 mt-1"> Jan 25, 1972</label>
              </div>
              <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6  f14 medium">Email</div>
                <label className="col-md-6 mt-1 "> emcdaniel@gmail.com</label>
              </div>
              <hr className="px-0 py-1 mt-1 m-0"/>
            </div>

            <div className="col-md-5">
             <hr className="px-0 py-1 mt-1 m-0"/>

              <div className="row">
                <div className="col-md-6  f14 medium">Specialty</div>
                <label className="col-md-6 mt-1 "> Anesthesia</label>
              </div>

             <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium ">NPI #</div>
                <label className="col-md-6 mt-1"> 123-456-9988</label>
              </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium">DEA #</div>
                <label className="col-md-6 mt-1"> 123-456-9988</label>
              </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            </div>
          </div>

          <div className="col-auto">
            <button className="button-user  border p-2 px-4 mt-4 text-white rounded"
            
            onClick={() => settingDetailstate("Add Profile")}
            
            >
              Edit
            </button>
          </div>
        </div>

        <div className="row p-4 ">
          <div className="col-md-5">
            <div className="f20">Application Packet</div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6  f14 medium  ">Application</div>
              <label className="col-md-6 mt-1">Orthopedic Surgeon </label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6  f14 medium  ">Facility Documents</div>
              <label className="col-md-6 mt-1">Orthopedic Surgeon</label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6   f14 medium ">Health Documents</div>
              <label className="col-md-6 mt-1">
                 Tuberculosis Screening
              </label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6   f14 medium ">Facility Documents</div>
              <label className="col-md-6 mt-1">
                Flu Vaccine
              </label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>

            <div className="col-auto">
              <button className="button-user border p-2 px-4 mt-4 text-white rounded"
              onClick={() => setDetailsState("Build Application Packet")}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <div className="f20">Credentials</div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <label className="col-md-6 mt-1">ACLS </label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <label className="col-md-6 mt-1">BLS</label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <label className="col-md-6 mt-1">Board Certification</label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <label className="col-md-6 mt-1">PALS</label>
            </div>
            <hr className="px-0 py-1 mt-1 m-0"/>

            <div className="col-auto">
              <button className="button-user border p-2 px-4 mt-4 text-white rounded"
              
              
              onClick={() => settingDetailstate("Select Credentials")}
              
              >
                Edit
              </button>
            </div>
          </div>
        </div>
<hr/>
        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border f16 medium rounded col-1 p-2 justify-content-center bg-white text-center  pointer"
            onClick={() => settingDetailstate("Select Credentials")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <div className="border rounded save pointer  p-2 justify-content-center text-center text-white pointer" onClick={()=>navigate("/outpatientpro/facility/appointment/onboardappointment/applicationinprogress")}>
          Begin Application
          </div>
        </div>
      </>
    );
  };

  const settingDetailstate = (name) => {
    setDetailsState(name);
  };

  const tabs = () => {
    switch (detailsState) {
      case "Add Profile":
        return addprofile();
      case "Select Facility(s)":
        return selectFacility();
      case "Build Application Packet":
        return buildApplicationPacket();
      case "Select Credentials":
        return selectCredentials();
      case "Confirm & Send":
        return confirmSend();

      default:
        return <></>;
    }
  };
  return (
    <>
      <div>
        <div className="  bg-white p-4 ">
          <h5 style={{ opacity: "100%",fontWeight:"400" }}>Onboarding: Build Application</h5>
          <label className="f16">
            Follows these simple steps to build the application for your
            Provider. To customize any of these settings, go to{" "}
            <span className="link-hover-line">the Application Builder</span>
          </label>

          <div className=" border rounded mt-4">
            <div
              className="tab-scrolbar p-4 d-flex py-4  "
              ref={containerRef}
              style={{ overflowX: "auto" }}
            >
              {[
                "Add Profile",
                "Select Facility(s)",
                "Build Application Packet",
                "Select Credentials",
                "Confirm & Send",
              ]?.map((e, i) => (
                <div
                  className={
                    detailsState === e
                      ? "  border-left-0 border    d-flex gap-2 active-bar text-white pointer"
                      : "  border-left-0 border   d-flex gap-2  not-active pointer rounded"
                  }
                  style={{ width: "33%" }}
                  onClick={() => {
                    handleTabClick(i);
                    settingDetailstate(e);
                  }}
                  key={i}
                >
                  <div
                    className={
                      detailsState === e
                        ? "border label   d-flex align-items-center justify-content-center active-circle text-white"
                        : "bg-white border  label  d-flex align-items-center justify-content-center   "
                    }
                    style={{
                      marginLeft: "-15px",
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={
                      detailsState === e
                        ? "d-flex align-items-center f15 justify-content-center label text-white"
                        : "d-flex align-items-center f15 justify-content-center label "
                    }
                  >
                    {e}
                  </span>
                </div>
              ))}
            </div>

            {tabs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnBoardAppointment;
