import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { Modal } from "react-bootstrap";
import ReactTable from "../../../share_components/ReactTable";
import { RxCross2 } from "react-icons/rx";
import {
  DropdownMaster,
  TableActionBoutton,
  filterSearch,
  getById,
  getList,
  mulitplePhoneNumberValue,
  phoneFormat,
  save,
  statusFun,
  usphoneFormat,
} from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import Table from "../../../share_components/Table";
import { ListOfCards } from "../../../share_components/ListOfCards";
import { BiEdit } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const FacilityManagement = () => {
  const [update, setUpdate] = useState([]);
  const [getallOrg, setgetAllOrg] = useState([]);
  const [state, setState] = useState([]);
  const [model, setModel] = useState(false);
  const [locations, setLocations] = useState(false);
  const [search, setSearch] = useState("");
  const [Obj, setObj] = useState({});
  const navigate = useNavigate();
  const [facilityList, setFacilityList] = useState([]);
  console?.log(locations, "locationslocations");


  const submit = async () => {
    data["organizationId"] = model != true && model > 0 ? model : 0;
    let jsonObjects = data;
    let res = await save(urls?.settings?.facilityManagementSave, {
      jsonObjects,
    });
    if (res?.data?.status) {
      setUpdate(res);
      setModel(false);
    }
  };
  const getAll = async () => {
    let jsonObjects = { organizationId: 0 };
    let res = await getList(urls?.settings?.facilityManagementAll, {
      jsonObjects,
    });
    setgetAllOrg(res);

   
  };
  const byIdOrg = async () => {
    let jsonObjects = { organizationId: model };
    let res = await getById(urls?.settings?.facilityManagementAll, {
      jsonObjects,
    });
    setObj(res);
    console?.log(res,"getallorg")
  };
  const changeStatus = async (row) => {
    let jsonObjects = {
      organizationId: row?.organizationId,
      status: row?.status == "Active" ? "InActive" : "Active",
    };
    let res = await save(urls?.settings?.statusFacilitManagement, {
      jsonObjects,
    });
    if (res?.data?.status) {
      setUpdate(res);
    }
  };
  const {
    data,
    errors,
    headerlink,
    handleChange,
    handlePhoneChange,
    handleNumberChange,
    handleSubmit,
    setValues,
  } = UseFormValidations({
    initialValues: {
      organizationName: "",
      code: "",
      phone: "",
      city: "",
      state: "",
      zip: "",
      address: "",
    },
    validationSchema: {
      organizationName: {
        required: {
          value: true,
          message: "please enter",
        },
      },

      phoneNumber: {
        required: {
          value: true,
          message: "Please enter your mobile",
        },
        minlength: {
          value: 10,
          message: "Please enter 10 digit phone",
        },
        maxlength: {
          value: 10,
          message: "Please enter 10 digit phone",
        },
      },

      code: {
        required: {
          value: true,
          message: "Please enter your Facility Name",
        },
      },

      state: {
        required: {
          value: true,
          message: "Please enter your First Name",
        },
      },

      city: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },

      zip: {
        required: {
          value: true,
          message: "Please enter your Role Name",
        },
      },
      address: {
        required: {
          value: true,
          message: "Please enter your Role Name",
        },
      },
    },
    submit: submit,
  });
  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white  border-danger rounded"
      : "form-select  bg-white rounded";
  };
  const returnValue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };

  const returnData = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };
  const cssError = (key) => {
    return errors?.[key] && errors?.[key]
      ? "form-control border border-danger"
      : "form-control";
  };
  useEffect(() => {
    setValues(Obj);
  }, [Obj]);
  useEffect(() => {
    headerlink(sessionStorage?.getItem("roleId")==2?[
      { name: "Settings", link: "/outpatientpro/enterprise/settings" },
      {
        name: "Organization",
        link: "/outpatientpro/enterprise/settings/facility_management",
        active: true,
      },
    ]:[
      { name: "Settings", link: "/outpatientpro/facility/settings" },
      {
        name: "Organization",
        link: "/outpatientpro/facility/settings/facility_management",
        active: true,
      },
    ]);
    getAll();
    DropdownMaster("State", setState);
  }, [update]);

  useEffect(() => {
    if (model != 0) {
     
      byIdOrg();
    } else {
      setValues({});
    }
  }, [model]);

  const getFacilityList = async () => {
    let jsonObjects = {
      type: "Location",
      organizationId: locations,
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });

    setFacilityList(res);
  };
  useEffect(() => {
    getFacilityList();
  }, [locations]);

  let culums = [
    {
      name: "Code",
      selector: (row) => <div title={row?.code}>{row?.code}</div>,
      key: "code",
      sortable: true,
    },
    {
      name: "Enterprise Name",
      selector: (row) => (
        <div title={row?.organizationName}>
          <span className="rounded-pill   px-1 bg-success text-white f13">
            {row?.facilityCount}
          </span>
          <span className="ms-2">{row?.organizationName}</span>
        </div>
      ),
      width: "30rem",
      sortable: true,
      key: "organizationName",
    },

    {
      name: "Address",
      selector: (row) => <div title={row?.address}>{row?.address}</div>,

      sortable: true,
      key: "address",
    },
    {
      name: "Phone",
      selector: (row) => (
        <div title={row?.phoneNumber}>{usphoneFormat(row?.phoneNumber)}</div>
      ),
      key: "phoneNumber",

      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div onClick={() => changeStatus(row)}>{statusFun(row)}</div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          {TableActionBoutton([
            {
              name: "Edit",
              modalName: setModel,
              value: row?.organizationId,
              icon: <BiEdit color="#0073EE" className="mb-1" size={20} />,
            },

            // {
            //   name: "Locations",
            //   modalName:()=>{navigate(`/outpatientpro/admin/settings/enterprise_locations/all/${row?.organizationId}`)},
            //   value: row,
            //   icon: <IoLocationSharp  color="#0073EE" className="mb-1" size={20} />,
            // },

            {
              name: "Locations",
              modalName: setLocations,
              value: row?.organizationId,
              icon: (
                <IoLocationSharp color="#0073EE" className="mb-1" size={20} />
              ),
            },
          ])}
        </div>
      ),
    },
  ];
console?.log(model,"model")
  const modelOrg = () => {
   
    return (
      <Modal
        show={model}
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="no-border-radius-modal"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {" "}
              <div className="modal-header-text">
                {model != true && model > 0
                  ? "Update Enterprise"
                  : "Add Enterprise"}
              </div>{" "}
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={() => setModel(false)}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="  bg-white p-3">
              <div className="row mt-2 ">
                <div className="col-md-6 my-2">
                  {" "}
                  <label>
                    Code<span className="text-danger">*</span>
                  </label>
                  <input
                    className={cssError("code")}
                    name="code"
                    placeholder="Enterprise Code... "
                    value={returnData("code")}
                    onChange={handleChange("code")}
                  />
                </div>
                <div className="col-md-6 my-2">
                  {" "}
                  <label>
                    Enterprise Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className={cssError("organizationName")}
                    name="userName"
                    placeholder="Enterprise Name... "
                    value={returnData("organizationName")}
                    onChange={handleChange("organizationName")}
                  />
                </div>
                <div className="col-md-6 my-2">
                  {" "}
                  <label>
                    Address 1 <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={cssError("address")}
                    name="address"
                    placeholder="Address... "
                    value={returnData("address")}
                    onChange={handleChange("address")}
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Address 2</label>
                  <textarea
                    className="form-control"
                    name="address2"
                    placeholder="Address... "
                    value={returnData("address2")}
                    onChange={handleChange("address2")}
                  />
                </div>
                <div className="col-lg-4 col-xl-6 col-md-12  col-sm-12 my-2">
                  <label>
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    className={cssError("city")}
                    value={data?.city}
                    onChange={handleChange("city")}
                    placeholder="City"
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-6 col-md-12  col-sm-12 my-2">
                  <label>
                    State <span className="text-danger">*</span>
                  </label>
                  <select
                    className={emailErrorColor1("state")}
                    name="state"
                    value={returnValue("state")}
                    onChange={handleChange("state")}
                  >
                    <option value=""> State</option>
                    {state &&
                      state?.map((v) => (
                        <option value={v?.stateId}>{v?.stateName}</option>
                      ))}
                    <option></option>
                  </select>
                </div>
                <div className="col-lg-4 col-xl-6 col-md-12  col-sm-12 my-2 ">
                  <label>
                    Zip <span className="text-danger">*</span>
                  </label>
                  <input
                    className={cssError("zip")}
                    value={data?.zip}
                    onChange={handleNumberChange("zip")}
                    maxLength={5}
                    placeholder="Zip Code"
                  ></input>
                </div>
                <div className="col-lg-4 col-xl-6 col-md-12  col-sm-12 my-2">
                  <label>
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    className={cssError("phoneNumber")}
                    placeholder="(xxx) xxx-xxxx"
                    name="phoneNumber"
                    value={usphoneFormat(data?.phoneNumber)}
                    onChange={handlePhoneChange("phoneNumber")}
                  ></input>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row gap-2 px-2">
              <button
                type="submit"
                className=" col-md-auto btn save-user border rounded     pointer text-white "
              >
                Save
              </button>
              <div
                className="col-md-auto border cancel-user rounded   btn   pointer text-black "
                style={{ background: "#ffff" }}
                onClick={() => setModel(false)}
              >
                Cancel
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  const locationsOrg = (props) => {

    
    console.log(props, "0897878");
  

    return (
      <Modal
        show={locations}
        size="xl"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="no-border-radius-modal"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header style={{ background: "#F7F7F7" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {" "}
              <div className="modal-header-text">Locations</div>{" "}
            </Modal.Title>

            <div className="d-flex">
              <div className="pointer" onClick={() => setLocations(false)}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="  bg-white p-3">
            
              <div className="row">
                {facilityList == null || facilityList.length === 0 ? (
                  <div className="col-12">
                    <div className="alert alert-secondary" role="alert">
                      No records found.
                    </div>
                  </div>
                ) : (
                  facilityList.map((v) => (
                    <div className="col-md-6" key={v?.facilityName}>
                      <div
                        className="border mx-1 mt-1 py-3 px-3 col-12 rounded"
                        style={{ minHeight: "10rem" }}
                      >
                        <div className="f14 bold">{v?.facilityName}</div>
                        <div className="row">
                          <label className="col-3 f13">Address</label>
                          <div className="col-8 f13">: {v?.address}</div>
                        </div>
                        <div className="row">
                          <label className="col-3 f13">City</label>
                          <div className="col-9 f13">: {v?.city}</div>
                        </div>
                        <div className="row">
                          <label className="col-3 f13">State</label>
                          <div className="col-9 f13">: {v?.stateName}</div>
                        </div>
                        <div className="row">
                          <label className="col-3 f13">Zip</label>
                          <div className="col-9 f13">: {v?.zipCode}</div>
                        </div>
                        <div className="row">
                          <label className="col-3 f13">Email</label>
                          <div className="col-8 f13">: {v?.email}</div>
                        </div>
                        <div className="row">
                          <label className="col-3 f13">Phone</label>
                          <div className="col-8 f13">
                            : {usphoneFormat(v?.phone)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row  px-2">
              <div
                className="col-md-auto border cancel-user rounded   btn   pointer text-black "
                style={{ background: "#ffff" }}
                onClick={() => setLocations(false)}
              >
                Cancel
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  return (
    <>
      <div className="show_header">
        <ListOfCards
          array={getallOrg || []}
          title={"Enterprise"}
          name={"Enterprisegit"}
        />
      </div>
      <div className="bg-white  p-4 mobile_Header">
        <div className="row">
          <div className=" col-md-7">
            <div className="settings-locations">Enterprise</div>
          </div>
          <div className="col-md-3">{filterSearch(setSearch, search)}</div>
          <div className="col-2">
            <div
              className="save btn  border   rounded"
              onClick={() => setModel("0")}
            >
              + Add
            </div>
          </div>
        </div>
        {locations && locationsOrg()}
        {model && modelOrg()}
        <Table dataTable={getallOrg || []} columns={culums} search={search} />
      </div>
    </>
  );
};

export default FacilityManagement;
