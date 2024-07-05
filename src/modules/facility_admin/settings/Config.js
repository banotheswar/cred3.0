import React, { useEffect, useState } from "react";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { getAll, getList, save } from "../../../api_services/SharedServices";
import { Image_Base_Url, urls } from "../../../api_services/url";
import { IoMdCloudDownload } from "react-icons/io";

const Config = () => {
  const [all,setAll]=useState([])
  const submit =async()=>{
    let formData=new FormData()
    let array=[{"configKey":"SMTP_HOST","configValue":data?.SMTP_HOST},
    {"configKey":"SMTP_PORT","configValue":data?.SMTP_PORT},
    {"configKey":"SMTP_USERNAME","configValue":data?.SMTP_USERNAME},
    {"configKey":"SMTP_PASSWORD","configValue":data?.SMTP_PASSWORD}
  ]
    formData.append("JsonString",JSON.stringify(array))
    formData?.append("image",data?.image)
   
  
    let res=await save(urls?.settings?.configaration,formData)
    if(res?.data?.status){
      getAllCong()
    }
  }
  const getAllCong=async()=>{
    let res=await getAll(urls?.settings?.getAllconfiguration)
    setAll(res)
    let all=res
    all&&all?.length>0&&all?.map((v)=>{
      data[v?.configKey]=v?.configValue
    })
    
  }
  const {data,errors,headerlink,handleChange,handleEmailChange,handleImageUpload,handleSubmit,setValues}=UseFormValidations({
    initialValues:{
      // SMTP_PASSWORD:"",SMTP_USERNAME:"",SMTP_PORT:"",SMTP_HOST:""
    },
    validationSchema:{},
    submit:submit
  })

const returnData=(key)=>{
  return data?.[key]&&data?.[key]?data?.[key]:""
}
  useEffect(() => {
    headerlink([
      {name:"Settings",link:"/outpatientpro/facility/settings"},
      {name:"Configuration",link:"/outpatientpro/facility/settings/configuration",active:true}
    ])
    getAllCong()
  }, []);
  console?.log(data,"data")
  return (
    <form onSubmit={handleSubmit}>
      
      


      <div className="bg-white  p-4 ">
      
      {/* <div
       className="row"
      >
        <div className=" col-xl-11 col-lg-10 col-md-10 ">
        <div className="settings-locations">Configuration</div>
        </div>
        <div className="col-xl-1 col-lg-2 col-md-2 ">
        <button
          className="save border p-2 px-4  rounded"
          
         
        >
          Save
        </button>
        </div>
        
        
      </div> */}
      <div class="row">
    <div class="col-md-10 col-lg-10 col-xl-11">
        <div class="settings-locations">Configuration</div>
    </div>
    <div class="col-md-2 col-lg-2 col-xl-1">
        <button class="save border save_config   p-2 px-4 rounded w-100">
          Save
        </button>
    </div>
</div>

    </div>





      <div className="  bg-white p-4 vh-100 mt-2" >
        <div className="row mt-2 ">
          <div className="col-xl-4 col-lg-4 col-md-6 my-2">
            {" "}
            <label>SMTP Username</label>
            <input
              className="form-control"
              name="userName"
              placeholder="Username... "
              value={returnData("SMTP_USERNAME")}
              onChange={handleChange("SMTP_USERNAME")}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6  my-2">
            {" "}
            <label>SMTP Password</label>
            <input
              className="form-control"
              name="password"
              placeholder="Password... "
              value={returnData("SMTP_PASSWORD")}
              onChange={handleChange("SMTP_PASSWORD")}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6  my-2">
            {" "}
            <label>SMTP Host</label>
            <input className="form-control" name="host" placeholder="Host... " value={returnData("SMTP_HOST")}
              onChange={handleChange("SMTP_HOST")} />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6  my-2">
            {" "}
            <label>SMTP Port</label>
            <input className="form-control" name="port" placeholder="Port... " value={returnData("SMTP_PORT")}
              onChange={handleChange("SMTP_PORT")} />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6  my-2">
            {" "}
            <label>Organization Logo</label>
            <input type="file" className="form-control" name="port" onChange={handleImageUpload("image")} />
          </div>
          <div className="col-md-4 my-2">
          {" "}
          <label>Download Logo</label>
          <div>
        <a href={Image_Base_Url+`/Logos/${data?.Logo}`} target={"_blank"} download={true}><IoMdCloudDownload size={20} /></a> 
          </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Config;
