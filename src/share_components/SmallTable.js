import React, { useEffect, useState } from "react";
import ReactCustomeTable from "react-data-table-component";
const SmallTable = ({ dataTable, columns, filyterKeys }) => {
  const [filterValues, setFilterValues] = useState([]);

  const customStyles = {
    title: {
      style: {
        fontColor: "red",
        fontWeight: "600",
        borderRadius: "10%",
        
      },
    },

    headCells: {
      style: {
        fontFamily: "Roboto",
        fontSize: "16px",
        fontWeight: "500",
        background: "#ffff 0% 0% no-repeat padding-box",
        color: "#3A3952",
        hover: "#6f7eed",
        minWidth: "75px",
        cursor: "pointer", // Change cursor on hover
      
      },
    },
    
    cells: {
      style: {
        fontFamily: "Roboto",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: 1.5,
        color: "#3A3952",
        borderBottom: "none",
        opacity: 1,
        letterSpacing: "0px",
        // background:"red",
        border:"gray"
        
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
        color: "black",
      },
    },
  };
  useEffect(() => {
    setFilterValues(dataTable);
  }, [dataTable]);
  return (
    <ReactCustomeTable
      // data={filterValues || []}
       data={(filterValues || []).slice(0, 5)}
      columns={columns || []}
      customStyles={customStyles}
      fixedHeader
      fixedHeaderScrollHeight="auto"
  
     
    />
  );
};
export default SmallTable;
