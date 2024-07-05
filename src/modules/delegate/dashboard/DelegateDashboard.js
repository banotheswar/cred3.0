import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import SmallTable from "../../../share_components/SmallTable";
import { useNavigate, useParams } from "react-router-dom";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";

const DelegateDashboard = () => {
  const { headerlink } = UseFormValidations({});
  const navigate=useNavigate()
  const { providerId } = useParams();
  const [providersList, setProvidersList] = useState([]);
  const [update, setUpdate] = useState([]);

  const getAllProviders = async () => {
    let jsonObjects = {
      userId: 0,
      delegateId:sessionStorage.getItem("userId")

    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
    res?.map((v)=>{
      v["speciality"]=v?.speciality?.map((val)=>val?.label)
      v["facilityId"]=v?.facilityId?.map((val)=>val?.label)
     })
 setProvidersList(res);
  };



  useEffect(() => {
    headerlink([{name:"My Providers",link:"/outpatientpro/delegate/allproviders",active:true}])
    getAllProviders();
    
  }, [update]);

  

  const circledata = [
    { number: "3", name: "FACILITY REQUESTS" },
    { number: "5", name: "CREDENTIALS" },
  ];
  const circledata1 = [
    { number: "2", name: "HEALTH DOCUMENTS" },
    { number: "1", name: "SIGNATURE REQUESTS" },
  ];
  const circledata2 = [
    { number: "AM", name: "Acme Medical Center" },
    { number: "CM", name: "California Medical Group" },
    { number: "GS", name: "Ghozland Surgery Center" },
    { number: "IH", name: "Irvine Health Partners" },
    { number: "HB", name: "Huntington Beach Medical Partners" },

  ];

  const columns = [
    {
      name: "Name",

      selector: (row) => (
        <div
          className="link-hover"
          // onClick={sessionStorage?.getItem("roleId")!=1?()=> navigate("/outpatientpro/facility/dashboard/applicationinprogress"):()=> navigate("/outpatientpro/admin/dashboard/applicationinprogress")}
        >
          {row?.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Provider",
      selector: (row) => (
        <div className="text-wrap" title={row.provider}>
          {row?.provider}
        </div>
      ),
    },
    {
      name: "Days to Exp",
      selector: (row) => (
        <div className="text-wrap" title={row.daysExp}>
          {row?.daysExp}
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <div
          className="border bg-secondary text-center text-white rounded "
          style={{ width: "4rem" }}
        >
          {row?.status}
        </div>
      ),

      sortable: true,
    },

    ,
  ];

  const datakeys = [
    {
      name: "ACLS Certification",
      provider: "Orange County Surgical",
      daysExp: "2",
      status: "Update",
    },

    {
      name: "CA State Medical License",

      provider: "Orange County Surgical",
      daysExp: "7",
      status: "Update",
    },

    {
      name: "Surgical License XYZ",
      provider: "Ghozland Surgery Center",
      daysExp: "22",
      status: "Update",
    },

    {
      name: "Board Certification",
      provider: "Orange County Surgical",
      daysExp: "48",
      status: "Update",
    },

    {
      name: "Other License",
      provider: "Orange County Surgical",
      daysExp: "89",
      status: "Update",
    },
  ];

  useEffect(() => {
    headerlink([
      {
        name: "Dashboard",
        link: "/outpatientpro/delegate/alldashboard",
        active: true,
      },
    ]);
  }, []);
  return (
    <>
      <div className="bg-white">
        <h5 className="p-3">My Dashboard</h5>
      </div>
      <div className="d-flex gap-3  ">
        <div className="row col-md-4 bg-white">
          <div className="f22 col-md-12 p-3">Needs Attention (11) </div>

          <div className=" d-flex gap-4  align-items-center justify-content-center">
            {circledata?.map((v) => {
              return (
                <div className="col-md-4 d-flex justify-content-around ">
                  <div
                    className="   "
                    style={{ height: "163px", width: "163px" }}
                  >
                    <CircularProgressbarWithChildren
                      value={v?.number}
                      strokeWidth={3}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "#B72520",
                        trailColor: "gold",
                      })}
                    >
                      <div
                        className=""
                        style={{ fontSize: "48px", marginTop: "-18px" }}
                      >
                        {v?.number}
                      </div>
                      <div
                        className="f14 "
                        style={{
                          opacity: "70%",
                          textAlign: "center",
                          maxWidth: "80%",
                        }}
                      >
                        {v?.name}{" "}
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
              );
            })}
          </div>

          <div className=" d-flex gap-4  align-items-center  justify-content-center">
            {circledata1?.map((v) => {
              return (
                <div className="col-md-4 d-flex justify-content-around ">
                  <div
                    className="   "
                    style={{ height: "163px", width: "163px" }}
                  >
                    <CircularProgressbarWithChildren
                      value={v?.number}
                      strokeWidth={3}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "#B72520",
                        trailColor: "gold",
                      })}
                    >
                      <div
                        className=""
                        style={{ fontSize: "48px", marginTop: "-18px" }}
                      >
                        {v?.number}
                      </div>
                      <div
                        className="f14 "
                        style={{
                          opacity: "70%",
                          textAlign: "center",
                          maxWidth: "80%",
                        }}
                      >
                        {v?.name}{" "}
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" col-md-8 bg-white">
          <div className="f22 col-md-12 p-3">Expiring Credentials (5)</div>

          <SmallTable dataTable={datakeys} columns={columns} />
        </div>
      </div>

      <div className="bg-white mt-2">
        <div className="f22 col-md-12 p-3">My Providers </div>
        <div className=" row">
          <div className=" d-flex col-md-12 p-4 gap-5   ">
            {providersList?.map((v) => {
              return (
                <div className="col-auto   ">
             
                    <div
                      className="circle-container"
                      value={v?.firstName}
                      strokeWidth={3}
                    >
                      <div
                        className=" d-flex align-items-center justify-content-center"
                        style={{ fontSize: "30px",}}
                      >
                     {v?.firstName?.charAt(0)} {v?.lastName?.charAt(0)}
                      </div>
                    </div>
                    <div className="f17 pointer d-flex align-items-center justify-content-center"
                      // onClick={()=> navigate("/outpatientpro/delegate/alldelegatefacility")}
                      onClick={() =>
                        navigate(`/outpatientpro/provider/facility/facilityprofile/${v?.providerId}`)
                      }
                      
                      
                      
                      >
                      <u>{v?.enterpriseName} </u>
                    </div>
                    <div className="f14 d-flex align-items-center justify-content-center">
                      Privileged 
                    </div>
               
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DelegateDashboard;
