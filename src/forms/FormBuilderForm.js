import React, {useRef, useState } from 'react'
import ReactSignatureCanvas from 'react-signature-canvas';

export const FormBuilderForm = () => {
const [formElements,setFormElements]=useState([])
const signatureRef=useRef(null)

  return (
    <div className="row  bg-white p-2 mt-2" >
            
            {formElements?.map((element, index) => (
              <div key={index} className={`col-md-${element?.width || 3} pt-1`}>
                 {element?.heading&&element?.type=="heading"&& <div className=" formssubheading">{element?.label}{element?.required&&<span className="text-danger">*</span>}</div>}
                    
                 {["text", "date", "time", "file"]?.some((e, i) => e == element?.type) && (
                      <div className=''>
                       
                           { element?.label&&element?.type!="heading"&&<label className='p-0 m-0' >{element?.label}{element?.required&&<span className="text-danger">*</span>}</label>}

                        <input type={element?.type} name="value" placeholder={element?.placeholder} className="form-control" value={element?.value || ""}  />
                      </div>
                    )}

                    {element?.type === "textarea" && (
                      <div className=" ">
                        <textarea id={`field_${index}`} placeholder={element?.placeholder} className="form-control" ></textarea>
                      </div>
                    )}

                    {element?.type === "Signature" && (
                      <div className=" " style={{ maxWidth: "500px" }}>
                        <ReactSignatureCanvas ref={signatureRef} canvasProps={{ className: "signature-canvas border" }} />
                        <button className="btn btn-danger" type="button" >
                          Clear Signature
                        </button>
                      </div>
                    )}

                    {element?.type === "Select" && (
                      <div className=" ">
                        <select id={`field_${index}`} className="form-control" >
                          <option value="">{element?.label}</option>
                          {element?.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option?.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

{element?.type === "checkbox" && (
                      <div className={`d-flex flex-wrap gap-2 `}>


                      {element?.options?.map((e, i) => (
                        <div className={` d-flex  align-items-center gap-2 form-check`}>
                          <input type="checkbox" className="form-check-input"id={`flexCheckDefault${i}`} value={e} key={i} />
                          <label class="form-check-label" for={`flexCheckDefault${i}`} className="pointer text-black">
                          {e?.value}
</label>
                          
                        </div>
                        ))}
                      </div>
                    )}
                    {element?.type === "radio" && (
                      <div className={"d-flex gap-2 align-items-center"}>
                      {element?.options?.map((e, i) => (
                        <div className={` d-flex  align-items-center gap-2 form-check`}>
                        <input type="radio" name="radio" className="form-check-input"id={`flexCheckDefaul${i}`} value={e} key={i} />
                        <label class="form-check-label" for={`flexCheckDefaul${i}`} className="pointer text-black">
                        {e.value}
</label>
                        
                      </div>
                      ))}
                    </div>
                    
                    )}
              </div>
            ))}
          </div>
  )
}
