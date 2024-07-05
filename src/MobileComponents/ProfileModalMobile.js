import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";

const ProfileModalMobile = (props) => {

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
        Profile Details
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
            <div className="f20">Elizabeth McDaniel</div>
            <div className="row py-1">
            <div className="col-6 p-2" >
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>Email</label>
               <div className="f13 medium">emcdaniel@gmail.com</div>
              </div>
              <div  className="col-6 p-2">
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>Mobile</label>
               <div className="f13 medium">(870) 454-1212</div>
              </div>

              <div  className="col-6 p-2">
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>DOB</label>
               <div className="f13 medium">Jan 25, 1972</div>
              </div>

              <div  className="col-6 p-2" >
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>Specialty</label>
               <div className="f13 medium">Anesthesiology</div>
              </div>
              <div  className="col-6 p-2">
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>NPI </label>
               <div className="f13 medium ">122-444-5699</div>
              </div>
              <div  className="col-6 p-2">
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>DEA </label>
               <div className="f13 medium">422-225877</div>
              </div>
              <div className="col-6 p-2" >
               <label  className="f14"
                style={{
                  opacity: "0.6",
                  color: "#323232",
                  height: "16px",
                  width: "30px",
                }}>Tags</label>
               <div className="label-text">Anesthesia, General </div>
              <div className="link-hover-line f14">Edit Tags</div>
              </div>
            
            </div>
        
          
          </div>
          
        </div>
      </Modal.Body>
    

  </Modal>
  );
};

export default ProfileModalMobile;
