/*! For license information please see 8095.cb1b1d26.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8095],{8095:(e,t,i)=>{i.r(t),i.d(t,{default:()=>v});var a=i(72791),r=i(57689),o=i(67922),n=i(44330),s=i(54316),l=i(3243),c=i(59391),d=(i(1009),i(19907)),u=i(43860),p=i(80184);const h=()=>{var e;const{state:t}=(0,o.DK)({}),i=(0,r.s0)(),[h,v]=(0,a.useState)(),{headerlink:m}=(0,d.L)({}),[f,y]=(0,a.useState)(),{providerId:x}=(0,r.UO)();console.log(h,"facilityListfacilityListfacilityList");(0,a.useEffect)((()=>{(async()=>{var e,t;let i={userId:null===(e=sessionStorage)||void 0===e?void 0:e.getItem("userId")},a=await(0,o.gp)(null===u.jk||void 0===u.jk||null===(t=u.jk.doctor)||void 0===t?void 0:t.getLocationsById,{jsonObjects:i});y(a)})()}),[x]),(0,a.useEffect)((()=>{m([{name:"Dashboard",link:"/outpatientpro/provider/dashboard",active:!0}])}),[]),(0,a.useEffect)((()=>{(async()=>{var e,t;let i={userId:null===(e=sessionStorage)||void 0===e?void 0:e.getItem("userId")},a=await(0,o.gp)(null===u.jk||void 0===u.jk||null===(t=u.jk.providerDashboard)||void 0===t?void 0:t.getFacilityList,{jsonObjects:i});v(a)})()}),[null===(e=sessionStorage)||void 0===e?void 0:e.getItem("userId")]);const g=[{number:"30",name:"Facility Requests"},{number:"52",name:"Credentials"},{number:"8",name:"Health Documents"},{number:"42",name:"Signature Request"},{number:"28",name:"Messages  From Facility"},{number:"80",name:"Application In Progress"}];n.be3,n.be3,s.Rc_,s.swE,n.be3,n.be3,s.Rc_,s.swE;const b=[{name:"Name",selector:e=>(0,p.jsx)("div",{className:"link-hover-line text-wrap",title:null===e||void 0===e?void 0:e.Action,onClick:()=>i("/outpatientpro/provider/facility/facilityprofile"),children:null===e||void 0===e?void 0:e.Action})},{name:"Facility",selector:e=>(0,p.jsx)("div",{className:"text-wrap",children:null===e||void 0===e?void 0:e.FacilityUser})},{name:"Status",selector:e=>(0,p.jsx)("div",{title:null===e||void 0===e?void 0:e.status,className:("Application Sent"==(null===e||void 0===e?void 0:e.status)||"Expired "==(null===e||void 0===e?void 0:e.status)?" pointer applicationSent   text-center ":"Expired"==(null===e||void 0===e?void 0:e.status)&&"expired    text-center pointer")||"Complete"==(null===e||void 0===e?void 0:e.status)&&"privileged    text-center pointer"||"Archived"==(null===e||void 0===e?void 0:e.status)&&"archived    text-center pointer"||"Expiring(33 days)"==(null===e||void 0===e?void 0:e.status)&&"expiring    text-center pointer"||"Board Review"==(null===e||void 0===e?void 0:e.status)&&"boardReview    text-center pointer",style:{width:"8rem"},children:null===e||void 0===e?void 0:e.status})},{name:"",selector:e=>(0,p.jsx)("div",{className:"button-secondary rounded py-1  text-center",style:{width:"7rem"},children:"Update"})}],k=[{name:"Facility ",selector:e=>(0,p.jsx)("div",{className:"text-wrap link-hover-line",title:null===e||void 0===e?void 0:e.facilityName,onClick:()=>{var t;return i("/outpatientpro/provider/facility/facilityprofile/".concat(null===(t=sessionStorage)||void 0===t?void 0:t.getItem("userId"),"/").concat(null===e||void 0===e?void 0:e.facilityId,"/").concat(null===e||void 0===e?void 0:e.appointmentId))},children:null===e||void 0===e?void 0:e.facilityName})},{name:"Status",selector:e=>(0,p.jsx)("div",{className:"text-wrap",children:null===e||void 0===e?void 0:e.appointmentType})},{name:(0,p.jsx)("div",{children:" Needs Attention "}),selector:e=>(0,p.jsx)("div",{className:"text-wrap",title:null===e||void 0===e?void 0:e.needAttention,children:null===e||void 0===e?void 0:e.needAttention})}];return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"bg-white p-3",children:[(0,p.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,p.jsx)("h6",{className:"py-4 mobile-sub-header-font px-2",children:"Needs Attention (240)"}),(0,p.jsx)("div",{className:"col-auto",children:(0,p.jsx)("button",{className:"btn button-user p-2 f13 px-4 text-white",onClick:()=>i("/outpatientpro/provider/facility/allfacilitylist"),children:"View All"})})]}),(0,p.jsx)("div",{className:"mt-4 row",children:null===g||void 0===g?void 0:g.map((e=>(0,p.jsx)("div",{className:"col-6 col-md-4 col-lg-2  d-flex justify-content-around",children:(0,p.jsx)("div",{className:"text-center",style:{height:"193px",width:"193px",color:"#3A3952"},children:(0,p.jsxs)(c.Wo,{value:null===e||void 0===e?void 0:e.number,strokeWidth:5,styles:{trail:{strokeWidth:5},path:{strokeWidth:2,strokeLinecap:"round"}},children:[(0,p.jsx)("div",{className:"circle-count",children:null===e||void 0===e?void 0:e.number}),(0,p.jsx)("div",{className:"text-wrap circle-text",style:{width:"110px"},children:null===e||void 0===e?void 0:e.name})]})})})))})]}),(0,p.jsxs)("div",{className:"d-flex flex-wrap mt-2",children:[(0,p.jsx)("div",{className:" col-lg-6 col-md-6 vh-auto",children:(0,p.jsxs)("div",{className:"col-md-12 bg-white ",style:{height:"49vh"},children:[(0,p.jsx)("h6",{className:" p-3 mobile-header-font",children:"My Facilities"}),(0,p.jsx)(l.Z,{columns:k,dataTable:f})]})}),(0,p.jsx)("div",{className:" col-lg-6 col-md-6 mobile-margitop  vh-auto",children:(0,p.jsxs)("div",{className:"col-md-12 bg-white  space-2",children:[(0,p.jsx)("h6",{className:" p-3 mobile-header-font",children:"Expiring Credentials"}),(0,p.jsx)(l.Z,{columns:b,dataTable:[{Action:"ACLS Certification",Initiatedby:"Initial Appt (82%)",Provider:"James Wilson",FacilityUser:"California Medical Center",Time:"01-23-2024 4:15 pm",status:"Expired"},{Action:"CA State Medical License ",Initiatedby:"Privileged",Provider:"Elizabeth McDaniel",FacilityUser:"Ghozland Surgery & Health Partners",Time:"01-23-2024 4:15 pm",status:"Expiring(33 days)",action:"Review application"},{Action:"Board Certification",Initiatedby:"Privileged",Provider:"James Wilson",status:"Expiring(33 days)",FacilityUser:"  Huntington Beach Medical Partners",Time:"01-23-2024 4:15 pm"},{Action:"PALS",Initiatedby:"Privileged",Provider:"James Wilson",FacilityUser:"  Orange County Surgical",Time:"01-23-2024 4:15 pm",status:"Expiring(33 days)"},{Action:" Malpractice Insurance",Initiatedby:"Reappointment (9%)",Provider:"James Wilson",FacilityUser:"San Diego Health",Time:"01-23-2024 4:15 pm",status:"Expiring(33 days)"}]})]})})]})]})},v=()=>(0,p.jsx)(r.Z5,{children:(0,p.jsx)(r.AW,{path:"/",element:(0,p.jsx)(h,{})})})},3243:(e,t,i)=>{i.d(t,{Z:()=>n});var a=i(72791),r=i(43513),o=i(80184);const n=e=>{let{dataTable:t,columns:i,filyterKeys:n}=e;const[s,l]=(0,a.useState)([]);return(0,a.useEffect)((()=>{l(t)}),[t]),(0,o.jsx)(r.ZP,{data:(s||[]).slice(0,5),columns:i||[],customStyles:{title:{style:{fontColor:"red",fontWeight:"600",borderRadius:"10%"}},headCells:{style:{fontFamily:"Roboto",fontSize:"16px",fontWeight:"500",background:"#ffff 0% 0% no-repeat padding-box",color:"#3A3952",hover:"#6f7eed",minWidth:"75px",cursor:"pointer"}},cells:{style:{fontFamily:"Roboto",fontSize:"15px",fontWeight:400,lineHeight:1.5,color:"#3A3952",borderBottom:"none",opacity:1,letterSpacing:"0px",border:"gray"}},pagination:{style:{fontSize:"16px",color:"black"}}},fixedHeader:!0,fixedHeaderScrollHeight:"auto"})}},59391:(e,t,i)=>{i.d(t,{Wo:()=>p,y3:()=>h});var a=i(72791),r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])},r(e,t)};var o=function(){return o=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o.apply(this,arguments)};var n=50,s=50;function l(e){var t=e.className,i=e.counterClockwise,r=e.dashRatio,o=e.pathRadius,n=e.strokeWidth,s=e.style;return(0,a.createElement)("path",{className:t,style:Object.assign({},s,d({pathRadius:o,dashRatio:r,counterClockwise:i})),d:c({pathRadius:o,counterClockwise:i}),strokeWidth:n,fillOpacity:0})}function c(e){var t=e.pathRadius,i=e.counterClockwise?1:0;return"\n      M "+n+","+s+"\n      m 0,-"+t+"\n      a "+t+","+t+" "+i+" 1 1 0,"+2*t+"\n      a "+t+","+t+" "+i+" 1 1 0,-"+2*t+"\n    "}function d(e){var t=e.counterClockwise,i=e.dashRatio,a=e.pathRadius,r=2*Math.PI*a,o=(1-i)*r;return{strokeDasharray:r+"px "+r+"px",strokeDashoffset:(t?-o:o)+"px"}}var u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return function(e,t){function i(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}(t,e),t.prototype.getBackgroundPadding=function(){return this.props.background?this.props.backgroundPadding:0},t.prototype.getPathRadius=function(){return 50-this.props.strokeWidth/2-this.getBackgroundPadding()},t.prototype.getPathRatio=function(){var e=this.props,t=e.value,i=e.minValue,a=e.maxValue;return(Math.min(Math.max(t,i),a)-i)/(a-i)},t.prototype.render=function(){var e=this.props,t=e.circleRatio,i=e.className,r=e.classes,o=e.counterClockwise,c=e.styles,d=e.strokeWidth,u=e.text,p=this.getPathRadius(),h=this.getPathRatio();return(0,a.createElement)("svg",{className:r.root+" "+i,style:c.root,viewBox:"0 0 100 100","data-test-id":"CircularProgressbar"},this.props.background?(0,a.createElement)("circle",{className:r.background,style:c.background,cx:n,cy:s,r:50}):null,(0,a.createElement)(l,{className:r.trail,counterClockwise:o,dashRatio:t,pathRadius:p,strokeWidth:d,style:c.trail}),(0,a.createElement)(l,{className:r.path,counterClockwise:o,dashRatio:h*t,pathRadius:p,strokeWidth:d,style:c.path}),u?(0,a.createElement)("text",{className:r.text,style:c.text,x:n,y:s},u):null)},t.defaultProps={background:!1,backgroundPadding:0,circleRatio:1,classes:{root:"CircularProgressbar",trail:"CircularProgressbar-trail",path:"CircularProgressbar-path",text:"CircularProgressbar-text",background:"CircularProgressbar-background"},counterClockwise:!1,className:"",maxValue:100,minValue:0,strokeWidth:8,styles:{root:{},trail:{},path:{},text:{},background:{}},text:""},t}(a.Component);function p(e){e.children;var t=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(i[a[r]]=e[a[r]])}return i}(e,["children"]);return(0,a.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren"},(0,a.createElement)("div",{style:{position:"relative",width:"100%",height:"100%"}},(0,a.createElement)(u,o({},t)),e.children?(0,a.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren__children",style:{position:"absolute",width:"100%",height:"100%",marginTop:"-100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},e.children):null))}function h(e){var t=e.rotation,i=e.strokeLinecap,a=e.textColor,r=e.textSize,o=e.pathColor,n=e.pathTransition,s=e.pathTransitionDuration,l=e.trailColor,c=e.backgroundColor,d=null==t?void 0:"rotate("+t+"turn)",u=null==t?void 0:"center center";return{root:{},path:v({stroke:o,strokeLinecap:i,transform:d,transformOrigin:u,transition:n,transitionDuration:null==s?void 0:s+"s"}),trail:v({stroke:l,strokeLinecap:i,transform:d,transformOrigin:u}),text:v({fill:a,fontSize:r}),background:v({fill:c})}}function v(e){return Object.keys(e).forEach((function(t){null==e[t]&&delete e[t]})),e}},1009:()=>{}}]);
//# sourceMappingURL=8095.cb1b1d26.chunk.js.map