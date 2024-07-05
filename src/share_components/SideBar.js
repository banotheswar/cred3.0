import React, { useEffect, useState, useRef } from "react";
 import {IoIosSettings,} from "react-icons/io";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import { LiaHospital } from "react-icons/lia";
import { FaCheckCircle, FaUniversalAccess, FaUser } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import {BiNotepad,BiSolidError, BiUser,} from "react-icons/bi";
import {  RiFileSettingsFill } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { SiGoogleforms } from "react-icons/si";
import { PiUserListLight } from "react-icons/pi";
import { TbComponents, } from "react-icons/tb";
import Header from "./Header";
import MobileHeader from "./MobileHeader";


const SideBar = () => {
  const navigate = useNavigate();
  const bread = useSelector((state) => state.breadcrumb);
  const [show, setShow] = useState("");
  const [search, setSearch] = useState("");
  const [showchild, setShowChild] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOProfile, setDropdownProfile] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefProfile = useRef(null);
  const location = useLocation();

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
  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };
  // const closeDropdown = () => {
  //   setDropdownOpen(false);
  // };

  useEffect(() => {
    setDropdownProfile(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutsideprofile(event) {
      if (
        dropdownRefProfile.current &&
        !dropdownRefProfile.current.contains(event.target)
      ) {
        setDropdownProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideprofile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideprofile);
    };
  }, [dropdownRefProfile]);

  // const toggleDropdownProfile = () => {
  //   setDropdownProfile(!dropdownOProfile);
  // };

  // const closeDropdownProfile = () => {
  //   setDropdownProfile(false);
  // };

  const [label, setLabel] = useState("Dashboard");


  const hospitalityNavBarItems = [
    {
      id: 1,
      label: "My Dashboard",
      link: "/outpatientpro/provider/dashboard",
      logo: <MdDashboard  size={20} />,
      title1:"My Dashboard"
    },
    // {
    //   id: 2,
    //   label: "My Facility",
    //   link: "/outpatientpro/provider/facility/allfacilitylist",
    //   logo: <LiaHospital   size={20} />,
    //   title1:"My Facility"

    //   // child:
    //   //   [
    //   //     { label: 'Acme Medical Center', link: '/outpatientpro/provider/facility/acmemedicalcenter' },
    //   //     { label: 'Ghozland Surgery Center', link: '/outpatientpro/provider/facility/ghozlandsurgerycenter' },
    //   //     { label: 'Irvine Health Group', link: '/outpatientpro/provider/facility/irvinehealthgroup' },
    //   //     { label: 'Orange County Surgical', link: '/outpatientpro/provider/facility/orangecountysurgical' },
    //   //     { label: 'Califonia County Surgical', link: '/outpatientpro/provider/facility/califoniacountysurgical' },
    //   //   ]
    // },
    {
      id: 3,
      label: "Current Appointments",
      logo: <FaCheckCircle  size={20} />,
      title1:"Current Appointments"

      // child: [

      //   { label: 'Irvine Health Group', link: '/outpatientpro/provider/currentappoinment/irvinehealthgroup' },
      //   { label: 'Orange County Surgical', link: '/outpatientpro/provider/currentappoinment/orangecountysurgical' },
      //   { label: 'California Medical Group', link: '/outpatientpro/provider/currentappoinment/californiamedicalgroup' },
      // ]
    },

    {
      id: 4,
      label: "Application Inprogress",
      link: "/outpatientpro/provider/applicationinprogress",
      logo: <FaArrowsRotate size={20} />,
      title1:"Application Inprogress"
    },
    {
      id: 5,
      label: "Need Attentions",
      link: "/outpatientpro/provider/needattentions/allneedattention",
      logo: <BiSolidError  size={20} />,
      title1:"Need Attentions"
    },

    {
      id: 6,
      label: "My Applications",
      link: "/outpatientpro/provider/applicationprocess",
      logo: <BiNotepad   size={20} />,
      title1:"My Applications"
    },
    {
      id: 7,
      label: "My Account",
      link: "/outpatientpro/provider/myaccountprovider",
      logo: <FaUser  size={20} />,
      title1:"My Account"
    },

    { id: 8, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} />,title1:"Log Out" },
  ];
  const EnterpriseNavbar = [
    {
      id: 1,
      label: "Dashboard",
      name: ["My Dashboard"],
   
      link: "/outpatientpro/enterprise/dashboard",
      logo: <MdDashboard  size={20} />,
      title1:"Dashboard"
    },
    {
      id: 2,
      label: "Doctors",
      name: ["My Doctors"],
      link: "/outpatientpro/enterprise/doctors",
      logo: <MdHealthAndSafety  size={20} />,
      title1:"Doctors"
    },
    {
      id: 3,
      label: "Allied Health",
      name: "",
      link: "/outpatientpro/enterprise/alliedHealth",
      logo: <FaHeartPulse  size={20} />,
      title1:"Allied Health"
    },
    // {
    //   id: 4,
    //   label: "Application Builder",
    //   link: "/outpatientpro/enterprise/applicationBuilder",
    //   logo: <VscSettings  size={20} />,
    //   title1:"Application Builder"
   
     
    // },
    {
      id: 5,
      label: "Settings",
      link: "/outpatientpro/enterprise/settings",
      logo: <IoIosSettings  size={22} />,
      title1:"Settings"
    },
    {
      id: 6,
      label: "Activity Log",
      link: "/outpatientpro/enterprise/activitylogs",
      logo: <SiGoogleforms  size={20} />,
      title1:"Activity Log"
    },

    {
      id: 7,
      label: "Notifications",
      link: "/outpatientpro/enterprise/facilitynotifications",
      logo: (
        //  <FaUser size={20} />
        <PiUserListLight  size={25} />
        
      ),
      title1:"Notifications",
    },
    {
      id: 8,
      label: "My Account",
      link: "/outpatientpro/enterprise/account/details/",
      logo: <FaUser  size={20} />,
      title1:"My Account"
    },
    {
      id: 9,
      label: "Masters",
      link: "/outpatientpro/enterprise/masters/",
      logo: <TbComponents  size={20} />,
      title1:"Masters"
    },
    {
      id: 7,
      label: "Access Level",
      link: "/outpatientpro/enterprise/accesslevel/all",
      logo: <FaUniversalAccess title="Access Level" size={20} />,
    },

    { id: 10, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> ,title1:"Log Out"},
  ];
  const FacilityNavbar = [
    {
      id: 1,
      label: "Dashboard",
      name: ["My Dashboard"],
   
      link: "/outpatientpro/facility/dashboard",
      logo: <MdDashboard  size={20} />,
      title1:"Dashboard"
    },
    {
      id: 2,
      label: "Doctors",
      name: ["My Doctors"],
      link: "/outpatientpro/facility/doctors",
      logo: <MdHealthAndSafety  size={20} />,
      title1:"Doctors"
    },
    {
      id: 3,
      label: "Allied Health",
      name: "",
      link: "/outpatientpro/facility/alliedHealth",
      logo: <FaHeartPulse  size={20} />,
      title1:"Allied Health"
    },
    {
      id: 4,
      label: "Application Builder",
      link: "/outpatientpro/facility/applicationBuilder",
      logo: <VscSettings  size={20} />,
      title1:"Application Builder"
   
     
    },
    {
      id: 5,
      label: "Settings",
      link: "/outpatientpro/facility/settings",
      logo: <IoIosSettings  size={22} />,
      title1:"Settings"
    },
    {
      id: 6,
      label: "Activity Log",
      link: "/outpatientpro/facility/activitylogs",
      logo: <SiGoogleforms  size={20} />,
      title1:"Activity Log"
    },

    {
      id: 7,
      label: "Notifications",
      link: "/outpatientpro/facility/facilitynotifications",
      logo: (
        //  <FaUser size={20} />
        <PiUserListLight  size={25} />
        
      ),
      title1:"Notifications",
    },
    {
      id: 8,
      label: "My Account",
      link: "/outpatientpro/facility/account/details/",
      logo: <FaUser  size={20} />,
      title1:"My Account"
    },
    {
      id: 9,
      label: "Masters",
      link: "/outpatientpro/facility/masters/",
      logo: <TbComponents  size={20} />,
      title1:"Masters"
    },

    { id: 10, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> ,title1:"Log Out"},
  ];
  const DelegateNavbar = [
    {
      id: 1,
      label: "My Dashboard",
      link: "/outpatientpro/delegate/alldashboard",
      logo: <MdDashboard size={20} />,
    },
    {
      id: 2,
      label: "My Providers",
      link: "/outpatientpro/delegate/allproviders",
      logo: <MdHealthAndSafety size={20} />,
    },
    {
      id: 3,
      label: "My Facilities",
      link: "/outpatientpro/delegate/alldelegatefacility",
      logo: <LiaHospital size={20} />,
    },
    {
      id: 4,
      label: "Needs Attention",
      link: "/outpatientpro/delegate/alldelegateneedattention/",
      logo: <FaHeartPulse size={20} />,
    },
    {
      id: 5,
      label: "Notifications",
      link: "/outpatientpro/delegate/alldelegatenotifications/",
      logo: <RiFileSettingsFill size={20} />,
    },
    {
      id: 6,
      label: "My Account",
      link: "/outpatientpro/delegate/alldelegatemyaccount",
      logo: <BiUser size={20} />,
    },
    { id: 7, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> },
  ];
  const OppNavbar = [
    {
      id: 1,
      label: "Dashboard",
      link: "/outpatientpro/admin/dashboard",
      logo: <MdDashboard title="Dashboard" size={20} />,
      title:"Dashboard"
    },
    {
      id: 2,
      label: "Doctors",
      link: "/outpatientpro/admin/doctors",
      logo: <MdHealthAndSafety  size={20} />,
      title1:"Doctors"
    },
    {
      id: 4,
      label: "Application Builder",
      link: "/outpatientpro/facility/applicationBuilder",
      logo: <VscSettings title="Application Builder" size={20} />,
    },
    {
      id: 4,
      label: "Settings",
      link: "/outpatientpro/admin/settings",
      logo: <RiSettings2Line title="Settings" size={20} />,
    },
    {
      id: 5,
      label: "My Account",
      link: "/outpatientpro/admin/myaccount",
      logo: <BiUser title="My Account" size={20} />,
    },

    {
      id: 6,
      label: "Master",
      link: "/outpatientpro/admin/rolemaster",
      logo: <TbComponents title="Master" size={20} />,
    },
    
    { id: 8, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> },
  ];

  // Dashboard, Doctor, Allied health, Settings [users and configuraiton], My Account [same as superadmin], and Log out. [P]

  const SideBarTabs = (roleId) => {
    switch (roleId) {
      case "2":
        return EnterpriseNavbar;
        case "4":
          return FacilityNavbar;
      case "5":
        return hospitalityNavBarItems;

      case "6":
        return hospitalityNavBarItems;

      case "7":
        return DelegateNavbar;

      case "1":
        return OppNavbar;

      default:
        return "";
    }
  };
  // const showChild = (val) => {
  //   console?.log(val, "val, setShow", val === show);

  //   if (val == show) {
  //     setShow("");
  //   } else {
  //     setShow(val);
  //   }
  // };
  // const showSubChild = (id) => {
  //   if (id == showchild) {
  //     setShowChild("");
  //   } else {
  //     setShowChild(id);
  //   }
  // };

  const activeCss = (name) => {
    setLabel(name);
    
  };
  
  return (
    <div
    className="d-flex flex-wrap "
    style={{ backgroundColor: "#F0F0F7",zIndex:"1000" }}
  >
    
    <div className="col-md-12 col-lg-12 col-sm-12  position-fixed mobile_Header" style={{zIndex:"1000",}}>
      <Header colapse={!collapsed} SideBarTabs={SideBarTabs} activeCss={activeCss} label={label}setNav={setCollapsed}/>
      </div>
      <div className="w-100 position-fixed show_header " style={{zIndex:"1000",}}>
      <MobileHeader colapse={!collapsed} SideBarTabs={SideBarTabs} activeCss={activeCss} label={label}setNav={setCollapsed}/>
      </div>
    <div style={{width:"auto",marginLeft:"84px",marginTop:"95px",overflowY:"scroll",overflowX:"hidden"}} className="col mobile_Header"><Outlet/></div>
   
    <div style={{width:"auto",marginTop:"80px",overflowY:"scroll",overflowX:"hidden"}} className="col show_header"><Outlet/></div>
   
 
  </div>
  );
};

export default SideBar;
