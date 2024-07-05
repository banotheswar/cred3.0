import React, { useEffect, useRef, useState } from "react";
import { FaBoxArchive, FaRegCircleUser } from "react-icons/fa6";
import { PiNoteFill, PiUserFill } from "react-icons/pi";
import { BiSolidPencil, BiSolidSend } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import ProfileTable from "../../../share_components/ProfileTable";
import viewapp from "../../../assets/images/View Application Btn.svg";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import SendMessagemodal from "./SendMessagemodal";
import checkmark from "../../../assets/images/checkmark light green.svg";
import expireicon from "../../../assets/images/expiring 1.svg";
import reapp from "../../../assets/images/in progress light blue.svg";
import appdatastatus from "../../../assets/images/appt status.svg";
import DoctorDetailsMobile from "../../../MobileComponents/DoctorDetailsMobile";
import { useParams, useLocation } from "react-router-dom";
import { getById, getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import moment from "moment";
import { phoneFormat } from "./../../../api_services/SharedServices";
import LicenseAndCertificationsModal from "./LicenseAndCertificationsModal";
import CertificationsModal from "./CertificationsModal";
import AddHealthDocumentModal from "./AddHealthDocumentModal";
import AddTestModal from "./AddTestModal";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { providerId, facilityId, appId } = useParams();
  const location = useLocation();
  const [detailsState, setDetailsState] = useState("Overview");
  const { headerlink } = UseFormValidations({});
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [doctordtails, setDoctordeatils] = useState();
  const [locationsList, setLocationsList] = useState();
  const [malpracticeList, setMalpracticeList] = useState([]);
  const [update, setUpdate] = useState("");
  const [appointmentsList, setAppointmentsList] = useState();
  const [licenseCertificationsList, setLicenseCertificationsList] = useState();
  const [certificationsList, setCertificationsList] = useState();
  const [healthDocumentsList, setHealthDocumentsList] = useState();
  const [testsList, setTestsList] = useState();
  const [modal, setModal] = useState(false);
  const [certificationsModal, setCertificationsModal] = useState(false);
  const [healthDocumentModal, setHealthDocumentModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const handleTabClick = (index) => {
    const tab = containerRef.current.children[index];
  };

  console?.log(malpracticeList, "doctordtails",malpracticeList?.map((v)=>v?.additionalData?.malpracticeInsurance));

  const getLocyionsList = async () => {
    let jsonObjects = { userId: providerId };
    let res = await getList(urls?.doctor?.getLocationsById, { jsonObjects });
    setLocationsList(res);
  };

  const getAppointmentsList = async () => {
    let jsonObjects = { userId: providerId, facilityId: facilityId };
    let res = await getList(urls?.Appointments?.getAllAppointment, {
      jsonObjects,
    });
    setAppointmentsList(res);
  };

  const getlicenseCertificationsList = async () => {
    let jsonObjects = { providerId: providerId, type: "Licensure" };
    let res = await getList(urls?.Appointments?.getLicenseCertifications, {
      jsonObjects,
    });
    setLicenseCertificationsList(res);
    console?.log(res[0]?.documentData, "0576", res);
  };

  const getCertificationsList = async () => {
    let jsonObjects = { providerId: providerId, type: "Certification" };

    let res = await getList(urls?.Appointments?.getLicenseCertifications, {
      jsonObjects,
    });
    setCertificationsList(res);
  };

  const getHealthDocumentsList = async () => {
    let jsonObjects = { providerId: providerId, category: "Immunization" };

    let res = await getList(urls?.Appointments?.getHealthDocuments, {
      jsonObjects,
    });
    setHealthDocumentsList(res);
  };

  const getTestsList = async () => {
    let jsonObjects = { providerId: providerId, category: "Test" };

    let res = await getList(urls?.Appointments?.getHealthDocuments, {
      jsonObjects,
    });
    setTestsList(res);
  };

  const getMalpracticeList = async () => {
    let jsonObjects = {
      userId: providerId,
      formId: 9,
      packageId: 1,

      appointmentId: appointmentsList && appointmentsList[0]?.appointmentId,
    };
    let res = await getList(urls?.forms?.getformsdata, {
      jsonObjects,
    });

    setMalpracticeList(res?.map((v)=>v?.additionalData?.malpracticeInsurance[0]));
    // let obj=res?.map((v)=>v?.additionalData?.malpracticeInsurance[0])
    // let obj2=res?.map((v,i)=>v?.additionalData?.malpracticeInsurance[0])
    // console.log(obj2,"8979834897",obj)
  };



  const Facility = [
    { name: "All Providers", link: "/outpatientpro/facility/doctors" },
    {
      name: doctordtails?.roleName,
      link: `/outpatientpro/facility/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/facility/doctors/details/${providerId}/${facilityId}/${appId}`,
      active: true,
    },
  ];
  const Enterprise = [
    {
      name: "All Providers",
      link: `/outpatientpro/enterprise/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }`,
    },
    {
      name: doctordtails?.roleName,
      link: `/outpatientpro/enterprise/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }`,
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/enterprise/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }/details/${providerId}/${facilityId}/${appId}`,
      active: true,
    },
  ];
  const Provider = [
    {
      name: "Dashboard",
      link: "/outpatientpro/provider/dashboard",
    },
    {
      name: doctordtails?.userName,
      link: `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}`,
      active: true,
    },
  ];

  const Breadcrumb = (name) => {
    switch (name) {
      case `/outpatientpro/facility/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }/details/${providerId}/${facilityId}/${appId}`:
        return Facility;

      case `/outpatientpro/enterprise/${
        doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
      }/details/${providerId}/${facilityId}/${appId}`:
        return Enterprise;

      case `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}`:
        return Provider;

      default:
        break;
    }
  };
  useEffect(() => {
    headerlink(Breadcrumb(location.pathname));
  }, [doctordtails]);

  useEffect(() => {
    getLocyionsList();
    getAppointmentsList();
  }, [providerId]);

  useEffect(() => {
    getlicenseCertificationsList();
    getCertificationsList();
    getHealthDocumentsList();
    getTestsList();
  }, [providerId, update]);

  useEffect(() => {
    getMalpracticeList();
  }, [providerId, appointmentsList]);

  const getUserDetails = async () => {
    let jsonObjects = {
      userId: providerId,
      appointmentId: appId,
    };
    let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
    setDoctordeatils(res);
  };

  const speciality = () => {
    const labels = doctordtails?.speciality?.map((v) => v?.label);
    if (labels) {
      if (labels?.length <= 2) {
        return (
          <div title={labels} className="pointer  text-wrap">
            {labels?.join(", ")}
          </div>
        );
      } else {
        return (
          <div title={labels} className="pointer  text-wrap">
            {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
          </div>
        );
      }
    } else {
      return "";
    }
  };

  const Tags = () => {
    const labels = doctordtails?.tags?.map((v) => v.label);
    if (labels) {
      if (labels?.length <= 2) {
        return (
          <div title={labels} className="pointer  text-wrap">
            {labels?.join(", ")}
          </div>
        );
      } else {
        return (
          <div title={labels} className="pointer  text-wrap">
            {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
          </div>
        );
      }
    } else {
      return "";
    }
  };
  const overView = () => {
    const columns = [
      {
        name: "Type",
        selector: (row) => (
          <div>
            <div
              className=""
              title={`${
                row?.appointmentType !== ""
                  ? `Type: ${row?.appointmentType}`
                  : ""
              }`}
            >
              {row?.appointmentType === "Initial Appointment" && (
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
              {row?.appointmentType === "Initial Appointment " && (
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
              {row?.appointmentType === "Reappointment" && (
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
              )}{" "}
              {row?.appointmentType}
            </div>
          </div>
        ),
        width: "12rem",
      },

      {
        name: "Appt Date",

        selector: (row) => (
          <div className="text-wrap" title={row?.startDate}>
            {/* {moment(row?.startDate)?.format("MM/DD/YYYY ")} */} -
          </div>
        ),
        width: "10rem",
      },

      {
        name: "Appt Expires",
        selector: (row) => (
          <div className="pointer" title={row?.apptExpires}>
            {/* {row?.apptExpires} */} -
          </div>
        ),
        width: "11rem",
      },

      {
        name: "Status",
        selector: (row) => (
          <div className="d-flex ">
            <div
              title={row?.appointmentStatus}
              className={
                ((row?.appointmentStatus == "Application Sent" ||
                  row?.appointmentStatus == "In Progress") &&
                  " pointer inprogress-profile   text-center ") ||
                (row?.appointmentStatus == "Expired" &&
                  "expired    text-center pointer") ||
                (row?.appointmentStatus == "Complete" &&
                  "privileged-pr-file     text-center pointer") ||
                (row?.appointmentStatus == "Archived" &&
                  "archived    text-center pointer") ||
                (row?.appointmentStatus == "Expiring (33 days)" &&
                  "expiring    text-center pointer") ||
                (row?.appointmentStatus == "Board Review" &&
                  "boardReview    text-center pointer")
              }
            >
              {row?.appointmentStatus}
            </div>
            {row?.status == "In Progress" && (
              <div className=" statustextcolor ">Facility Review (34%)</div>
            )}
          </div>
        ),
        width: "23rem",
      },

      {
        name: "Actions",
        selector: (row) => (
          <div
            className="  pointer  text-center "
            title={row?.action}
            onClick={
              row?.status == "Complete"
                ? () => navigate("/outpatientpro/facility/formsview")
                : () =>
                    sessionStorage?.getItem("roleId") == 2
                      ? navigate(
                          `/outpatientpro/enterprise/${
                            doctordtails?.roleName == "AHP"
                              ? "alliedhealth"
                              : "doctors"
                          }/details/${providerId}/${facilityId}/${appId}/applicationinprogress`
                        )
                      : navigate(
                          `/outpatientpro/facility/${
                            doctordtails?.roleName == "AHP"
                              ? "alliedhealth"
                              : "doctors"
                          }/details/${providerId}/${facilityId}/${appId}/applicationinprogress`
                        )
            }
          >
            {row?.status == "Complete" ? (
              <PiNoteFill
                className="me-2"
                color="#3A3952"
                opacity={0.7}
                size={15}
                height={15}
                width={15}
              />
            ) : (
              <BiSolidPencil
                className="me-2"
                color="#3A3952"
                opacity={0.7}
                size={15}
                height={15}
                width={15}
              />
            )}{" "}
            {row?.action}
          </div>
        ),
      },
    ];
    const columnsTwo = [
      {
        name: "Facility Name",
        selector: (row) => (
          <div>
            <div
              className="text-wrap"
              title={`${
                row?.facilityName !== ""
                  ? `Facility Name: ${row?.facilityName}`
                  : ""
              }`}
            >
              {row?.facilityName}
            </div>
          </div>
        ),
        // width: "20rem",
      },

      {
        name: "Address",
        selector: (row) => (
          <div className="pointer" title={row?.address}>
            {row?.address}
          </div>
        ),
        width: "22rem",
      },

      {
        name: "City",
        selector: (row) => (
          <div className="pointer" title={row?.city}>
            {row?.city}
          </div>
        ),
        width: "11rem",
      },

      {
        name: "State",
        selector: (row) => (
          <div className="text-wrap" title={row?.state}>
            {row?.state}
          </div>
        ),
        width: "8rem",
      },

      {
        name: "Zip",
        selector: (row) => <div title={row?.zipcode}>{row?.zipcode}</div>,
        width: "5.5625rem",
      },
    ];

    return (
      <>
        <div className="p-2 mt-2 vh-auto bg-white">
          <div className="px-4  py-3 ">
            <div className="doctor-table-headings ">Appointment Status</div>

            <div
              className="  row  col-md-12  ms-0 mt-4"
              style={{ height: "145px" }}
            >
              {[
                {
                  name: "Status",
                  value: <span> {appointmentsList&&appointmentsList[0]?.appointmentStatus}</span>,
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

          <div className="row px-4  py-3">
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="doctor-table-headings">Appointment History</div>
              <div className=" button-user-viewapp rounded pointer d-flex justify-content-center align-items-center">
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
            <div className="mt-3">
              <ProfileTable dataTable={appointmentsList} columns={columns} />
            </div>
          </div>

          <div className="row px-4  py-4 mt-2">
            <div className="doctor-table-headings ">Facilities</div>
            <div className="mt-2 py-3">
              <ProfileTable dataTable={locationsList} columns={columnsTwo} />
            </div>
          </div>
        </div>
      </>
    );
  };
  const credentials = () => {
    const columnsLicensure = [
      {
        name: "Type",

        selector: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={row?.selected}
              name="userId"
              className="ms-1"
              style={{ transform: "scale(1.2)", marginRight: "8px" }}
            />
            <div
              className="link-hover-line"
              title={row?.documentData?.licenseType}
              onClick={() => setModal(row)}
            >
              {row?.documentData.licenseType
                ? row?.documentData.licenseType
                : "-"}
            </div>
          </div>
        ),
        width: "18rem",
      },

      {
        name: "License #",
        selector: (row) => (
          <div className="pointer" title={row?.documentData?.licenseNumber}>
            {row?.documentData?.licenseNumber}
          </div>
        ),
        width: "8rem",
      },
      {
        name: "Expires On",
        selector: (row) => (
          <div>
            {row?.documentData?.expirationDate
              ? moment(row?.documentData?.expirationDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
      },

      {
        name: "Verified By",
        selector: (row) => (
          <div className="f15">
           
              {row?.certificationrverifiedBy?row?.certificationrverifiedBy:"-"}
          </div>
        ),
      },

      {
        name: "Verified On",
        selector: (row) =>(
          
          <div className="f15">
 
     
          {row?.certificationVerifiedDate?moment(row?.certificationVerifiedDate).format("MM/DD/YYYY"):"-"}
        </div>
       ),
      },

      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer inprogress-profile   text-center ") ||
              (row?.status == "Expired" &&
                "expired-profile    text-center pointer") ||
              (row?.status == "Current" &&
                "privileged-pr-file    text-center pointer") ||
              (row?.status == "Archived" &&
                "archived    text-center pointer") ||
              (row?.status == "Expiring (33 days)" &&
                "expiring-profile     text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview-profile    text-center pointer")
            }
          >
            {row?.status}
          </div>
        ),

        width: "11rem",
      },
    ];

    const columnsCertifications = [
      {
        name: "Type",

        selector: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={row?.selected}
              name="userId"
              className="ms-1"
              style={{ transform: "scale(1.2)", marginRight: "8px" }}
            />
            <div
              className="link-hover-line"
              title={row?.documentData?.certificationType}
              onClick={() => setCertificationsModal(row)}
            >
              {row?.documentData.certificationType
                ? row?.documentData.certificationType
                : "-"}
            </div>
          </div>
        ),
        width: "18rem",
      },

      {
        name: "License #",
        selector: (row) => (
          <div className="pointer" title={row?.documentData?.certification}>
            {row?.documentData?.certification}
          </div>
        ),
        width: "8rem",
      },
      {
        name: "Expires On",
        selector: (row) => (
          <div>
            {row?.documentData?.expirationDateBC
              ? moment(row?.documentData?.expirationDateBC).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
      },

      {
        name: "Verified By",
        selector: (row) => (
          <div className="f15">
             {row?.certificationrverifiedBy?row?.certificationrverifiedBy:"-"}
          </div>
        ),
      },

      {
        name: "Verified On",
        selector: (row) => (
         <div className="f15"> {row?.certificationVerifiedDate?moment(row?.certificationVerifiedDate).format("MM/DD/YYYY"):"-"}</div>
        ),
      },

      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer inprogress-profile   text-center ") ||
              (row?.status == "Expired" &&
                "expired-profile    text-center pointer") ||
              (row?.status == "Current" &&
                "privileged-pr-file    text-center pointer") ||
              (row?.status == "Archived" &&
                "archived    text-center pointer") ||
              (row?.status == "Expiring (33 days)" &&
                "expiring-profile     text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview-profile    text-center pointer")
            }
          >
            {row?.status}
          </div>
        ),

        width: "11rem",
      },
    ];

    const columnsMal = [
      {
        name: "Issuer",
        selector: (row) => (
          <div>
            <div
              className="link-hover-line"
              title={`${row?.issuer !== "" ? `Name: ${row?.issuer}` : ""}`}
            >
              {/* {row?.additionalData?.malpracticeInsurance.map(
                (v) => v.carrierName
              )} */}
              {row.carrierName}
            </div>
          </div>
        ),
        width: "18rem",
      },

      {
        name: "Limits",
        selector: (row) => (
          <div className="pointer" title={row?.limits}>
            {row?.incidentAmount} / {row?.aggregateAmount} 
          </div>
        ),
      },

      {
        name: "Expires On",
        selector: (row) => (
          <div className="pointer" title={row?.policyExpirationDate}>
            {row?.policyExpirationDate
              ? moment(row?.policyExpirationDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
        width: "8rem",
      },

      {
        name: "Verified By",
        selector: (row) => <div className="f15">
            {row?.certificationrverifiedBy?row?.certificationrverifiedBy:"-"}</div>,
        width: "8rem",
      },

      {
        name: "Verified On",
        selector: (row) => <div>
          
          {/* {row?.verifiedOn}
           */}
         <div className="f15"> {row?.certificationVerifiedDate?moment(row?.certificationVerifiedDate).format("MM/DD/YYYY"):"-"}</div>

          
          </div>,
        width: "8rem",
      },
      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer applicationSent   text-center ") ||
              (row?.status == "Expired" && "expired    text-center pointer") ||
              (row?.status == "Current" &&
                "privileged-pr-file    text-center pointer") ||
              (row?.status == "Archived" &&
                "archived    text-center pointer") ||
              (row?.status == "Expiring (33 days)" &&
                "expiring    text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview    text-center pointer")
            }
          >
            {row?.status}
          </div>
        ),
        width: "11rem",
      },
    ];

    return (
      <>
        <div className="p-2 mt-2 vh-auto bg-white">
          <div className="px-4  d-flex gap-2 mt-4">
            <div className="mt-1 f14 pointer" style={{ color: "#0073EE" }}>
              <span>
                <FaBoxArchive className="me-2" />
              </span>
              Archive Selected Docs
            </div>
            <span style={{ borderRight: "2px solid #ddd " }}></span>
            {[
              "All Templates",
              "Current",
              "Expiring Soon",
              "Expired",
              "Archived",
            ]?.map((v) => (
              <div
                // onClick={() => setFilter(v == "Archived" ? "InActive" : v)}
                className={
                  detailsState === v
                    ? "text-center filter-tabactive  col-md-auto px-3 "
                    : "text-center filter-tab  col-md-auto px-3 "
                }
              >
                {v}
              </div>
            ))}
          </div>
          <div className="row px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="doctor-table-headings ">Licensure</div>
              <div
                className=" button-user   rounded pointer  p-2 d-flex justify-content-center align-items-center"
                style={{
                  background: "#00B948 0% 0% no-repeat padding-box",
                  width: "136px",
                }}
                onClick={() => setModal(doctordtails)}
              >
                + New License
              </div>
            </div>
          </div>
          <div className="px-4">
            <ProfileTable
              dataTable={licenseCertificationsList}
              columns={columnsLicensure}
            />
            {modal && (
              <LicenseAndCertificationsModal
                show={modal}
                update={setUpdate}
                onHide={() => setModal(false)}
              />
            )}
          </div>

          <div className="row px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="doctor-table-headings ">Certifications</div>
              <div
                className=" button-user   rounded pointer  p-2 d-flex justify-content-center align-items-center"
                style={{
                  background: "#00B948 0% 0% no-repeat padding-box",
                  width: "136px",
                }}
                onClick={() => setCertificationsModal(doctordtails)}
              >
                + New Certification
              </div>
            </div>
          </div>
          <div className="px-4">
            <ProfileTable dataTable={certificationsList} columns={columnsCertifications} />
            {certificationsModal && (
              <CertificationsModal
                show={certificationsModal}
                update={setUpdate}
                onHide={() => setCertificationsModal(false)}
              />
            )}
          </div>
          <div className="row px-4 py-5 mt-1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="f18 medium">Malpractice Insurance</div>
            </div>
            <div className="py-3">
              {" "}
              <ProfileTable dataTable={malpracticeList} columns={columnsMal} />
            </div>
          </div>
        </div>
      </>
    );
  };


  const healthDocuments = () => {
    const columnsHealth = [
      {
        name: "Type",
        selector: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={row?.selected}
              name="userId"
              className="ms-1"
              style={{ transform: "scale(1.2)", marginRight: "8px" }}
            />

            <div
              className="link-hover-line"
              title={row?.healthDocument}
              onClick={() => setHealthDocumentModal(row)}
            >
              {row?.documentData?.type}
              {/* {row?.type} */}
            </div>
          </div>
        ),
        width: "18rem",
      },

      {
        name: "Completion Date",
        selector: (row) => (
          <div className="pointer" title={row?.completiondate}>
            {row?.documentData?.completionDate
              ? moment(row?.documentData?.completionDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
      },

      {
        name: "Expiration Date",
        selector: (row) => (
          <div className="pointer" title={row?.expirationDate}>
            {row?.documentData?.expirationDate
              ? moment(row?.documentData?.expirationDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
        width: "9rem",
      },

      {
        name: "Verified By",
        selector: (row) => (
          <div className="f15">{row?.certificationrverifiedBy}</div>
        ),
        width: "8rem",
      },

      {
        name: "Verified On",
        selector: (row) => (
          <div>
            {" "}
            {row?.certificationVerifiedDate
              ? moment(row?.certificationVerifiedDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
        width: "8rem",
      },

      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer applicationSent   text-center ") ||
              (row?.status == "Expired" && "expired    text-center pointer") ||
              (row?.status == "Current" &&
                "privileged-pr-file    text-center pointer") ||
              (row?.status == "Archived" &&
                "archived    text-center pointer") ||
              (row?.status == "Expiring (33 days)" &&
                "expiring    text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview    text-center pointer")
            }
          >
            {row?.status}
          </div>
        ),
        width: "11rem",
      },
    ];

    const columnsTest = [
      {
        name: "Type",
        selector: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={row?.selected}
              name="userId"
              className="ms-1"
              style={{ transform: "scale(1.2)", marginRight: "8px" }}
            />
            <div
              className="link-hover-line"
              title={row?.testtype}
              onClick={() => setTestModal(row)}
            >
              {row?.documentData?.type}
            </div>
          </div>
        ),
        width: "18rem",
      },

      {
        name: "Completion Date",
        selector: (row) => (
          <div className="pointer" title={row?.completiondate}>
            {row?.documentData?.completionDate
              ? moment(row?.documentData?.completionDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
      },

      {
        name: "Expiration Date",
        selector: (row) => (
          <div className="pointer" title={row?.expirationDate}>
            {row?.documentData?.expirationDate
              ? moment(row?.documentData?.expirationDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
        width: "9rem",
      },

      {
        name: "Verified By",
        selector: (row) => (
          <div className="f15">  <div className="f15">{row?.certificationrverifiedBy}</div></div>
        ),
        width: "8rem",
      },

      {
        name: "Verified On",
        selector: (row) => (
          <div>
             {" "}
            {row?.certificationVerifiedDate
              ? moment(row?.certificationVerifiedDate).format("MM/DD/YYYY")
              : "-"}
          </div>
        ),
        width: "8rem",
      },
      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer applicationSent   text-center ") ||
              (row?.status == "Expired" && "expired    text-center pointer") ||
              (row?.status == "Current" &&
                "privileged-pr-file    text-center pointer") ||
              (row?.status == "Archived" &&
                "archived    text-center pointer") ||
              (row?.status == "Expiring (33 days)" &&
                "expiring    text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview    text-center pointer")
            }
          >
            {row?.status}
          </div>
        ),
        width: "11rem",
      },
    ];

    return (
      <>
        <div className="p-2 mt-2 vh-auto bg-white">
          <div className="px-4  d-flex gap-2 mt-4">
            <div className="mt-1 f14 pointer" style={{ color: "#0073EE" }}>
              <span>
                <FaBoxArchive className="me-2" />
              </span>
              Archive Selected Docs
            </div>
            <span style={{ borderRight: "2px solid #ddd " }}></span>
            {[
              "All Templates",
              "Current",
              "Expiring Soon",
              "Expired",
              "Archived",
            ]?.map((v) => (
              <div
                className={
                  detailsState === v
                    ? "text-center filter-tabactive  col-md-auto px-3 "
                    : "text-center filter-tab  col-md-auto px-3 "
                }
              >
                {v}
              </div>
            ))}
          </div>
          <div className="row px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="doctor-table-headings ">Immunizations</div>
              <div
                className=" button-user   rounded pointer  p-2 d-flex justify-content-center align-items-center"
                style={{
                  background: "#00B948 0% 0% no-repeat padding-box",
                  width: "166px",
                }}
                onClick={() => setHealthDocumentModal(doctordtails)}
              >
                + New Health Document
              </div>
            </div>
          </div>
          <div className="px-4">
            <ProfileTable
              dataTable={healthDocumentsList}
              columns={columnsHealth}
            />
            {healthDocumentModal && (
              <AddHealthDocumentModal
                show={healthDocumentModal}
                update={setUpdate}
                onHide={() => setHealthDocumentModal(false)}
              />
            )}
          </div>
          <div className="row px-4 py-5 mt-1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="f18 medium">Tests</div>
              <div
                className=" button-user   rounded pointer  p-2 d-flex justify-content-center align-items-center"
                style={{
                  background: "#00B948 0% 0% no-repeat padding-box",
                  width: "166px",
                }}
                onClick={() => setTestModal(doctordtails)}
              >
                + Tests
              </div>
            </div>
            <div className="py-3">
              {" "}
              <ProfileTable dataTable={testsList} columns={columnsTest} />
              {testModal && (
                <AddTestModal
                  show={testModal}
                  update={setUpdate}
                  onHide={() => setTestModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const sanctions = () => {
    return (
      <>
        <div className="p-4 mt-2 vh-auto bg-white">
          <div className="py-1 px-2">
            <div
              className="doctor-table-headings px-1"
              style={{ height: "21px" }}
            >
              National Provider Databank (NPDB)
            </div>

            <div
              className="  row  col-md-12  mt-4 ms-1"
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
            <div className="col-auto py-3 px-1">
              <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
                Check Now
              </div>
            </div>
          </div>

          <div className="py-4  px-2 mt-2">
            <div className="doctor-table-headings px-1">
              Office of the Inspector General (OIG)
            </div>

            <div
              className="  row  col-md-12  mt-4 ms-1"
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
            <div className="col-auto py-3 px-1">
              <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
                Check Now
              </div>
            </div>
          </div>

          <div className="py-3  px-2 ">
            <div className="doctor-table-headings px-1">
              System for Award Management (SAM)
            </div>

            <div
              className="  row  col-md-12  mt-4 ms-1"
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
            <div className="col-auto py-3 px-1">
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

  const gotoForms = (roleId) => {
    switch (roleId) {
      case "1":
        return `/outpatientpro/admin/${
          doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;

      case "2":
        return `/outpatientpro/enterprise/${
          doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;

      case "4":
        return `/outpatientpro/facility/${
          doctordtails?.roleName == "AHP" ? "alliedhealth" : "doctors"
        }/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;

      case "5":
        return `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}/applicationinprogress`;

      default:
        return "";
    }
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
  useEffect(() => {
    appId && getUserDetails();
  }, [appId]);
  // const col3Width = "25%";
  // const col9Width = `calc(100% - ${col3Width})`;
  return (
    <>
      <div className="show_header">
        {" "}
        <DoctorDetailsMobile
          appointmentsList={appointmentsList}
          locationsList={locationsList}
          providerId={providerId}
          doctordtails={doctordtails}
          licenseCertificationsList={licenseCertificationsList}
          certificationsList={certificationsList}
          malpracticeList={malpracticeList}
        />
      </div>

      <div className=" mobile_Header">
        <div className="d-flex   gap-2">
          <div className="  bg-white p-3 container-width3 ">
            <div
              className="border  rounded    pt-4 py-2  border-0 mt-5 d-flex flex-column align-items-center "
              style={{
                background: " rgba(236, 236, 236, 0.45)",
                minHeight: "168px",
              }}
            >
              <div
                className=" "
                style={{
                  position: "absolute",
                  top: "126px",
                  border: "3px solid rgb(255, 255, 255)",
                  background: " rgb(255, 255, 255)",
                  borderRadius: "50%",
                }}
              >
                <FaRegCircleUser
                  color="#8B8B8B"
                  style={{ height: "60px", width: "60px" }}
                />
              </div>
              <div className=" doctor-profile-name pt-3">
                {doctordtails?.userName ? doctordtails?.userName : "-"}{" "}
              </div>
              <p className="doctor-profile-desig">{doctordtails?.roleName}</p>
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                <div
                  className="rounded button-user-profile-1 px-2 p-2 d-flex justify-content-center align-items-center"
                  style={{ opacity: "0.6" }}
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
                  onClick={() => setSendMessageModal({ formName: "Profile" })}
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

            <div className="row py-3 pt-4 px-4  ">
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
              <div className="label-text ">
                {/* Reappointment in Progress{" "} */}
                {appointmentsList&&appointmentsList[0]?.appointmentStatus}
                {detailsState == "Credentials" && (
                  <img
                    src={reapp}
                    alt="cred"
                    className="ms-1"
                    style={{
                      objectFit: "fill",
                      height: "18px",
                      width: "18px",
                    }}
                  />
                )}
              </div>
              <div className="col-auto mt-3">
                <div
                  className="button-user  p-2 px-3 d-flex justify-content-center align-items-center  rounded pointer"
                  style={{ width: "146px" }}
                  onClick={
                    () => navigate(gotoForms(sessionStorage?.getItem("roleId")))
                    // navigate(`/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`)
                  }
                >
                  Review Application
                </div>
              </div>
            </div>
            <div className="row px-4 gap-3 mt-2">
              <div>
                {" "}
                <label
                  className="f14"
                  style={{
                    opacity: "0.6",
                    color: "#323232",
                    height: "16px",
                    width: "35px",
                  }}
                >
                  Email
                </label>
                <div className="label-text">{doctordtails?.email}</div>
              </div>
              <div>
                {" "}
                <label
                  className="f14"
                  style={{
                    opacity: "0.6",
                    color: "#323232",
                    height: "16px",
                    width: "42px",
                  }}
                >
                  Mobile
                </label>
                <div className="label-text">(870) 454-1212</div>
              </div>
              <div>
                <label
                  className="f14"
                  style={{
                    opacity: "0.6",
                    color: "#323232",
                    height: "16px",
                    width: "28px",
                  }}
                >
                  DOB
                </label>
                <div className="label-text">
                  {moment(doctordtails?.dob).format("MM/DD/YYYY")}
                </div>
              </div>

              <div>
                {" "}
                <label
                  className="f14"
                  style={{
                    opacity: "0.6",
                    color: "#323232",
                    height: "16px",
                    width: "57px",
                  }}
                >
                  Specialty
                </label>
                <div className="label-text"> {speciality()}</div>
              </div>
              <div className="d-flex gap-4">
                <div>
                  <label
                    className="f14"
                    style={{
                      opacity: "0.6",
                      color: "#323232",
                      height: "16px",
                      width: "35px",
                    }}
                  >
                    NPI #
                  </label>
                  <div className="label-text">
                    {phoneFormat(doctordtails?.npi)}
                  </div>
                </div>
                <div>
                  <label
                    className="f14"
                    style={{
                      opacity: "0.6",
                      color: "#323232",
                      height: "16px",
                      width: "39px",
                    }}
                  >
                    DEA #
                  </label>
                  <div className="label-text">
                    {phoneFormat(doctordtails?.dea)}
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <label
                  className="f14"
                  style={{
                    opacity: "0.6",
                    color: "#323232",
                    height: "16px",
                    width: "30px",
                  }}
                >
                  Tags
                </label>
                <div className="label-text">{Tags()}</div>
                <div className="link-hover-line f14">Edit Tags</div>
              </div>
            </div>
          </div>

          <div className="container-width9">
            <div
              className="bg-white d-flex py-4 px-4 gap-1 "
              ref={containerRef}
              style={{ height: "84px" }}
            >
              {[
                "Overview",
                "Credentials",
                "Health Documents",
                "Sanctions",
              ]?.map((e, i) => (
                <div
                  className={
                    detailsState === e
                      ? "   pointer  active-bar doctor-active-tabs-profile"
                      : "   pointer   not-active doctor-inactive-tabs "
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
        </div>
        {sendMessageModal && (
          <SendMessagemodal
            show={sendMessageModal}
            onHide={() => setSendMessageModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default DoctorDetails;
