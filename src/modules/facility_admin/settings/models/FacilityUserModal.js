import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  getById,
  getList,
  mulitplePhoneNumberValue,
  save,
} from "../../../../api_services/SharedServices";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { urls } from "../../../../api_services/url";
import Select from "react-select";
const FacilityUserModal = (props) => {
  console.log(props, "porps");
  const [rolesList, setRolesList] = useState([]);
  const [enterpriseList, setEnterpriseList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [user, setUser] = useState({});
  const [getAllOrg,setgetAllOrg]=useState([])
  const submit = async () => {
    data["userId"] = props?.show?.userId ? props?.show?.userId : 0;
    data["roleId"] = data.roleId;
    data["organizationId"] = sessionStorage.getItem("organizationId") == "0"||data?.roleId=="2"?sessionStorage.getItem("organizationId"):data?.facilityId
    data["type"]=sessionStorage?.getItem("organizationId")==0&&"Organization"

    let jsonObjects = data;
    console?.log(jsonObjects,"jsonObjects")
    let res = await save(urls?.settings?.createUser, { jsonObjects });
    if (res?.data?.status) {
      props?.updateList(res);
      props?.onHide();
    }
  };

  const getRolesList = async () => {
    let jsonObjects = {
      roleId:sessionStorage?.getItem("roleId"),
      organizationId:sessionStorage.getItem("organizationId"),
      type: "Role",
      filterType: "User"
        
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setRolesList(res);
  };

  const getEnterpriseList = async () => {
    let jsonObjects = {
      // roleId:sessionStorage?.getItem("roleId"),
      // organizationId:sessionStorage.getItem("organizationId"),
      type: "Organization",
      
        
    };
    let res = await getList(urls?.settings?.getStatesdd, {
      jsonObjects,
    });
    setEnterpriseList(res);
  };


  const getAll=async()=>{
    let jsonObjects={roleId:sessionStorage?.getItem("roleId"),
    organizationId:sessionStorage.getItem("organizationId"),}
    let res=await getList(urls?.settings?.facilityManagementAll,{jsonObjects})
    setgetAllOrg(res)
}

  const getFacilityList = async () => {
    let jsonObjects = {
      type: "Location",
      userId:sessionStorage.getItem("userId"), 
      organizationId:sessionStorage.getItem("organizationId"),

     };
    let path=sessionStorage.getItem("roleId")==4?urls?.doctor.getLocationsById:urls?.settings?.getStatesdd
    let res = await getList(path, {
      jsonObjects,
    });
    let obj = res?.map((value) => {
      return { label: value?.facilityName, value: value?.facilityId };
    });
    setFacilityList(obj);
  };


  const getByIdUsers = async () => {
    let jsonObjects = { userId: props?.show?.userId };
    let res = await getById(urls?.settings?.getAllUsers, { jsonObjects });
    res["facilityId"]= sessionStorage.getItem("organizationId")==0? res?.organizationId:res?.facilityId
    setUser(res);
  };




  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    handlePhoneChange,
    handleCapitalChange,
    handleMultiSelect,
  } = UseFormValidations({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      roleId: "",
      mobile: "",
      facilityId:sessionStorage.getItem("organizationId")=="0"?"":[],
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
      mobile: {
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
      facilityId: {
        required: {
          value: true,
          message: "Please enter your Facility Name",
        },
      },
      firstName: {
        required: {
          value: true,
          message: "Please enter your First Name",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter your Last Name",
        },
      },
      roleId: {
        required: {
          value: true,
          message: "Please enter your Role Name",
        },
      },
    },
    submit: submit,
  });
  const dataValue = (value) => {
    return value && value != "" ? value : "";
  };

  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white border border-danger"
      : "form-control border bg-white ";
  };

  const emailErrorColor1 = (key) => {
    return errors && errors?.[key]
      ? "form-select bg-white border border-danger rounded"
      : "form-select border bg-white rounded";
  };

  const returnErrorCssMultiple = (key) => {
    return errors && errors?.[key] && errors?.[key]
      ? "border border-danger rounded "
      : "border  rounded ";
  };
  const returnEstId = () => {
    return props?.show?.userId &&
      props?.show?.userId != undefined &&
      props?.show?.userId != "" &&
      props?.show?.userId != "0"
      ? true
      : false;
  };

  useEffect(() => {
    getRolesList();
    getFacilityList();
    getEnterpriseList();
    getAll()
  }, []);

  useEffect(() => {
    setValues(user);
  }, [user]);
  useEffect(() => {
    if (props?.show?.userId&&props?.show?.userId>0) {
      getByIdUsers();
    }
  }, [props.show]);
  console?.log(data,"data")
useEffect(()=>{
  if(sessionStorage.getItem("organizationId")=="1"){
   let res= getAllOrg?.filter((v)=>v?.organizationId==sessionStorage.getItem("organizationId"))
   setgetAllOrg(res)
  }
  
  else{
    setgetAllOrg(getAllOrg)
  }

},[data?.roleId])
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="no-border-radius-modal"
    >
      {" "}
      <form onSubmit={handleSubmit}>
        <Modal.Header style={{ background: "#F7F7F7" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            <div className="modal-header-text">
              {returnEstId() ? "Edit User" : "New User"}
            </div>{" "}
          </Modal.Title>

          <div className="d-flex">
            <div className="pointer" onClick={props?.onHide}>
              <RxCross2 size={25} />
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className=" bg-white p-2">
            <div className="">
              <div className="row ">
                <div className="col-md-6 py-2">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={emailErrorColor("firstName")}
                    name="firstName"
                    value={data?.firstName}
                    onChange={handleCapitalChange("firstName")}
                  />
                </div>

                <div className="col-md-6 py-2">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={emailErrorColor("lastName")}
                    name="lastName"
                    value={data?.lastName}
                    onChange={handleCapitalChange("lastName")}
                  />
                </div>

                <div className="col-md-6 py-2">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Email"
                    className={emailErrorColor("email")}
                    type="email"
                    name="email"
                    value={data?.email}
                    onChange={handleChange("email")}
                  />
                </div>

                <div className="col-md-6 py-2">
                  <label>
                    {" "}
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={emailErrorColor("mobile")}
                    placeholder="Phone"
                    name="mobile"
                    onChange={handlePhoneChange("mobile")}
                    value={mulitplePhoneNumberValue(data.mobile)}
                  />
                </div>

                <div className="col-md-6 py-2">
                  <label>
                    {" "}
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className={emailErrorColor1("roleId")}
                    value={dataValue(data.roleId)}
                    name="roleId"
                    onChange={handleChange("roleId")}
                  >
                    <option value="">Select Role</option>
                    {rolesList?.map((e, i) => {
                      return (
                        <option key={i} value={e.roleId}>
                          {e.roleName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {sessionStorage.getItem("organizationId") == "0"||data?.roleId=="2"? (
                  <div className="col-md-6 py-2">
                    <label>
                      Enterprise <span className="text-danger">*</span>
                    </label>
                    <select className={`${emailErrorColor("facilityId")} form-select`}value={data?.facilityId} onChange={handleChange("facilityId")}>
                      <option value={""}>Select Enterprise</option>
                      {/* {getAllOrg&&getAllOrg?.map((v)=>{
                        return <option value={v?.organizationId}>{v?.organizationName}</option>
                      })} */}
                           {enterpriseList&&enterpriseList?.map((v)=>{
                        return <option value={v?.organizationId}>{v?.organizationName}</option>
                      })}
                    </select>
                  </div>
                ) : (
                  <div className="col-md-6 py-2">
                    <label>
                      Facility <span className="text-danger">*</span>
                    </label>

                    <Select
                      options={facilityList}
                      className={returnErrorCssMultiple("facilityId")}
                      isClearable={true}
                      isMulti={true}
                      value={data?.facilityId}
                      name="facilityId"
                      onChange={handleMultiSelect("facilityId")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="row gap-2 px-2">
            <button
              type="submit"
              className=" col-md-auto save-user  border rounded     pointer  "
            >
              Save
            </button>
            <button
              className="col-md-auto border cancel-user rounded    pointer "
            
              onClick={props?.onHide}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FacilityUserModal;
