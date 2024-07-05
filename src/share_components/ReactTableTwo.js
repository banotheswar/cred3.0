import React, { useEffect, useState } from "react";
import ReactCustomeTable from "react-data-table-component";
import { customStyles } from "../api_services/SharedServices";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";
const ReactTableTwo = ({ dataTable, columns, pege, search, filter,tableCss,packageId }) => {
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    setFilterValues(dataTable);
  }, [dataTable]);

 useEffect(()=>{
  setFilterValues(dataTable)
 },[dataTable])

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
  
  const filtered = dataTable?.filter(row =>
         Object?.values(row)?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         pege==undefined&&  Object?.values(row?.additionalData?row?.additionalData[0]?.doctor||row?.additionalData[0]?.ahp:[])?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
         pege==undefined&&  Object?.values(row?.speciality?row?.speciality?.map((v)=>v?.label):[""])?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))
       );
  setFilterValues(filtered);

}
else{
 
  setFilterValues(dataTable)
}


  },[search,filter])


  const handleDrop = (event) => {
    event.preventDefault();
  };
const {css}=customStyles(tableCss)
const customSortIcon = <HiOutlineArrowSmUp />;
const customSortUpIcon = <HiOutlineArrowSmUp />;
const customSortDownIcon = <HiOutlineArrowSmDown />;
  return (
    <div onDrag={handleDrop} onDragOver={(event) => event.preventDefault()} style={{overflow:"scroll"}} className="table-container">
      <ReactCustomeTable
        className="border"
        data={filterValues || []}
        columns={columns || []}
        customStyles={css}
       
        style={{overflowX:"scroll",zIndex:"-1000"}}
        // fixedHeaderScrollHeight="auto"
        sortIcon={customSortIcon}
        sortUpIcon={customSortUpIcon}
        sortDownIcon={customSortDownIcon}
      
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />
    </div>
  );
};
export default ReactTableTwo;
