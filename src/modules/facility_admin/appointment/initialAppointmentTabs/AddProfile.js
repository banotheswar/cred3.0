import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { DropdownMaster, getList, phoneFormat, save } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Creatable from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import { IoPricetags } from "react-icons/io5";
import Select from "react-select"

const AddProfile = ({ licence, speciality, profileData, dataSubmit, childObj, settingDetailstate }) => {
    const navigate = useNavigate()
    const [allTags, setAlltags] = useState([])
    const { providerId } = useParams()
    const submit = async () => {
        data["userId"] = providerId ? providerId : 0

        dataSubmit(data, "Select Facility(s)")
    }
    const getallTags = async () => {
        let jsonObjects = { type: "tags" }
        let res = await getList(urls?.settings?.getStatesdd, { jsonObjects })
        res?.map((v) => {
            v["label"] = v?.providerTagName
            v["value"] = v?.providerTagName
        })
        // setAlltags(res)
    }
    const createTags = async (tag) => {

        let jsonObjects = { providerTagId: 0, providerTagName: tag?.label, status: "Active" }
        let res = await save(urls?.Appointments?.createTags, { jsonObjects })
        if (res?.data?.status) {
            // getallTags()
            DropdownMaster("Tags", setAlltags)
        }
    }

    const { data, errors, setValues,handleMultiSelect, handleChange, handleEmailChange, handleSubmit ,handleDateChange,singleHandleTags,handleAlphabetChange,handlePhoneChange} = UseFormValidations({


        initialValues: {
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            licenseState: "",
            npi: "",
            speciality: []
        },
        validationSchema: {
            firstName: {
                required: {
                    value: true,
                    message: "Please enter your Template Name",
                },
            },
            lastName: {
                required: {
                    value: true,
                    message: "Please enter your Last Name",
                },
            },
            email: {
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
                minlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
                maxlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
            },
            speciality: {
                minlength: {
                    value: "1",
                    message: "Please enter your Last Name",
                },
                required: {
                    value: "1",
                    message: "Please enter your Last Name",
                },
            },
        },
        submit: submit
    });


    const emailErrorColor = (key) => {
        return errors && errors?.[key]
            ? "form-control bg-white  border-danger"
            : "form-control  bg-white ";
    };

    const emailErrorColor1 = (key) => {
        return errors && errors?.[key]
            ? "form-select bg-white  border-danger rounded"
            : "form-select  bg-white rounded";
    };

    const returnValue = (key) => {
        return data?.[key] && data?.[key] ? data?.[key] : ""
    }


    const getMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate());
        return maxDate;
    };


    useEffect(() => {
        setValues(profileData)

    }, [profileData])

    useEffect(() => {
        // getallTags()
        DropdownMaster("Tags", setAlltags)
    }, [])
    useEffect(() => {
        childObj(data)
    }, [data])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row p-3">
                    <div className="mediumf17 py-2 appts_subheaders">
                        Provider Name <span className="text-danger ">*</span>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label >
                                First <span className="text-danger">*</span>
                            </label>
                            <input

                                className={emailErrorColor("firstName")}
                                placeholder="First Name..."
                                type="text"
                                name="firstName"
                                value={data?.firstName}
                                onChange={handleAlphabetChange("firstName")}
                            />
                        </div>

                        <div className="col-md-4">
                            <label> Middle </label>
                            <input
                                className="form-control "
                                placeholder="Middle Name..."
                                type="text"
                                name="middleName"
                                value={data?.middleName}
                                onChange={handleAlphabetChange("middleName")}
                            />
                        </div>
                        <div className="col-md-4">
                            <label>
                                {" "}
                                Last <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                                className={emailErrorColor("lastName")}
                                placeholder="Last Name..."
                                type="text"
                                name="lastName"
                                value={data?.lastName}
                                onChange={handleAlphabetChange("lastName")}
                            />
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-md-4 ">
                            <label>
                                DOB <span className="text-danger">*</span>
                            </label>
                            <DatePicker
                                className={`${emailErrorColor("dob")} py-2`}
                                minDate={new Date(1900, 1, 1)}
                                selected={data?.dob && new Date(data?.dob)}
                                maxDate={new Date(2004, 11, 31)}
                                autoComplete="off"
                                name="dob"
                                onChange={(e) => {
                                    handleDateChange(e, "dob");
                                }}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/DD/YYYY"
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
                            <input
                                className={emailErrorColor("email")}

                                placeholder="Email..."
                                type="text"
                                name="email"
                                value={data?.email}
                                onChange={handleEmailChange("email")}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="mediumf17 py-2 appts_subheaders">
                            License Information <span className="text-danger">*</span>
                        </div>

                        <div className="row ">
                            <div className="col-md-4">
                                <label>
                                    License State <span className="text-danger">*</span>
                                </label>
                                <select className={emailErrorColor1("licenseState")} name="licenseState" value={returnValue("licenseState")} onChange={handleChange("licenseState")}>
                                    <option value="">License State</option>
                                    {licence && licence?.map((v) => <option value={v?.stateId}>{v?.stateName}</option>)}
                                    <option></option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label>
                                    NPI # <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={emailErrorColor("npi")}
                                    placeholder="NPI..."
                                    type="text"
                                    name="npi"
                                    maxLength={12}
                                    value={phoneFormat(data?.npi)}
                                    onChange={handlePhoneChange("npi")}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>DEA (optional)</label>
                                <input
                                    className="form-control "
                                    placeholder="Other License #*"
                                    type="text"
                                    name="dea"
                                    maxLength={12}
                                    value={phoneFormat(data?.dea)}
                                    onChange={handlePhoneChange("dea")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="mediumf17 py-2 appts_subheaders">
                        Specialty <span className="text-danger">*</span>
                    </div>
                    <div className="col-md-4">

                        <Select
                            isMulti
                            closeMenuOnSelect={false}
                            className={errors && errors?.["speciality"] ? "border border-danger rounded" : ""}
                            onChange={handleMultiSelect("speciality")}
                            value={data?.speciality}
                            options={speciality?.map((v) => { return { label: v?.specialityName, value: v?.specialityId } })}
                        >

                        </Select>
                    </div>
                </div>

                <div className=" p-4">

                    <div className="mediumf17 py-2 appts_subheaders">
                        Tags <label>(Select all that apply)</label>
                    </div>
                    <div className="col-md-4">

                        <Select isMulti
                        closeMenuOnSelect={false}
                            className="border rounded"
                            onChange={handleMultiSelect("tags")}
                            value={data?.tags}
                            options={allTags?.map((v) => { return { label: v?.providerTagName, value: v?.providerTagId } })}
                        >

                        </Select>
                    </div>

                    {/* <Creatable
                        className="bg-white  col-md-4"
                        placeholder={"Select Tags"}
                        name={`clientTags`}
                        isMulti={true}
                        value={data?.tags}
                        // onInputChange={true}
                        onChange={singleHandleTags("tags", createTags)}
                        options={allTags}

                    /> */}
                    {/* <button
                        className="border rounded tag-btn  p-2 mt-4 px-3  d-flex align-items-center justify-content-center pointer text-white "
                        style={{ background: "#0073EEB3 0% 0% no-repeat padding-box" }}
                    >
                        <IoPricetags size={18} color="#A6CEF9" className="me-2" /> Edit Tags
                    </button> */}

                    
                </div>
                <hr className="" />
                <div className="py-3 px-4 d-flex align-items-between justify-content-between">
                    <button
                        className="btn btn-white border"
                        onClick={() => navigate("/outpatientpro/facility/appointment")}
                        style={{ color: "#6D6D6D",fontSize:"14px" }}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{fontSize:"14px" }}
                  
                    >
                        Next: Select Facility(s)
                    </button>
                </div>
            </form>
        </>
    );
};
export default AddProfile