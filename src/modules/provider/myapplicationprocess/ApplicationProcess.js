import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import {
  add,
  getAll,
  getById,
  getList,
  save,
} from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import Creatable from "react-select/creatable";
import CreateDeligate from "./CreateDeligate";

const ApplicationProcess = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState();
  const [delegateList, setDelegateList] = useState([]);



  const submit = async () => {
    let jsonObjects = {
      delegateId: data?.userId,
      email: data?.email,
      userId: sessionStorage.getItem("userId"),
    };
    let res = await save(urls?.applicationInprogress?.createDeligate, {
      jsonObjects,
    });
    if (res?.data?.status) {
      setUpdate(res);
    }
  };


  const allDelegate = async () => {
    let jsonObjects = { userId: sessionStorage.getItem("userId") };
    let res = await getById(urls.settings.getAllUsers, { jsonObjects });
    addObject({ userId: res.delegateId });
    console?.log(res);
  };

  
  const {
    data,
    errors,
    addObject,
    handleChange,
    headerlink,
    setValues,
    handleSubmit,
  } = UseFormValidations({
    initialValues: {
      userId: "",
    },
    validationSchema: {
      userId: {
        required: {
          value: true,
          message: "Please enter password",
        },
      },
    },
    submit: submit,
  });

  const getDelegateList = async () => {
    let jsonObjects = {
      type: "Delegate",
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setDelegateList(res);
  };

  useEffect(() => {
    headerlink([
      {
        name: "My Applications",
        link: "/outpatientpro/provider/applicationprocess",
        active: "true",
      },
    ]);
    allDelegate();
  }, [update]);

  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };

  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger rounded"
      : "form-select border bg-white rounded";
  };
  useEffect(() => {
    getDelegateList();
  }, [update]);

  const closeModel = () => {
    setValues({ userId: false });
  };
  useEffect(() => {
    if (data?.userId > 0) {
      setValues(delegateList?.filter((v) => v?.userId == data?.userId)?.[0]);
    }
  }, [data?.userId, update]);
  useEffect(() => {
    if (update?.data?.data[0]?.delegateId) {
      data["userId"] = update?.data?.data[0]?.delegateId;
    }
  }, [update?.data?.data[0]?.delegateId]);
  console.log(data, "data", update?.data?.data[0]?.delegateId);
  return (
    <div>
      <div class="row bg-white mb-2">
        <div class="p-2 col-md-12 row d-flex flex-column justify-content-center align-items-center  myapplicationheader">
          <div className="col-md-6 py-2 mobile-header-font">
            Ghozland Surgery & Health Partners:
            <br />
            Reappointment Application
          </div>
        </div>
      </div>
      <div class="container-fluid vh-auto p-5 bg-white">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-md-10">
            <div class="row rounded border">
              <div class="col-12 col-md-6 border-md-right p-4">
                <h2 class="f22 fw-medium mb-3 mobile-sub-header-font">
                  Begin Your Application
                </h2>
                <p class="text-justify mb-4" style={{ textAlign: "justify" }}>
                  Our system will guide you through step-by-step – with
                  everything you need to complete and submit your application.
                </p>
                <div class="d-flex justify-content-center">
                  <button
                    class="btn  w-100 text-white p-2"
                    style={{ background: "#00B948" }}
                    onClick={() =>
                      navigate("/outpatientpro/provider/applicationinprogress")
                    }
                  >
                    Start My Application
                  </button>
                </div>
              </div>

              <div class="col-12 col-md-6 p-4">
                <h2 class="f22 fw-medium mb-3 mobile-sub-header-font">
                  .. or Assign a Delegate
                </h2>
                <p class="text-justify mb-4" style={{ textAlign: "justify" }}>
                  Your delegate can complete your Application on your behalf.
                  Once the application is complete, you will receive a
                  notification to sign and submit it.
                </p>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label class="fw-medium mb-2">
                      Delegate Name <span class="text-danger">*</span>
                    </label>
                    <select
                      className={`form-control ${emailErrorColor1("userId")}`}
                      value={dataValue(data.userId)}
                      name="userId"
                      onChange={handleChange("userId")}
                    >
                      <option value="">Select Delegate</option>
                      <option value={true} className="fw-bold">
                        Create New
                      </option>
                      {delegateList?.map((e, i) => (
                        <option key={i} value={e.userId}>
                          {e.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="fw-medium mb-2">
                      Email <span class="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      class="form-control"
                      value={data?.email}
                    />
                  </div>
                  <button class="btn btn-primary w-100 p-2">
                    Assign Delegate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="row bg-white vh-100 p-5">
        <div class="col-md-10 mx-auto ">
          <div class="p-4 row rounded border ">
            <div class="col-md-6" style={{ borderRight: "1px solid #D9D9D9" }}>
              <div className="f22 medium py-2 mobile-sub-header-font">Begin Your Application</div>
              <div className="myapplicationchild py-2" style={{ textAlign: 'justify' }}>
                Our system will guide you through step-by-step – with everything
                you need to complete and submit your application.
              </div>
              <div class="d-flex justify-content-center align-items-center py-4">
                <button className="save border col-md-12 rounded text-white p-2" onClick={() => navigate("/outpatientpro/provider/applicationinprogress")}>
                  Start My Application
                </button>
              </div>
            </div>
            <div class="col-md-6  px-4">
              <div className="f22 medium py-2 mobile-sub-header-font">.. or Assign a Delegate</div>
              <div className="myapplicationchild py-2 " style={{ textAlign: 'justify' }}>
                Your delegate can complete your Application on your behalf. Once
                the application is complete, you will receive a notification to
                sign and submit it.
              </div>
              <form onSubmit={handleSubmit}>
              <div class="row">
                <div class="col-md-12">
                  <div class="signin mobile-sub-header-font py-2">
                    Delegate Name <span >*</span>{" "}
                  </div>
                  <select
                    className={emailErrorColor1("userId")}
                    value={dataValue(data.userId)}
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


                  <div class="signin mobile-sub-header-font py-2">
                    Email <span >*</span>
                  </div>
                  <input
                    placeholder="Email"
                    class={`form-control mb-3`}
                    value={data?.email}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button class="f16 medium border col-md-12 rounded text-white p-2"

                    style={{ background: "#0073EE" }}
                  >
                    Assign Delegate
                  </button>
                </div>
              </div>
              </form>
              
            </div>
          </div>
        </div>
      </div> */}
      {data?.userId == "true" && (
        <CreateDeligate
          show={data?.userId}
          onHide={() => closeModel()}
          update={setUpdate}
          object={addObject}
        />
      )}
    </div>
  );
};

export default ApplicationProcess;
