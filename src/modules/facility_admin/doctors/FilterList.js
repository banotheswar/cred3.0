



import React, { useEffect, useState } from 'react'
import { DropdownMaster, getList } from '../../../api_services/SharedServices'
import { urls } from '../../../api_services/url'
import { UseFormValidations } from '../../../validations/UseFormValidation'
import { json } from 'react-router-dom'
const FilterList = ({openModel,setList,filterList,setObj,obj}) => {
  const [licenceType,setLicenceType] = useState([])
  const[speciality,setSpeciality]=useState([])
  const [allTags,setAlltags]=useState([])
  const[facility,setFacility]=useState([])

const {data,handleChange,setValues}=UseFormValidations({})

   const allFacilityLocation=async()=>{
   let jsonObjects={facilityId:0, organizationId:sessionStorage.getItem("organizationId")}
   let res=await getList(urls?.settings?.getAllFacilityLocation,{jsonObjects})
   setFacility(res)
 }


   useEffect(()=>{
      DropdownMaster("License Type",setLicenceType)
      DropdownMaster("Speciality",setSpeciality)
      DropdownMaster("tags",setAlltags)
      allFacilityLocation()
   },[])
   const  filterData=(array, criteria)=> {
      return array?.filter(item => {
          return Object.keys(criteria).every(key => {
              if (Array.isArray(item[key])) {
              
                  return item[key].includes(criteria[key]);
              } else {
               
                  return item[key] === criteria[key];
               
                  
              }
          });
      });
  }

  const submit=()=>{
  
    const filteredObj = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''));
    setObj(data)
    let filteredData = filterData(filterList,filteredObj)
    setList(filteredData)
    openModel()
   
   
  }
  useEffect(()=>{
    setValues(obj)
  },[obj])

const returnValue=(key)=>{
return data?.[key]&&data?.[key]?data?.[key]:""
}
const clearData=()=>{
  setList(filterList)
  setValues({})
  setObj({})
  openModel()
}
  return (
   <div className='row col-auto mx-2  bg-white'style={{position:"absolute", top:"280px",left:"108px",right:"16px",boxShadow: "2px 10px 30px #0000001A",border:"1px solid #BABABA"}}>
 <div className='row col-12   px-4 'style={{height:"217px",paddingTop:"45px",}}>
        <div className='col'>
        <select className='form-select'value={returnValue("licenceType")}  onChange={handleChange("licenceType")} >
                                    <option value="">Licence Type</option>
                                    
                                    {/* <option value="">Licence Type</option> */}
                                    {licenceType && licenceType?.map((v) => <option value={v?.name}>{v?.name}</option>)}
                                    
                                </select>

        </div>
        <div className='col'>
        <select className='form-select'value={returnValue("speciality")} onChange={handleChange("speciality")}  >
                                    <option value="">Speciality</option>
                                    {speciality && speciality?.map((v) => <option value={v?.specialityName}>{v?.specialityName}</option>)}
                                    
                                </select>
        </div> <div className='col'>
           <select className='form-select  f15'value={returnValue("status")} onChange={handleChange("status")}>
            
            <option value={""}>Needs Attention</option>
            <option>Apointment Expiring</option>
            <option>Appointment Exprired</option>
            <option>Credential Expiring</option>
            <option>Credential Expired</option>
            <option>Health Document Expiring</option>
            <option>Health Document Expired</option>
           
           
           </select>
        </div> <div className='col'>
        <select className='form-select'value={returnValue("facilityName")}  onChange={handleChange("facilityName")} >
                                    <option value="">Facility</option>
                                    {facility && facility?.map((v) => <option value={v?.facilityName}>{v?.facilityName}</option>)}
                                    
                                </select>
        </div> <div className='col'>
        <select className='form-select'value={returnValue("tags")}  onChange={handleChange("tags")}  >
                                    <option value="">Tags</option>
                                    {allTags && allTags?.map((v) => <option value={v?.providerTagName}>{v?.providerTagName}</option>)}
                                    
                                </select>
        </div>
        <div className='d-flex justify-content-end gap-2'>
        <button className='button-user  rounded f16 pointer' style={{background:"white",width:"109px",height:"49px",color:" #6D6D6D" ,border:"1px solid #CCCCCC"}} onClick={clearData}>Cancel</button>
        <div className='button-user d-flex justify-content-center align-items-center rounded f16 pointer'  style={{width:"109px",height:"49px"}} onClick={ submit}>Apply</div>
   </div>
    </div>
   </div>
  )
}
export default FilterList