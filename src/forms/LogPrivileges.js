import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { getById, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import { useParams } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import moment from "moment";
const LogPrivileges = ({formname,setUpdateApp}) => {

 
  const { providerId } = useParams();
  const [update, setUpdate] = useState()
  const [logdata,setLogData]=useState();
  const[unlockrequest,setunlockrequest]=useState("")

  const submit = async () => {
    let jsonObjects = {
      userId: providerId,
      templateType: "Log & Previleges",
      type: "Log & Previleges",
      isSubmitted: "Yes",
      isLogged:"Yes",
      
      appointmentId: formname?.appointmentId,

      documentData: [
        {
          startDate: data?.startDate,
          privilageEmail: data?.privilageEmail,
          logDescription: data?.logDescription,
          logDate:new Date(),
        },
      ],
    };
    let res = await save(urls?.settings?.saveLog, { jsonObjects });
    setUpdate(res);
    setUpdateApp(res)
    setunlockrequest(false)
    setValues({})
  };

  const {
    data,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleDateChange,
  } = UseFormValidations({
    submit: submit,
  });

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };

  const getLogData =async()=>{
    let jsonObjects = {
      appointmentId:formname?.appointmentId,
      formId:0,
      type: "Log & Previleges",
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    setLogData(res)
   
  }

  useEffect(()=>{
    let obj={
      isLogged:logdata?.isLogged,
      isLocked:logdata?.isLocked,
      isSubmitted:logdata?.isSubmitted,
      templateType:logdata?.templateType,
      type:logdata?.type,
      id:logdata?.id,

    }
    let objTwo=logdata?.documentData&&{...obj,...logdata?.documentData[0]}
    setValues(objTwo)
  },[logdata])

  useEffect(()=>{
    getLogData()
  },[update])
console?.log(logdata?.isLogged,"logdata",data)

  return (
    <>
      
        <div className="row px-4  py-2 mt-2 bg-white">
        {(data?.id==undefined||(data?.id!=undefined&&unlockrequest==true))?<form onSubmit={handleSubmit}>
          <div className="  ">
            <div className="  col-lg-4 col-xl-4 col-md-12">
              <label>
                Appointment Date <span className="text-danger">*</span>
              </label>
              {/* <DatePicker
                className="form-control py-2"
                minDate={new Date()}
                selected={data?.startDate && new Date(data?.startDate)}
                autoComplete="off"
                name="startDate"
                onChange={(e) => {
                  handleDateChange(e, "startDate");
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                popperClassName="react-datepicker-popper"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                showIcon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#B2B2B2"
                    class="bi bi-calendar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                }
              /> */}

<DatePicker
                    className={`form-control  bg-white py-2`}
                    minDate={new Date()}
                    selected={data?.startDate && new Date(data?.startDate)}
                    autoComplete="off"
                    name="startDate"
                    onChange={(e) => {
                      handleDateChange(e, "startDate");
                    }}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
                    popperClassName="react-datepicker-popper"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    showIcon
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="#B2B2B2"
                        class="bi bi-calendar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                    }
                  />
            </div>
            <div className="col-lg-6 col-xl-6 col-md-12 mt-2">
              <label>Welcome Email</label>
              <input
                className={emailErrorColor("privilageEmail")}
                value={data?.privilageEmail}
                onChange={handleChange("privilageEmail")}
                placeholder=""
              ></input>
            </div>
            <div className="col-lg-6 col-xl-6 col-md-12">
              <textarea
                className={emailErrorColor("logDescription")}
                value={data?.logDescription}
                onChange={handleChange("logDescription")}
               
                placeholder="Description"
              />
            </div>
            <div className="py-4">
              <hr />
              <button
                type="submit"
                className=" border rounded text-white p-2"
                style={{ background: "#00B948 0% 0% no-repeat padding-box" }}
              >
                Log Privileges
              </button>
            </div>
          </div>
          </form>:
          
          <>
         <div className="py-2 f18 medium">Status : {data?.isLogged==""?"Pending":"Logged"} {data?.isLogged=="Yes"&&<span><IoIosCheckmarkCircle
                                          color={"#00B948"}
                                          size={16}
                                          style={{ fontSize: "16px" }}
                                        /></span>}</div>
         <div className="mt-4 f16 medium">The Providers privileges have been {data?.isLogged==""?"Pending":"Logged"}</div>
         
         <div className='row border-top p-2 mt-3'>
                    <div className='col-md-3 px-2 label'>Appointment Date </div>
                    <div className='col-md-8 '> <label>{data?.startDate?moment(data?.startDate)?.format("MM/DD/YYYY"):"-"}</label></div>
    
                </div>
                <div className='row border-top p-2 '>
                    <div className='col-md-3 px-2 label'>Appointment Expires </div>
                    <div className='col-md-8 '> <label>{data?.startDate?moment(data?.startDate).add(1, 'years').format("MM/DD/YYYY"):"-"}</label></div>
    
                </div>
                <div className='row border-top p-2 '>
                    <div className='col-md-3 px-2 label'>Logged By</div>
                    <div className='col-md-8 '> <label>{data?.name}</label></div>
    
                </div>
                <div className='row border-top border-bottom p-2 '>
                    <div className='col-md-3 px-2 label'>Log Date</div>
                    <div className='col-md-8 '> <label>{data?.logDate?moment(data?.documentData&&data?.logDate)?.format("MM/DD/YYYY"):"-"}</label></div>
    
                </div>
                <div className='col-md-2 mt-2'>
                        <button
                          type="button"
                          className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                          style={{ background: "#D4352F" }}
                          onClick={() => setunlockrequest(true)}
                        >
                          Unlock & Edit
                        </button>
                      </div>
                      </>
          
          }
        </div>
    </>
  );
};

export default LogPrivileges;
