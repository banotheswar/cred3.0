import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import ProfileTable from "../../../share_components/ProfileTable";
import SmallTable from "../../../share_components/SmallTable";
const Dashboard = () => {
  const navigate = useNavigate();
  const circledata = [
    { number: "19", name: "Appointments" },
    { number: "21", name: "Health Documents" },
    { number: "33", name: "Credentials" },
  ];
  const circledata1 = [
    { number: "7", name: "Appointments" },
    { number: "16", name: "Health Documents" },
    { number: "22", name: "Credentials" },
  ];
  const datakeys = [
    {
      name: "James A. Wilson",
      type: "General",
      status: "82",
      date: "02/10/2024",
    },
    {
      name: "Elizabeth McDaniel",
      type: "Orthopedic",
      status: "11",
      date: "02/10/2024",
    },
    {
      name: "Michael Richardson",
      type: "Pain",
      status: "34",
      date: "02/10/2024",
    },
    {
      name: "Melanie Williams",
      type: "Orthopedic",
      status: "50",
      date: "02/10/2024",
    },
    {
      name: "Nathalie Owen",
      type: "Pain",
      status: "63",
      date: "02/10/2024",
    },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => <div className="text-wrap">{row?.name}</div>,
    },

    {
      name: "Type",
      selector: (row) => (
        <div className="pointer" title={row?.type}>
          {row?.type}
        </div>
      ),
    },

    {
      name: "Status",
      selector: (row) => (
        // <div className="pointer" title={row?.status}>
        //   {row?.status}
        // </div>

        <div className="">
          <div className="">
            <span className="bar-number">{row?.status}%</span>
          </div>
          <ProgressBar
            // now={65}
            now={(row?.status / 100) * 100}
            className="  custom-progress-bar-5"
            style={{
              borderRadius: "0",
              backgroundColor: "rgba(178, 178, 178,0.6)",
              height: "4px",
              width:"100px",
            }}
            value={100}
          />
        </div>
      ),
    },
  ];
  const datakeys1 = [
    {
      name: "Wendy Riccardo",
      type: "Surgical Assistant",
      status: "48",
      date: "02/10/2024",
    },
    {
      name: "Michael O’Reilly",
      type: "Physician Assistant",
      status: "31",
      date: "02/10/2024",
    },
    {
      name: "Lauren Kurtzman",
      type: "Surgical Assistant",
      status: "51",
      date: "02/10/2024",
    },
    {
      name: "Monica PIna",
      type: "Surgical Assistant",
      status: "14",
      date: "02/10/2024",
    },
    {
      name: "Mitch Michaels",
      type: "Physician Assistant",
      status: "92",
      date: "02/10/2024",
    },
  ];
  const { headerlink } = UseFormValidations({});
  useEffect(() => {
    headerlink([
      {
        name: "My Dashboard",
        link: "/outpatientpro/facility/dashboard",
        active: true,
      },
    ]);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        <div className=" col-lg-6 col-md-6 ">
          <div className="col-md-12 bg-white">
            <div
              className=" d-flex contain-height-mobile justify-content-between align-items-center "
              style={{ height: "99px" }}
            >
              <div className="main-dashboard-text px-3     mobile-margin-top">
                Doctors
              </div>
              <div className="col-auto py-4 mobile-margin-top  px-3">
                <div
                  className="btn bg-primary f13 text-white  d-flex justify-content-center align-items-center  rounded "
                  onClick={() => navigate("/outpatientpro/facility/doctors")}
                >
                  View All
                </div>
              </div>
            </div>
            <hr className="p-0 m-0" />
            <div className="d-flex flex-wrap justify-content-between align-items-center  py-3">
              <div className="col-md-6 col-sm-6  d-flex align-items-center dashboard-headings px-3">
                Expiring Soon
              </div>
              <div className="col-md-6  d-flex justify-content-end gap-3 align-items-center px-3 ">
                <div className="label">View</div>
                <div className="">
                  <select
                    className="form-select-dash   label f13 rounded  "
                    style={{
                      height: "40px",
                      width: "123px",
                      backgroundColor: "#F7F7F7",
                      border: "1px solid #DADADA",
                    }}
                    name="state1"
                  >
                    <option value="">Last 7 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 1 Month</option>
                    <option>Last 4 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 1 Year</option>
                  </select>
                </div>
              </div>
              <div className=" margin-top-mobile" style={{ marginTop: "54.63px" }}>
                <div
                  className="row  px-3 "
                  style={{ marginLeft: "-0.68rem" }}
                >
                  {circledata?.map((v, index) => {
                    return (
                      <div
                        key={index}
                        className="col d-flex   justify-content-around  mobile-circle-gap"
                      >
                        <div
                          className="mobile-circle tab-view-circle"
                          style={{
                            // height: "95%",
                            // width: "95%",
                            color: "#3A3952",
                          }}
                        >
                          <CircularProgressbarWithChildren
                            value={v?.number}
                            strokeWidth={5}
                            styles={{
                              trail: { strokeWidth: 5 },
                              path: {
                                strokeWidth: 2,
                                strokeLinecap: "butt",
                              },
                            }}
                          >
                            <div className="circle-count">{v?.number}</div>
                            <div className="circle-text">{v?.name}</div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
            </div>
            <div className=" px-4 pt-3 margin-top-mobile-snapshot ">
                <div className="dashboard-headings ">Snapshot</div>
                <div className=" mt-3 pt-3 ms-1">
                  <div className=" ">
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar">Privileged</div>
                      <div
                        className="linebar-number "
                        style={{ color: "#00B948" }}
                      >
                        101
                      </div>
                    </div>
                    <ProgressBar
                      now={60}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className="w-full custom-progress-bar-1"
                      value={101}
                    />
                  </div>
                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">
                        Application In Progress
                      </div>
                      <div
                        className="linebar-number "
                        style={{ color: "#0073EE" }}
                      >
                        15
                      </div>
                    </div>
                    <ProgressBar
                      now={15}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className="w-full custom-progress-bar-2"
                      value={15}
                    />
                  </div>
                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">Archived</div>
                      <div
                        className="linebar-number "
                        style={{ color: "#707070" }}
                      >
                        6
                      </div>
                    </div>
                    <ProgressBar
                      now={6}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className="w-full custom-progress-bar-3"
                      value={6}
                    />
                  </div>
                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">Needs Attention</div>
                      <div
                        className="linebar-number "
                        style={{ color: "#D4352F" }}
                      >
                        31
                      </div>
                    </div>
                    <ProgressBar
                      now={31}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className=" custom-progress-bar-4"
                      value={31}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 mt-5 pt-4 ">
                <div className="dashboard-headings">Recent Applications</div>
                <div className="col mt-4 pt-2 mobile_Header">
                  <div
                    className="d-flex  ms-1 gap_mobile "
                    style={{ height: "34.82px" }}
                  >
                    <div
                      className="col-md-3 col-sm-4 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Name
                    </div>
                    <div
                      className="col-md-4 col-sm-4 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Specialty
                    </div>
                    <div
                      className="col-md-4 col-sm-4 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Progress
                    </div>
                  </div>
                </div>
                <div className="col px-1 mobile_Header">
                  {datakeys?.map((v, i) => {
                    return (
                      <div
                        className="d-flex   border-top-bottom gap_mobile1 "
                        style={{ paddingBottom: "6px", paddingTop: "12px" }}
                      >
                        <div
                          className="col-md-3 col-sm-4 link-hover-line f15 "
                          style={{ color: "#0073EE" }}
                          onClick={
                            sessionStorage?.getItem("roleId") != 1
                              ? () =>
                                  navigate(
                                    "/outpatientpro/facility/dashboard/applicationinprogress"
                                  )
                              : () =>
                                  navigate(
                                    "/outpatientpro/admin/dashboard/applicationinprogress"
                                  )
                          }
                        >
                          {v?.name}
                        </div>
                        <div
                          className="col-md-4 col-sm-4 f15"
                          style={{ color: "#3A3952" }}
                        >
                          {v?.type}
                        </div>
                        <div className="col-md-5 col-sm-4">
                          <div className="">
                            <div className="">
                              <span className="bar-number">{v?.status}%</span>
                            </div>
                            <ProgressBar
                              // now={65}
                              now={(v?.status / 100) * 100}
                              className="  custom-progress-bar-5"
                              style={{
                                borderRadius: "0",
                                backgroundColor: "rgba(178, 178, 178,0.6)",
                                height: "4px",
                              }}
                              value={100}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="show_header mt-3 " >
                  {" "}
                  <SmallTable dataTable={datakeys} columns={columns} />
                </div>

                <div className="col-auto py-4 mt-1">
                  <div
                    className="btn bg-primary f13 text-white "
                    onClick={() =>
                      navigate("/outpatientpro/facility/alliedHealth")
                    }
                  >
                    View All
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className=" col-lg-6 col-md-6 mobile-margitop">
          <div className="col-md-12 bg-white  space-2">
            <div
              className=" d-flex contain-height-mobile justify-content-between align-items-center"
              style={{ height: "99px" }}
            >
              <div className="main-dashboard-text px-3     mobile-margin-top">
                Allied Health Professionals
              </div>
              <div className="col-auto py-4 mobile-margin-top  px-3">
                <div
                  className="btn bg-primary f13 text-white  d-flex justify-content-center align-items-center  rounded "
                  onClick={() => navigate("/outpatientpro/facility/doctors")}
                >
                  View All
                </div>
              </div>
            </div>
            <hr className="p-0 m-0" />
            <div className="d-flex flex-wrap justify-content-between align-items-center  py-3">
              <div className="col-md-6 col-sm-6  d-flex align-items-center dashboard-headings px-3">
                Expiring Soon
              </div>
              <div className="col-md-6  d-flex justify-content-end gap-3 align-items-center px-3 ">
                <div className="label">View</div>
                <div className="">
                  <select
                    className="form-select-dash border  label f13 rounded  "
                    style={{
                      height: "40px",
                      width: "123px",
                      backgroundColor: "#F7F7F7",
                    }}
                    name="state1"
                  >
                    <option value="">Last 7 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 1 Month</option>
                    <option>Last 4 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 1 Year</option>
                  </select>
                </div>
              </div>
             
              <div className="margin-top-mobile " style={{ marginTop: "54.63px" }}>
                <div className="row px-3 " style={{ marginLeft: "-0.68rem" }}>
                  {circledata1?.map((v, index) => {
                    return (
                      <div
                        key={index}
                        className="col d-flex   justify-content-around  mobile-circle-gap"
                      >
                        <div
                          className="mobile-circle tab-view-circle  "
                          // style={{
                          //   height: "95%",
                          //   width: "95%",
                          //   color: "#3A3952",
                          // }}
                        >
                          <CircularProgressbarWithChildren
                            value={v?.number}
                            strokeWidth={5}
                            styles={{
                              trail: { strokeWidth: 5 },
                              path: {
                                strokeWidth: 2,
                                strokeLinecap: "butt",
                              },
                            }}
                          >
                            <div className="circle-count">{v?.number}</div>
                            <div className="circle-text">{v?.name}</div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            


              </div>
              <div className=" px-4 margin-top-mobile-snapshot pt-3 ">
                <div className="dashboard-headings ">Snapshot</div>
                <div className=" mt-4 pt-2 ms-1">
                  <div className="d-flex justify-content-between">
                    <div className="label-linebar">Privileged</div>
                    <div
                      className="linebar-number "
                      style={{ color: "#00B948" }}
                    >
                      32
                    </div>
                  </div>
                  <ProgressBar
                    now={80}
                    style={{
                      borderRadius: "0",
                      backgroundColor: "rgba(178, 178, 178,0.4)",
                    }}
                    className="w-full custom-progress-bar-1"
                    value={101}
                  />

                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">
                        Application In Progress
                      </div>
                      <div
                        className="linebar-number "
                        style={{ color: "#0073EE" }}
                      >
                        8
                      </div>
                    </div>
                    <ProgressBar
                      now={40}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className="w-full custom-progress-bar-2"
                      value={8}
                    />
                  </div>
                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">Archived</div>
                      <div
                        className="linebar-number "
                        style={{ color: "#707070" }}
                      >
                        11
                      </div>
                    </div>
                    <ProgressBar
                      now={60}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className="w-full custom-progress-bar-3"
                      value={6}
                    />
                  </div>
                  <div className="" style={{ paddingTop: "30px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="label-linebar ">Needs Attention</div>
                      <div
                        className="linebar-number "
                        style={{ color: "#D4352F" }}
                      >
                        28
                      </div>
                    </div>
                    <ProgressBar
                      now={78}
                      style={{
                        borderRadius: "0",
                        backgroundColor: "rgba(178, 178, 178,0.4)",
                      }}
                      className=" custom-progress-bar-4"
                      value={31}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 mt-5 pt-4 ">
                <div className="dashboard-headings ">Recent Applications</div>
                <div className="col mobile_Header" style={{ paddingTop: "33px" }}>
                  <div className="d-flex ms-1 " style={{ height: "34.82px" }}>
                    <div
                      className="col-md-3 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Name
                    </div>
                    <div
                      className="col-md-4 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Specialty
                    </div>
                    <div
                      className="col-md-4 f16 medium"
                      style={{ color: "#3A3952" }}
                    >
                      Progress
                    </div>
                  </div>
                </div>
                <div className="col px-1 mobile_Header">
                  {datakeys1?.map((v, i) => {
                    return (
                      <div
                        className="d-flex   border-top-bottom "
                        style={{ paddingBottom: "6px", paddingTop: "12px" }}
                      >
                        <div
                          className="col-md-3 link-hover-line f15"
                          style={{ color: "#0073EE" }}
                          onClick={
                            sessionStorage?.getItem("roleId") != 1
                              ? () =>
                                  navigate(
                                    "/outpatientpro/facility/dashboard/applicationinprogress"
                                  )
                              : () =>
                                  navigate(
                                    "/outpatientpro/admin/dashboard/applicationinprogress"
                                  )
                          }
                        >
                          {v?.name}
                        </div>
                        <div
                          className="col-md-4 f15"
                          style={{ color: "#3A3952" }}
                        >
                          {v?.type}
                        </div>
                        <div className="col-md-5">
                          <div className="">
                            <div className="">
                              <span className="bar-number ">{v?.status}%</span>
                            </div>
                            <ProgressBar
                              // now={65}
                              now={(v?.status / 100) * 100}
                              className="  custom-progress-bar-5"
                              style={{
                                borderRadius: "0",
                                height: "4px",
                                backgroundColor: "rgba(178, 178, 178,0.6)",
                              }}
                              value={100}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="show_header mt-3" >
                  
                  <SmallTable dataTable={datakeys} columns={columns} />
                </div>
                <div className=" py-4 " style={{ marginTop: "3.5px" }}>
                  <div
                    className="btn bg-primary f13 text-white  "
                    onClick={() =>
                      navigate("/outpatientpro/facility/alliedHealth")
                    }
                  >
                    View All
                  </div>
                </div>
              </div>
           
          </div>
        </div>



      </div>
    </>
  );
};
export default Dashboard;
