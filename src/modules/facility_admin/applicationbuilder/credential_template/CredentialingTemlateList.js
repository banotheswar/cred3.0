import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { TableActionBoutton, colAdjest, filterSearch, formDuplicate, formStatus, getList, statusFun } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import FormDuplicateModal from "./modals/FormDuplicateModal";
import Table from "../../../../share_components/Table";
import { IoMdPricetags } from "react-icons/io";

const CredentialingTemlateList = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All Templates");
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState([]);
  const [duplicateModal,setDuplicateModal]=useState(false)
  const [filterData,setFilterData]=useState([])
  const [update,setUpdate]=useState([])
  const getAllCredTemplates = async () => {
    let jsonObjects = {
      type: "Credentialing",
      templateId: 0,
    };
    let res = await getList(urls?.applicationBuilder?.getAllCredTemplates, {
      jsonObjects,
    });
    setTemplateList(res);
    setFilterData(res)
  };

  const {headerlink } = UseFormValidations({});

  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },
      {
        name: "Credentialing Template List",
        link: "/outpatientpro/facility/applicationBuilder/credentialing",
        active: true,
      },
    ]);
    getAllCredTemplates();
  }, [update]);
  useEffect(()=>{
    const res=filterData?.filter((v)=>v.provider==active)
    switch(active){
      case "Doctor":return setTemplateList(res)
      case "Allied Health Professional":return setTemplateList(res)
     default:return setTemplateList(filterData)
    }
   
    },[active])
  const columns = [
    {
      name: "Template Name",
      selector: (row) => (
        <div className="d-flex gap-2 text-wrap">
          <div>{row?.templateType=="Opp Admin"&&<IoMdPricetags  color="gray"/>}</div>
          <div
            className="link-hover1"
            title={`${
              row?.templateName !== "" ? `Name: ${row?.templateName}` : ""
            }`}
            onClick={() =>
              navigate(
                `/outpatientpro/facility/applicationBuilder/credentialing/update/${row?.templateId}`
              )
            }
          >
            {row?.templateName}
          </div>
        </div>
      ),
      sortable: true,
      key:"templateName"
    },

    {
      name: "Provider Type",
      selector: (row) => <div>{row?.provider}</div>,
      sortable: true,
      key:"provider",
      width:"14rem"
    },
    {
      name: (
        <div>
          No. of <br /> Credentials
        </div>
      ),
      selector: (row) => <div title={row?.addToList?.length}>{row?.addToList?.filter((v)=>v?.credType||v?.healthDocument)?.length}</div>,
      sortable: true,
      key:"addToList",
      width:"9rem"
    },

    {
      name: "Specialties",
      selector: (row) => colAdjest(row?.additionalData&&row?.additionalData[0]?.doctor||row?.additionalData[0]?.ahp) ,
      
      width:"20rem",
      sortable: true,
      key:"additionalData",
    },
    {
      name: "Status",
      selector: (row) =><div onClick={()=>formStatus(row,setUpdate)}>
      {statusFun(row)}
    </div> ,
    },

    {
      name: "Actions",
      hide: "sm",
      selector: (row) => (
    
        <>{TableActionBoutton([
          { name: "Edit (template info)", modalName: navigate, value:`/outpatientpro/facility/applicationBuilder/credentialing/update/${row?.templateId}` },
          { name: "Duplicate", modalName:setDuplicateModal, navigate, value:row }

        ])}</>
      ),
    },
  ];

 
  return (
    <div className="  bg-white p-4">
      <div className="row py-2">
        <div className=" col-xl-6 col-lg-6   col-md-8  f27 medium">Credentialing Templates</div>
        <div className="d-flex justify-content-end col-xl-6 col-lg-6 col-md-4">
          <div className="">
            <button
              className=" save border py-2  text-white rounded  "
              style={{ background: "  #6b6b6b" }}
              onClick={() =>
                navigate(
                  "/outpatientpro/facility/applicationBuilder/credentialing/create"
                )
              }
            >
              + New Template
            </button>
          </div>
        </div>
      </div>

      <div className="py-2 mt-2  d-flex">
        <div className="col-xl-9 col-lg-9   col-md-8 d-flex gap-2">
          {["All Templates", "Doctor", "Allied Health Professional"]?.map(
            (v) => {
              return (
                <>
                  <div
                    onClick={() => setActive(v)}
                    className={
                      active == v
                        ? " text-center filter-tabactive  col-md-auto px-3 "
                        : "text-center filter-tab  col-md-auto px-3 "
                    }
                  >
                    {v}
                  </div>
                </>
              );
            }
          )}
        </div>
        <div className="col-xl-3 col-lg-3  col-md-3">{filterSearch(setSearch,search)}</div>
      </div>
      <Table dataTable={templateList || []} columns={columns} search={search} filter={active}/>

      
      {duplicateModal&&<FormDuplicateModal
      
      
      show={duplicateModal}
      submit={formDuplicate}
      update={setUpdate}
      onHide={()=> setDuplicateModal(false)}
      />}
    </div>
  );
};

export default CredentialingTemlateList;
