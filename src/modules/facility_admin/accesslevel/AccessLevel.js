


import React, { useEffect, useState } from "react";
import Table from "../../../share_components/Table";
import { TableActionBoutton, filterSearch, getList } from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { urls } from "../../../api_services/url";
import { ListOfCards } from "../../../share_components/ListOfCards";
import { useNavigate } from "react-router-dom";

const AccessLevel = () => {
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const navigate=useNavigate()

  // const getAllUsers = async () => {
  //   let jsonObjects = {
  //     userId: 0,
  //     roleId: sessionStorage.getItem("roleId"),
  //   };
  //   let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
  //   setUsersList(res);
  // };

  const getRolesList = async () => {
    let jsonObjects = {
      type: "Role",
      filterType: "AccessLevel"
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setRolesList(res)
  };

  const { data,headerlink, handleChangeSearch } = UseFormValidations({});
  useEffect(() => {
    headerlink([
      {
        name: "Access Level",
        link: "/outpatientpro/enterprise/accesslevel",
        active: true,
      },
    ]);
    getRolesList();
  }, []);
  const columns = [


    {
        name: "Role Name",
        selector: (row) => (
          <div className="pointer" title={row?.roleName}>
            {row?.roleName}
          </div>
        ),
        sortable: true,
        key: "roleName",
      },

    {
      name: "Action",
     
      selector: (row) => (

        <>
        {TableActionBoutton([
          {
            name: "Edit",
            modalName:()=>{navigate(`/outpatientpro/enterprise/accesslevel/all/${row?.roleId}`)},
            value: row,
            icon: <BiEdit className="" color="#0073EE" size={20} />,
           
          },
        ])}
      </>
      ),
   


      width: "15rem",
    },
  ];

//   useEffect(() => {
//     getRolesList();
//   }, [update, data?.type]);

  return (
    <>
      <div className=" row p-3 bg-white ">
        <div className="col-xl-8 col-lg-6  col-md-3 mobile_Header">
          <div className=" f30 medium">Users Access</div>
        </div>
        <div className="col-md-3 show_header">
          <div className="m-0 p-0 f20mobile  medium ">Users Access</div>
        </div>
        <div className="col-xl-3  col-lg-4  col-md-7 py-1">
          {filterSearch(setSearch, search)}
        </div>

    

  <div className="mobile_Header">  
    <Table
    dataTable={rolesList} 
        columns={columns}
        search={search}
        pege={"10"}
      /></div>

        </div>


     
    </>
  );
};

export default AccessLevel;
