import React, { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import crednoti from "../assets/images/notification-credential.svg";
import bell from "../assets/images/bell.svg";
import {  urls } from "../api_services/url";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiAdobecreativecloud } from "react-icons/si";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { getList } from "../api_services/SharedServices";
import moment from "moment";

const Header = ({ setNav, colapse, SideBarTabs, activeCss, label }) => {
  const navigate = useNavigate();
  const bread = useSelector((state) => state.breadcrumb);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOProfile, setDropdownProfile] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefProfile = useRef(null);
  const location = useLocation();
  const [message, setGetMessage] = useState([]);
  const [visibility, setVisibility] = useState([]);

  const getMessageList = async () => {
    let jsonObjects = {
      delegateId: sessionStorage.getItem("userId"),
      sentTo: sessionStorage?.getItem("userId"),
    };
    let res = await getList(urls?.sendMessage?.getMessage, { jsonObjects });
    setGetMessage(res);
    setVisibility(res.map(() => true));
  };

  useEffect(() => {
    getMessageList();
  }, []);

  const hideMessage = (index) => {
    setVisibility((prev) => prev.map((v, i) => (i === index ? false : v)));
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };


  const handleNavigation = () => {
    const roleId = sessionStorage.getItem("roleId");
    console.log("roleId:", roleId); 
    
    if (roleId === "7") {
      console.log("Navigating to /outpatientpro/delegate/alldelegatenotifications/");
      navigate("/outpatientpro/delegate/alldelegatenotifications/");
    } else if (roleId === "4") {
      console.log("Navigating to /outpatientpro/facility/facilitynotifications");
      navigate("/outpatientpro/facility/facilitynotifications");
    } else {
      console.log("No matching roleId found");
    }
  };
  


  useEffect(() => {
    setDropdownProfile(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutsideProfile(event) {
      if (
        dropdownRefProfile.current &&
        !dropdownRefProfile.current.contains(event.target)
      ) {
        setDropdownProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    };
  }, [dropdownRefProfile]);

  const toggleDropdownProfile = () => {
    setDropdownProfile(!dropdownOProfile);
  };

  const closeDropdownProfile = () => {
    setDropdownProfile(false);
  };

  return (
    <>
      <div
        className="d-flex flex-wrap bg-white"
        style={{
          height: "86px",
          borderTop: "1px solid #F0F0F7",
          borderBottom: "1px solid #F0F0F7",
        }}
      >
        <div className="col-md-8 d-flex flex-wrap">
          <div
            className="col-auto text-center d-flex align-items-center justify-content-center"
            onClick={setNav}
            style={{ width: "74px", backgroundColor: "#1A1A1F" }}
          >
            <SiAdobecreativecloud size={25} className="text-white pointer" />
          </div>
          <div className="px-4 ms-3 mx-1">
            <Breadcrumb data={bread} />
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <div className="col-md-auto px-4">
            {(sessionStorage?.getItem("roleId") == 4 
              // sessionStorage?.getItem("roleId") == 2
            ) 
              && (
              <div
                title="New Appointment"
                style={{ marginTop: "25px" }}
                className="new-app-btn px-3 p-2 py-2"
                onClick={() => navigate("/outpatientpro/facility/appointment")}
              >
                + New Appointment
              </div>
            )}
          </div>
  {(sessionStorage?.getItem("roleId") == 1
             
            ) 
              && (<div style={{ borderLeft: "2px solid #E8E8E8" }}></div>  )}
          {(sessionStorage?.getItem("roleId") != 1
             
            ) 
              && (
          <div
            className="col-md-auto px-3"
            style={{
              borderRight: "2px solid #E8E8E8",
              borderLeft: "2px solid #E8E8E8",
            }}
            
          >
            
            <Dropdown
              style={{ marginTop: "25px"}}
              show={dropdownOpen}
              onHide={closeDropdown}
              ref={dropdownRef}
           
            >
              <Dropdown.Toggle
                style={{ border: "none" }}
                variant="none"
                id="user-menu"
                onClick={toggleDropdown}
              >
                <img
                  src={bell}
                  title="Notifications"
                  alt="cred"
                  style={{
                    objectFit: "fill",
                    height: "24px",
                    width: "24px",
                    opacity: "0.6",
                    color: " #3A3952",
                  }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "450px" }}>
                <Dropdown.ItemText>
                  <div
                    style={{
                      background: "#F0F0F7 0% 0% no-repeat padding-box",
                    }}
                  >
                    <div className="row d-flex px-1 py-2 mt-notification-1 bg-white">
                      {message.slice(0, 3).map(
                        (v, i) =>
                          visibility[i] && (
                            <>
                              <div className="col-md-1  px-2  ">
                                <img
                                  src={crednoti}
                                  alt="cred"
                                  style={{
                                    objectFit: "fill",
                                    height: "20px",
                                    width: "18px",
                                  }}
                                />
                              </div>

                              <div
                                className="col-md-11"
                                style={{ borderLeft: "1px solid #ddd" }}
                                key={i}
                              >
                                <div className="d-flex align-items-between justify-content-between">
                                  <div className="fw-bolder">{v?.formName}</div>
                                  <HiOutlineXMark
                                    color="#BABABA"
                                    className="pointer"
                                    size={20}
                                    onClick={() => hideMessage(i)}
                                  />
                                </div>
                                <div>{v?.message}</div>
                                <label className="mb-2">
                                  {moment(v?.createDate).format("MM/DD/YYYY")}
                                </label>
                              </div>
                              <hr />
                            </>
                          )
                      )}
                    </div>
                    <div
                      className="row d-flex mb-2 pointer 1 bg-white"
                      onClick={handleNavigation}
                    >
                      <div
                        className="col-md-10 f15"
                        style={{ color: "#3A3952" }}
                      >
                        Show All Notifications
                      </div>
                      <div className="col-md-2 d-flex align-items-between justify-content-end">
                        <IoIosArrowRoundForward size={26} />
                      </div>
                    </div>


                  </div>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          
            )}


          <div
            className="col-md-auto px-4"
            style={{ borderRight: "2px solid #E8E8E8" }}
            
          >
            
            <div
              className="f14 medium pointer col"
              style={{ color: "#575777", marginTop: "30px" }}
            >
              <span
                title={
                  sessionStorage.getItem("firstName") +
                  " " +
                  sessionStorage.getItem("lastName")
                }
              >
                {sessionStorage.getItem("firstName") +
                  " " +
                  sessionStorage.getItem("lastName")}
              </span>
              <span>
                <RiArrowDropDownLine
                  size={25}
                  color="#575777"
                  style={{ marginBottom: "1px" }}
                />
              </span>{" "}
              <br />
              <span title={sessionStorage.getItem("roleName")}>
                [ {sessionStorage.getItem("roleName")} ]
              </span>
            </div>
          </div>
          <div className="col-md-auto px-3">
            <Dropdown
              style={{ marginTop: "20px" }}
              show={dropdownOProfile}
              onHide={closeDropdownProfile}
              ref={dropdownRefProfile}
            >
              <Dropdown.Toggle
                variant="none"
                id="user-menu"
                style={{ border: "none" }}
                onClick={toggleDropdownProfile}
              >
                <CgProfile
                  title="Profile"
                  style={{ height: "40px", width: "40px" }}
                  color="#898897"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: "243px",
                  height: "122px",
                  boxShadow: "2px 10px 30px #0000001A",
                  borderRadius: "3px",
                  marginTop: "5px",
                  right: "0px",
                }}
              >
                <Dropdown.ItemText style={{ padding: "0px" }}>
                  <div
                    style={{
                      height: "52px",
                      fontWeight: "400",
                      fontFamily: "Roboto",
                    }}
                    className="p-2 f16 py-3 profile-hover pointer"
                    onClick={() =>
                      navigate("/outpatientpro/facility/account/details/")
                    }
                  >
                    <BsFillPersonFill
                      size={18}
                      color="#7FB9F6"
                      className="ms-4 me-4"
                    />{" "}
                    My Profile
                  </div>
                  <div
                    style={{
                      height: "52px",
                      fontWeight: "400",
                      fontFamily: "Roboto",
                    }}
                    className="p-2 mt-2 f16 profile-hover pointer"
                    onClick={() => navigate("/")}
                  >
                    <AiOutlineLogout
                      size={20}
                      color="#7FB9F6"
                      className="ms-4 me-4"
                    />{" "}
                    Logout
                  </div>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="position-fixed col-auto" style={{ height: "100vh" }}>
          <Sidebar
            className={"text-white bg-primary"}
            style={{ height: "100vh" }}
            collapsed={!colapse}
            backgroundColor="#1A1A1F"
          >
            <div
              onClick={() => setNav(colapse)}
              className="p-4 pointer d-flex"
              style={{ height: "86px" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-3">
                <SiAdobecreativecloud size={25} color="white" />
                <div className={"fw-bolder"}>{colapse && "OutPatientPro"}</div>
              </div>
            </div>
            <Menu style={{ marginLeft: "-5px" }} className="regular f14">
              {SideBarTabs(sessionStorage?.getItem("roleId"))?.map((v, i) => (
                <NavLink
                  to={v?.link}
                  key={i}
                  title={!colapse && v?.title1}
                  className={({ isActive }) =>
                    isActive && v?.link
                      ? `decaration text-white ${activeCss(v?.label)}`
                      : "decaration"
                  }
                >
                  {!v?.child && (
                    <MenuItem
                      onClick={() => setNav(true)}
                      icon={v?.logo}
                      className={v?.label == label ? "active_bg" : "left"}
                    >
                      {v?.label}
                    </MenuItem>
                  )}
                  {v?.child && (
                    <SubMenu icon={v?.logo} label={!v?.link ? v?.label : ""}>
                      {v?.child?.map((val) => (
                        <MenuItem
                          className="text-white"
                          style={{ backgroundColor: "#1A1A1F" }}
                        >
                          {val?.label}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  )}
                </NavLink>
              ))}
            </Menu>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default Header;
