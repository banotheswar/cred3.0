
import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { SharedServices, getById, getList, save } from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { urls } from "../../../api_services/url";
const ProviderMyAccount = () => {
  
  const [delegateList, setDelegateList] = useState([])
  const [obj,setObj]=useState({})
  const[licence,setLicence]=useState([])
  const[speciality,setSpeciality]=useState([])
  const [isDelegateOpen, setIsDelegateOpen] = useState(false);
  const [show, setShow] = useState(false)
  const [update,setUpdate]=useState()

  const updateProvider=async()=>{
    let jsonObjects={
      firstName:data?.firstName,
      middleName:data?.middleName,
      lastName:data?.lastName,
      dob:data?.dob,
      speciality:data?.speciality,
      licenseState:data.licenseState,
      npi:data.npi,
      dea:data.dea,
      userId:sessionStorage.getItem("userId")
    }
    let res = await save(urls?.logins.signup, {jsonObjects});
    if(res?.data?.status){
      // addObject({userId:"",email:""})
      setUpdate(res)
    }
  }

  const updatePassword = async() =>{
    let jsonObjects={email:sessionStorage?.getItem("email"),password:data?.password}
    await save(urls?.account?.changePassword,{jsonObjects})
  }

  const getProviderDetails = async() =>{
    let jsonObjects={
      userId:sessionStorage.getItem("userId")
    }
    let res=await getById(urls.settings.getAllUsers,{jsonObjects})
    setValues(res)
  }
  const getDelegateList = async () => {
    let jsonObjects = {
      type: "Delegate",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setDelegateList(res);
  };

  const licenceAll=async()=>{
    let jsonObjects = {
      type: "License Type",
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects});
    setLicence(res)
  }

  const specialityAll=async()=>{
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, {jsonObjects});
  
    setSpeciality(res)
  }

  const handleDelegateClick = () => {
    setIsDelegateOpen(!isDelegateOpen); 
  };
  const allDelegate=async()=>{
    let jsonObjects={userId:sessionStorage.getItem("userId")}
    let res=await getById(urls.settings.getAllUsers,{jsonObjects})
    let obj=[res]
    obj?.map((v)=>{
      v["userId"]=v?.delegateId
    })
    setObj(obj[0])
    
  }

  const { data, errors, handleChange, headerlink, handleEmailChange, handleSubmit ,setValues,addObject,handleMultiSelect,handleDateChange} = UseFormValidations({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: {
      confirmPassword: {
        required: {
          value: true,
          message: "Please enter confirm password",
        },
      },
      password: {
        required: {
          value: true,
          message: "Please enter new password",
        },
        minlength: {
          value: 8,
          message: "Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
        pattern: {
          value:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
          message: "Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
      },
    },
    // submit: submit,
  });
  const returnValue=(key)=>{
    return data?.[key]&&data?.[key]?data?.[key]:""
  }
  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };

  useEffect(()=>{
    headerlink([
    {name:"My Account",link:"/outpatientpro/provider/myaccountprovider",active:true},
  ])
  getDelegateList()
  licenceAll()
  allDelegate()
  specialityAll()
  getProviderDetails()
  },[update])

useEffect(()=>{addObject(obj)},[obj])
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control p-3 password-input border-danger"
      : "form-control p-3 password-input ";
  };
  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select border-danger"
      : "form-select ";
  };
  const returnErrorCssMultiple = (key) => {
    return errors && errors?.[key] && errors?.[key]
      ? "border border-danger rounded form-multiselect"
      : "border  rounded form-multiselect";
  };
  useEffect(()=>{

    if(data?.userId>0){
     addObject(delegateList?.filter((v)=>v?.userId==data?.userId)?.[0])
    }
    
   },[data?.userId,update])
  return (
    <div >
      <div className=" p-4 bg-white">
        <h1 className="py-3 mobile-header-font">My Account</h1>

        <div className="full-width-line"></div>

       
        <div className="row ">
          <div className="mediumf17  mt-4">
            Provider Name <span className="text-danger ">*</span>
          </div>
          </div>
          <div className="row">
          <div className="col-md-4">
            <label>
              First Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control "
              placeholder="First Name..."
              type="text"
              value={dataValue(data.firstName)}
              onChange={handleChange("firstName")}
              name="firstName"
            />
          </div>
          <div className="col-md-4">
            <label> Middle Name</label>
            <input
              className="form-control "
              placeholder="Middle Name..."
              type="text"
              value={dataValue(data.middleName)}
              onChange={handleChange("middleName")}
              name="middleName"
            />
          </div>
          <div className="col-md-4">
            <label>
              {" "}
              Last Name<span className="text-danger">*</span>{" "}
            </label>
            <input
              className="form-control "
              placeholder="Last Name..."
              type="text"
              value={dataValue(data.lastName)}
              onChange={handleChange("lastName")}
              name="lastName"
            />
          </div>
          </div>

          <div className="row py-2">
            <div className="col-md-4 ">
              <label>
                DOB <span className="text-danger">*</span>
              </label>
              <DatePicker
                  className="form-control py-2"
                  selected={data?.dob && new Date(data?.dob)}
                  minDate={new Date(1900, 1, 1)}
                  maxDate={new Date()}
                  onChange={(e) => {handleDateChange(e, "dob");}}
                  autoComplete="off"
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="DOB"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
            </div>
            <div className="col-md-4 ">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input className="form-control "
              disabled placeholder="Email*" 
              value={sessionStorage?.getItem("email")} 
              name="email" type="text" />
            </div>
          </div>

          <div className="mt-4">
            <div className="mediumf17 py-2">
              License Information <span className="text-danger">*</span>
            </div>

            <div className="row ">
              <div className="col-md-4">
                <label>
                  License State <span className="text-danger">*</span>
                </label>
                <select className="form-select"
                  value={dataValue(data.licenseState)}
                  // onChange={handleChange("licenseState")}
                  disabled
                  name="licenseState"
                  >
                  <option value="">License State</option>
                  {licence&&licence?.map((v)=><option value={v?.globalId}>{v?.name}</option>)}
                 <option></option>
                </select>
              </div>

              <div className="col-md-4">
                <label>
                  NPI # <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control "
                  placeholder="NPI..."
                  disabled
                  type="text"
                  value={dataValue(data.npi)}
                  // onChange={handleChange("npi")}
                  name="npi"
                />
              </div>
              <div className="col-md-4">
                <label>DEA (optional)</label>
                <input
                  className="form-control "
                  placeholder="Other License #*"
                  disabled
                  type="text"
                  value={dataValue(data.dea)}
                  // onChange={handleChange("dea")}
                  name="dea"
                />
              </div>
            </div>
          </div>
        
        <div className="">
          <div className="mediumf17 py-2">
            Specialty <span className="text-danger">*</span>
          </div>
          </div>
          <div className="col-md-4 col-sm-12">
         
            <Select
              isMulti={true}
              className={returnErrorCssMultiple("speciality")}
              closeMenuOnSelect={false}
              value={data?.["speciality"]}
              placeholder="Select Specialty"
              options={speciality?.map((v) => {
                  return { label: v?.specialityName, value: v?.specialityId };
              })}
              onChange={handleMultiSelect("speciality")}
              />
          </div>
      
        <div className="p-3">
          <div
            className="border rounded col-md-2 py-2 save  d-flex align-items-center justify-content-center text-center text-white onHover"
            onClick={updateProvider}
          >
            Update Profile
          </div>
        </div>

        <div className="px-3 row">
           
          </div>
          <div className=" row">
            <div className="col-md-4">
              <label className="" for="exampleInputPassword1" >
                Password <span className="text-danger">{" "}*</span>
              </label>
              <div className="password-container">
                <input
                  type={show ? 'text' : 'password'}
                  className={emailErrorColor("password")}
                  name="password"
                  // value={data?.password}
                  placeholder="Password *"
                  onChange={handleChange("password")}
                />
                <span onClick={() => setShow(!show)} className="eye-icon">
                  {!show ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors && errors.password && (
                <p className="text text-danger">{errors.password}</p>
              )}

              <input className={emailErrorColor("confirmPassword")}
                value={data?.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="Confirm Password *" name="confirmPassword" type="password" />
              {errors && errors.confirmPassword && (
                <p className="text text-danger">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="row mt-4">
              <label className="">Note</label>
              <p className="text-danger bg-white p-1 px-3">
                Password should contain one uppercase,one lowercase, one special
                character, one number and should be greater than 8 characters
              </p>
            </div>
          </div>
          <div className="px-4 d-flex  gap-2">
            <button className="button-secondary rounded py-1 px-4  text-center border"
            onClick={updatePassword}
            >
              Update
            </button>
            <button className="button-secondary rounded py-1 px-4 text-center border">
              Cancel
            </button>
          </div>
          <hr/>

        <div className="d-flex p-3">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-2 f18 medium">Delegate</div>
              <div className="col-md-6 label mt-1">: {data?.delegateName}</div>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="button-secondary rounded py-1 px-4 text-center border"
              onClick={handleDelegateClick}
            >
              Assign Delegate
            </button>
          </div>
        </div>
        {isDelegateOpen && (
        <div className="p-3">
          <div className="col-md-4">
            <label className="">Name</label>
            <select
              className={emailErrorColor1("userId")}
              value={data?.userId}
              name="userId"
              onChange={handleChange("userId")}
            >
              <option value="">Select Delegate</option>
              <option value={true} className="fw-bolder">Create New</option>
              {delegateList?.map((e, i) => {
                return (
                  
                  <option key={i} value={e.userId}>
                    {e.userName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4 mt-2">
            <label className="">Email</label>
            <input
              className="form-control"
              placeholder="Email*"
              type="text"
              value={data?.email}
            />
          </div>
          <div className="d-flex mt-4 gap-2">
            <button
              className="button-secondary rounded py-1 px-4 text-center border"
            //  onClick={submit}
            >
              Update
            </button>

            <button
              className="button-secondary rounded py-1 px-4 text-center border"
             
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <hr/>
      </div>

     
    </div>
  );
};

export default ProviderMyAccount;
