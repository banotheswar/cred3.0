import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { TableActionBoutton,filterSearch,getList,save,statusFun} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import Table from "../../../../share_components/Table";
import AddFacilityDocumentModal from "./modals/AddFacilityDocumentModal";
import FormDuplicateModal from "../credential_template/modals/FormDuplicateModal";
import { useDispatch } from "react-redux";
import { speciality } from "../../../../redux/Action";
import { IoMdPricetags } from "react-icons/io";

const AllFacilityDocumentsList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [facilityModal, setFacilityModal] = useState(false);
  const [AllFacilityDocument, setFacilityDocument] = useState([]);
  const [filterData,setFilterData]=useState([])
  const [update, setUpdate] = useState([]);
  const { headerlink } = UseFormValidations({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All Templates");


  const goForms = (row) => {
    dispatch(speciality([row]));
    sessionStorage.setItem("template", JSON.stringify(row));
    navigate( `/outpatientpro/facility/applicationBuilder/facilit_document/all/${row?.packageId}`);
  };


  const getAllFacilityDocuments = async () => {
    let jsonObjects = { packageId: 0 ,
        type:"Facility Document"
    };
    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    setFacilityDocument(res);
    setFilterData(res)

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
      width:"25rem"
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
              key: "addFacilityDocument",
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
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },{
      name: "All Facility documents",
      link: "outpatientpro/facility/applicationBuilder/facilitydocuments",
    },])
    getAllFacilityDocuments();
  }, [update]);
  

  const openModel = (key, value) => {
    setFacilityModal({ ...facilityModal, [key]: value });
  };

  useEffect(()=>{
  
    const res=filterData?.filter((v)=>v.status==filter)
    res?.length>0?setFacilityDocument(res):setFacilityDocument(filterData)
    
    },[filter])

  return (
    <div className="  bg-white p-4">
      <div className="row py-2">
        <div className="col-md-6 col-xl-8 col-lg-8 f27 medium Temp_name">
          Facility Documents
        </div>
        <div className="d-flex justify-content-end col">
          <div className="col-md-6 col-xl-4 col-lg-6 px-2">
            <button
              className="save border py-2  text-white rounded  col-md-12"
              style={{ background: "  #6b6b6b" }}
              onClick={() => openModel("addFacilityDocument", "0")}
            >
             + New Template
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 d-flex ">
        <div className="col-xl-9 col-lg-9 col-md-8 d-flex gap-2">
          {["All Templates", "Active", "Archived"]?.map((v) => (
            <div
              onClick={() => setFilter(v == "Archived" ? "InActive" : v)}
              className={
                filter == v
                  ? "text-center filter-tabactive  col-md-auto px-3 "
                  : "text-center filter-tab  col-md-auto px-3"
              }
            >
              {v}
            </div>
          ))}
        </div>

        <div className="col-xl-3 col-lg-3  col-md-2 ">
          {filterSearch(setSearch, search)}
        </div>
      </div>
      <Table
        dataTable={AllFacilityDocument}
        columns={columns}
        search={search}
        active={filter}
        pege={"10"}
      />

      {facilityModal?.addFacilityDocument && (
        <AddFacilityDocumentModal
          show={facilityModal?.addFacilityDocument}
          update={setUpdate}
          onHide={() => openModel("addFacilityDocument", false)}
        />
      )}


{facilityModal?.duplicate && (
        <FormDuplicateModal
          show={facilityModal?.duplicate}
          submit={duplicateTemplate}
          update={setUpdate}
          onHide={() => openModel("duplicate", false)}
          type={"template"}
        />
      )}
    </div>
  );
};

export default AllFacilityDocumentsList;
 