import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import Accordion from "react-bootstrap/Accordion";
import { FcPrint } from "react-icons/fc";
import { getList, save } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import BSBDSignatures from "./BSBDSignatures";
import { useParams } from "react-router-dom";
import moment from "moment";
import MDSignature from "./MDSignature";

const BoardSummary = ({ formname, getFormdata }) => {
  const {providerId}=useParams()
  console.log(
    formname,
    "formnameformnameformnameformnameformnameformnameformname",providerId
  );

  const containerRef = useRef(null);
  const [update, setUpdate] = useState();
  const [detailsState, setDetailsState] = useState("View Summary");
  const [doctorSummaryList, setDoctorSummaryList] = useState([]);
  const [MdData,setMdData]=useState()
 
  const handleTabClick = (e) => {
    
    if(e=="Board Signatures"&&MdData&&MdData[0]?.isApproved=="Yes"){
      settingDetailstate(e)
    }
    if(e!="Board Signatures"){
      settingDetailstate(e)
    }
    
  };

  const submit = async () => {
    let jsonObjects = {
      userId:0,
      firstName: data?.medicaldirectorname,
      lastName: "",
      email: data?.medicaldirectorEmail,
      type: "MD",
      formType:"Board_Summary",
         id:0,
      appointmentId: formname?.appointmentId,
      // id:DOPId?.id,
    };
    let res = await save(urls?.forms.saveDirectorsSig, { jsonObjects });

    if (res) {
      setUpdate(res);
    }
  };

  const { data, setValues, handleChange, handleSubmit } = UseFormValidations({
    submit: submit,
  });

  const getDoctorSummaryList = async () => {
    let jsonObjects = {
      appointmentId: formname?.appointmentId,
      // type: formname?.type,
    };
    let res = await getList(urls?.forms.getDirectorsSummary, {
      jsonObjects,
    });
    setDoctorSummaryList(res);
    console.log(res, "09798985");
  };
  const getMdFormData =async(id)=>{
    let jsonObjects = {
      appointmentId:id,
      type:detailsState=="Medical Director Signature"?"MD":detailsState=="Board Signatures"?"BD":"MD",
      formType:"board_summary",
      filterType:'Link'
    };
    let res = await getList(urls?.forms?.GetAllBoardSummary, { jsonObjects });
    setMdData(res)
  }
  useEffect(()=>{
    setValues(MdData)
  },[MdData,update])
  useEffect(() => {
    getDoctorSummaryList();

  }, [update]);
useEffect(()=>{
  getMdFormData(formname?.appointmentId)
},[formname?.appointmentId,detailsState,update])


  const viewsummary = () => {
    return (
      <>
        <div className="p-0  ">
          {/* <div className="p-2 bg-white">
            {" "}
            <div className="f20 px-3">Verification</div>
            <div className="px-4 col-md-8">
              <hr className="p-0 m-0 mt-3" />

              <div className="row d-flex d-flex-wrap align-items-center mt-2">
                <div className="col-md-4 signatures-sunhead medium">
                  Verified On
                </div>
                <div className="col-md-8">
                  <label className="f14" style={{ color: "#727272" }}>
                    Feb 1, 2024{" "}
                  </label>
                </div>
              </div>

              <div className="row d-flex d-flex-wrap align-items-center">
                <div className="col-md-4 signatures-sunhead medium">
                  {" "}
                  Verified By
                </div>
                <div className="col-md-8">
                  <label className="f14" style={{ color: "#727272" }}>
                    Lori Martini
                  </label>
                </div>
              </div>
            </div>
          </div> */}

          <div className="mt-2 ">
            <div className="mt-2 ">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3">Education & Training</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="px-2">
                      {doctorSummaryList &&
                        doctorSummaryList
                          ?.filter((v) => v?.type == "Education & Training")
                          ?.map((v) => {
                            return (
                              <div className="col-md-8 ">
                                <div className="py-2">
                                  {/* <div
                                    className="medium  f16"
                                    style={{ color: "#3A3952" }}
                                  >
                                    {[v?.documentData]?.map(
                                      (val) => val?.educationType
                                    )}
                                  </div> */}
                                  <div
                                    className="medium mt-4 f16"
                                    style={{ color: "#3A3952" }}
                                  >
                                    {[v?.documentData]?.map((val) => {
                                      const educationType = val?.educationType;
                                      return educationType
                                        ? educationType
                                            .charAt(0)
                                            .toUpperCase() +
                                            educationType.slice(1)
                                        : "";
                                    })}
                                  </div>
                                </div>
                                <hr className="m-0 p-0" />
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    School
                                  </div>
                                  <label className="col-md-8  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.institutionName || "-"
                                    )}
                                  </label>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Dates
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.startDate)?.format(
                                          "YYYY "
                                        ) || "-"
                                    )}
                                    -
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.endDate)?.format("YYYY ") ||
                                        "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified On
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedOn || "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified By
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {" "}
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedBy || "-"
                                    )}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="mt-2 ">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3">
                      Licenses & Certifications
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="px-2">
                      {doctorSummaryList &&
                        doctorSummaryList
                          ?.filter((v) => v?.templateType == "Licensure")
                          ?.map((v) => {
                            return (
                              <div className="col-md-8 ">
                                <div className="py-2 mt-4">
                                  <div
                                    className="medium  f16"
                                    style={{ color: "#3A3952" }}
                                  >
                                    {/* {[v?.documentData]?.map(
                                      (val) => val?.licenseType
                                    )} */}
                                    {v?.category}
                                  </div>
                                </div>
                                <hr className="m-0 p-0" />
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Type
                                  </div>
                                  <label className="col-md-8  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.licenseType || "-"
                                    )}
                                  </label>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    License #
                                  </div>
                                  <label className="col-md-8  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.licenseNumber || "-"
                                    )}
                                  </label>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Expires On
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {" "}
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.expirationDate)?.format(
                                          "MMMM DD, YYYY"
                                        ) || "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified On
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedOn || "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified By
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {" "}
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedBy || "-"
                                    )}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                    <div className="px-2">
                      {doctorSummaryList &&
                        doctorSummaryList
                          ?.filter((v) => v?.templateType == "Certification")
                          ?.map((v) => {
                            return (
                              <div className="col-md-8 ">
                                <div className="py-2">
                                  <div
                                    className="medium mt-4 f16"
                                    style={{ color: "#3A3952" }}
                                  >
                                    {/* {[v?.documentData]?.map(
                                      (val) => val?.certificationType
                                    )} */}

                                    {v?.category}
                                  </div>
                                </div>
                                <hr className="m-0 p-0" />
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Type
                                  </div>
                                  <label className="col-md-8  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.certificationType || "-"
                                    )}
                                  </label>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Certification #
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.certification || "-"
                                    )}
                                  </label>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Expires On
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {" "}
                                    {[v?.documentData]?.map(
                                      (val) =>
                                        moment(val?.expirationDate)?.format(
                                          "MMMM DD, YYYY"
                                        ) || "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified On
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedOn || "-"
                                    )}
                                  </label>
                                </div>

                                <div className="row mt-2">
                                  <div className="col-md-4 signatures-sunhead medium">
                                    Verified By
                                  </div>
                                  <label className="col-md-4  mt-1">
                                    {[v?.documentData]?.map(
                                      (val) => val?.verifiedBy || "-"
                                    )}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="mt-2 bg-white">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3">Insurance</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="px-2">
                      <div className="px-2">
                        {" "}
                        {doctorSummaryList &&
                          doctorSummaryList
                            ?.filter((v) => v?.type == "Malpractice Insurance")
                            ?.map((v) => {
                              return (
                                <div className="col-md-8 ">
                                  <div className="py-2 mt-4">
                                    {[v?.documentData]?.map((val) => {
                                      return (
                                        <>
                                          <div
                                            className="medium  f16"
                                            style={{ color: "#3A3952" }}
                                          >
                                            {val?.malpracticeInsurance?.map(
                                              (v) => {
                                                return (
                                                  <>
                                                    <div
                                                      className="medium  f16 mt-3"
                                                      style={{
                                                        color: "#3A3952",
                                                      }}
                                                    >
                                                      Malpractice Insurance
                                                    </div>
                                                    <hr className="m-0 p-0" />
                                                    <div className="row mt-2">
                                                      <div className="col-md-4 signatures-sunhead medium">
                                                        Issuer
                                                      </div>
                                                      <label className="col-md-8  mt-1">
                                                        {v?.carrierName}
                                                      </label>
                                                    </div>

                                                    <div className="row mt-2">
                                                      <div className="col-md-4 signatures-sunhead medium">
                                                        Limits
                                                      </div>
                                                      <label className="col-md-8  mt-1">
                                                        {v?.incidentAmount}/
                                                        {v?.aggregateAmount}
                                                      </label>
                                                    </div>

                                                    <div className="row mt-2">
                                                      <div className="col-md-4 signatures-sunhead medium">
                                                        Expires On
                                                      </div>
                                                      <label className="col-md-8  mt-1">
                                                        {moment(
                                                          v?.policyExpirationDate
                                                        )?.format(
                                                          "MMMM DD, YYYY"
                                                        )}
                                                      </label>
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="mt-2 bg-white">
              {" "}
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3"> References</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="px-2">
                      {" "}
                      {doctorSummaryList &&
                        doctorSummaryList
                          ?.filter((v) => v?.type == "Peer References")
                          ?.map((v) => {
                            return (
                              <div className="col-md-8 ">
                                <div className="py-2 ">
                                  {v?.documentData?.map((val) => {
                                    return (
                                      <>
                                        {" "}
                                        <div
                                          className="medium mt-4 f16"
                                          style={{ color: "#3A3952" }}
                                        >
                                          {val?.prefix}.
                                          {val?.peerfirstName +
                                            " " +
                                            val?.peerlastName}
                                        </div>
                                        <hr className="m-0 p-0" />
                                        <div className="row mt-2">
                                          <div className="col-md-4 signatures-sunhead medium">
                                            Email
                                          </div>
                                          <label className="col-md-8  mt-1">
                                            {val?.peeremail}
                                          </label>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4 signatures-sunhead medium">
                                            Qualification
                                          </div>
                                          <label className="col-md-8  mt-1">
                                            {val?.peerqualification}
                                          </label>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4 signatures-sunhead medium">
                                            Specialty
                                          </div>
                                          <label className="col-md-8  mt-1">
                                            {" "}
                                            {/* {val?.peerspecialty?.map((v) => {
                                              return <div>{v?.label},</div>;
                                            })} */}
                                            {val?.peerspecialty?.map(
                                              (v, index, array) => {
                                                return (
                                                  <div key={index}>
                                                    {v?.label}
                                                    {index < array.length - 1 &&
                                                      ","}
                                                  </div>
                                                );
                                              }
                                            )}
                                          </label>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4 signatures-sunhead medium">
                                            Relationship
                                          </div>
                                          <label className="col-md-8  mt-1">
                                            {val?.peerrelationship}
                                          </label>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4 signatures-sunhead medium">
                                            Time Known
                                          </div>
                                          <label className="col-md-8  mt-1">
                                            {val?.lengthTimeKnown}
                                          </label>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>{" "}
            </div>

            <div className="mt-2 bg-white">
              {" "}
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3"> Hospital Affiliations</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <div className="px-2">
                      {" "}
                      {doctorSummaryList &&
                        doctorSummaryList
                          ?.filter(
                            (v) => v?.type == "Hospital/Facility Affiliations"
                          )
                          ?.map((v) => {
                            return (
                              <div className="col-md-8 ">
                                <div className="py-2">
                                  {[v?.documentData]?.map((val) => {
                                    return (
                                      <>
                                        <div
                                          className="medium  f16"
                                          style={{ color: "#3A3952" }}
                                        >
                                          {val?.hospitalorFacilityAffiliations?.map(
                                            (v) => {
                                              return (
                                                <>
                                                  <div
                                                    className="medium  f16 mt-3"
                                                    style={{ color: "#3A3952" }}
                                                  >
                                                    {v?.facilityName}
                                                  </div>
                                                  <hr className="m-0 p-0" />

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Facility Type
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {v?.facilityType}
                                                    </label>
                                                  </div>

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Location
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {v?.address +
                                                        " , " +
                                                        v?.state +
                                                        " , " +
                                                        v?.city +
                                                        " , " +
                                                        v?.zipCode}
                                                    </label>
                                                  </div>

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Appointment Date
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {/* {v?.appontmentDate} */}

                                                      {moment(
                                                        v?.appontmentDate
                                                      )?.format(
                                                        "MMMM DD, YYYY"
                                                      )}
                                                    </label>
                                                  </div>

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Reappointment Date
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {/* {v?.reappointmentDate} */}
                                                      {moment(
                                                        v?.reappointmentDate
                                                      )?.format(
                                                        "MMMM DD, YYYY"
                                                      )}
                                                    </label>
                                                  </div>

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Expiration Date
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {/* {v?.appointmentExpirationDate} */}

                                                      {moment(
                                                        v?.appointmentExpirationDate
                                                      )?.format(
                                                        "MMMM DD, YYYY"
                                                      )}
                                                    </label>
                                                  </div>

                                                  <div className="row mt-2">
                                                    <div className="col-md-4 signatures-sunhead medium">
                                                      Current Status
                                                    </div>
                                                    <label className="col-md-8  mt-1">
                                                      {v?.status}
                                                    </label>
                                                  </div>
                                                </>
                                              );
                                            }
                                          )}
                                          {/* Hospital Affiliations */}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="mt-2 bg-white">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3">Sanction Checks</div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="px-2">
                      <div className="col-md-8 ">
                        <div className="py-2">
                          <div
                            className="medium  f16 mt-3"
                            style={{
                              color: "#3A3952",
                            }}
                          >
                            NPDB
                          </div>
                          <hr className="m-0 p-0" />
                          <div className="row mt-2">
                            <div className="col-md-4 signatures-sunhead medium">
                              Status
                            </div>
                            <label className="col-md-8  mt-1">No Claims</label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8 ">
                        <div className="py-2">
                          <div
                            className="medium  f16 mt-3"
                            style={{
                              color: "#3A3952",
                            }}
                          >
                            OIG
                          </div>
                          <hr className="m-0 p-0" />
                          <div className="row mt-2">
                            <div className="col-md-4 signatures-sunhead medium">
                              Status
                            </div>
                            <label className="col-md-8  mt-1">No Claims</label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8 ">
                        <div className="py-2">
                          <div
                            className="medium  f16 mt-3"
                            style={{
                              color: "#3A3952",
                            }}
                          >
                            SAM
                          </div>
                          <hr className="m-0 p-0" />
                          <div className="row mt-2">
                            <div className="col-md-4 signatures-sunhead medium">
                              Status
                            </div>
                            <label className="col-md-8  mt-1">No Claims</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="mt-2 bg-white">
              {" "}
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1" className="accordion-Item">
                  <Accordion.Header className="accordion-Header bg-white">
                    <div className="col-4 f20 px-3">Provider Attestations</div>
                  </Accordion.Header>
                  <Accordion.Body>hai</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </>
    );
  };

  const medicaldirectorsignature = () => {
    return (
      <div className=" bg-white mt-2">
       
        <MDSignature formname={formname} MdData={MdData} Update={setUpdate} formType={"board_summary"}/>
      </div>
    );
  };

  const boardsignatures = () => {
    return (
      <>
        <BSBDSignatures
          formname={formname}
          MdData={MdData}
          Update={setUpdate}
          formType={"board_summary"}
        />
      </>
    );
  };

  const settingDetailstate = (name) => {
    setDetailsState(name);
  };

  const tabs = () => {
    switch (detailsState) {
      case "View Summary":
        return viewsummary();
      case "Medical Director Signature":
        return medicaldirectorsignature();
      case "Board Signatures":
        return boardsignatures();
      default:
        return <></>;
    }
  };
console?.log(MdData,"MdData")
  return (
    <div className="  row mt-2 ">
      <div className="d-flex py-2 px-3 gap-1 bg-white " ref={containerRef}>
        {["View Summary", "Medical Director Signature", "Board Signatures"].map(
          (e, i) => (
            <div
              className={ detailsState === e? "border pointer active-bar text-white p-2": "border pointer not-active p-2"}
              onClick={() => handleTabClick(e)}
              key={i}
            >
              {e} 
             
            </div>
          )
        )}
        <div className="col d-flex justify-content-end">
          <button
            type="button"
            className="f13 medium text-white  border rounded "
            style={{ background: "#46A1AE" }}
            //   onClick={add}
          >
            <FcPrint size={20} /> Print Summary
          </button>
        </div>
      </div>

      {tabs()}
    </div>
  );
};

export default BoardSummary;
