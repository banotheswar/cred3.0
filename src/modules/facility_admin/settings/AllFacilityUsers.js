import React, { useEffect } from "react";
import { MdOutlineSendTimeExtension, MdToggleOff, MdToggleOn } from "react-icons/md";
import FacilityUserModal from "./models/FacilityUserModal";
import { useState } from "react";
import { urls } from "../../../api_services/url";
import {TableActionBoutton, filterSearch,getList, save,} from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { ListOfCards } from "../../../share_components/ListOfCards";
import Table from "../../../share_components/Table";
import moment from "moment";

const AllFacilityUsers = () => {
  const [search, setSearch] = useState("");
  const [facilityUserEdit, setFacilityUserEdit] = useState();
  const [update, setUpdate] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const {data, headerlink,handleChange } = UseFormValidations({});
 



  const getAllUsers = async () => {
    let jsonObjects = {
      userId: 0,
      roleId:sessionStorage?.getItem("roleId"),
      organizationId:sessionStorage.getItem("organizationId"),
      appointmentId:0
    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
    setUsersList(res);
  };

  const sendPassword = async (id) => {
    let jsonObjects = {
      userId: id,
    };
    await save(urls?.settings?.sendPassword, { jsonObjects });
  };
  const UserStatus = async (row) => {
    let jsonObjects = {
      userId: row?.userId,
      status: row?.status == "Active" ? "InActive" : "Active",
    };

    let res = await save(urls?.settings?.deleteUser, { jsonObjects });
    setUpdate(res);
  };

  useEffect(() => {
    headerlink(sessionStorage?.getItem("roleId")==2?
    [
      { name: "Settings", link: "/outpatientpro/enterprise/settings" },
      {
        name: "Users",
        link: "/outpatientpro/enterprise/settings/users",
        active: true,
      },
    ]:[
      { name: "Settings", link: "/outpatientpro/facility/settings" },
      {
        name: "Users",
        link: "/outpatientpro/facility/settings/users",
        active: true,
      },
    ]);
    getAllUsers();
  }, [update]);

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          className="link-hover"
          title={row?.userName}
          onClick={() => setFacilityUserEdit(row)}
        >
          {row?.userName}
        </div>
      ),
     sortable:true,
     key:"userName"
    },

    {
      name: "Enterprise Name",
      selector: (row) => <div title={row?.enterpriseName}>{row?.enterpriseName}</div>,
      sortable:true,
      key:"enterpriseName"
    },
    {
      name: "Email",
      selector: (row) => <div title={row?.email}>{row?.email}</div>,
      sortable:true,
      key:"email"
    },
    {
      name: "Role",
      selector: (row) => <div title={row?.roleName}>{row?.roleName}</div>,
      sortable:true,
      key:"roleName"
    },

    {
      name: "Last Login",
      selector: (row) => (
        <div>
          {row?.lastLoginTime ? moment(row.lastLoginTime).format("MM/DD/YYYY hh:mm A") : "-"}
        </div>
      ),
      sortable: true,
      key: "lastLoginTime"
    },
    

    {
      name: "Status",
      selector: (row) => (
        <div className="ms-1 pointer" onClick={() => UserStatus(row)}>
          {row.status == "Active" ? (
            <MdToggleOn title="Active" color="green" size={30} />
          ) : (
            <MdToggleOff title="InActive" color="#F4364C" size={30} />
          )}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Action",
      hide: "sm",
      selector: (row) => (
        // <>
        //   <div className="d-flex">
        //     <div title="Send Password" style={{ cursor: "pointer" }}>
        //       <TbSend
        //         onClick={() => sendPassword(row?.userId)}
        //         size={25}
        //         color="#999999"
        //         className="mb-1 me-1"
        //       />
        //     </div>
        //   </div>
        // </>
        <>
          {/* {TableActionBoutton([
            {
              name: "Send Password",
              modalName: sendPassword,
              value: row?.userId,
            },
          ])} */}
             {TableActionBoutton([
            {
              name: "Send Password",
              modalName: sendPassword,
              value: row?.userId,
              icon:  <MdOutlineSendTimeExtension  color="#0073EE" className="mb-1"  size={20 }/>
            },
          ])}
        </>
      ),
    },
  ];

  return (
    <div>
       <div className="show_header">
        
         <ListOfCards array={usersList||[]}  status={UserStatus} setFacilityUserEdit={setFacilityUserEdit} setModal={sendPassword} title={"Users"} name={"Users"}/>
         </div>
      <div className="vh-auto p-3 bg-white  mobile_Header">
        <div className="row px-2 py-3 ">
          <div className="settings-user col-xl-5 col-lg-4 col-md-2">Users</div>
          <div className="col-xl-3 col-lg-3 col-md-5 ">{filterSearch(setSearch, search)}</div>
          <div className="col-xl-1 col-lg-2 col-md-2  ">
            <div
              className="d-flex save_config  justify-content-center align-items-center save rounded pointer    "
              onClick={() => setFacilityUserEdit(true)}
            >
              + New User
            </div>
          </div>
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

        <Table dataTable={usersList} columns={columns} search={search} pageCount={data?.pageCount}/>
            
   
        {facilityUserEdit && (
          <FacilityUserModal
            show={facilityUserEdit}
            updateList={setUpdate}
            onHide={() => setFacilityUserEdit(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AllFacilityUsers;
