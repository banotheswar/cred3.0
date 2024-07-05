
import { Route, Routes } from 'react-router-dom'
import ApplicationRoute from './application_template/ApplicationRoutes'
import AllFormTemplatesList from './application_template/AllFormTemplatesList'
import CredentialPrefrences from './CredentialPrefrences'
import Specialties from './Specialties'

import CredentialRoute from './credential_template/CredentialRoute'
import HealthDocumentRoute from './health_document_template/HealthDocumentRoute'
import FacilityDocuments from './facility_document/FacilityDocumentRoute'
import PeerReferences from './PeerReferences/PeerReferencesRoute'
import DelineationRoute from './delineation_of_privileges/DelineationRoute'



const ApplicationBuilderRoute = () => {

  
  return (
    <Routes>
      <Route path='/*'element={<ApplicationRoute/>}></Route>
   
    <Route path='allformlist'element={<AllFormTemplatesList/>}></Route>
    <Route path='credpreference'element={<CredentialPrefrences/>}></Route>
    <Route path='specialties'element={<Specialties/>}></Route>
    <Route path='facilitydocuments'element={<FacilityDocuments/>}></Route>
    <Route path="healthdocument/*"element={<HealthDocumentRoute/>}></Route>
    <Route path="credentialing/*" element={<CredentialRoute/>}></Route>
    <Route path='peerreferences'element={<PeerReferences/>}></Route>
    <Route path='delineationofprivileges/*'element={<DelineationRoute/>}></Route>
   
  
   </Routes>
  )
}

export default ApplicationBuilderRoute