import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../validations/UseFormValidation";
import { save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";

const ForgotPassword = (props) => {
  console.log(props, "7876");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    let jsonObjects = data;
    await save(urls.logins.forgotPassword, {jsonObjects});
  };
  useEffect(() => {
    sessionStorage?.clear();
  }, []);
  const { data, errors, handleChange, handleSubmit } = UseFormValidations({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: {
        required: {
          value: true,
          message: "Please enter  email id",
        },
        pattern: {
          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          message: "Please enter a valid email id",
        },
      },
    },
    submit: submit,
  });

  return (
    <>
   <div div className=" bg-white  rounded px-4 py-2">
      <form onSubmit={handleSubmit}>
        <div className="headerfont1 text-center p-2">Forgot Password</div>
        <div className="row">
          <div className="">
            <label className="signin" for="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-white"
              placeholder="example@mail.com"
              id="email"
              name="userName"
              onChange={handleChange("email")}
            />
          </div>
          <div className="d-flex mr_25">
            {errors && errors.email && (
              <p className="text text-danger">{errors.email}</p>
            )}
          </div>

          <div className="form-group mt-2 ">
            <label className="form-check-label">
              <div onClick={() => props?.setForgot(false)} className="pointer signin mb-2">
                <span
                  style={{
                    color: "#0073EE",
                  }}
                >
                  Login?
                </span>
              </div>
            </label>
          </div>

          <div align="center ">
            <button
              type="submit"
              className="text-white signin col-12 p-2 border rounded"
              style={{ background: " #0073EE 0% 0% no-repeat padding-box" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default ForgotPassword;
