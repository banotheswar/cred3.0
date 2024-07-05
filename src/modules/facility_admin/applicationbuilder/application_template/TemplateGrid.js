import React, { useEffect, useRef, useState } from "react";
import ReactTable from "../../../../share_components/ReactTable";
import { MdSearch } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoPricetags, IoToggle, IoToggleOutline } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { UseFormValidations } from "../../../../validations/UseFormValidation";
import { useNavigate, useParams } from "react-router-dom";
import CreateTemplateNameModal from "./modals/CreateTemplateNameModal";
import { wait } from "@testing-library/user-event/dist/utils";
import {
  TableActionBoutton,
  filterSearch,
  formStatus,
  getList,
  save,
  statusFun,
} from "../../../../api_services/SharedServices";
import { urls } from "../../../../api_services/url";
import { IoIosMenu } from "react-icons/io";
import AddTagsModal from "./modals/AddTagsModal";
import Table from "../../../../share_components/Table";
import { type } from "@testing-library/user-event/dist/type";

const TemplateGrid = ({ heading ,addfields}) => {
  const [search, setSearch] = useState("");
  const { data, headerlink, setValues } = UseFormValidations({});
  const [templateNameModal, setTemplateNameModal] = useState(false);
  const [allforms, setAllforms] = useState([]);
  const [addTagsModal, setAddTagsModal] = useState(false);
  const { packageId } = useParams();
  const navigate = useNavigate();
  let obj = JSON.parse(sessionStorage.getItem("template"));

  const [update, setUpdate] = useState([]);
  const submit = async (value) => {
    let jsonObjects = {
      packageId: value?.packageId,
      packageName: value?.packageName,
      type: value?.type,
      speciality: value?.speciality,
    };

    let res = await save(urls.applicationBuilder.saveTemplate, { jsonObjects });
    if (res?.data?.status) {
      sessionStorage.setItem("template", JSON.stringify(value));
      setAddTagsModal(false);
    }
  };
  const getAllForm = async () => {
    let jsonObjects = { formId: 0, packageId: packageId > 0 ? packageId : 0,type:"", roleId:sessionStorage?.getItem("roleId"),
    organizationId:sessionStorage.getItem("organizationId")};
    let res = await getList(urls.applicationBuilder.getallForm, {
      jsonObjects,
    });
    setAllforms(res);
  };
  const createForm = async (value) => {
    let jsonObjects = {
      formId: 0,
      formName: value?.formName,
      type: value?.type,
      additionalData: [],
      packageId: packageId,
    };
    let res = await save(urls?.applicationBuilder.saveFrom, { jsonObjects });
    setUpdate(res);
    setTemplateNameModal(false);
  };
  
  useEffect(() => {
    if (heading === "Application Template") {
      headerlink([
        // Links specific to "Application Template"
        {
          name: "Application Builder",
          link: "/outpatientpro/facility/applicationBuilder",
        },
        {
          name: "Application Template List",
          link: "/outpatientpro/facility/applicationBuilder/application_template",
        },
        {
          name: "All Application Template List",
          link: `/outpatientpro/facility/applicationBuilder/application_template/all`,
        },
        {
          name: "Application form List",
          link: `/outpatientpro/facility/applicationBuilder/application_template/all/${packageId}`,
          active: true,
        },
      ]);
    } else if (heading === "Facility Document") {
      headerlink([
        // Links specific to "Facility Document"
        {
          name: "Application Builder",
          link: "/outpatientpro/facility/applicationBuilder",
        },
        {
          name: "All Facility documents",
          link: "/outpatientpro/facility/applicationBuilder/facilitydocuments",
        },
        {
          name: "Facility Document Forms",
          link: `/outpatientpro/facility/applicationBuilder/facilit_document/all/${packageId}`,
          active: true,
        },
      ]);
    } else if (heading === "Peer References") {
      headerlink([
        // Links specific to "Peer References"
        {
          name: "Application Builder",
          link: "/outpatientpro/facility/applicationBuilder",
        },
        {
          name: "All Peer References",
          link: "/outpatientpro/facility/applicationBuilder/peerreferences",
        },
        {
          name: "Peer References Forms",
          link: "/outpatientpro/facility/applicationBuilder/peer_references",
        },
        // You can add more links here specific to "Peer References"
      ]);
    }
    setValues(obj);
  }, []);
  
  console?.log(obj?.speciality, "obj");
  useEffect(() => {
    getAllForm();
  }, [update]);

  const selectedIndex = useRef(0);
  const enddropedIndex = useRef(0);

  const sortingForm = async (newItems) => {
    newItems?.map((v, i) => {
      v["index"] = i;
    });
    let jsonObjects = {
      formId: 0,
      packageId: packageId,
      type: "Sorting",
      sortingArray: newItems,
    };
    let res = await save(urls?.applicationBuilder.sortingForms, {
      jsonObjects,
    });
    console?.log(res);
  };
  const handleSort = () => {
    const newItems = [...allforms];
    const temp = newItems[selectedIndex.current];
    newItems[selectedIndex.current] = newItems[enddropedIndex.current];
    newItems[enddropedIndex.current] = temp;
    setAllforms(newItems);
    if (selectedIndex.current != enddropedIndex.current) {
      sortingForm(newItems);
    }
  };



  const formNamesnavigate=(heading,row)=>{
    switch (heading) {
      case "Application Template": return  `/outpatientpro/facility/applicationBuilder/application_template/all/forms/${row?.formId}/${row?.packageId}`
          // : "facilit_document"}
      case "Facility Document": return `/outpatientpro/facility/applicationBuilder/facilit_document/all/forms/${row?.formId}/${row?.packageId}`
      case "Peer References": return `/outpatientpro/facility/applicationBuilder/peer_references/all/forms/${row?.formId}/${row?.packageId}`
    
      default: return ""
    }
  }

  const columns = [
    {
      name: "Form Name",
      selector: (row, index) => (
        <div
          style={{ cursor: "move" }}
          draggable
          onDragStart={() => (selectedIndex.current = index)}
          onDragEnter={() => (enddropedIndex.current = index)}
          onDragEnd={handleSort}
          onDragOver={(event) => event.preventDefault()}
        >
          <IoIosMenu size={20} /> {row?.formName}
        </div>
      ),
      sortable: true,
      key: "formName",
    },
    {
      name: "Form Type",
      selector: (row) => <div>{row?.type}</div>,
      sortable: true,
      key: "type",
    },
    {
      name: "Status",
      selector: (row) => (
        <div onClick={() => formStatus(row, setUpdate)}>{statusFun(row)}</div>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          {TableActionBoutton([
            {
              name: "Edit",
              modalName: navigate,
              value:
              formNamesnavigate(heading,row),
              //  `/outpatientpro/facility/applicationBuilder/${
              //   heading == "Application Template"
              //     ? "application_template"
              //     : "facilit_document"
              // }/all/forms/${row?.formId}/${row?.packageId}`,
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },
          ])}
        </>
      ),
    },
  ];

  return (
    <div className="  bg-white p-4">
      <div className="row py-2 ">
        <div className=" col-xl-7 col-lg-7  col-md-7 py-2">
          <div className="f27 medium ">
            {heading}: <span className="f20">{obj?.packageName}</span>
          </div>
        </div>
        <div className="col-xl-4 col-lg-3 col-lg-3    col-md-3 gap-2  ">
          <div className=" col-xl-8 col-lg-12 col-md-12 py-2">
            {filterSearch(setSearch, search)}
          </div>
        </div>
        <div className="col-xl-1 col-lg-2  col-md-3 py-2  ">
          <button
            className="button-user  border py-2   rounded  "
            style={{ background: " #00B948" }}
            onClick={() => setTemplateNameModal(true)}
          >
            + Add Page
          </button>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-auto">
          {/* <label>ASSIGNED TO :{" "}{allforms&&allforms[0]?.speciality?.map((v)=><span className='label p-1'>{v?.label}</span>)}

</label> */}
          <label className="f14" style={{ fontWeight: "500", opacity: "0.60" }}>
            ASSIGNED TO :
            {obj?.speciality?.map((v, index) => (
              <span key={index}>
                <span className="tags-text  p-1">{v?.label}</span>
                {index !== obj?.speciality?.length - 1 && ", "}
              </span>
            ))}
          </label>
        </div>
        <div className="col-auto">
          <button
            className="border rounded tag-btn    pointer  "
            style={{ background: "#0073EEB3 0% 0% no-repeat padding-box" }}
            onClick={() => setAddTagsModal(true)}
          >
            <IoPricetags size={18} color="#A6CEF9" className="me-1" /> Edit Tags
          </button>
        </div>
      </div>

      {allforms && (
        <Table
          tableCss={{ min: "64px", max: "55px" }}
          dataTable={allforms || []}
          columns={columns}
          search={search}
          paginate={packageId=="forms"?true:false}
          packageId={packageId}
        />
      )}

      {templateNameModal && (
        <CreateTemplateNameModal
          submit={createForm}
          show={templateNameModal}
          onHide={() => setTemplateNameModal(false)}
          heading={heading}
        />
      )}

      {addTagsModal && (
        <AddTagsModal
          show={addTagsModal}
          update={setUpdate}
          submit={submit}
          obj={obj}
          onHide={() => setAddTagsModal(false)}
        />
      )}
    </div>
  );
};

export default TemplateGrid;
