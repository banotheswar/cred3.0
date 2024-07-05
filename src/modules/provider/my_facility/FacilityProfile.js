import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiSolidPencil, BiSolidSend } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ProfileTable from "../../../share_components/ProfileTable";
import checkmark from "../../../assets/images/checkmark light green.svg";
import expireicon from "../../../assets/images/expiring 1.svg";
import reapp from "../../../assets/images/in progress light blue.svg";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import FacilityDetailsMobile from "../../../MobileComponents/FacilityDetailsMobile";
import { PiNoteFill, PiUserFill } from "react-icons/pi";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import moment from "moment";
import { ProviderFromObj } from "../../../redux/Action";
import { useDispatch } from "react-redux";

const FacilityProfile = () => {
  
  const navigate = useNavigate();
  const { headerlink } = UseFormValidations({});
  const { providerId,facilityId,appId } = useParams();
  const [appointmentsList, setAppointmentsList] = useState();
  const [locationsList, setLocationsList] = useState();
  const [message, setGetMessage] = useState([]);
  const [facilityList, setfacilityList] = useState([]);
  console.log(appointmentsList&&appointmentsList[0]?.appointmentId,"facilityListfacilityListfacilityList")

  const dispatch=useDispatch()


  const getLocyionsList = async () => {
    let jsonObjects = { userId: providerId };
    let res = await getList(urls?.doctor?.getLocationsById, { jsonObjects });
    setLocationsList(res);
  };

  const getAppointmentsList = async () => {
    let jsonObjects = { userId: providerId ,facilityId:facilityId};
    let res = await getList(urls?.Appointments?.getAllAppointment, {
      jsonObjects,
    });
    setAppointmentsList(res);
  };



  const getMessageList = async () => {
    let jsonObjects = {
      sentTo: providerId,
    };
    
      let res = await getList(urls?.sendMessage?.getMessage, { jsonObjects });
      if (res && Array.isArray(res)) {
      
        const recentMessages = res.slice(0, 5);
        setGetMessage(recentMessages);
      
      }

  };

  const getFacilityList = async () => {
    let jsonObjects = { userId: sessionStorage?.getItem("userId") };
    let res = await getList(urls?.providerDashboard?.getFacilityList, {
      jsonObjects,
    });
    setfacilityList(res);
  };
  useEffect(() => {
    getFacilityList();
  }, [sessionStorage?.getItem("userId")]);

  useEffect(() => {
    getMessageList();
  }, []);


  useEffect(() => {
    headerlink([
      {
        name: "Facilities",
        link: "/outpatientpro/provider/facility/allfacilitylist",
      },
      {
        name: "Facility Profile",
        link: "/outpatientpro/provider/facility/facilityprofile",
        active: true,
      },
    ]);
  }, []);

  useEffect(() => {
    getLocyionsList();
    getAppointmentsList();
  }, [providerId]);

  const gotoForms = (user_Id,f_Id,App_Id,row) => {
    dispatch(ProviderFromObj(row))
    
    return navigate(`/outpatientpro/provider/facility/facilityprofile/${user_Id}/${f_Id}/${App_Id}/applicationinprogress`);
    
  };
  const gotoFormsTwo = (roleId) => {
    switch (roleId) {
      case "1":
        return `/outpatientpro/admin/doctors/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;
      case "2":
        return `/outpatientpro/enterprise/doctors/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;
      case "4":
        return `/outpatientpro/facility/doctors/details/${providerId}/${facilityId}/${appId}/applicationinprogress`;
      case "5":
        return `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}/applicationinprogress`;
        case "6":
          return `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}/applicationinprogress`;
        case "7":
          return `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${appId}/applicationinprogress`;
      default:
        return "";
    }
  };

  const columns = [
    {
      name: "Item Name",
      selector: (row) => (
        <div>
          <div
          onClick={()=>gotoForms(row?.userId,row?.facilityId,row?.appointmentId,row)}
            className="link-hover"
            title={`${row?.formName !== "" ? `Name: ${row?.formName}` : ""}`}
          >
           <div className="pointer" title={row?.formName}>{row?.formName}</div>
          </div>
        </div>
      ),
      width:"12rem"
     
    },

    {
      name: "Type",
      selector: (row) => (
        <div className="pointer" title={row?.type}>
          {row?.type}
        </div>
      ),
      width:"12rem"
    },

    {
      name: "Message/Status",
      selector: (row) => (
        <div className="pointer" title={row?.message}>
          {row?.message}
        </div>
      ),
    width:"25rem"
    },

    {
      name: "Date Sent",
      selector: (row) =><div>{moment(row?.createDate)?.format("MM/DD/YYYY ")}</div>,
      width:"9.5rem"
    },

    {
      name: "Action",
      selector: (row) => <div className="button-secondary rounded py-1 p-1  text-center"
  
       >
      
     Complete
        </div>,
      

      
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <div
    //       title={row?.status}
    //       className={
    //         ((row?.status == "Application Sent" ||
    //           row?.status == "Applying(88%)") &&
    //           " pointer applicationSent   text-center ") ||
    //         (row?.status == "Expired" && "expired    text-center pointer") ||
    //         (row?.status == "Privileged" &&
    //           "privileged    text-center pointer") ||
    //         (row?.status == "Archived" &&
    //           "archived    text-center pointer") ||
    //         (row?.status == "Expiring(33 days)" &&
    //           "expiring    text-center pointer") ||
    //         (row?.status == "Board Review" &&
    //           "boardReview    text-center pointer")
    //       }
    //       style={{ width: "7rem" }}
    //     >
    //       {row?.status}
    //     </div>
    //   ),
    //   sortable: true,
    // },
  ];

  const columnsTwo = [
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
            )}
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
                    ? navigate(`/outpatientpro/enterprise/provider/details/${providerId}/applicationinprogress`)
                    : navigate(
                        `/outpatientpro/provider/facility/facilityprofile/${providerId}/${facilityId}/${row?.appointmentId}/applicationinprogress`
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


  const columnsThree = [
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
     
    },

    {
      name: "Address",
      selector: (row) => (
        <div className="pointer" title={row?.Address}>
          {row?.address}
        </div>
      ),
     
    },

    {
      name: "City",
      selector: (row) => (
        <div className="pointer" title={row?.city}>
          {row?.city}
        </div>
      ),
     
    },

    {
      name: "State",
      selector: (row) => row?.state,
     
    },

    {
      name: "Zip",
      selector: (row) => <div>{row?.zipcode}</div>,
     
    },
  ];

  return (
    <>

    <div className="show_header"> <FacilityDetailsMobile message={message}  gotoForms={gotoFormsTwo}   appointmentsList={appointmentsList}
          locationsList={locationsList}
          providerId={providerId}
         /></div>
   <div className="mobile_Header">


   <div className="row ">
      <div className="d-flex   gap-2">
      <div className="  bg-white p-3 container-width3 vh-100 ">
        
            <div
              className="border  rounded    pt-4 py-2  border-0 mt-5 d-flex flex-column align-items-center "
              style={{
                background: " rgba(236, 236, 236, 0.45)",
                minHeight: "168px",
              }}
            >
              <div
              
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
             {appointmentsList&&appointmentsList[0]?.facilityName}
              </div>
              <p className="doctor-profile-desig">
                {/* {doctordtails?.roleName} */}
                </p>
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                <div
                  className="rounded button-user-profile-1 px-3 p-2 d-flex justify-content-center align-items-center"
                  style={{ opacity: "0.6" }}
                >
                  <PiUserFill
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
                  // onClick={() => setSendMessageModal({ formName: "Profile" })}
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

          <div className="row px-3 pt-4">
            <label>Status</label>
            <div className="label">{appointmentsList&&appointmentsList[0]?.appointmentStatus}</div>
          </div>
          <div className="row gap-2 px-3 pt-4">
            <div>
             
              <label className="">Appointment Date</label>
              <div className="label">Feb 21, 2022</div>
            </div>
            <div className="mt-3">
              {" "}
              <label>Appointment Expires</label>
              <div className="label">Feb 21, 2024 (12 days)</div>
            </div>
            <div className="mt-3">
              <label>Reappointment Application</label>
              <div className="label">In Progress (37%)</div>
            </div>

            <div className="col-auto mt-3">
              <button className="f13 border p-2 px-4 text-white rounded"
              style={{background:"#0073EE"}}
              //  onClick={()=>navigate("/outpatientpro/provider/facility/facilityprofile/applicationinprogress")}
              onClick={
                () => navigate(gotoFormsTwo(sessionStorage?.getItem("roleId")))
                // navigate(`/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`)
              }
               >
                Continue Application
              </button>
            </div>
          </div>
        </div>

        <div className="container-width9 ">
          <div className="bg-white  p-3  ">
           

            <div>
         
          
            <div className="doctor-table-headings mt-2">Items Needing Attention </div>
       
          <div className="mt-4"><ProfileTable dataTable={message} columns={columns} /></div>
            </div>

            <div>
            <div className="doctor-table-headings mt-5">Appointment History</div>
              <div className="mt-4"><ProfileTable dataTable={appointmentsList} columns={columnsTwo} /></div>
            </div>

            <div>
        
              <div className="doctor-table-headings mt-5">Facilities</div>
            <div className="mt-4">  <ProfileTable dataTable={locationsList} columns={columnsThree} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
    </>
  );
};

export default FacilityProfile;
