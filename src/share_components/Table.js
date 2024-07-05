import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ReactCustomeTable from "react-data-table-component";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { customStyleSmalltable } from "../api_services/SharedServices";
import ReactPaginate from 'react-paginate';
import { useParams } from "react-router-dom";
const Table = ({ dataTable, columns, search, pageCount,pageOne,paginate,active}) => {
  const {packageId}=useParams()
  const [filterValues, setFilterValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data1,setData1]=useState([])
  const [sortarray,setArray]=useState([])

  let check=packageId!=="forms"&&packageId!=undefined?dataTable?.length:10
  console.log(check,packageId!=="forms"&&packageId!=undefined,"check")
  const curentperpage=pageCount?pageCount:check;
  const lastindex=currentPage*curentperpage
  const firstindex=lastindex-curentperpage
  const nopages=Math.ceil(data1.length/curentperpage)
  


  const sortarrayData=(key,direction,subKey)=>{
    let sortedData = [...data1]?.sort((a, b) => {
      let nameA = Array.isArray(a?.[key]) ? a?.[key][0]?.[subKey]?a?.[key][0]?.[subKey]:a?.[key][0] : a?.[key];
      let nameB = Array.isArray(b?.[key]) ? b?.[key][0]?.[subKey]?b?.[key][0]?.[subKey]:b?.[key][0] : b?.[key];

      if (direction === 'desc') {
          
          if (nameA < nameB) {
              return 1;
          }
          if (nameA > nameB) {
              return -1;
          }
          return 0;
      } else {
         
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
      }
  });
  let arr=sortedData?.slice(firstindex,lastindex)
    setFilterValues(arr)
    setArray(sortedData)
     setCurrentPage(1)
  console?.log(sortedData, "st");
  }
  
  const sortData=(key,direction,subKey)=>{
    sortarrayData(key,direction,subKey)
  }

  const pageChange2=(event)=>{
   setCurrentPage(event.selected+1)
  }



useEffect(()=>{
 
  let arr=data1.slice(firstindex,lastindex)
  console?.log(arr,"arr",firstindex,lastindex)
  setFilterValues(arr)
},[data1])
useEffect(()=>{
if(sortarray?.length>0){
  let arr=sortarray.slice(firstindex,lastindex)
  setFilterValues(arr)
}
 
 
},[currentPage,pageCount])
useEffect(()=>{
 setData1(dataTable)
 setArray(dataTable)
 console?.log(dataTable,"dataTable")
},[dataTable])

  useEffect(()=>{
if(search!=""&&search){
 
  let event=search
  const filtered = dataTable?.filter(row =>
   
         Object?.values(row)?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         moment(row?.updatedDate).format("MM/DD/YYYY")?.toLowerCase().includes(event?.toLowerCase())||
         row?.userName?.toLowerCase().includes(event?.toLowerCase())||
         (row?.firstName+" "+row?.lastName)?.toLowerCase().includes(event?.toLowerCase())||
        
         row?.additionalData&&row?.additionalData[0]?.doctor&&   Object?.values(row?.additionalData?row?.additionalData[0]?.doctor||row?.additionalData[0]?.ahp:[])?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         row?.speciality&&Object?.values( row?.speciality?.map((v)=>v.label))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         row?.tags&&Object?.values( row?.tags?.map((v)=>v?.label))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
       Array.isArray(row?.facilityId)  &&Object?.values( row?.facilityId?.map((v)=>v?.label))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         row?.additionalData&& Object?.values( row?.additionalData?.map((v)=>v?.credentialType))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         row?.additionalData&& Object?.values( row?.additionalData?.map((v)=>v?.category))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))
         );
       setData1(filtered);
       setCurrentPage(1)
}
else{
  setData1(dataTable)
}
  },[search,pageCount])
  useEffect(()=>{
    pageCount&&pageOne&& pageOne(setCurrentPage)
  },[pageCount])
useEffect(()=>{
  setCurrentPage(1)
},[active])
 
  const customSortIcon = <HiOutlineArrowSmUp />;
const customSortUpIcon = <HiOutlineArrowSmUp />;
const customSortDownIcon = <HiOutlineArrowSmDown />;

  return (
    <div  className="table-container" >
      
      <ReactCustomeTable
        className="border"
        data={filterValues || []}
        columns={columns || []}
        customStyles={customStyleSmalltable}
        style={{overflow:"scroll"}}
        sortIcon={customSortIcon}
        sortUpIcon={customSortUpIcon}
        sortDownIcon={customSortDownIcon}
        onSort={(column, direction) =>sortData(column.key,direction,column.subKey)}
      />
      {paginate==true||paginate==undefined?<div className=" d-flex flex-wrap justify-content-between my-3" >
          <div className="col-md-8 buttont f14  px-1 ">
         
            Showing {data1?.length==0?0:currentPage} to {data1?.length==0?0:firstindex+1}-{filterValues.length>=10?lastindex:data1?.length} of {data1?.length} entries
          </div>
          
          
          <div className=" col-md-4 d-flex justify-content-end ">
           
            <ReactPaginate
         pageClassName="page-item"
         pageLinkClassName="page-link"
         previousClassName="page-item"
         previousLinkClassName="page-link"
         nextClassName="page-item"
         nextLinkClassName="page-link"
         breakLabel="..."
         breakClassName="page-item"
         breakLinkClassName="page-link"
         containerClassName="pagination"
         activeClassName="active"
        nextLabel={<IoIosArrowForward />}
        onPageChange={pageChange2}
        pageRangeDisplayed={2}
       className="pagination "
        pageCount={nopages}
        forcePage={currentPage-1}
        previousLabel={<IoIosArrowBack />}
        renderOnZeroPageCount={null}
      />
          </div>
        </div>:""}
        
    </div>
  );
};
export default Table;