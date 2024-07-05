import React, { lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SideBar from '../share_components/SideBar'
import Auth from '../share_components/Auth'
import PrivateRouting from './PrivateRouting'
import DOPBDMD from '../share_components/DOPBDMD'
import PeerReferenceLinkfrom from '../forms/PeerReferenceLinkfrom'
import BSMDBD from '../share_components/BSMDBD'
const FacilityRouting=lazy(() =>import("./facility_admin/FacilityRouting"))
const EnterpriseRouting=lazy(() =>import("./entrprise/EnterpriseRouting"))
const ProviderRouting=lazy(() =>import("./provider/ProviderRouting"))
const DelegateRouting=lazy(() =>import("./delegate/DelegateRouting"))
const OppRouting=lazy(() =>import("./oppadmin/OppRouting"))
const SignUp=lazy(() =>import("../share_components/SignUp"))
const CreatePassword=lazy(() =>import("../share_components/CreatePassword"))
const RoutingConfic = () => {

  
  return (
    <Routes>
       <Route path='/'element={<Auth/>}></Route>
       <Route path='/forgotpassword/:key' element={<CreatePassword/>}></Route>
       <Route path='/createaccount/:key' element={<SignUp/>}></Route>
       <Route path="/outpatient_pro/dop_form/:usertype/:appId/:medicalId/:dopId/:Guid" element={<DOPBDMD/>}></Route>
        <Route path="/outpatient_pro/board_summary/signatures/:formType/:type/:appId/:userId/:guid" element={<BSMDBD addSign={true}/>}></Route>
        <Route path="/outpatient_pro/peer_reference/questionary_form/:formType/:type/:appId/:formId/:guid" element={<PeerReferenceLinkfrom/>}></Route>
        <Route path='/outpatientpro/*' element={<PrivateRouting><SideBar/></PrivateRouting>} >
        <Route path="admin/*" element={<PrivateRouting><OppRouting/></PrivateRouting>}></Route>
        <Route path="facility/*" element={<PrivateRouting><FacilityRouting/></PrivateRouting>}></Route>
        <Route path="enterprise/*" element={<PrivateRouting><EnterpriseRouting/></PrivateRouting>}></Route>
        <Route path="provider/*" element={<PrivateRouting><ProviderRouting/></PrivateRouting>}></Route>
        <Route path="delegate/*" element={<PrivateRouting><DelegateRouting/></PrivateRouting>}></Route>
       </Route>
        
    </Routes>
  )
}

export default RoutingConfic