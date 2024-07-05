import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import ReactTable from "../../../../share_components/ReactTable";
import { filterSearch, getList, sortingTable, sortingTableNumbers } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import moment from "moment";
import Table from "../../../../share_components/Table";

const SelectProvider = ({settingDetailstate,provider,providerId,appName,profileData,setDetailsState,childObj}) => {
  const navigate = useNavigate();

    const [search, setSearch] = useState("");
  const [getSearchByUsers,setGetSearchByUsers] = useState()
    const [providersList, setProvidersList] = useState();
const {providerType,newappointment}= useParams()
  const {data,headerlink,handleChange ,setValues} = UseFormValidations({});
console?.log(data,"schgvjhdjkhfjkhfgjks",provider)


const getAllList = async () => {
  let jsonObjects = {
    userId: 0,
    type: provider,
  };
  let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
  setProvidersList(res);
};


      useEffect(()=>{
        getAllList()
      },[])

      const Redirect = (row)=>{
        navigate(`/outpatientpro/facility/appointment/reappointment/${provider}/${row?.userId}`)
        settingDetailstate("Select Facility(s)")
        setValues(row)
        childObj(row)

      }
      const initialPage=(setcurrent)=>{
        setcurrent(1)
      }
      const columns = [
        {
          name: "Name",
          selector: (row) => (
            <div
            onClick={() => Redirect(row)}
            // onClick={()=>settingDetailstate("Select Facility(s)")}
            >
              <span title={row?.userName} className="pointer text-hover  ">
                {row?.userName}
              </span>
              <br />
              <div className="phonefont">(630) 941-4301</div>
            </div>
          ),
          sortable: true,
          key:"userName",
          width: "11rem",
        },
        {
          name: "License Type",
          selector: (row) => (
            <div title={row?.licenseStateName} className="pointer "  onClick={() => navigate("/outpatientpro/facility/doctors/detailsdemo")}>
              {row?.licenseStateName}
            </div>
          ),
          sortable: true,
          key:"licenseStateName",

          width: "10rem",
        },
        {
          name: "Specialty",
          selector: (row) => {
            const labels = row?.speciality?.map((v) => v?.label);
            
            if (labels) {
              if (labels?.length <= 2) {
                return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.join(", ")}</div>;
              } else {
                return <div title={labels} className="pointer link-hover-line text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
              }
            } else {
              return "";
            }}
            // <div className="link-hover-line pointer " >
            //   {row?.speciality?.map((v,i)=>{
            //     return(
                
            //     <div>{v?.label} {i !== row.speciality.length - 1 ?", ":""}</div>
            //   )})}
            // </div>
          ,
          sortable: true,
          key:"speciality",

          width: "9rem",
        },
        {
          name: "Tags",
          selector: (row) => {
            const labels = row?.tags?.map((v) => v.label);
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

          // width: "9rem",
        },
        {
          name: "Facility",
          selector: (row) =>
          {
            const labels = row?.facilityId?.map((v) => v.label);
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
        //   (
        //   <div className="link-hover-line pointer " >
        //   {row?.facilityId?.map((v,i)=>{return(
        //     <div>{v?.label} {i !==  row.facilityId.length - 1 && ", "}</div>
        //   )})}
        // </div>),
        sortable: true,
        key:"facilityId",

          width: "15rem",
        },
        {
          name: "Status",
          selector: (row) => (
            <div
              title={row?.status}
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
              //  sortFunction: (a, b) => sortingTable(a, b, "status"),
              sortable: true,
          width: "11rem",
        },
        {
          name:<div className=""  >Needs Attention</div>,
          selector: (row) => (
            <div
              style={{ width: "80px" }}
              className={
             "  expired text-center    "
              }
            >
              8 Items
              {/* {row?.attention ? row?.attention : ""} */}
            </div>
          ),
         
          sortable: true,
          width: "8rem", 
        },
        {
          name:<div>Last Updated</div>,
          selector: (row) => <div className="">{moment(row?.updatedDate)?.format("MM/DD/YYYY")}</div>,
          sortable: true,
          key:"updatedDate",
          width: "8rem", 
        },
      ];




  
  
    return (
      <div className="">
     <div className=" p-2">    
       <div className="f22 medium ">Select a Provider</div>
       <div className="col-3 py-3">{filterSearch(setSearch,search)}</div>
       <Table
      
        dataTable={providersList||[]}
        columns={columns}
        search={search}
        type={["facilityId","speciality","tags"]}
          pageCount={data?.pageCount}
          pageOne={initialPage}

       
       />
     </div>
        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="btn btn-white border "
           
            onClick={() => navigate("/outpatientpro/facility/appointment")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          {/* <button
            className="btn btn-primary"
           
            onClick={()=>settingDetailstate("Select Facility(s)")}
          >

            Next: Select Facility(s)
          </button> */}
        </div>
      </div>
    );
  } ;export default SelectProvider