import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { getList } from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";

const ApplicationTempList = () => {
  const navigate = useNavigate();
  const { headerlink } = UseFormValidations({});
  const [allTemplate, setTemplate] = useState([]);
  const [update, setUpdate] = useState([]);
  const [allforms, setAllforms] = useState([]);
  const { packageId } = useParams();
  console.log(allforms, "874879", packageId);

  const getAllTemplates = async () => {
    let jsonObjects = { packageId: 0,type:"Application", roleId:sessionStorage?.getItem("roleId"),
    organizationId:sessionStorage.getItem("organizationId"), };
    let res = await getList(urls?.applicationBuilder?.getAllTemplate, {
      jsonObjects,
    });
    setTemplate(res);

    console.log(res, "pout");
  };
  const getAllForm = async () => {
    let jsonObjects = { formId: 0, packageId: packageId > 0 ? packageId : 0, roleId:sessionStorage?.getItem("roleId"),
    organizationId:sessionStorage.getItem("organizationId"), };
    let res = await getList(urls.applicationBuilder.getallForm, {
      jsonObjects,
    });
    setAllforms(res);
  };
  useEffect(() => {
    getAllTemplates();
    getAllForm();
  }, [update]);
  useEffect(() => {
    headerlink([
      {
        name: "Application Builder",
        link: "/outpatientpro/facility/applicationBuilder",
      },
      {
        name: "Application Template List",
        link: "/outpatientpro/facility/applicationBuilder/application_template",
        active: true,
      },
    ]);
  }, []);
  return (
    <div className=" ">
      <div className=" bg-white  ">
        <h5 className="p-3">Application Builder</h5>
      </div>
      <div className="vh-100 bg-white">
        <div className=" p-4 ">
          <div className="f23 medium">Start with an Application Template</div>
          <div className="row">
            <div className="d-flex gap-5 col-xl-10 col-lg-9 col-md-12 mt-2">
              {Array.isArray(allTemplate) &&
                allTemplate?.slice(0, 3).map((v) => (
                  <div
                    className="pointer  "
                    style={{ color: "#1e98d7" }}
                    onClick={() =>
                      navigate(
                        `/outpatientpro/facility/applicationBuilder/application_template/all/${v?.packageId}`
                      )
                    }
                  >
                    {v?.packageName}
                  </div>
                ))}
            </div>

            <div className="col-xl-2 col-lg-3 col-md-4">
              <button
                className="button-user border p-2 px-4 text-white rounded  col-md-12"
                onClick={() =>
                  navigate(
                    "/outpatientpro/facility/applicationBuilder/application_template/all"
                  )
                }
              >
                View all Templates
              </button>
            </div>
          </div>
          <hr />
        </div>
        <div className=" p-4 ">
          <div className="pointer medium f23">
            Start with a Single Form Template
          </div>
          <div className="row">
            <div className="d-flex gap-5 col-xl-10 col-lg-9 col-md-12 mt-2">
              {allforms &&
                allforms?.slice(0, 3).map((v) => (
                  <div
                    className="pointer  "
                    style={{ color: "#1e98d7" }}
                    onClick={() =>
                      navigate(
                        `/outpatientpro/facility/applicationBuilder/application_template/all/forms/${v?.formId}/${v?.packageId}`
                      )
                    }
                  >
                    {v?.formName}
                  </div>
                ))}
            </div>

            <div className="col-xl-2 col-lg-3 col-md-4">
              <button
                className="button-user border p-2 px-4 text-white rounded  col-md-12"
                onClick={() =>
                  navigate(
                    "/outpatientpro/facility/applicationBuilder/application_template/all/forms"
                  )
                }
              >
                View all Forms
              </button>
            </div>
          </div>
          <hr />
        </div>
        <div className="row p-4 ">
          <div className="pointer f23 col-xl-10 col-lg-9 col-md-8 medium">Build Your Own</div>

          <div className=" col-xl-2 col-lg-3 col-md-4 mb-3">
            <button
              onClick={() =>
                navigate(
                  "/outpatientpro/facility/applicationBuilder/application_template/all/forms/create"
                )
              }
              className="button-user border p-2 px-4 text-white rounded  col-md-12"
            >
              Get Started
            </button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ApplicationTempList;
