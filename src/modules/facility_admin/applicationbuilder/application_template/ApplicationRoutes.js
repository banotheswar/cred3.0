import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AllApplicationList from './AllApplicationList'
import ApplicationTempList from './ApplicationTempList'
import AllTemplatesList from './AllTemplatesList'
import TemplateGrid from './TemplateGrid'
import FormBuilder from './FormBuilder'
const applicationRoute = () => {
    console?.log("applicationRoute")
  return (
    <Routes>
        <Route path='/'element={<AllApplicationList/>}></Route>

         <Route path='application_template'element={<ApplicationTempList/>}></Route> 
         <Route path='application_template/all'element={<AllTemplatesList/>}></Route> 
         <Route path='application_template/all/:packageId'element={<TemplateGrid heading={"Application Template"}/>}></Route> 
         <Route path='facilit_document/all/:packageId'element={<TemplateGrid heading={"Facility Document"}/>}></Route>
         <Route path='facilit_document/all/forms/:formId/:templateId'element={<FormBuilder heading={"Facility Document"}/>}></Route> 
         <Route path='peer_references/all/:packageId'element={<TemplateGrid heading={"Peer References"}/>}></Route>
         {/* <Route path='delineation_of_privileges/all/forms'element={<TemplateGrid heading={"Delineation Of Privileges"} addfields={true}/>}></Route> */}
         <Route path='peer_references/all/forms/:formId/:templateId'element={<FormBuilder heading={"Peer References"}/>}></Route> 
         <Route path='application_template/all/forms/:formId/:templateId'element={<FormBuilder heading={"Application Template"}/>}></Route> 
         <Route path='application_template/all/forms/create'element={<FormBuilder />}></Route> 
         <Route path='delineation_of_privileges/all/forms/:formId/:templateId'element={<FormBuilder heading={"Delineation Of Privileges"}/>}></Route> 
    </Routes>
  )
}

export default applicationRoute