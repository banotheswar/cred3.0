import React, { useEffect, useState } from "react";

import { UseFormValidations } from "../../../validations/UseFormValidation";
import { useNavigate, useParams } from "react-router-dom";
import { getList, phoneFormat } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";
import moment from "moment";

const DoctorSearching = () => {
  const [search, setSearch] = useState({});
  const [getSearchByUsers, setGetSearchByUsers] = useState();

  const navigate = useNavigate();
  const { providerType } = useParams();
  const { data, headerlink, handleChange } = UseFormValidations({});
  const [providersList, setProvidersList] = useState({ list: [], filter: [] });

  const getAllList = async () => {
    let jsonObjects = {
      userId: 0,
      type: providerType,
    };
    let res = await getList(urls?.settings?.getAllUsers, { jsonObjects });
    setProvidersList({
      ...providersList,
      ["list"]: [],
      ["filter"]: res,
    });
  };

  console?.log(getSearchByUsers?.length, "getSearchByUsers");

  const getusersbySearch = async () => {
    let jsonObjects = {
      searchText: data?.name ? data?.name : data?.npi,
      searchType: data?.name ? "Name" : "NPI",
      type: providerType,
    };
    let res = await getList(urls?.Appointments?.getUsersBySearch, {
      jsonObjects,
    });
    setGetSearchByUsers(res);
  };

  const handleSearch = (key) => (e) => {
    setSearch({ [key]: e?.target.value });
  };

  useEffect(() => {
    headerlink([
      {
        name: "Create Appointment",
        link: "/outpatientpro/facility/appointment",
      },
      {
        name: "Search Provider",
        link: `/outpatientpro/facility/appointment/searchdoctor/${providerType}`,
        active: true,
      },
    ]);
    // getAllList();
  }, []);

  useEffect(() => {
    if (
      (data?.name && data?.name?.length > 2) ||
      (data?.npi && data?.npi?.length > 2)
    ) {
      getusersbySearch();
    } else {
      setGetSearchByUsers([]);
    }
  }, [data?.name || data?.npi]);

  useEffect(() => {
    if (search?.name || search?.npi) {
      let array = providersList?.filter?.sort();
      const filtered = array?.filter(
        (row) =>
          row?.userName
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.name?.toLowerCase()) ||
          row?.npi
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.npi?.toLowerCase())
      );

      setProvidersList({ ...providersList, ["list"]: filtered?.sort() });
    } else {
      setProvidersList({ list: [], filter: providersList?.filter });
    }
  }, [search]);

  return (
    <div className=" container-fluid bg-white px-3 py-3">
      <h5 className="">Appoint a New Doctor</h5>
      <hr />
      <div className="p-2">
        <div className="dashboard-headings">
          To begin, search for a Doctor below.
        </div>
      </div>
      <div className="row px-2">
        <div className="col-md-auto col-sm-12">
          <label>Search by Name</label>
          <div>
            <input
              type="search"
              placeholder="Provider Name"
              value={data?.name}
              onChange={handleChange("name")}
              className="header-search search-control  mt-1"
              style={{
                backgroundImage:
                  "url('https://tse2.mm.bing.net/th?id=OIP.4a0TA-wGQra-URSbFAHBzQHaHN&pid=Api&P=0')",
                backgroundPosition: "5px center",
                backgroundRepeat: "no-repeat",
                paddingLeft: "35px",
                backgroundSize: "15px",
              }}
            />
          </div>
        </div>
        <div className="col-md-auto col-sm-12">
          <label>Search by NPI</label>
          <div>
            <input
              type="search"
              placeholder="NPI #"
              value={data?.npi}
              onChange={handleChange("npi")}
              className="header-search search-control  mt-1"
              style={{
                backgroundImage:
                  "url('https://tse2.mm.bing.net/th?id=OIP.4a0TA-wGQra-URSbFAHBzQHaHN&pid=Api&P=0')",
                backgroundPosition: "5px center",
                backgroundRepeat: "no-repeat",
                paddingLeft: "35px",
                backgroundSize: "15px",
              }}
            />
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        {getSearchByUsers == null
          ? "No records found."
          : getSearchByUsers?.map((v) => {
              return (
                <div className="  col-md-4 ">
                  <div
                    class="border  mx-1 mt-1 py-3 px-3 col-12 rounded"
                    style={{ minHeight: "16rem" }}
                  >
                    <div className="f20 ">{v?.userName}</div>
                    <div className="row ">
                      <label className="col-3 mt-1">Specialty {}</label>
                      <div className="col-9 ">
                        :{" "}
                        {v?.speciality?.map((val, i) => {
                          return (
                            <>
                              {val?.label && <>{val?.label} </>}
                              {v?.speciality?.length - 1 != i && ","}
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="row ">
                      <label className="col-3 mt-1">NPI #</label>
                      <div className="col-8 ">: {phoneFormat(v?.npi)}</div>
                    </div>

                    <div className="row ">
                      <label className="col-3 mt-1">License#</label>
                      <div className="col-9 ">: {phoneFormat(v?.dea)}</div>
                    </div>

                    <div className="row ">
                      <label className="col-3 mt-1">DOB</label>
                      <div className="col-8 ">
                        : {moment(v?.dob)?.format("MM/DD/YYYY")}
                      </div>
                    </div>

                    <div className="row">
                      <label className="col-3 mt-1">Email</label>
                      <div
                        className="col-8 text-wrap"
                        style={{ wordWrap: "break-word" }}
                      >
                        {" "}
                        : {v?.email}
                      </div>
                    </div>

                    <div>
                      <button
                        className="border rounded col-md-5 p-2 f14 mt-4 pointer  d-flex align-items-center justify-content-center text-center text-white"
                        style={{ background: " #0073EE" }}
                        onClick={() =>
                          navigate(
                            `/outpatientpro/facility/appointment/newappointment/${providerType}/${v?.userId}`
                          )
                        }
                      >
                        Select Provider
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="p-2">
        {" "}
        <div className=" col-md-3  mt-4 p-3 px-3  border rounded">
          <div className="label-linebar">Don’t see who you’re looking for?</div>

          <button
            className="border rounded col-md-6 p-2 mt-4 f14  d-flex align-items-center justify-content-center pointer text-white "
            style={{ background: "#00B948" }}
            onClick={() =>
              navigate(
                `/outpatientpro/facility/appointment/newappointment/${providerType}`
              )
            }
          >
            + Add Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearching;
