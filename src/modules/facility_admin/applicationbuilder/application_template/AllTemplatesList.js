import React, { useEffect, useRef, useState } from "react";
import ReactTable from "../../../../share_components/ReactTable";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { FaStarOfLife } from "react-icons/fa6";
import {
  TableActionBoutton,
  filterSearch,
  getList,
  save,
  sortingTable,
  sortingTableNumbers,
  statusFun,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import AddTemplateModal from "./modals/AddTemplateModal";
import { useDispatch } from "react-redux";
import { speciality } from "../../../../redux/Action";
import FormDuplicateModal from "../credential_template/modals/FormDuplicateModal";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import Table from "../../../../share_components/Table";
import { IoMdPricetags } from "react-icons/io";
const AllTemplatesList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [templateModal, setTemplateModal] = useState(false);
  const [allTemplate, setTemplate] = useState([]);
  const [update, setUpdate] = useState([]);
  const navigate = useNavigate();
  const { headerlink } = UseFormValidations({});
  const [filterData,setFilterData]=useState([])
  const [filter, setFilter] = useState([])
  const [active,setActive]=useState("All Templates")
  
  const goForms = (row) => {
    dispatch(speciality([row]));
    sessionStorage.setItem("template", JSON.stringify(row));
    navigate(
      `/outpatientpro/facility/applicationBuilder/application_template/all/${row?.packageId}`
    );
  };

  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },
      {
        name: "Application Template List",
        link: "/outpatientpro/facility/applicationBuilder/application_template",
      },
      {
        name: "All Application Template List",
        link: "/outpatientpro/facility/applicationBuilder/application_template/all",
        active: true,
      },
    ]);
  }, []);

  const getAllTemplates = async () => {
    let jsonObjects = { packageId: 0, type: "Application", roleId:sessionStorage?.getItem("roleId"),
    organizationId:sessionStorage.getItem("organizationId"), };
    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    setTemplate(res);
    setFilterData(res)
  };


  const changeStatus = async (row) => {
    let jsonObjects = {
      packageId: row?.packageId,
      status: row?.status == "Active" ? "InActive" : "Active",
    };
    let res = await save(urls?.applicationBuilder?.applicationTemplateStatus, {
      jsonObjects,
    });
    if (res?.data?.status) {
      setUpdate(res);
    }
  };
  const duplicateTemplate = async (row) => {
    let jsonObjects = {
      packageId: row?.packageId,
      packageName: row?.packageName,
    };
    let res = await save(
      urls?.applicationBuilder?.duplicateApplicationTemplate,
      { jsonObjects }
    );
    if (res?.data?.status) {
      setUpdate(res);
    }
  };

  useEffect(()=>{
  
    const res=filterData?.filter((v)=>v.status==active)
    res?.length>0?setTemplate(res):setTemplate(filterData)
    
    },[active])

console.log(allTemplate,"allTemplate")


  const columns = [
    {
      name: "Template Name",
      selector: (row) => (
        <div className="d-flex gap-2 text-wrap">
          <div>{row?.templateType=="Opp Admin"&&<IoMdPricetags  color="gray"/>}</div>
          <div
            className="link-hover1"
            title={`${row?.tempName !== "" ? `Name: ${row?.packageName}` : ""}`}
            onClick={() => goForms(row)}
          >
            {row?.packageName}
          </div>
        </div>
      ),
      sortable: true,
      key: "packageName",
    },

    {
      name: "No. of Pages",
      selector: (row) => <div title={row?.formCount}>{row?.formCount}</div>,
      sortable: true,
      key: "formCount",
    },

    {
      name: "Assigned To",
      selector: (row) => {
        const labels = row?.speciality?.map((v) => v.label);
        if (labels) {
          if (labels?.length <= 2) {
            return (
              <div title={labels} className="pointer">
                {labels?.join(", ")}
              </div>
            );
          } else {
            return (
              <div title={labels} className="pointer">
                {labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}
              </div>
            );
          }
        } else {
          return "";
        }
      },
      sortable: true,
      key: "speciality",
      subKey:"label"
    },
    {
      name: "Status",
      selector: (row) => (
        <div onClick={() => changeStatus(row)}>{statusFun(row)}</div>
      ),
    },

    {
      name: "Actions",
      selector: (row) => (
        <>
          {TableActionBoutton([
            {
              name: "Duplicate",
              modalName: openModel,
              value: row,
              key: "duplicate",
              icon: (
                <RiCheckboxMultipleBlankLine
                  className=""
                  color="#0073EE"
                  size={20}
                />
              ),
            },
            {
              name: "Edit - Template",
              modalName: openModel,
              value: row?.packageId,
              key: "addTemplate",
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },

            {
              name: "Edit - Forms",
              modalName: goForms,
              value: row,
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },
          ])}
        </>
      ),
    },
  ];

  useEffect(() => {
    getAllTemplates();
  }, [update]);

  const openModel = (key, value) => {
    setTemplateModal({ ...templateModal, [key]: value });
  };



  return (
    <div className="  bg-white p-4">
      <div className="row py-2">
        <div className="col-md-6 col-xl-8 col-lg-8 f27 medium Temp_name">
          Application Templates
        </div>
        <div className="d-flex justify-content-end col">
          <div className="col-md-6 col-xl-4 col-lg-6 px-2">
            <button
              className="save border py-2  text-white rounded  col-md-12"
              style={{ background: "  #6b6b6b" }}
              onClick={() => openModel("addTemplate", "0")}
            >
              + New Template
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 d-flex ">
        <div className="col-xl-9 col-lg-9 col-md-8 d-flex gap-2">
          {["All Templates", "Active", "InActive"]?.map((v) => (
            <div
              
              onClick={()=>setActive(v)}
              className={
                filter == v
                  ? "text-center filter-tabactive  col-md-auto px-3 "
                  : "text-center filter-tab  col-md-auto px-3"
              }
            >
              {v=="InActive"?"Archived":v}
            </div>
          ))}
        </div>

        <div className="col-xl-3 col-lg-3  col-md-2 ">
          {filterSearch(setSearch, search)}
        </div>
      </div>
      <Table
        dataTable={allTemplate}
        columns={columns}
        search={search}
        filter={filter}
        pege={"multipledataSearch"}
        active={active}
      />
      {templateModal?.addTemplate && (
        <AddTemplateModal
          show={templateModal?.addTemplate}
          update={setUpdate}
          onHide={() => openModel("addTemplate", false)}
        />
      )}
      {templateModal?.duplicate && (
        <FormDuplicateModal
          show={templateModal?.duplicate}
          submit={duplicateTemplate}
          update={setUpdate}
          onHide={() => openModel("duplicate", false)}
          type={"template"}
        />
      )}
    </div>
  );
};

export default AllTemplatesList;
