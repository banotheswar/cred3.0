
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";

const FacilityInfoModal = (props) => {

  return (
    <Modal
    {...props}
    size="md"
    backdrop="static"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className=""
  >
   
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          <div className="modal-header-text">
        Info Details
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
            <div className="f20">Ghozland Surgery & Health Partners</div>
     
        
          
          </div>
          
        </div>
      </Modal.Body>
    

  </Modal>
  );
};

export default FacilityInfoModal;
