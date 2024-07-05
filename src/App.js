import React, { Suspense, lazy } from 'react';
import './App.css';
import "./allcss.css"
import "./MediaQuery.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRouting from './modules/PrivateRouting';
import MobileHeader from './share_components/MobileHeader';
const RoutingConfig=lazy(()=>import("./modules/RoutingConfic"))
const App=()=> {
 
  return (
<>
<ToastContainer/>
{/* <MobileHeader/> */}

  <BrowserRouter >
  
  <Suspense fallback={()=><>Loading...</>}>
  <RoutingConfig/>
  </Suspense>

  </BrowserRouter>
</>
  )
}

export default App;
