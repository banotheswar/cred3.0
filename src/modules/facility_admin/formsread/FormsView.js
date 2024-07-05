import React, { useEffect, useState } from 'react'
import { MdMedicalInformation } from 'react-icons/md';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiSolidSend } from 'react-icons/bi';
import { ProgressBar } from "react-bootstrap";
import RequestModal from './RequestModal';
import { UseFormValidations } from '../../../validations/UseFormValidation';
import { useLocation } from 'react-router-dom';
import BoardSummary from './BoardSummary';


const FormsView = () => {
    const [formname, setFormName] = useState("Identifying Information");
    const [requestModal,setRequestModal] = useState(false)
    const {headerlink}=UseFormValidations({})
const location=useLocation()



    const AppointmentList = [
        { name: "Identifying Information" },
        { name: "Practice Information" },
        { name: "Education & Training" },
        { name: "Work Experience" },
        { name: "Military Experience" },
        { name: "Practice Affiliations" },
        { name: "Hospital/Facility Affiliations" },
        { name: "Malpractice Insurance" },
        { name: "Peer References" },
        { name: "Licensure",child:[{name:"Licensure12"},{name:"Licensure34"}] },
        { name: "Certifications" },
        { name: "Health Documents" },
        { name: "Facility Documents" },
        { name: "Delineation of Privileges" },
        { name: "Sign & Submit" },
      ];
      const IdentifyingInformation = [{label:"Name",value:"Kane Williamson"},{label:"Email",value:"KaneWilliamson@gmail.com"},{label:"Phone",value:"(123) 345-1234"},{label:"Mobile",value:"(123) 345-1234"},
      {label:"Pager",value:"(123) 345-1234"},{label:"Address",value:"123 Main Street Suite 454 Los Angeles, CA 92154 "},{label:"Driver's License State",value:"CA"},
      {label:"Driver's License #",value:"SS-CA12599877"},{label:"Social Security #",value:"123-44-5555 "},{label:"Birth Date ",value:"05/15/1978"},
      {label:"Birth City ",value:" Portland "},{label:"Birth State ",value:"OR "},{label:"Are You U.S.Citizen?",value:"Yes "},
      {label:"Languages Spoken",value:"English"},{label:"Driver's License",value:"Elizabeth McDaniel License"},];
    


      const PracticeInformation = [{label:"Are you an independent practitioner or sponsored by a Physician?",value:"Physician-sponsored"},{label:"Sponsoring Physician/Practice",value:"Acme Medical Group"},{label:"Address",value:"123 Main Street Suite 454 Los Angeles, CA 92154 "},{label:"Office Contact Name",value:"Kane Williamson"},{label:"Email",value:"KaneWilliamson@gmail.com"},{label:"Phone",value:"(123) 345-1234"},
      {label:"Fax",value:""},{label:"Specialties",value:"Orthopedic "},{label:"Subspecialties",value:""},
      {label:"Practice Type",value:"Partnership"},{label:"Names of Partners",value:"James Smith, Wendy Williams, Michael Masterson"},{label:"Tax ID",value:"222-22-2222"},
      {heading:"Second Office"},{label:"Secondary Practice Name",value:"Acme Medical"},
      {label:"Address",value:"123 Main Street Suite 454 Los Angeles, CA 92154 "},{label:"Office Contact Name",value:"Kane Williamson"},{label:"Email",value:"KaneWilliamson@gmail.com"},{label:"Phone",value:"(123) 345-1234"},
      {label:"Fax",value:""},];

    const tabs = (name) => {
        switch (name) {
          case "Identifying Information":
            return IdentifyingInformation;
    
            break;
            case "Practice Information":
                return PracticeInformation;
        
                break;

              
          
                 
        
          default:
            break;
        }
      };


      const Facility = [
        {name:"My Doctors",link:"/outpatientpro/facility/doctors"},
        {name:"Doctors Details",link:"/outpatientpro/facility/doctors/details"},
        {name:"Application View",link:"/outpatientpro/facility/formsview",active:true}
        
      ]
      const Provider =  [
        {name: "My Facilities",link: "/outpatientpro/provider/facility/allfacilitylist"},
        {name: "Facility Profile",link: "/outpatientpro/provider/facility/facilityprofile"},
        {name: "Application view",link: "/outpatientpro/provider/facility/facilityprofile/formsview",active: true,},
      ]
     
  
  
  const Breadcrumb = (name)=>{
    switch (name) {
      case "/outpatientpro/facility/formsview": return Facility
        
        break;
        case "/outpatientpro/provider/facility/facilityprofile/formsview": return Provider
        
        break;
    
      default: 
        break;
    }
  }
  useEffect(()=>{
    headerlink(
      Breadcrumb(location.pathname))
  
  },[])


      // useEffect(()=>{
      //   headerlink([
      //     {name:"My Doctors",link:"/outpatientpro/facility/doctors"},
      //     {name:"Doctors Details",link:"/outpatientpro/facility/doctors/details"},
      //     {name:"Application View",link:"/outpatientpro/facility/formsview",active:true},
          
      //   ])},[])
  return (
    <div className="row">
      <div className="d-flex col-md-12  gap-2">
        <div className="col-md-3 bg-white p-3 ">
          <div class=" py-4 d-flex justify-content-center align-items-center">
            <div
              className="p-3 card border-0"
              style={{
                background: "#ECECEC 0% 0% no-repeat padding-box",
              }}
            >
              <div class="user text-center">
                <div>
                  <FaRegCircleUser className="profile" />
                </div>
              </div>

              <div className="row py-3">
                <h3 className="text-center ">
                  Ghozland Surgery & Health Partners
                </h3>
              </div>

              <div className="d-flex justify-content-center ">
                <button
                  style={{
                    background: "#616074 0% 0% no-repeat padding-box ",
                    color: "#FFFFFF",
                  }}
                  className="me-2  border rounded p-2 f13"
                >
                  <MdMedicalInformation
                    color="#c2c2c2"
                    className="me-1"
                    size={18}
                  />
                  Info
                </button>
                <button
                  style={{
                    background: "#616074 0% 0% no-repeat padding-box",
                    color: "#FFFFFF",
                  }}
                  className="border rounded p-2  f13"
                >
                  <BiSolidSend color="#c2c2c2" className="me-1 " size={18} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
          <h3>Appointment Type</h3>
          <hr />
          {AppointmentList?.map((v) => {
            return (
              <div >
                <p
                  className={
                    formname == v?.name ? "fw-bold text-primary pointer " : "pointer "
                  }
                  onClick={() => setFormName(v?.name)}
                >
                  {v?.name}
                </p>

             <p className="light-width-line"></p>
            
              </div>
            );
          })}
        </div>
        <div className="col-md-9 px-2">
          <div className="row bg-white py-2">
            <div className="col-md-8">
              <h6 className="">{formname}</h6>
            </div>
            <div className="col-md-4  px-2">
              <div className="row col-md-12 d-flex-jusify-content-end">
                <div className="label d-flex justify-content-start">
                  3 of 14 steps completed
                </div>
                <div className=" col-md-12">
                  <ProgressBar
                    now={(3 / 14) * 100}
                    variant="success"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row bg-white mt-2 p-4' >
            {tabs(formname)?.map((v)=>{
                return(
                    <>
                    <div className='row '>
                        <hr className=''/>
                        {v?.heading&&<h6 className='m-0 p-0'>{v?.heading}</h6>}
                        <div className='col-md-3 px-2 label'>{v?.label}</div>
                        <div className='col-md-8 '> <label>{v?.value}</label></div>

                    </div>
                   
                    </>
                )
            })}
            <hr/>
            {sessionStorage?.getItem("roleId")==2?<div className='row'>
            <div className='col-md-2'>
            <button
          type="button"
          className="save text-white col-md-12  border rounded py-2 pointer"
        >
          Save & Log
        </button>
            </div>
        <div
          className="remove text-white text-center col-md-2 border rounded py-2 col-md-auto pointer"
          onClick={()=>setRequestModal(true)}
        >
          Request Edits
        </div>
            </div>:
            <div className='row'>
            <div className='col-md-2'>
            <button
          type="button"
          className="remove text-white col-md-12  border rounded py-2 pointer"
        >
          Unlock & Edit
        </button>
            </div> </div>}
          </div>

        </div>
      </div>
      {requestModal&&<RequestModal show={requestModal} onHide={()=>setRequestModal(false)}/>}
    </div>
    
  )
}

export default FormsView
