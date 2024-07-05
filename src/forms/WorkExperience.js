import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDelete } from "react-icons/md";
import { UseFormValidations } from "../validations/UseFormValidation";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Image_Base_Url } from "../api_services/url";
import moment from "moment";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

const WorkExperience = ({values,getFormdata,formname, Deleteuploads,id,DoctorFormsView,requestMsgPopUp,}) => {
  const{formId}=useParams()
  const submit = () => {
    const checkForKeyEmpty=()=> {
      for (let i = 0; i < data?.workExperience?.length; i++) {
          const obj = data?.workExperience[i];
          for (const key in obj) {
              if (obj.hasOwnProperty(key) && obj[key] === '') {
                 
                  return "No";
              }
          }
      }
      return "Yes";
  }
  const greentick =  checkForKeyEmpty()
  console?.log(greentick,data?.workExperience)


  if (id?.originalFileName&&id?.originalFileName!=undefined&&id?.originalFileName!="") {
    Deleteuploads(id?.uploadId)
   }

    
    values(id,{ workExperience: data?.workExperience },greentick,data?.image);
  };
  const {
    data,
    errors,
    writeData,
    writeDate,
    removeItem,
    addItem,
    setValues,
    addObject,
    writeDataCheckbox,
    writehandleChecked,
    handleSubmit,
    handleCheckbox,
    handleImageUpload,
  } = UseFormValidations({

     submit: submit,
  });
  

  
  const returnPatientError = (index, key) => {
    return errors &&
      errors?.workExperience?.length > 0 &&
      errors?.workExperience[index]?.[key] &&
      errors?.workExperience[index]?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control bg-white";
  };



  const returnPatientErrorSelect = (index, key) => {
    return errors &&
      errors?.workExperience?.length > 0 &&
      errors?.workExperience[index]?.[key] &&
      errors?.workExperience[index]?.[key]
      ? "form-select bg-white border border-danger"
      : "form-select bg-white";
  };



 
  


  
  useEffect(() => {

    let obj = { workExperience: getFormdata?.workExperience || [{
      employerName:"",
      employerType:"",
      position:"",
      leavingreason:"",
      practiceStartDate:"",
      practiceEndDate:"",
      leavingreason:""
    }] };
    
    
    setValues(obj);
  }, [getFormdata]);



  
  return (
    <>
    <div className="row px-2 py-4  mt-2 bg-white">
    {!formId&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
     { formId||DoctorFormsView?<form onSubmit={handleSubmit}>
        
        
          {data?.workExperience?.map((v, i) => {
            return (
              <>
                <div className="row mt-1">
                  <div className="col">
                    <div className="f20 medium">Practice/Employer</div>
                  </div>
                  <div className="col-md-auto d-flex-justify-content-end">
                    {i > 0 && (
                      <button
                        className="remove pointer border rounded text-white p-1"
                        onClick={() => removeItem("workExperience", i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="row py-1 mt-3">
                  <div className="col-md-6">
                    <label>
                      Practice/Employer Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className={returnPatientError(i, "employerName")}
                      placeholder="Employer Name…"
                      name="employerName"
                      value={v?.employerName}
                      onChange={writeData(i, "workExperience", "employerName")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Practice/Employer Type{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <select
                      className={returnPatientErrorSelect(i, "employerType")}
                      name="employerType"
                      value={v?.employerType}
                      onChange={writeData(i, "workExperience", "employerType")}
                    >
                      <option value={" "}>Select Type</option>
                      <option>Doctor</option>
                      <option>Surgery Center</option>
                      <option>AHP</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-4">
                    <label>
                      Position Held <span className="text-danger">*</span>
                    </label>
                    <input
                      className={returnPatientError(i, "position")}
                      placeholder="Position…"
                      name="position"
                      value={v?.position}
                      onChange={writeData(i, "workExperience", "position")}
                    />
                  </div>
                </div>

                <div className="row py-1">
                  <div className="checkboxWithText  ">
                    <input
                      type="radio"
                      name={`positionType${i}`}
                      value={`permanent${i}`}
                      id={`permanent${i}`}
                      checked={writehandleChecked(
                        data?.workExperience,
                        i,
                        `positionType${i}`,
                        `permanent${i}`
                      )}
                      onChange={writeDataCheckbox(
                        i,
                        "workExperience",
                        `positionType${i}`,
                        `permanent${i}`
                      )}
                    />
                    <label for={`permanent${i}`}>Permanent</label>
                  </div>

                  <div className="checkboxWithText  ">
                    <input
                      type="radio"
                      name={`positionType${i}`}
                      value={`temporary${i}`}
                      id={`temporary${i}`}
                      checked={writehandleChecked(
                        data?.workExperience,
                        i,
                        `positionType${i}`,
                        `temporary${i}`
                      )}
                      onChange={writeDataCheckbox(
                        i,
                        "workExperience",
                        `positionType${i}`,
                        `temporary${i}`
                      )}
                    />
                    <label for={`temporary${i}`}>Temporary</label>
                  </div>

                  <div className="checkboxWithText  ">
                    <input
                      type="radio"
                      name={`positionType${i}`}
                      value={`locusTenens${i}`}
                      id={`locusTenens${i}`}
                      checked={writehandleChecked(
                        data?.workExperience,
                        i,
                        `positionType${i}`,
                        `locusTenens${i}`
                      )}
                      onChange={writeDataCheckbox(
                        i,
                        "workExperience",
                        `positionType${i}`,
                        `locusTenens${i}`
                      )}
                    />
                    <label for={`locusTenens${i}`}>Locus Tenens</label>
                  </div>

                  <div className="checkboxWithText ">
                    <input
                      type="radio"
                      name={`positionType${i}`}
                      value={`volunteer${i}`}
                      id={`volunteer${i}`}
                      checked={writehandleChecked(
                        data?.workExperience,
                        i,
                        `positionType${i}`,
                        `volunteer${i}`
                      )}
                      onChange={writeDataCheckbox(
                        i,
                        "workExperience",
                        `positionType${i}`,
                        `volunteer${i}`
                      )}
                    />
                    <label for={`volunteer${i}`}>Volunteer</label>
                  </div>
                </div>


                <div className="row py-1 mt-1">
                  <div className="col-md-6">
                    <label>
                      Start Date <span className="text-danger">*</span>
                    </label>

                    <DatePicker
                      className={returnPatientError(i, "practiceStartDate")}
                      selected={
                        v?.practiceStartDate
                          ? new Date(v?.practiceStartDate)
                          : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "workExperience",
                        "practiceStartDate"
                      )}
                      autoComplete="off"
                      name="practiceStartDate"
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

                  <div className="col-md-6">
                    <label>
                      End Date <span className="text-danger">*</span>
                    </label>

                    <DatePicker
                      className={returnPatientError(i, "practiceEndDate")}
                      selected={
                        v?.practiceEndDate ? new Date(v?.practiceEndDate) : ""
                      }
                      maxDate={new Date()}
                      onChange={writeDate(
                        i,
                        "workExperience",
                        "practiceEndDate"
                      )}
                      autoComplete="off"
                      name="practiceEndDate"
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

                  <div className="checkboxWithText1 col-md-12 mt-3">
                    <input
                      type="checkbox"
                      value={"Yes"}
                      id={`${i}1`}
                      name="workingPosition"
                      checked={writehandleChecked(
                        data?.workExperience,
                        i,
                        "workingPosition",
                        "Yes"
                      )}
                      onChange={writeDataCheckbox(
                        i,
                        "workExperience",
                        "workingPosition",
                        "Yes"
                      )}
                    />
                    <label for={`${i}1`}>
                      I am currently working in this position
                    </label>
                  </div>

                  <div className="col-md-6 mt-4 ">
                    <label>
                      Reason for Leaving <span className="text-danger">*</span>
                    </label>
                    <textarea
                     className={returnPatientError(i, "leavingreason")}
                      name="leavingreason"
                      value={v?.leavingreason}
                      onChange={writeData(i, "workExperience", "leavingreason")}
                      style={{ minHeight: "80px" }}
                    ></textarea>
                  </div>
                </div>
                <hr className="mt-5" />
                <div className="mt-4 col-xl-2">
                  {data?.workExperience?.length - 1 == i && (
                    <div
                      className="save  align-items-center d-flex justify-content-center rounded  "
                      onClick={() =>
                       
                        addItem("workExperience", {
                          employerName:"",
                          employerType:"",
                          position:"",
                          leavingreason:"",
                          practiceStartDate:"",
                          leavingreason:"",
                          practiceEndDate:""
                        })
                      }
                    >
                      + Add Position
                    </div>
                  )}
                </div>
              </>
            );
          })}

          <div className="formssubheading-upload mt-5 py-2 col-lg-12 col-xl-12 col-md-12 ">
            Upload your CV
             {/* <span className="text-danger">*</span> */}
          </div>
          <div className="row ">
            <div className="col-xl-6 col-lg-6 col-xl-6 col-md-12 col-sm-12">
              <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3">
                <div className="text-center py-2 mt-1 ">
                  <IoCloudUploadOutline
                    color="#9C9CA8"
                    opacity={0.49}
                    className="me-2"
                    style={{ height: "36px", width: "42px" }}
                  />
                  <div className="f18 px-4 mt-2" style={{ height: "46px" }}>
                    Upload a copy of your CV or <br />
                    drag and drop in this box
                  </div>

                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept=".pdf,.doc,.docx"
                    name="image"
                    onChange={ handleImageUpload("image")}
                   
                  />

                  <div
                    className="  upload40  d-flex justify-content-center align-items-center pointer"
                    style={{
                      background: "#3A3952B3",
                      marginLeft: "132.5px",
                      marginRight: "133.5px",
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Upload
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-8  col-md-12 col-sm-12 px-4 ">
              <div className="formschildheading py-2 px-1 f16">Uploads</div>

              {id&&id?.originalFileName&& <div className=" row vertical-scrolbar px-3 mt-1">
                <label className="px-0 py-2 upload-file-css border-top-bottom py-2">
                  <MdDelete
                   onClick={() => Deleteuploads(id?.uploadId)}
                    style={{ width: "13px", height: "16px" }}
                    className="me-2 mb-1 mt-1 pointer"
                    color="#ABAAB5"
                  />{" "}
                <a href={Image_Base_Url+`/Logos/${id?.fileName}`} target={"_blank"} download={true}>{id?.originalFileName}</a> 
                </label>
              </div>}
            </div>
          </div>

          <hr className="mt-5" />

          <div className="py-4">
            <button
              type={"submit"}
              className="button text-white col-md-2 border rounded py-2"
            >
              Save & Continue
            </button>
          </div>
        
        
      </form>:
     <div className=" ">
      {
         data?.workExperience?.map((v,index)=>{
          return(
              <>
              <div className='row  py-2 pb-2'>
              <h6 className='pt-2' >{`Employer #${index+1}`}</h6>
                 
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Practice/Employer Name</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.employerName}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Practice/Employer Type</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.employerType}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Position Held</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.position}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Start Date </label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.practiceStartDate&&moment(v?.practiceStartDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">End Date</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.practiceEndDate&&moment(v?.practiceEndDate).format("MM/DD/YYYY")}</label></div>
                  <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">I am currently working in this position?</label></div>
                  <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.workingPosition}</label></div>
                  <div className='col-md-4  py-2 '> <label className="label">Reason for Leaving</label></div>
                  <div className='col-md-8  py-2 '> <label>{v?.leavingreason}</label></div>
  
              </div>
              <hr className="row col-md-12"/>
             
             
              </>
          )
      })
      }
      <div className="f18 medium">Document Uploads</div>
      <div className="border-top border-bottom row py-2">
        <div className="label col-md-4">Policy Documents</div>
        <div className="col-md-8"><label><a href={Image_Base_Url+`/FormUploads/${id?.fileName}`} target={"_blank"} download={true}>{id?.originalFileName}</a> </label></div>
      </div>
      
     </div>
        }
        </div>
    </>
  );
};

export default WorkExperience;
