import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SharedServices, filterSearch, getList } from "../../../api_services/SharedServices";
import ReactTable from "../../../share_components/ReactTable";
import { urls } from "../../../api_services/url";
import { MdSearch } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";

import { UseFormValidations } from "../../../validations/UseFormValidation";
import moment from "moment";
import Table from "../../../share_components/Table";
import FilterList from "../../facility_admin/doctors/FilterList";

const AllProviders = () => {
  const [filterlist, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [active, setActive] = useState("All Providers");
  const [providersList, setProvidersList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [obj, setObj] = useState({});
  const [facility, setFacility] = useState([]);
  const navigate = useNavigate();
  const {data,handleChange,headerlink}=UseFormValidations({})
  const [isOpen, setIsOpen] = useState(false);

  const filtertabs = [
    { name: "All Providers" },
    { name: "Privileged" },
    { name: "Applying" },
    { name: "Appt Expiring" },
    { name: "Appt Expired" },
    { name: "Credentials Expiring" },
    { name: "Credentials Expired" },
    { name: "Board Review" },
    { name: "Archived" },
  ];





  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getAllProviders = async () => {
    let jsonObjects = {
      userId: 0,
      delegateId:sessionStorage.getItem("userId")

    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
    res?.map((v)=>{
      v["speciality"]=v?.speciality?.map((val)=>val?.label)
      v["tags"]=v?.tags?.map((val)=>val?.label)
      v["facilityId"]=v?.facilityId?.map((val)=>val?.label)
     })
 setProvidersList(res);
 setFilterList(res);
  };



  useEffect(() => {
    headerlink([{name:"My Providers",link:"/outpatientpro/delegate/allproviders",active:true}])
    getAllProviders();
    
  }, [update]);

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div  
        onClick={() =>
          sessionStorage?.getItem("roleId") == 2
            ? navigate(
                `/outpatientpro/enterprise/doctors/details/${row?.userId}`
              )
            : navigate(
                `/outpatientpro/provider/facility/facilityprofile/${row?.userId}`
              )
        }
        >
          <span title={row?.name} className="pointer text-hover">
            {row?.firstName+ ' '+row?.lastName}
          </span>
          <br />
          <label >{row?.phone}</label>
        </div>
      ),
      sortable: true,
      width: "10rem",
      key:"firstName"
    },
    {
      name: "Providers Type",
      selector: (row) => (
        <div title={row?.name} className="pointer">
          {row?.roleName}
        </div>
      ),
      sortable: true,
      key:"roleName"
    },
    {
      name: "Specialty",
       selector: (row) => 
       {
        const labels = row?.speciality?.map((v) => v);
        
        if (labels) {
          if (labels?.length <= 2) {
            return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.join(", ")}</div>;
          } else {
            return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
          }
        } else {
          return "";
        }}
       
      ,
      sortable: true,
      key:"speciality",
      width: "9rem",
      subKey:"label"
    },

    {
      name: "Tags",
      selector: (row) => {
        const labels = row?.tags?.map((v) => v);
        if (labels) {
          if (labels?.length <= 2) {
            return <div title={labels} className="pointer  text-wrap">{labels?.join(", ")}</div>;
          } else {
            return <div title={labels} className="pointer  text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
          }
        } else {
          return "";
        }
      },
      sortable: true,
      key:"tags",
      subKey:"label"
      // width: "9rem",
    },
    {
      name: "Facility",
      selector: (row) =>
      {
        const labels = row?.facilityId?.map((v) => v);
        if (labels) {
          if (labels?.length <= 2) {
            return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.join(", ")}</div>;
          } else {
            return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
          }
        } else {
          return "";
        }
      },
   
      sortable: true,
      key:"facilityId",
      width: "15rem",
      subKey:"label"
    },

    {
      name: "Status",
      selector: (row) => (
        <div
          title="applicationSent"
          className="applicationSent"
          // {
          //   ((row?.status == "Application Sent" ||
          //     row?.status == "Applying (88%)") &&
          //     " pointer applicationSent  text-center  ") ||
          //   (row?.status == "Expired" && "expired    text-center pointer  ") ||
          //   (row?.status == "Privileged" &&
          //     "privileged    text-center pointer  ") ||
          //   (row?.status == "Archived" && "archived    text-center pointer  ") ||
          //   (row?.status == "Expiring (33 days)" &&
          //     "expiring    text-center pointer  ") ||
          //   (row?.status == "Board Review" &&
          //     "boardReview    text-center pointer  ")
          // }
          style={{ width: "136px" }}
        >
          Application Sent
        </div>
      ),
      sortable: true,
      width: "11rem",
    },

    {
      name:<div className=""  >Needs Attention</div>,
      selector: (row) => (
        <div
          style={{ width: "80px" }}
          title="8 Items"
          className={
         "  expired text-center    "
          }
        >
          8 Items
         
        </div>
      ),
      sortable: true,
      width: "8rem", 
    },

      {
      name:<div>Last Updated</div>,
      selector: (row) => <div title={moment(row?.updatedDate)?.format("MM/DD/YYYY")} className="">{moment(row?.updatedDate)?.format("MM/DD/YYYY")}</div>,
      sortable: true,
      width: "8rem", 
      key:"updatedDate"
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
  const initialPage = (setcurrent) => {
    setcurrent(1);
  };
  // const filterSearch = () => {
  //   return (
  //     <>
  //       <div className="password-container ">
  //         <input
  //           type="search"
  //           placeholder="Search by Name or NPI #..."
  //           className="header-search rounded search-input search-control bg-white"
  //           name="password"
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />
  //         <span className="search-icon ">{<MdSearch size={20} color="#878793"/>}</span>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className=" bg-white p-2">
        <div className="align-items-center justify-content-between d-flex p-3">
        <div className="f30 medium ">My Providers</div>
          <div className="col-3 px-2"> {filterSearch(setSearch, search)}</div>
        </div>

        
        <div className="row px-2" style={{ paddingTop: "32px" }}>
        <div className="col-md-9  d-flex pt-1">
          <div className="d-flex col-md-12" style={{ overflow: "scroll" }}>
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
              <div className="col-md-6 doc-list-dd doc-xl-dd">
                <select
                  className="form-select  m-0 doc-list-tab-dd"
                  onChange={handleChange("pageCount")}
                  style={{
                    height: "35px",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                  }}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <Table
            dataTable={providersList}
            columns={columns}
            search={search}
            pageCount={data?.pageCount}
            pageOne={initialPage}
          />
        </div>

        {isOpen && (
          <FilterList
            openModel={toggleDropdown}
            setList={setProvidersList}
            filterList={filterlist}
            setObj={setObj}
            obj={obj}
          />
        )}
      </div>
    </>
  );
};

export default AllProviders;
