import React, { useEffect, useState } from 'react'
import Accordion from "react-bootstrap/Accordion";
import { getList, save } from '../api_services/SharedServices';
import { urls } from '../api_services/url';
import moment from "moment";
import { useParams } from 'react-router-dom';
import { UseFormValidations } from '../validations/UseFormValidation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SiAdobecreativecloud } from 'react-icons/si';
const BSMDBD = ({}) => {
  const [doctorSummaryList,setDoctorSummaryList]=useState([])
  const [update, setUpdate] = useState();
const {formType,type,appId,userId,guid}=useParams()
console?.log(formType,type,appId,userId,guid,"098765")
const [MdData,setMdData]=useState()


const submit = async () => {
  let jsonObjects = {
    userId: userId,
    appointmentId: appId,
    type: type == "MD" ? "MD" : "BD",
    isApproved: "Yes",
    // guid: guid,
    dopData: [data],
    formType:formType
  } 
  let res = await save(urls?.forms?.SaveBoardSummary, { jsonObjects })
  if (res) {
    setUpdate(res)
  }
};
const {
  data,
  errors,
 
  setValues,
  handleSubmit,
  handleChange,
  handleDateChange,
} = UseFormValidations({
  

     submit: submit,
});
  const getDoctorSummaryList = async () => {
    let jsonObjects = {
      appointmentId: appId,
      
    };
    let res = await getList(urls?.forms.getDirectorsSummary, {
      jsonObjects,
    });
    setDoctorSummaryList(res);
    console.log(res, "DoctorSummaryList");
  };

  const getMdFormData =async(id)=>{
    let jsonObjects = {
      appointmentId:id,
      type:type,
      formType:formType,
      filterType:'Link'
    };
    let res = await getList(urls?.forms?.GetAllBoardSummary, { jsonObjects });
    setMdData(res)
  }

  useEffect(()=>{
    setValues(MdData?.length==1?MdData&&MdData[0]:MdData&&MdData[1])
    
  },[MdData,update])
  useEffect(() => {
    getDoctorSummaryList();
  }, [update,appId]);
  useEffect(()=>{
    if(appId&&type&&formType){
      getMdFormData(appId)
    }
    
  },[appId,update])
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };


  const isFormFilled = () => {
    return data?.bdfirstName && data?.bdlastName && data?.bdtodayDate;
  };









  return (

    <>
<div> <div lg={12} className="bgheader d-flex justify-content-center p-2 ">
            <div lg={12} className=" d-flex justify-content-center ">
              <SiAdobecreativecloud size={34} color="white" className="py-1" />
              <span className="text-white px-2 headerfont1">OutPatientPro</span>
            </div>
          </div>


          <div className="mt-2 bg-white py-2">
            <div className="d-flex justify-content-between">
              <div className="f24 medium col-md-5  px-5">
               Board Summary
              </div>
              <div className="f17 medium  col-md-3 mt-2 ">
                Name :{data?.userName}
                 {/* {MdData?.length==1?MdData&&MdData[0]?.userName:MdData&&MdData[0]?.userName} */}
              </div>
              <div className="f17 medium  col-md-3 mt-2  ">
                Provider Name : {data?.providerName}
                 {/* {MdData?.length==1?MdData&&MdData[0]?.providerName:MdData&&MdData[1]?.providerName}{" "}{MdData?.length==1?(`[${MdData&&MdData[0]?.roleName}]`):(`[${MdData&&MdData[1]?.roleName}]`)} */}
              </div>
            </div>
          </div>
    <div className="  p-3    ">
 
      <div className="">
        <div className="mt-2 bg-white">
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
                                  (val) =>
                                    val?.institutionName ||
                                    "-"
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
                                )}- {[v?.documentData]?.map(
                                  (val) =>
                                    moment(val?.endDate)?.format(
                                      "YYYY "
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
                                  (val) =>
                                    val?.verifiedOn || "-"
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
                                  (val) =>
                                    val?.verifiedBy || "-"
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
                                  (val) =>
                                    val?.licenseType || "-"
                                )}
                              </label>
                            </div>
                            <div className="row mt-2">
                              <div className="col-md-4 signatures-sunhead medium">
                                License #
                              </div>
                              <label className="col-md-8  mt-1">
                                {[v?.documentData]?.map(
                                  (val) =>
                                    val?.licenseNumber ||
                                    "-"
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
                                  (val) =>
                                    val?.verifiedOn || "-"
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
                                  (val) =>
                                    val?.verifiedBy || "-"
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
                                  (val) =>
                                    val?.certificationType ||
                                    "-"
                                )}
                              </label>
                            </div>
                            <div className="row mt-2">
                              <div className="col-md-4 signatures-sunhead medium">
                                Certification #
                              </div>
                              <label className="col-md-4  mt-1">
                                {[v?.documentData]?.map(
                                  (val) =>
                                    val?.certification ||
                                    "-"
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
                                  (val) =>
                                    val?.verifiedOn || "-"
                                )}
                              </label>
                            </div>

                            <div className="row mt-2">
                              <div className="col-md-4 signatures-sunhead medium">
                                Verified By
                              </div>
                              <label className="col-md-4  mt-1">
                                {[v?.documentData]?.map(
                                  (val) =>
                                    val?.verifiedBy || "-"
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
                                                  )?.format( "MMMM DD, YYYY")}
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
                                                  )?.format( "MMMM DD, YYYY")}
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
                                                  )?.format( "MMMM DD, YYYY")}
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
      <form className="row mt-3 bg-white px-4 p-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
            <label className="f15 medium">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              className={emailErrorColor("bdfirstName")}
              value={data?.bdfirstName}
              onChange={handleChange("bdfirstName")}
              placeholder="First Name"
            ></input>
          </div>
            <div className="col-md-2">
              <label className="f15 medium">Middle Initial</label>
              <input
                className="form-control bg-white"
                value={data?.bdmiddleName}
                onChange={handleChange("bdmiddleName")}
                placeholder="Middle Name"
              ></input>
            </div>
            <div className="col-md-3">
              <label className="f15 medium">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("bdlastName")}
                value={data?.bdlastName}
                onChange={handleChange("bdlastName")}
                placeholder="Last Name"
              ></input>
            </div>
            <div className="col-md-3">
              <label className="f15 medium">Today’s Date <span className="text-danger">*</span></label>
             
              <DatePicker
                className={`${emailErrorColor("todayDate")} py-2`}
                minDate={new Date(1900, 1, 1)}
                selected={data?.bdtodayDate&&moment(new Date(data?.bdtodayDate)).format("MM/DD/YYYY")}
                autoComplete="off"
                name="bdtodayDate"
                onChange={(e) => {
                  handleDateChange(e, "bdtodayDate");
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                popperClassName="react-datepicker-popper"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                showIcon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#B2B2B2"
                    class="bi bi-calendar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                }
              />
            </div>
            
            <div className='my-4'>
            <button type="submit" disabled={!isFormFilled()} className={`save${!isFormFilled() ? 'disable' : ''} rounded border text-white p-2 pointer`}>
  Accept & Sign
</button>

            </div>
            </form>
    </div>
    </div>
  </>
  )
}

export default BSMDBD