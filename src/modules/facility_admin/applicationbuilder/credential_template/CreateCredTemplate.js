import React, { useEffect, useState } from "react";
import ReactTable from "../../../../share_components/ReactTable";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import {
  DropdownMaster,
  getById,
  getList,
  save,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const CreateCredTemplate = () => {
  const [specialityList, setSpecialityList] = useState([]);
  const [ahpList, setAHPList] = useState([]);
  const [licenseList, setLicenseList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [credTemplate, setCredTemplate] = useState([]);
  const navigate = useNavigate();
  const { tempId, templateId } = useParams();
  const [CategoryList, setCategoryList] = useState([]);
  // Credential Type

  const submit = async (saveType, obj) => {
    specialityList?.map((v) => {
      v["doctor"] = data[v?.specialityName] ? data[v?.specialityName] : "No";
    });
    ahpList?.map((v) => {
      v["ahp"] = data[v?.name] ? data[v?.name] : "No";
    });
    data["doctors"] = specialityList
      ?.filter((v) => v?.doctor != "No")
      .map((v) => v?.doctor);

    data["ahp"] = ahpList?.filter((v, i) => v.ahp != "No").map((v) => v?.ahp);

    console?.log(data, "submit");
    let jsonObjects = {
      templateId: templateId ? templateId : 0,
      templateName: data?.templateName,
      type: data?.type,
      saveType: saveType,
      addToList:
        saveType == "delete"
          ? obj
          : [
              {
                credType: data?.credType,
                credCategory: data?.credCategory,
                license: data?.license,
              },
            ],
      additionalData: [
        {
          doctor: data?.doctors,
          ahp: data?.ahp,
        },
      ],
    };

    let res = await save(
      urls?.applicationBuilder?.credentialingSave,
      { jsonObjects },
      saveType
    );

    if (res?.data?.status) {
      addObject({ credType: "", credCategory: "", license: "" });
      setUpdate(res);
      switch (saveType) {
        case "addToListNew":
          return navigate(
            `/outpatientpro/facility/applicationBuilder/credentialing/create/${
              templateId ? templateId : res?.data?.templateId
            }`
          );
        case "save":
          return navigate(
            `/outpatientpro/facility/applicationBuilder/credentialing`
          );
      }
      setLicenseList();
      setCategoryList();
    }
  };
  const deleteDocument = async (index) => {
    let obj = data?.addToList?.filter((v, i) => i != index);
    submit("delete", obj);
  };

  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },
      {
        name: "Credentialing Template List",
        link: "/outpatientpro/facility/applicationBuilder/credentialing",
      },
      {
        name: templateId
          ? "Update Credentialing Template"
          : "Add Credentialing Template",
        link: `/outpatientpro/facility/applicationBuilder/credentialing/${
          templateId ? `update/${templateId}` : "create"
        }`,
        active: true,
      },
    ]);
  }, []);

  const getAllCredTemplates = async () => {
    let jsonObjects = {
      type: "Credentialing",
      templateId: tempId || templateId,
    };
    let res = await getById(urls?.applicationBuilder?.getAllCredTemplates, {
      jsonObjects,
    });

    console?.log(data, "data123");
    setCredTemplate(res);
  };

  const getSpecialityList = async () => {
    let jsonObjects = {
      type: "Speciality",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });

    setSpecialityList(res);
  };

  const getAHPList = async () => {
    let jsonObjects = {
      type: "Allied Health Professionals",
      globalId: 0,
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });

    setAHPList(res);
  };

  const getLicenseList = async () => {
    let jsonObjects = {
      type: "Credential Type",
      credentialType: data?.credType,
      category: data?.credCategory,
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setLicenseList(res);
  };

  const {
    data,
    errors,
    handleChange,
    handleCapitalChange,
    headerlink,
    handleCheckbox,
    setValues,
    handleSubmit,
    addObject,
  } = UseFormValidations({
    initialValues: {
      templateName: "",

      type: "",
    },
    validationSchema: {
      templateName: {
        required: {
          value: true,
          message: "Please enter your Template Name",
        },
      },
      type: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
    },
    submit: submit,
  });

  console?.log(data, "data");
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control border bg-white ";
  };

  const checkedFn = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  useEffect(() => {
    credTemplate["type"] = "Credentialing";
    credTemplate?.additionalData &&
      credTemplate?.additionalData[0]?.ahp?.map((v) => {
        credTemplate[v] = v;
      });

    credTemplate?.additionalData &&
      credTemplate?.additionalData[0]?.doctor?.map((v) => {
        credTemplate[v] = v;
      });

    addObject(credTemplate);
  }, [credTemplate]);
  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };

  useEffect(() => {
    getSpecialityList();
    getAHPList();
    // getLicenseList();
  }, []);
  useEffect(() => {
    if (data?.credType && data?.credCategory) {
      getLicenseList();
    }
  }, [data?.credType, data?.credCategory]);

  useEffect(() => {
    if (tempId || templateId) {
      getAllCredTemplates();
    }
  }, [update, tempId, templateId]);

  const columns = [
    {
      name: "Credential Type",
      selector: (row) => <div title={row?.credType}>{row?.credType}</div>,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => <div>{row?.credCategory}</div>,

      sortable: true,
    },
    // {
    //   name: "License",
    //   selector: (row) => <div title={row?.license}>{row?.license}</div>,

    //   sortable: true,
    // },
    {
      name: "Actions",
      selector: (row, i) => (
        <div
          name="delete"
          onClick={() => deleteDocument(i)}
          className="pointer"
        >
          <MdDeleteForever size={20} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data?.credType) {
      DropdownMaster("Credentialing Category", setCategoryList, data?.credType);
    }
  }, [data?.credType]);

  console?.log(
    data?.addToList?.filter((v) => v?.credType && v?.credCategory),
    "data"
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white py-2 px-4">
        <div className=" py-4 f27 medium">Create a Credential Template</div>

        <p
          className="col-xl-6 col-lg-8  col-md-12 p-3"
          style={{
            background: "#EFEFEF 0% 0% no-repeat padding-box",
            borderRadius: " 4px",
            opacity: "1",
          }}
        >
          To start, select the Specialties. Then select your Credentials(s) and
          add them to the list below. These credentials will appear in the
          Application Packet for the selected specialties.
          <br />
          <span className="link-hover-line py-2 mt-2">
            Don’t show this again
          </span>
        </p>

        <div className="row ">
          <div className=" col-md-12 d-flex gap-2">
            <div className="col-md-auto ">
              <label className="border rounded-circle mt-4 number-circle  d-flex justify-content-center align-items-center ">
                1
              </label>
            </div>

            <div className="col-xl-4 col-lg-4    col-md-5  ms-2">
              <label className="formssubheading">
                Template Name <span className="text-danger">*</span>
              </label>
              <input
                placeholder="Template Name…"
                type="text"
                className={emailErrorColor("templateName")}
                name="templateName"
                value={data?.templateName}
                onChange={handleCapitalChange("templateName")}
              ></input>
            </div>
            <div className="col-xl-4 col-lg-4    col-md-5 ">
              <label className="formssubheading">
                Template Type <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Template Type …"
                value={data?.type}
              ></input>
            </div>
          </div>
        </div>

        <div className="row py-5">
          <div className=" col-md-7 d-flex gap-3">
            <div className="col-md-auto">
              <div className="border rounded-circle  number-circle  d-flex justify-content-center align-items-center ">
                2
              </div>
            </div>

            <div className="col-md-6  ">
              <div className="f18 py-2 medium ">
                Select Specialties <span className="text-danger">*</span>
                <label className="f14">(Select all that apply)</label>
              </div>
            </div>
          </div>

          <div className="row ms-5">
            {(data?.provider == "Doctor" || templateId == undefined) && (
              <div className="col-md-6">
                <div className="row">
                  <div className="f17 medium mb-2">Doctors</div>
                  {specialityList &&
                    specialityList?.map((v, i) => {
                      return (
                        <div className="col-md-6 ">
                          <div className="checkboxWithText1">
                            <input
                              className="pointer  "
                              type="checkbox"
                              name={v?.specialityName}
                              value={v?.specialityName}
                              id={v?.specialityId}
                              checked={checkedFn(
                                v?.specialityName,
                                v?.specialityName
                              )}
                              onChange={handleCheckbox(v?.specialityName)}
                            />
                            <label className="pointer " for={v?.specialityId}>
                              {v?.specialityName}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            {(data?.provider == "Allied Health Professional" ||
              templateId == undefined) && (
              <div className="col-md-6">
                <div className="row ">
                  <div className="f17 medium mb-2">
                    Allied Health Professionals
                  </div>

                  {ahpList &&
                    ahpList?.map((v, i) => {
                      return (
                        <div className="col-md-6 ">
                          {" "}
                          <div className="checkboxWithText1">
                            <input
                              className="pointer"
                              type="checkbox"
                              name={v?.name}
                              value={v?.name}
                              id={v?.globalId}
                              checked={checkedFn(v?.name, v?.name)}
                              onChange={handleCheckbox(v?.name, v?.name)}
                            />
                            <label className="pointer" for={v?.globalId}>
                              {v?.name}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className=" col-md-7 d-flex gap-3">
            <div className="col-md-auto">
              <div className="border rounded-circle  number-circle  d-flex justify-content-center align-items-center ">
                3
              </div>
            </div>

            <div className="col-xl-6 col-lg-6  col-md-12  ">
              <div className="f18 py-2 medium ">
                Select Required Credential{" "}
                <span className="text-danger">*</span>
              </div>
            </div>
          </div>

          <div className="row ms-5 px-5">
            <div className="col-xl-4 col-lg-4      col-md-6">
              <div className="row">
                <div className="f15 medium" style={{ opacity: "1" }}>
                  Step 1: Select Credential Type
                </div>

                <div className="col-md-6">
                  <div className="checkboxWithText">
                    <input
                      className="pointer"
                      type="radio"
                      name="credType"
                      value={"Licensure"}
                      id="licensure"
                      checked={checkedFn("credType", "Licensure")}
                      onChange={handleCheckbox("credType", "Licensure")}
                    />
                    <label className="pointer" for="licensure">
                      Licensure
                    </label>
                  </div>

                  <div className="checkboxWithText">
                    <input
                      className="pointer"
                      type="radio"
                      name="credType"
                      value="Certification"
                      id="certification"
                      checked={checkedFn("credType", "Certification")}
                      onChange={handleCheckbox("credType", "Certification")}
                    />
                    <label className="pointer" for="certification">
                      {" "}
                      Certification
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4    col-md-6">
              <div className="row">
                <div className="f15 medium">Step 2: Select Category</div>

                <div className="col-md-12 py-2">
                  <select
                    className="form-select"
                    value={dataValue(data?.credCategory)}
                    name="credCategory"
                    onChange={handleChange("credCategory")}
                  >
                    <option>Select License</option>
                    {CategoryList &&
                      CategoryList?.map((v) => {
                        return <option>{v?.name}</option>;
                      })}
                  </select>
                </div>
              </div>
            </div>

            {/* <div className="col-xl-4 col-lg-4     col-md-6">
              <div className="row">
                <div className="f15 medium">Step 3: Select License</div>

                <div className="col-xl-10 col-lg-10    col-md-12 py-2">
                  <select
                    className="form-select"
                    value={dataValue(data?.license)}
                    name="license"
                    onChange={handleChange("license")}
                  >
                    <option>Select License</option>
                    {licenseList?.map((v) => {
                      return <option>{v?.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <hr />

        <div className="col-auto mb-4 px-1">
          <button
            type="addToListNew"
            name={tempId || templateId ? "addToList" : "addToListNew"}
            className="button-user   border p-2 px-4  rounded"
            style={{ fontSize: "16px" }}
          >
            + Add to List
          </button>
        </div>

        <ReactTable
          tableCss={{ min: "45px", max: "45px" }}
          dataTable={
            data?.addToList?.filter(
              (v) => v?.credType || v?.license || v?.credCategory
            ) || []
          }
          columns={columns}
        />
        <hr />
        <div className="col-auto px-1">
          <button
            type="save"
            name="save"
            className="save border p-2 px-4 text-white rounded"
          >
            Save Template
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCredTemplate;
