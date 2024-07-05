import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { UseFormValidations } from "../../validations/UseFormValidation";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
const ProfessionalHistoryQuestions=({values, formData,formname,DoctorFormsView,requestMsgPopUp})=>{

  const submit = () => {
    let fomvalues = [{ value: data?.firstName }, { value: data?.lastName }];
    const someValueIsMissingData = fomvalues.some(
      (item) => item.value === undefined || item.value === ""
    );
    const greentick = someValueIsMissingData == true ? "No" : "Yes";

    values(data, greentick);
  };
  const {
    data,
    errors,
    handleChange,
    handleDateChange,
    setValues,
    handleCheckbox,
    handleSubmit,
  } = UseFormValidations({
    
    submit: submit,
  });
  const checkFun = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };


  
  useEffect(()=>{setValues(formData?.documentData)},[formData])
    return (
        <>
       {DoctorFormsView ?<form onSubmit={handleSubmit}>
       {requestMsgPopUp && requestMsgPopUp != "" && <div className='py-2 px-3 bg-white'>{requestMsgPopUp()}</div>}
         <div className="bg-white p-2 mt-2">
         <div className="row">
          <div className="clo-md-12 f15 medium">
            Have any of the following ever been or are currently in the process,
            either on a voluntary or involuntary” basis: denied, revoked,
            suspended, reduced, limited, placed on probation, not renewed or
            relinquished for disciplinary reasons?
          </div>

          <label className="mt-2">
            A voluntary relinquishment or voluntary non-renewal is for
            disciplinary reasons when the relinquishment or non-renewal is done
            to avoid an adverse action, preclude an investigation, or is done
            while the health care professional is under investigation related ot
            professional conduct or competence.
          </label>
        </div>
        <div className="p-4">
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Health care professional registration/license in any state or
                district
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
              <input
                type="radio"
               
                name="healthCare"
                value="yes"
                id="yes"
                checked={checkFun("healthCare", "yes")}
                onChange={handleCheckbox("healthCare")}
              />
                <label for="yes">Yes</label>
              </div>
              <div class="checkboxWithText">
              <input
                type="radio"
                name="healthCare"
                value="no"
                id="no"
                checked={checkFun("healthCare", "no")}
                onChange={handleCheckbox("healthCare")}
              />
                <label for="no">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                State Controlled Substance Registration
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="registrationSubstance"
                  value="yes"
                  id="Substanceyes"
                  checked={checkFun("registrationSubstance", "yes")}
                  onChange={handleCheckbox("registrationSubstance")}
                />
                <label for="Substanceyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="registrationSubstance"
                  value="no"
                  id="Substanceno"
                  checked={checkFun("registrationSubstance", "no")}
                  onChange={handleCheckbox("registrationSubstance")}
                />
                <label for="Substanceno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Federal DEA Registration</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="dea"
                  value="yes"
                  id="deayes"
                  checked={checkFun("dea", "yes")}
                  onChange={handleCheckbox("dea")}
                />
                <label for="deayes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="dea"
                  value="no"
                  id="deano"
                  checked={checkFun("dea", "no")}
                  onChange={handleCheckbox("dea")}
                />
                <label for="deano">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Membership on any hospital medical/professional staff
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="membership"
                  value="yes"
                  id="membershipyes"
                  checked={checkFun("membership", "yes")}
                  onChange={handleCheckbox("membership")}
                />
                <label for="membershipyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="membership"
                  value="no"
                  id="membershipno"
                  checked={checkFun("membership", "no")}
                  onChange={handleCheckbox("membership")}
                />
                <label for="membershipno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Clinical privileges</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="privileges"
                  value="yes"
                  id="privilegesyes"
                  checked={checkFun("privileges", "yes")}
                  onChange={handleCheckbox("privileges")}
                />
                <label for="privilegesyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="privileges"
                  value="no"
                  id="privilegesno"
                  checked={checkFun("privileges", "no")}
                  onChange={handleCheckbox("privileges")}
                />
                <label for="privilegesno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Participation in the Medicare/Medicaid program
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="medicaid"
                  value="yes"
                  id="medicaidyes"
                  checked={checkFun("medicaid", "yes")}
                  onChange={handleCheckbox("medicaid")}
                />
                <label for="medicaidyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="medicaid"
                  value="no"
                  id="medicaidno"
                  checked={checkFun("medicaid", "no")}
                  onChange={handleCheckbox("medicaid")}
                />
                <label for="medicaidno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Membership in other health care organizations or plans (PPO,
                PHO, MSO, HMO, ASC)
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="otherhealthcare"
                  value="yes"
                  id="otherhealthcareyes"
                  checked={checkFun("otherhealthcare", "yes")}
                  onChange={handleCheckbox("otherhealthcare")}
                />
                <label for="otherhealthcareyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="otherhealthcare"
                  value="no"
                  id="otherhealthcareno"
                  checked={checkFun("otherhealthcare", "no")}
                  onChange={handleCheckbox("otherhealthcare")}
                />
                <label for="otherhealthcareno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Professional society membership
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="societymembership"
                  value="yes"
                  id="societymembershipyes"
                  checked={checkFun("societymembership", "yes")}
                  onChange={handleCheckbox("societymembership")}
                />
                <label for="societymembershipyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="societymembership"
                  value="no"
                  id="societymembershipno"
                  checked={checkFun("societymembership", "no")}
                  onChange={handleCheckbox("societymembership")}
                />
                <label for="societymembershipno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Board certification</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="boardcertification"
                  value="yes"
                  id="boardcertificationyes"
                  checked={checkFun("boardcertification", "yes")}
                  onChange={handleCheckbox("boardcertification")}
                />
                <label for="boardcertificationyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="boardcertification"
                  value="no"
                  id="boardcertificationno"
                  checked={checkFun("boardcertification", "no")}
                  onChange={handleCheckbox("boardcertification")}
                />
                <label for="boardcertificationno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been terminated from any health care related job?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="terminated"
                  value="yes"
                  id="terminatedyes"
                  checked={checkFun("terminated", "yes")}
                  onChange={handleCheckbox("terminated")}
                />
                <label for="terminatedyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="terminated"
                  value="no"
                  id="terminatedno"
                  checked={checkFun("terminated", "no")}
                  onChange={handleCheckbox("terminated")}
                />
                <label for="terminatedno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been convicted of a felony or are you presently
                indicted for a felony?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="felony"
                  value="yes"
                  id="felonyyes"
                  checked={checkFun("felony", "yes")}
                  onChange={handleCheckbox("felony")}
                />
                <label for="felonyyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="felony"
                  value="no"
                  id="felonyno"
                  checked={checkFun("felony", "no")}
                  onChange={handleCheckbox("felony")}
                />
                <label for="felonyno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Has any claim of sexual harassment or violation of civil rights
                ever been made against you that resulted in your receiving or
                incurring any warning, disciplinary action, or civil liability?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="sexualharassment"
                  value="yes"
                  id="sexualharassmentyes"
                  checked={checkFun("sexualharassment", "yes")}
                  onChange={handleCheckbox("sexualharassment")}
                />
                <label for="sexualharassmentyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="sexualharassment"
                  value="no"
                  id="sexualharassmentno"
                  checked={checkFun("sexualharassment", "no")}
                  onChange={handleCheckbox("sexualharassment")}
                />
                <label for="sexualharassmentno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been denied professional liability insurance?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilityinsurance"
                  value="yes"
                  id="liabilityinsuranceyes"
                  checked={checkFun("liabilityinsurance", "yes")}
                  onChange={handleCheckbox("liabilityinsurance")}
                />
                <label for="liabilityinsuranceyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilityinsurance"
                  value="no"
                  id="liabilityinsuranceno"
                  checked={checkFun("liabilityinsurance", "no")}
                  onChange={handleCheckbox("liabilityinsurance")}
                />
                <label for="liabilityinsuranceno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Has your present professional liability insurance carrier
                excluded any specific procedures from your coverage or advised
                you that it intends to terminate, reduce, or otherwise restrict
                your coverage ?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="specificprocedures"
                  value="yes"
                  id="specificproceduresyes"
                  checked={checkFun("specificprocedures", "yes")}
                  onChange={handleCheckbox("specificprocedures")}
                />
                <label for="specificproceduresyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="specificprocedures"
                  value="no"
                  id="specificproceduresno"
                  checked={checkFun("specificprocedures", "no")}
                  onChange={handleCheckbox("specificprocedures")}
                />
                <label for="specificproceduresno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have any professional liability suits ever been filed against
                you?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilitysuits"
                  value="yes"
                  id="liabilitysuitsyes"
                  checked={checkFun("liabilitysuits", "yes")}
                  onChange={handleCheckbox("liabilitysuits")}
                />
                <label for="liabilitysuitsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilitysuits"
                  value="no"
                  id="liabilitysuitsno"
                  checked={checkFun("liabilitysuits", "no")}
                  onChange={handleCheckbox("liabilitysuits")}
                />
                <label for="liabilitysuitsno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have any professional liability suits filed against you resulted
                in a judgment against you or been terminated pursuant to a
                settlement in which you have paid damagers to the plaintiff,
                with or without admitting liability?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittingliability"
                  value="yes"
                  id="admittingliabilityyes"
                  checked={checkFun("admittingliability", "yes")}
                  onChange={handleCheckbox("admittingliability")}
                />
                <label for="admittingliabilityyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittingliability"
                  value="no"
                  id="admittingliabilityno"
                  checked={checkFun("admittingliability", "no")}
                  onChange={handleCheckbox("admittingliability")}
                />
                <label for="admittingliabilityno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever settled any professional liability claim against
                you prior ot suit and admitted liability as apart of such
                settlement?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittedliability"
                  value="yes"
                  id="admittedliabilityyes"
                  checked={checkFun("admittedliability", "yes")}
                  onChange={handleCheckbox("admittedliability")}
                />
                <label for="admittedliabilityyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittedliability"
                  value="no"
                  id="admittedliabilityno"
                  checked={checkFun("admittedliability", "no")}
                  onChange={handleCheckbox("admittedliability")}
                />
                <label for="admittedliabilityno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Do you now or have you in the past two years engaged in the
                illegal use of drugs?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="drugs"
                  value="yes"
                  id="drugsyes"
                  checked={checkFun("drugs", "yes")}
                  onChange={handleCheckbox("drugs")}
                />
                <label for="drugsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="drugs"
                  value="no"
                  id="drugsno"
                  checked={checkFun("drugs", "no")}
                  onChange={handleCheckbox("drugs")}
                />
                <label for="drugsno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Are you unable ot perform any of the essential functions related
                ot the medical /professional staff position and clinical
                privileges for which you are applying with or without
                accommodation according ot accepted standards of professional
                performance and without posing a direct threat to patients?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="threattopatients"
                  value="yes"
                  id="threattopatientsyes"
                  checked={checkFun("threattopatients", "yes")}
                  onChange={handleCheckbox("threattopatients")}
                />
                <label for="threattopatientsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="threattopatients"
                  value="no"
                  id="threattopatientsno"
                  checked={checkFun("threattopatients", "no")}
                  onChange={handleCheckbox("threattopatients")}
                />
                <label for="threattopatientsno">No</label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <button type="submit" className="button border rounded text-white p-2">
            Save & Continue
          </button>
        </div>
         </div>
         </form>:
         <div className="bg-white p-2 mt-2">
           {requestMsgPopUp && requestMsgPopUp != "" && <div className='py-2 px-3 bg-white'>{requestMsgPopUp()}</div>}
         <div className="row">
          <div className="clo-md-12 f15 medium">
            Have any of the following ever been or are currently in the process,
            either on a voluntary or involuntary” basis: denied, revoked,
            suspended, reduced, limited, placed on probation, not renewed or
            relinquished for disciplinary reasons?
          </div>

          <label className="mt-2">
            A voluntary relinquishment or voluntary non-renewal is for
            disciplinary reasons when the relinquishment or non-renewal is done
            to avoid an adverse action, preclude an investigation, or is done
            while the health care professional is under investigation related ot
            professional conduct or competence.
          </label>
        </div>
        <div className="p-4">
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Health care professional registration/license in any state or
                district
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
              <input
                type="radio"
               
                name="healthCare"
                value="yes"
                id="yes"
                checked={checkFun("healthCare", "yes")}
                onChange={handleCheckbox("healthCare")}
              />
                <label for="yes">Yes</label>
              </div>
              <div class="checkboxWithText">
              <input
                type="radio"
                name="healthCare"
                value="no"
                id="no"
                checked={checkFun("healthCare", "no")}
                onChange={handleCheckbox("healthCare")}
              />
                <label for="no">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                State Controlled Substance Registration
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="registrationSubstance"
                  value="yes"
                  id="Substanceyes"
                  checked={checkFun("registrationSubstance", "yes")}
                  onChange={handleCheckbox("registrationSubstance")}
                />
                <label for="Substanceyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="registrationSubstance"
                  value="no"
                  id="Substanceno"
                  checked={checkFun("registrationSubstance", "no")}
                  onChange={handleCheckbox("registrationSubstance")}
                />
                <label for="Substanceno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Federal DEA Registration</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="dea"
                  value="yes"
                  id="deayes"
                  checked={checkFun("dea", "yes")}
                  onChange={handleCheckbox("dea")}
                />
                <label for="deayes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="dea"
                  value="no"
                  id="deano"
                  checked={checkFun("dea", "no")}
                  onChange={handleCheckbox("dea")}
                />
                <label for="deano">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Membership on any hospital medical/professional staff
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="membership"
                  value="yes"
                  id="membershipyes"
                  checked={checkFun("membership", "yes")}
                  onChange={handleCheckbox("membership")}
                />
                <label for="membershipyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="membership"
                  value="no"
                  id="membershipno"
                  checked={checkFun("membership", "no")}
                  onChange={handleCheckbox("membership")}
                />
                <label for="membershipno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Clinical privileges</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="privileges"
                  value="yes"
                  id="privilegesyes"
                  checked={checkFun("privileges", "yes")}
                  onChange={handleCheckbox("privileges")}
                />
                <label for="privilegesyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="privileges"
                  value="no"
                  id="privilegesno"
                  checked={checkFun("privileges", "no")}
                  onChange={handleCheckbox("privileges")}
                />
                <label for="privilegesno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Participation in the Medicare/Medicaid program
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="medicaid"
                  value="yes"
                  id="medicaidyes"
                  checked={checkFun("medicaid", "yes")}
                  onChange={handleCheckbox("medicaid")}
                />
                <label for="medicaidyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="medicaid"
                  value="no"
                  id="medicaidno"
                  checked={checkFun("medicaid", "no")}
                  onChange={handleCheckbox("medicaid")}
                />
                <label for="medicaidno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Membership in other health care organizations or plans (PPO,
                PHO, MSO, HMO, ASC)
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="otherhealthcare"
                  value="yes"
                  id="otherhealthcareyes"
                  checked={checkFun("otherhealthcare", "yes")}
                  onChange={handleCheckbox("otherhealthcare")}
                />
                <label for="otherhealthcareyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="otherhealthcare"
                  value="no"
                  id="otherhealthcareno"
                  checked={checkFun("otherhealthcare", "no")}
                  onChange={handleCheckbox("otherhealthcare")}
                />
                <label for="otherhealthcareno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Professional society membership
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="societymembership"
                  value="yes"
                  id="societymembershipyes"
                  checked={checkFun("societymembership", "yes")}
                  onChange={handleCheckbox("societymembership")}
                />
                <label for="societymembershipyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="societymembership"
                  value="no"
                  id="societymembershipno"
                  checked={checkFun("societymembership", "no")}
                  onChange={handleCheckbox("societymembership")}
                />
                <label for="societymembershipno">No</label>
              </div>
            </div>
          </div>

          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">Board certification</label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="boardcertification"
                  value="yes"
                  id="boardcertificationyes"
                  checked={checkFun("boardcertification", "yes")}
                  onChange={handleCheckbox("boardcertification")}
                />
                <label for="boardcertificationyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="boardcertification"
                  value="no"
                  id="boardcertificationno"
                  checked={checkFun("boardcertification", "no")}
                  onChange={handleCheckbox("boardcertification")}
                />
                <label for="boardcertificationno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been terminated from any health care related job?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="terminated"
                  value="yes"
                  id="terminatedyes"
                  checked={checkFun("terminated", "yes")}
                  onChange={handleCheckbox("terminated")}
                />
                <label for="terminatedyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="terminated"
                  value="no"
                  id="terminatedno"
                  checked={checkFun("terminated", "no")}
                  onChange={handleCheckbox("terminated")}
                />
                <label for="terminatedno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been convicted of a felony or are you presently
                indicted for a felony?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="felony"
                  value="yes"
                  id="felonyyes"
                  checked={checkFun("felony", "yes")}
                  onChange={handleCheckbox("felony")}
                />
                <label for="felonyyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="felony"
                  value="no"
                  id="felonyno"
                  checked={checkFun("felony", "no")}
                  onChange={handleCheckbox("felony")}
                />
                <label for="felonyno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Has any claim of sexual harassment or violation of civil rights
                ever been made against you that resulted in your receiving or
                incurring any warning, disciplinary action, or civil liability?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="sexualharassment"
                  value="yes"
                  id="sexualharassmentyes"
                  checked={checkFun("sexualharassment", "yes")}
                  onChange={handleCheckbox("sexualharassment")}
                />
                <label for="sexualharassmentyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="sexualharassment"
                  value="no"
                  id="sexualharassmentno"
                  checked={checkFun("sexualharassment", "no")}
                  onChange={handleCheckbox("sexualharassment")}
                />
                <label for="sexualharassmentno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever been denied professional liability insurance?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilityinsurance"
                  value="yes"
                  id="liabilityinsuranceyes"
                  checked={checkFun("liabilityinsurance", "yes")}
                  onChange={handleCheckbox("liabilityinsurance")}
                />
                <label for="liabilityinsuranceyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilityinsurance"
                  value="no"
                  id="liabilityinsuranceno"
                  checked={checkFun("liabilityinsurance", "no")}
                  onChange={handleCheckbox("liabilityinsurance")}
                />
                <label for="liabilityinsuranceno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Has your present professional liability insurance carrier
                excluded any specific procedures from your coverage or advised
                you that it intends to terminate, reduce, or otherwise restrict
                your coverage ?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="specificprocedures"
                  value="yes"
                  id="specificproceduresyes"
                  checked={checkFun("specificprocedures", "yes")}
                  onChange={handleCheckbox("specificprocedures")}
                />
                <label for="specificproceduresyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="specificprocedures"
                  value="no"
                  id="specificproceduresno"
                  checked={checkFun("specificprocedures", "no")}
                  onChange={handleCheckbox("specificprocedures")}
                />
                <label for="specificproceduresno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have any professional liability suits ever been filed against
                you?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilitysuits"
                  value="yes"
                  id="liabilitysuitsyes"
                  checked={checkFun("liabilitysuits", "yes")}
                  onChange={handleCheckbox("liabilitysuits")}
                />
                <label for="liabilitysuitsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="liabilitysuits"
                  value="no"
                  id="liabilitysuitsno"
                  checked={checkFun("liabilitysuits", "no")}
                  onChange={handleCheckbox("liabilitysuits")}
                />
                <label for="liabilitysuitsno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have any professional liability suits filed against you resulted
                in a judgment against you or been terminated pursuant to a
                settlement in which you have paid damagers to the plaintiff,
                with or without admitting liability?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittingliability"
                  value="yes"
                  id="admittingliabilityyes"
                  checked={checkFun("admittingliability", "yes")}
                  onChange={handleCheckbox("admittingliability")}
                />
                <label for="admittingliabilityyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittingliability"
                  value="no"
                  id="admittingliabilityno"
                  checked={checkFun("admittingliability", "no")}
                  onChange={handleCheckbox("admittingliability")}
                />
                <label for="admittingliabilityno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Have you ever settled any professional liability claim against
                you prior ot suit and admitted liability as apart of such
                settlement?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittedliability"
                  value="yes"
                  id="admittedliabilityyes"
                  checked={checkFun("admittedliability", "yes")}
                  onChange={handleCheckbox("admittedliability")}
                />
                <label for="admittedliabilityyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="admittedliability"
                  value="no"
                  id="admittedliabilityno"
                  checked={checkFun("admittedliability", "no")}
                  onChange={handleCheckbox("admittedliability")}
                />
                <label for="admittedliabilityno">No</label>
              </div>
            </div>
          </div>

          <div className=" row  border ">
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Do you now or have you in the past two years engaged in the
                illegal use of drugs?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="drugs"
                  value="yes"
                  id="drugsyes"
                  checked={checkFun("drugs", "yes")}
                  onChange={handleCheckbox("drugs")}
                />
                <label for="drugsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="drugs"
                  value="no"
                  id="drugsno"
                  checked={checkFun("drugs", "no")}
                  onChange={handleCheckbox("drugs")}
                />
                <label for="drugsno">No</label>
              </div>
            </div>
          </div>
          <div
            className=" row  border  "
            style={{ background: "#ECECEC 0% 0% no-repeat padding-box" }}
          >
            <div className="col-md-9 mt-2">
              <label className="f14 text-black">
                Are you unable ot perform any of the essential functions related
                ot the medical /professional staff position and clinical
                privileges for which you are applying with or without
                accommodation according ot accepted standards of professional
                performance and without posing a direct threat to patients?
              </label>
            </div>
            <div className=" d-flex justify-content-end  gap-2 col-md-3 ">
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="threattopatients"
                  value="yes"
                  id="threattopatientsyes"
                  checked={checkFun("threattopatients", "yes")}
                  onChange={handleCheckbox("threattopatients")}
                />
                <label for="threattopatientsyes">Yes</label>
              </div>
              <div class="checkboxWithText">
                <input
                  type="radio"
                  name="threattopatients"
                  value="no"
                  id="threattopatientsno"
                  checked={checkFun("threattopatients", "no")}
                  onChange={handleCheckbox("threattopatients")}
                />
                <label for="threattopatientsno">No</label>
              </div>
            </div>
          </div>
        </div>
       
         </div>
         }
        </>
      );
}
export default ProfessionalHistoryQuestions