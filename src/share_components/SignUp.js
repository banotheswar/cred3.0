import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { SiAdobecreativecloud } from "react-icons/si";
import { DropdownMaster, getById, getList, notify, save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormValidations } from "../validations/UseFormValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
const SignUp = ({ signin }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState({ new: true, conform: true });
  const [stateList, setStateList] = useState();
  const { key} = useParams();

  console.log(stateList, "365556");
  const submit = async () => {
    if (data?.password && data?.password == data?.ConfirmPassword) {
    let jsonObjects={userId:data?.userId,
      email:data?.email,
      firstName:data?.firstName,
      lastName:data?.lastName,
      password:data?.password,
      licenseState:data?.stateId,
      npi:data?.npi,
      dea:data?.dea,
      dob:data?.dob,
      guid:key,
    }
    let res = await save(urls?.logins.signup, {jsonObjects});
    if (res?.data?.status == true) {
      navigate("/");
    }}
    else {
      notify(false, "Password and Confirm Password should be same!!");
    }
    // if (res?.data?.status) {
    //   sessionStorage?.setItem("email", res?.data?.data[0]?.email);
    //   sessionStorage?.setItem("firstName", res?.data?.data[0]?.firstName);
    //   sessionStorage?.setItem("lastName", res?.data?.data[0]?.lastName);
    //   sessionStorage?.setItem("roleId", res?.data?.data[0]?.roleId);
    //   sessionStorage?.setItem("roleName", res?.data?.data[0]?.roleName);
    //   sessionStorage?.setItem(
    //     "organizationId",
    //     res?.data?.data[0]?.organizationId
    //   );
    //   sessionStorage?.setItem("userId", res?.data?.data[0]?.userId);
    //   sessionStorage?.setItem("mobile", res?.data?.data[0]?.mobile);
    //   sessionStorage?.setItem("token", res?.data?.token);
    //   navigate("/outpatientpro/provider/applicationprocess");
    // }
  };



  const getCreateUserInfo = async ()=>{
    let jsonObjects = {
      guid:key
    }
    let res=await getById(urls?.logins?.getCreateUserInfo,{jsonObjects},"provider")
      setValues(res)
     
    
  }

  const getStatesList = async () => {
    let jsonObjects = {
      type: "State Medical License",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    // setStateList(res);
  };



  const {
    data,
    errors,
    setValues,
    handleChange,
    handleEmailChange,
    handleDateChange,
    handleCapitalChange,
    handleSubmit,
  } = UseFormValidations({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      dob: "",
      dea: "",
      ConfirmPassword: "",
      licenseState:"",
      notShowMsg: true,
    },
    validationSchema: {
      ConfirmPassword: {
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
      firstName: {
        required: {
          value: true,
          message: "Please enter your First Name",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      dob: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },

      licenseState: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },

      npi: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      dea: {
        required: {
          value: true,
          message: "please enter your DEA #",
        },
      },
    },

    submit: submit,
  });

  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control border bg-white ";
  };
  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger rounded"
      : "form-select border bg-white rounded";
  };
  useEffect(() => {
    if(key){
      getCreateUserInfo()
      getStatesList();
    }
   
  }, [key])

  useEffect(()=>{
    DropdownMaster("State", setStateList)
},[])
 
  return (
    <Container fluid className="body_bg " style={{ height: "100vh" }}>
      <Row lg={12} className="bgheader d-flex justify-content-center p-2 ">
        <Col lg={12} className=" d-flex justify-content-center ">
          <SiAdobecreativecloud size={34} color="white" className="py-1" />
          <span className="text-white px-2 headerfont">OutPatientPro</span>
        </Col>
      </Row>
      <div
        className="row d-flex justify-content-center "
        style={{ marginTop: "5vh" }}
      >
        <div className="col-lg-6 bg-white rounded px-4">
          <form onSubmit={handleSubmit}>
            <div className=" text-center p-4 headerfont1">
              Create Your Account
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="signin">First Name <span className="text-danger">*</span></label>
                <input
                  className={emailErrorColor("firstName")}
                  placeholder="First Name…"
                  value={dataValue(data?.firstName)}
                  onChange={handleCapitalChange("firstName")}
                />
              </div>
              <div className="col-md-4 ">
                <label className="signin">Middle Name</label>
                <input
                  placeholder="Middle Name…"
                  className="form-control bg-white border"
                  value={dataValue(data?.middleName)}
                  onChange={handleCapitalChange("middleName")}
                />
              </div>
              <div className="col-md-4">
                <label className="signin">Last Name <span className="text-danger">*</span></label>
                <input
                  placeholder="Last Name…"
                  className={emailErrorColor("lastName")}
                  value={dataValue(data?.lastName)}
                  onChange={handleCapitalChange("lastName")}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="signin">DOB <span className="text-danger">*</span></label>
                <DatePicker
                  className={emailErrorColor("dob")}
                  selected={data?.dob && new Date(data?.dob)}
                  minDate={new Date(1900, 1, 1)}
                  maxDate={new Date()}
                  onChange={(e) => {
                    handleDateChange(e, "dob");
                  }}
                  autoComplete="off"
                  name="dob"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="DOB"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="signin">License State <span className="text-danger">*</span></label>

                <select
                  className={emailErrorColor1("licenseState")}
                  value={dataValue(data.licenseState)}
                  name="licenseState"
                  onChange={handleChange("licenseState")}
                >
                  <option value="">Select State</option>
                  {stateList?.map((e, i) => {
                    return (
                      <option key={i} value={e.stateId}>
                        {e.stateName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <label className="signin">NPI # <span className="text-danger">*</span></label>
                <input
                  placeholder="NPI #"
                  className={emailErrorColor("npi")}
                  value={dataValue(data?.npi)}
                  onChange={handleChange("npi")}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="signin">DEA # <span className="text-danger">*</span></label>
                <input
                  placeholder="DEA #"
                  className={emailErrorColor("dea")}
                  value={dataValue(data?.dea)}
                  onChange={handleChange("dea")}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="signin">Password <span className="text-danger">*</span></label>
                <div className="password-container">
                  <input
                    type={show?.new == true ? "password" : "text"}
                    className={emailErrorColor("password")}
                    placeholder="Enter New Password"
                    id="email"
                    autoComplete="off"
                    name="password"
                    onChange={handleChange("password")}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShow({ ...show, new: !show.new })}
                  >
                    {show?.new == true ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors && errors.password && (
                  <p className="text text-danger">{errors.password}</p>
                )}
              </div>

              <div className="col-md-6  mt-3">
                <label className="signin">Confirm Password <span className="text-danger">*</span></label>
                <div className="password-container">
                  <input
                    type={show?.conform == true ? "password" : "text"}
                    className={emailErrorColor("ConfirmPassword")}
                    autoComplete="off"
                    name="ConfirmPassword"
                    onChange={handleChange("ConfirmPassword")}
                    placeholder="Enter Confirm Password"
                    id="pwd"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShow({ ...show, conform: !show.conform })}
                  >
                    {show.conform == true ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors && errors.ConfirmPassword && (
                  <p className="text text-danger">{errors.ConfirmPassword}</p>
                )}
              </div>
            </div>
            <label className="fornt-weight-bold py-2">Note</label>
            <p className="text-danger bg-white p-1">
              Password should contain one uppercase,one lowercase, one special
              character, one number and should be greater than 8 characters
            </p>
            <div className="d-flex justify-content-center mt-4 ">
              <div class="mb-3 form-check ">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  class="form-check-label terms  pointer"
                  for="exampleCheck1"
                  style={{ fontSize: "small" }}
                >
                  I agree to the the terms and conditions
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                class="text-white col-md-6 signin p-2 border rounded"
                style={{ background: "#0073EE 0% 0% no-repeat padding-box" }}
              >
                Create My Account
              </button>
            </div>
            <div className="px-2 py-4 text-center mb-3 ">
              <label className="signin" style={{color:"#727272"}}>Already have an account?</label>
              <a
                onClick={signin}
                className="pointer signin ms-2"
                style={{
                  color: "#0073EE",
                }}
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
