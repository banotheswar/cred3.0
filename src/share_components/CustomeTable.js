import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiThumbUp } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { BiPlusMedical } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { BsShieldFillPlus } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CustomeTable = ({columns,dataTable,keys}) => {
  
 const [arrow,setArrow] = useState(false)
  
 



console?.log(dataTable,"dataTable")
 


 
  return (
    <>
      

      <div className="bg-white px-4">
       
       
        <div
          style={{
            width: "100",
            overflow: "scroll",
            paddingTop: "25px",
            paddingLeft: "8px",
          }}
        >
         
          <Table>
      <Thead className="" >
        <Tr className="tableheadercolor" style={{height:"55px",border: "1px solid #EBEBED",opacity: "1"}}>
          {columns?.map((v)=>{
            return <Th className=" px-3"><div className="d-flex justify-content-between align-items-start" onClick={()=>setArrow(!arrow)}>
            <div>{v?.name}</div>
            <div>{arrow?<HiOutlineArrowSmDown className="icon" />:<HiOutlineArrowSmUp className="icon" />}</div>
          </div></Th>
          })}
        </Tr>
      </Thead>
      <Tbody className="tablebody">
        {dataTable?.map((v,index)=>{
          return(
            <Tr className={index % 2 === 0 ? 'tableborder-odd' : 'tableborder-even'} style={{height:"55px"}}>
                {keys?.map((e)=> <Td className="px-3 tableborder-right">{Array.isArray(v?.[e])?v?.[e]?.map((child)=>child?.facilityName):v?.[e]}</Td>)}
          {/* <Td className="px-3 tableborder-right">{v?.type}</Td> */}
          {/* <Td className="px-3 tableborder-right">{v?.details}</Td>
          <Td className="px-3 tableborder-right">{v?.provider}</Td>
          <Td className="px-3 tableborder-right">{v?.providerType}</Td>
          <Td className="px-3 tableborder-right">{v?.datetime}</Td>
          <Td className="px-3 tableborder-right">{v?.status}</Td> */}
        </Tr>
          )
        })}
       
      </Tbody>
    </Table>
         
        </div>
        <div className="py-4 row">
          <div
            className="col-md-8 buttont f14  px-4"
            style={{ paddingLeft: "10px" }}
          >
            Showing 1 to 15 of 98 entries
          </div>
          <div className=" col-md-4 ">
            <div className="col d-flex justify-content-end text-center gap-2 ">
              <div className=" buttonp d-flex  align-items-center justify-content-center ">
                {<IoIosArrowBack />}
              </div>
              <div className="buttonps d-flex  align-items-center justify-content-center">
                1
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                2
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                3
              </div>
              <div className="buttonp d-flex  align-items-center justify-content-center">
                {<IoIosArrowForward />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomeTable;
