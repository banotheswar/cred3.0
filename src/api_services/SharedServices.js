import { ToastContainer, toast, Flip, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import instance from '../services/Service';

import { MdSearch, MdToggleOff, MdToggleOn } from 'react-icons/md';
import { urls } from './url';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import expireicon from "../../src/assets/images/more actions.svg";
import { BiEdit } from 'react-icons/bi';


export const phoneFormat = (phoneNumber) => {
  return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}
export const mulitplePhoneNumberValue = (value) => {
  return (value && value != '') ? phoneFormat(value) : ""
}


export const usphoneFormat = (phoneNumber) => {
  return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}
export const usphoneNumberValue = (value) => {
  return (value && value != '') ? phoneFormat(value) : ""
}


export const getAll = async (url) => {
  try {
    let res = await instance.get(url);
    return res?.data?.data;
  } catch (e) {
    return {}
  }
}
export const getList = async (url, data) => {
  try {
    const res = await instance.post(url, data);
    if (res?.data?.status == true) {
      return res?.data?.data||[]
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}
export const getById = async (url, id,provider) => {
  try {
    const res = await instance.post(url, id);
    if (res?.data?.status == true) {
      return res?.data?.data[0]
    } else {
      notify(false, res?.data?.message)
      window.location.pathname=provider&&"/"
      return []
    }
  } catch (e) {
    
    return []
  }
}
export const save = async (url, data, saveType) => {
  try {
    let res = await instance.post(url, data);

    if (res?.data?.status == true) {
     
      !(saveType == "addToListNew" || saveType == "addToList" || saveType == "delete") && notify(res?.data?.status, res?.data?.message)
     

      return res
    } else {
      notify(res?.data?.status, res?.data?.message)
      return {}
    }
  } catch (e) {

    return {}
  }
}
export const saveApp = async (url, data, providerId) => {
  try {
    let res = await instance.post(url, data);

    if (res?.data?.status == true) { 
       !providerId&&notify(res?.data?.status, res?.data?.message)

      return res
    } else {
      notify(res?.data?.status, res?.data?.message)
      return {}
    }
  } catch (e) {

    return {}
  }
}
export const formsave = async (url, data) => {
  try {
    let res = await instance.post(url, data);

    if (res?.data?.status == true) {

      return res
    } else {
      return {}
    }
  } catch (e) {

    return {}
  }
}

export const plusadd= (array)=>{
  const labels = array;
  if (labels) {
    if (labels?.length <= 2) {
      return <div title={labels} className="pointer  text-wrap">{labels?.join(", ")}</div>;
    } else {
      return <div title={labels} className="pointer  text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
    }
  } else {
    return "";
  }
}
export const customStyles = (props) => {
  console?.log(props, "headerminheight,cellsminheight")
  let css = {
    title: {
      style: {
        fontColor: "red",
        fontWeight: "600",
        borderRadius: "10%",
        border: "1px solid #ddd "
      },
    },

    rows: {
      style: {
        "&:nth-child(odd)": {
        

          background: "#FFFFFF 0% 0% no-repeat padding-box",
        },
        "&:nth-child(even)": {
         

          background: " #EFF2F49B 0% 0% no-repeat padding-box",
        },
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "500",
        minHeight: props?.min ? props?.min : "64px",
        background: "#8B8B8B 0% 0% no-repeat padding-box",
        color: "#FFFFFF",
        hover: "#6f7eed",
        minWidth: "75px",
        opacity: 1,
        paddingLeft:"23px",
        fontFamily: "Roboto",
        borderRight: "1px solid #ddd",
        display: 'flex',
        whiteSpace: 'wrap',
        justifyContent: 'space-between',
       alignItems: 'flex-start',
       overFlow:"scroll",
        cursor: "pointer", // Change cursor on hover
        "&:hover": {
          background: "#5D5D5D 0% 0% no-repeat padding-box",
        },
      },
    },

    cells: {
      style: {
        fontSize: "14px",
        fontWeight: 400,
        // lineHeight: 2,
        minHeight: props?.max ? props?.max : "65px",
        color: "#3A3952",
        fontFamily: "Roboto",
        borderBottom: "none",
        opacity: 1,
        paddingLeft:"23px",
        letterSpacing: "0px",
        borderRight: "1px solid #ddd",
        overFlow:"scroll",
      },
    },
    // pagination: {
    //   style: {
    //     fontFamily: "Roboto",
    //     fontWeight: "500",

    //     fontSize: "15px",
    //     color: "#3A3952",
    //   },
    // },
  }
  return { css }
};

export const filterSearch = (setSearch, search) => {
  return (
    <>

      <div className="password-container col-md-auto ">
        <input
          type="search"
          placeholder="Search..."

          className="header-search  search-input search-control bg-white"
          name="password"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon ">
          {<MdSearch size={20} color="#878793" />}
        </span>
      </div>
    </>
  );
};


export const add = async (url, data) => {
  try {
    let res = await instance.post(url, data);
    notify(res?.data?.status, res?.data?.message);
    return res;
  } catch (e) {
    console.log(e);
    return {};
  }
};


export const SharedServices = () => {
  const state = useSelector((state) => state?.show)

  return (
    {
      state
    }
  )
}

export const notify = (status, msg) => {


  const toastOptions = {
    position: 'bottom-left', // Set the position to bottom-right
    autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
    hideProgressBar: false, // Show the progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the timer when hovering
    draggable: true, // Make the toast draggable
    progress: undefined, // Use the default progress bar
    // transition: Flip,
    theme: "dark",
    transition: Zoom,
    style: {
      width: '300px', // Adjust width as needed

    },

  };



  if (status == true) {
    toast.success(msg, toastOptions);
    return (<ToastContainer />)
  } else {
    toast.error(msg, toastOptions)
    return (<ToastContainer />)
  }
}
export const sortingTable = (a, b, key) => {
//   const nameA = a?.[key]?.toUpperCase();
//  const nameB = b?.[key]?.toUpperCase();
  const nameA =  Array.isArray(a?.[key])?a?.[key]?.map((v)=>v?.labels?.toUpperCase()):a?.[key]?.toUpperCase();
  const nameB = Array.isArray(b?.[key])?b?.[key]?.map((v)=>v?.labels?.toUpperCase()): b?.[key]?.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}


export const sortingTableNumbers = (a, b, key) => {
  const numA = parseFloat(a[key]);
  const numB = parseFloat(b[key]);

  if (numA < numB) {
    return -1;
  }
  if (numA > numB) {
    return 1;
  }
  return 0;
}
export const sessionOut = () => {
  sessionStorage.clear()
  return window.location.pathname = "/"
}


export const commonTable = (data, array) => {
  return (
    <div className="px-4 py-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {array?.map((e, i) => {
              return <th>{e.key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((d, index) => {
            return (
              <tr key={index}>
                {array?.map((e, i) => {
                  return <td key={i}>{d?.[e.value]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export const colAdjest = (row) => {
  const labels = row?.map((v) => v);
  if (labels) {
    if (labels?.length <= 2) {
      return <div title={labels} className="pointer  text-wrap">{labels?.join(", ")}</div>;
    } else {
      return <div title={labels} className="pointer  text-wrap">{labels?.slice(0, 2)?.join(", ") + ` +${labels?.length - 2}`}</div>;
    }
  } else {
    return "";
  }
}
export const formStatus = async (row, update) => {
  let jsonObjects = { formId: row?.formId || row?.templateId, status: row?.status == "Active" ? "InActive" : "Active" }
  let res = await save(urls?.applicationBuilder?.applicationTemplateFormsStatus, { jsonObjects })
  if (res?.data?.status) {
    update(res)
  }
}

export const formDuplicate = async (row, update) => {
  let jsonObjects = { formId: row?.formId || row?.templateId, formName: row?.templateName }
  let res = await save(urls?.applicationBuilder?.templateFormDuplicates, { jsonObjects })
  if (res?.data?.status) {
    update(res)
  }
}
export const statusFun = (row) => {
  return <div className='pointer'>{row?.status == "Active" ? <MdToggleOn title="Active" color="green" size={30} />
    : <MdToggleOff title="InActive" color="#F4364C" size={30} />}</div>
}




export const TableActionBoutton = (array) => {
  
 
  const [dropdownOProfile, setDropdownProfile] = useState(false);
  const dropdownRefProfile = useRef(null);

  useEffect(() => {
    function handleClickOutsideprofile(event) {
      if (
        dropdownRefProfile.current &&
        !dropdownRefProfile.current.contains(event.target)
      ) {
        setDropdownProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideprofile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideprofile);
    };
  }, [dropdownRefProfile]);

  return (
    <Dropdown
      show={dropdownOProfile}
      onHide={() => setDropdownProfile(false)}
      ref={dropdownRefProfile}
    >
      <Dropdown.Toggle
        variant="none"
        id="user-menu"
        style={{ border: "none" }}
        onClick={() => setDropdownProfile(!dropdownOProfile)}
      >
        <img src={expireicon} alt="cred" className="pointer" style={{  height: "18px", width: "18px", }} />
        {/* <CiMenuKebab size={20} className="pointer" /> */}
      </Dropdown.Toggle>
      <Dropdown.Menu >
        <Dropdown.ItemText style={{ padding: "0px" }}>
          {array?.map((v, index) => {
            if (v) {
              
              return (
                <div
                  key={index}
                  className="p-2 profile-hover pointer "
                  onClick={() => v?.key ? v?.modalName(v?.key, v?.value) : v?.modalName(v?.value)}
                  
                >
                 
                 {v?.icon&& <span className='px-1 ' >{v?.icon}</span>}
                 <span className='actionfont px-1'>{v?.name}</span> 
                </div>
              )
            }
          })}
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
  );
};





export const DropdownMaster = async(type,state,CredentialType) =>{
  let jsonObjects = {
    type:type,
    credentialType:CredentialType
  }
  let res = await getList(urls?.settings?.getStatesdd, { jsonObjects});
  state(res)
}

export const customStyleSmalltable = {
  title: {
      style: {
        fontColor: "red",
        fontWeight: "600",
        borderRadius: "10%",
        border: "1px solid #ddd ",
        overflow:"scroll"
      },
    },
    rows: {
      style: {
        "&:nth-child(odd)": {
          background: " #EFF2F49B 0% 0% no-repeat padding-box",
        },
        "&:nth-child(even)": {
       


          background: "#FFFFFF 0% 0% no-repeat padding-box",
          overflow:"scroll"
        },
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: 1.5,
        minHeight: "64px",
        background: "#8B8B8B 0% 0% no-repeat padding-box",
        color: "#FFFFFF",
        hover: "#6F7EED",
        minWidth: "75px",
        opacity: 1,
        paddingLeft:"23px",
        fontFamily: "Roboto",
        borderRight: "1px solid #ddd",
        textAlign:"start",
     paddingBottom:"20px",
        paddingTop:"0px",
        display: 'flex',
        whiteSpace: 'wrap',
        justifyContent: 'space-between',
       alignItems: 'flex-start',
        cursor: "pointer", // Change cursor on hover
        "&:hover": {
          background: "#5D5D5D 0% 0% no-repeat padding-box",
        },
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontWeight: 400,
        // lineHeight: 2,
        paddingLeft:"23px",
        paddingTop: "11px",
        lineHeight: 1.5,
        alignItems:"normal !important",
        minHeight:  "65px",
        color: "#3A3952",
        fontFamily: "Roboto",
        borderBottom: "none",
        opacity: 1,
        letterSpacing: "0px",
        borderRight: "1px solid #ddd",
      },
    },
    pagination: {
      style: {
        fontFamily: "Roboto",
        fontWeight: "500",
        fontSize: "15px",
        color: "#3A3952",
      },
    },
    tableWrapper: {
      overflowX: 'auto',
    },
};
export const checkForKeyEmpty = (array) => {
  for (let i = 0; i < array?.length; i++) {
    const obj = array[i];
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === ""||obj[key] === undefined) {
        console?.log("checkForKeyEmpty",array)
        return "No";
       
      }
    }
  }
  return "Yes";
};