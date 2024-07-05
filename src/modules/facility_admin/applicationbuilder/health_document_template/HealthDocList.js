import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseFormValidations } from '../../../../validations/UseFormValidation'
import { TableActionBoutton, colAdjest, filterSearch, formDuplicate, formStatus, getList,  statusFun } from '../../../../api_services/SharedServices'
import { urls } from '../../../../api_services/url'
import FormDuplicateModal from '../credential_template/modals/FormDuplicateModal'
import Table from '../../../../share_components/Table'
import { IoMdPricetags } from 'react-icons/io'

const HealthDocList = ({heading,type,openModel}) => {
    const navigate = useNavigate()
    const {headerlink}=UseFormValidations({})
    const [active,setActive]=useState("All Templates")
   const [templateList, setTemplateList] = useState([]);
   const [search, setSearch] = useState("");
   const [update,setUpdate]=useState([])
   const [filterData,setFilterData]=useState([])
   const [healthDuplicateModal,setHealthDuplicateModal]=useState(false)
   const getAllHealthTemplates = async () => {
    let jsonObjects = {
      type: "Health Document",
      templateId: 0,
    };
    let res = await getList(urls?.applicationBuilder?.getAllCredTemplates, {
      jsonObjects,
    });
    setTemplateList(res);
    setFilterData(res)
  };
  useEffect(() => {
    headerlink([
      {name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder"},
      {name:"Health Documents List",link:"/outpatientpro/facility/applicationBuilder/healthdocument",active:true}
    ])
    getAllHealthTemplates()
  }, [update]);

  
  useEffect(()=>{
    const res=filterData?.filter((v)=>v.provider==active)
    console?.log(res,"res",filterData)
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
            className="link-hover1 text-wrap"
            title={`${
              row?.templateName !== "" ? `Name: ${row?.templateName}` : ""
            }`}
            onClick={() =>
              navigate(
                `/outpatientpro/facility/applicationBuilder/healthdocument/update/${row?.templateId}`
              )
            }
          >
            {row?.templateName}
          </div>
        </div>
      ),
      sortable:true,
      key:"templateName",
      width:"20rem"
    },

    {
      name: "Provider Type",
      selector: (row) => <div className='text-wrap'>{row?.provider}</div>,
      sortable:true,
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
      sortable:true,
      key:"addToList",
      width:"8rem"
    },

    {
      name: "Specialties",
      selector: (row) =>colAdjest(row?.additionalData&&row?.additionalData[0]?.doctor||row?.additionalData[0]?.ahp),
      sortable:true,
      key:"additionalData",
      width:"20rem",
      subKey:"label"
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
          { name: "Edit (template info)", modalName: navigate, value:`/outpatientpro/facility/applicationBuilder/healthdocument/update/${row?.templateId}` },
          { name: "Duplicate", modalName:setHealthDuplicateModal, navigate, value:row }

        ])}</>
      ),
    },
  ];
 
  return (
    <div className="  bg-white p-4">
      <div className="row py-2">
        <div className="col-xl-10 col-lg-9 col-md-8 f27 medium ">{heading?heading:"Health Documents"}</div>
        <div className='d-flex justify-content-end col-xl-2 col-lg-3 col-md-4 '>
   
           { !heading?<button
            className="save border py-2  text-white rounded  col-md-12"
              style={{ background: "  #6b6b6b" }}
              onClick={()=>navigate("/outpatientpro/facility/applicationBuilder/healthdocument/create")} 
            >
              + New Health Documents
            </button>:<button
            className="save border py-2  text-white rounded  col-md-12"
              style={{ background: "  #6b6b6b" }}
              onClick={openModel} 
            >
              + Add Form
            </button>}
         
       
          </div>
      </div>
    {  !heading&&<div className="py-2 mt-2  d-flex ">
        <div className="col-xl-9 col-lg-9 col-md-8 d-flex gap-2 mt-2 mb-1">
         
          {["All Templates","Doctor","Allied Health Professional",]?.map((v)=>
          <div
          onClick={()=>setActive(v)}
           className={active==v?" text-center filter-tabactive f14 col-md-auto px-3 ":"text-center filter-tab f14 col-md-auto px-3 "}>
          {v}
        </div>
          )}

        </div>

        <div className="col-xl-3 col-md-3 ">{filterSearch(setSearch,search)}</div>
      </div>}
      <Table dataTable={templateList || []} columns={columns} search={search} filter={active} />
      {healthDuplicateModal&&<FormDuplicateModal
      
      
      show={healthDuplicateModal}
      submit={formDuplicate}
      update={setUpdate}
      onHide={()=> setHealthDuplicateModal(false)}
      />}
    </div>
  )
}

export default HealthDocList
