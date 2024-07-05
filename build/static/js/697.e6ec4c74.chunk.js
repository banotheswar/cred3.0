"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[697],{10832:(e,i,l)=>{l.r(i),l.d(i,{default:()=>a});l(72791);var t=l(57689),o=l(66786),d=l(92539),n=l(33532),s=l(80184);const a=()=>(0,s.jsxs)(t.Z5,{children:[(0,s.jsx)(t.AW,{path:"/",element:(0,s.jsx)(o.Z,{})}),(0,s.jsx)(t.AW,{path:"details/:providerId/:facilityId/:appId",element:(0,s.jsx)(d.Z,{})}),(0,s.jsx)(t.AW,{path:"details/:providerId/:facilityId/:appId/applicationinprogress",element:(0,s.jsx)(n.Z,{})})]})},66786:(e,i,l)=>{l.d(i,{Z:()=>x});var t=l(72791),o=l(57689),d=l(67922),n=l(43860),s=l(65804),a=l(19907),r=l(58124),c=(l(34659),l(27878)),v=l(72426),p=l.n(v),m=l(20321),u=l(80184);const x=()=>{const{data:e,handleChange:i}=(0,a.L)({}),[l,v]=(0,t.useState)([]),[x,h]=(0,t.useState)(""),[j,y]=(0,t.useState)([]),[f,g]=(0,t.useState)([]),[N,b]=(0,t.useState)({}),[I,w]=(0,t.useState)([]),k=(0,o.s0)(),{headerlink:S}=(0,a.L)({}),[A,D]=(0,t.useState)(!1),[C,F]=(0,t.useState)("All Doctors"),[T,E]=(0,t.useState)(1),{providerId:L,facilityId:Y}=(0,o.UO)(),Z=[{name:"All Doctors"},{name:"Privileged"},{name:"Applying"},{name:"Appt Expiring"},{name:"Appt Expired"},{name:"Credentials Expiring"},{name:"Credentials Expired"},{name:"Board Review"},{name:"Archived"}],M=()=>{D(!A)};(0,t.useEffect)((()=>{var e;S((null===(e=sessionStorage)||void 0===e||e.getItem("roleId"),[{name:"All Providers",link:"/outpatientpro/enterprise/doctors"},{name:"Doctors",link:"/outpatientpro/enterprise/doctors",active:!0}]))}),[I]);const O=[{name:"Name",selector:e=>(0,u.jsxs)("div",{onClick:()=>{var i;return 2==(null===(i=sessionStorage)||void 0===i?void 0:i.getItem("roleId"))?k("/outpatientpro/enterprise/doctors/details/".concat(null===e||void 0===e?void 0:e.userId,"/").concat(null===e||void 0===e?void 0:e.fId,"/").concat(null===e||void 0===e?void 0:e.appointmentId)):k("/outpatientpro/facility/doctors/details/".concat(null===e||void 0===e?void 0:e.userId,"/").concat(null===e||void 0===e?void 0:e.fId,"/").concat(null===e||void 0===e?void 0:e.appointmentId))},children:[(0,u.jsx)("span",{title:null===e||void 0===e?void 0:e.userName,className:"pointer text-hover",children:null===e||void 0===e?void 0:e.userName}),(0,u.jsx)("br",{}),(0,u.jsx)("div",{className:"phonefont",children:"(630) 941-4301"})]}),sortable:!0,key:"userName",width:"11rem"},{name:"License Type",selector:e=>(0,u.jsx)("div",{children:(0,u.jsx)("span",{title:null===e||void 0===e?void 0:e.licenseType,className:"pointer",children:null===e||void 0===e?void 0:e.licenseType})}),sortable:!0,key:"licenseStateName",width:"12rem"},{name:"Specialty",selector:e=>{var i;const l=null===e||void 0===e||null===(i=e.speciality)||void 0===i?void 0:i.map((e=>e));var t;return l?(null===l||void 0===l?void 0:l.length)<=2?(0,u.jsx)("div",{title:l,className:"pointer link-hover-line text-wrap",children:null===l||void 0===l?void 0:l.join(", ")}):(0,u.jsx)("div",{title:l,className:"pointer link-hover-line text-wrap",children:(null===l||void 0===l||null===(t=l.slice(0,2))||void 0===t?void 0:t.join(", "))+" +".concat((null===l||void 0===l?void 0:l.length)-2)}):""},sortable:!0,key:"speciality",width:"9rem",subKey:"label"},{name:"Tags",selector:e=>{var i;const l=null===e||void 0===e||null===(i=e.tags)||void 0===i?void 0:i.map((e=>e));var t;return l?(null===l||void 0===l?void 0:l.length)<=2?(0,u.jsx)("div",{title:l,className:"pointer  text-wrap",children:null===l||void 0===l?void 0:l.join(", ")}):(0,u.jsx)("div",{title:l,className:"pointer  text-wrap",children:(null===l||void 0===l||null===(t=l.slice(0,2))||void 0===t?void 0:t.join(", "))+" +".concat((null===l||void 0===l?void 0:l.length)-2)}):""},sortable:!0,key:"tags",subKey:"label"},{name:"Facility",selector:e=>(0,u.jsx)("div",{title:null===e||void 0===e?void 0:e.facilityName,className:"pointer",children:null===e||void 0===e?void 0:e.facilityName}),sortable:!0,key:"facilityId",width:"15rem",subKey:"label"},{name:"Status",selector:e=>(0,u.jsxs)("div",{children:[(0,u.jsx)("span",{title:"applicationSent",className:"applicationSent ",style:{width:"136px"},children:null===e||void 0===e?void 0:e.appointmentStatus}),(0,u.jsx)("div",{className:"phonefont text-center py-1",children:(0,u.jsx)("div",{className:"phonefont text-center py-1",children:"Onboarding"===(null===e||void 0===e?void 0:e.appointmentType)?"Existing":"Initial Appointment"===(null===e||void 0===e?void 0:e.appointmentType)?"Initial":null===e||void 0===e?void 0:e.appointmentType})})]}),sortable:!0,width:"11rem"},{name:(0,u.jsx)("div",{className:"",children:"Needs Attention"}),selector:e=>(0,u.jsxs)("div",{style:{width:"80px"},title:"8 Items",className:"  expired text-center    ",children:[null===e||void 0===e?void 0:e.needsAttention," Items"]}),sortable:!0,width:"8rem"},{name:(0,u.jsx)("div",{children:"Last Updated"}),selector:e=>{var i,l;return(0,u.jsx)("div",{title:null===(i=p()(null===e||void 0===e?void 0:e.updatedDate))||void 0===i?void 0:i.format("MM/DD/YYYY"),className:"",children:null===(l=p()(null===e||void 0===e?void 0:e.updatedDate))||void 0===l?void 0:l.format("MM/DD/YYYY")})},sortable:!0,width:"8rem",key:"updatedDate"}];(0,t.useEffect)((()=>{(async()=>{var e;let i=await(0,d.gp)(null===n.jk||void 0===n.jk||null===(e=n.jk.settings)||void 0===e?void 0:e.getStatesdd,{jsonObjects:{type:"Speciality"}});g(i)})(),(async()=>{var e,i;let l={userId:0,type:"Doctor",roleId:null===(e=sessionStorage)||void 0===e?void 0:e.getItem("roleId"),organizationId:sessionStorage.getItem("organizationId")},t=await(0,d.gp)(null===n.jk||void 0===n.jk||null===(i=n.jk.settings)||void 0===i?void 0:i.getAllUsers,{jsonObjects:l});null===t||void 0===t||t.map((e=>{var i,l,t;e.speciality=null===e||void 0===e||null===(i=e.speciality)||void 0===i?void 0:i.map((e=>null===e||void 0===e?void 0:e.label)),e.tags=null===e||void 0===e||null===(l=e.tags)||void 0===l?void 0:l.map((e=>null===e||void 0===e?void 0:e.label)),e.facilityId=null===e||void 0===e||null===(t=e.facilityId)||void 0===t?void 0:t.map((e=>null===e||void 0===e?void 0:e.label))})),y(t),v(t)})()}),[]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"show_header",children:(0,u.jsx)(m.E,{array:j,tabs:Z,title:"Doctors",name:"DoctorList",search:x})}),(0,u.jsxs)("div",{className:"bg-white px-4 mobile_Header",children:[(0,u.jsxs)("div",{className:"row px-3 ",style:{paddingTop:"32px"},children:[(0,u.jsx)("div",{className:"col-xl-9  col-md-8",children:(0,u.jsx)("div",{className:"f30 medium ",children:"Doctors"})}),(0,u.jsx)("div",{className:"col-xl-3 col-md-4 px-2",children:(0,d.eb)(h,x)})]}),(0,u.jsxs)("div",{className:"row px-2",style:{paddingTop:"32px"},children:[(0,u.jsx)("div",{className:"col-md-9  d-flex pt-1",children:(0,u.jsx)("div",{className:"d-flex col-md-12",style:{overflow:"scroll"},children:null===Z||void 0===Z?void 0:Z.map((e=>(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("div",{className:C==(null===e||void 0===e?void 0:e.name)?" text-center filter-tabactive col-auto f14 px-3 mx-1":"text-center filter-tab f14 col-auto px-3  mx-1",onClick:()=>F(null===e||void 0===e?void 0:e.name),children:null===e||void 0===e?void 0:e.name})})))})}),(0,u.jsxs)("div",{className:"col-md-3 d-flex doc-list-more",children:[(0,u.jsx)("div",{className:"col-md-6 ",children:(0,u.jsxs)("div",{className:"".concat(A?"border rounded py-2  text-white d-flex justify-content-center pointer f16 medium":"py-2  morefiltertext d-flex justify-content-center pointer f16 medium"," "),style:{background:A&&"#575777"},onClick:M,children:[(0,u.jsx)(s.SVs,{color:A?"#FFFFFF":"#575777",size:24,className:"  "}),(0,u.jsx)("span",{className:"px-1",children:"More Filters"})]})}),(0,u.jsxs)("div",{className:"col-md-6 d-flex",children:[(0,u.jsx)("div",{className:"col-md-6 d-flex justify-content-around  py-2 f16 medium doc-list-dd-text",style:{color:"#3A3952"},children:"Show"}),(0,u.jsx)("div",{className:"col-md-6 doc-list-dd doc-xl-dd",children:(0,u.jsxs)("select",{className:"form-select  m-0 doc-list-tab-dd",onChange:i("pageCount"),style:{height:"35px",fontFamily:"Roboto",fontWeight:"400"},children:[(0,u.jsx)("option",{children:"10"}),(0,u.jsx)("option",{children:"20"}),(0,u.jsx)("option",{children:"30"}),(0,u.jsx)("option",{children:"40"}),(0,u.jsx)("option",{children:"50"}),(0,u.jsx)("option",{children:"60"}),(0,u.jsx)("option",{children:"70"}),(0,u.jsx)("option",{children:"80"}),(0,u.jsx)("option",{children:"90"}),(0,u.jsx)("option",{children:"100"})]})})]})]})]}),(0,u.jsx)("div",{style:{width:"auto",overflow:"scroll",paddingTop:"25px",paddingLeft:"8px"},children:(0,u.jsx)(r.Z,{dataTable:j,columns:O,search:x,pageCount:null===e||void 0===e?void 0:e.pageCount,pageOne:e=>{e(1)}})}),A&&(0,u.jsx)(c.Z,{openModel:M,setList:y,filterList:l,setObj:b,obj:N})]})]})}}}]);
//# sourceMappingURL=697.e6ec4c74.chunk.js.map