import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { urls } from "../../../api_services/url";
import { getById, save } from "../../../api_services/SharedServices";

const RoleModal = (props) => {
  const [rolesList, setRolesList] = useState();

  const submit = async () => {
    let jsonObjects = {
      roleId: props?.show?.roleId > 0 ? props?.show?.roleId : 0,
      roleName: data?.roleName,
    };
    let res = await save(urls?.rolemaster?.save, { jsonObjects });

    if (res?.data?.status) {
      props?.update(res);
      props?.onHide(false);
    }
  };

  const getByIdRoles = async () => {
    let jsonObjects = {
      roleId: props?.show?.roleId && props?.show?.roleId,
    };
    let res = await getById(urls?.rolemaster?.getList, { jsonObjects });
    setRolesList(res);

  };

  const {
    data,
    errors,
    handleSubmit,
    handleChange,
    handleCapitalChange,
    setValues,
  } = UseFormValidations({
    initialValues: {
      roleName: "",
    },
    validationSchema: {
      roleName: {
        required: {
          value: true,
          message: "Please enter your First Name",
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

  const returnEstId = () => {
    return props?.show?.roleId &&
      props?.show?.roleId != undefined &&
      props?.show?.roleId != "" &&
      props?.show?.roleId != "0"
      ? true
      : false;
  };

  useEffect(() => {
    getByIdRoles();
  }, [props?.show?.roleId]);


  useEffect(() => {
    setValues(rolesList);
  }, [rolesList]);

  

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
          <Modal.Title id="contained-modal-title-vcenter">
          {returnEstId() ? "Edit Role" : " Add Role"}
          </Modal.Title>

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
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <label>
                    Role Name <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Role Name…"
                    type="text"
                    className={props?.show?.roleId&&props?.show?.roleId>=10?emailErrorColor("roleName"):"form-control"}
                    name="roleName"
                    value={data?.roleName}
                    disabled={props?.show?.roleId<=10}
                    onChange={handleCapitalChange("roleName")}
                  ></input>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-2 px-2">
              <button
                type="submit"
                className=" col-md-auto save-user  border pointer rounded "
                style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
              >
                Save
              </button>
              <button
                className="col-md-auto border cancel-user pointer rounded"
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
  );
};

export default RoleModal;
