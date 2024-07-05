
import React, { useEffect, useState } from "react";



import { useLocation } from "react-router-dom";
import { IoIosCheckmarkCircle, IoIosRadioButtonOn } from "react-icons/io";
import { UseFormValidations } from "../validations/UseFormValidation";
import { GiCrossedAxes } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { IoAlertCircleSharp } from "react-icons/io5";


const CredFormsMobile = ({state,formList,formname,openForm,open,doctordtails,setChildFormValue,openchild,click,childformname}) => {
  // const [formname, setFormName] = useState("Identifying Information");
  const { headerlink } = UseFormValidations({});


return (
  <div className="position-fixed border bg-white rounded left-0" style={{zIndex: "1000", overflowY: "auto", maxHeight: "87vh"}}>
    <div className="d-flex justify-content-between f13 px-2 py-2">All Forms <RxCross2 size={20} onClick={()=>state(false)}/></div>
     
    <div className="col-md-12 " >
            {formList?.map((v, index) => {
              return (
                <>
                <div
                      className={
                        formname?.formName == v?.formName
                          ? "  d-flex  border-top-bottom selectedformbg justify-content-between"
                          : " d-flex  border-top-bottom justify-content-between"
                      }
                      style={{ height: "40px" }}
                      key={index}
                    >
                      <div
                        className={
                          formname?.formName == v?.formName
                            ? "selected-form-font divointer col-md-11  d-flex align-items-center px-2"
                            : "pointer form-font col-md-11 d-flex align-items-center px-2"
                        }
                        onClick={() =>
                          !(
                            v?.additionalData &&
                            v?.additionalData?.some((v) => v?.credCategory)
                          )
                            ? openForm(v, index)
                            : openchild(v, index)
                        }
                      >
                        <span>{v?.formName}</span>
                      </div>

                      {
                        <div className="col-md-1 d-flex  align-items-center">
                          {(doctordtails?.appointmentType == "Onboarding"
                            ? sessionStorage?.getItem("roleId") == 4
                            : sessionStorage?.getItem("roleId") == 5 ||
                              sessionStorage.getItem("roleId") == 6) &&
                            v?.finalSubmit === "Yes" &&
                            v?.requested == "No" && (
                              <IoIosCheckmarkCircle
                                color={
                                  formname?.formName == v?.formName
                                    ? "#0073E6"
                                    : "#00B948"
                                }
                                size={16}
                                style={{ fontSize: "16px" }}
                              />
                            )}
                          {(doctordtails?.appointmentType == "Onboarding"
                            ? sessionStorage?.getItem("roleId") <= 3
                            : sessionStorage?.getItem("roleId") <= 4) &&
                            // sessionStorage.getItem("roleId") <= 4
                            v?.saveLog === "Yes" &&
                            v?.finalLock == "Yes" && (
                              <IoIosCheckmarkCircle
                                color={
                                  formname?.formName == v?.formName
                                    ? "#0073E6"
                                    : "#00B948"
                                }
                                size={16}
                                style={{ fontSize: "16px" }}
                              />
                            )}
                          {
                            //  (sessionStorage.getItem("roleId") == 5|| sessionStorage.getItem("roleId") == 6) &&
                            v?.finalSubmit === "No" &&
                              v?.requested == "Yes" && (
                                <IoAlertCircleSharp
                                  color={
                                    formname?.formName == v?.formName
                                      ? "#0073E6"
                                      : "#D5352F"
                                  }
                                  size={16}
                                  style={{ fontSize: "16px" }}
                                />
                              )
                          }
                        </div>
                      }
                    </div>
                    <div>
                      {click == index &&
                        v?.additionalData &&
                        v?.additionalData?.map((sub, i) => {
                          console?.log(doctordtails?.appointmentType=="Onboarding"?"sa":"i",(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)&& sub?.finalSubmit == "Yes" && sub?.requested == "No" ,"sss",sessionStorage?.getItem("roleId") ==4,sessionStorage?.getItem("roleId") ==5,sessionStorage?.getItem("roleId") ==6,"sess",sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)
                          return (
                            <>
                              {sub?.credCategory && (
                                <div
                                  onClick={() => openForm(v, index)}
                                  className={
                                    childformname == sub?.credCategory
                                      ? "  d-flex  border-top-bottom selectedformbg justify-content-between"
                                      : " d-flex  border-top-bottom justify-content-between"
                                  }
                                  style={{ height: "40px" }}
                                  key={index}
                                >
                                  <div
                                className={
                                  childformname == sub?.credCategory
                                    ? "selected-form-font divointer col-md-11  d-flex align-items-center px-4"
                                    : "pointer form-font col-md-11 d-flex align-items-center px-4"
                                }
                                onClick={() => setChildFormValue(sub, sub?.credCategory)}
                              >
                                <span>{sub?.credCategory}</span>
                              </div>{<div className="col-md-1 d-flex  align-items-center">
                                
                              {(doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") ==4:sessionStorage?.getItem("roleId") ==5||sessionStorage?.getItem("roleId") ==6)&& sub?.finalSubmit == "Yes" && sub?.requested == "No" &&
                                 
                                 <IoIosCheckmarkCircle
                                   color={childformname == sub?.credCategory ? "#0073E6" : "#00B948"}
                                   size={16}
                                   style={{ fontSize: "16px" }}
                                 />
                               }
                               {
                                
                                (doctordtails?.appointmentType=="Onboarding"?sessionStorage?.getItem("roleId") <=3:sessionStorage?.getItem("roleId") <=4)&& sub?.saveLog == "Yes" && v?.finalLock == "Yes" &&
                                  <IoIosCheckmarkCircle
                                    color={childformname == sub?.credCategory? "#0073E6" : "#00B948"}
                                    size={16}
                                    style={{ fontSize: "16px" }}
                                  />
                                }
                                {
                                     sub?.finalSubmit === "No" && sub?.requested == "Yes"
                                    &&
                                    <IoAlertCircleSharp
                                      color={childformname == sub?.credCategory ? "#0073E6" : "#D5352F"}
                                      size={16}
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                </div>}
                                  
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div></>




              );
            })}
          </div>
   
  </div>
  );
};

export default CredFormsMobile;
