import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const FiltersModal = (props) => {



  return (
    <Modal
    {...props}
    size="md"
    backdrop="static"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="no-border-radius-modal"
  >
    {" "}
    <form >
      <Modal.Header style={{ background: "#F7F7F7" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          <div className="modal-header-text  f20mobile">
          Filters
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
            <div className="row py-1">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <select className="form-select">
                  <option value={""}>Licence Type</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <select className="form-select">
                  <option value={""}>Speciality</option>
                </select>
              </div>
            </div>
            <div className="row py-1">
               <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <select className="form-select">
                  <option value={""}>Needs Attention</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <select className="form-select">
                  <option value={""}>Facility</option>
                </select>
              </div>


           
            </div>
            <div className="row py-1">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <select className="form-select">
                  <option value={""}>Tags</option>
                </select>
              </div>
          
            </div>
          </div>
          <div></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-2 px-2">
          <button
            type="submit"
            className=" col-md-auto save-user  border pointer  "
          >
            Save
          </button>
          <button
            className="col-md-auto border cancel-user pointer "
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

export default FiltersModal;
