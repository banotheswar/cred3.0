import React, { useEffect, useState } from "react";
import ReactCustomeTable from "react-data-table-component";
const ProfileTable = ({ dataTable, columns, filyterKeys }) => {
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
        fontSize: "15px",
        fontWeight: "500",
        // background: "#EBEBED",
        minHeight:"48px",
        background: "#F7F7F7 0% 0% no-repeat padding-box",
        color: "#3A3952",
        fontFamily: "Roboto",
        hover: "#6f7eed",
        minWidth: "75px",
        cursor: "pointer", 
        paddingLeft:"24px"
      },
    },

    cells: {
      style: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.5,
        paddingLeft:"24px",
        fontFamily: "Roboto",
        color: "#3A3952",
        borderBottom: "none",
        opacity: 1,
        letterSpacing: "0px",
        minHeight:"49px",
        
      },
    },
 
  };
  useEffect(() => {
    setFilterValues(dataTable);
  }, [dataTable]);
  return (
    <ReactCustomeTable
    className="tableborder"
      data={filterValues || []}
      columns={columns || []}
      customStyles={customStyles}
      fixedHeader
      
      fixedHeaderScrollHeight="auto"
  
     
    />
  );
};
export default ProfileTable;
