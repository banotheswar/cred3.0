import React, { useState,useRef, useEffect } from 'react'
import SignatureCanvas from "react-signature-canvas";
import DatePicker from "react-datepicker";
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
const DynamicFormBuilder = ({array,saveForm,title,DoctorFormsView,id}) => {
  console?.log("AppointmentListarray",id)
  console?.log(id?.isSubmitted,"iiiid")
    const [formElements,setFormElements]=useState([])
    const{formId}=useParams()
  
    const submit =async()=>{
      const someValueIsMissingData = formElements?.filter(field => field.required === true).every(field => field.value&&field.value!="")
      const greentick = someValueIsMissingData == false ? "No" : "Yes";
        saveForm(id,formElements,greentick)
    }

    
    const handleChangeData = (event, index) => {
        const { name, value } = event.target;
        const newFormElements = [...array];
        newFormElements[index][name] = value;
        setFormElements(newFormElements);
      };
    
      const handleChangeCheckbox = (key, index) => (e) => {
        const newFormElements = [...array];
        console?.log( e.target.value,"value")
        newFormElements[index][key] = e.target.checked ? e.target.value : "";
        setFormElements(newFormElements);
      };
    
      const handleDateChange = (e, index, key) => {
        let str;
        if (e && e != null) {
          if (e && e != null) {
            e?.setMinutes(0);
            e?.setHours(0);
            str = new Date(
              e?.setMinutes(
                e?.getTimezoneOffset() < 0
                  ? -e?.getTimezoneOffset()
                  : e?.getTimezoneOffset()
              )
            );
    
    
            const newFormElements = [...array];
            newFormElements[index][key] = str;
            setFormElements(newFormElements);
          }
    
          //  else {
          //   str = "";
          // }
        } else {
          const newFormElements = [...array];
          newFormElements[index][key] = "";
          setFormElements(newFormElements);
        }
      };
useEffect(()=>{
    setFormElements(array)
},[array])
console?.log("array",formElements,array)
  return (
    <div className="row bg-white mt-2" >
            
           {DoctorFormsView||formId ?<>
           {formElements?.length > 0
                  ? formElements?.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className={`col-md-${element?.width || 3} pt-3 `}
                      >
                        <div className="d-flex">
                          <div className="col-md-11">
                            {element?.heading &&
                              element?.type == "heading" && (
                                <div className=" formssubheading">
                                  {element?.label}
                                  {element?.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                              )}

                            {element?.label && element?.type != "heading" && (
                              <label>
                                {element?.label}
                                {element?.required && (
                                  <span className="text-danger">*</span>
                                )}
                              </label>
                            )}
                            {["text", "time", "file"]?.some(
                              (e, i) => e == element?.type
                            ) && (
                                <div>
                                  <input
                                    type={element?.type}
                                    name="value"
                                    placeholder={element?.placeholder}
                                    className="form-control"
                                    value={element?.value || ""}
                                    onChange={(event) =>
                                      handleChangeData(event, index)
                                    }
                                  />
                                </div>
                              )}
                            {element?.type === "date" && (
                              <div>
                                <DatePicker
                                  name="value"
                                  className="form-control py-2"
                                  minDate={new Date(1900, 1, 1)}
                                  maxDate={new Date()}
                                  onChange={(event) =>
                                    handleDateChange(event, index, `value`)
                                  }
                                  autoComplete="off"
                                  selected={element?.value? new Date(element?.value)
                                      : new Date()
                                  }
                                  dateFormat="MM/dd/yyyy"
                                  placeholderText="MM/dd/yyyy"
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
                            )}
                            {element?.type === "upload" && (
                              <div>
                                <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                                  <div className="text-center py-2 mt-1 ">
                                    <IoCloudUploadOutline
                                      color="#9C9CA8"
                                      opacity={0.49}
                                      style={{
                                        height: "36px",
                                        width: "42px",
                                      }}
                                    />
                                    <div
                                      className="f18 px-4 mt-2"
                                      style={{
                                        height: "46px",
                                        color: "#3A3952",
                                      }}
                                    >
                                      Upload a copy of your license or <br />{" "}
                                      drag and drop in this box
                                    </div>

                                    <input
                                      type="file"
                                      id="fileInput"
                                      style={{ display: "none" }}
                                      accept=".pdf,.doc,.docx"
                                    //  onChange={(e) => handleFileUpload(e.target.files)}
                                    />

                                    <button
                                      className="  upload40 border"
                                      style={{ background: "#3A3952B3" }}
                                      onClick={() =>
                                        document
                                          .getElementById("fileInput")
                                          .click()
                                      }
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {element?.type === "Under Line" && (
                              <div className="underline py-3"></div>
                            )}

                            {element?.type === "textarea" && (
                              <div className=" ">
                                <textarea
                                  id={`field_${index}`}
                                  placeholder={element?.placeholder}
                                  className="form-control"
                                  value={element?.value || ""}
                                  name="value"
                                  onChange={(event) =>
                                    handleChangeData(event, index)
                                  }
                                ></textarea>
                              </div>
                            )}

                            {element?.type === "Signature" && (
                              <div
                                className=" "
                                style={{ maxWidth: "500px" }}
                              >
                                <SignatureCanvas
                                  // ref={signatureRef}
                                  canvasProps={{
                                    className: "signature-canvas border",
                                  }}
                                />
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                // onClick={handleClearSignature}
                                >
                                  Clear Signature
                                </button>
                              </div>
                            )}

                            {element?.type === "Select" && (
                              <div className=" ">
                                <select
                                  id={`field_${index}`}
                                  className="form-control"
                                >
                                  <option value="">{element?.label}</option>
                                  {element?.options?.map(
                                    (option, optionIndex) => (
                                      <option
                                        key={optionIndex}
                                        value={option}
                                      >
                                        {option?.value}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            )}

                            {element?.type === "checkbox" && (
                              <div className={`d-flex flex-wrap gap-2 `}>
                                {element?.options?.map((e, i) => (
                                  <div
                                    className={` d-flex  align-items-center gap-2 form-check`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`flexCheckDefaul${index}${i}`}
                                      // value={e?.value||"Yes"}
                                      // key={i}
                                      // onChange={handleChangeCheckbox(e?.value?.toLowerCase() + index||"yes",index)}
                                      // checked={element["yes"] =="Yes"}
                                      value={e?.value&&e?.value?e?.value:"Yes"}
                                      key={i}
                                      onChange={handleChangeCheckbox(e?.value&&e?.value?e?.value?.toLowerCase() + index:"yes",index)}
                                      checked={e?.value? element[e?.value?.toLowerCase() + index] == e?.value:element["yes"]=="Yes"
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefaul${index}${i}`}
                                      className="pointer text-black"
                                    >
                                      {e?.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                            {element?.type === "radio" && (
                              <div
                                className={"d-flex gap-2 align-items-center"}
                              >
                                {element?.options?.map((e, i) => (
                                  <div
                                    className={` d-flex  align-items-center gap-2 form-check`}
                                  >
                                    <input
                                      type="radio"
                                      name={`value${index}${i}`}
                                      className="form-check-input"
                                      id={`flexCheckDefaul${index}${i}`}
                                      onChange={handleChangeCheckbox(
                                        `value${index}`,
                                        index
                                      )}
                                      value={e.value}
                                      checked={
                                        element[`value${index}`] == e.value
                                      }
                                      key={i}
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefaul${index}${i}`}
                                      className="pointer text-black"
                                    >
                                      {e.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  : " no data found"}
             <div>
        
      </div>
      <div className='col-md-auto mt-4'>
      <button type="submit" onClick={submit} className="button border rounded text-white p-2 my-3">
         {title?title: "Save & Continue"}
        </button>
      </div>
      </>:
      <div className='px-4 py-3'>

      {formElements?.length > 0&&formElements?.map((v) => {
                return (
                  <>
                    <div className="row border-top-bottom py-2 ">
                      {v?.heading && (
                        <h6 className="m-0 p-0 mt-4">{v?.heading}</h6>
                      )}
                      <div className="col-md-3 px-2 label">{v?.label}</div>
                      {v?.value && (
                        <div className="col-md-8 ">
                          {" "}
                          <label>{v?.value}</label>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
      </div>}
          </div>
  )
}

export default DynamicFormBuilder