import React from "react";
import { BiSolidPencil } from "react-icons/bi";
import { PiNoteFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import checkmark from "../../../assets/images/checkmark light green.svg";
import expireicon from "../../../assets/images/expiring 1.svg";
import reapp from "../../../assets/images/in progress light blue.svg";
import appdatastatus from "../../../assets/images/appt status.svg";


const Demo = ()=> {
    const navigate = useNavigate()


    const columns = [
        {
          name: "Type",
          selector: (row) => (
            <div>
              <div
                className=""
                title={`${row?.type !== "" ? `Type: ${row?.type}` : ""}`}
              >
                {row?.type === "Initial Appointment" && (
                  <img
                    src={checkmark}
                    alt="cred"
                    className="me-2 ms-1"
                    style={{
                      objectFit: "fill",
                      height: "18px",
                      width: "18px",
                    }}
                  />
                )}
                {row?.type === "Initial Appointment " && (
                  <img
                    src={expireicon}
                    alt="cred"
                    className="me-2 ms-1"
                    style={{
                      objectFit: "fill",
                      height: "18px",
                      width: "18px",
                    }}
                  />
                )}
                {row?.type === "Reappointment" && (
                  <img
                    src={reapp}
                    alt="cred"
                    className="me-2 ms-1"
                    style={{
                      objectFit: "fill",
                      height: "18px",
                      width: "18px",
                    }}
                  />
                )}{" "}
                {row?.type}
              </div>
            </div>
          ),
        },
  
        {
          name: "Appt Date",
          selector: (row) => (
            <div className="pointer" title={row?.apptDate}>
              {row?.apptDate}
            </div>
          ),
          width: "10rem",
        },
  
        {
          name: "Appt Expires",
          selector: (row) => (
            <div className="pointer" title={row?.apptExpires}>
              {row?.apptExpires}
            </div>
          ),
          width: "10rem",
  
        },
  
        {
          name: "Status",
          selector: (row) => (
            <div className="d-flex ">
              <div
                title={row?.status}
                className={
                  ((row?.status == "Application Sent" ||
                    row?.status == "In Progress") &&
                    " pointer inprogress-profile   text-center ") ||
                  (row?.status == "Expired" && "expired    text-center pointer") ||
                  (row?.status == "Complete" &&
                    "privileged-pr-file     text-center pointer") ||
                  (row?.status == "Archived" &&
                    "archived    text-center pointer") ||
                  (row?.status == "Expiring (33 days)" &&
                    "expiring    text-center pointer") ||
                  (row?.status == "Board Review" &&
                    "boardReview    text-center pointer")
                }
              >
                {row?.status}
              </div>
              {row?.status == "In Progress" && <div className=" statustextcolor ">Facility Review (34%)</div>}
            </div>
          ),
          width: "22rem",
        },
  
        {
          name: "Actions",
          selector: (row) => (
            <div
              className="  pointer  text-center "
              title={row?.action}
              onClick={
                row?.status == "Complete"
                  ? () => navigate("/outpatientpro/facility/formsview")
                  : () =>
                    navigate(
                      "/outpatientpro/facility/doctors/details/applicationinprogress"
                    )
              }
            >
              {row?.status == "Complete" ? (
                <PiNoteFill
                  className="me-2"
                  color="#3A3952"
                  opacity={0.7}
                  size={15}
                  height={15}
                  width={15}
                />
              ) : (
                <BiSolidPencil
                  className="me-2"
                  color="#3A3952"
                  opacity={0.7}
                  size={15}
                  height={15}
                  width={15}
                />
              )}{" "}
              {row?.action}
            </div>
          ),
        },
      ];
      const datakeys = [
        {
          type: "Initial Appointment",
          apptExpires: "Jan 27, 2024",
          apptDate: "Feb 12, 2024 ",
          status: "Complete",
          action: "View Details",
        },
        {
          type: "Initial Appointment ",
          apptExpires: "Jan 27, 2024",
          apptDate: "Feb 12, 2024 ",
          status: "Complete",
          action: "View Details",
        },
  
        {
          type: "Reappointment",
          apptExpires: "-    - ",
          apptDate: "-    - ",
          status: "In Progress",
          action: "Review application",
        },
      ];


     return(
        <div className="  row  col-md-12  ms-0 mt-4"
        style={{ height: "145px" }}>
          {[{ name: "Status", value: "Privileged", img: <img src={checkmark} alt="cred" className="me-2 " style={{ objectFit: "fill", height: "18px", width: "18px", }} />  },
          { name: "Appt Date", value: "Feb 27, 2022", img: <img src={appdatastatus} alt="cred" className="me-2" style={{ objectFit: "fill", height: "18px", width: "18px", }} /> },
           { name: "Appt Expires", value: " Feb 27, 2024 (17 days)", img: <img src={expireicon} alt="cred" className="me-2" style={{ objectFit: "fill", height: "18px", width: "18px", }} /> }]?.map((v, index) => {
            const isLastRow = index === 
            [{ name: "Status", value: "Privileged", img: <img src={checkmark} alt="cred" className="me-2 " style={{ objectFit: "fill", height: "18px", width: "18px", }} />  },
          { name: "Appt Date", value: "Feb 27, 2022", img: <img src={appdatastatus} alt="cred" className="me-2" style={{ objectFit: "fill", height: "18px", width: "18px", }} /> },
           { name: "Appt Expires", value: " Feb 27, 2024 (17 days)", img: <img src={expireicon} alt="cred" className="me-2" style={{ objectFit: "fill", height: "18px", width: "18px", }} /> }].length - 1;
            const col2Width = "143px";
            const col10Width = `calc(100% - ${col2Width})`;
            const isFirstRow = index === 0;
            return (<>
              <div
                className={`col-2 doctor-row-text  text-start border-right px-4 p-2 ${isFirstRow ? 'border-top' : 'border-all1 '} `}

                style={{ background: "#F7F7F7"}}
              >
                {v?.name}
              </div>
              <div
                className={`col-10 border-right border-left bg-white  doctor-row-text1  px-3  p-2 ${isFirstRow ? 'border-top' : 'border-all1 '}`}
                // style={{ width: col10Width }}
              >
                {v?.img && v?.img}
                {v?.value}
              </div>
            </>)
          })}

        </div>
     )

}

export default Demo