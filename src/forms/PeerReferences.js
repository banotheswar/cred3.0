import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../validations/UseFormValidation";
import { getList } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import Select from "react-select";
import moment from "moment";
import PeerRequestModel from "./PeerRequestModel";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

const PeerReferences = ({values, getFormdata,id,formname,setFormName,setRequestModal,saveLogsForm,DoctorFormsView,requestMsgPopUp}) => {
  const [Speciality, setSpeciality] = useState();
const [links,setLinks]=useState("Reference #1")
const [sentRequest,setsentRequest]=useState(false)
const {formId} =useParams()
  const submit = () => {

    const checkForKeyEmpty = () => {
      for (let i = 0; i < data?.peerReferences?.length; i++) {
        const obj = data?.peerReferences[i];
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && obj[key] === "") {
            return "No";
          }
        }
      }
      return "Yes";
    };
    const greentick = checkForKeyEmpty();
   
    data?.peerReferences?.map((v,i)=>{
      v["type"]=`Reference${i+1}`
      v["questionnaire"]=v?.questionnaire||[]
    })
 values(id,data?.peerReferences, greentick);
  };

  const specialityAll = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });
    setSpeciality(res);
  };

  const {
    data,
    errors,
    
    setValues,
    writeData,
    writeMultiSelect,
    handleSubmit,
  } = UseFormValidations({
initialValues:{
peerReferences:[
  {prefix:"",peerfirstName:"",peerlastName:"", type:"Reference #1",peeremail:"",peerqualification:"",peerspecialty:[],peerrelationship:"",lengthTimeKnown:""},
  {prefix:"",peerfirstName:"",peerlastName:"",type:"Reference #2",peeremail:"",peerqualification:"",peerspecialty:[],peerrelationship:"",lengthTimeKnown:""},
]
},

    submit: submit,
  });

  useEffect(() => {
    if(Array.isArray(getFormdata)){
      let obj={peerReferences:getFormdata}
      setValues(obj);
    }
   
  }, [getFormdata]);
  useEffect(() => {
    specialityAll();
  }, []);
  const setRef=(v)=>{
    let key=data?.peerReferences&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire.length==0?"No":"Yes"
    
    formname["sentKey"]=key
    setLinks(v)
  
  }
 console?.log(data?.peerReferences&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire.length,"111111111")
 
  return (
    <>
     {DoctorFormsView||formId? <form onSubmit={handleSubmit}>
        <div className="row px-2 py-3 mt-2 bg-white ">
        {!formId&&requestMsgPopUp!=""&&<div className='mb-3'>{requestMsgPopUp()}</div>}
          {Array.isArray(data?.peerReferences)&& data?.peerReferences?.map((v,i)=>{
            return (
              <div className="pb-3">
              <h2 className="mt-4" style={{ fontSize: "1rem" }}>Reference #{i+1}</h2>
              <div className="row">
            <div className="col-md-4">
              <label>
                Prefix <span className="text-danger">*</span>
              </label>

              <select
                className="form-select "
                name="prefix"
                value={v?.prefix}
                      onChange={writeData(
                        i,
                        "peerReferences",
                        "prefix"
                      )}
              >
                <option>Select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>
                First Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control bg-white"
                
                value={v?.peerfirstName}
                      onChange={writeData(
                        i,
                        "peerReferences",
                        "peerfirstName"
                      )}
                placeholder="First Name"
                name="peerfirstName"
              ></input>
            </div>
            <div className="col-md-4">
              <label>
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Last Name..."
                value={v?.peerlastName}
                onChange={writeData(
                  i,
                  "peerReferences",
                  "peerlastName"
                )}
                name="peerlastName"
              />
            </div>
            <div className="col-md-6 mt-2">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Email"
                name="peeremail"
                value={v?.peeremail}
                onChange={writeData(i,"peerReferences","peeremail")}
              ></input>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label>
                Qualification <span className="text-danger">*</span>
              </label>
              <select
                className="form-select "
                name="peerqualification"
                value={v?.peerqualification}
                onChange={writeData(i,"peerReferences","peerqualification")}
              >
                <option value={""}>Select</option>
                <option>Doctor of Medicine (MD)</option>
                <option>
                  Bachelor of Medicine, Bachelor of Surgery (MBBS, MBChB, MBBCh)
                </option>
                <option>Master of Public Health (MPH) </option>
                <option>Master of Science in Anesthesia (MSA)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>
                Specialty <span className="text-danger">*</span>
              </label>
              {/* <input
            className="form-control"
            placeholder="Specialty..."
            value={data?.peerspecialty}
            onChange={handleChange("peerspecialty")}
            name="peerspecialty"
          /> */}
              <Select
                isMulti
                closeMenuOnSelect={false}
                className={
                  errors && errors?.["peerspecialty"]
                    ? "border border-danger col-md-12 rounded mt-2"
                    : " col-md-12 mt-2"
                }
                onChange={writeMultiSelect(i,"peerReferences","peerspecialty")}
                value={v?.peerspecialty}
                options={Speciality?.map((v) => {
                  return { label: v?.specialityName, value: v?.specialityId };
                })}
              ></Select>
            </div>
            <div className="col-md-6">
              <label>
                Relationship <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Relationship..."
                name="peerrelationship"
                value={v?.peerrelationship}
                onChange={writeData(i,"peerReferences","peerrelationship")}
              />
            </div>
            <div className="col-md-6">
              <label>
                Length of Time Known <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder=" Time Known..."
                name="lengthTimeKnown"
                value={v?.lengthTimeKnown}
                onChange={writeData(i,"peerReferences","lengthTimeKnown")}
              />
            </div>
          </div>
              </div>
            )
          })}

          

          <hr />
          <div>
            <button
              type="submit"
              className="button border rounded text-white p-2"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>:
      <>
      <div className="row bg-white  mt-2 py-2">
{
  ["Reference #1","Reference #2"]?.map((v)=>{
    return (
      <div className="col-md-auto" onClick={()=>setRef(v)}>
<button className={v ==links? " rounded-0 button text-white border rounded py-2 mx-1 ": " button bg-white  border rounded-0 py-2 mx-1"}
style={{ background: "#ECECEC", color: "#7E7E7E" }}>{v}</button>
      </div>
    )
  })
}
</div>
      <div className="row bg-white px-3 mt-2">
      {requestMsgPopUp!=""&&<div className='my-2'>{requestMsgPopUp()}</div>}
{
  data?.peerReferences&&[data?.peerReferences[links=="Reference #1"?0:1]]?.map((v)=>{
    return (
      <div className='row  py-2 pb-2'>
      
      
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Prefix</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.prefix}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">First Name</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label >{v?.peerfirstName}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Last Name</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.peerlastName}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Email</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.peeremail}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Qualification</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.peerqualification}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Specialty</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.peerspecialty?.map((val)=>val?.label)}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Relationship</label></div>
       <div className='col-md-8 border-0 border-bottom py-2 '> <label>{v?.peerrelationship}</label></div>
       <div className='col-md-4 border-0 border-bottom py-2 '> <label className="label">Length of Time Known </label></div>
       <div className='col-md-8 border-0 border-bottom  py-2 '> <label>{v?.lengthTimeKnown}</label></div>
       
       
       {sentRequest&& <PeerRequestModel show={sentRequest} id={id} obj={v} onHide={()=>setsentRequest(false)}/>}
      <div className="mt-4">
      {
   v?.questionnaire&&(v?.questionnaire||v?.questionnaire[0])?.map((q,i)=>{

   
    return <div className="row " key={i}>
      {q?.label&&<div className="col-md-12 label   mt-2">{q?.label}</div>}
      {!q?.label&&<label className="col-md-6">{q?.value?q?.value:"-"}</label>}
    </div>
      })
}
      </div>
   </div>
    )
  })
 
}

{sessionStorage?.getItem("roleId") <= 4&&data?.peerReferences&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire?.length==0&&<button 
 onClick={()=>setsentRequest(true)} className="text-white col-md-2 f16 medium border rounded py-2 pointer mt-2 mb-3" 
 disabled={formname?.isLogged=="Yes"} 
//  style={{ background:"#00B948"}}
style={{ background: formname?.isLogged=="Yes"?"#90EE90":"#00B948" }}
>Send Request</button>}
{
                (data?.peerReferences&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire&&[data?.peerReferences[links=="Reference #1"?0:1]][0]?.questionnaire.length!=0&& formname?.finalLock == "Yes" && sessionStorage?.getItem("roleId") <= 4 && formname?.saveLogKey == "No") && <div className='row pb-3'>
                  <div className='d-flex gap-3 mx-3'>
                    <button 
                    onClick={() => saveLogsForm("Yes")}
                    disabled={formname?.notify=="Yes"}
                      type="button"
                      className=" text-white col-md-2 f16 medium border rounded py-2 pointer"
                      style={{ background: formname?.notify=="Yes" ?"#a1f2c0":"#00B948"}}
                    >
                      <FaCheckCircle size={14} /> Save & Log
                    </button>
                    <button
                      className="text-white text-center f16 medium col-md-2 border rounded py-2 col-md-auto pointer  "
                      onClick={() => setRequestModal(true)}
                      style={{ background: "#D4352F" }}
                    >
                      <BsFillQuestionCircleFill size={14} />  Request Edits
                    </button>
                  </div>

                </div>
              }
              {
                (formname && formname?.finalLock == "Yes" && sessionStorage?.getItem("roleId") <= 4 && formname?.saveLogKey == "Yes") && <div className='row py-2'>
                  <div className='col-md-2'>
                    <button
                      type="button"
                      className=" text-white col-md-12 f16 medium border rounded py-2 pointer"
                      style={{ background: "#D4352F" }}
                      onClick={() => saveLogsForm("No")}
                    >
                      Unlock & Edit
                    </button>
                  </div> </div>
              }
      </div>
      
      </>

      }
      
    </>
  );
};

export default PeerReferences;
