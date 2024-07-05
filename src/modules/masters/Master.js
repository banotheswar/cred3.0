import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BiEdit } from "react-icons/bi";
import ReactTable from "../../share_components/ReactTable";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import {
  TableActionBoutton,
  filterSearch,
  getList,
  save,
} from "../../api_services/SharedServices";
import { urls } from "../../api_services/url";
import { UseFormValidations } from "../../validations/UseFormValidation";
import AddMasterModal from "./AddMasterModal";
import { ListOfCards } from "../../share_components/ListOfCards";
import Table from "../../share_components/Table";
const Master = () => {
  const [masterList, setMasterList] = useState([]);
  const [getData, setGetData] = useState([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState("");
  const [search, setSearch] = useState("");
  const { data, handleChangeSearch } = UseFormValidations({});
  const returnOptionValue = (array, key, label, value) => {
    let filterObject = (array?.filter((v) => v?.[key] == data?.[value]))[0];
    return filterObject?.[label] != undefined
      ? { label: filterObject?.[label], value: filterObject?.[value] }
      : "";
  };
  const { headerlink } = UseFormValidations({});
  useEffect(() => {
    headerlink([
      {
        name: "Masters",
        link: "/outpatientpro/facility/masters/",
        active: true,
      },
    ]);
  }, []);

  const status = async (row) => {
    let jsonObjects = {
      globalId: row?.globalId,
      status: row?.status == "Active" ? "InActive" : "Active",
      type: row?.type,
    };
    let res = await save(urls?.masters?.status, { jsonObjects });
    if (res?.data?.status) {
      setUpdate(res);
    }
  };
  const columnsbasedonoptions = () => {
    switch (data?.type) {
      case "Health Document":
        return columns1;
      case "Credential Type":
        return columns2;
      case "Credentialing Category":
        return columns1;
      default:
        return columns;
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="pointer" title={row?.name}>
          {row?.name}
        </div>
      ),
      sortable: true,
      key: "name",
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="pointer" onClick={() => status(row)}>
          {row?.status == "Active" ? (
            <MdToggleOn title="Active" color="green" size={30} />
          ) : (
            <MdToggleOff title="InActive" color="#F4364C" size={30} />
          )}
        </div>
      ),
      width: "15rem",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {TableActionBoutton([
            {
              name: "Edit",
              modalName: setModal,
              value: row,
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },
          ])}
        </>
      ),
      width: "15rem",
    },
  ];
  const columns1 = [
    {
      name: "Name",
      selector: (row) => (
        <div className="pointer" title={row?.name}>
          {row?.name}
        </div>
      ),
      sortable: true,
      key: "name",
    },
    {
      name: "Credential Type ",
      selector: (row) => (
        <div className="pointer">
          {row?.additionalData &&
            row?.additionalData?.length > 0 &&
            row?.additionalData?.map((v) => {
              return v?.credentialType;
            })}
        </div>
      ),
      sortable: true,
      key: "additionalData",
      subKey: "credentialType",
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="pointer" onClick={() => status(row)}>
          {row?.status == "Active" ? (
            <MdToggleOn title="Active" color="green" size={30} />
          ) : (
            <MdToggleOff title="InActive" color="#F4364C" size={30} />
          )}
        </div>
      ),
      width: "15rem",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {TableActionBoutton([
            {
              name: "Edit",
              modalName: setModal,
              value: row,
              icon: <BiEdit className="mb-1" color="#0073EE" size={20} />,
            },
          ])}
        </>
      ),
      width: "15rem",
    },
  ];
  const columns2 = [
    {
      name: "Name",
      selector: (row) => (
        <div className="pointer" title={row?.name}>
          {row?.name}
        </div>
      ),
      sortable: true,
      key: "name",
    },
    {
      name: "Credential Type",
      selector: (row) => (
        <div className="pointer">
          {row?.additionalData &&
            row?.additionalData?.length > 0 &&
            row?.additionalData?.map((v) => {
              return v?.credentialType;
            })}
        </div>
      ),
      sortable: true,
      key: "additionalData",
      subKey: "credentialType",
    },
    {
      name: "Category",
      selector: (row) => (
        <div className="pointer">
          {row?.additionalData &&
            row?.additionalData?.length > 0 &&
            row?.additionalData?.map((v) => {
              return v?.category;
            })}
        </div>
      ),
      sortable: true,
      key: "additionalData",
      subKey: "category",
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="pointer" onClick={() => status(row)}>
          {row?.status == "Active" ? (
            <MdToggleOn title="Active" color="green" size={30} />
          ) : (
            <MdToggleOff title="InActive" color="#F4364C" size={30} />
          )}
        </div>
      ),
      width: "15rem",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {TableActionBoutton([
            {
              name: "Edit",
              modalName: setModal,
              value: row,
              icon: <BiEdit className="" color="#0073EE" size={20} />,
            },
          ])}
        </>
      ),
      width: "15rem",
    },
  ];

  const getGridList = async () => {
    let jsonObjects = {
      globalId: 0,
      type: data?.type=="Speciality - AHP"?"Allied Health Professionals":data?.type=="Speciality - Doctor"?"Speciality":data?.type
    };
    let res = await getList(urls?.masters.getList, { jsonObjects });
    setGetData(res);
  };
  const getMasterList = async () => {
    let jsonObjects = {
      type: "Masters",
    };
    let res = await getList(urls?.settings?.getStatesdd, { jsonObjects });
    res?.map((v) => {
      if (v?.type == "Allied Health Professionals") {
        v["type"] = "Speciality - AHP";
       
      }
    });
    res?.map((v) => {
      if (v?.type=="Speciality") {
        
        v["type"]="Speciality - Doctor"
      }
    });
    setMasterList(res);
    data["type"] = res[0]?.type;
  };
  console.log(masterList, "123");
  useEffect(() => {
    getMasterList();
  }, []);
  useEffect(() => {
    getGridList();
  }, [update, data?.type]);
  return (
    <>
      <div className=" bg-white p-3  ">
        <div className=" row pb-2">
          <div className="col-xl-3 col-lg-2  col-md-3 mobile_Header">
            <div className=" f30 medium">Masters</div>
          </div>
          <div className="col-md-3 show_header">
            <h4 className="py-1 ">Masters</h4>
          </div>
          <div className="col-xl-3  col-lg-3  col-md-4 py-1">
            {filterSearch(setSearch, search)}
          </div>
          <div className="col-xl-4 col-lg-5 col-md-5  d-flex justify-content-end gap-2 py-1">
            <div className="col-md-8 " style={{ zIndex: "99", width: "100%" }}>
              <Select
                className=""
                value={returnOptionValue(
                  masterList || [],
                  "type",
                  "type",
                  "type"
                )}
                name="type"
                options={masterList?.map((v) => {
                  return { label: v.type, value: v.type };
                })}
                onChange={handleChangeSearch("type")}
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-2  col-md-3 py-1">
            <div
              className="border save rounded pointer text-white text-center p-2 px-3"
              onClick={() => setModal(true)}
            >
              Create New
            </div>
          </div>
        </div>
        <div className="mobile_Header">
          <Table
            dataTable={getData || []}
            columns={columnsbasedonoptions()}
            search={search}
            pege={"10"}
            // tableCss={{min:"55px",max:"55px"}}
          />
        </div>
        {modal && (
          <AddMasterModal
            show={modal}
            update={setUpdate}
            masterName={data?.type}
            onHide={() => setModal(false)}
          />
        )}
      </div>
      <div className="show_header">
        {" "}
        <ListOfCards
          array={getData || []}
          status={status}
          pege={"10"}
          setModal={setModal}
          masterList={masterList}
          returnOptionValue={returnOptionValue}
          searchMaster={search}
          title={"Masters"}
          name={"Master"}
        />
      </div>
    </>
  );
};
export default Master;
