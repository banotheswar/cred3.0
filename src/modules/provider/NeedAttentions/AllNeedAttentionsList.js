import React, { useEffect, useState } from "react";
import ReactTable from "../../../share_components/ReactTable";
import { MdSearch } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { BsFilterLeft } from "react-icons/bs";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { ListOfCards } from "../../../share_components/ListOfCards";
import { urls } from "../../../api_services/url";
import { getList } from "../../../api_services/SharedServices";
import moment from "moment";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Table from "../../../share_components/Table";
import { useDispatch, useSelector } from "react-redux";
import { ProviderFromObj } from "../../../redux/Action";

const AllNeedAttentionsList = () => {
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const {headerlink}=UseFormValidations({})
  const [active, setActive] = useState("All Items");
  const [message, setGetMessage] = useState([]);
const state=useSelector((state)=>state.formObject)
const dispatch=useDispatch()
  const filtertabs = [
    { name: "All Items" },
    { name: "Credentials" },
    { name: "Facility Requests" },
    { name: "Appointments" },

  ];

console?.log(state,"1111")
  const getMessageList = async () => {
    let jsonObjects = {
      sentTo: sessionStorage?.getItem("userId"),

    };
    let res = await getList(urls?.sendMessage?.getMessage, { jsonObjects });

    setGetMessage(res);
   
  };

  useEffect(() => {
    getMessageList();
  }, []);


  const [requiringList, setRequiringList] = useState(
    [
      {
        itemName: "ACLS Certification ",
        type: "Credential",
        message: "Please Provide your license number",
        facility: "Ghozland Surgery & Health Partners",
        datetime: "1/29/2024 ",
        status:"Complete"
      },
      {
        itemName: "Flu Vaccination",
        type: "Health Document",
        message: "Update your flu vaccination",
        facility: "Ghozland Surgery & Health Partners",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
  
      {
        itemName: "Education, Training & Experience",
        type: "Application",
        message: "Update your practice affiliations",
        facility: "Ghozland Surgery & Health Partners",
        datetime: "1/29/2024 ",
        status:"Complete"
  
      },
  
      {
        itemName: " Peer References",
        type: "Application",
        message: "Please provide one additional reference",
        facility: "Ghozland Surgery & Health Partners",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
  
      {
        itemName: "Practice Affiliations",
        type: "Application",
        message: "Please resign the attestation",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
      {
        itemName: "Insurance",
        type: "Application",
        message: "Expires in 25 days",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
      {
        itemName: "Peer References",
        type: "Application",
       message: "Expires in 25 days",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
      {
        itemName: " Attestation",
        type: "Facility Documents",
       message: "Expires in 25 days",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
      {
        itemName: "Practice Affiliations",
        type: "Application",
       message: "Expires in 25 days",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
      {
          itemName: "Board Certification",
          type: "Credential",
          message: "Expires in 25 days",
        facility: "Orange County Surgical",
        datetime: "1/29/2024 ",
        status:"Update"
  
      },
  
    ]

);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const gotoForms = (user_Id,f_Id,App_Id,row) => {
    dispatch(ProviderFromObj(row))
    
    return navigate(`/outpatientpro/provider/facility/facilityprofile/${user_Id}/${f_Id}/${App_Id}/applicationinprogress`);
    
  };

  useEffect(() => {
    headerlink([{name:"Needs Attention",link:"/outpatientpro/provider/needattentions/allneedattention",active:true},
    ])
  }, []);


  const columns = [
    {
      name: "Item Name",
      selector: (row) => (
        <div>
          <div
            className="link-hover-line"
            title={`${row?.formName !== "" ? `Name: ${row?.formName}` : ""}`}
            onClick={() => gotoForms(row?.userId,row?.facilityId,row?.appointmentId,row)
              // navigate(`/outpatientpro/facility/doctors/details/42/3/26/applicationinprogress`)
            }
          >
           <div className="pointer" title={row?.formName}>{row?.formName}</div>
          </div>
        </div>
      ),
      width:"14rem",
      key:"formName",
      sortable: true,
    },

    {
      name: "Type",
      selector: (row) =>
         
      <div
            className="link-hover-line"
            title={`${row?.type !== "" ? `Name: ${row?.type}` : ""}`}
          
            
          >
            {row?.type}
          </div>,
      sortable: true,
      width:"9.5rem",
      key:"type",
    },
   
    {
      name: "Message/Status",
      selector: (row) => (
        <div className={"pointer"} style={{color:row?.message=="Expires in 25 days"&&"#D4352F"}} title={row?.message}>
          {row?.message}
        </div>
      ),
      sortable: true,
      width:"27rem",
      key:"message",
    },


    {
      name: "Facility",
      selector: (row) => 
      // row?.facility,
     
      <div className="pointer" title={row?.facilityName}> {row?.facilityName}</div>,
      sortable: true,
      width:"19rem",
      key:"facility",
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
  
        sortable: true,
     
      },
  ];


  
 
  return (
   
    <>
     <div className="show_header"> <ListOfCards array={message} gotoForms={gotoForms} tabs={filtertabs} title={"Items Requiring Attention"} name={"ItemsRequiringAttention"}/></div>
     <div className="  bg-white p-4 mobile_Header">
      <div className="row  py-3">
        <div className="col-md-6 items-requiring-heading">Items Requiring Attention ({message?.[0]?.totalCount?message?.[0]?.totalCount:"-" })</div>
       
      </div>
      <div className="p-2 row py-3">
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
                className=" border-0 f16 medium bg-white " style={{color:"#575777"}}
                onClick={toggleDropdown}
              >
                <BsFilterLeft color="#575777" size={24} /> More Filters
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
      <Table dataTable={message || []} columns={columns} 
        tableCss={{min:"47.65px",max:"47.65px"}}
        search={""}
        />
    </div>
    </>
  );
};

export default AllNeedAttentionsList;
