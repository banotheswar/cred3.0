import React, { useEffect, useState } from "react";
import ReactTable from "../../../share_components/ReactTable";
import { RiDeleteBinLine } from "react-icons/ri";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { speciality } from './../../../redux/Action';
import { urls } from "../../../api_services/url";
import { TableActionBoutton, formStatus, getList, save, sortingTable, statusFun } from "../../../api_services/SharedServices";
import SpecialityModal from "./SpecialityModal";
import { BiEdit } from "react-icons/bi";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

const Specialties = () => {
  const [speciality,setSpeciality] = useState()
  const [modal,setModal] = useState(false)
  const [update,setUpdate] = useState("")
const [specialitydata,setSpecialitydata]= useState()



  const submit = async() =>{
    let jsonObjects = {
        globalId:data?.globalId&&data?.globalId!=0?data?.globalId:0,
        type:"Speciality",
        name:data?.name,
        status:"Active"
    };
    let res = await save(urls?.masters?.save,{jsonObjects});
    if (res?.data?.status == true) {
      setUpdate(res)
      setSpecialitydata([0])
      data["name"]=""
    }
    
    
}
  const { data,errors,handleSubmit,handleChange,setValues,headerlink } = UseFormValidations({
    initialValues: {
        name: "",
      },
      validationSchema: {
         name: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        }
      },
      submit:submit
})


const status = async(row)=>{
  let jsonObjects = { globalId:row?.globalId, status:row?.status == "Active" ? "InActive" : "Active"}
let res = await save(urls?.masters?.status, { jsonObjects })
if (res?.data?.status) {
  setUpdate(res)
}
}


  useEffect(() => {
    headerlink([
      {name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder"},
      {name:"Specialties",link:"/outpatientpro/facility/applicationBuilder/specialties",active:true}
    ])
  }, []);
  const columns = [
    {
      name: "Specialties",
      selector: (row) => <div title={row?.name}>{row?.name}</div>,
      sortFunction: (a, b) => sortingTable(a, b, "name"),

    },
    {
      name: "Status",
      selector: (row) =><div className='pointer' onClick={()=>status(row)}>{row?.status == "Active" ? <MdToggleOn title="Active" color="green" size={30} />
      : <MdToggleOff title="InActive" color="#F4364C" size={30} />}</div>,
      width:"15rem"

  },
    {
      name: "Actions",
      hide: "sm",
      selector: (row) => (<>{TableActionBoutton([{name:"Edit",modalName:setSpecialitydata,value:row,icon:<BiEdit className=''  color='#0073EE' size={20}/>}])}</>
       
      ),
      width:"15rem",

    },
  ];
  
  const getspeciality = async () => {
    let jsonObjects = {
        globalId:0,
        type:"Speciality",
    };
    let res = await getList(urls?.masters.getList, { jsonObjects });

    setSpeciality(res);

};

const ErrorColor = (key) => {
  return errors && errors?.[key]
    ? "form-control bg-white border border-danger"
    : "form-control border bg-white ";
};


useEffect(()=>{
  getspeciality()
  
},[update])

useEffect(()=>{  
  setValues(specialitydata)             
},[specialitydata])


  return (
    <div >
      <div className="bg-white">
        <div className="px-4  py-4 activitylogheader mb-2">Specialties</div>

        </div>

        <div className="px-4 py-3 bg-white">
          <div className="f18 medium">
          How to setup your Specialties


          </div>
          <form onSubmit={handleSubmit}>
          <div className="cil-xl-3 col-lg-4 col-md-8 d-flex gap-2  mb-2">
          <input className={ErrorColor("name")} placeholder='Name...'value={data?.name} name='name'onChange={handleChange("name")}></input>
           
            <button
            className="border rounded pointer add p-3 mt-2   d-flex align-items-center justify-content-center  text-white"
            style={{ background: " #9d9d9d" }}
            type="submit"
       
          >
            Add
          </button>
          
          </div>
          </form>

          <ReactTable dataTable={speciality || []} columns={columns} />
        </div>
        {/* {modal&&<SpecialityModal show={modal} update={setUpdate} onHide={()=>setModal(false)}/>  } */}
   
    </div>
  );
};

export default Specialties;
