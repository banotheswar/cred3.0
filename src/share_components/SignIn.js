import { Col, Container, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { save } from "../api_services/SharedServices";
import { urls } from "../api_services/url";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { SiAdobecreativecloud } from "react-icons/si";
import ForgotPassword from "./ForgotPassword";
import { UseFormValidations } from "../validations/UseFormValidation";
const SignIn = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [forgot, setForgot] = useState(false);
    const DashboardNavidation = (roleId) => {
        switch (roleId) {
            case "2": return "/outpatientpro/enterprise/dashboard"

            case "4": return "/outpatientpro/facility/dashboard"

            case "5": return "/outpatientpro/provider/dashboard"

            case "6": return "/outpatientpro/provider/dashboard"

            case "7": return "/outpatientpro/delegate/alldashboard"

            case "1": return "/outpatientpro/admin/dashboard"

            default: return ""
        }

    }
    const submit = async () => {
        let jsonObjects = data;
        let res = await save(urls?.logins.login, { jsonObjects });
        if (res?.data?.status) {
            sessionStorage?.setItem("email", res?.data?.data[0]?.email)
            sessionStorage?.setItem("firstName", res?.data?.data[0]?.firstName)
            sessionStorage?.setItem("lastName", res?.data?.data[0]?.lastName)
            sessionStorage?.setItem("roleId", res?.data?.data[0]?.roleId)
            sessionStorage?.setItem("roleName", res?.data?.data[0]?.roleName)
            sessionStorage?.setItem("organizationId", res?.data?.data[0]?.organizationId)
            sessionStorage?.setItem("organizationName", res?.data?.data[0]?.organizationName)
            sessionStorage?.setItem("userId", res?.data?.data[0]?.userId)
            sessionStorage?.setItem("userId", res?.data?.data[0]?.userId)
            sessionStorage?.setItem("Logo", res?.data?.data[0]?.Logo)
            sessionStorage?.setItem("token", res?.data?.token)
            navigate(DashboardNavidation(sessionStorage?.getItem("roleId")));
        }
    };



    const { data, errors, handleChange, handleEmailChange, handleSubmit } =
        UseFormValidations({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: {
                email: {
                    required: {
                        value: true,
                        message: "Please enter email id",
                    },
                    pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Please enter a valid email id",
                    },
                },
                password: {
                    required: {
                        value: true,
                        message: "Please enter password",
                    },
                },
            },
            submit: submit,
        });
    useEffect(() => {
        window.scrollTo(500, 0)
        sessionStorage.clear()
    }, [])

    return (

        <Container fluid className="body_bg " style={{ height: "100vh" }}>
            <Row lg={12} className="bgheader d-flex justify-content-center p-2 " >
                <Col lg={12} className=" d-flex justify-content-center ">
                    <SiAdobecreativecloud size={34} color="white" className="py-1" /><span className="text-white px-2 headerfont1">OutPatientPro</span>
                </Col>
            </Row>
            <div className="row d-flex justify-content-center px-4" style={{ marginTop: "14vh" }}>
                {forgot == false && <div className="headerfont2 text-center py-4" >Login to Your Account</div>}
                <div className="col-lg-4 bg-white  rounded p-4">
                    {forgot == false ? (
                        <form onSubmit={handleSubmit}>


                            <div className="mb-3">
                                <label className="signin mb-2" for="exampleInputEmail1" >
                                    Email address
                                </label>
                                <input
                                    autoFocus
                                    type="email"
                                    className="form-control  p-3 "
                                    name="email"
                                    placeholder="example@mail.com"
                                    value={data?.email}
                                    onChange={handleChange("email")}
                                />
                                {errors && errors.email && (
                                    <p className="text text-danger">{errors.email}</p>
                                )}
                            </div>
                            <div class="mb-3">
                                <div className="row mb-2">
                                    <div className="col">
                                        <label className="signin" for="exampleInputPassword1" >
                                            Password
                                        </label>
                                    </div>
                                    <div className="col text-end forgot pointer col-md-8" style={{
                                        textDecoration: "none",

                                    }} onClick={() => setForgot(true)}>
                                        Forgot your password?
                                    </div>
                                </div>

                                <div className="password-container">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        className="form-control p-3 password-input "
                                        name="password"
                                        placeholder="Password"
                                        value={data?.password}
                                        onChange={handleEmailChange("password")}
                                    />
                                    <span onClick={() => setShow(!show)} className="eye-icon">
                                        {!show ? <BsEyeSlash /> : <BsEye />}
                                    </span>
                                </div>
                                {errors && errors.password && (
                                    <p className="text text-danger">{errors.password}</p>
                                )}
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div class="mb-3 form-check ">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="exampleCheck1"
                                        />
                                        <label class="form-check-label forgot pointer" for="exampleCheck1" >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                {/* <div className="col text-end">
                                            <a
                                                href=""
                                                className="signin"
                                                style={{
                                                    textDecoration: "none",
                                                color: "#0073EE",

                                                }}
                                                onClick={() => setForgot(true)}
                                            >
                                                Forgot your password?
                                            </a>
                                        </div> */}
                                {/* <div className="col text-end forgot pointer" style={{
                                    textDecoration: "none",

                                }} onClick={() => setForgot(true)}>
                                    Forgot your password?
                                </div> */}
                            </div>
                            <button
                                type="submit"
                                class="text-white signin col-12 p-2 border rounded"
                                style={{ background: " #0073EE 0% 0% no-repeat padding-box" }}
                            >
                                Sign In
                            </button>
                            {/* <div className="px-2 mb-3 mt-3 ">
                                <label className="signin" style={{color:"#727272"}}>Don't have an account? </label>
                                <a
                                    onClick={signup}
                                    className="pointer signin ms-2"
                                    style={{
                                        // textDecoration: "none",
                                        color: "#0073EE",
                                    }}
                                >
                                    Create Account
                                </a>
                            </div> */}

                        </form>
                    ) : (
                        <ForgotPassword setForgot={setForgot} />
                    )}
                </div>
            </div>
        </Container>
    );
};
export default SignIn;