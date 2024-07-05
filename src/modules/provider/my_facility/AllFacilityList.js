import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SharedServices, getList } from "../../../api_services/SharedServices";
import ReactTable from "../../../share_components/ReactTable";
import { urls } from "../../../api_services/url";
import { MdSearch } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { BiAbacus } from "react-icons/bi";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { ListOfCards } from "../../../share_components/ListOfCards";

const AllFacilityList = () => {
  const [filterlist, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [location, setLocation] = useState([]);

  const [update, setUpdate] = useState([]);
  const getLocations=async()=>{
    let jsonObjects={userId:sessionStorage.getItem("userId")}
    let res=await getList(urls?.doctor.getLocationsById,{jsonObjects})
    setLocation(res)
  }
  const filtertabs = [


    { name:  "All Providers" },
    { name: "Privileged" },
    { name: "Applying" },
    { name: "Appt Expiring" },
    { name: "Appt Expired" },
    { name: "Credentials Expiring" },
    { name:  "Credentials Expired"},
    { name:  "Board Review"},
    { name:  "Archived"},

  ];
  const [facilityList, setFacility] = useState([
    {
      ofproviders: "72",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facilityName: "Newport Beach Health Group",
      inprogress: "Application Sent",
      expiring: "10 Appts Expiring",
      expired: "Expired",
      review: "5 Board Review",
      attention: "92 items",
      lastUpdated: "Feb 9,2024",
    },

    {
      name: "Usman Khawaja",
      ofproviders: "29",
      licensetype: "Medical Doctor",
      specility: "Orthopedic ",
      tag: "orthopedic Surgeon",
      facilityName: "Orange County Surgical",
      inprogress: "Application Sent",
      expiring: "15 Appts Expiring",
      expired: "Expired",
      review: "4 Board Review",
      attention: "90 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Marnus Labuschagne",
      ofproviders: "101",
      licensetype: "Medical Doctor",
      specility: "Orthopedic",
      tag: "General",
      facilityName: " Ghozland Surgical Center",
      inprogress: "Application Sent",
      expiring: "19 Appts Expiring",
      expired: "Expired",
      review: "9 Board Review",
      attention: "7 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Cameron Green",
      ofproviders: "45",
      licensetype: "Medical Doctor",
      specility: "Urology",
      tag: "General",
      facilityName: "San Diego County Surgery Partners",
      inprogress: "Application Sent",
      expiring: "16 Appts Expiring",
      expired: "Expired",
      review: "9 Board Review",
      attention: "69 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Steven Smith",
      ofproviders: "18",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "Surgeon",
      facilityName: "Newport Beach Health Group",
      inprogress: "Application Sent",
      expiring: "12 Appts Expiring",
      expired: "Expired",
      review: "9 Board Review",
      attention: "77 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Mitchell Marsh",
      ofproviders: "38",
      licensetype: "Medical Doctor",
      specility: "Pain",
      tag: "General",
      facilityName: "Irvine surgical center",
      inprogress: "Application Sent",
      expiring: "19 Appts Expiring",
      expired: "Expired",
      review: "2 Board Review",
      attention: "45 items",
      lastUpdated: "Feb 9,2024",
    },

    {
      ofproviders: "72",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facilityName: "Newport Beach Health Group",

      inprogress: "Application Sent",
      expiring: "14 Appts Expiring",
      expired: "Expired",
      review: "1 Board Review",
      attention: "92 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      ofproviders: "72",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facilityName: "Newport Beach Health Group",

      inprogress: "Application Sent",
      expiring: "17 Appts Expiring",
      expired: "Expired",
      review: "8 Board Review",
      attention: "92 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      ofproviders: "72",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facilityName: "Newport Beach Health Group",

      inprogress: "Application Sent",
      expiring: "13 Appts Expiring",
      expired: "Expired",
      review: "7 Board Review",
      attention: "87 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      ofproviders: "72",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facilityName: "Newport Beach Health Group",

      inprogress: "Application Sent",
      expiring: "11 Appts Expiring",
      expired: "Expired",
      review: "3 Board Review",
      attention: "88 items",
      lastUpdated: "Feb 9,2024",
    },
  ]);
  const navigate = useNavigate();
  const { headerlink } = UseFormValidations({});
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("All Providers");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  

  useEffect(() => {
    
    getLocations()
  }, []);

  useEffect(() => {
    headerlink([
      {
        name: "My Facilities",
        link: "/outpatientpro/provider/facility/allfacilitylist",
        active: true,
      },
    ]);
  }, []);

  const columns = [
    {
      name: "Facility",
      selector: (row) => (
        <div
          title={row?.facilityName}
          className="pointer text-hover"
          onClick={() =>
            navigate("/outpatientpro/provider/facility/facilityprofile")
          }
        >
          {row?.facilityName}
        </div>
      ),
      sortable: true,
      width: "13rem",
    },

    {
      name: (
        <div>
          {" "}
          # of <br /> Providers
        </div>
      ),
      selector: (row) => (
        <div title={row?.name} className="pointer">
          {row?.ofproviders}
        </div>
      ),
      sortable: true,
      width: "6rem",
    },
    {
      name: (
        <div>
          Appts
          <br />
          In Progress
        </div>
      ),
      selector: (row) => (
        <div
          title={row?.inprogress}
          className="applicationSent  text-center"
          style={{ width: "9rem" }}
        >
          {row?.inprogress}
        </div>
      ),

      sortable: true,
      width: "11rem",
    },

    {
      name: "Appts Expiring",
      selector: (row) => (
        <div
          title={row?.expiring}
          className="expiring px-3 text-center"
          style={{ width: "9rem" }}
        >
          {row?.expiring}
        </div>
      ),
      sortable: true,
      width: "11rem",
    },

    {
      name: "Appts Expired",
      selector: (row) => (
        <div
          title={row?.expired}
          className="expired text-center px-3"
          style={{ width: "8rem" }}
        >
          {row?.expired}
        </div>
      ),
      sortable: true,
      width: "10rem",
    },

    {
      name: "Board Review",
      selector: (row) => (
        <div
          title={row?.review}
          className="boardReview px-3 text-center"
          style={{ width: "9rem" }}
        >
          {row?.review}
        </div>
      ),
      sortable: true,
      width: "11rem",
    },

    {
      name: (
        <div>
          Need
          <br />
          Attention
        </div>
      ),
      selector: (row) => (
        <div
          title={row?.attention}
          className="expiring px-3 text-center"
          style={{ width: "6rem" }}
        >
          {row?.attention}
        </div>
      ),
      sortable: true,
      width: "8rem",
    },

    {
      name: "Last Updated",
      selector: (row) => row?.lastUpdated,
      sortable: true,
    },
  ];

  useEffect(() => {
    if (search?.trim() === "") {
      setFilterList(doctorsList);
    } else {
      const result = doctorsList.filter((v) => {
        return (
          v?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.startdate
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          v?.npi?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.tms?.toLowerCase()?.includes(search?.toLowerCase())
        );
      });
      setFilterList(result);
    }
  }, [search]);

  const filterSearch = () => {
    return (
      <>
        <div className="password-container ">
          <input
            type="search"
            placeholder="Search by Name or NPI #..."
            className="header-search rounded search-input search-control bg-white"
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
      <div className="show_header">
        {" "}
        <ListOfCards
          array={facilityList}
          tabs={filtertabs}
          title={"My Facilities"}
          name={"MyFacilities"}
        />
      </div>

      <div className=" bg-white p-2 mobile_Header">
        <div className="align-items-center justify-content-between d-flex py-3 px-1">
          <h1 className="">My Facilities</h1>
          <div className="col-3 px-2">{filterSearch()}</div>
        </div>

        <div className=" row py-3">
          <div className="col-md-10  ">
            <div className="col-auto d-flex gap-3 ">
              {[
                "All Providers",
                "Privileged",
                "Applying",
                "Appt Expiring",
                "Appt Expired",
                "Credentials Expiring",
              ]?.map((v) => {
                return (
                  <>
                    <div
                      onClick={() => setActive(v)}
                      className={
                        active == v
                          ? " text-center filter-tabactive f14 col-md-auto px-3 "
                          : "text-center filter-tab f14 col-md-auto px-3 "
                      }
                    >
                      {v}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-md-2">
            <Dropdown show={isOpen} onClose={() => setIsOpen(false)}>
              <button
                className=" border-0 f16 medium bg-white "
                style={{ color: "#575777" }}
                onClick={toggleDropdown}
              >
                <BsFilterLeft color="#575777" size={24} /> More Filters
              </button>

              <Dropdown.Menu>
                <Dropdown.Item>Credentials Expired</Dropdown.Item>
                <Dropdown.Item>Board Review</Dropdown.Item>
                <Dropdown.Item>Archived</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="mt-2">
          <ReactTable
            dataTable={location}
            columns={columns}
            search={filterSearch}
          />
        </div>
      </div>
    </>
  );
};

export default AllFacilityList;
