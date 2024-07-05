





import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoPricetags } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../api_services/url";
import { MdSearch } from "react-icons/md";
import { getList } from "../../../api_services/SharedServices";
import ReactTable from "../../../share_components/ReactTable";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const ReAppointment = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [detailsState, setDetailsState] = useState("Select Provider");
  const [filterlist, setFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [providersList, setProvidersList] = useState([
    {
      name: "Travis Head",
      phone: "123-789-7894",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "General",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Application Sent",
      attention: "",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Usman Khawaja",
      phone: "985-789-7894",
      licensetype: "Medical Doctor",
      specility: "Orthopedic ",
      tag: "orthopedic Surgeon",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Privileged",
      attention: "1 item",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Marnus Labuschagne",
      phone: "524-789-7894",
      licensetype: "Medical Doctor",
      specility: "Orthopedic",
      tag: "General",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Expired",
      attention: "1 item",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Cameron Green",
      phone: "183-789-7894",
      licensetype: "Medical Doctor",
      specility: "Urology",
      tag: "General",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Archived",
      attention: "",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Steven Smith",
      phone: "823-789-7894",
      licensetype: "Medical Doctor",
      specility: "General",
      tag: "Surgeon",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Expiring(33 days)",
      attention: "2 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Mitchell Marsh",
      phone: "823-789-7894",
      licensetype: "Medical Doctor",
      specility: "Pain",
      tag: "General",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Board Review",
      attention: "3 items",
      lastUpdated: "Feb 9,2024",
    },
    {
      name: "Alex Carey",
      phone: "823-789-7894",
      licensetype: "Medical Doctor",
      specility: "Surgeon",
      tag: "General",
      facility: [
        { facilityName: "Irvine surgical center" },
        { facilityName: "Newport Beach Health Group" },
      ],
      status: "Applying(88%)",
      attention: "12 items",
      lastUpdated: "Feb 9,2024",
    },
  ]);
  const [update, setUpdate] = useState([]);
  const [facility, setFacility] = useState([]);
  const handleTabClick = (index) => {
    const tab = containerRef.current.children[index];
  };
  const {headerlink}=UseFormValidations({})
  useEffect(()=>{
    headerlink([
      // {name:"All Doctors",link:"/outpatientpro/facility/doctors",},
      {name:"Create Appointment",link:"/outpatientpro/facility/appointment"},
      {name:"Reappointment",link:"/outpatientpro/facility/appointment/reappointment", active:true},
    ])
  },[])



  const getAllProviders = async () => {
    let jsonObjects = {
      userId: 0,
      type: "Provider",
    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });

    // setProvidersList(res);
  };
  const getSpecialityList = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setSpecialityList(res);
  };

 

  useEffect(() => {
    getSpecialityList();
  }, []);

  useEffect(() => {
    getAllProviders();
  }, [update]);



  useEffect(() => {
    if (search?.trim() === "") {
      setFilterList(doctorsList);
    } else {
      const result = doctorsList.filter((v) => {
        return (
          v?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.startdate
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          v?.npi?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.tms?.toLowerCase()?.includes(search?.toLowerCase())
        );
      });
      setFilterList(result);
    }
  }, [search]);

  const filterSearch = () => {
    return (
      <>
        <div className="password-container ">
          <input
            type="search"
            placeholder="Search by Name or NPI #..."
            className="header-search rounded search-input search-control bg-white"
            name="password"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="eye-icon ">{<MdSearch size={20} />}</span>
        </div>
      </>
    );
  };

  const selectprovider = () => {

    const columns = [
      {
        name: "Name",
        selector: (row) => (
          <div>
            <span title={row?.name} className="pointer" onClick={()=>navigate("/outpatientpro/facility/appointment/reappointment/newappointment")}>
              {row?.name}
            </span>
            <br />
            <label>{row?.phone}</label>
          </div>
        ),
        sortable: true,
        width: "11rem",
      },
      {
        name: "License Type",
        selector: (row) => (
          <div title={row?.name} className="pointer">
            {row?.licensetype}
          </div>
        ),
        sortable: true,
      },
      {
        name: "Specility",
        selector: (row) => (
          <div className="link-hover pointer" title={row?.specility}>
            {" "}
            {row?.specility}
          </div>
        ),
        sortable: true,
      },
  
      {
        name: "Tags",
        selector: (row) => (
          <div className="link-hover pointer" title={row?.tag}>
            {row?.tag}
          </div>
        ),
        sortable: true,
      },
  
      {
        name: "Facility",
        selector: (row) =>
          row?.facility &&
          row?.facility?.map((v) => {
            return (
              <div className="text-wrap pointer" title={v?.facilityName}>
                {v?.facilityName}
              </div>
            );
          }),
  
        sortable: true,
        width: "14rem",
      },
  
      {
        name: "Status",
        selector: (row) => (
          <div
            title={row?.status}
            className={
              ((row?.status == "Application Sent" ||
                row?.status == "Applying(88%)") &&
                " pointer applicationSent   text-center ") ||
              (row?.status == "Expired" && "expired    text-center pointer") ||
              (row?.status == "Privileged" &&
                "privileged    text-center pointer") ||
              (row?.status == "Archived" && "archived    text-center pointer") ||
              (row?.status == "Expiring(33 days)" &&
                "expiring    text-center pointer") ||
              (row?.status == "Board Review" &&
                "boardReview    text-center pointer")
            }
            style={{ width: "9rem" }}
          >
            {row?.status}
          </div>
        ),
        sortable: true,
        width: "12rem",
      },
  
      {
        name: (
          <div>
            Need
            <br />
            Attention
          </div>
        ),
        selector: (row) => (
          <div
            style={{ width: "5rem" }}
            className={
              row?.attention ? "  expired text-center " : "   text-center "
            }
          >
            {row?.attention ? row?.attention : ""}
          </div>
        ),
        sortable: true,
        width: "7rem",
      },
  
      {
        name: "Last Updated",
        selector: (row) => row?.lastUpdated,
        sortable: true,
      },
    ];




  
  
    return (
      <div className="">
     <div className=" p-2">    
       <div className="f22 medium ">Select a Provider</div>
       <div className="col-3 py-3">{filterSearch()}</div>
       <ReactTable
      
        dataTable={providersList}
        columns={columns}
          search={filterSearch}
       
       />
     </div>
        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded f16 medium col-1 p-2 justify-content-center bg-white text-center "
           
            onClick={()=>navigate("/outpatientpro/facility/appointment")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <button
            className="border rounded f16 medium  p-2 justify-content-center text-center text-white"
            style={{ background: "#357FFA" }}
            onClick={()=>setDetailsState("Select Facility(s)")}
          >

            Next: Select Facility(s)
          </button>
        </div>
      </div>
    );
  };

  const selectFacility = () => {
    return (
      <>
        <div className=" p-4">
          <div className="mediumf17">
            Select Facility Locations <span className="text-danger" >*</span>
            <label className="ms-2">(Select all that apply)</label>
          </div>
          <div className="row p-2">
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input type="checkbox" name="alcs" value="yes" id="alcs" />
                <label for="alcs" className="">
                  Ghozland Health Partners North
                </label>
              </div>

              <div className="checkboxWithText1">
                <input type="checkbox" name="bls" value="yes" id="bls" />
                <label for="bls"> Ghozland Health Partners South</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="boardCertification"
                  value="yes"
                  id="boardCertification"
                />
                <label for="boardCertification">
                  Newport Beach Surgical Group
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input type="checkbox" name="alcs" value="yes" id="alcs1" />
                <label for="alcs1" className="">
                  San Diego Medical Partners
                </label>
              </div>

              <div className="checkboxWithText1">
                <input type="checkbox" name="bls" value="yes" id="bls1" />
                <label for="bls1"> Santa Monica Medical</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="boardCertification"
                  value="yes"
                  id="boardCertification1"
                />
                <label for="boardCertification1">South Bay Surgical</label>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded f16 medium col-1 p-2 justify-content-center bg-white text-center "
            onClick={()=>setDetailsState("Select Provider")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <button
            className="border rounded f16 medium p-2 justify-content-center text-center text-white"
            style={{ background: "#357FFA" }}
            onClick={()=>setDetailsState("Build Application Packet")}
          >
            Next: Build Application Packet
          </button>
        </div>
      </>
    );
  };

  const buildApplicationPacket = () => {
    return (
      <>
        <div className="p-4">
          <div className="mediumf17">
            Select an Application Template{" "}
            <span className="text-danger" >*</span>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="applicationTemplate"
                 
                />
                <label
                  for="applicationTemplate"
                 
                >
                  Anesthesiologist
                </label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="handSurgeon"
                
                />
                <label
                  for="handSurgeon"
                 
                >
                  General Physician
                </label>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="handSurgen"
                 
                />
                <label
                  for="handSurgen"
                 
                >
                  Hand Surgeon
                </label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="applicationTemplate"
                  value="yes"
                  id="orthoSurgen"
                
                />
                <label
                  for="orthoSurgen"
                 
                >
                  Orthopedic Surgeon (default)
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className=" p-4">
          <div className="mediumf17">
            Select Facility Document Template{" "}
            <span className="text-danger" >*</span>
          </div>

          <div className="row">
            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="anesthesiologistOne"
                
                />
                <label
                  for="anesthesiologistOne"
                 
                >
                  Anesthesiologist
                </label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="handSurgeonOne"
                 
                />
                <label
                  for="handSurgeonOne"
                 
                >
                  General Physician
                </label>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="handSurgenOne"
                 
                />
                <label
                  for="handSurgenOne"
                 
                >
                  Hand Surgeon
                </label>
              </div>

              <div className="checkboxWithText gap-1 ">
                <input
                  type="radio"
                  name="facilityDocumentTemplate"
                  value="yes"
                  id="orthoSurgenOne"
                
                />
                <label
                  for="orthoSurgenOne"
                  
                >
                  Orthopedic Surgeon (default)
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className=" p-4">
          <div className="mediumf17">
            {" "}
            Select Health Documents <span className="text-danger" >*</span>
            <label className="ms-2 f15">(Select all that apply)</label>
          </div>
          <div className="row p-2">
            <div className="col-md-4">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="fluVaccine"
                  value="yes"
                  id="fluVaccine"
                />
                <label for="fluVaccine" className="">
                  Flu Vaccine (default)
                </label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="tuberculosisScreening"
                  value="yes"
                  id="tuberculosisScreening"
                />
                <label for="tuberculosisScreening">
                  {" "}
                  Tuberculosis Screening
                </label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument3"
                  value="yes"
                  id="healthDocument3"
                />
                <label for="healthDocument3"> Health Document #3</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument4"
                  value="yes"
                  id="healthDocument4"
                />
                <label for="healthDocument4">Health Document #4</label>
              </div>

              <div className="checkboxWithText1">
                <input
                  type="checkbox"
                  name="healthDocument5"
                  value="yes"
                  id="healthDocument5"
                />
                <label for="healthDocument5">Health Document #5</label>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded col-1 f16 medium p-2 justify-content-center bg-white text-center"
            onClick={()=>setDetailsState("Select Facility(s)")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <button
            className="border rounded  p-2 f16 medium justify-content-center text-center text-white"
            style={{ background: "#357FFA" }}
            onClick={()=>setDetailsState("Select Credentials")}
          >
            Next: Select Credentials
          </button>
        </div>
      </>
    );
  };
  const selectCredentials = () => {
    return (
      <div className="p-3">
        <div className="mediumf17">
          Select Credentials <span className="text-danger" >*</span>
        </div>
        <div className="row p-2">
          <div className="col-md-6 ">
            <div className="checkboxWithText gap-2 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="orthoSurgen"
              />
              <label for="orthoSurgen">
              Orthopedic Surgeon Credentials (default)
              </label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="anesthesiologistCredentials"
              />
              <label for="anesthesiologistCredentials">Anesthesiologist Credentials</label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="mdCred"
              />
              <label for="mdCred">General MD Credentials</label>
            </div>

            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="otherSurgeonCred"
              />
              <label for="otherSurgeonCred">Other Surgeon Credentials</label>
            </div>
          </div>

          <div className="col-md-6 ">
          <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="paCred"
              />
              <label for="paCred">PA Credentials</label>
            </div>
          
            <div className="checkboxWithText gap-1 ">
              <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="ahpTypeThree"
              />
              <label for="ahpTypeThree">AHP Type #3 Credentials</label>
            </div>
           
            <div className="checkboxWithText gap-1">
            <input
                type="radio"
                name="selectCredentials"
                value="yes"
                id="ahpTypeFour"
              />
              <label for="ahpTypeFour">AHP Type #4 Credentials</label>

            </div>
          </div>
        </div>
        <hr />

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border rounded col-1 f16 medium p-2 justify-content-center bg-white text-center "
            onClick={()=>setDetailsState("Build Application Packet")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <button
            className="border rounded  p-2  f16 medium justify-content-center text-center text-white"
            style={{ background: "#357FFA" }}
            onClick={()=>setDetailsState("Confirm & Send")}
          >
            Next: Confirm & Send
          </button>
        </div>
      </div>
    );
  };

  const confirmSend = () => {
    return (
      <>
        <div className=" p-4">
          <div className="f20">Provider Profile</div>
          <div className="row gap-2">
            <div className="col-md-5">
              <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium ">Name</div>
                <label className="col-md-6 mt-1"> Elizabeth McDaniel  </label>
              </div>
               <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6  f14 medium ">DOB</div>
                <label className="col-md-6 mt-1"> Jan 25, 1972</label>
              </div>
               <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6  f14 medium">Email</div>
                <label className="col-md-6 mt-1 "> emcdaniel@gmail.com</label>
              </div>
               <hr className="px-0 py-1 mt-1 m-0"/>
            </div>

            <div className="col-md-5">
             <hr className="px-0 py-1 mt-1 m-0"/>

            <div className="row">
                <div className="col-md-6  f14 medium">Specialty</div>
                <label className="col-md-6 mt-1 "> Anesthesia</label>
              </div>

             
               <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium ">NPI #</div>
                <label className="col-md-6 mt-1"> 123-456-9988</label>
              </div>
               <hr className="px-0 py-1 mt-1 m-0"/>
              <div className="row">
                <div className="col-md-6 f14 medium">DEA #</div>
                <label className="col-md-6 mt-1"> 123-456-9988</label>
              </div>
               <hr className="px-0 py-1 mt-1 m-0"/>
            </div>
          </div>

          <div className="col-auto">
            <button className="button-user  border p-2 px-4 mt-4 text-white rounded"
            
            onClick={() => settingDetailstate("Select Provider")}
            >
              Edit
            </button>
          </div>
        </div>

       <div className="row p-4 ">
       <div className="col-md-5">
       
            <div className="f20">Application Packet</div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6  f14 medium  ">Application</div>
              <label className="col-md-6 mt-1">Orthopedic Surgeon </label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6  f14 medium  ">Facility Documents</div>
              <label className="col-md-6 mt-1">Orthopedic Surgeon</label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6   f14 medium ">Health Documents</div>
              <label className="col-md-6 mt-1">
                Flu Vaccine
              </label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
              <div className="col-md-6   f14 medium ">Facility Documents</div>
              <label className="col-md-6 mt-1">
                 Tuberculosis Screening
              </label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>

          <div className="col-auto">
            <button className="button-user border p-2 px-4 mt-4 text-white rounded"
             onClick={() => setDetailsState("Build Application Packet")}
            
            >
              Edit
            </button>
          </div>
        </div>

        <div className="col-md-5">
       
            <div className="f20">Credentials</div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
             
              <label className="col-md-6 mt-1">ACLS </label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
             
              <label className="col-md-6 mt-1">BLS</label>
            </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
             
              <label className="col-md-6 mt-1">
               Board Certification
              </label>
            </div> <hr className="px-0 py-1 mt-1 m-0"/>
            <div className="row">
             
             <label className="col-md-6 mt-1">
             PALS
             </label>
           </div>
             <hr className="px-0 py-1 mt-1 m-0"/>
        

          <div className="col-auto">
            <button className="button-user border p-2 px-4 mt-4 text-white rounded"
            
            onClick={() => settingDetailstate("Select Credentials")}
            >
              Edit
            </button>
          </div>
        </div>

     
       </div>

        <div className="p-4">
          <div className="f20">Compose Your Email</div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control border-none"
              placeholder="Subject"
            />
          </div>
          <div className="col-md-6 mt-2">
            <textarea
              type="text"
              rows={8}
              placeholder="Your message…"
            />
          </div>
          <hr />
        </div>

        <div className="p-4 d-flex align-items-between justify-content-between">
          <button
            className="border f16 medium rounded col-1 p-2 justify-content-center bg-white text-center "
            onClick={()=>setDetailsState("Select Credentials")}
            style={{color:"#6D6D6D"}}
          >
            Back
          </button>
          <div className="border rounded save pointer  p-2 justify-content-center text-center "
            onClick={() =>
              navigate(
                "/outpatientpro/facility/appointment/appointmentsendprovider"
              )}
          >
            Send to Provider
          </div>
        </div>
      </>
    );
  };

  const settingDetailstate = (name) => {
    setDetailsState(name);
  };

  const tabs = () => {
    switch (detailsState) {
      case "Select Provider":
        return selectprovider();
      case "Select Facility(s)":
        return selectFacility();
      case "Build Application Packet":
        return buildApplicationPacket();
      case "Select Credentials":
        return selectCredentials();
      case "Confirm & Send":
        return confirmSend();

      default:
        return <></>;
    }
  };
  return (
    <>
      <div>
        <div className="  bg-white p-4 ">
          <h5 style={{ opacity: "1",fontWeight:"400" }}>
          Reappointment: Build Application
          </h5>
          <label className="f16 ">
            Follows these simple steps to build the application for your
            Provider. To customize any of these settings, go to{" "}
            <span className="link-hover-line">the Application Builder</span>
          </label>

          <div className=" border rounded mt-4 ">
            <div
              className="tab-scrolbar p-4 d-flex py-4  "
              ref={containerRef}
              style={{ overflowX: "auto" }}
            >
              {[
                "Select Provider",
                "Select Facility(s)",
                "Build Application Packet",
                "Select Credentials",
                "Confirm & Send",
              ]?.map((e, i) => (
                <div
                  className={
                    detailsState === e
                      ? "  border-left-0 border    d-flex gap-2 active-bar text-white pointer "
                      : "  border-left-0 border   d-flex gap-2  not-active pointer rounded"
                  }
                  style={{ width: "33%" }}
                  onClick={() => {
                    handleTabClick(i);
                    settingDetailstate(e);
                  }}
                  key={i}
                >
                  <div
                    className={
                      detailsState === e
                        ? "border label  d-flex align-items-center justify-content-center active-circle text-white"
                        : "bg-white border label  d-flex align-items-center justify-content-center   "
                    }
                    style={{
                      marginLeft: "-15px",
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={
                      detailsState === e
                        ? "d-flex align-items-center f15 justify-content-center label text-white"
                        : "d-flex align-items-center f15 justify-content-center label "
                    }
                  >
                    {e}
                  </span>
                </div>
              ))}
            </div>

            {tabs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReAppointment;
