import React from 'react'
import checkmark from "../assets/images/checkmark light green.svg";

const Sanctions = () => {
  return (
    <>
   <div className="row bg-white p-4 mt-2">
      <div className="py-1 px-2">
        <div
          className="doctor-table-headings px-1"
          style={{ height: "21px" }}
        >
          National Provider Databank (NPDB)
        </div>

        <div
          className="  row  col-md-12  mt-4 ms-1"
          style={{ height: "97px" }}
        >
          {[
            { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
            {
              name: "Status",
              value: " No Claims",
              img: (
                <img
                  src={checkmark}
                  alt="cred"
                  className="me-2"
                  style={{
                    objectFit: "fill",
                    height: "18px",
                    width: "18px",
                  }}
                />
              ),
            },
          ]?.map((v, index) => {
            const isLastRow =
              index ===
              [
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ].length -
                1;
            const col2Width = "143px";
            const col10Width = `calc(100% - ${col2Width})`;
            return (
              <>
                <div
                  className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                    isLastRow ? "" : "border-all"
                  } `}
                  style={{ background: "#F7F7F7", width: "143px" }}
                >
                  {v?.name}
                </div>
                <div
                  className={`col-md-10 border-right border-left  doctor-row-text1  px-3  p-2 ${
                    isLastRow ? "" : "border-all"
                  }`}
                  style={{ width: col10Width }}
                >
                  {v?.img && v?.img}
                  {v?.value}
                </div>
              </>
            );
          })}
        </div>
        <div className="col-auto py-3 px-1">
          <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
            Check Now
          </div>
        </div>
      </div>

      <div className="py-4  px-2 mt-2">
        <div className="doctor-table-headings px-1">
          Office of the Inspector General (OIG)
        </div>

        <div
          className="  row  col-md-12  mt-4 ms-1"
          style={{ height: "97px" }}
        >
          {[
            { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
            {
              name: "Status",
              value: " No Claims",
              img: (
                <img
                  src={checkmark}
                  alt="cred"
                  className="me-2"
                  style={{
                    objectFit: "fill",
                    height: "18px",
                    width: "18px",
                  }}
                />
              ),
            },
          ]?.map((v, index) => {
            const isLastRow =
              index ===
              [
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ].length -
                1;
            const col2Width = "143px";
            const col10Width = `calc(100% - ${col2Width})`;
            return (
              <>
                <div
                  className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                    isLastRow ? "" : "border-all"
                  } `}
                  style={{ background: "#F7F7F7", width: "143px" }}
                >
                  {v?.name}
                </div>
                <div
                  className={`col-md-10 border-right border-left  doctor-row-text1 px-3   p-2 ${
                    isLastRow ? "" : "border-all"
                  }`}
                  style={{ width: col10Width }}
                >
                  {v?.img && v?.img}
                  {v?.value}
                </div>
              </>
            );
          })}
        </div>
        <div className="col-auto py-3 px-1">
          <div className="button-checknow pointer d-flex justify-content-center align-items-center   rounded">
            Check Now
          </div>
        </div>
      </div>

      <div className="py-3  px-2 ">
        <div className="doctor-table-headings px-1">
          System for Award Management (SAM)
        </div>

        <div
          className="  row  col-md-12  mt-4 ms-1"
          style={{ height: "97px" }}
        >
          {[
            { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
            {
              name: "Status",
              value: " No Claims",
              img: (
                <img
                  src={checkmark}
                  alt="cred"
                  className="me-2"
                  style={{
                    objectFit: "fill",
                    height: "18px",
                    width: "18px",
                  }}
                />
              ),
            },
          ]?.map((v, index) => {
            const isLastRow =
              index ===
              [
                { name: "Last Checked", value: " Feb 12, 2024 5:01pm" },
                {
                  name: "Status",
                  value: " No Claims",
                  img: (
                    <img
                      src={checkmark}
                      alt="cred"
                      className="me-2"
                      style={{
                        objectFit: "fill",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  ),
                },
              ].length -
                1;
            const col2Width = "143px";
            const col10Width = `calc(100% - ${col2Width})`;
            return (
              <>
                <div
                  className={`col-md-2 doctor-row-text  text-start border-right px-4 p-2 ${
                    isLastRow ? "" : "border-all"
                  } `}
                  style={{ background: "#F7F7F7", width: "143px" }}
                >
                  {v?.name}
                </div>
                <div
                  className={`col-md-10 border-right border-left  doctor-row-text1 px-3   p-2 ${
                    isLastRow ? "" : "border-all"
                  }`}
                  style={{ width: col10Width }}
                >
                  {v?.img && v?.img}
                  {v?.value}
                </div>
              </>
            );
          })}
        </div>
        <div className="col-auto py-3 px-1">
          <div className="button-checknow  pointer d-flex justify-content-center align-items-center   rounded">
            Check Now
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Sanctions