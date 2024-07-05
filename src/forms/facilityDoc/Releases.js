import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { UseFormValidations } from "../../validations/UseFormValidation";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import moment from "moment";
const Releases = ({
  values,
  formData,
  formname,
  DoctorFormsView,
  requestMsgPopUp,
}) => {
  const submit = () => {
    let fomvalues = [{ value: data?.firstName }, { value: data?.lastName }];
    const someValueIsMissingData = fomvalues.some(
      (item) => item.value === undefined || item.value === ""
    );
    const greentick = someValueIsMissingData == true ? "No" : "Yes";

    values(data, greentick);
  };
  const {
    data,
    errors,
    handleChange,
    handleDateChange,
    setValues,
    handleCheckbox,
    handleSubmit,
  } = UseFormValidations({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: {
      firstName: {
        required: {
          value: true,
          message: "Please Select Facility Document Template",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Please enter your Template Name",
        },
      },
    },

    submit: submit,
  });
  let fields = [
    { label: "First Name", value: data?.firstName },
    { label: "Middle Initial", value: data?.middleName },
    { label: "Last Name", value: data?.lastName },
    {
      label: "Today’s Date",
      // value: moment(data?.todaydate)?.format("MM/DD/YYYY"),
      value: data?.todaydate && moment(data?.todaydate)?.format("MM/DD/YYYY"),
    },
  ];

  useEffect(() => {
    setValues(formData?.documentData);
  }, [formData]);
  const isCheck = (key, value) => {
    return key == value ? true : false;
  };
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };

  const returnValue = (key) => {
    return data?.[key] && data?.[key] ? data?.[key] : "";
  };
  return (
    <>
      {DoctorFormsView ? (
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="bg-white p-2 mt-2">
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mb-3">{requestMsgPopUp()}</div>
            )}
            <div className="col-md-12 ">
              <p>
                I understand and acknowledge that, as an applicant for
                medical/professional staff at the hospital or ambulatory care
                center, state and county medical society membership, or
                affiliation with a health care network or plan (hereafter
                referred ot as “Organizations”) indicated in this Application,
                it is my responsibility ot provide sufficient information upon
                which a proper evaluation can be undertaken of my current
                licensure, relevant training and/or experience, current
                competence, judgment, health status, character, ethics and any
                other criteria adopted by Organizations for medical/professional
                staff membership or medical and/or surgical privileges or
                affiliation.
              </p>

              <p>
                I further acknowledge that I am responsible for knowing the
                contents of the bylaws, rules and regulations of the
                Organizations and their medical/ professional staffs and agree
                to be bound by them if granted membership and/or privileges or
                affiliation.
              </p>
              <p>
                I y submitting this Application, I agree and consent ot such
                investigation activities of Acme and Organizations as follows:
              </p>
              <p>
                Authorization of Investigation and Release of Information
                Concerning Application for Appointment. | authorize al
                individuals, institutions and entities, including but not
                limited ot administrators and members of the
                medical/professional staffs of other facilities, organizations
                or institutions with which I have been associated and all
                professional liability insurers with which I have had or
                currently have professional liability insurance, who have
                knowledge concerning information requested in this Application,
                who have knowledge concerning information requested in this
                Application, ot consult with and release relevant information ot
                Acme and Organizations, their medical/professional staffs,
                credentialing committees and agents.
              </p>
              <p>
                Release from Liability. I hereby release from liability Acme and
                their respective agents, and all other individuals, institutions
                and entities providing information in accordance with the
                authorizations contained herein for their acts performed in good
                faith and without malice in connection with the investigation of
                this Application for Appointment. This release shall be
                cumulative and in addition ot any other applicable immunities
                provided by law for medical care review activities.
              </p>

              <p>
                {" "}
                Use of Information. acknowledge that part of the information ot
                be provided by me is for identification purposes only and will
                not be used ot form the basis of decisions regarding
                medical/professional staff membership or credentialed status.
              </p>
              <p>
                I understand and agree that the authorizations I have provided
                are irrevocable so long as I am an applicant for or have
                medical/professional staff privileges at or am affiliated with
                any Organizations participating in Acme’s central verification
                service.
              </p>
              <p>
                I acknowledge that the investigation of information in this
                Application by the Organizations, Acme and their agents is done
                ot achieve maintain and improve quality patient care.
              </p>
              <p>
                {" "}
                I pledge ot provide continuous care for each of my patients and
                recognize my responsibilities therein.
              </p>
              <p>
                I consent to an inspection of my records and agree ot an
                interview if requested.
              </p>
              <p>
                {" "}
                All information provided by me in the Application is true and
                complete ot the best of my knowledge and belief. I understand
                and agree that any material misstatement in or omission from the
                Application may constitute grounds for denial of appointment or
                for summary dismissal from the medical/professional staff. I
                understand and acknowledge that the Organizations shall be
                solely responsible for all decisions concerning
                medical/professional staff membership and the granting of
                medical and/or surgical privileges or credentialed status.
                Medical/professional staff membership are determined
                independently. I further understand and acknowledge that Acme
                has no responsibility or liability with respect to
                medical/professional staff membership or credentialing decisions
                by Organizations.
              </p>
            </div>

            <div className="checkboxWithText1 col-md-12 ">
              <input
                type="checkbox"
                name="authorization"
                checked={isCheck(data?.authorization, "yes")}
                value="yes"
                id="authorization"
                onChange={handleCheckbox("authorization", "yes")}
              />
              <label for="authorization" className="">
                {" "}
                I further acknowledge that I have read and understand the
                foregoing Authorization and Release.
              </label>
            </div>

            <div className="row">
              <div className="col-md-3">
                <label className="f15 medium">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("firstName")}
                  value={returnValue("firstName")}
                  onChange={handleChange("firstName")}
                  placeholder="First Name"
                ></input>
              </div>
              <div className="col-md-2">
                <label className="f15 medium">Middle Initial</label>
                <input
                  className="form-control bg-white"
                  value={returnValue("middleName")}
                  onChange={handleChange("middleName")}
                  placeholder="Middle Name"
                ></input>
              </div>
              <div className="col-md-3">
                <label className="f15 medium">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("lastName")}
                  value={returnValue("lastName")}
                  onChange={handleChange("lastName")}
                  placeholder="Last Name"
                ></input>
              </div>
              <div className="col-md-4">
                <label className="f15 medium">Today’s Date</label>
                <DatePicker
                  className={`${emailErrorColor("todaydate")}py-2`}
                  minDate={new Date(1900, 1, 1)}
                  selected={data?.todaydate && new Date(data?.todaydate)}
                  autoComplete="off"
                  name="todaydate"
                  onChange={(e) => {
                    handleDateChange(e, "todaydate");
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  showIcon
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#B2B2B2"
                      class="bi bi-calendar"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                  }
                />
              </div>
            </div>

            <hr />
            <div>
              <button
                type="submit"
                className="save border rounded text-white p-2"
              >
                Accept & Sign
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="col-md-12 ">
            {requestMsgPopUp && requestMsgPopUp != "" && (
              <div className="mb-3">{requestMsgPopUp()}</div>
            )}
            <p>
              I understand and acknowledge that, as an applicant for
              medical/professional staff at the hospital or ambulatory care
              center, state and county medical society membership, or
              affiliation with a health care network or plan (hereafter referred
              ot as “Organizations”) indicated in this Application, it is my
              responsibility ot provide sufficient information upon which a
              proper evaluation can be undertaken of my current licensure,
              relevant training and/or experience, current competence, judgment,
              health status, character, ethics and any other criteria adopted by
              Organizations for medical/professional staff membership or medical
              and/or surgical privileges or affiliation.
            </p>

            <p>
              I further acknowledge that I am responsible for knowing the
              contents of the bylaws, rules and regulations of the Organizations
              and their medical/ professional staffs and agree to be bound by
              them if granted membership and/or privileges or affiliation.
            </p>
            <p>
              I y submitting this Application, I agree and consent ot such
              investigation activities of Acme and Organizations as follows:
            </p>
            <p>
              Authorization of Investigation and Release of Information
              Concerning Application for Appointment. | authorize al
              individuals, institutions and entities, including but not limited
              ot administrators and members of the medical/professional staffs
              of other facilities, organizations or institutions with which I
              have been associated and all professional liability insurers with
              which I have had or currently have professional liability
              insurance, who have knowledge concerning information requested in
              this Application, who have knowledge concerning information
              requested in this Application, ot consult with and release
              relevant information ot Acme and Organizations, their
              medical/professional staffs, credentialing committees and agents.
            </p>
            <p>
              Release from Liability. I hereby release from liability Acme and
              their respective agents, and all other individuals, institutions
              and entities providing information in accordance with the
              authorizations contained herein for their acts performed in good
              faith and without malice in connection with the investigation of
              this Application for Appointment. This release shall be cumulative
              and in addition ot any other applicable immunities provided by law
              for medical care review activities.
            </p>

            <p>
              {" "}
              Use of Information. acknowledge that part of the information ot be
              provided by me is for identification purposes only and will not be
              used ot form the basis of decisions regarding medical/professional
              staff membership or credentialed status.
            </p>
            <p>
              I understand and agree that the authorizations I have provided are
              irrevocable so long as I am an applicant for or have
              medical/professional staff privileges at or am affiliated with any
              Organizations participating in Acme’s central verification
              service.
            </p>
            <p>
              I acknowledge that the investigation of information in this
              Application by the Organizations, Acme and their agents is done ot
              achieve maintain and improve quality patient care.
            </p>
            <p>
              {" "}
              I pledge ot provide continuous care for each of my patients and
              recognize my responsibilities therein.
            </p>
            <p>
              I consent to an inspection of my records and agree ot an interview
              if requested.
            </p>
            <p>
              {" "}
              All information provided by me in the Application is true and
              complete ot the best of my knowledge and belief. I understand and
              agree that any material misstatement in or omission from the
              Application may constitute grounds for denial of appointment or
              for summary dismissal from the medical/professional staff. I
              understand and acknowledge that the Organizations shall be solely
              responsible for all decisions concerning medical/professional
              staff membership and the granting of medical and/or surgical
              privileges or credentialed status. Medical/professional staff
              membership are determined independently. I further understand and
              acknowledge that Acme has no responsibility or liability with
              respect to medical/professional staff membership or credentialing
              decisions by Organizations.
            </p>
          </div>

          <div className="checkboxWithText1 col-md-12 ">
            <input
              type="checkbox"
              name="authorization"
              checked={isCheck(data?.authorization, "yes")}
              value="yes"
              id="authorization"
              onChange={handleCheckbox("authorization", "yes")}
            />
            <label for="authorization" className="">
              {" "}
              I further acknowledge that I have read and understand the
              foregoing Authorization and Release.
            </label>
          </div>
          <div className="p-4">
            {fields?.map((v) => {
              return (
                <div className="row border-top-bottom py-2 ">
                  {v?.heading && <h6 className="m-0 p-0 mt-4">{v?.heading}</h6>}
                  <div className="col-md-3 px-2 label">{v?.label}</div>
                  <div className="col-md-8 ">
                    {" "}
                    <label>{v?.value}</label>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Releases;
