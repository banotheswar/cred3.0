import React, { useState, useRef, useEffect } from "react";
import {MdAddCircleOutline,MdDeleteOutline,MdOutlineCancel,MdUploadFile,MdOutlineModeEditOutline, MdOutlineAccessTime,} from "react-icons/md";
import SignatureCanvas from "react-signature-canvas";
import { Col, Form, Row, Accordion } from "react-bootstrap";
import { returningValue } from "../../../../api_services/FormsValues";
import { BsTextareaResize } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { useLocation, useParams } from "react-router-dom";
import { TiArrowMove } from "react-icons/ti";
import { getList, notify, save } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import AddTemplateDDModal from "./modals/AddTemplateDDModal";
import Duplicate from "./modals/Duplicate";
import text from "../../../../assets/images/single line text.svg";
import paragraph from "../../../../assets/images/paragraph.svg";
import date from "../../../../assets/images/date.svg";
import radio from "../../../../assets/images/radio button.svg";
import checkbox from "../../../../assets/images/checkbox.svg";
import dropdown from "../../../../assets/images/dropdown.svg";
import IdentifyingInformation from "../../../../forms/IdentifyingInformation";
import WorkExperience from "../../../../forms/WorkExperience";
import MilitaryExperience from "../../../../forms/MilitaryExperience";
import PracticeAffiliations from "../../../../forms/PracticeAffiliations";
import HospitalorFacilityAffiliations from "../../../../forms/HospitalorFacilityAffiliations";
import MalpracticeInsurance from "../../../../forms/MalpracticeInsurance";
import PeerReferences from "../../../../forms/PeerReferences";
import HealthDocuments from "../../../../forms/HealthDocuments";
import Education from "../../../../forms/Education";
import PracticeInformation from "../../../../forms/PracticeInformation";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { type } from "@testing-library/user-event/dist/type";
import Attestations from "../../../../forms/facilityDoc/Attestations";
import Releases from "../../../../forms/facilityDoc/Releases";
import CodeofConduct from "../../../../forms/facilityDoc/CodeofConduct";
import ProfessionalHistoryQuestions from "../../../../forms/facilityDoc/ProfessionalHistoryQuestions";
import DelineationOfPrivileges from "../../../../forms/DelineationOfPrivileges";
import PrivilegeForm from "../../../../forms/PrivilegeForm";

const FormBuilder = ({heading}) => {
  const [formElements, setFormElements] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [formName, setFormName] = useState("");
  const [update, setUpdate] = useState([]);
  const [addTemplateDDModal, setAddTemplateDDModal] = useState(false);
  const signatureRef = useRef();
  const [toggole, setToggole] = useState("Add Fields");
  const { formId, templateId } = useParams();
  const location = useLocation();
  const [template, setTemplate] = useState([]);
  const model = (key) => {
    setAddTemplateDDModal({ ...addTemplateDDModal, [key]: true });
  };
  const modelclose = (key) => {
    setAddTemplateDDModal({ ...addTemplateDDModal, [key]: false });
  };
  const filteredData = formElements
    ?.filter((v) => v.type != null)
    ?.map((item) => {
      const { icon, ...rest } = item;
      return rest;
    });
    
  const submit = async (duplicate) => {
    let jsonObjects = {
      formId: formId && !duplicate ? formId : 0,
      formName: formName?.formName,
      type: formName?.type,
      packageId: templateId ? templateId : 0,
      additionalData: filteredData,
    };
    if (formName?.formName) {
      let res = await save(urls?.applicationBuilder.saveFrom, { jsonObjects });
      setUpdate(res);
      modelclose("duplicate");
    } else {
      notify(false, "Please enter form name..!");
    }
  };
  const getAllTemplates = async (typeTemp) => {
    let jsonObjects = { packageId: 0,type:typeTemp};
    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    
    setTemplate(res);
   
  };

  const getFormById = async () => {
    let jsonObjects = { formId: formId };
    let res = await getList(urls.applicationBuilder.getallForm, {
      jsonObjects,
    });
    
    if (res) {
      let isEmpty = res[0]?.additionalData?.every(
        (obj) => Object.keys(obj)?.length === 0
      );

      setFormElements(isEmpty ? [] : res[0]?.additionalData||[]);
      setFormName({
        ...formName,
        formName: res[0]?.formName,
        type: res[0]?.type,
        packageId: res[0]?.packageId,
        packageName:res[0]?.packageName,
      });
    }
  };
console?.log(formName,"formName")
  const {
    errors,
    data,
    handleSubmit,
    headerlink,
    formChange,
    formChangeCheckbox,
    handleChange,
    addObject,
    setValues,
    writeData,
    addItem,
    removeItem,
  } = UseFormValidations({
    // initialValues:{
    //   formName:""
    // },
    // validationSchema:{
    //   formName:{
    //     required:{
    //       value:true,
    //       message:"Please enter form name"
    //     }
    //   }
    // },
    submit: submit,
  });

  const handleDragStart = (item) => setDraggedItem(item);

  const handleForm = (e, key) => {
    setFormName({
      ...formName,
      [key]: e.target.value,
    });
  };
  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    console?.log(draggedItem,"draggedItem")
    if (draggedItem && !draggedItem?.index) {
      const newFormElements = [...formElements, draggedItem];
      setFormElements(newFormElements);
      setValues({ ...draggedItem, index: newFormElements?.length - 1 });
      setDraggedItem(null);
    }
  };
  const selectedIndex = useRef(0);
  const enddropedIndex = useRef(0);

  const handleSort = () => {
    const newItems = [...formElements];
    const temp = newItems[selectedIndex.current];
    newItems[selectedIndex.current] = newItems[enddropedIndex.current];
    newItems[enddropedIndex.current] = temp;
    setFormElements(newItems);
  };

  const handleRemoveItem = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    const newFormElements = [...formElements];
    newFormElements.splice(index, 1);
    setFormElements(newFormElements);
  };

  const handleClearSignature = () => {
    signatureRef.current.clear();
  };

  const handleChangeDrag = (event, index) => {
    const { name, value } = event.target;
    const newFormElements = [...formElements];
    newFormElements[index][name] = value;
    setFormElements(newFormElements);
  };

  const handleDropdownChange = (event, index) => {
    const { value } = event.target;
    const newFormElements = [...formElements];
    newFormElements[index].selectedValue = value;
    setFormElements(newFormElements);
  };

  const allElementTypes = [
    {
      type: "text",
      label: "Single Line Text",
      placeholder: "placeholder",
      required: false,
      icon: (
        <img
          src={text}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "20px",
            width: "17px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 3,
    },
    {
      type: "heading",
      label: "Paragraph Text",
      heading: true,
      placeholder: "Paragraph Text",
      icon: (
        <img
          src={paragraph}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "19px",
            width: "14px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 12,
    },
    {
      type: "date",
      label: "Date",
      icon: (
        <img
          src={date}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "20px",
            width: "18px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 3,
      required: false,
    },
    {
      type: "time",
      label: "Time",
      icon: <MdOutlineAccessTime size={22} />,
      width: 3,
      required: false,
    },
    {
      type: "textarea",
      label: "Text Area",
      placeholder: "placeholder",
      icon: <BsTextareaResize size={22} />,
      width: 3,
      required: false,
    },
    {
      type: "file",
      label: "File",
      icon: <MdUploadFile size={22} />,
      width: 3,
      required: false,
    },
    {
      type: "checkbox",
      label: "Checkboxs",
      options: [],
      icon: (
        <img
          src={checkbox}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "18px",
            width: "18px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 3,
      required: false,
    },
    {
      type: "radio",
      label: "Radio",
      options: [],
      icon: (
        <img
          src={radio}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "19px",
            width: "19px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 3,
      required: false,
    },
    {
      type: "Select",
      label: "Drop Down",
      placeholder: "placeholder",
      options: [],
      icon: (
        <img
          src={dropdown}
          alt="cred"
          style={{
            objectFit: "fill",
            height: "20px",
            width: "20px",
            opacity: "1",
            color: " #3A3952",
          }}
        />
      ),
      width: 3,
      required: false,
    },
    {
      type: "Signature",
      label: "Signature",
      icon: <FaFileSignature size={22} />,
      width: 3,
      required: false,
    },
    {
      type: "Upload",
      label: "Upload",
      icon: <MdUploadFile size={22} />,
      width: 6,
      required: false,
    },
    // {
    //   type: "Button",
    //   label: "Button",
    //   placeholder: "Button",
    //   icon: <MdOutlineHorizontalRule size={22} />,
    //   width: 3,
    // },
    {
      type: "Under Line",
      label: "Under Line",

      icon: <MdOutlineHorizontalRule size={22} />,
      width: 12,
      required: false,
    },
  ];

  const closeAndUpdate = (d) => {
    const newFormElements = [...formElements];
    newFormElements[d?.index] = d;
    setFormElements(newFormElements);
    setToggole("Add Fields");
    setValues({});
  };
  console?.log(formName?.packageName,"formNameformName",heading)

  useEffect(() => {
    if(heading=="Application Template"){
      headerlink(
        location.pathname !=
          "/outpatientpro/facility/applicationBuilder/application_template/all/forms/create"
          ? [
              {
                name: "Application Builder",
                link: "/outpatientpro/facility/applicationBuilder",
              },
             
              {
                name: "All Application Template List",
                link: "/outpatientpro/facility/applicationBuilder/application_template/all",
              },
              {
                name: "Application Form List",
                link: `/outpatientpro/facility/applicationBuilder/application_template/all/${templateId}`,
              },
  
              {
                name: formId ? `Update Form [ ${formName?.packageName&&formName?.packageName} ]` : "Create Form",
                link: `/outpatientpro/facility/applicationBuilder/application_template/all/forms/${formId}/${templateId}`,
                active: true,
              },
            ]
          : [
              {
                name: "Application Builder",
                link: "/outpatientpro/facility/applicationBuilder",
              },
              {
                name: "Application Template List",
                link: `/outpatientpro/facility/applicationBuilder/application_template`,
              },
              {
                name: "Create Form",
                link: "/outpatientpro/facility/applicationBuilder/application_template/all/forms/create",
                
              },
              
            ]
      );
    }
     if  (heading === "Facility Document"){
      headerlink([
        {
          name: "Application Builder",
          link: "/outpatientpro/facility/applicationBuilder",
        },
        {
          name: "All Facility documents",
          link: "/outpatientpro/facility/applicationBuilder/facilitydocuments",
        },
        {
          name: "Facility Document Forms",
          link: `/outpatientpro/facility/applicationBuilder/facilit_document/all/${templateId}`,
        },
        {
          name: formId ? `Update Form [ ${formName?.packageName&&formName?.packageName} ]` : "Create Form",
          link: `/outpatientpro/facility/applicationBuilder/facilit_document/all/forms/${formId}/${templateId}`,
          active: true,
        },
      ]);
    } 
       if (heading === "Peer References") {
      headerlink([
        {
          name: "Application Builder",
          link: "/outpatientpro/facility/applicationBuilder",
        },
        // {
        //   name: "All Peer References",
        //   link: "/outpatientpro/facility/applicationBuilder/peerreferences",
        // },
        {
          name: "All Peer References",
          link: `/outpatientpro/facility/applicationBuilder/peerreferences`,
        },
        // {
        //   name: "Peer References Forms",
        //   link: `/outpatientpro/facility/applicationBuilder/peer_references/all/${templateId}`,
        // },
        {
          name: formId ? `Update Form [ ${formName?.packageName&&formName?.packageName} ]` : "Create Form",
          link: `outpatientpro/facility/applicationBuilder/peerreferences/all/forms/${formId}/${templateId}`,
          active: true,
        },
      ]);
    }
     if (heading === "Delineation Of Privileges") {
      headerlink([
        {name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder"},
        {name:"Delineation Of Privileges",link:"/outpatientpro/facility/applicationBuilder/delineationofprivileges/all/"},
     
        {
          name: formId ? `Update Form [ ${formName?.formName&&formName?.formName} ]` : "Create Form",
          link: `outpatientpro/facility/applicationBuilder/peer_references/all/forms/${formId}/${templateId}`,
          active: true,
        },
      ]);
    }
  
   
  }, [formId,formName]);
useEffect(()=>{
  if (formId) {
    getFormById();
  }
},[formId, update])
  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setToggole("Field Settings");
    }
  }, [data]);
  useEffect(() => {
    if(formName?.type){
      getAllTemplates(formName?.type);
    }
    
  }, [templateId,formName?.type]);
  const addSettings = (val) => {
    addObject(val);
    setToggole("Field Settings");
  };

  const tabs = () => {
    switch (formName?.formName) {
      case "Identifying Information":return <IdentifyingInformation />;
      
      case "Work Experience":return <WorkExperience />;
      case "Military Experience":return <MilitaryExperience />;
      case "Practice Affiliations": return <PracticeAffiliations />;
      case "Hospital/Facility Affiliations":return <HospitalorFacilityAffiliations />;
      case "Malpractice Insurance": return <MalpracticeInsurance />;
      case "Peer References": return<PeerReferences />;
      case "Health Documents":return <HealthDocuments />;
      case "Practice Information":return <PracticeInformation />;
      case "Education & Training": return<Education />;
      case "Attestations": return<Attestations />;
      case "Releases": return<Releases />;
      case "Code of Conduct": return<CodeofConduct />;
      case "Professional History Questions": return <ProfessionalHistoryQuestions />;
      case "Delineation Of Privileges standard form":return <PrivilegeForm/>
      // case "Facility Documents": return <FacilityDocuments />;
      // case "Delineation of Privileges": return <DelineationOfPrivileges />;
      // case "Medical/State License":return <MedicalAndStateLicense />;
      // case "State Controlled Substance": return <StateControlledSubstance />;
      // case "DEA License":return <DEALicense />;
      // case "Board Certifications": return <BoardCertifications />;
      // case "Professional Organizations": return <ProfessionalOrganizations />;
      // case "Additional Certifications":return <AdditionalCertifications />;
      default: return false;
    }
   
  };
  
  return (
    <div className="" style={{ overflowX: "hidden" }}>
      <form className="row bg-white p-2 " onSubmit={handleSubmit}>
        <div className="col-md-7  d-flex flex-wrap gap-2  align-items-center ">
          <div className=" col-md-4">
            <label className="p-0 m-0">Form Name*</label>
            <input
              className={"form-control"}
              value={formName?.formName}
              placeholder="Form Name*"
              name="formName"
              onChange={(e) => handleForm(e, "formName")}
            />
          </div>
          <div className=" col-md-4">
            <label>Form Type*</label>
            <select
            disabled={templateId}
              className={"form-select"}
              value={formName?.type}
              placeholder="Form Name*"
              name="type"
              onChange={(e) => handleForm(e, "type")}
            >
              <option value={""}>Select Form Type</option>
              <option>Application</option>
              <option>Facility Document</option>
              <option value={"DOP"}>Delineation Of Privileges</option>
              <option>Peer References</option>
            </select>
          </div>
          <div className=" col">
            <label>Template Name</label>
            <select
            disabled={templateId}
              className={"form-select"}
              value={formName?.packageId}
              placeholder="Template Name*"
              name="packageId"
              onChange={(e) => handleForm(e, "packageId")}
            >
              <option value={""}>Select Template</option>
              {template &&
                template?.map((v) => (
                  <option value={v?.packageId}>{v?.packageName}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-end flex-wrap gap-2 align-items-center ">
          <div
            className="duplicate-btn  rounded border pt-2 pointer "
            onClick={() => model("duplicate")}
          >
            + Duplicate
          </div>
          <div
            className="button-user pt-2 rounded border pointer  "
            onClick={() => model("template")}
            style={{ width: "208px" }}
          >
            + Add to Application Template
          </div>
          <button
            className="save  rounded border  p-2"
            type="submit"
            style={{ width: "100px" }}
          >
            Save Form
          </button>
        </div>
      </form>

     {tabs()==false? <div className="row ">
        <div
          className="col-md-9 "
          style={{
            maxHeight: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <div className="row mx-1 my-2 bg-white col-md-12 ">
            <div
              className=""
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{ minHeight: "51rem", overflow: "auto" }}
            >
              <div>
                <div className="row  p-1">
                  {formElements?.length == 0 &&
                    "Your elements draggable here..."}
                  {formElements?.filter((v) => v?.type != null)
                    ?.map((element, index) => (
                      <div
                        key={index}
                        className={`col-md-${element?.width || 3} pt-1`}
                      >
                        <div className="d-flex">
                          <div
                            className="col-md-11"
                            style={{ cursor: "move" }}
                            draggable
                            onDragStart={() => (selectedIndex.current = index)}
                            onDragEnter={() => (enddropedIndex.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(event) => event.preventDefault()}
                          >
                            {element?.heading && element?.type == "heading" && (
                              <div className=" formssubheading">
                                {element?.label}
                                {element?.required && (
                                  <span className="text-danger">*</span>
                                )}
                              </div>
                            )}

                            {element?.label && element?.type != "heading" && (
                              <label style={{ cursor: "move" }}>
                                {element?.label}
                                {element?.required && (
                                  <span className="text-danger">*</span>
                                )}
                              </label>
                            )}
                            {["text", "date", "time", "file"]?.some(
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
                                    handleChangeDrag(event, index)
                                  }
                                />
                              </div>
                            )}
                            {element?.type==="Upload"&&(
                               <div >
                               <div className=" uploadbox  rounded p-3 d-flex justify-content-center align-items-top position-relative mt-3 ">
                                 <div className="text-center py-2 mt-1 ">
                                   <IoCloudUploadOutline
                                     color="#9C9CA8"
                                     opacity={0.49}
                                     style={{ height: "36px", width: "42px" }}
                                   />
                                   <div className="f18 px-4 mt-2" style={{height:"46px",color: "#3A3952"}} >
                                     Upload a copy of your license or <br /> drag and drop in
                                     this box
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
                                     style={{background:"#3A3952B3"}}
                                     onClick={() =>
                                       document.getElementById("fileInput").click()
                                     }
                                   >
                                     Upload
                                   </button>
                                 </div>
                                
                               </div>
                             </div>
                            )}
                             {element?.type==="Under Line"&&(
                               <div className="underline py-3">
                               
                             </div>
                            )}
                            {/* {element?.type==="Button"&&(
                               <div className="button text-center py-1 rounded">
                               Save & Continue
                             </div>
                            )} */}
                            {/* { element?.type == "Button" && (
                              <div className="button rounded text-center py-1">
                                {element?.label}
                                
                              </div>
                            )} */}

                            {element?.type === "textarea" && (
                              <div className=" ">
                                <textarea
                                  id={`field_${index}`}
                                  placeholder={element?.placeholder}
                                  className="form-control"
                                  onChange={(event) =>
                                    handleChangeDrag(event, index)
                                  }
                                ></textarea>
                              </div>
                            )}

                            {element?.type === "Signature" && (
                              <div className=" " style={{ maxWidth: "500px" }}>
                                <SignatureCanvas
                                  ref={signatureRef}
                                  canvasProps={{
                                    className: "signature-canvas border",
                                  }}
                                />
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={handleClearSignature}
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
                                  onChange={(event) =>
                                    handleDropdownChange(event, index)
                                  }
                                >
                                  <option value="">{element?.label}</option>
                                  {element?.options?.map(
                                    (option, optionIndex) => (
                                      <option key={optionIndex} value={option}>
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
                                    onChange={(event) =>
                                      handleDropdownChange(event, index)
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`flexCheckDefault${i}`}
                                      value={e}
                                      key={i}
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefault${i}`}
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
                                    onChange={(event) =>
                                      handleDropdownChange(event, index)
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="radio"
                                      className="form-check-input"
                                      id={`flexCheckDefaul${i}`}
                                      value={e}
                                      key={i}
                                    />
                                    <label
                                      class="form-check-label"
                                      for={`flexCheckDefaul${i}`}
                                      className="pointer text-black"
                                    >
                                      {e.value}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="col-md-1 d-flex flex-column justify-content-end gap-1 pb-1  align-items-center">
                            <MdDeleteOutline
                              cursor="pointer"
                              onClick={(event) =>
                                handleRemoveItem(index, event)
                              }
                            />
                            <MdOutlineModeEditOutline
                              cursor="pointer"
                              onClick={() =>
                                addSettings({ ...element, index: index })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 bg-white " style={{ minHeight: "100vh" }}>
          <div className="row py-4 px-2">
            <div className=" col-md-1 text-start p-0 m-0">
              <TiArrowMove size={26} />
            </div>
            <label
              className="col-md-11 text-wrap "
              style={{ fontWeight: "400", opacity: "1" }}
            >
              Drag an element to the left to start building your form and then
              start configuring it.
            </label>
            {["Add Fields", "Field Settings"]?.map((e) => (
              <div
                className={
                  toggole == e
                    ? "col-md-6 breadcrum pointer text-active-build  my-4 py-2"
                    : "col-md-6 pointer breadcrumInactive text-inactive-build my-4 py-2"
                }
                onClick={() => setToggole(e)}
              >
                {e}
              </div>
            ))}

            <Accordion defaultActiveKey="0" className="py-1 col-md-12" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="bg-light label f14 border ">
                  Standard Elements
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    {toggole == "Field Settings" ? (
                      <>
                        <h3>Update Element</h3>
                        <Row>
                          <Col lg={12} className="mb-3" >
                            <Form.Label>Label</Form.Label>
                            <Form.Control
                              name="label"
                              value={returningValue(data?.label, "")}
                              onChange={formChange("label", "text")}
                            />
                          </Col>
                          {["textarea", "text"]?.some(
                            (e) => e == data?.type
                          ) && (
                            <Col lg={12} className="mb-3">
                              <Form.Label>Placeholder</Form.Label>
                              <Form.Control
                                name="placeholder"
                                value={returningValue(data?.placeholder, "")}
                                onChange={formChange("placeholder", "text")}
                              />
                            </Col>
                          )}
                          <Col lg={12} className="mb-3">
                            <Form.Label>Width</Form.Label>
                            <Form.Select
                              type="select"
                              name="width"
                              value={returningValue(data?.width, "")}
                              onChange={formChange("width", "select")}
                            >
                              <option value={3}>25%</option>
                              <option value={4}>33%</option>
                              <option value={6}>50%</option>
                              {/* <option value={9}>75%</option> */}
                              <option value={12}>100%</option>
                            </Form.Select>
                          </Col>
                          <Col
                            lg={12}
                            className="d-flex gap-2 align-items-center"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                checked={returningValue(data?.required, "")}
                                onChange={formChangeCheckbox("required", "")}
                                name="required"
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                                className="pointer text-black"
                              >
                                Required
                              </label>
                            </div>
                            {/* <input type="checkbox"checked={returningValue(data?.required, "")} onChange={formChangeCheckbox("required","")} name="required"/><span className="p-0 m-0">Required</span> */}
                          </Col>

                          {["checkbox", "Select", "radio"]?.some(
                            (e) => e == data?.type
                          ) && (
                            <Col lg={12}>
                              {data?.options && data?.options?.length > 0 ? (
                                <>
                                  {data?.options?.map((e, i) => {
                                    return (
                                      <div className="d-flex gap-3">
                                        <div className="col-md-10 my-1">
                                          {i == 0 && (
                                            <label className="text-size">
                                              {"Options"}
                                            </label>
                                          )}
                                          <input
                                            type="text"
                                            name="value"
                                            value={returningValue(
                                              e?.["value"],
                                              ""
                                            )}
                                            onChange={writeData(
                                              i,
                                              "options",
                                              "value",
                                              ""
                                            )}
                                            placeholder={"Option"}
                                            className={`form-control  ${returningValue(
                                              errors?.options?.[i]?.value,
                                              "ErrorColor"
                                            )}`}
                                          />
                                        </div>

                                        <div className="col-md-2 d-flex align-items-end  gap-2   ">
                                          <div>
                                            {i > 0 && (
                                              <MdOutlineCancel
                                                color="red"
                                                cursor="pointer"
                                                onClick={() =>
                                                  removeItem("options", i)
                                                }
                                              />
                                            )}
                                          </div>
                                          <div className="">
                                            {i + 1 == data?.options?.length && (
                                              <MdAddCircleOutline
                                                color="green"
                                                cursor="pointer"
                                                onClick={() =>
                                                  addItem("options", {})
                                                }
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  {
                                    <div className="">
                                      <MdAddCircleOutline
                                        color="green"
                                        cursor="pointer"
                                        onClick={() => addItem("options", {})}
                                      />{" "}
                                      Options
                                    </div>
                                  }
                                </>
                              )}
                            </Col>
                          )}
                          <Col className="d-flex justify-content-around mt-3">
                            <div
                              lg={6}
                              className="button btn bg-white border"
                              onClick={() => setValues({})}
                            >
                              Cancel{" "}
                            </div>
                            <div
                              lg={6}
                              className="button btn text-white"
                              onClick={() => closeAndUpdate(data)}
                            >
                              Apply{" "}
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row className="gap-1  ">
                          {allElementTypes?.map((e, i) => (
                            <Col
                              lg={6}
                              className=" bg-white  border rounded "
                              style={{ width: "110px",cursor:"move" }}
                            >
                              <div
                                style={{ height: "90px" }}
                                className="py-2"
                                draggable
                                onDragStart={() => handleDragStart(e)}
                              >
                                <div className="text-center py-1">
                                  {e?.icon}
                                </div>
                                <div className="text-center form-build-btn-text">
                                  {e?.label}{" "}
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

       
      </div>:<div className="px-3">{tabs()}</div>}
      {addTemplateDDModal?.template && (
          <AddTemplateDDModal
            show={addTemplateDDModal?.template}
            array={formElements}
            formId={formId}
            templateId={templateId}
            alltemplate={template}
            onHide={() => modelclose("template")}
          />
        )}
        {addTemplateDDModal?.duplicate && formName?.type&&(
          <Duplicate
            submit={submit}
            template={template}
            formName={formName}
            additionalData={filteredData}
            templateId={templateId}
            update={setUpdate}
            show={addTemplateDDModal?.duplicate}
            onHide={() => modelclose("duplicate")}
          />
        )}
    </div>
  );
};

export default FormBuilder;
