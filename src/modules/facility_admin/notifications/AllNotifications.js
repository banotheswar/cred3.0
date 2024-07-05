import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiThumbUp } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { BiPlusMedical } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { BsShieldFillPlus } from "react-icons/bs";
import NotiFilterList from "./NotiFilterList";
import message from "../../../assets/images/notification-message.svg";
import application from "../../../assets/images/notification-application.svg";
import health from "../../../assets/images/notification-health doc.svg";
import cred from "../../../assets/images/notification-credential.svg"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ReactTableTwo from "../../../share_components/ReactTableTwo";
import FilterList from "../doctors/FilterList";
import { ListOfCards } from "../../../share_components/ListOfCards";

const AllNotifications = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { headerlink } = UseFormValidations({});
  const [active, setActive] = useState("All Notifications");
  const [arrow,setArrow] = useState(false)
  console?.log(arrow,"arrow")
  const filtertabs = [
    { name: "All Notifications" },
    { name: "Application" },
    { name: "Appointment" },
    { name: "Credential" },
    { name: "Health Document" },
    { name: "Message" },

    ,
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    headerlink([
      {
        name: "Notifications",
        link: "/outpatientpro/facility/facilitynotifications",
        active: true,
      },
    ]);
  }, []);
  // HiThumbUp IoMail BiPlusMedical CgNotes BsShieldFillPlus
  const columns = [

    // {
    //   name: "Type",
      
    //   selector: (row) => (
    //     <div>
    //       <div title={`${row?.type !== "" ? `Name: ${row?.type}` : ""}`} >
    //         <span className="mr-2  " style={{ marginRight: "4px",}}>
    //           {(row?.type == "Appointment" && (
    //             <HiThumbUp color="rgb(127 184 246)" size={18} />
    //           )) ||
    //             (row?.type == "Message" && (
    //               <IoMail color="rgb(127 184 246)" size={18} />
    //             )) ||
    //             (row?.type == "Health Document" && (
    //               <BiPlusMedical color="rgb(127 184 246)" size={18} />
    //             )) ||
    //             (row?.type == "Credential" && (
    //               <BsShieldFillPlus color="rgb(127 184 246)" size={18} />
    //             )) ||
    //             (row?.type == "Application" && (
    //               <CgNotes color="rgb(127 184 246)" size={18} />
    //             ))}
    //         </span>{" "}
    //         <span className="link-hover-line ">{row?.type}</span>
    //       </div>
    //     </div>
    //   ),
    //   sortable: true,
   
    // },
    {
      name: "Type",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div style={{ marginRight: "4px"}}>
            {(row?.type == "Appointment" && (
              <HiThumbUp color="rgb(127 184 246)" size={18} />
            )) ||
              (row?.type == "Message" && (
                <img
                src={message}
                alt="cred"
                style={{
                  objectFit: "fill",
                  height: "17px",
                  width: "16px",
                }}
              />
              )) ||
              (row?.type == "Health Document" && (
                <img
                src={health}
                alt="cred"
                style={{
                  objectFit: "fill",
                  height: "17px",
                  width: "16px",
                }}
              />
              )) ||
              (row?.type == "Credential" && (
                <img
                src={cred}
                alt="cred"
                style={{
                  objectFit: "fill",
                  height: "17px",
                  width: "16px",
                }}
              />
              )) ||
              (row?.type == "Application" && (
                <img
                src={application}
                alt="cred"
                style={{
                  objectFit: "fill",
                  height: "17px",
                  width: "16px",
                }}
              />
              ))}
          </div>
          <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "4px" }}>
            <div className="link-hover-line" style={{ height: "100%", display: "flex", alignItems: "center" }}>{row?.type}</div>
          </div>
        </div>
      ),
      sortable: true,
    }
    ,
    
    
    

    {
      name: "Message",
      selector: (row) => (
        <div className="pointer" title={row?.details}>
          {row?.details}
        </div>
      ),
      sortable: true,
      width: "33rem",
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          title={row?.status}
          className={
            ((row?.status == "Application Sent" ||
              row?.status == "Applying (88%)") &&
              " pointer applicationSent   text-center ") ||
            (row?.status == "Expired" && "expired    text-center pointer") ||
            (row?.status == "Privileged" &&
              "privileged    text-center pointer") ||
            (row?.status == "Archived" && "archived    text-center pointer") ||
            (row?.status == "Expiring (33 days)" &&
              "expiring    text-center pointer") ||
            (row?.status == "Board Review" &&
              "boardReview    text-center pointer")
          }
          style={{ width: "136px" }}
        >
          {row?.status}
        </div>
      ),
      sortable: true,
      width: "11rem",
    },
    {
      name: "Provider Name",
      selector: (row) => (
        <div className="pointer" title={row?.provider}>
          {row?.provider}
        </div>
      ),
      sortable: true,
      width: "10rem",
    },

    {
      name: "Provider Type",
      selector: (row) =><div title={row?.providerType}>{row?.providerType}</div> ,
      sortable: true,
      width: "9.4rem",
    },

    {
      name: "Time",
      selector: (row) => <div title={row?.datetime}>{row?.datetime}</div>,

      sortable: true,
    },
  ];
  const datakeys = [
    {
      type: "Credential",
      details: "ALCS is expiring in 32 days",
      provider: "James A. Wilson",
      providerType: "Doctor",
      datetime: "Feb 9, 2024, 14:32",
      status: "Expiring (33 days)",
    },
    {
      type: "Message",
      details: "Board Certification is expired",
      provider: "Elizabeth McDaniel",
      providerType: "Doctor",
      datetime: "Feb 9, 2024, 14:32",
      status: "Expired",
    },

    {
      type: "Appointment",
      details: "Appointment is expiring in 33 days",
      provider: "Victoria Puyat",
      providerType: "Allied Health ",
      datetime: "Feb 9, 2024, 14:32",
      status: "Application Sent",
    },

    {
      type: "Application",
      details: "Initial appointment application packet has been sent",
      provider: "David Polcaro",
      providerType: "Doctor",
      datetime: "Feb 9, 2024, 14:32",
      status: "Privileged",
    },

    {
      type: "Health Document",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Board Review",
    },
    {
      type: "Appointment",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Applying (88%)",
    },
    {
      type: "Appointment",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Board Review",
    },
    {
      type: "Appointment",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Applying (88%)",
    },
    {
      type: "Health Document",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Board Review",
    },
    {
      type: "Appointment",
      details: "Privileges have been logged",
      provider: "Douglas Pina",
      providerType: "Allied Health",
      datetime: "Feb 9, 2024, 14:32",
      status: "Applying (88%)",
    },
  ];

  const filterSearch = () => {
    return (
      <>
        <div className="password-container ">
          <input
            type="search"
            placeholder="Search by Name or NPI #..."
            className="header-search search-input  search-control bg-white"
            name="password"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon ">
            {<MdSearch size={20} color="#878793" />}
          </span>
        </div>
      </>
    );
  };
  return (
    <>
       <div className="show_header"> <ListOfCards array={datakeys} tabs={filtertabs} title={"Notifications"} name={"Notifications"}/></div>

      <div className="bg-white  mobile_Header">
        
        <div className="row px-3 " style={{ paddingTop: "32px" }}>
          <div className="col-xl-9  col-md-7">
            <div className="px-3 f30 medium ">Notifications</div>
          </div>
          <div className="col-xl-3 col-md-4 px-4 ">{filterSearch()}</div>
        </div>
        <div className="row px-4" style={{ paddingTop: "32px" }}>
          <div className="col-md-9  d-flex pt-1">
            <div className="d-flex  col-md-12 px-2" style={{ overflow: "scroll" }}>
              {filtertabs?.map((v) => {
                return (
                  <>
                    <div
                      className={
                        active == v?.name
                          ? " text-center filter-tabactive col-auto f14 px-3 mx-1"
                          : "text-center filter-tab f14 col-auto px-3  mx-1"
                      }
                      onClick={() => setActive(v?.name)}
                    >
                      {v?.name}
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="col-md-3 d-flex doc-list-more">
            <div className="col-md-6 ">
       
                 <div
                className={`${
                  isOpen
                    ? "border rounded py-2  text-white d-flex justify-content-center pointer f16 medium"
                    : "py-2  morefiltertext d-flex justify-content-center pointer f16 medium"
                } `}
                style={{ background: isOpen && "#575777" }}
                onClick={toggleDropdown}
              >
                <BsFilterLeft
                  color={isOpen ? "#FFFFFF" : "#575777"}
                  size={24}
                  className="  "
                />
                <span className="px-1">More Filters</span>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div
                className="col-md-6 d-flex justify-content-around  py-2 f16 medium doc-list-dd-text"
                style={{ color: "#3A3952" }}
              >
                Show
              </div>
              <div className="col-md-6 ">
                <select
                  className="form-select  m-0 noti-list-tab-dd"
                  style={{
                    height: "35px",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                  }}
                >
                  <option>15</option>
                  <option>14</option>
                  <option>13</option>
                  <option>12</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "auto",
            overflow: "scroll",
            paddingTop: "25px",
            paddingLeft: "23px",
            paddingRight:"17px"
          }}
        >
          <ReactTableTwo
            dataTable={datakeys}
            columns={columns}
            tableCss={{ min: "55px", max: "55px" }}
          />

            {isOpen && <NotiFilterList openModel={toggleDropdown} />}
        </div>
        <div className="py-4 row">
          <div
            className="col-md-8 buttont f14  "
            style={{ paddingLeft: "34px" }}
          >
            Showing 1 to 15 of 98 entries
          </div>
          <div className=" col-md-4 " > 
            <div className="col d-flex justify-content-end text-center gap-2 " style={{marginRight:"15.81px"}}>
              <div className=" buttonp d-flex  align-items-center justify-content-center ">
                {<IoIosArrowBack />}
              </div>
              <div className="buttonps d-flex  align-items-center justify-content-center">
                1
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                2
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                3
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                {<IoIosArrowForward />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllNotifications;
