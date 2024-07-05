import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import moment from "moment";
import { usphoneFormat } from "../api_services/SharedServices";
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";
import BoardSummary from "../modules/facility_admin/formsread/BoardSummary";
import DOPFacilityView from "../modules/facility_admin/formsread/DOPFacilityView";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import RequestModal from "../modules/facility_admin/formsread/RequestModal";





const BasicInformationReadView = ({ open, getFormdata, doctordtails, formname, uploadeddata, childFormName, AppointmentList, setAppointmentList, setFormName }) => {

  const { data, setValues, addObject } = UseFormValidations({});
  const [temp, setTemp] = useState()
  const [tabs, setTabs] = useState("References #1")
  const [requestModal, setRequestModal] = useState();
  const [update, setUpdate] = useState([]);
  const setIndexValue = (v) => {
    setTabs(v)

  }


  let fields = [
    { label: "Name", value: data?.firstName + " " + data?.lastName },
    { label: "Name", value: data?.firstName + " " + data?.lastName },
    { label: "Name", value: data?.firstName + " " + data?.lastName },
     { label: "Birth Date ", value: moment(data?.birthDate)?.format("MM/DD/YYYY") },
    ];
 




  const formtabs = (key) => {
    switch (key) {
      case "Basic Information": return fields
     
      case "Board Summary": return <BoardSummary />
      case "Delineation of Privileges": return <DOPFacilityView />
      // case value: return fields

      default: return fields
    }
  }


  useEffect(() => {
    if (formname?.formName != "Education & Training") {

      setValues(getFormdata || doctordtails);
      setTemp()
    }
    else {
      if (formname?.formName == "Education & Training" && getFormdata) {
        let obj = data?.educationType && data?.educationType ? getFormdata?.[data?.educationType] : getFormdata?.[Object.keys(getFormdata)[0]]

        setValues(obj)
        setTemp(getFormdata)
      }
    }


  }, [doctordtails, getFormdata, formname, data?.educationType]);


  return (
    <>

     

      

      <div className='row bg-white mt-2 p-4' >

        {fields?.map((v) => {
          return (
            <>
              <div className='row border-top-bottom py-2'>
                {v?.heading && <h6 className='m-0 p-0 mt-4' >{v?.heading}</h6>}
                <div className='col-md-3 px-2 label'>{v?.label}</div>
                <div className='col-md-8 '> <label>{v?.value}</label></div>

              </div>

            </>
          )
        })}
       

        {sessionStorage?.getItem("roleId") <= 4 ?
          <div className='row py-2'>
            <div className='col-md-2'>
              <button
                type="button"
                className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                style={{ background: "#00B948" }}
              >
                <FaCheckCircle size={14} /> Save & Log
              </button>
            </div>
            <div
              className="text-white text-center f16 medium col-md-2 border rounded py-2 col-md-auto pointer  "
              onClick={() => setRequestModal(true)}
              style={{ background: "#D4352F" }}
            >
              <BsFillQuestionCircleFill size={14} />  Request Edits
            </div>
          </div> :
          <div className='row py-2'>
            <div className='col-md-2'>
              <button
                type="button"
                className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                style={{ background: "#D4352F" }}
                onClick={() => open(true)}
              >
                Unlock & Edit
              </button>
            </div> </div>}

        {requestModal && (
        <RequestModal
            show={requestModal}
            updateList={setUpdate}
            onHide={() => setRequestModal(false)}
          />
        )}
        {/* {editModal&&<UnlockAndEditmodal saveData={funData}  show={editModal} onHide={()=>setEditModal(false)} />} */}
      </div>
    </>
  )
}
export default BasicInformationReadView