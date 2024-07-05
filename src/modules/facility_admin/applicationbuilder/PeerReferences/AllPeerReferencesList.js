import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import {
  TableActionBoutton,
  colAdjest,
  filterSearch,
  formDuplicate,
  formStatus,
  getList,
  save,
  statusFun,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import Table from "../../../../share_components/Table";
import FormDuplicateModal from "../credential_template/modals/FormDuplicateModal";
import { useDispatch } from "react-redux";
import { speciality } from "../../../../redux/Action";
import AddPeerreferenceModal from "./Modals/AddPeerreferenceModal";

const AllPeerReferencesList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [duplicateModal,setDuplicateModal]=useState(false)
  const [peerModal, setPeerModal] = useState(false);
  const [AllFacilityDocument, setFacilityDocument] = useState([]);
  const [update, setUpdate] = useState([]);
  const { headerlink } = UseFormValidations({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All Templates");
  const [peerDuplicateModal, setPeerDuplicateModal] = useState(false);

  const goForms = (row) => {
    dispatch(speciality([row]));
    sessionStorage.setItem("template", JSON.stringify(row));
    navigate(
      `/outpatientpro/facility/applicationBuilder/peer_references/all/${row?.packageId}`
    );
  };

  // const getAllForm = async () => {
  //   let jsonObjects = { packageId: 0 ,type:"Peer References"};
  //   let res = await getList(urls?.applicationBuilder?.getAllTemplate, {jsonObjects,});
  //   setFacilityDocument(res);

  // };

  const getAllForm = async () => {
    let jsonObjects = { formId: 0, packageId: 0, type: "Peer References" };
    let res = await getList(urls.applicationBuilder.getallForm, {
      jsonObjects,
    });
    setFacilityDocument(res);
  };

  const submit = async (body) => {
    let jsonObjects = body;
    console?.log(jsonObjects, "jsonObjects");
    let res = await save(urls?.applicationBuilder.saveFrom, { jsonObjects });
    if (res?.data?.status) {
      setUpdate(res);
      openModel("addPeerReferences", false);
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
        <div>
          <div
            className="link-hover1"
            title={`${row?.formName !== "" ? `Name: ${row?.formName}` : ""}`}
            onClick={() =>
              navigate(
                `/outpatientpro/facility/applicationBuilder/peer_references/all/forms/${row?.formId}/${row?.packageId}`
              )
            }
          >
            {row?.formName}
          </div>
        </div>
      ),
      sortable: true,
      key: "formName",
    },

  

    {
      name: "Assigned To",
      selector: (row) => colAdjest(row?.optional?.map((v) => v?.label)),
      sortable: true,
      key: "speciality",
      subKey: "label",
    },
    {
      name: "Status",
     
      selector: (row) => (
        <div onClick={() => formStatus(row, setUpdate)}>{statusFun(row)}</div>
      ),
    },

    {
      name: "Actions",
      selector: (row) => (
        <>
          {TableActionBoutton([
            
            { name: "Duplicate", modalName:setDuplicateModal, navigate, value:row,icon: (
                  <RiCheckboxMultipleBlankLine
                    className=""
                    color="#0073EE"
                    size={20}
                  />
                ), },
            {
              name: "Edit - Template",
              modalName: openModel,
              value: row,
              key: "addPeerReferences",
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },
            {
              name: "Go To Form",
              modalName: navigate,
              icon: <BiEdit className="" color="#0073EE" size={20} />,
              value: `/outpatientpro/facility/applicationBuilder/peer_references/all/forms/${row?.formId}/${row?.packageId}`,
            },
           
          ])}
        </>
      ),
    },
  ];

  useEffect(() => {
    getAllForm();
  }, [update]);

  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },

      {
        name: "All Peer References",
        link: "outpatientpro/facility/applicationBuilder/peerreferences",
      },
    ]);
    getAllForm();
  }, [update]);

  const openModel = (key, value) => {
    setPeerModal({ ...peerModal, [key]: value });
  };

  return (
    <div className="  bg-white p-4">
      <div className="row py-2">
        <div className="col-md-6 col-xl-8 col-lg-8 f27 medium Temp_name">
          Peer References
        </div>
        <div className="d-flex justify-content-end col">
          <div className="col-md-6 col-xl-4 col-lg-6 px-2">
            <button
              className="save border py-2  text-white rounded  col-md-12"
              style={{ background: "  #6b6b6b" }}
              onClick={() => openModel("addPeerReferences", "0")}
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
        filter={filter}
        pege={"10"}
      />

      {peerModal?.addPeerReferences && (
        <AddPeerreferenceModal
          show={peerModal?.addPeerReferences}
          update={setUpdate}
          saveForm={submit}
          onHide={() => openModel("addPeerReferences", false)}
        />
      )}


{duplicateModal&&<FormDuplicateModal
      
      
      show={duplicateModal}
      submit={formDuplicate}
      update={setUpdate}
      onHide={()=> setDuplicateModal(false)}
      />}



 
    </div>
  );
};

export default AllPeerReferencesList;
