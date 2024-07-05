import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterSearch, getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import { BsFilterLeft } from "react-icons/bs";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import Table from "../../../share_components/Table";
import FilterList from "../doctors/FilterList";
import { ListOfCards } from "../../../share_components/ListOfCards";
import moment from "moment";
const AlliedHealthListing = () => {
  const [filterlist, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [AaHPList, setAHPList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [filters, setFilters] = useState();
  const [update, setUpdate] = useState([]);
  const navigate = useNavigate();
  const { data, headerlink, handleChange } = UseFormValidations({});
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("All Doctors");
  const filtertabs = [
    { name: "All Allied Health" },
    { name: "Privileged" },
    { name: "Applying" },
    { name: "Appt Expiring" },
    { name: "Appt Expired" },
    { name: "Credentials Expiring" },
    { name: "Credentials Expired" },
    { name: "Board Review" },
    { name: "Archived" },
  ];
  const [obj,setObj]=useState({})
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const getAllProviders = async () => {
    let jsonObjects = {
      userId: 0,
      type: "ahp",
      roleId:sessionStorage?.getItem("roleId"),
      organizationId:sessionStorage.getItem("organizationId"),
      appointmentId:"0"
    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
    res?.map((v)=>{
      v["speciality"]=v?.speciality?.map((val)=>val?.label)
      v["tags"]=v?.tags?.map((val)=>val?.label)
      v["facilityId"]=v?.facilityId?.map((val)=>val?.label)
     })
    setAHPList(res);
    setFilterList(res)
  };

  const getSpecialityList = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    // setSpecialityList(res);
  };

  useEffect(() => {
    getSpecialityList();
  }, []);

  useEffect(() => {
    // headerlink([{ name: "All Providers", link: "/outpatientpro/facility/alliedHealth" },
    //   {
    //     name: "AHP",
    //     link: "/outpatientpro/facility/alliedHealth",
    //     active: true,
    //   }],)
    headerlink(sessionStorage?.getItem("roleId")==2?[
      { name: "All Providers", link: "/outpatientpro/enterprise/alliedhealth" },
      {
        name: "AHP",
        link: "/outpatientpro/enterprise/alliedhealth",
        active: true,
      },
    ]:[
      { name: "All Providers", link: "/outpatientpro/facility/alliedhealth" },
      {
        name: "AHP",
        link: "/outpatientpro/facility/alliedhealth",
        active: true,
      },
    ]);
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
                `/outpatientpro/enterprise/alliedhealth/details/${row?.userId}/${row?.fId}/${row?.appointmentId}`
              )
            : navigate(
                `/outpatientpro/facility/alliedhealth/details/${row?.userId}/${row?.fId}/${row?.appointmentId}`
              )
        }
        >
          <span title={row?.userName} className="pointer text-hover  ">
            {row?.userName}
          </span>
          <br />
          <div className="phonefont">(630) 941-4301</div>
        </div>
      ),
      sortable: true,
      width: "11rem",
      key:"userName"
    },
    {
      name: "License Type",
      selector: (row) => (
        <div >
        <span title= {row?.licenseType} className="pointer ">
        {row?.licenseType}
        </span>
        {/* <br />
        <div className="phonefont p-0 ">{`[${row?.appointmentType}]`}</div>
        */}
        
      </div>
      ),
      sortable: true,
      key: "licenseStateName",
      width: "11rem",
      key:"userName"
    },
    {
      name: "Specialty",
      selector: (row) => {
        const labels = row?.speciality?.map((v) => v);

        if (labels) {
          if (labels?.length <= 2) {
            return (
              <div title={labels} className="pointer link-hover-line text-wrap">
                {labels?.join(", ")}
              </div>
            );
          } else {
            return (
              <div title={labels} className="pointer link-hover-line text-wrap">
                {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
              </div>
            );
          }
        } else {
          return "";
        }
      },
      sortable: true,
      width: "9rem",
      key:"speciality",
      subKey:"label"
    },
    {
      name: "Tags",
      selector: (row) => {
        const labels = row?.tags?.map((v) => v);
        if (labels) {
          if (labels?.length <= 2) {
            return (
              <div title={labels} className="pointer  text-wrap">
                {labels?.join(", ")}
              </div>
            );
          } else {
            return (
              <div title={labels} className="pointer  text-wrap">
                {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
              </div>
            );
          }
        } else {
          return "";
        }
      },
      sortable: true,
      // width: "9rem",
      key:"tags",
      subKey:"label"
    },
    {
      name: "Facility",
      selector: (row) => <div title={row?.facilityName} className="pointer">{row?.facilityName}</div>,
      //   {
      //   const labels = row?.facilityId?.map((v) => v);
      //   if (labels) {
      //     if (labels?.length <= 2) {
      //       return (
      //         <div title={labels} className="pointer link-hover-line text-wrap">
      //           {labels?.join(", ")}
      //         </div>
      //       );
      //     } else {
      //       return (
      //         <div title={labels} className="pointer link-hover-line text-wrap">
      //           {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
      //         </div>
      //       );
      //     }
      //   } else {
      //     return "";
      //   }
      // },
      sortable: true,
      width: "15rem",
      key:"facilityId",
      subKey:"label"
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <div
    //       title={row?.status}
    //       className={
    //         ((row?.status == "Application Sent" ||
    //           row?.status == "Applying (88%)") &&
    //           " pointer applicationSent  text-center  ") ||
    //         (row?.status == "Expired" && "expired    text-center pointer  ") ||
    //         (row?.status == "Privileged" &&
    //           "privileged    text-center pointer  ") ||
    //         (row?.status == "Archived" &&
    //           "archived    text-center pointer  ") ||
    //         (row?.status == "Expiring (33 days)" &&
    //           "expiring    text-center pointer  ") ||
    //         (row?.status == "Board Review" &&
    //           "boardReview    text-center pointer  ")
    //       }
    //       style={{ width: "136px" }}
    //     >
    //       {row?.status}
    //     </div>
    //   ),
    //   sortable: true,
    //   width: "11rem",
    // },
    {
      name: "Status",
      selector: (row) => (
        <div>
        <span
          title="applicationSent"
          className="applicationSent "
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
          {row?.appointmentStatus}
       </span>
        
        {/* <div className="phonefont text-center py-1" >{`${row?.appointmentType}`}</div> */}
        <div className="phonefont text-center py-1">
        <div className="phonefont text-center py-1">
  {row?.appointmentType === "Onboarding" ? "Existing" : row?.appointmentType === "Initial Appointment" ? "Initial" : row?.appointmentType}
</div>

</div>
        </div>
      ),
      sortable: true,
      width: "11rem",
    },
    {
      name: <div className="">Needs Attention</div>,
      selector: (row) => (
        <div style={{ width: "80px" }} title="8 Items" className={"  expired text-center    "}>
         {row?.needsAttention} Items
         
        </div>
      ),
      sortable: true,
      width: "8rem",
    },
    {
      name: <div>Last Updated</div>,
      selector: (row) => (
        <div className="" title={moment(row?.updatedDate)?.format("MM/DD/YYYY")}>{moment(row?.updatedDate)?.format("MM/DD/YYYY")}</div>
      ),
      sortable: true,
      width: "8rem",
      key:"updatedDate"
    },
  ];

  const initialPage=(setcurrent)=>{
    setcurrent(1)
  }
  return (
    <>
      <div className="show_header">
        {" "}
        <ListOfCards
          array={AaHPList}
          tabs={filtertabs}
          title={"Allied Health"}
          name={"DoctorList"}
        />
      </div>

      <div className="bg-white px-4 mobile_Header">
        <div className="row px-3 " style={{ paddingTop: "32px" }}>
          <div className="col-xl-9  col-md-8">
            <div className="f30 medium ">Allied Health Professional</div>
          </div>
          <div className="col-xl-3 col-md-4 px-2">
            {filterSearch(setSearch, search)}
          </div>
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

        <div
          style={{
            width: "auto",
            overflow: "scroll",
            paddingTop: "25px",
            paddingLeft: "8px",
          }}
        >
          <Table
            dataTable={AaHPList || []}
            columns={columns}
            pageCount={data?.pageCount}
            search={search}
            pageOne={initialPage}
           />
          
        </div>

        {isOpen && <FilterList openModel={toggleDropdown} 
         setList={setAHPList}
         filterList={filterlist}
        setObj={setObj}
        obj={obj}
        
        />}
      </div>
    </>
  );
};
export default AlliedHealthListing;
