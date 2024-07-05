
import React, { useEffect, useState } from "react";
import FacilityLocationCreateModal from "./models/FacilityLocationCreateModal";
import {
  TableActionBoutton,
  commonTable,
  filterSearch,
  getList,
  phoneFormat,
  save,
  usphoneFormat,
} from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { urls } from "../../../api_services/url";
import Table from "../../../share_components/Table";
import { MdOutlineSendTimeExtension } from "react-icons/md";

const AllFacilityLocation = () => {
  const [facilityLocation, setFacilityLocation] = useState("");
  const [update, setUpdate] = useState([]);
  const { data, headerlink, handleChange } = UseFormValidations({});
  const [allFacility, setAllFacility] = useState([]);
  const [search, setSearch] = useState("");



const allFacilityLocation=async()=>{
  let jsonObjects={facilityId:0,
    organizationId:sessionStorage.getItem("organizationId"),
    type:"Location",
    userId:sessionStorage.getItem("userId")
   }
   let path=sessionStorage.getItem("roleId")==4?urls?.doctor.getLocationsById:urls?.settings?.getStatesdd
  let res=await getList(path,{jsonObjects})
  setAllFacility(res)
}
  useEffect(() => {
    headerlink(
      sessionStorage?.getItem("roleId") == 2
        ? [
            { name: "Settings", link: "/outpatientpro/enterprise/settings" },
            {
              name: "Location",
              link: "/outpatientpro/enterprise/settings/location",
              active: true,
            },
          ]
        : [
            { name: "Settings", link: "/outpatientpro/facility/settings" },
            {
              name: "Location",
              link: "/outpatientpro/facility/settings/location",
              active: true,
            },
          ]
    );
    allFacilityLocation();
  }, [update]);

  const columns = [
    {
      name: "Location Name",
      selector: (row) => (
        <div
          className="link-hover-line"
          title={row?.facilityName}
          onClick={() => setFacilityLocation(row?.facilityId)}
        >
          {row?.facilityName} [{row?.abbreviation} ] {row?.isMainLocation=="yes"&&<label className="f14" >(Main location)</label>}
        </div>
      ),
      sortable: true,
      key: "facilityName",
      width: "25rem",
    },


    {
      name: (
        <div>
          Office Manager /<br />
          Administrator
        </div>
      ),
      selector: (row) => (
        <div title={row?.managerLastName}>
          {row?.managerFirstName} {row?.managerLastName}{" "}
        </div>
      ),
      sortable: true,
      key: "managerFirstName",
    },
    {
      name: "Address",
      selector: (row) => <div title={row?.address}>{row?.address}</div>,
      sortable: true,
      key: "address",
    },
    {
      name: "Phone",
      selector: (row) => (
        <div title={usphoneFormat(row?.phone)}> {usphoneFormat(row?.phone)}</div>
      ),
      sortable: true,
      key: "phone",
      width: "9rem",
    },
    {
      name: "Email",
      selector: (row) => <div title={row?.email}>{row?.email}</div>,
      sortable: true,
      key: "email",
    },
    {
      name: "Fax",
      selector: (row) => <div title={usphoneFormat(row?.fax)}> {usphoneFormat(row?.fax)}</div>,
      sortable: true,
      key: "fax",
      width: "9rem",
    },
  ];
  return (
    <div>
      <div className="vh-auto p-3 bg-white  mobile_Header">
        <div className="row px-2 py-3 ">
          <div className="col-xl-5 col-lg-10 col-md-8">
            <div className="settings-locations">Locations</div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-5 ">
            {filterSearch(setSearch, search)}
          </div>
          {sessionStorage?.getItem("roleId") != 4 && (
            <div className="col-xl-1 col-lg-2 col-md-4">
              <div
                className="button-user d-flex align-items-center justify-content-center p-2 text-white rounded pointer"
                onClick={() => setFacilityLocation("0")}
                style={{background:"#00B948"}}
              >
               Add Location
              </div>
            </div>
          )}
             {sessionStorage?.getItem("roleId") == 4 && (<div className="col-xl-1 col-lg-2 col-md-4"></div>)}
        

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex gap-3 justify-content-end">
            <div className="  f14 medium mt-2" style={{ color: "#3A3952" }}>
              Show
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 ">
              <select
                onChange={handleChange("pageCount")}
                className="form-select  m-0 "
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
        <Table
          dataTable={allFacility}
          columns={columns}
          search={search}
          pageCount={data?.pageCount}
        />

        {facilityLocation && (
          <FacilityLocationCreateModal
            show={facilityLocation}
            updateList={setUpdate}
            onHide={() => setFacilityLocation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AllFacilityLocation;
