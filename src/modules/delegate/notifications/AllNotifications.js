
import React, { useEffect, useState } from "react";
import ReactTable from "../../../share_components/ReactTable";
import { MdSearch } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { BsFilterLeft } from "react-icons/bs";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import Table from "../../../share_components/Table";
import moment from "moment";


const AllNotifications = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {data,headerlink}=UseFormValidations({})
  const [message, setGetMessage] = useState([]);
  const [active, setActive] = useState("All Notifications");
  const filtertabs = [
    { name: "All Notifications" },
    { name: "Application" },
    { name: "Appointment" },
    { name: "Credential" },
    { name: "Health Document" },
    { name: "Message" },

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


  useEffect(() => {
    headerlink([{name:"Needs Attention",link:"/outpatientpro/delegate/alldelegatenotifications/",active:true},
    ])
  }, []);
  const columns = [
    {
      name: "Type",
      selector: (row) => (
        <div>
          <div
            className="link-hover"
            title={`${row?.type !== "" ? `Name: ${row?.type}` : ""}`}
          >
            {row?.type}
          </div>
        </div>
      ),
      sortable: true,
      key:"type"
    },

    {
      name: "Message",
      selector: (row) => <div className="pointer" title={row?.message}>{row?.message}</div>,
      sortable: true,
      width:"35rem",
      key:"message"
    },
    {
      name: "Status",
      selector: (row) => <div title={row?.status} className={(row?.status=="Application Sent"||row?.status=="Applying(88%)")&&" pointer applicationSent   text-center "||
      row?.status=="Expired"&&"expired    text-center pointer"||row?.status=="Privileged"&&"privileged    text-center pointer"||
      row?.status=="Archived"&&"archived    text-center pointer"||row?.status=="Expiring(33 days)"&&"expiring    text-center pointer"||
      row?.status=="Board Review"&&"boardReview    text-center pointer"} style={{width:"9rem"}}>{row?.status}
      </div>,
      sortable: true,
      width:"12rem"
    },
    {
      name: <div>Provider Name  [ Type ]</div>,
      selector: (row) => (
        <div className="pointer" title={row?.userName}>
          {row?.userName}  <br/> <span className="ms-2"> [ {row?.providerType} ]</span>
        </div>
      ),
      sortable: true,
      key:"userName"
    },


 



    {
      name: "Date & Time",
      selector: (row) => <div>{moment(row?.createDate)?.format("MM/DD/YYYY ")}</div>,
      key:"createDate",
      sortable: true,
    },
  ];


  const initialPage = (setcurrent) => {
    setcurrent(1);
  };
  const filterSearch = () => {
    return (
      <>

        <div className="password-container">
          <input
            type="search"
            placeholder="Search by Name or NPI #..."

            className="header-search search-input search-control bg-white"
            name="password"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon ">
            {<MdSearch size={20}  color="#878793"/>}
          </span>
        </div>
      </>
    );
  };
  return (
   
    <>
     <div className="  bg-white p-1">
      <div className="row py-2">
     
        <div className="col-md-4  f33">Notifications</div>
        <div className='d-flex justify-content-end col'><div className="col-md-4">{filterSearch(setSearch, search)}</div></div>
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
      {/* <Table dataTable={message} columns={columns} /> */}
      <Table dataTable={message || []} columns={columns} 
        tableCss={{min:"47.65px",max:"47.65px"}}
        search={search}
        pageCount={data?.pageCount}
        pageOne={initialPage}
        />
    </div>
    </>
  );
};

export default AllNotifications;
