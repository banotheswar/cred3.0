import React, { useEffect, useState, useRef } from "react";

import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import {
  IoIosArrowRoundForward,
  IoIosNotifications,
  IoIosSettings,
} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LiaHospital } from "react-icons/lia";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import {
  BiArrowFromLeft,
  BiArrowFromRight,
  BiCross,
  BiLogOut,
  BiNotepad,
  BiSelection,
  BiSolidError,
  BiUser,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

import { SiAdobecreativecloud } from "react-icons/si";
import { MdSearch } from "react-icons/md";
import { RiArrowDropDownLine, RiFileSettingsFill } from "react-icons/ri";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { SiGoogleforms } from "react-icons/si";
import { Dropdown } from "react-bootstrap";
import { PiUserListLight } from "react-icons/pi";
import { TbComponents, TbNotes } from "react-icons/tb";
import { GoShield } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import crednoti from "../assets/images/notification-credential.svg";
import crednoti1 from "../assets/images/notification-application.svg";
import bell from "../assets/images/bell.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const bread = useSelector((state) => state.breadcrumb);
  const [show, setShow] = useState("");
  const [search, setSearch] = useState("");
  const [showchild, setShowChild] = useState("");
  const [collapsed, setCollapsed] = useState(false);
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
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

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

  const toggleDropdownProfile = () => {
    setDropdownProfile(!dropdownOProfile);
  };

  const closeDropdownProfile = () => {
    setDropdownProfile(false);
  };

  const [label, setLabel] = useState("Dashboard");
  const hospitalityNavBarItems = [
    {
      id: 1,
      label: "My Dashboard",
      link: "/outpatientpro/provider/dashboard",
      logo: <MdDashboard size={20} />,
    },
    {
      id: 2,
      label: "My Facility",
      link: "/outpatientpro/provider/facility/allfacilitylist",
      logo: <LiaHospital size={20} />,

      // child:
      //   [
      //     { label: 'Acme Medical Center', link: '/outpatientpro/provider/facility/acmemedicalcenter' },
      //     { label: 'Ghozland Surgery Center', link: '/outpatientpro/provider/facility/ghozlandsurgerycenter' },
      //     { label: 'Irvine Health Group', link: '/outpatientpro/provider/facility/irvinehealthgroup' },
      //     { label: 'Orange County Surgical', link: '/outpatientpro/provider/facility/orangecountysurgical' },
      //     { label: 'Califonia County Surgical', link: '/outpatientpro/provider/facility/califoniacountysurgical' },
      //   ]
    },
    {
      id: 3,
      label: "Current Appointments",
      logo: <FaCheckCircle size={20} />,

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
    },
    {
      id: 5,
      label: "Need Attentions",
      link: "/outpatientpro/provider/needattentions/allneedattention",
      logo: <BiSolidError size={20} />,
    },

    {
      id: 6,
      label: "My Applications",
      link: "/outpatientpro/provider/applicationprocess",
      logo: <BiNotepad size={20} />,
    },
    {
      id: 7,
      label: "My Account",
      link: "/outpatientpro/provider/myaccountprovider",
      logo: <FaUser size={20} />,
    },

    { id: 8, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> },
  ];
  const FacilityNavbar = [
    {
      id: 1,
      label: "Dashboard",
      name: ["My Dashboard"],
      link: "/outpatientpro/facility/dashboard",
      logo: <MdDashboard size={20} />,
    },
    {
      id: 2,
      label: "Doctors",
      name: ["My Doctors"],
      link: "/outpatientpro/facility/doctors",
      logo: <MdHealthAndSafety size={20} />,
    },
    {
      id: 3,
      label: "Allied Health",
      name: "",
      link: "/outpatientpro/facility/alliedHealth",
      logo: <FaHeartPulse size={20} />,
    },
    {
      id: 4,
      label: "Application Builder",
      link: "/outpatientpro/facility/applicationBuilder",
      logo: <VscSettings size={20} />,
    },
    {
      id: 5,
      label: "Settings",
      link: "/outpatientpro/facility/settings",
      logo: <IoIosSettings size={22} />,
    },
    {
      id: 6,
      label: "Activity Log",
      link: "/outpatientpro/facility/activitylogs",
      logo: <SiGoogleforms size={20} />,
    },

    {
      id: 7,
      label: "Notifications",
      link: "/outpatientpro/facility/facilitynotifications",
      logo: (
        //  <FaUser size={20} />
        <PiUserListLight size={25} />
      ),
    },
    {
      id: 8,
      label: "My Account",
      link: "/outpatientpro/facility/account/details/",
      logo: <FaUser size={20} />,
    },
    {
      id: 9,
      label: "Masters",
      link: "/outpatientpro/facility/masters/",
      logo: <TbComponents size={20} />,
    },

    { id: 10, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> },
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
      logo: <MdDashboard size={20} />,
    },
    // {id: 2,label: "Doctor",link: "/outpatientpro/admin/doctor",logo: <MdHealthAndSafety size={20} />,},
    // {id: 3,label: "Allied health",link: "/outpatientpro/admin/alliedhealth",logo: <FaHeartPulse size={20} />,},
    {
      id: 4,
      label: "Settings",
      link: "/outpatientpro/admin/settings",
      logo: <RiSettings2Line size={20} />,
    },
    {
      id: 5,
      label: "My Account",
      link: "/outpatientpro/admin/myaccount",
      logo: <BiUser size={20} />,
    },
    
    { id: 6, label: "Log Out", link: "/", logo: <AiOutlineLogin size={20} /> },
  ];

  // Dashboard, Doctor, Allied health, Settings [users and configuraiton], My Account [same as superadmin], and Log out. [P]

  const SideBarTabs = (roleId) => {
    switch (roleId) {
      case "2":
        return FacilityNavbar;

      case "4":
        return hospitalityNavBarItems;

      case "9":
        return DelegateNavbar;

      case "8":
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
  // useEffect(() => {
  //   window.scrollTo(0, 500);
  // }, []);
  return (
    <div  style={{ borderTop: "1px solid #F0F0F7",borderBottom: "1px solid #F0F0F7"}} >
    {SideBarTabs(sessionStorage?.getItem("roleId"))?.map((v, i) => {
           return (
             <NavLink
               to={v?.link}
               key={i}
               className={({ isActive }) =>
                 isActive && v?.link
                   ? `decaration text-white  ${activeCss(v.label)} `
                   : "decaration "
               }
             >
               {!v?.child && (
                 <div
                   className={
                     v.label == label
                       ? "bg-light d-flex justify-content-center align-items-center text-black"
                       : " d-flex justify-content-center align-items-center"
                   }
                   style={{ height: "55px", }}
                 >
                   {v?.logo}
                 </div>
               )}
             </NavLink>
           );
         })}
    </div>
  );
};

export default Navbar;
