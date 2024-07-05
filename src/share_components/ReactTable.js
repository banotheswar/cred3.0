import React, { useEffect, useState } from "react";
import ReactCustomeTable from "react-data-table-component";
import { customStyles } from "../api_services/SharedServices";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const ReactTable = ({ dataTable, columns, pege, search, filter,tableCss,packageId ,pageCount}) => {
  const [filterValues, setFilterValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const curentperpage=pageCount?pageCount:10;
  const lastindex=currentPage*curentperpage
  const firstindex=lastindex-curentperpage
  const records=dataTable.slice(firstindex,lastindex)
  const nopages=Math.ceil(dataTable.length/curentperpage)
  const number=[...Array(nopages+1).keys()].slice(1)
  
  console?.log(firstindex>0?firstindex:0,lastindex,"check")
  const prev=()=>{
    if(currentPage!==firstindex){
      if(currentPage>1){
        setCurrentPage(currentPage-1)
      }
     
    }
  }
  const nextPage=()=>{
    if(currentPage!==nopages){
      setCurrentPage(currentPage+1)
    }
  }
  const pageChange=(index)=>{
   
    setCurrentPage(index)
  }
  

 useEffect(()=>{
  setFilterValues(records)
 },[dataTable,currentPage,pageCount])

const vaFun=()=>{
  switch(filter){
    case "All Templates":return ""
    case "Doctors":return "Doctor"
    case "Allied Health Professionals":return "Allied Health Professional"
    case "Active":return "Active"
    case "Archived":return "InActive"
    default:return ""
  }
}

  useEffect(()=>{
  
if(search&&search?.length>0||filter?.length>0){
  console?.log(dataTable,"dataTable")
  let event=search!=""?search:vaFun()
  
  const filtered = records?.filter(row =>
         Object?.values(row)?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         pege==undefined&&  Object?.values(row?.additionalData?row?.additionalData[0]?.doctor||row?.additionalData[0]?.ahp:[])?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         pege==undefined&&  Object?.values(row?.speciality?row?.speciality?.map((v)=>v?.label):[""])?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))
       );
  setFilterValues(filtered);

}
else{
 
  setFilterValues(records)
}


  },[search,filter,currentPage,pageCount])


  const handleDrop = (event) => {
    event.preventDefault();
  };
const {css}=customStyles(tableCss)
const customSortIcon = <HiOutlineArrowSmUp />;
const customSortUpIcon = <HiOutlineArrowSmUp />;
const customSortDownIcon = <HiOutlineArrowSmDown />;
const showPagi=packageId>0 ? false : true
  return (
    <div onDrag={handleDrop} onDragOver={(event) => event.preventDefault()} style={{overflow:"scroll"}} className="table-container">
      <ReactCustomeTable
        className="border"
        data={filterValues || []}
        columns={columns || []}
        customStyles={css}
       responsive
        style={{overflowX:"scroll",}}
        
        sortIcon={customSortIcon}
        sortUpIcon={customSortUpIcon}
        sortDownIcon={customSortDownIcon}
             />
     { showPagi&&<div className="py-4 d-flex flex-wrap" >
          <div className="col-md-8 buttont f14 px-1">
         
            Showing {currentPage} to {firstindex+1}-{lastindex} of {dataTable?.length} entries
          </div>
          
          <div className=" col-md-4 ">
            <div className="col d-flex justify-content-end text-center gap-2 ">
              <div className=" buttonp d-flex  align-items-center justify-content-center pointer " onClick={prev}>
                {<IoIosArrowBack />}
              </div>
              {number?.map((n,i)=>{
                return (
                  <div onClick={()=>pageChange(i+1)} className={currentPage==i+1?"buttonps d-flex  align-items-center justify-content-center pointer":"pointer buttonp d-flex  align-items-center justify-content-center"}>
                  {n}
                </div>
                )
              })}
              
              <div className="buttonp d-flex  align-items-center justify-content-center pointer" onClick={nextPage}>
                {<IoIosArrowForward />}
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
};
export default ReactTable;
