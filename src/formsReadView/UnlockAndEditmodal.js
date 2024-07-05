import React from 'react';
import { Modal } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';


const UnlockAndEditmodal = (props)=>{
  // console.log(props,obj,setAppointmentList,AppointmentList,"model")
  
  
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
            <Modal.Title id="contained-modal-title-vcenter">Unlock & Edit</Modal.Title>
    
            <div className="d-flex">
              <div className="pointer" onClick={props?.onHide}>
                <RxCross2 size={25} />
              </div>
            </div>
          </Modal.Header>
            
          <Modal.Body>
          
              <div>Are you sure want to edit the fileds data?</div>
           
          </Modal.Body>
          <Modal.Footer>
            <div className="row gap-2 px-2">
              <button
                type="submit"
                className=" col-md-auto save-user  border rounded     pointer  "
                style={{ background: " #00B948 0% 0% no-repeat padding-box" }}
                onClick={props?.saveData}
              >
                Yes
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
        </div>
        
      </Modal>
      )
    }
    
    export default UnlockAndEditmodal