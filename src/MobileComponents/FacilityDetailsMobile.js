import React, { useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { FaHouse, FaRegCircleUser } from "react-icons/fa6";
import { PiUserFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import checkmark from "../../src/assets/images/checkmark light green.svg";
import appdatastatus from "../../src/assets/images/appt status.svg";
import expireicon from "../../src/assets/images/expiring 1.svg";
import viewapp from "../../src/assets/images/View Application Btn.svg";
import reapp from "../../src/assets/images/in progress light blue.svg";
import ProfileModalMobile from "./ProfileModalMobile";
import FacilityInfoModal from "./FacilityInfoModal";
import moment from "moment";

const FacilityDetailsMobile = ({doctordtails,appointmentsList,locationsList,message,gotoForms}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [profileModal, setProfileModal] = useState(false);

  return (
    <>
      <div className="bg-white px-3 pb-4  pt-4">
        <div
          className="border  rounded  mt-3   border-0 d-flex flex-column align-items-center "
          style={{ background: " rgba(236, 236, 236, 0.45)" }}
        >
          <div className="doc_pro_icon" style={{}}>
            <FaRegCircleUser
              color="#8B8B8B"
              style={{ height: "40px", width: "40px" }}
            />
          </div>
          <div className=" doctor-profile-name text-wrap">
            Ghozland Surgery & Health Partners{" "}
          </div>

          <div className="d-flex  gap-2 align-items-center justify-content-center mb-2">
            <div
              className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center"
              style={{ opacity: "0.6" }}
              onClick={() => setProfileModal(true)}
            >
              <FaHouse
                color="#c2c2c2"
                className="me-1  mb-1"
                height={11}
                width={11}
              />
              Info
            </div>

            <div
              className="rounded button-user-profile-1 p-3 d-flex justify-content-center align-items-center pointer"
              style={{ opacity: "0.6" }}
              //    onClick={() => setSendMessageModal(true)}
            >
              {" "}
              <BiSolidSend
                color="#c2c2c2"
                className="me-1 mb-1"
                height={11}
                width={11}
              />
              Send Message
            </div>
          </div>
        </div>

        <div className="row py-2">
          <label
            className="f14"
            style={{
              opacity: "0.6",
              color: "#323232",
              height: " 16px",
              width: "41px",
            }}
          >
            Status
          </label>

          <div className="label-text py-1 ">
            Privileged
            <img
              src={checkmark}
              alt="cred"
              className=" ms-2 "
              style={{
                objectFit: "fill",
                height: "18px",
                width: "18px",
              }}
            />
          </div>
        </div>

        <div className="row py-2">
          <div className="col-5">
            <label
              className="f14 "
              style={{
                opacity: "0.6",
                color: "#323232",
                
              }}
            >
              Appointment Date
            </label>
            <div className="f14 medium"> Feb 21, 2022 </div>
          </div>
          <div className="col-7 text-end">
            <label  className="f14 "
              style={{
                opacity: "0.6",
                color: "#323232",
                
              }}> Appointment Expires</label>
            <div className="f14 medium">
              {" "}
              Feb 21, 2024 (12 days){" "}
              <img
                src={expireicon}
                alt="cred"
                className=""
                style={{
                  objectFit: "fill",
                  height: "18px",
                  width: "18px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-between py-2">
          {" "}
          <label  className="f14 "
              style={{
                opacity: "0.6",
                color: "#323232",
                
              }}>
            Reappointment Application <br />
            <div className="f14 text-black"> In Progress (37%)</div>
          </label>
          <div
            className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer"
            style={{ width: "146px" }}
            onClick={
              () => navigate(gotoForms(sessionStorage?.getItem("roleId")))
              // navigate(`/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`)
            }
          >
            Continue Application
          </div>
        </div>

        <div className="  vh-auto bg-white mt-2">
        <div className="doctor-table-headings">
  Items Needing Attention
   {/* ({message?.[0]?.totalCount ? message?.[0]?.totalCount : "-" }) */}
   ({message?.length ? Math.min(message.length, 3) : "-" })


</div>
{message && message.slice(0, 3).map((v) => {
  return (
    <div className="col-md-4 mt-3" key={v?.id}>
      <div
        className="card"
        style={{
          background: "#EFF2F49B 0% 0% no-repeat padding-box",
        }}
      >
        <div className="card-body">
          <div className="row">
            <div
              className="col-7"
              onClick={() => navigate("/outpatientpro/facility/doctors/details")}
            >
              <label className="f12">Item Name</label>
              <div className="f13 medium">{v?.formName}</div>
            </div>
            <div className="col-5 text-end">
              <label>Type</label>
              <div className="f13 medium">{v?.type}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label className="f12">Message/Status</label>
              <div className="f13 medium">{v?.message}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <label className="f12">Date Sent</label>
              <div className="f13 medium">{moment(v?.createDate)?.format("MM/DD/YYYY")}</div>
            </div>
            <div className="col-4 text-end">
              <label className="f12">Action</label>
              <div
                className="f13 medium border rounded text-center text-white"
                style={{ background: "rgba(58, 57, 82, 0.8)" }}
              >
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})}

          {/* <div class="col-md-4 mt-2">
            <div
              class="card "
              style={{
                background: "#EFF2F49B 0% 0% no-repeat padding-box",
              }}
            >
              <div class="card-body">
                <div className="row ">
                  <div
                    className="col-7"
                    onClick={() =>
                      navigate("/outpatientpro/facility/doctors/details")
                    }
                  >
                    <label className="f12">Item Name </label>
                    <div className="f13 medium"> Flu Vaccination </div>
                  </div>
                  <div className="col-5 text-end">
                    <label> Type</label>
                    <div className="f13 medium">Health Document</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12">
                    <label className="f12">Message/Status </label>
                    <div className="f13 medium">
                      Update your flu vaccination
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-8">
                    <label className="f12">Date Sent</label>
                    <div className="f13 medium"> Feb 12, 2024</div>
                  </div>
                  <div className="col-4 text-end">
                    <label className="f12">Action</label>
                    <div
                      className="f13 medium border rounded text-center text-white "
                      style={{ background: "rgba(58, 57, 82, 0.8)" }}
                    >
                      Update
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-2">
            <div
              class="card "
              style={{
                background: "#EFF2F49B 0% 0% no-repeat padding-box",
              }}
            >
              <div class="card-body">
                <div className="row ">
                  <div
                    className="col-7"
                    onClick={() =>
                      navigate("/outpatientpro/facility/doctors/details")
                    }
                  >
                    <label className="f12">Item Name </label>
                    <div className="f13 medium"> Board Certifications </div>
                  </div>
                  <div className="col-5 text-end">
                    <label> Type</label>
                    <div className="f13 medium">Credential</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label className="f12">Message/Status </label>
                    <div className="f13 medium">Expires in 25 days</div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-8">
                    <label className="f12">Date Sent</label>
                    <div className="f13 medium"> Feb 12, 2024</div>
                  </div>
                  <div className="col-4 text-end">
                    <label className="f12">Action</label>
                    <div
                      className="f13 medium border rounded text-center text-white "
                      style={{ background: "rgba(58, 57, 82, 0.8)" }}
                    >
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row   py-3">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">Appointment History</div>
            </div>
            <div class="col-md-4 mt-3">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                {/* <div class="card-body">
                  <div className="row ">
                    <div className="col-7 ">
                   
                      <div className="f14 medium">
                     
                        <img
                          src={checkmark}
                          alt="cred"
                          className="me-1 "
                          style={{
                            objectFit: "fill",
                            height: "15px",
                            width: "15px",
                          }}
                        />
                        Initial Appointment
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="  privileged-pr-file1">Complete</div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label className="f12">App Date </label>
                      <div className="f13 medium">Mar 11, 2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">App Expires</label>
                      <div className=" f13 medium">Feb 12, 2024</div>
                    </div>

                    <div className="col-4 ">
                      <label className="f12">Actions</label>
                      <div className=" f13 medium">View Details</div>
                    </div>
                  </div>
                </div> */}
                 {appointmentsList&&appointmentsList?.map((v)=>{
                  return(
                    <div class="card-body">
                  <div className="row ">
                    <div className="col-7 ">
                      <div className="f14 medium">
                        {" "}
                       
                               {v?.appointmentType === "Initial Appointment" && (
              <img
                src={checkmark}
                alt="cred"
                className="me-2 "
                style={{
                  objectFit: "fill",
                  height: "18px",
                  width: "18px",
                }}
              />
            )}
            {v?.appointmentType === "Initial Appointment " && (
              <img
                src={expireicon}
                alt="cred"
                className="me-2 "
                style={{
                  objectFit: "fill",
                  height: "18px",
                  width: "18px",
                }}
              />
            )}
            {v?.appointmentType === "Reappointment" && (
              <img
                src={reapp}
                alt="cred"
                className="me-2 "
                style={{
                  objectFit: "fill",
                  height: "18px",
                  width: "18px",
                }}
              />
            )}
            {v?.appointmentType}
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="  privileged-pr-file1"> {v?.status}</div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label className="f12">App Date </label>
                      <div className="f13 medium">-</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">App Expires</label>
                      <div className=" f13 medium">-</div>
                    </div>

                    <div className="col-4 ">
                      <label className="f12">Actions</label>
                      <div className=" f13 medium">View Details</div>
                    </div>
                  </div>
                </div>

                  )
                })}
              </div>
            </div>
            {/* <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
                  <div className="row ">
                    <div className="col-7 ">
                      <div className="f14 medium">
                        {" "}
                        <img
                          src={expireicon}
                          alt="cred"
                          className="me-2 "
                          style={{
                            objectFit: "fill",
                            height: "15px",
                            width: "15px",
                          }}
                        />{" "}
                        Initial Appointment
                      </div>
                    </div>
                    <div className="col-5 text-end">
                      <div className=" f13  privileged-pr-file1">Complete</div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label className="f12">App Date </label>
                      <div className="f13 medium">Feb 27, 2022</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">App Expires</label>
                      <div className=" f13 medium">Feb 12, 2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Actions</label>
                      <div className=" f13 medium">View Details</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div class="col-md-4 mt-2">
              <div
                class="card"
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
                  <div class="row justify-content-between">
                    <div class="col-6 mt-1">
                      <div class="f14 medium">
                        <img
                          src={reapp}
                          alt="cred"
                          className="me-2 "
                          style={{
                            objectFit: "fill",
                            height: "15px",
                            width: "15px",
                          }}
                        />{" "}
                        Reappointment
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="text-primary f13">
                          Facility Review (34%)
                        </div>
                        <div class="col-8 f13 medium applicationSent1">
                          In Progress
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-1">
                    <div class="col-4">
                      <label className="f12">App Date </label>
                      <div class="f13 medium">Feb 12, 2024</div>
                    </div>
                    <div class="col-4 ">
                      <label className="f12">App Expires</label>
                      <div class="f13 medium">Jan 27, 2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Actions</label>
                      <div
                        className=" f13 medium"
                        onClick={() =>
                          navigate(
                            "/outpatientpro/facility/doctors/details/applicationinprogress"
                          )
                        }
                      >
                        Continue application
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row   py-2">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="doctor-table-headings">Facilities</div>
            </div>
            {locationsList&&locationsList?.map((v)=>{
            return(
              <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
                  <div className="row ">
                    <div className="col-auto ">
                      <div className="f14 medium">
                      {v?.facilityName}
                      </div>
                    </div>
                    <label className="f12">  Address : <div className="f12 medium"> {v?.address}</div></label>
                  </div>
                  <div className="row ">
                    <div className="col-5">
                      <label className="f12">City </label>
                      <div className="f12 medium">
                      {v?.city} 
                      </div>
                    </div>
                    <div className="col-3 ">
                      <label className="f12">State</label>
                      <div className="f12 medium"> {v?.state}</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Zip </label>
                      <div className="f12 medium">{v?.zipcode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
           }) }
            {/* <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
                  <div className="row ">
                    <div className="col-auto ">
                      <div className="f14 medium">
                        Ghozland Health Partners North
                      </div>
                    </div>
                    <label className="f12">
                      {" "}
                      Address : <b>18801 Beach Blvd</b>
                    </label>
                  </div>
                  <div className="row ">
                    <div className="col-5">
                      <label className="f12">
                        City : <b>Huntington Beach</b>{" "}
                      </label>
                    </div>
                    <div className="col-3 ">
                      <label className="f12">
                        State : <b> CA</b>
                      </label>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">
                        Pin : <b>92649</b>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
                  <div className="row ">
                    <div className="col-auto ">
                      <div className="f14 medium">
                        Ghozland Health Partners South
                      </div>
                    </div>
                    <label className="f12">
                      {" "}
                      Address : <b>1094 Laguna Drive</b>
                    </label>
                  </div>
                  <div className="row ">
                    <div className="col-5">
                      <label className="f12">
                        City : <b>Carlsbad</b>{" "}
                      </label>
                    </div>
                    <div className="col-3 ">
                      <label className="f12">
                        State : <b>CA</b>
                      </label>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">
                        Pin : <b>92013</b>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {profileModal && (
          <FacilityInfoModal
            show={profileModal}
            onHide={() => setProfileModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default FacilityDetailsMobile;
