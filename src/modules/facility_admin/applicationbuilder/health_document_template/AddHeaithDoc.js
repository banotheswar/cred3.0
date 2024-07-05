import React, { useEffect, useState } from "react";
import Select from "react-select";
import ReactTable from "../../../../share_components/ReactTable";
import { MdDeleteForever } from "react-icons/md";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import {
  getById,
  getList,
  save,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../../share_components/Table";

const AddHeaithDoc = () => {
  const [specialityList, setSpecialityList] = useState([]);
  const [aHPList, setAHPList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [credTemplate, setCredTemplate] = useState([]);
  const [healthMaster, setHealthMaster] = useState([]);
  const navigate = useNavigate();
  const { tempId, templateId } = useParams();

  const submit = async (saveType, obj) => {
    specialityList?.map((v) => {
      v["doctor"] = data[v?.specialityName] ? data[v?.specialityName] : "No";
    });
    aHPList?.map((v) => {
      v["ahp"] = data[v?.name] ? data[v?.name] : "No";
    });
    data["doctors"] = specialityList
      ?.filter((v) => v?.doctor != "No")
      .map((v) => v?.doctor);

    data["ahp"] = aHPList?.filter((v, i) => v.ahp != "No").map((v) => v?.ahp);

    let jsonObjects = {
      templateId: templateId ? templateId : 0,
      templateName: data?.templateName,
      type: data?.type,
      saveType: saveType,
      addToList:
        saveType == "delete"
          ? obj
          : [{ credType: data?.credType, credCategory: data?.healthDocument }],
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
      addObject({ credType: "", credCategory: "", healthDocument: "" });
      setUpdate(res);
      switch (saveType) {
        case "addToListNew":
          return navigate(
            `/outpatientpro/facility/applicationBuilder/healthdocument/create/${
              templateId ? templateId : res?.data?.templateId
            }`
          );
        case "save":
          return navigate(
            `/outpatientpro/facility/applicationBuilder/healthdocument`
          );
      }
    }
  };
  const deleteDocument = async (index) => {
    let obj = data?.addToList?.filter((v, i) => i != index);
    submit("delete", obj);
    console?.log(obj, "deleteDocument");
  };
  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },
      {
        name: "Health Documents List",
        link: "/outpatientpro/facility/applicationBuilder/healthdocument",
      },
      {
        name: templateId
          ? "Update Health Documents List"
          : "Add Health Documents List",
        link: `/outpatientpro/facility/applicationBuilder/healthdocument/${
          templateId ? `update/${templateId}` : "create"
        }`,
        active: true,
      },
    ]);
  }, []);

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
  const healthDocumentMaster = async () => {
    let jsonObjects = {
      type: "Health Document",
      globalId: 0,
      credentialType:data?.credType
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setHealthMaster(res);
  };
  const getAllCredTemplates = async () => {
    let jsonObjects = {
      type: "Health Document",
      templateId: tempId || templateId,
    };
    let res = await getById(urls?.applicationBuilder?.getAllCredTemplates, {
      jsonObjects,
    });

    console?.log(data, "data123");
    setCredTemplate(res);
  };

  const checkedFn = (key, value) => {
    return data?.[key] && data?.[key] == value ? true : false;
  };

  const {
    data,
    errors,
    handleChange,
    handleCapitalChange,
    headerlink,
    handleCheckbox,
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

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control border bg-white ";
  };

  const columns = [
    {
      name: "Type",
      selector: (row) => <div>{row?.credType}</div>,
      sortable: true,
    },
    {
      name: "Document Name",
      selector: (row) => (
        <div title={row?.credCategory}>{row?.credCategory}</div>
      ),
      sortable: true,
    },

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
      sortable: true,
    },
  ];

  useEffect(() => {
    credTemplate["type"] = "Health Document";
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
  useEffect(() => {
    getSpecialityList();
    getAHPList();
    healthDocumentMaster();
  }, []);


  useEffect(() => {
    if(data?.credType){
      healthDocumentMaster();
    }
  }, [data?.credType]);


  useEffect(() => {
    if (tempId || templateId) {
      getAllCredTemplates();
    }
  }, [update, tempId, templateId]);
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white py-2 px-4 ">
        <div className="f27 medium py-4">
          Create a Health Document Template
        </div>

        <p
          className="col-xl-6 col-lg-10  col-md-12 p-3"
          style={{
            background: "#EFEFEF 0% 0% no-repeat padding-box",
            borderRadius: " 4px",
            opacity: "1",
          }}
        >
          To start, select the Specialties. Then select your Health Document(s)
          and add them to the list below. These documents will appear in the
          Application Packet for the selected specialties.
          <br /> <span className="link-hover-line ">Don’t show this again</span>
        </p>

        <div className="row ">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex gap-2">
            <div className="col-md-auto ">
              <div className="border rounded-circle mt-4 number-circle  d-flex justify-content-center align-items-center ">
                1
              </div>
            </div>

            <div className="col-xl-4 col-lg-4  col-md-5 ms-2">
              <label className="formssubheading">
                Template Name <span className="text-danger">*</span>
              </label>
              <input
                placeholder="Template Name…"
                className={emailErrorColor("templateName")}
                name="templateName"
                value={data?.templateName}
                onChange={handleCapitalChange("templateName")}
              ></input>
            </div>
            <div className="col-xl-4 col-lg-4  col-md-5  ">
              <label className="formssubheading">
                Template Type <span className="text-danger">*</span>
              </label>
              <input
                className={emailErrorColor("type")}
                placeholder="Template Type …"
                value={data?.type}
                onChange={handleCapitalChange("type")}
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

            <div className="col-md-6 ">
              <div className="f18 py-2 medium ">
                Select Specialties <span className="text-danger">*</span>{" "}
                <label className="f14">(Select all that apply)</label>
              </div>
            </div>
          </div>

          <div className="row ms-5 ">
            {(data?.provider == "Doctor" || templateId == undefined) && (
              <div className="col-lg-6 col-xl-6 col-md-12">
                <div className="row">
                  <div className="f17 medium mb-2">Doctors</div>
                  {specialityList &&
                    specialityList?.map((v) => {
                      return (
                        <div className="col-md-6 px-4">
                          <div class="checkboxWithText1">
                            <input
                              type="checkbox"
                              value={v?.specialityName}
                              id={v?.specialityId}
                              name={v?.specialityName}
                              checked={checkedFn(
                                v?.specialityName,
                                v?.specialityName
                              )}
                              onChange={handleCheckbox(v?.specialityName)}
                            />
                            <label
                              class="form-check-label pointer"
                              for={v?.specialityId}
                            >
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
              <div className="col-lg-6 col-xl-6 col-md-12">
                <div className="row">
                  <div className="f17 medium mb-2">
                    Allied Health Professionals
                  </div>

                  {aHPList &&
                    aHPList?.map((v) => {
                      return (
                        <div className="col-md-6 px-4">
                          <div class="checkboxWithText1">
                            <input
                              type="checkbox"
                              value={v?.name}
                              id={v?.globalId}
                              checked={checkedFn(v?.name, v?.name)}
                              onChange={handleCheckbox(v?.name)}
                            />
                            <label class="form-check-label pointer" for={v?.globalId}>
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

        <div className="row ">
          <div className="col-md-7 d-flex gap-3">
            <div className="col-md-auto">
              <div className="border rounded-circle  number-circle  d-flex justify-content-center align-items-center ">
                3
              </div>
            </div>

            <div className="col-xl-6 col-lg-8 col-md-12  ">
              <div className="f18 py-2 medium ">
                Select Required Health Document <span className="text-danger">*</span>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-xl-4 col-lg-4 col-md-12 ms-4 px-5">
              <div className="row">
                <div className="f15 medium" style={{ opacity: "1" }}>
                  Step 1: Select Health Document Type
                </div>

                <div className=" px-4">
                  <div className="checkboxWithText">
                    <input
                      type="radio"
                      name="credType"
                      value={"Immunization"}
                      id="Immunization"
                      checked={checkedFn("credType", "Immunization")}
                      onChange={handleCheckbox("credType", "Immunization")}
                    />
                    <label for="Immunization" className="">
                    Immunization
                    </label>
                  </div>

                  <div className="checkboxWithText">
                    <input
                      type="radio"
                      name="credType"
                      value={"Test"}
                      id="Test"
                      checked={checkedFn("credType", "Test")}
                      onChange={handleCheckbox("credType", "Test")}
                    />
                    <label for="Test"> Test</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 ms-4 px-5">
              <div className="row">
                <div className="f15 medium" style={{ opacity: "1" }}>
                  Step 2: Select Health Document
                </div>
                {/* <Select
              options={healthMaster&&healthMaster?.map((v)=>{return {label:v?.name,value:v?.globalId}})}
              //  styles={customStyles}
               value={data?.healthDocument}
               onChange={handleMultiSelect("healthDocument")}
              /> */}
                <div className="col-md-12 py-2">
                  {" "}
                  <select
                    className="form-select"
                    value={data?.healthDocument}
                    onChange={handleChange("healthDocument")}
                  >
                    <option value={""}>Select</option>
                    {healthMaster &&
                      healthMaster?.map((v) => {
                        return <option value={v?.name}>{v?.name}</option>;
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-auto mb-4 px-1">
          <button
            name={tempId || templateId ? "addToList" : "addToListNew"}
            className="button-user   border p-2 px-4  rounded"
            style={{fontSize:"16px"}}
          >
            + Add to List
          </button>
        </div>
        {
          <Table
          tableCss={{min:"45px",max:"45px"}}
            dataTable={data?.addToList?.filter(
              (v) => v?.credType || v?.healthDocument
            ) || []}
            columns={columns}
          />
        }
        <hr />
        <div className="col-auto px-1">
          <button
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

export default AddHeaithDoc;
