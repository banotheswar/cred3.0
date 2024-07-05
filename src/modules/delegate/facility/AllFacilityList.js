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

const AllFacilityList = () => {
  const [filterlist, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);;
 
  const [update, setUpdate] = useState([]);
  const navigate = useNavigate();
    const {headerlink}=UseFormValidations({})
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


 



  useEffect(() => {
    headerlink([{name:"My Facilities",link:"/outpatientpro/delegate/alldelegatefacility",active:true},
    ])
 
  }, [update]);

  const columns = [
    
    {
        name: "Facility",
        selector: (row) => (
            <div title={row?.facilityName} className="pointer text-hover"
            
            // onClick={() =>
            //     navigate("/outpatientpro/provider/facility/facilityprofile")
            //   }
            
            >
              {row?.facilityName}
            </div>
          ),
        sortable: true,
        width: "13rem",
      },
   
    {
      name:<div> # of <br/> Providers</div>,
      selector: (row) => (
        <div title={row?.name} className="pointer">
          {row?.ofproviders}
        </div>
      ),
      sortable: true,
    },
    {
      name:(<div>Appts<br/>In Progress</div>) ,
      selector: (row) => (
        <div
          title={row?.inprogress}
          className="applicationSent px-2" 
          
        >
          {row?.inprogress}
        </div>
      ),
     
      sortable: true,
    },

    {
      name: "Appts Expiring",
      selector: (row) => (
        <div
          title={row?.expiring}
        className="expiring px-2"
          
        >
          {row?.expiring}
        </div>
      ),
      sortable: true,
    },

   

    {
      name: "Appts Expired",
      selector: (row) => (
        <div
          title={row?.expired}
        
          className="expired px-2"
        >
          {row?.expired}
        </div>
      ),
      sortable: true,
      width: "11rem",
    },

    {
        name: "Board Review",
        selector: (row) => (
          <div
            title={row?.review}
           className="boardReview px-2"
           
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
         className="expiring px-2"
       
        >
          {row?.attention}
        </div>
      ),
      sortable: true,
      width: "7rem",
    },

    {
      name: "Last Updated",
      selector: (row) => row?.lastUpdated,
      sortable: true,
    },
  ];
  const datakeys=[

    {
     
        ofproviders: "72",
        licensetype: "Medical Doctor",
        specility: "General",
        tag: "General",
        facilityName:"Newport Beach Health Group",
        inprogress:"Application Sent",
        expiring:"10 Appts Expiring",
        expired :"Expired",
        review:"5 Board Review",
        attention: "92 items",
        lastUpdated: "Feb 9,2024",
      },

      {
        name: "Usman Khawaja",
        ofproviders: "29",
        licensetype: "Medical Doctor",
        specility: "Orthopedic ",
        tag: "orthopedic Surgeon",
        facilityName:"Orange County Surgical" ,
        inprogress:"Application Sent",
        expiring:"15 Appts Expiring",
        expired :"Expired",
        review:"4 Board Review",
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
        inprogress:"Application Sent",
        expiring:"19 Appts Expiring",
        expired :"Expired",
        review:"9 Board Review",
        attention: "70 items",
        lastUpdated: "Feb 9,2024",
      },
      {
        name: "Cameron Green",
        ofproviders: "45",
        licensetype: "Medical Doctor",
        specility: "Urology",
        tag: "General",
        facilityName: "San Diego County Surgery Partners",
        inprogress:"Application Sent",
        expiring:"16 Appts Expiring",
        expired :"Expired",
        review:"9 Board Review",
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
        inprogress:"Application Sent",
        expiring:"12 Appts Expiring",
        expired :"Expired",
        review:"9 Board Review",
        attention: "77 items",
        lastUpdated: "Feb 9,2024",
      },
      {
        name: "Mitchell Marsh",
        ofproviders: "38",
        licensetype: "Medical Doctor",
        specility: "Pain",
        tag: "General",
        facilityName:"Irvine surgical center" ,
        inprogress:"Application Sent",
        expiring:"19 Appts Expiring",
        expired :"Expired",
        review:"2 Board Review",
        attention: "45 items",
        lastUpdated: "Feb 9,2024",
      },
 

      {
     
        ofproviders: "72",
        licensetype: "Medical Doctor",
        specility: "General",
        tag: "General",
        facilityName:"Newport Beach Health Group",
        
        inprogress:"Application Sent",
        expiring:"14 Appts Expiring",
        expired :"Expired",
        review:"1 Board Review",
        attention: "92 items",
        lastUpdated: "Feb 9,2024",
      },
      {
     
        ofproviders: "72",
        licensetype: "Medical Doctor",
        specility: "General",
        tag: "General",
        facilityName:"Newport Beach Health Group",
        
        inprogress:"Application Sent",
        expiring:"17 Appts Expiring",
        expired :"Expired",
        review:"8 Board Review",
        attention: "92 items",
        lastUpdated: "Feb 9,2024",
      },
      {
     
        ofproviders: "72",
        licensetype: "Medical Doctor",
        specility: "General",
        tag: "General",
        facilityName:"Newport Beach Health Group",
        
        inprogress:"Application Sent",
        expiring:"13 Appts Expiring",
        expired :"Expired",
        review:"7 Board Review",
        attention: "87 items",
        lastUpdated: "Feb 9,2024",
      },
      {
     
        ofproviders: "72",
        licensetype: "Medical Doctor",
        specility: "General",
        tag: "General",
        facilityName:"Newport Beach Health Group",
        
        inprogress:"Application Sent",
        expiring:"11 Appts Expiring",
        expired :"Expired",
        review:"3 Board Review",
        attention: "88 items",
        lastUpdated: "Feb 9,2024",
      },


    
  ]
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
          <span className="search-icon ">{<MdSearch size={20} color="#878793"/>}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className=" bg-white p-2">
        <div className="align-items-center justify-content-between d-flex p-3">
          <h4 className="">My Facilities</h4>
          <div className="col-3 px-2">{filterSearch()}</div>
        </div>

        
        <div className=" row ">
          <div className="col-md-10  ">
     <div className="col-auto d-flex gap-3 ">       <div className=" text-center filter-tab   ">
            All Providers
            </div>
            <div className=" text-center filter-tab f14 py-2   ">
            Privileged
            </div>

            <div className=" text-center filter-tab  f14 py-2  ">
              Privileged
            </div>
            <div className=" text-center filter-tab  f14 py-2  ">
            Applying
            </div>
            <div className=" text-center filter-tab  f14 py-2 ">Appt Expiring</div>

            <div className=" text-center filter-tab  f14 py-2 ">Appt Expired</div>
            <div className=" text-center filter-tab  f14 py-2 ">Credentials Expiring</div>
          </div></div>
          <div className="col-md-2">
            <Dropdown show={isOpen} onClose={() => setIsOpen(false)}>
              <button
                className="text-dark border-0 f16 medium bg-white" style={{color:"#575777"}}
                onClick={toggleDropdown}
              >
                <BsFilterLeft size={24} /> More Filters
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
            dataTable={datakeys}
            columns={columns}
            search={filterSearch}
          />
        </div>
      </div>
    </>
  );
};

export default AllFacilityList;
