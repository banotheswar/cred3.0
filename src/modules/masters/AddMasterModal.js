import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import { UseFormValidations } from '../../validations/UseFormValidation';
import { DropdownMaster, getById, getList, save } from '../../api_services/SharedServices';
import { urls } from '../../api_services/url';

const AddMasterModal = (props) => {
    const [masterData, setMasterData] = useState({});
const [CategoryList,setCategoryList]=useState()
    const submit = async () => {
      let jsonObjects = {
        globalId: props?.show?.globalId > 0 ? props?.show?.globalId : 0,
        type: props?.masterName,
        name: data?.name,
        additionalData:
          props?.masterName == "Health Document" ||
          props?.masterName == "Credential Type"||
          props?.masterName == "Credentialing Category"
            ? [{ credentialType: data?.credentialType, category: data?.category }]
            : [],
        status: "Active",
      };
      let res = await save(urls?.masters?.save, { jsonObjects });
  
      if (res?.data?.status) {
        props?.update(res);
        props?.onHide(false);
      }
    };
    const getById3 = async () => {
      let jsonObjects = {
        globalId: props?.show?.globalId && props?.show?.globalId,
        type: props?.masterName,
        name: props?.show?.name,
      };
      let res = await getById(urls?.masters?.getList, { jsonObjects });
      if (
        props?.masterName == "Health Document" ||
        props?.masterName == "Credential Type"||
        props?.masterName == "Credentialing Category"
      ) {
        res?.additionalData &&
          res?.additionalData?.map((v) => {
            data["credentialType"] = v?.credentialType;
            data["category"] = v?.category;
          });
      }
  
      data["name"] = res?.name;
      setMasterData(data);
    };
  
    const { data, errors, handleSubmit, handleChange, setValues } =
      UseFormValidations({
        initialValues: {
          name: "",
          credentialType: "",
          category: "",
        },
        validationSchema: {
          name: {
            required: {
              value: true,
              message: "Please enter your First Name",
            },
          },
          credentialType: {
            required: {
              value: true,
              message: "Please enter your First Name",
            },
          },
          category: {
            required: {
              value: true,
              message: "Please enter your First Name",
            },
          },
        },
        submit: submit,
      });
  
    useEffect(() => {
      switch (props?.masterName) {
        case "Health Document":
          return (
            (masterData["credentialType"] = masterData?.credentialType
              ? masterData?.credentialType
              : ""),
            (masterData["category"] = "b"),
            setValues(masterData)
          );
          case "Credentialing Category":
          return (
            (masterData["credentialType"] = masterData?.credentialType
              ? masterData?.credentialType
              : ""),
            (masterData["category"] = "b"),
            setValues(masterData)
          );
        case "Credential Type":
          return (
            (masterData["credentialType"] = masterData?.credentialType
              ? masterData?.credentialType
              : ""),
            (masterData["category"] = masterData?.category
              ? masterData?.category
              : ""),
            setValues(masterData)
          );
        default:
          return (
            (masterData["credentialType"] = "a"),
            (masterData["category"] = "b"),
            setValues(masterData)
          );
      }
    
    }, [masterData]);
    useEffect(() => {
      if (props?.show?.globalId > 0) {
        getById3();
      }
    }, [props?.show?.globalId]);
  
    const ErrorColor = (key) => {
      return errors && errors?.[key]
        ? "form-control bg-white border border-danger"
        : "form-control border bg-white ";
    };
    const ErrorColor1 = (key) => {
      return errors && errors?.[key]
        ? " form-select bg-white border border-danger"
        : " form-select border bg-white ";
    };



    useEffect(()=>{
      if(data?.credentialType&&props?.masterName == "Credential Type"){
        DropdownMaster("Credentialing Category",setCategoryList,data?.credentialType)
      }
     },[data?.credentialType,props?.masterName])

  return (
    <Modal
    {...props}
    size="md"
    backdrop="static"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="no-border-radius-modal"
  >
    <div>
      <Modal.Header style={{ background: "#F7F7F7" }}>
        <Modal.Title id="contained-modal-title-vcenter">{props?.show&&props?.show?.globalId?`Edit${"-"}${props?.masterName}`:`Add${"-"}${props?.masterName}`}</Modal.Title>

        <div className="d-flex">
          <div className="pointer" onClick={props?.onHide}>
            <RxCross2 size={25} />
          </div>
        </div>
      </Modal.Header>
        <form onSubmit={handleSubmit}>
      <Modal.Body>
      
          <div className=" bg-white p-2">
            <div className="row">
              {(props?.masterName == "Health Document") && (
                <div>
                  <label className="col-md-12">Credential Type <span className='text-danger'>*</span></label>
                  <select
                    className={ErrorColor1("credentialType")}
                    name="credentialType"
                    value={data?.credentialType}
                    // value={data?.additionalData?.map((v)=>{return v?.credentialType})}
                    onChange={handleChange("credentialType")}
                  >
                    <option value={""}>Select....</option>
                    <option>Immunization</option>
                    <option>Test</option>
                  </select>
                </div>
              )}
              {(props?.masterName == "Credential Type"||props?.masterName=="Credentialing Category") && (
                <div>
                  <label className="col-md-12">Credential Type <span className='text-danger'>*</span></label>
                  <select
                    className={ErrorColor1("credentialType")}
                    name="credentialType"
                    value={data?.credentialType}
                    // value={data?.additionalData?.map((v)=>{return v?.credentialType})}
                    onChange={handleChange("credentialType")}
                  >
                    <option value={""}>Select....</option>
                    <option>Licensure</option>
                    <option>Certification</option>
                  </select>
                </div>
              )}
              {props?.masterName == "Credential Type" && (
                <div>
                  <label className="col-md-12">Category <span className='text-danger'>*</span></label>
                  <select
                    className={ErrorColor1("category")}
                    name="category"
                    value={data?.category}
                    // value={data?.additionalData?.map((v)=>{return v?.category})}
                    onChange={handleChange("category")}
                  >
                    <option value={""}>Select....</option>
                   {CategoryList&&CategoryList?.map((v)=>(
                    <option value={v?.name}>{v?.name}</option>
                  )) }
                    {/* <option>State Controlled Substance License</option>
                    <option>DEA License</option> */}
                  </select>
                </div>
              )}
              <div className="col-md-12">
                <label>Name <span className='text-danger'>*</span></label>
                <input
                  className={ErrorColor("name")}
                  placeholder="Name..."
                  value={data?.name}
                  name="name"
                  onChange={handleChange("name")}
                ></input>
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
            style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
          >
            Save
          </button>
          <button
            className="col-md-auto border cancel-user rounded    pointer "
            style={{ background: "#ffff" }}
            onClick={props?.onHide}
          >
            Cancel
          </button>
        </div>
      </Modal.Footer>
      </form>
    </div>
    
  </Modal>
  )
}

export default AddMasterModal
