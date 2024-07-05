import React, { useEffect, useState } from "react";
import ReactTable from "../../../../share_components/ReactTable";
import { PiCopy } from "react-icons/pi";
import { LuDelete, LuSquareAsterisk } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { sortingTable } from "../../../../api_services/SharedServices";

const AllFormTemplatesList = () => {
    const [filterlist, setFilterList] = useState([]);
    const [search, setSearch] = useState("");
    const [formList, setFormList] = useState([]);
  const columns = [
    {
      name: "Form Name",
      selector: (row) => (
        <div>
          <div
            className="link-hover"
            title={`${row?.formName !== "" ? `Name: ${row?.formName}` : ""}`}
            // onClick={()=>navigate("/outpatientpro/facility/doctors/details")}
          >
            {row?.formName}
          </div>
        </div>
      ),
      sortFunction:(a,b)=>sortingTable(a,b,"formName"),

    },

    {
      name: "Form Type",
      selector: (row) => <div>{row?.formType}</div>,
      sortFunction:(a,b)=>sortingTable(a,b,"formType"),
    },
    {
      name: "Application Template",
      selector: (row) => <div title={row?.apptemp}>{row?.apptemp}</div>,
      sortFunction:(a,b)=>sortingTable(a,b,"apptemp"),
    },

  

    {
      name: "Actions",
      hide: "sm",
      selector: (row) => (
        <>
          <div className="d-flex">
            <div title="Edit" style={{ cursor: "pointer" }}>
              <PiCopy size={25} className="mb-1 me-1" BiBox color=" #a3a3a3" />
            </div>
            <div title="Edit" style={{ cursor: "pointer" }}>
              <LuSquareAsterisk
                size={25}
                color=" #a3a3a3"
                className="mb-1 me-1 "
              />
            </div>
            <div title="Edit" style={{ cursor: "pointer" }}>
              <CiSquarePlus size={25} className="mb-1 me-1" color=" #a3a3a3" />
            </div>

            <div title="Edit" style={{ cursor: "pointer" }}>
              <RiDeleteBinLine
                size={25}
                color=" #a3a3a3"
                className="mb-1 me-1"
              />
            </div>
          </div>
        </>
      ),
    },
  ];
  const datakeys = [
    {
      formName: "Identifying Information",
      formType: "Application",
      apptemp: "Surgeon, Anesthesiologist, Allied Health",
    },
    {
      formName: "Practice Information",
      formType: "Application",
      apptemp: "Surgeon, Anesthesiologist, Allied Health",
    },

    {
      formName: "Practice Description",
      formType: "Application",
      apptemp: "Surgeon, Anesthesiologist, Allied Health",
    },
    {
      formName: "Billing Information",
      formType: "Application",
      apptemp: "Anesthesiologist",
    },
    {
      formName: "Education, Training & Experience",
      formType: "Application",
      apptemp: "Surgeon, Anesthesiologist, Allied Health",
    },
  ];


  useEffect(() => {
    if (search?.trim() === "") {
      setFilterList(formList);
    } else {
      const result = formList.filter((v) => {
        return (
          v?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.startdate
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          v?.npi?.toLowerCase()?.includes(search?.toLowerCase()) ||
          v?.tms?.toLowerCase()?.includes(search?.toLowerCase())
        );
      });
      setFilterList(result);
    }
  }, [search]);

  const filterSearch = () => {
    return (
      <>
        <div>
          <input
            type="search"
            placeholder="Search by form name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="header-search search-control"
            style={{
              backgroundImage:
                "url('https://tse2.mm.bing.net/th?id=OIP.4a0TA-wGQra-URSbFAHBzQHaHN&pid=Api&P=0')",
              backgroundPosition: "5px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "35px",
              backgroundSize: "15px",
            }}
          />
        </div>
      </>
    );
  };
  return (
    <div className="vh-100 container bg-white ">
      <div
        className="p-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="fw-small ">Form Templates</h3>
        <button
          className="border rounded  pointer text-white text-center p-2"
          style={{ background: "#434141" }}
          // onClick={() => setFacilityUserEdit(true)}
        >
          + New Form
        </button>
      </div>
      <div className=" gap-3  p-4 d-flex align-items-center">
        <label className="col-md-0 fw-medium">VIEW</label>

    
        <div className="col-md-4 select-container ">
          <select className="form-select input-border" name="templates">
            <option value="">Form Type</option>
            <option>Application</option>
            <option>Facility Document</option>
            <option>Health Document</option>
          </select>
        </div>
        <div className="col-md-4 select-container ">
          <select className="form-select input-border" name="templates">
            <option value="">Application Templates</option>
            <option>Surgeon</option>
            <option>Anesthesiologist</option>
            <option>Allied Health</option>
          </select>
        </div>
        <div className="col-md-4 select-container ">
          <select className="form-select input-border" name="templates">
            <option value="">Select Forms</option>
            <option>Active Forms</option>
            <option>Archived Forms</option>
            <option>All Forms</option>
          </select>
        </div>
        <div className="d-flex col-md-5 align-items-end justify-content-end">
    {filterSearch()}
</div>

      </div>

      <ReactTable
        dataTable={datakeys}
        columns={columns}
        //   search={filterSearch}
      />
    </div>
  );
};

export default AllFormTemplatesList;
