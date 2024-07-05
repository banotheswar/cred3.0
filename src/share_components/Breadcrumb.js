import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GoTools } from "react-icons/go";
const BreadcrumbNav = ({ data }) => {
  const location = useLocation();
const navigate = useNavigate()


  const GoTo = (name) => {
    return navigate(name)
  }
  // console.log(location,"location",data.length-1)
  // <div className='d-flex align-items-center ml-2'key={i}>
  return (
    // <Breadcrumb  style={{marginTop:"30px"}}>
    //   {data?.map((v,i)=>{
    //     return(
    //       <div className=''key={i} >
    //       <NavLink to={v.link} style={{height:"16px !important"}} className={({isActive})=>isActive&&v.active?"  decaration breadcrum text-color ":"breadcrumInactive decaration  text-color1"}>
    //         {/* <span></span> */}

    //         <span style={{ marginRight: "6px"}}>  {v.name}</span>
    //         <span className='' style={{ marginRight:data?.length-1!=i? "6px":"-6px"}}>{data?.length-1!=i&& <MdOutlineNavigateNext className='text-color1' size={18} />}</span>
    //         </NavLink>
    //        {/* {data?.length-1!=i&& <MdOutlineNavigateNext className='text-color1' size={18} />} */}
    //         </div>
    //     )
    //   })}

    // </Breadcrumb>
    <Breadcrumb style={{ marginTop: "30px" }}>
      <div class="breadcrumb-size breadcrumb-size-tab">
        <div class="insidescroll ">
          {data?.map((v, i) => {
            return (
              <span
             
                key={i}
                style={{
                
                  fontSize: "14px",
                  opacity: `${data?.length - 1 != i ? 0.6 : 1}`,
                  color: `${data?.length - 1 != i ? "#323232" : "text-color"} `,
                  borderBottom: `${
                    data?.length - 1 != i
                      ? "2px solid #cdcbcb"
                      : "2px solid #3790f7"
                  }`,
                  
                
                }}
                className={` `}
               
              >
               <span className="pointer" title= {v.name} onClick={()=> GoTo(v?.link)} style={{ marginRight: "6px",paddingTop: "1px"}}>  {v.name}</span>
            
                 <span className='' style={{ marginRight:data?.length-1!=i? "6px":"-6px"}}>{data?.length-1!=i&& <MdOutlineNavigateNext className='text-color1' size={18} />}</span>
              </span>
            );
          })}
        </div>
      </div>
    

    </Breadcrumb>
    
  );
};
export default BreadcrumbNav;
