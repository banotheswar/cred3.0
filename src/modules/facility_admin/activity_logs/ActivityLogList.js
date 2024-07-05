import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactTableTwo from "../../../share_components/ReactTableTwo";
import { ListOfCards } from "../../../share_components/ListOfCards";
import { urls } from "../../../api_services/url";
import moment from "moment";
import { filterSearch, getList } from "../../../api_services/SharedServices";
import { MdSearch } from "react-icons/md";
import Table from "../../../share_components/Table";

const ActivityLogList = () => {
  const navigate = useNavigate();
  const { data, headerlink, handleChange } = UseFormValidations({});
  const [ActivityogList, setActivityLogList] = useState();
  const [search, setSearch] = useState("");
  const [filterlist, setFilterList] = useState([]);

 

  const getActivityLogList = async () => {
    let jsonObjects = {
     
      facilityId: sessionStorage?.getItem("roleId")
    };
    let res = await getList(urls?.activityLogs?.getAuditLogList, {
      jsonObjects,
    });
    setActivityLogList(res);
  };

  useEffect(() => {
    headerlink([
      {
        name: "Activity Log",
        link: "/outpatientpro/facility/activitylogs",
        active: true,
      },
    ]);
    getActivityLogList();
  }, []);

  const columns = [
    {
      name: "Action",
      selector: (row) => <div title={row?.action}>{row?.action}</div>,
      sortable: true,
      width: "600px",
      key:"action"
    },
    {
      name: "Initiated by",
      selector: (row) => <div title={row?.initiated}>{row?.initiated}</div>,
      width: "220px",

      sortable: true,
      key:"initiated"
    },
    {
      name: "Provider",
      selector: (row) => (
        <div className="link-hover-line" title={row?.provider}>
          {row?.provider}
        </div>
      ),

      sortable: true,
      key:"provider"
    },

    {
      name: "Facility User",
      selector: (row) => <div title={row?.user}>{row?.user}</div>,

      sortable: true,
      key:"user"
    },
    {
      name: "Date & Time",

      selector: (row) => (
        <div className="text-wrap" title={row?.logDate}>
          {moment(row?.logDate)?.format("MM/DD/YYYY , h:mm A")}
        </div>
      ),
      sortable: true,
      key:"logDate"
    },
  ];

 

  return (
    <>
      <div className="show_header">
        {" "}
        <ListOfCards
          array={ActivityogList || []}
          title={"Activity Log"}
          name={"ActivityLogList"}
        />
      </div>
      <div className="bg-white mobile_Header">
        <div className="py-4">
          <div className="align-items-center justify-content-between d-flex ">
            <div className="f30 medium  px-4 pt-3 ms-1">Activity Log</div>
            <div className="col-xl-3 col-md-4 px-4">
              {filterSearch(setSearch, search)}
            </div>
          </div>
          <div className="row">
            <div className=" d-flex justify-content-end  ">
              <div className="d-flex me-3">
                <span
                  className=" col-5 f16 mt-3 medium"
                  
                  style={{ color: "#3A3952" }}
                >
                  Show{" "}
                </span>
                <select
                onChange={handleChange("pageCount")}
                  className="col-5 f13   form-select"
                  style={{
                    height: "35px",
                    width: "70px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    marginRight: "27px",
                  }}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100",
            overflow: "scroll",
            marginLeft: "23px",
            marginRight: "17px",
          }}
        >
          <Table
            dataTable={ActivityogList || []}
            columns={columns}
           
            tableCss={{ min: "64px", max: "55px" }}
            pageCount={data?.pageCount}
            search={search}
          />
        </div>
      </div>
    </>
  );
};

export default ActivityLogList;
