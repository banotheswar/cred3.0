import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import logo from "../assets/images/logo.png"
import DOPBDMD from './DOPBDMD'
const Auth = () => {
    const [state,setState]=useState(true)
  return (
    // <Container fluid className='body_bg ' >
    //      <Container >
    // <Row lg={12} className='bg-white rounded p-3 '>
    //     <Col lg={9} ><Image src={logo} className='img-fluid'/></Col>
       
    //     </Row>
    //     <Row className='mt-3'>
    //        < Card className='px-5 py-5'>
         state?<SignIn signup={()=>setState(false)}/>:<SignUp signin={()=>setState(true)}/>
          //  state?<DOPBDMD signup={()=>setState(false)}/>:<SignUp signin={()=>setState(true)}/>
    //        </Card>
        
    //     </Row>
    //     </Container>
 
    // </Container>
   
  )
}

export default Auth