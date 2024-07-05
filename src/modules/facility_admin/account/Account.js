import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SharedServices, save } from "../../../api_services/SharedServices";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { urls } from "../../../api_services/url";

const Account = () => {
  const { state } = SharedServices({});
  const navigate = useNavigate();
  const [isDelegateOpen, setIsDelegateOpen] = useState(false);
  const [show, setShow] = useState(false)
  const submit = async () => {
    let jsonObjects={email:sessionStorage?.getItem("email"),password:data?.password}
         await save(urls?.account?.changePassword,{jsonObjects})
  }

  const { data, errors, handleChange, headerlink, handleEmailChange, handleSubmit } = UseFormValidations({
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
    submit: submit,
  });
  const handleDelegateClick = () => {
    setIsDelegateOpen(!isDelegateOpen);
  };

  useEffect(() => {
    headerlink([{ name: "My Account", link: "/outpatientpro/facility/account/details", active: true }])
  }, []);

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control p-3 password-input border-danger"
      : "form-control p-3 password-input ";
  };
  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-control p-3 mt-2 border-danger"
      : "form-control p-3  mt-2";
  };

  return (
    < >
      <div className=" ">
        <form onSubmit={handleSubmit}>
         <div className=" bg-white "> 
         <div className="ms-1 p-3 f30 medium mb-2 f20mobile">My Account</div></div>

          {/* <div className="full-width-line"></div> */}

          <div className="mt-2 bg-white px-3">
            <div className="col-xl-8 col-lg-8 col-md-12 p-3">
            <div className="row">

             <div className="col-xl-2 col-lg-2  col-md-2 col-sm-2 "> 
             <label >Name</label>
             </div>
              <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 label "> 
               {sessionStorage.getItem("firstName")}{" "}
                {sessionStorage.getItem("lastName")}
                </div>
             
            </div>

          </div>

          <div className="px-3 row">
            <div className="col-xl-4 col-lg-5 col-md-8">
              <label className="">Email</label>
              <input className="form-control "disabled placeholder="Email*" value={sessionStorage?.getItem("email")} name="email" type="text" />
            </div>


          </div>
          <div className="p-3 row">
            <div className="col-xl-4 col-lg-5 col-md-8">
              <label className="" for="exampleInputPassword1" >
                Password <span className="text-danger">{" "}*</span>
              </label>

              <div className="password-container">
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
              {errors && errors.password && (
                <p className="text text-danger">{errors.password}</p>
              )}

              <input className={emailErrorColor1("confirmPassword")}
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



          <hr />

          <div className="p-3">


            <button
              type="submit"
              className="border pointer rounded  api-connections  d-flex align-items-center justify-content-center text-center"

            >
              Update Profile
            </button>

          </div></div>
        </form>
      </div>


    </>
  );
};

export default Account;
