import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const DelegateAccount = () => {
  const navigate = useNavigate();
  const [isDelegateOpen, setIsDelegateOpen] = useState(false);
  const {errors,data,handleChange,headerlink}=UseFormValidations({})
  const [show, setShow] = useState(false)
  const handleDelegateClick = () => {
    setIsDelegateOpen(!isDelegateOpen); // Toggle the state
  };
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control p-3 password-input border-danger"
      : "form-control p-3 password-input ";
  };
  useEffect(() => {
    headerlink([{name:"My Account",link:"/outpatientpro/delegate/alldelegatemyaccount",active:true},
    ])
  }, []);
  return (
    <div>
      <div className="  bg-white p-3 ">

        <div className="col-md-4  f33">My Account</div>
        <div className="full-width-line"></div>

        <div className="col-md-8 p-3">
          <div className="row">
            <div className="col-md-2 fw-medium">Name</div>
            <label className="col-md-4 mt-1">:         {sessionStorage.getItem("firstName")}{" "}
                {sessionStorage.getItem("lastName")}</label>
          </div>
          <div className="row">
            <div className="col-md-2 fw-medium">Account Type</div>
            <label className="col-md-4 mt-1">: {sessionStorage.getItem("roleName")}</label>
          </div>

          <div className="row mt-2">
            <h3>
              Email
            </h3>
            <div className="col-md-4">
            <input className="form-control "disabled placeholder="Email*" value={sessionStorage?.getItem("email")} name="email" type="text" />
            </div>

            <div className="col-md-4 ">
              <button
                className="border add rounded pointer py-1 text-white text-center"
                style={{ background: "#818182" }}
              >
                Update
              </button>
            </div>
          </div>
          <div className="row">
            <h3>
              Password
            </h3>
            <div className="col-md-4 password-container">
                <input
                  type={show ? 'text' : 'password'}
                  className={emailErrorColor("password")}
                  name="password"
                  value={data?.password}
                  placeholder="Password *"
                  onChange={handleChange("password")}
                />
                <span onClick={() => setShow(!show)} className="eye-icon">
                  {!show ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>

            <div className="col-md-4 ">
              <button
                className="border add rounded pointer py-1 text-white text-center"
                style={{ background: "#818182" }}
              >
                Set New Password
              </button>
            </div>
          </div>
        </div>
      
        <div className=" p-3 ">
          <h3>Password</h3>

          <div className="col-md-4">
            <input
              className="form-control "
              placeholder="New Password*"
              type="text"
            />
          </div>
          <div className="col-md-4 mt-2">
            <input
              className="form-control "
              placeholder="Confirm Password*"
              type="text"
            />
          </div>

          <div className="  d-flex mt-2 gap-2">
            <button
              className="border add rounded col-md-1 pointer py-1 text-white text-center"
              style={{ background: "#818182" }}
            >
              Update
            </button>

            <button
              className="border rounded add col-md-1 pointer py-2 text-white text-center"
              style={{ background: "#818182" }}
            >
              Cancel
            </button>
          </div>
        </div>

        <hr/>
        <div className="p-3">
          <button
            className="border rounded col-md-2 py-2 button   d-flex align-items-center justify-content-center text-center text-white"
           
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelegateAccount;
