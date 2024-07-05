import React, { useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserFill } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import checkmark from "../../src/assets/images/checkmark light green.svg";
import appdatastatus from "../../src/assets/images/appt status.svg";
import expireicon from "../../src/assets/images/expiring 1.svg";
import viewapp from "../../src/assets/images/View Application Btn.svg";
import reapp from "../../src/assets/images/in progress light blue.svg";
import ProfileModalMobile from "./ProfileModalMobile";
import moment from "moment";

const DoctorDetailsMobile = ({doctordtails,appointmentsList,locationsList,licenseCertificationsList,certificationsList,malpracticeList}) => {
  console.log(malpracticeList,"certificationsList Mobile")
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [detailsState, setDetailsState] = useState("Overview");
  const [profileModal, setProfileModal] = useState(false);
  const { providerId,facilityId,appId}=useParams()
  const handleTabClick = (index) => {
    const tab = containerRef.current.children[index];
  };

  const overView = () => {
    return (
      <>
        <div className="  vh-auto bg-white">
          <div className=" ">
            <div className="doctor-table-headings ">Appointment Status</div>

            <div
              className="  row  col-md-12  ms-0 mt-2"
              style={{ height: "145px" }}
            >
              {" "}
              {[
                {
                  name: "Status",
                  value: "Privileged",
                  img: (
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
                  ),
                },
                {
                  name: "Appt Date",
                  value: "Feb 27, 2022",
                  img: (
                    <img
                      src={appdatastatus}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
                {
                  name: "Appt Expires",
                  value: "Feb 27, 2024 (17 days)",
                  img: (
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
                  ),
                },
              ]?.map((v, index) => {
                const isLastRow =
                  index ===
                  [
                    {
                      name: "Status",
                      value: "Privileged",
                      img: (
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
                      ),
                    },
                    {
                      name: "Appt Date",
                      value: "Feb 27, 2022",
                      img: (
                        <img
                          src={appdatastatus}
                          alt="cred"
                          className="me-2"
                          style={{
                            objectFit: "fill",
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ),
                    },
                    {
                      name: "Appt Expires",
                      value: " Feb 27, 2024 (17 days)",
                      img: (
                        <img
                          src={expireicon}
                          alt="cred"
                          className="me-2"
                          style={{
                            objectFit: "fill",
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ),
                    },
                  ].length -
                    1;
                const col2Width = "143px";
                const col10Width = `calc(100% - ${col2Width})`;
                const isFirstRow = index === 0;
                return (
                  <>
                    <div
                      className={`col-md-2 doctor-row-text   text-start border-right px-4 p-2 ${
                        isFirstRow ? "border-top" : "border-all1 "
                      } `}
                      style={{ background: "#F7F7F7", width: "143px" }}
                    >
                      {v?.name}
                    </div>
                    <div
                      className={`col-md-10 border-right border-left  doctor-row-text1  px-3  p-2 ${
                        isFirstRow ? "border-top" : "border-all1 "
                      }`}
                      style={{ width: col10Width }}
                    >
                      {v?.img && v?.img}
                      {v?.value}
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="row   py-3">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">Appointment History</div>
              <div className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer">
                <img
                  src={viewapp}
                  alt="cred"
                  className="me-1 "
                  style={{
                    opacity: "1",
                    objectFit: "fill",
                    height: "12px",
                    width: "12px",

                    marginBottom: "1.5px",
                  }}
                />
                View Application
              </div>
            </div>
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                {appointmentsList&&appointmentsList?.map((v)=>{
                  return(
                    <div class="card-body">
                  <div className="row ">
                    <div className="col-7 ">
                      <div className="f14 medium">
                        {" "}
                        <img
                          src={checkmark}
                          alt="cred"
                          className="me-1 "
                          style={{
                            objectFit: "fill",
                            height: "15px",
                            width: "15px",
                          }}
                        />{" "}
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
                      <label className="f12">Pin </label>
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
                    <label className="f12">  Address : <b>18801 Beach Blvd</b></label>
                  </div>
                  <div className="row ">
                    <div className="col-5">
                      <label className="f12">City : <b>Huntington Beach</b> </label>
                    </div>
                    <div className="col-3 ">
                      <label className="f12">State : <b> CA</b></label>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Pin : <b>92649</b></label>
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
                    <label className="f12">    Address : <b>1094 Laguna Drive</b></label>
                  </div>
                  <div className="row ">
                    <div className="col-5">
                      <label className="f12">City : <b>Carlsbad</b> </label>
                    </div>
                    <div className="col-3 ">
                      <label className="f12">State : <b>CA</b></label>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Pin : <b>92013</b></label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </>
    );
  };

  const credentials = () => {
    return <>
    
    <div className="row   ">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">  License</div>
              <div className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer">
            
              + New License
              </div>
            </div>
            
            {licenseCertificationsList &&
          licenseCertificationsList?.map((v) => {
            return ( 
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">
                      
                      {[v?.documentData]?.map(
                                      (val) => val?.licenseType || "-"
                                    )}
                      
                      </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className=" f13 medium"> {[v?.documentData]?.map(
                                      (val) => val?.verifiedOn || "-"
                                    )}</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">
                         {[v?.documentData]?.map(
                                      (val) => val?.licenseNumber || "-"
                                    )}
                                    </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium"> 
                 
                                    
                                    
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.expirationDate)?.format(
                                          "MMMM DD, YYYY"
                                        ) || "-"
                                    )}
                                    
                                    
                                    </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">   {[v?.documentData]?.map(
                                      (val) => val?.verifiedBy || "-"
                                    )}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

);
})}




          




            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings"> Certifications</div>
              <div className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer">
            
              + New Certification
              </div>
            </div>
            
            {certificationsList &&
          certificationsList?.map((v) => {
            return ( 
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">{[v?.documentData]?.map(
                                      (val) => val?.certificationType || "-"
                                    )}</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className=" f13 medium">{[v?.documentData]?.map(
                                      (val) => val?.verifiedOn || "-"
                                    )}</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>

                      <div className="f13 medium">{[v?.documentData]?.map(
                                      (val) => val?.certification || "-"
                                    )}</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">
                                    
                                    
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.expirationDateBC)?.format(
                                          "MMMM DD, YYYY"
                                        ) || "-"
                                    )}
                                    
                                    </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">{[v?.documentData]?.map(
                                      (val) => val?.verifiedBy || "-"
                                    )}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

);
})}
          



            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings"> Malpractice Insurance</div>
            
            </div>
            
            {malpracticeList &&
          malpracticeList?.map((v) => {
            return ( 
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Issuer </label>
                      <div className="f13 medium">{v?.carrierName}</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                    <div className="f13 medium">  {v?.policyVerifiedDate?moment(v.policyVerifiedDate).format("MMMM DD, YYYY"): '-'}</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Limits</label>
                      <div className="f13 medium">  {v?.incidentAmount} / {v?.aggregateAmount} </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">{v?.policyExpirationDate&&moment(v?.policyExpirationDate).format( "MMMM DD, YYYY")}</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">{v?.verifiedBy?v?.verifiedBy:"-"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          

        );
      })}

            </div>
    
    
    
    </>;
  };
  const healthDocuments = () => {
    return <>
    
    <div className="row   ">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">  Immunizations</div>
              <div className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer">
            
              + New Health Document
              </div>
            </div>
            
            
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">ACLS</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className=" f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">8746563877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Lori Martini</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">BLS</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">8746563877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Lori Martini</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">DEA</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">9877473877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 1 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Allied Health</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



     
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">  Tests</div>
              <div className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer">
            
              + Tests
              </div>
            </div>
            
            
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">ACLS</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className=" f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">8746563877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Lori Martini</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">BLS</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">8746563877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Lori Martini</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-4 mt-2">
              <div
                class="card "
                style={{ background: "#EFF2F49B 0% 0% no-repeat padding-box" }}
              >
                <div class="card-body">
            
                  <div className="row ">
                    <div className="col-4">
                      <label className="f12">Type </label>
                      <div className="f13 medium">DEA</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified On</label>
                      <div className="f13 medium">Feb 12 ,2024</div>
                    </div>
                    <div className="col-4 ">
                    <label className="f12">status</label>
                    <div class=" f13 medium  privileged-pr-file1">
                         Current
                        </div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">License #</label>
                      <div className="f13 medium">9877473877</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Expires On</label>
                      <div className="f13 medium">Feb 1 ,2024</div>
                    </div>
                    <div className="col-4 ">
                      <label className="f12">Verified By</label>
                      <div className="f13 medium">Allied Health</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            </div>
    
    
    
    </>;
  };

  const sanctions = () => {
    return (
      <>
        <div className=" vh-auto px-2 bg-white">
          <div className="py-1 ">
            <div className="doctor-table-headings ">
              National Provider Databank (NPDB)
            </div>

            <div
              className="  row  col-md-12  mt-2  "
              style={{ height: "97px" }}
            >
              {[
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ]?.map((v, index) => {
                const isLastRow =
                  index ===
                  [
                    { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                    {
                      name: "Status",
                      value: " No Claims",
                      img: (
                        <img
                          src={checkmark}
                          alt="cred"
                          className="me-2"
                          style={{
                            objectFit: "fill",
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ),
                    },
                  ].length -
                    1;
                const col2Width = "143px";
                const col10Width = `calc(100% - ${col2Width})`;
                return (
                  <>
                    <div
                      className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                        isLastRow ? "" : "border-all"
                      } `}
                      style={{ background: "#F7F7F7", width: "143px" }}
                    >
                      {v?.name}
                    </div>
                    <div
                      className={`col-md-10 border-right border-left  doctor-row-text1  px-3  p-2 ${
                        isLastRow ? "" : "border-all"
                      }`}
                      style={{ width: col10Width }}
                    >
                      {v?.img && v?.img}
                      {v?.value}
                    </div>
                  </>
                );
              })}
            </div>

            <div className="col-auto py-3 ">
              <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
                Check Now
              </div>
            </div>
          </div>

          <div>
            <div className="doctor-table-headings ">
              Office of the Inspector General (OIG)
            </div>

            <div className="  row  col-md-12  mt-2 " style={{ height: "97px" }}>
              {[
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ]?.map((v, index) => {
                const isLastRow =
                  index ===
                  [
                    { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                    {
                      name: "Status",
                      value: " No Claims",
                      img: (
                        <img
                          src={checkmark}
                          alt="cred"
                          className="me-2"
                          style={{
                            objectFit: "fill",
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ),
                    },
                  ].length -
                    1;
                const col2Width = "143px";
                const col10Width = `calc(100% - ${col2Width})`;
                return (
                  <>
                    <div
                      className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                        isLastRow ? "" : "border-all"
                      } `}
                      style={{ background: "#F7F7F7", width: "143px" }}
                    >
                      {v?.name}
                    </div>
                    <div
                      className={`col-md-10 border-right border-left  doctor-row-text1 px-3   p-2 ${
                        isLastRow ? "" : "border-all"
                      }`}
                      style={{ width: col10Width }}
                    >
                      {v?.img && v?.img}
                      {v?.value}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="col-auto py-3 ">
              <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
                Check Now
              </div>
            </div>
          </div>

          <div>
            <div className="doctor-table-headings ">
              System for Award Management (SAM)
            </div>

            <div className="  row  col-md-12  mt-2" style={{ height: "97px" }}>
              {[
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ]?.map((v, index) => {
                const isLastRow =
                  index ===
                  [
                    { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                    {
                      name: "Status",
                      value: " No Claims",
                      img: (
                        <img
                          src={checkmark}
                          alt="cred"
                          className="me-2"
                          style={{
                            objectFit: "fill",
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ),
                    },
                  ].length -
                    1;
                const col2Width = "143px";
                const col10Width = `calc(100% - ${col2Width})`;
                return (
                  <>
                    <div
                      className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                        isLastRow ? "" : "border-all"
                      } `}
                      style={{ background: "#F7F7F7", width: "143px" }}
                    >
                      {v?.name}
                    </div>
                    <div
                      className={`col-md-10 border-right border-left  doctor-row-text1 px-3   p-2 ${
                        isLastRow ? "" : "border-all"
                      }`}
                      style={{ width: col10Width }}
                    >
                      {v?.img && v?.img}
                      {v?.value}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="col-auto py-3 ">
              <div className="button-checknow  pointer d-flex justify-content-center align-items-center   rounded">
                Check Now
              </div>
            </div>
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
      case "Overview":
        return overView();
      case "Credentials":
        return credentials();
        case "Health Documents":
          return healthDocuments();
      case "Sanctions":
        return sanctions();

      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="bg-white px-3 pb-4  pt-4">
       
        <div
          className="border  rounded  mt-3   border-0 d-flex flex-column align-items-center "
          style={{ background: " rgba(236, 236, 236, 0.45)" }}
        >
          <div className="doc_pro_icon" style={{ }}>
            <FaRegCircleUser
              color="#8B8B8B"
              style={{ height: "40px", width: "40px" }}
            />
          </div>
          <div className=" doctor-profile-name">{doctordtails?.userName ? doctordtails?.userName : "-"}</div>
          <p className="doctor-profile-desig">{doctordtails?.roleName}</p>

          <div className="d-flex  gap-2 align-items-center justify-content-center mb-2">
            <div
              className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center"
              style={{ opacity: "0.6" }}
              onClick={() => setProfileModal(true)}
            >
              <PiUserFill
                color="#c2c2c2"
                className="me-1  mb-1"
                height={11}
                width={11}
              />
              Profile
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

        <div className="row py-3">
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
        </div>
        <div className="d-flex justify-content-between align-items-between">
          {" "}
          <div className="label-text  ">Reappointment in Progress </div>
          <div
            className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer"
            style={{ width: "146px" }}
           
            onClick={() =>
              navigate(`/outpatientpro/facility/doctors/details/${providerId}/${facilityId}/${appId}/applicationinprogress`)
            }
          >
            Review Application
          </div>
        </div>

        <div className="">
          <div
            className="bg-white d-flex py-4  gap-1 "
            ref={containerRef}
            style={{ height: "84px" }}
          >
            {["Overview", "Credentials","Health Documents", "Sanctions"]?.map((e, i) => (
              <div
                className={
                  detailsState === e
                    ? "   pointer f14 active-bar doctor-active-tabs-profile-mobile "
                    : "   pointer  f14 not-active doctor-inactive-tabs-mobile "
                }
                onClick={() => {
                  handleTabClick(i);
                  settingDetailstate(e);
                }}
                key={i}
              >
                {e}
              </div>
            ))}
          </div>

          {tabs()}
        </div>

        { profileModal && (
        <ProfileModalMobile
          show={ profileModal}
          onHide={() => setProfileModal(false)}
        />
      )}
      </div>
    </>
  );
};

export default DoctorDetailsMobile;
