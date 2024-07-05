



import React, { useEffect, useState } from 'react'
import { DropdownMaster, getList } from '../../../api_services/SharedServices'
import { urls } from '../../../api_services/url'
const NotiFilterList = ({openModel}) => {
   const [licence,setLicence] = useState([])
  const[speciality,setSpeciality]=useState([])
  const [allTags,setAlltags]=useState([])
  const[facility,setFacility]=useState([])



  const allFacilityLocation=async()=>{
   let jsonObjects={facilityId:0}
   let res=await getList(urls?.settings?.getAllFacilityLocation,{jsonObjects})
   setFacility(res)
 }


   useEffect(()=>{
      // DropdownMaster("",)
      DropdownMaster("State Medical License",setLicence)
      DropdownMaster("Speciality",setSpeciality)
      DropdownMaster("tags",setAlltags)
      DropdownMaster("State Medical License",setLicence)
      DropdownMaster("State Medical License",setLicence)
      allFacilityLocation()
   },[])


  return (
   <div className='row col-auto mx-2  bg-white'style={{position:"absolute", top:"280px",left:"100px",right:"10px",boxShadow: "2px 10px 30px #0000001A",border:"1px solid #BABABA"}}>
 <div className='row   px-4 filter-notification'style={{height:"217px",paddingTop:"45px",}}>
        <div className='col-xl-3 col-lg-4 col-md-6'>
        <select className='form-select'   >
                                    <option value="">Select licence state....</option>
                                    {licence && licence?.map((v) => <option value={v?.stateId}>{v?.state}</option>)}
                                    <option></option>
                                </select>

        </div>
        <div className='col-xl-3 col-lg-4 col-md-6'>
        <select className='form-select'  >
                                    <option value="">Select speciality...</option>
                                    {speciality && speciality?.map((v) => <option value={v?.specialityId}>{v?.specialityName}</option>)}
                                    <option></option>
                                </select>
        </div> <div className='col-xl-3 col-lg-4 col-md-6'>
           <select className='form-select  f15'><option>Needs Attention</option></select>
        </div> <div className='col-xl-3 col-lg-4 col-md-6'>
        <select className='form-select'   >
                                    <option value="">Select Facility...</option>
                                    {facility && facility?.map((v) => <option value={v?.facilityId}>{v?.facilityName}</option>)}
                                    <option></option>
                                </select>
        </div>  <div className='col-xl-3 col-lg-4 col-md-6'>
        <select className='form-select'   >
                                    <option value="">Select Tags...</option>
                                    {allTags && allTags?.map((v) => <option value={v?.providerTagName}>{v?.providerTagName}</option>)}
                                    <option></option>
                                </select>
        </div>
        <div className='d-flex justify-content-end gap-2'>
        <button className='button-user  rounded f16' style={{background:"white",width:"109px",height:"49px",color:" #6D6D6D" ,border:"1px solid #CCCCCC"}} onClick={openModel}>Cancel</button>
        <div className='button-user d-flex justify-content-center align-items-center rounded f16'  style={{width:"109px",height:"49px"}} onClick={openModel}>Apply</div>
   </div>
    </div>
   </div>
  )
}
export default NotiFilterList