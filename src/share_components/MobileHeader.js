import React from "react";
import {
  BiAlarm,
  BiArrowToBottom,
  BiBell,
  BiMenu,
  BiUserCircle,
} from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { SiAdobecreativecloud } from "react-icons/si";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
const MobileHeader = ({ setNav, colapse, SideBarTabs, activeCss, label }) => {
  return (
    <div className="container-fluid ">
      <div className="row bg-white py-4 border-0 border-bottom">
        <div className="col-1" onClick={() => setNav(colapse)}>
          <BiMenu size={20} />
        </div>
        <div className="col-11 d-flex flex-wrap gap-2 justify-content-end align-items-center">
        {(sessionStorage?.getItem("roleId") == 4 
              // sessionStorage?.getItem("roleId") == 2
            ) 
              && (   <NavLink
            to={"/outpatientpro/facility/appointment"}
            className=" text-white border text-center rounded p-1 decaration"
            style={{ fontSize: "12px", background: "#3a3952cc" }}
          >
            + Add Appointment
          </NavLink>
  )}
          <div>
            <BiBell size={20} />{" "}
          </div>

          <div className="d-flex gap-1 justify-content-end align-items-center f-13">
            OPP credentialing
            <FaChevronDown size={12} />
          </div>
          <div>
            <BiUserCircle size={20} />
          </div>
        </div>
      </div>
      <div
        className="position-fixed top-0"
        style={{ width: "60px", marginLeft: "-10px" }}
      >
        {colapse && (
          <Sidebar
            className={"text-white bg-primary  "}
            style={{ height: "100vh", width: "60px" }}
            collapsed={!colapse}
            backgroundColor="#1A1A1F"
          >
            <div
              onClick={() => setNav(colapse)}
              className=" p-4 pointer d-flex border-0 border-bottom"
              // style={{ height: "86px" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-3 ">
                <SiAdobecreativecloud size={25} color="white" />
                <div className={" fw-bolder "}>
                  {colapse && "OutPatientPro"}
                </div>
              </div>
            </div>
            <Menu style={{ marginLeft: "-14px" }} className="regular f14">
              {SideBarTabs(sessionStorage?.getItem("roleId"))?.map((v, i) => {
                return (
                  <>
                    <NavLink
                      to={v?.link}
                      key={i}
                      className={({ isActive }) =>
                        isActive && v?.link
                          ? `decaration text-white  ${activeCss(v?.label)} `
                          : "decaration "
                      }
                    >
                      {!v?.child && (
                        <MenuItem
                          onClick={() => setNav(true)}
                          icon={v?.logo}
                          className={v?.label == label ? "active_bg " : "left "}
                        >
                          {" "}
                          {v?.label}
                        </MenuItem>
                      )}
                      {v?.child && (
                        <SubMenu
                          icon={v?.logo}
                          label={!v?.link ? v?.label : ""}
                        >
                          {v?.child?.map((val) => {
                            return (
                              <>
                                <MenuItem
                                  className="text-white "
                                  style={{ backgroundColor: "#1A1A1F" }}
                                >
                                  {" "}
                                  {val?.label}
                                </MenuItem>
                              </>
                            );
                          })}
                        </SubMenu>
                      )}
                    </NavLink>
                  </>
                );
              })}
            </Menu>
          </Sidebar>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
