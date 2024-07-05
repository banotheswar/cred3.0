import React, { useEffect, useState } from "react";
import ReactTable from "../../../share_components/ReactTable";
import { MdSearch } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { BsFilterLeft } from "react-icons/bs";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import moment from "moment";
import Table from "../../../share_components/Table";
import { useNavigate, useParams } from "react-router-dom";

const AllNeedAttentionDelegate = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const {headerlink}=UseFormValidations({})
  const [message, setGetMessage] = useState([]);
  const [active, setActive] = useState("All Items");
  const filtertabs = [
    { name: "All Items" },
    { name: "Credentials" },
    { name: "Facility Requests" },
    { name: "Appointments" },

  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const getMessageList = async () => {
    let jsonObjects = {
      // sentTo: sessionStorage?.getItem("userId"),
      delegateId:sessionStorage.getItem("userId")
    };
    let res = await getList(urls?.sendMessage?.getMessage, { jsonObjects });
    setGetMessage(res);
  };

  useEffect(() => {
    getMessageList();
  }, []);





  const gotoForms = (roleId) => {
    switch (roleId) {
      case "1":
        return `/outpatientpro/admin/doctors/details/${providerId}/applicationinprogress`;

      case "2":
        return `/outpatientpro/enterprise/doctors/details/${providerId}/applicationinprogress`;

      case "4":
        return `/outpatientpro/facility/doctors/details/${providerId}/applicationinprogress`;

      case "5":
        return `/outpatientpro/provider/facility/facilityprofile/${providerId}/applicationinprogress`;
        case "7":
          return `/outpatientpro/provider/facility/facilityprofile/${providerId}/applicationinprogress`;

       

      default:
        return "";
    }
  };






  useEffect(() => {
    headerlink([{name:"Needs Attention",link:"/outpatientpro/delegate/alldelegateneedattention/",active:true},
    ])
  }, []);
  const columns = [
    {
      name: "Item Name",
      selector: (row) => (
        <div>
          <div
            className="link-hover"
            title={`${row?.itemName !== "" ? `Name: ${row?.itemName}` : ""}`}
            onClick={
              () => navigate(gotoForms(sessionStorage?.getItem("roleId")))
             
            }
          >
             <div className="pointer" title={row?.formName}>{row?.formName}</div>
          </div>
        </div>
      ),
      width:"12rem",
      sortable: true,
      key: "formName",
    },

    {
      name: "Type",
      selector: (row) => <div className="pointer" title={row?.type}> {row?.type}</div>,
      sortable: true,
      width:"9.5rem",
      key: "type",
    },
   
    {
      name: "Message/Status",
      selector: (row) => (
        <div className="pointer" title={row?.message}>
          {row?.message}
        </div>
      ),
      sortable: true,
      width:"18rem",
      key: "message",
    },


    {
      name: "Facility",
      selector: (row) => 
      // row?.facility,
      <div> Ghozland Surgery & Health Partners</div>,
      sortable: true,
      width:"17rem",
      key:"facility",
    },

    {
      name: "Provider",
      selector: (row) =>(<div className="pointer" title={row?.userName}>
      {row?.userName}  <br/> <span className="ms-2"> [ {row?.providerType} ]</span>
    </div>),
      key:"providerType",
      sortable: true,
      width:"9rem"
    },
        {
      name: "Date Sent",
      selector: (row) => <div>{moment(row?.createDate)?.format("MM/DD/YYYY ")}</div>,
      key:"createDate",
      sortable: true,
      width:"8rem",
    },
    {
      name: "Action",
      selector: (row) => <div className="button-secondary rounded py-1 p-1  text-center"
      //  style={{width:"7rem"}}
       >
        {/* {row?.status} */}
     Complete
        </div>,
      
    },
  ];
 

  
 
  return (
   
    <>
     <div className="  bg-white p-3">
      <div className="row py-2">
      <div className="col-md-4 col-md-12 f33">Items Requiring Attention ({message?.[0]?.totalCount?message?.[0]?.totalCount:"-" })</div>
       
      </div>
      <div className="p-2 row ">
      <div className="col-10 d-flex gap-2">
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
      <div className="col-2">
              <Dropdown show={isOpen} onClose={() => setIsOpen(false)}>
                <button
                  className="text-dark border-0 f16 medium bg-white"
                  onClick={toggleDropdown}
                >
                  <BsFilterLeft size={24} /> More Filters
                </button>

                <Dropdown.Menu>
                  <Dropdown.Item>Archived</Dropdown.Item>
                  <Dropdown.Item>Board Review</Dropdown.Item>
                  <Dropdown.Item>Credentials Expired</Dropdown.Item>
                  <Dropdown.Item>Credentials Expiring</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

      <div className="col-2"></div>
      </div>
      <Table dataTable={message} columns={columns} />
    </div>
    </>
  );
};

export default AllNeedAttentionDelegate;
