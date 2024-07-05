import React, { useEffect, useState } from "react";
import FiltersModal from "../modules/facility_admin/doctors/FiltersModal";
import FilterList from "../modules/facility_admin/doctors/FilterList";
import {
  TableActionBoutton,
  filterSearch,
  plusadd,
} from "../api_services/SharedServices";
import { BsFilterLeft } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { BiEdit, BiSend } from "react-icons/bi";
import Select from "react-select";
import { UseFormValidations } from "../validations/UseFormValidation";
import moment from "moment";
import ReactPaginate from "react-paginate";

export const ListOfCards = ({
  array,
  tabs,
  title,
  name,
  gotoForms,
  status,
  setModal,
  setFacilityUserEdit,
  pageCount,
  pege,
  searchMaster,
  masterName,
}) => {
  const [active, setActive] = useState([]);
  const [model, setModel] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [filterValues, setFilterValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data1, setData1] = useState([]);
  const curentperpage = 10;
  const lastindex = currentPage * curentperpage;
  const firstindex = lastindex - curentperpage;
  const records = data1.slice(firstindex, lastindex);
  const nopages = Math.ceil(data1.length / curentperpage);
  useEffect(() => {
    if (search != "" && search?.trim()) {
      let event = search?.trim();
      const filtered = array?.filter(
        (row) =>
          Object?.values(row)?.some((value) =>
            value?.toString()?.toLowerCase()?.includes(event?.toLowerCase())
          ) ||
          moment(row?.updatedDate)
            .format("MM/DD/YYYY")
            ?.toLowerCase()
            .includes(event?.toLowerCase()) ||
          row?.userName?.toLowerCase().includes(event?.toLowerCase()) ||
          (row?.firstName + " " + row?.lastName)
            ?.toLowerCase()
            .includes(event?.toLowerCase()) ||
          (pege == undefined &&
            Object?.values(
              row?.additionalData
                ? row?.additionalData[0]?.doctor || row?.additionalData[0]?.ahp
                : []
            )?.some((value) =>
              value?.toString()?.toLowerCase()?.includes(event?.toLowerCase())
            )) ||
          (pege == undefined &&
            Object?.values(
              row?.speciality ? row?.speciality?.map((v) => v?.label) : [""]
            )?.some((value) =>
              value?.toString()?.toLowerCase()?.includes(event?.toLowerCase())
            )) ||
          (pege == undefined &&
            Object?.values(
              row?.speciality ? row?.tags?.map((v) => v?.label) : [""]
            )?.some((value) =>
              value?.toString()?.toLowerCase()?.includes(event?.toLowerCase())
            )) ||
          (pege == undefined &&
            Object?.values(
              row?.speciality ? row?.facilityId?.map((v) => v?.label) : [""]
            )?.some((value) =>
              value?.toString()?.toLowerCase()?.includes(event?.toLowerCase())
            ))
      );

      setData1(filtered);
      setCurrentPage(1);
    } else {
      setData1(array);
    }
  }, [search, currentPage]);
  useEffect(() => {
    setFilterValues(records);
  }, [array, currentPage, pageCount, data1]);
  useEffect(() => {
    setData1(array);
  }, [array]);

  useEffect(() => {
    setSearch(searchMaster);
  }, [searchMaster]);
  console?.log(searchMaster, "searchMaster");
  const DoctorList = () => {
    
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        onClick={() =>
                          sessionStorage?.getItem("roleId") == 2
                            ? navigate(
                                `/outpatientpro/enterprise/doctors/details/${row?.userId}/${row?.fId}/${row?.appointmentId}`
                              )
                            : navigate(
                                `/outpatientpro/facility/doctors/details/${row?.userId}/${row?.fId}/${row?.appointmentId}`
                              )
                        }
                      >
                        <label className="f13">Name </label>
                        <div
                          className="f11 medium"
                          onClick={() =>
                            navigate(
                              `/outpatientpro/facility/doctors/details/${row?.userId}`
                            )
                          }
                        >
                          {row?.userName}
                        </div>
                      </div>
                      <div className="col-5 text-end">
                        <label>License Type</label>
                        <div className="f11 medium">
                        {row?.licenseType}
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-7">
                        <label>Speciality </label>
                        <div className="f11 medium">
                          {plusadd(row?.speciality)}
                        </div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Needs Attention</label>
                        <div className=" f11 medium expired  px-1">1 item</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col gap-2">
                        <label className="">Tags</label>
                        <div className="f11 medium">
                          {plusadd(row?.tags)}
                          
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-7">
                        <label>Facility </label>
                        <div className="f11 medium">
                        {row?.facilityName}
                        </div>
                    
                      </div>
                      <div className="col-5 text-end">
                        <label>Status</label>
                        <div
                          className={
                            "pointer applicationSent  text-center  f11 medium"
                            // ((row?.status == "Application Sent" ||
                            //   row?.status == "Applying (88%)") &&
                            //   " pointer applicationSent  text-center  f13 medium") ||
                            // (row?.status == "Expired" &&
                            //   "expired    text-center pointer f13 medium ") ||
                            // (row?.status == "Privileged" &&
                            //   "privileged    text-center pointer f13 medium ") ||
                            // (row?.status == "Archived" &&
                            //   "archived    text-center pointer f13 medium ") ||
                            // (row?.status == "Expiring (33 days)" &&
                            //   "expiring    text-center pointer f13 medium ") ||
                            // (row?.status == "Board Review" &&
                            //   "boardReview    text-center pointer f13 medium ")
                          }
                        >
                          {/* {row?.status} */}Application Sent
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col  gap-2">
                        <label className="">Last Update</label>
                        <div className="f11 medium">
                        {moment(row?.updatedDate)?.format("MM/DD/YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const ActivityLogList = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div className="col-12">
                        <div className="f13  medium">Action </div>
                        <label className="f11">{row?.action}</label>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-7">
                        <div className=" f13  medium">Initiated by </div>
                        <label className="f11">{row?.initiated}</label>
                      </div>
                      <div className="col-5 text-end">
                        <div className="f13 medium">Provider</div>
                        <label className="f11 "> {row?.provider}</label>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-5">
                        <div className="f13 medium ">Facility User </div>
                        <label className="f11">{row?.user}</label>
                      </div>
                      <div className="col-7 text-end">
                        <div className="f13 medium">Date & Time</div>
                        <label className=" f11">
                          {moment(row?.logDate)?.format("MM/DD/YYYY,h:mm A")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const Notifications = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div className="col-7">
                        <label>Type </label>
                        <div className="f14 medium">{row?.type}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Status </label>
                        <div
                          className={
                            ((row?.status == "Application Sent" ||
                              row?.status == "Applying (88%)") &&
                              " pointer applicationSent  text-center  f13 medium") ||
                            (row?.status == "Expired" &&
                              "expired    text-center pointer f13 medium ") ||
                            (row?.status == "Privileged" &&
                              "privileged    text-center pointer f13 medium ") ||
                            (row?.status == "Archived" &&
                              "archived    text-center pointer f13 medium ") ||
                            (row?.status == "Expiring (33 days)" &&
                              "expiring    text-center pointer f13 medium ") ||
                            (row?.status == "Board Review" &&
                              "boardReview    text-center pointer f13 medium ")
                          }
                        >
                          {row?.status}
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-7">
                        <label>Message</label>
                        <div className=" f13 medium">{row?.details}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Provider Name</label>
                        <div className=" f13 medium">{row?.provider}</div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-5">
                        <label>Provider Type </label>
                        <div className="f14 medium">{row?.providerType}</div>
                      </div>
                      <div className="col-7 text-end">
                        <label>Date & Time</label>
                        <div className="f14 medium">{row?.datetime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const Master = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        onClick={() =>
                          navigate("/outpatientpro/facility/doctors/details")
                        }
                      >
                        <label>Name </label>
                        <div className="f14 medium">{row?.name}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Action</label>
                        <div className="row justify-content-end">
                          {" "}
                          <div
                            className="pointer col-6"
                            onClick={() => status(row)}
                          >
                            {row?.status == "Active" ? (
                              <MdToggleOn
                                title="Active"
                                color="green"
                                size={30}
                              />
                            ) : (
                              <MdToggleOff
                                title="InActive"
                                color="#F4364C"
                                size={30}
                              />
                            )}
                          </div>
                          <div className="col-3">
                            {" "}
                            {
                              <BiEdit
                                className=""
                                color="#0073EE"
                                size={20}
                                onClick={() => setModal(row)}
                              />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {masterName == "License Type" && (
                      <div className="row py-1">
                        <div
                          className="col-7"
                          onClick={() => setFacilityUserEdit(row)}
                        >
                          <label>Credential Type </label>
                          <div className="f14 medium">
                            {row?.additionalData &&
                              row?.additionalData?.length > 0 &&
                              row?.additionalData?.map((v) => {
                                return v?.credentialType;
                              })}
                          </div>
                        </div>
                        <div className="col-5 text-end">
                          <label>Category</label>
                          <div className="f14 medium">
                            {row?.additionalData &&
                              row?.additionalData?.length > 0 &&
                              row?.additionalData?.map((v) => {
                                return v?.category;
                              })}
                          </div>
                        </div>
                      </div>
                    )}
                    {masterName == "Health Document" && (
                      <div className="row py-1">
                        <div
                          className="col-7"
                          onClick={() => setFacilityUserEdit(row)}
                        >
                          <label>Credential Type </label>
                          <div className="f14 medium">
                            {row?.additionalData &&
                              row?.additionalData?.length > 0 &&
                              row?.additionalData?.map((v) => {
                                return v?.credentialType;
                              })}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className=" d-flex justify-content-end">
                      {/* {TableActionBoutton([{name:"Edit",modalName:setModal,value:row,icon:<BiEdit className=''  color='#0073EE' size={20}/>}])} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const RoleMaster = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        onClick={() =>
                          navigate("/outpatientpro/facility/doctors/details")
                        }
                      >
                        <label>Name </label>
                        <div className="f14 medium">{row?.roleName}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Action</label>
                        <div className="row justify-content-end">
                          {" "}
                          <div className="col-3">
                            {" "}
                            {
                              <BiEdit
                                className=""
                                color="#0073EE"
                                size={20}
                                onClick={() => setModal(row)}
                              />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-end">
                      {/* {TableActionBoutton([{name:"Edit",modalName:setModal,value:row,icon:<BiEdit className=''  color='#0073EE' size={20}/>}])} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Users = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        onClick={() => setFacilityUserEdit(row)}
                      >
                        <label>Name </label>
                        <div className="f14 medium">
                          {row?.firstName + " " + row?.lastName}
                        </div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Role</label>
                        <div className="f14 medium">{row?.roleName}</div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-7">
                        <label>Email </label>
                        <div className="f14 medium">{row?.email}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label>Last Login</label>
                        <div className=" f13  px-1">-</div>
                      </div>
                    </div>

                    <div className="row py-1">
                      <div className="col-7 ">
                        <label>status</label>
                        <div className="pointer" onClick={() => status(row)}>
                          {row?.status == "Active" ? (
                            <MdToggleOn
                              title="Active"
                              color="green"
                              size={30}
                            />
                          ) : (
                            <MdToggleOff
                              title="InActive"
                              color="#F4364C"
                              size={30}
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-5 text-end  ">
                        <label>Send Password</label>
                        {
                          <BiSend
                            className=""
                            color="#0073EE"
                            size={20}
                            onClick={() => setModal(row?.userId)}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Organization = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-12"
                        onClick={() => setFacilityUserEdit(row)}
                      >
                        <label>Organization Name </label>
                        <div className="f14 medium">
                          {row?.organizationName}
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                     
                    
                    </div>

                    <div className="row py-1">
                    <div className="col-9 ">
                        <label>Address</label>
                        <div className="f14 medium text-wrap">{row?.address}</div>
                      </div>
                      <div className="col-3 ">
                        <label>Status</label>
                        <div className="pointer " onClick={() => status(row)}>
                          {row?.status == "Active" ? (
                            <MdToggleOn
                              title="Active"
                              color="green"
                              size={30}
                            />
                          ) : (
                            <MdToggleOff
                              title="InActive"
                              color="#F4364C"
                              size={30}
                            />
                          )}
                          <BiEdit color="#0073EE" className="ms-2" size={20} />
                        </div>
                        <div></div>
                      </div>

                      {/* <div className="col-5 text-end  ">
                        <label>Action</label>
                       
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const MyFacilities = () => {
    return (
      <>
        {array &&
          array?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        onClick={() =>
                          navigate(
                            "/outpatientpro/provider/facility/facilityprofile"
                          )
                        }
                      >
                        <label>Facility Name </label>
                        <div className="f14 medium">{row?.facilityName}</div>
                      </div>
                      <div className="col-5 text-end">
                        <label># of Providers</label>
                        <div className="f14 medium">{row?.ofproviders}</div>
                      </div>
                    </div>
                    <div className="row py-1 ">
                      <div className="col-6">
                        <label>Appts In Progress </label>
                        <div className=" f13 medium applicationSent    px-1">
                          {row?.inprogress}
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <label>Appts Expiring</label>
                        <div className=" f13 medium expiring   px-1">
                          {row?.expiring}
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-6 ">
                        <label className="">Appts Expired</label>
                        <div className=" f13 medium expired  px-1">
                          {row?.expired}
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <label className="">Board Review</label>
                        <div className=" f13 medium boardReview  px-1">
                          {row?.review}
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-6 ">
                        <label className="">Need Attentions</label>
                        <div className=" f13 medium expiring   px-1">
                          {row?.attention}
                        </div>
                      </div>

                      <div className="col-6 text-end">
                        <label className="">Last Updated</label>
                        <div className=" px-2">{row?.lastUpdated}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const ItemsRequiringAttention = () => {
    return (
      <>
        {filterValues &&
          filterValues?.map((row) => {
            return (
              <div class="col-md-4 mt-2">
                <div
                  class="card "
                  style={{
                    background: "#EFF2F49B 0% 0% no-repeat padding-box",
                  }}
                >
                  <div class="card-body">
                    <div className="row py-1">
                      <div
                        className="col-7"
                        // onClick={() =>
                        //   navigate("/outpatientpro/facility/doctors/details")
                        // }
                        onClick={() => gotoForms(row?.userId,row?.facilityId,row?.appointmentId,row)}
                      >
                        <label>Item Name </label>
                        <div className="f14 medium"> {row?.formName} </div>
                      </div>
                      <div className="col-5 text-end">
                        <label> Type</label>
                        <div className="f14 medium">{row?.type}</div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-12">
                        <label>Message/Status </label>
                        <div className="f14 medium">{row?.message}</div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-12">
                        <label>Facility</label>
                        <div className=" f14  medium ">{row?.facilityName}</div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-8">
                        <label className="">Date Sent</label>
                        <div className="f14 medium"> {moment(row?.createDate)?.format("MM/DD/YYYY ")}</div>
                      </div>
                      <div className="col-4 text-end">
                        <label className="">Action</label>
                        <div
                          className="f13 medium border rounded text-center text-white "
                          style={{ background: "rgba(58, 57, 82, 0.8)" }}
                        >
                          {row?.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const cards = () => {
    switch (name) {
      case "DoctorList":
        return DoctorList();
      case "ActivityLogList":
        return ActivityLogList();
      case "Notifications":
        return Notifications();
      case "Master":
        return Master();
      case "Users":
        return Users();
      case "MyFacilities":
        return MyFacilities();
      case "ItemsRequiringAttention":
        return ItemsRequiringAttention();
      case "RoleMaster":
        return RoleMaster();
      case "Organization":
        return Organization();
    }
  };
  const pageChange2 = (event) => {
    setCurrentPage(event.selected + 1);
  };
  console?.log(filterValues, "array");
  return (
    <div className=" row bg-white px-3 ">
      <div className="pb-4 ">
        <div className="d-flex flex-wrap justify-content-between align-items-center paddingTop">
          {name != "Master" && name != "RoleMaster" && (
            <div className="col f20mobile mb-2 medium ">{title}</div>
          )}
          {name == "Users" && (
            <div
              className="d-flex  col-auto  justify-content-center align-items-center p-2 mb-1 bg-primary text-white f13 rounded pointer    "
              onClick={() => setFacilityUserEdit(true)}
            >
              + New User
            </div>
          )}
              {name == "Organization" && (
            <div
              className="d-flex  col-auto  justify-content-center align-items-center p-2 mb-1 bg-primary text-white f13 rounded pointer    "
              onClick={() => setFacilityUserEdit(true)}
            >
              + Add
            </div>
          )}
        </div>

        <div className="col- pb-2">
          {/* {tabs && (
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="form-control"
            >
              {tabs?.map((tab, index) => (
                <option key={index} value={tab.name}>
                  {tab.name}
                </option>
              ))}
            </select>
          )} */}
          {name != "Master" && name != "RoleMaster" && (
            <div className=" ">{filterSearch(setSearch, search)}</div>
          )}
        </div>

        {
          <div className="d-flex justify-content-between gap-3 ">
            {tabs && (
              <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="form-select "
              >
                {tabs.map((tab, index) => (
                  <option key={index} value={tab.name}>
                    {tab.name}
                  </option>
                ))}
              </select>
            )}
            {/* {name != "Master" &&<div className="col">{filterSearch(setSearch,search)}</div>} */}

            {name != "ActivityLogList" &&
              name != "Master" &&
              name != "Users" &&
              name != "RoleMaster" &&  name != "Organization" && (
                <div
                  className="   border border-white f13 mt-1"
                  onClick={() => setModel(true)}
                >
                  <BsFilterLeft size={20} className="  " />
                  More Filters
                </div>
              )}
          </div>
        }

        <div class="row">{cards()}</div>
      </div>
      {model && <FiltersModal show={model} onHide={() => setModel(false)} />}
      <div
        className="d-flex flex-wrap  col-md-12"
        style={{ overflow: "scroll" }}
      >
        <ReactPaginate
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          nextLabel={<IoIosArrowForward />}
          onPageChange={pageChange2}
          pageRangeDisplayed={2}
          className="pagination col-12 w-100 d-flex align-items-center justify-content-center"
          pageCount={nopages}
          previousLabel={<IoIosArrowBack />}
          renderOnZeroPageCount={null}
        />
      </div>
      <div className="d-flex align-items-center justify-content-center">
     
        Showing {currentPage} to {firstindex + 1}-
        {filterValues?.length >= 10 ? lastindex : data1?.length} of{" "}
        {data1?.length} entries
      </div>
    </div>
  );
};
