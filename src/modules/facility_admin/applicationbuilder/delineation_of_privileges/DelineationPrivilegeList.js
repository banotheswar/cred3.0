import React, { useEffect, useState } from 'react'
import HealthDocList from '../health_document_template/HealthDocList'
import AddDelineation from './AddDelineation'
import Table from '../../../../share_components/Table'
import { IoMdPricetags } from 'react-icons/io'
import { TableActionBoutton, colAdjest, filterSearch, formDuplicate, formStatus, getList, save, statusFun } from '../../../../api_services/SharedServices'
import { useNavigate } from 'react-router-dom'
import { urls } from '../../../../api_services/url'
import FormDuplicateModal from '../credential_template/modals/FormDuplicateModal'
import { UseFormValidations } from '../../../../validations/UseFormValidation'
import { BiDuplicate, BiEdit } from 'react-icons/bi'
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'

const DelineationPrivilegeList = () => {
  const [model,setModel]=useState(false)
  const navigate = useNavigate()
  const {headerlink}=UseFormValidations({})
  const [active,setActive]=useState("All Templates")
 const [templateList, setTemplateList] = useState([]);
 const [search, setSearch] = useState("");
 const [update,setUpdate]=useState([])
 const [filterData,setFilterData]=useState([])
 const [delineationDuplicateModal,setDelineationDuplicateModal]=useState(false)
 

 const getAllForm = async () => {
  let jsonObjects = { formId: 0, packageId: 0 ,type:"DOP" };
  let res = await getList(urls.applicationBuilder.getallForm, {
    jsonObjects,
  });
  setTemplateList(res);
};


 const submit=async(body)=>{
 
    
  let jsonObjects=body
  console?.log(jsonObjects,"jsonObjects")
  let res= await save(urls?.applicationBuilder.saveFrom,{jsonObjects})
  if(res?.data?.status){
    setUpdate(res)
    setModel(false)
  }
  
}

useEffect(() => {
  headerlink([
    {name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder"},
    {name:"Delineation Of Privileges",link:"/outpatientpro/facility/applicationBuilder/delineationofprivileges/all/",active:true}
  ])
  // getAllHealthTemplates()
  getAllForm()
}, [update]);
// useEffect(()=>{
//   const res=filterData?.filter((v)=>v.provider==active)
//   switch(active){
//     case "Doctor":return setTemplateList(res)
//     case "Allied Health Professional":return setTemplateList(res)
//    default:return setTemplateList(filterData)
//   }
//   },[active])

const columns = [
  {
    name: "Form Name",
    selector: (row) => (
      <div className='d-flex gap-2 text-wrap'>
        <div>{row?.templateType=="Opp Admin"&&<IoMdPricetags  color="gray"/>}</div>
        <div
          className="link-hover1 text-wrap"
          title={`${
            row?.formName !== "" ? `Name: ${row?.formName}` : ""
          }`}
          
        >
          {row?.formName}
        </div>
      </div>
    ),
    sortable:true,
    key:"formName",
    width:"20rem"
  },


  

  {
    name: "Specialties",
    selector: (row) =>colAdjest(row?.optional?.map((v)=>v?.label)),
    sortable:true,
    key:"optional",
    width:"20rem",
    subKey:"label"
  },
  {
    name: "Status",
    selector: (row) => <div onClick={() => formStatus(row, setUpdate)}>{statusFun(row)}</div>,
  },

  {
    name: "Actions",
    hide: "sm",
    selector: (row) => (
 
      <>{TableActionBoutton([
        { name: "Edit", modalName: setModel, value:row,icon: <BiEdit className="" color="#0073EE" size={20} />},
        { name: "Go To Form", modalName: navigate, icon: <BiEdit className="" color="#0073EE" size={20} />, value:`/outpatientpro/facility/applicationBuilder/delineation_of_privileges/all/forms/${row?.formId}/${row?.packageId}` },
        // { name: "Duplicate", modalName:setDelineationDuplicateModal, navigate, value:row ,icon:<RiCheckboxMultipleBlankLine className="" color="#0073EE" size={20} /> }

      ])}</>
    ),
  },
];

return (
  <div className="  bg-white p-4">
    <div className="row py-2">
      <div className=" col-md-4 f27 medium ">Delineation Of Privileges</div>
      <div className='col-4'>{filterSearch(setSearch,search)}</div>
      <div className='d-flex justify-content-end  col-md-4 '>
 
      <button
          className="save border py-2  text-white rounded  col-md-4"
            style={{ background: "  #6b6b6b" }}
            onClick={()=>setModel(true)} 
          >
            + Add Page
          </button>
       
     
        </div>
    </div>
 
    <Table dataTable={templateList || []} columns={columns} search={search} filter={active} />
    {model&&<AddDelineation show={model} onHide={()=>setModel(false)} saveForm={submit}/>}



{delineationDuplicateModal&&<FormDuplicateModal
    
    title={"Add Page"}
    show={delineationDuplicateModal}
    submit={formDuplicate}
    update={setUpdate}
    onHide={()=> setDelineationDuplicateModal(false)}
    />}
  </div>
)
}

export default DelineationPrivilegeList