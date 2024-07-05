import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  BsEye,
  BsEyeSlash,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import { notify, save } from "../api_services/SharedServices";
import { UseFormValidations } from "../validations/UseFormValidation";
import { urls } from "../api_services/url";
import { Col, Container, Row } from "react-bootstrap";
import { SiAdobecreativecloud } from "react-icons/si";

const CreatePassword = () => {
  const { userId ,key} = useParams();
  const navigate = useNavigate();
  // const [show, setShow] = useState(false)
  const [show, setShow] = useState({ new: true, conform: true })
  

  const submit = async () => {
    if (data?.password && data?.password == data?.ConfirmPassword) {
      let jsonObjects={
        password:data?.password,
        guid:key
      }
      let res = await save(urls?.logins.changePassword, {jsonObjects});
      if (res?.data?.status == true) {
        navigate("/");
      }
    } else {
      notify(false, "Password and Confirm Password should be same!!");
    }
  };
  useEffect(() => {
    sessionStorage?.clear();
  }, []);
  const {
    data,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleEmailChange,
  } = UseFormValidations({
    initialValues: {
      password: "",
      ConfirmPassword: "",
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
          message:
            "Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
        pattern: {
          value:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
          message:
            "Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
      },
    },
    submit: submit,
  });

  return (
    <>
      <Container fluid className="body_bg " style={{ height: "100vh" }}>
        <Row lg={12} className="bgheader d-flex justify-content-center p-2 ">
          <Col lg={12} className=" d-flex justify-content-center ">
            <SiAdobecreativecloud size={34} color="white" className="py-1" />
            <span className="text-white px-2 headerfont">OutPatientPro</span>
          </Col>
        </Row>
        <div
          className="row d-flex justify-content-center px-4 "
          style={{ marginTop: "14vh" }}
        >
          <div className="col-lg-4 bg-white  rounded px-4">
            <form onSubmit={handleSubmit}>
              <div className="headerfont1 text-center p-4">Create Password</div>
              <div class="mb-3">
                <label className="signin" for="exampleInputPassword1">
                  Password
                </label>

                <div className="password-container">
                  <input
                  type={show?.new == true ? "password" : "text"}
                    className="form-control bg-white"
                    placeholder="Enter New Password"
                    id="email"
                    autoComplete="off"
                    name="password"
                    onChange={handleChange("password")}
                  />
                  <span className="eye-icon"  onClick={() => setShow({ ...show, new: !show.new })}>
                    {show?.new == true ?<BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors && errors.password && (
                  <p className="text text-danger">{errors.password}</p>
                )}
              </div>

              <div class="mb-3">
                <label className="signin" for="exampleInputPassword1">
                Confirm  Password
                </label>

                <div className="password-container">
                <input
                 type={show?.conform == true ? "password" : "text"}

                 
                  className="form-control bg-white"
                  autoComplete="off"
                  name="ConfirmPassword"
                  onChange={handleChange("ConfirmPassword")}
                  placeholder="Enter Confirm Password"
                  id="pwd"
                />
                  <span className="eye-icon" onClick={() => setShow({ ...show, conform: !show.conform })}>{show.conform == true ? <BsEyeSlash /> : <BsEye />}</span>

                </div>
                {errors && errors.ConfirmPassword && (
                  <p className="text text-danger">{errors.ConfirmPassword}</p>
                )}
              </div>
              <label className="fornt-weight-bold">Note</label>
              <p className="text-danger bg-white p-1">
                Password should contain one uppercase,one lowercase, one special
                character, one number and should be greater than 8 characters
              </p>
              <div align="center " className="mb-4">
                <button
                  type="submit"
                  className="text-white signin col-12 p-2 border rounded"
                  style={{ background: " #0073EE 0% 0% no-repeat padding-box" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreatePassword;
