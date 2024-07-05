import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SiAdobecreativecloud } from "react-icons/si";
import { UseFormValidations } from "../validations/UseFormValidation";
import { getById, getList, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import { useParams } from "react-router-dom";
import moment from "moment";
import { type } from "@testing-library/user-event/dist/type";

const DOPBDMD = () => {

  const [update, setUpdate] = useState();
  const [DOPData, setDOPData] = useState()
  const [MdData, setMdData] = useState()
  const { usertype, appId, medicalId, dopId, Guid } = useParams()



  const submit = async () => {


    let jsonObjects = {
      userId: medicalId,
      appointmentId: appId,
      type: usertype == "medical_director" ? "MD" : "BD",
      isApproved: "Yes",
      guid: Guid,
      dopData: [data],
      formType:"DOP"
    }

    let res = await save(urls?.forms?.SaveBoardSummary, { jsonObjects })
    if (res) {
      setUpdate(res)
    }
  };







  const {
    data,
    errors,
    handleCheckbox,
    setValues,
    handleSubmit,
    handleChange,
    handleDateChange,
    addObject
  } = UseFormValidations({
    

       submit: submit,
  });



console?.log(data,"aaaa",MdData)

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };


  const getDOPFormData = async (app,dop) => {
    let jsonObjects = {
      appointmentId: app,
      formId:105,
      type: "DOP",
    };
    let res = await getById(urls?.forms?.gethealthdoc, { jsonObjects });
    setDOPData(res)

  }
  const getMdFormData = async () => {
    let jsonObjects = {
      appointmentId: appId,
      type: usertype == "medical_director" ? "MD" : "BD",
      formType:"DOP",
      filterType: "Link"
      // guid:Guid
    };
    let res = await getById(urls?.forms?.GetAllBoardSummary, { jsonObjects });
    setMdData(res)

  }


  const array1 = [{ name: "Anesthesiologist only: Direct supervision of anesthesia services provided by qualified Licensed Providers or Allied Health Providers (i.e. CRNA’s, AA’s)", Btype: "banesthesiologist", mdtype: "mdanesthesiologist", type: "anesthesiologist" },
  { name: "ANESTHESIA PROCEDURE", font: "bold" },
  { name: "Topical Agents", Btype: "btopical", mdtype: "mdtopical", type: "topical", mdfield: "mdtopicalAgents", field: "topicalAgents" },
  { name: "Peribulbar injection", Btype: "bperibulbar", mdtype: "mdperibulbar", type: "peribulbar", mdfield: "mdperibulbarInjection", field: "peribulbarInjection" },
  { name: "Retrobulbar injection", Btype: "bretrobulbar", mdtype: "mdretrobulbar", type: "retrobulbar", mdfield: "mdretrobulbarInjection", field: "retrobulbarInjection" },
  { name: "Intravenous sedation", Btype: "bintravenous", mdtype: "mdintravenous", type: "intravenous", mdfield: "mdintravenousSedation", field: "intravenousSedation" },
  { name: "Moderate sedation /analgesia (conscious sedation) including the administration of Propofol", Btype: "bmoderateSedation", mdtype: "mdmoderateSedation", type: "moderateSedation", mdfield: "mdmoderateInAnalgesia", field: "moderateInAnalgesia" },
  { name: "Deep sedation/analgesia including the administration of Propofol", Btype: "bdeepSedation", mdtype: "mddeepSedation", type: "deepSedation", mdfield: "mddeepsedationAnalgesia", field: "deepsedationAnalgesia" },
  { name: "General Anesthesia Administration", Btype: "bgeneralanesthesia", mdtype: "mdgeneralanesthesia", type: "generalanesthesia", mdfield: "mdgeneralAnesthesia", field: "generalAnesthesia" },
  { name: "Regional blocks/Nerve blocks/treatments", Btype: "bRegionalblocksNerve", mdtype: "mdRegionalblocksNerve", type: "RegionalblocksNerve", mdfield: "mdRegionalBlocksNerve", field: "RegionalBlocksNerve" },
  { name: "Ankle block", Btype: "bankle", mdtype: "mdankle", type: "ankle", mdfield: "mdankleBlock", field: "ankleBlock" },
  { name: "Axillary Nerve Block", Btype: "baxillary", mdtype: "mdaxillary", type: "axillary", mdfield: "mdaxillaryNerve", field: "axillaryNerve" },
  { name: "Bier Block", Btype: "bbier", mdtype: "mdbier", type: "bier", mdfield: "mdbierBlock", field: "bierBlock" },
  { name: "Femoral Nerve Block", Btype: "bfemoral", mdtype: "mdfemoral", type: "femoral", mdfield: "mdfemoralNerve", field: "femoralNerve" },
  { name: "Fornical", Btype: "bfornical", mdtype: "mdfornical", type: "fornical", mdfield: "mdfornical1", field: "fornical1" },
  { name: "Intercostal", Btype: "bintercostal", mdtype: "mdintercostal", type: "intercostal", mdfield: "mdintercostal1", field: "intercostal1" },
  { name: "Interscalene Nerve Block", Btype: "binterscalene", mdtype: "mdinterscalene", type: "interscalene", mdfield: "mdinterscaleneNerve", field: "interscaleneNerve" },
  { name: "Local infiltration", Btype: "blocalinfiltration", mdtype: "mdlocalinfiltration", type: "localinfiltration", mdfield: "mdlocalInfiltration", field: "localInfiltration" },
  { name: "Lower extremity", Btype: "blowerextremity", mdtype: "mdlowerextremity", type: "lowerextremity", mdfield: "mdlowerExtremity", field: "lowerExtremity" },
  { name: "Peripheral", Btype: "bperipheral", mdtype: "mdperipheral", type: "peripheral", mdfield: "mdperipheral1", field: "peripheral1" },
  { name: "Spinal/Epidural", Btype: "bspinal", mdtype: "mdspinal", type: "spinal", mdfield: "mdepidural", field: "epidural" },
  { name: "Steroid injection", Btype: "bsteroidinjection", mdtype: "mdsteroidinjection", type: "steroidinjection", mdfield: "mdsteroidInjection", field: "steroidInjection" },
  { name: "Supraclavicular / Infraclavicular Block", Btype: "bsupraclavicular", mdtype: "mdsupraclavicular", type: "supraclavicular", mdfield: "mdSupraclavicular1", field: "Supraclavicular1" },
  { name: "Upper extremity", Btype: "bupperextremity", mdtype: "mdupperextremity", type: "upperextremity", mdfield: "mdupperExtremity", field: "upperExtremity" },
  { name: "OTHER ANESTHESIA", font: "bold" },
  { name: "Pediatric Anesthesia care", Btype: "bpediatricanesthesia", mdtype: "mdpediatricanesthesia", type: "pediatricanesthesia", mdfield: "mdpediatricAnesthesia", field: "pediatricAnesthesia" },
  { name: "Pre-anesthesia assessment", Btype: "bpreanesthesia", mdtype: "mdpreanesthesia", type: "preanesthesia", mdfield: "mdpreAnesthesia", field: "preAnesthesia" },
  { name: "Request laboratory/diagnostic studies", Btype: "brequestlaboratory", mdtype: "mdrequestlaboratory", type: "requestlaboratory", mdfield: "mdrequestLaboratory", field: "requestLaboratory" },
  { name: "Review of laboratory/diagnostic studies", Btype: "breviewoflaboratory", mdtype: "mdreviewoflaboratory", type: "reviewoflaboratory", mdfield: "mdreviewofLaboratory", field: "reviewofLaboratory" },
  { name: "Administer pre-anesthesia medications", Btype: "badministerpreanesthesia", mdtype: "mdadministerpreanesthesia", type: "administerpreanesthesia", mdfield: "mdadministerPreanesthesia", field: "administerPreanesthesia" },
  { name: "Administer adjuvant drugs", Btype: "badministeradjuvant", mdtype: "mdadministeradjuvant", type: "administeradjuvant", mdfield: "mdadministerAdjuvant", field: "administerAdjuvant" },
  { name: "Post-anesthesia care/release procedures", Btype: "bpostanesthesia", mdtype: "mdpostanesthesia", type: "postanesthesia", mdfield: "mdpostAnesthesia", field: "postAnesthesia" },
  { name: "Medication management", Btype: "bmedicationmanagement", mdtype: "mdmedicationmanagement", type: "medicationmanagement", mdfield: "mdmedicationManagement", field: "medicationManagement" },
  { name: "ANESTHESIA MANAGEMENT", font: "bold" },
  { name: "Accessory drugs for homeostasis", Btype: "baccessorydrugs", mdtype: "mdaccessorydrugs", type: "accessorydrugs", mdfield: "mdaccessoryDrugs", field: "accessoryDrugs" },
  { name: "Mechanical ventilation/oxygen therapy", Btype: "bmechanicalventilation", mdtype: "mdmechanicalventilation", type: "mechanicalventilation", mdfield: "mdmechanicalVentilation", field: "mechanicalVentilation" },
  { name: "Fluids, electrolytes, acid/base", Btype: "bfluids", mdtype: "mdfluids", type: "fluids", mdfield: "mdfluids1", field: "fluids1" },
  { name: "Insertion of peripheral intravenous catheter", Btype: "binsertionofperipheral", mdtype: "mdinsertionofperipheral", type: "insertionofperipheral", mdfield: "mdinsertionofPeripheral", field: "insertionofPeripheral" },
  { name: "Management of patient pain: Acute", Btype: "bmanagementofpatient", mdtype: "mdmanagementofpatient", type: "managementofpatient", mdfield: "mdmanagementofPatient", field: "managementofPatient" },
  { name: "Chronic", Btype: "bchronic", mdtype: "mdchronic", type: "chronic", mdfield: "mdchronic", field: "chronic" },
  { name: "MISCELLANEOUS PROCEDURES", font: "bold" },
  { name: "Use of C-arm for verification/guidance/assistance with procedures", Btype: "buseofcarm", mdtype: "mduseofcarm", type: "useofcarm", mdfield: "mduseofCarm", field: "useofCarm" },
  { name: "Use of Ultrasound for verification/guidance/assistance with procedures", Btype: "buseofultrasound", mdtype: "mduseofultrasound", type: "useofultrasound", mdfield: "mduseofUltrasound", field: "useofUltrasound" },
  { name: "Other", Btype: "bother1", mdtype: "mdother1", type: "other1", mdfield: "mdother11", field: "other11" },
  { name: "Other", Btype: "bother2", mdtype: "mdother2", type: "other2", mdfield: "mdother22", field: "other22" },
  { name: "Other", Btype: "bother3", mdtype: "mdother3", type: "other3", mdfield: "mdother33", field: "other33" },


  ]



  useEffect(() => {
    if(appId&&dopId){
      // getDOPFormData(appId,dopId)
    }
  }, [appId,dopId,update])

useEffect(()=>{
  if(usertype&&appId){
    getMdFormData()
  }
  
},[usertype,update,Guid])



  useEffect(() => {
    // setValues(MdData?.length==1?MdData&&MdData[0]:MdData&&MdData[1])
    let obj={
      userName:MdData?.userName,
      providerName:MdData?.providerName,
      roleName:MdData?.roleName


    }
    let objTwo=MdData?.dopData&&{...obj,...MdData?.dopData[0],...MdData?.documentData}
addObject(objTwo)
  }, [MdData,update])

  const checkedFn = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div lg={12} className="bgheader d-flex justify-content-center p-2 ">
            <div lg={12} className=" d-flex justify-content-center ">
              <SiAdobecreativecloud size={34} color="white" className="py-1" />
              <span className="text-white px-2 headerfont1">OutPatientPro</span>
            </div>
          </div>

          <div className="mt-2 bg-white py-2">
            <div className="d-flex justify-content-between">
              <div className="f24 medium col-md-6  px-5">
                Delineation of Privileges
              </div>
              <div className="f17 medium  col-md-3 mt-2  px-2">
                Name: {data?.userName}
              </div>
              <div className="f17 medium  col-md-3 mt-2 d-flex justify-content-end px-2">
                Provider Name: {data?.providerName}{" "}{`[${data?.roleName}]`}
              </div>
            </div>
          </div>

          <div className=" p-3  bg-white mt-2">
            <div className="f20 medium mb-3">
              Privilege Request Form: Anesthesiologist
            </div>

            <div
              className="row border text-white py-3 p-2"
              style={{ background: "#8B8B8B 0% 0% no-repeat padding-box" }}
            >
              <div className="col-md-3 f15 ">Individual Privilege</div>
              <div className="col-md-1 f15 ">Requested</div>
              <div className="col-md-3 f15 border-primary">Provider Notes</div>
              <div className="col-md-1 f15">
                Medical <br /> Director{" "}
              </div>
              <div className={usertype != "medical_director"?"col-md-3 f15 border-primary":"col-md-4 f15 border-primary"}>
                Medical Director Notes
              </div>
              {usertype != "medical_director"&&<div className="col-md-1 f15">
                Board
                <br /> Member{" "}
              </div>}
            </div>
            {array1 &&
              array1?.map((v, i) => {
                return (
                  <>
                    <div
                      className="row border d-flex align-items-center "
                      style={{ background: i % 2 == 0 && "#F5F7F8" }}
                    >
                      <div
                        className={
                          v?.font
                            ? "col-md-3 f16 medium py-3"
                            : i == 0
                              ? "col-md-3 f14 py-2"
                              : "col-md-3 f14 "
                        }
                      >
                        {v?.name}
                      </div>

                      <div className="col-md-1">
                        {v?.type && (
                          <input
                            type={"checkbox"}
                            disabled
                            name={v?.type}
                            checked={checkedFn(v?.type, "yes")}
                            value={"yes"}
                            className="me-1 bg-info"
                          />
                        )}
                      </div>
                      <div className="col-md-3 f14  mb-2">
                        {v?.field && (
                          <input
                            disabled
                            className="form-control bg-light "
                            value={data?.[v?.field]}
                            onChange={handleChange(v?.field)}
                            placeholder="Notes..."
                            name={v?.field}
                          ></input>
                        )}
                      </div>

                      <div className="col-md-1">
                        {v?.mdtype && (
                          <input
                          disabled={usertype!="medical_director"}
                            type={"checkbox"}
                            onChange={handleCheckbox(v?.mdtype)}
                            name={v?.mdtype}
                            checked={checkedFn(v?.mdtype, "yes")}
                            value={"yes"}
                            className="me-1"
                          />
                        )}
                      </div>
                      <div className={usertype != "medical_director"?"col-md-3 f14  mb-2":"col-md-4 f14  mb-2"}>
                        {v?.mdfield && (
                          <input
                            className={usertype!="medical_director"?"form-control bg-light ":"form-control bg-white "}
                            onChange={handleChange(v?.mdfield)}
                            placeholder="Notes..."
                            name={v?.mdfield}
                            value={data?.[v?.mdfield]}
                            disabled={usertype!="medical_director"}
                          ></input>
                        )}
                      </div>

                      {usertype != "medical_director"&&<div className="col-md-1">
                        {v?.Btype && (
                          <input
                            type={"checkbox"}
                            onChange={handleCheckbox(v?.Btype)}
                            name={v?.Btype}
                            checked={checkedFn(v?.Btype, "yes")}
                            value={"yes"}
                            className="me-1"
                          />
                        )}
                      </div>}
                    </div>
                  </>
                );
              })}
          </div>

          <div className=" p-3  bg-white mt-2">
            <div className="f24 medium">Approve and Sign</div>

           { usertype=="medical_director"?<div className="row mt-3"><div className="col-md-3">
              <label className="f15 medium">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("firstName")}
                value={data?.firstName}
                onChange={handleChange("firstName")}
                placeholder="First Name"
              ></input>
            </div>
              <div className="col-md-2">
                <label className="f15 medium">Middle Initial</label>
                <input
                  className="form-control bg-white"
                  value={data?.middleName}
                  onChange={handleChange("middleName")}
                  placeholder="Middle Name"
                ></input>
              </div>
              <div className="col-md-3">
                <label className="f15 medium">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("lastName")}
                  value={data?.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Last Name"
                ></input>
              </div>
              <div className="col-md-3">
                <label className="f15 medium">Today’s Date <span className="text-danger">*</span></label>
                <DatePicker
                  className={`${emailErrorColor("todayDate")} py-2`}
                  minDate={new Date(1900, 1, 1)}
                  selected={data?.todayDate&&moment(new Date(data?.todayDate)).format("MM/DD/YYYY")}
                  autoComplete="off"
                  name="todayDate"
                  onChange={(e) => {
                    handleDateChange(e, "todayDate");
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  showIcon
                  // icon={
                  //   <svg
                  //     xmlns="http://www.w3.org/2000/svg"
                  //     width="18"
                  //     height="18"
                  //     fill="#B2B2B2"
                  //     class="bi bi-calendar"
                  //     viewBox="0 0 16 16"
                  //   >
                  //     <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  //   </svg>
                  // }
                />
              </div></div>:
              <div className="row mt-3"><div className="col-md-3">
            <label className="f15 medium">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              className={emailErrorColor("bdfirstName")}
              value={data?.bdfirstName}
              onChange={handleChange("bdfirstName")}
              placeholder="First Name"
            ></input>
          </div>
            <div className="col-md-2">
              <label className="f15 medium">Middle Initial</label>
              <input
                className="form-control bg-white"
                value={data?.bdmiddleName}
                onChange={handleChange("bdmiddleName")}
                placeholder="Middle Name"
              ></input>
            </div>
            <div className="col-md-3">
              <label className="f15 medium">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("bdlastName")}
                value={data?.bdlastName}
                onChange={handleChange("bdlastName")}
                placeholder="Last Name"
              ></input>
            </div>
            <div className="col-md-3">
              <label className="f15 medium">Today’s Date <span className="text-danger">*</span></label>
             
              <DatePicker
                className={`${emailErrorColor("todayDate")} py-2`}
                minDate={new Date(1900, 1, 1)}
                selected={data?.bdtodayDate&&moment(new Date(data?.bdtodayDate)).format("MM/DD/YYYY")}
                autoComplete="off"
                name="bdtodayDate"
                onChange={(e) => {
                  handleDateChange(e, "bdtodayDate");
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
            </div></div>}
            <hr />
            <div>
              <button type="submit" className="save rounded border text-white p-2 pointer">
                Accept & Sign
              </button>
            </div>

          </div>
        </div>
      </form>
    </>
  );
};

export default DOPBDMD;
