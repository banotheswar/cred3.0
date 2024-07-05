import React, { useEffect, useState } from "react";
import { SharedServices, getList } from "../../../api_services/SharedServices";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaArrowsRotate, FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import SmallTable from "../../../share_components/SmallTable";

import {
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { urls } from "../../../api_services/url";

const Dashboard = () => {
  const { state } = SharedServices({});
  const navigate = useNavigate();
  const [facilityList, setfacilityList] = useState();
  const { headerlink } = UseFormValidations({});
  const [locationsList, setLocationsList] = useState();
  const { providerId } = useParams();
  console.log(facilityList,"facilityListfacilityListfacilityList")
  const getLocyionsList = async () => {
    let jsonObjects = { userId: sessionStorage?.getItem("userId") };
    let res = await getList(urls?.doctor?.getLocationsById, { jsonObjects });
    setLocationsList(res);
  };

  const getFacilityList = async () => {
    let jsonObjects = { userId: sessionStorage?.getItem("userId") };
    let res = await getList(urls?.providerDashboard?.getFacilityList, {
      jsonObjects,
    });
    setfacilityList(res);
  };

  useEffect(() => {
    getLocyionsList();
  }, [providerId]);
  useEffect(() => {
    headerlink([
      {
        name: "Dashboard",
        link: "/outpatientpro/provider/dashboard",
        active: true,
      },
    ]);
  }, []);
  useEffect(() => {
    getFacilityList();
  }, [sessionStorage?.getItem("userId")]);

  const circledata1 = [
    { number: "30", name: "Facility Requests" },
    { number: "52", name: "Credentials" },
    { number: "8", name: "Health Documents" },
    { number: "42", name: "Signature Request" },
    { number: "28", name: "Messages  From Facility" },
    { number: "80", name: "Application In Progress" },
  ];
  const circledata = [
    {
      name: "AM",
      fullname: "Acme Medical Center",
      icon: <IoIosCheckmarkCircle />,
      iconName: "Privileged",
    },
    {
      name: "CS",
      fullname: "California Medical Group",
      icon: <IoIosCheckmarkCircle />,
      iconName: "Privileged",
    },
    {
      name: "GM",
      fullname: "Ghozland Surgery Center",
      icon: <FaArrowsRotate />,
      iconName: "Initial Appointment Application (37%)",
      items: "5 items",
      icon2: <FaTriangleExclamation />,
    },
    {
      name: "IH",
      fullname: "Irvine Health Partners",
      icon: <IoIosCheckmarkCircle />,
      iconName: "Privileged",
    },
    {
      name: "HB",
      fullname: "Huntington Beach Medical Partners",
      icon: <IoIosCheckmarkCircle />,
      iconName: "Privileged",
    },
    {
      name: "OC",
      fullname: "Orange County Surgical",
      icon: <FaArrowsRotate />,
      iconName: "Reappointment Application (37%)",
      items: "2 items",
      icon2: <FaTriangleExclamation />,
    },
  ];

  const handleButtonClick = () => {
    console.log("Button clicked");
  };
  function greet(name) {
    alert(`hello, ${name}`);
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          className="link-hover-line text-wrap"
          title={row?.Action}
          // onClick={() =>
          //   navigate("/outpatientpro/facility/activitylogs/activitydetail")
          // }
          onClick={() =>
            navigate("/outpatientpro/provider/facility/facilityprofile")
          }
        >
          {row?.Action}
        </div>
      ),
    },
    {
      name: "Facility",
      selector: (row) => <div className="text-wrap">{row?.FacilityUser}</div>,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          title={row?.status}
          className={
            ((row?.status == "Application Sent" || row?.status == "Expired ") &&
              " pointer applicationSent   text-center ") ||
            (row?.status == "Expired" && "expired    text-center pointer") ||
            (row?.status == "Complete" &&
              "privileged    text-center pointer") ||
            (row?.status == "Archived" && "archived    text-center pointer") ||
            (row?.status == "Expiring(33 days)" &&
              "expiring    text-center pointer") ||
            (row?.status == "Board Review" &&
              "boardReview    text-center pointer")
          }
          style={{ width: "8rem" }}
        >
          {row?.status}
        </div>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <div
          className="button-secondary rounded py-1  text-center"
          style={{ width: "7rem" }}
        >
          Update
        </div>
      ),
    },
  ];
  const columns1 = [
    {
      name: "Facility ",
      selector: (row) => (
        <div
          className="text-wrap link-hover-line"
          title={row?.facilityName}
          onClick={() =>
            navigate(
              `/outpatientpro/provider/facility/facilityprofile/${sessionStorage?.getItem("userId")}/${row?.facilityId}/${row?.appointmentId}`
            )
          }
        >
          {row?.facilityName}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="text-wrap">{row?.appointmentType}</div>
      ),
    },
    {
      name: <div> Needs Attention </div>,
      selector: (row) => (
        <div className="text-wrap" title={row?.needAttention}>
          {row?.needAttention}
        </div>
      ),
    },
  ];
  const datakeys = [
    {
      Action: "ACLS Certification",
      Initiatedby: "Initial Appt (82%)",
      Provider: "James Wilson",
      FacilityUser: "California Medical Center",
      Time: "01-23-2024 4:15 pm",
      status: "Expired",
    },
    {
      Action: "CA State Medical License ",
      Initiatedby: "Privileged",
      Provider: "Elizabeth McDaniel",
      FacilityUser: "Ghozland Surgery & Health Partners",
      Time: "01-23-2024 4:15 pm",
      status: "Expiring(33 days)",
      action: "Review application",
    },

    {
      Action: "Board Certification",
      Initiatedby: "Privileged",
      Provider: "James Wilson",
      status: "Expiring(33 days)",
      FacilityUser: "  Huntington Beach Medical Partners",
      Time: "01-23-2024 4:15 pm",
    },

    {
      Action: "PALS",
      Initiatedby: "Privileged",
      Provider: "James Wilson",
      FacilityUser: "  Orange County Surgical",
      Time: "01-23-2024 4:15 pm",
      status: "Expiring(33 days)",
    },
    {
      Action: " Malpractice Insurance",
      Initiatedby: "Reappointment (9%)",
      Provider: "James Wilson",
      FacilityUser: "San Diego Health",
      Time: "01-23-2024 4:15 pm",
      status: "Expiring(33 days)",
    },
  ];

  return (
    <>
      <div className="bg-white p-3">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="py-4 mobile-sub-header-font px-2">
            Needs Attention (240)
          </h6>
          <div className="col-auto">
            <button
              className="btn button-user p-2 f13 px-4 text-white"
              onClick={() =>
                navigate("/outpatientpro/provider/facility/allfacilitylist")
              }
            >
              View All
            </button>
          </div>
        </div>
        <div className="mt-4 row">
          {circledata1?.map((v) => (
            <div className="col-6 col-md-4 col-lg-2  d-flex justify-content-around">
              <div
                className="text-center"
                style={{ height: "193px", width: "193px", color: "#3A3952" }}
              >
                <CircularProgressbarWithChildren
                  value={v?.number}
                  strokeWidth={5}
                  styles={{
                    trail: { strokeWidth: 5 },
                    path: {
                      strokeWidth: 2,
                      strokeLinecap: "round",
                    },
                  }}
                >
                  <div className="circle-count">{v?.number}</div>
                  <div
                    className="text-wrap circle-text"
                    style={{ width: "110px" }}
                  >
                    {v?.name}
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-wrap mt-2">
        <div className=" col-lg-6 col-md-6 vh-auto">
          <div className="col-md-12 bg-white "  style={{height:"49vh"}}>
            <h6 className=" p-3 mobile-header-font">My Facilities</h6>
            <SmallTable columns={columns1} dataTable={locationsList} />
          </div>
        </div>
        <div className=" col-lg-6 col-md-6 mobile-margitop  vh-auto">
          <div className="col-md-12 bg-white  space-2">
            <h6 className=" p-3 mobile-header-font">Expiring Credentials</h6>

            {<SmallTable columns={columns} dataTable={datakeys} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
