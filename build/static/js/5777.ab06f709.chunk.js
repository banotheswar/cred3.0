/*! For license information please see 5777.ab06f709.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5777],{15777:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p});var a=r(72791),i=r(57689),n=r(19907),o=r(59391),s=r(3243),l=r(67922),d=r(43860),c=r(80184);const u=()=>{const{headerlink:e}=(0,n.L)({}),t=(0,i.s0)(),{providerId:r}=(0,i.UO)(),[u,p]=(0,a.useState)([]),[h,v]=(0,a.useState)([]);(0,a.useEffect)((()=>{e([{name:"My Providers",link:"/outpatientpro/delegate/allproviders",active:!0}]),(async()=>{var e;let t={userId:0,delegateId:sessionStorage.getItem("userId")},r=await(0,l.gp)(null===d.jk||void 0===d.jk||null===(e=d.jk.settings)||void 0===e?void 0:e.getAllUsers,{jsonObjects:t});null===r||void 0===r||r.map((e=>{var t,r;e.speciality=null===e||void 0===e||null===(t=e.speciality)||void 0===t?void 0:t.map((e=>null===e||void 0===e?void 0:e.label)),e.facilityId=null===e||void 0===e||null===(r=e.facilityId)||void 0===r?void 0:r.map((e=>null===e||void 0===e?void 0:e.label))})),p(r)})()}),[h]);const m=[{number:"3",name:"FACILITY REQUESTS"},{number:"5",name:"CREDENTIALS"}],f=[{number:"2",name:"HEALTH DOCUMENTS"},{number:"1",name:"SIGNATURE REQUESTS"}],x=[{name:"Name",selector:e=>(0,c.jsx)("div",{className:"link-hover",children:null===e||void 0===e?void 0:e.name}),sortable:!0},{name:"Provider",selector:e=>(0,c.jsx)("div",{className:"text-wrap",title:e.provider,children:null===e||void 0===e?void 0:e.provider})},{name:"Days to Exp",selector:e=>(0,c.jsx)("div",{className:"text-wrap",title:e.daysExp,children:null===e||void 0===e?void 0:e.daysExp})},{name:"Action",selector:e=>(0,c.jsx)("div",{className:"border bg-secondary text-center text-white rounded ",style:{width:"4rem"},children:null===e||void 0===e?void 0:e.status}),sortable:!0},,];return(0,a.useEffect)((()=>{e([{name:"Dashboard",link:"/outpatientpro/delegate/alldashboard",active:!0}])}),[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"bg-white",children:(0,c.jsx)("h5",{className:"p-3",children:"My Dashboard"})}),(0,c.jsxs)("div",{className:"d-flex gap-3  ",children:[(0,c.jsxs)("div",{className:"row col-md-4 bg-white",children:[(0,c.jsx)("div",{className:"f22 col-md-12 p-3",children:"Needs Attention (11) "}),(0,c.jsx)("div",{className:" d-flex gap-4  align-items-center justify-content-center",children:null===m||void 0===m?void 0:m.map((e=>(0,c.jsx)("div",{className:"col-md-4 d-flex justify-content-around ",children:(0,c.jsx)("div",{className:"   ",style:{height:"163px",width:"163px"},children:(0,c.jsxs)(o.Wo,{value:null===e||void 0===e?void 0:e.number,strokeWidth:3,styles:(0,o.y3)({textColor:"red",pathColor:"#B72520",trailColor:"gold"}),children:[(0,c.jsx)("div",{className:"",style:{fontSize:"48px",marginTop:"-18px"},children:null===e||void 0===e?void 0:e.number}),(0,c.jsxs)("div",{className:"f14 ",style:{opacity:"70%",textAlign:"center",maxWidth:"80%"},children:[null===e||void 0===e?void 0:e.name," "]})]})})})))}),(0,c.jsx)("div",{className:" d-flex gap-4  align-items-center  justify-content-center",children:null===f||void 0===f?void 0:f.map((e=>(0,c.jsx)("div",{className:"col-md-4 d-flex justify-content-around ",children:(0,c.jsx)("div",{className:"   ",style:{height:"163px",width:"163px"},children:(0,c.jsxs)(o.Wo,{value:null===e||void 0===e?void 0:e.number,strokeWidth:3,styles:(0,o.y3)({textColor:"red",pathColor:"#B72520",trailColor:"gold"}),children:[(0,c.jsx)("div",{className:"",style:{fontSize:"48px",marginTop:"-18px"},children:null===e||void 0===e?void 0:e.number}),(0,c.jsxs)("div",{className:"f14 ",style:{opacity:"70%",textAlign:"center",maxWidth:"80%"},children:[null===e||void 0===e?void 0:e.name," "]})]})})})))})]}),(0,c.jsxs)("div",{className:" col-md-8 bg-white",children:[(0,c.jsx)("div",{className:"f22 col-md-12 p-3",children:"Expiring Credentials (5)"}),(0,c.jsx)(s.Z,{dataTable:[{name:"ACLS Certification",provider:"Orange County Surgical",daysExp:"2",status:"Update"},{name:"CA State Medical License",provider:"Orange County Surgical",daysExp:"7",status:"Update"},{name:"Surgical License XYZ",provider:"Ghozland Surgery Center",daysExp:"22",status:"Update"},{name:"Board Certification",provider:"Orange County Surgical",daysExp:"48",status:"Update"},{name:"Other License",provider:"Orange County Surgical",daysExp:"89",status:"Update"}],columns:x})]})]}),(0,c.jsxs)("div",{className:"bg-white mt-2",children:[(0,c.jsx)("div",{className:"f22 col-md-12 p-3",children:"My Providers "}),(0,c.jsx)("div",{className:" row",children:(0,c.jsx)("div",{className:" d-flex col-md-12 p-4 gap-5   ",children:null===u||void 0===u?void 0:u.map((e=>{var r,a;return(0,c.jsxs)("div",{className:"col-auto   ",children:[(0,c.jsx)("div",{className:"circle-container",value:null===e||void 0===e?void 0:e.firstName,strokeWidth:3,children:(0,c.jsxs)("div",{className:" d-flex align-items-center justify-content-center",style:{fontSize:"30px"},children:[null===e||void 0===e||null===(r=e.firstName)||void 0===r?void 0:r.charAt(0)," ",null===e||void 0===e||null===(a=e.lastName)||void 0===a?void 0:a.charAt(0)]})}),(0,c.jsx)("div",{className:"f17 pointer d-flex align-items-center justify-content-center",onClick:()=>t("/outpatientpro/provider/facility/facilityprofile/".concat(null===e||void 0===e?void 0:e.providerId)),children:(0,c.jsxs)("u",{children:[null===e||void 0===e?void 0:e.enterpriseName," "]})}),(0,c.jsx)("div",{className:"f14 d-flex align-items-center justify-content-center",children:"Privileged"})]})}))})})]})]})},p=()=>(0,c.jsx)(i.Z5,{children:(0,c.jsx)(i.AW,{path:"/",element:(0,c.jsx)(u,{})})})},3243:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(72791),i=r(43513),n=r(80184);const o=e=>{let{dataTable:t,columns:r,filyterKeys:o}=e;const[s,l]=(0,a.useState)([]);return(0,a.useEffect)((()=>{l(t)}),[t]),(0,n.jsx)(i.ZP,{data:(s||[]).slice(0,5),columns:r||[],customStyles:{title:{style:{fontColor:"red",fontWeight:"600",borderRadius:"10%"}},headCells:{style:{fontFamily:"Roboto",fontSize:"16px",fontWeight:"500",background:"#ffff 0% 0% no-repeat padding-box",color:"#3A3952",hover:"#6f7eed",minWidth:"75px",cursor:"pointer"}},cells:{style:{fontFamily:"Roboto",fontSize:"15px",fontWeight:400,lineHeight:1.5,color:"#3A3952",borderBottom:"none",opacity:1,letterSpacing:"0px",border:"gray"}},pagination:{style:{fontSize:"16px",color:"black"}}},fixedHeader:!0,fixedHeaderScrollHeight:"auto"})}},59391:(e,t,r)=>{r.d(t,{Wo:()=>p,y3:()=>h});var a=r(72791),i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},i(e,t)};var n=function(){return n=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};var o=50,s=50;function l(e){var t=e.className,r=e.counterClockwise,i=e.dashRatio,n=e.pathRadius,o=e.strokeWidth,s=e.style;return(0,a.createElement)("path",{className:t,style:Object.assign({},s,c({pathRadius:n,dashRatio:i,counterClockwise:r})),d:d({pathRadius:n,counterClockwise:r}),strokeWidth:o,fillOpacity:0})}function d(e){var t=e.pathRadius,r=e.counterClockwise?1:0;return"\n      M "+o+","+s+"\n      m 0,-"+t+"\n      a "+t+","+t+" "+r+" 1 1 0,"+2*t+"\n      a "+t+","+t+" "+r+" 1 1 0,-"+2*t+"\n    "}function c(e){var t=e.counterClockwise,r=e.dashRatio,a=e.pathRadius,i=2*Math.PI*a,n=(1-r)*i;return{strokeDasharray:i+"px "+i+"px",strokeDashoffset:(t?-n:n)+"px"}}var u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return function(e,t){function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),t.prototype.getBackgroundPadding=function(){return this.props.background?this.props.backgroundPadding:0},t.prototype.getPathRadius=function(){return 50-this.props.strokeWidth/2-this.getBackgroundPadding()},t.prototype.getPathRatio=function(){var e=this.props,t=e.value,r=e.minValue,a=e.maxValue;return(Math.min(Math.max(t,r),a)-r)/(a-r)},t.prototype.render=function(){var e=this.props,t=e.circleRatio,r=e.className,i=e.classes,n=e.counterClockwise,d=e.styles,c=e.strokeWidth,u=e.text,p=this.getPathRadius(),h=this.getPathRatio();return(0,a.createElement)("svg",{className:i.root+" "+r,style:d.root,viewBox:"0 0 100 100","data-test-id":"CircularProgressbar"},this.props.background?(0,a.createElement)("circle",{className:i.background,style:d.background,cx:o,cy:s,r:50}):null,(0,a.createElement)(l,{className:i.trail,counterClockwise:n,dashRatio:t,pathRadius:p,strokeWidth:c,style:d.trail}),(0,a.createElement)(l,{className:i.path,counterClockwise:n,dashRatio:h*t,pathRadius:p,strokeWidth:c,style:d.path}),u?(0,a.createElement)("text",{className:i.text,style:d.text,x:o,y:s},u):null)},t.defaultProps={background:!1,backgroundPadding:0,circleRatio:1,classes:{root:"CircularProgressbar",trail:"CircularProgressbar-trail",path:"CircularProgressbar-path",text:"CircularProgressbar-text",background:"CircularProgressbar-background"},counterClockwise:!1,className:"",maxValue:100,minValue:0,strokeWidth:8,styles:{root:{},trail:{},path:{},text:{},background:{}},text:""},t}(a.Component);function p(e){e.children;var t=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&(r[a[i]]=e[a[i]])}return r}(e,["children"]);return(0,a.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren"},(0,a.createElement)("div",{style:{position:"relative",width:"100%",height:"100%"}},(0,a.createElement)(u,n({},t)),e.children?(0,a.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren__children",style:{position:"absolute",width:"100%",height:"100%",marginTop:"-100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},e.children):null))}function h(e){var t=e.rotation,r=e.strokeLinecap,a=e.textColor,i=e.textSize,n=e.pathColor,o=e.pathTransition,s=e.pathTransitionDuration,l=e.trailColor,d=e.backgroundColor,c=null==t?void 0:"rotate("+t+"turn)",u=null==t?void 0:"center center";return{root:{},path:v({stroke:n,strokeLinecap:r,transform:c,transformOrigin:u,transition:o,transitionDuration:null==s?void 0:s+"s"}),trail:v({stroke:l,strokeLinecap:r,transform:c,transformOrigin:u}),text:v({fill:a,fontSize:i}),background:v({fill:d})}}function v(e){return Object.keys(e).forEach((function(t){null==e[t]&&delete e[t]})),e}}}]);
//# sourceMappingURL=5777.ab06f709.chunk.js.map