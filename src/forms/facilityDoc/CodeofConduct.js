import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { UseFormValidations } from "../../validations/UseFormValidation";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import moment from "moment";
const CodeofConduct = ({
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
          {requestMsgPopUp && requestMsgPopUp != "" && (
            <div className="py-2 px-3 bg-white">{requestMsgPopUp()}</div>
          )}
          <div className="bg-white p-2 mt-2">
            <div className="row p-2">
              <p className="clo-md-12  " style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim. Amet massa vitae tortor condimentum lacinia quis. Volutpat
                ac tincidunt vitae semper. Et netus et malesuada fames ac turpis
                egestas. Scelerisque eu ultrices vitae auctor eu augue ut lectus
                arcu. Nibh sed pulvinar proin gravida hendrerit. Scelerisque
                felis imperdiet proin fermentum leo. Sit amet nisl purus in.
                Accumsan lacus vel facilisis volutpat est velit egestas. Aenean
                vel elit scelerisque mauris pellentesque pulvinar pellentesque
                habitant. Tempus egestas sed sed risus pretium quam vulputate.
                Orci dapibus ultrices in iaculis nunc sed
              </p>
              <div className="f16 medium mt-2">1 . Respect for Persons</div>
              <div className="px-4 ms-2 mt-2">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Enim ut sem viverra aliquet. Sit amet dictum sit amet justo
                  donec enim.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="f16 medium mt-2">
                2. Respect for Patient Confidentiality
              </div>
              <div className="px-4 ms-2 mt-2">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Enim ut sem viverra aliquet. Sit amet dictum sit amet justo
                  donec enim.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="f16 medium mt-2">3. Honesty and Integrity</div>
              <div className="px-4 ms-2 mt-2">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Enim ut sem viverra aliquet. Sit amet dictum sit amet justo
                  donec enim.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="f16 medium mt-2">
                4. Responsibility for Patient Care
              </div>
              <div className="px-4 ms-2 mt-2">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Enim ut sem viverra aliquet. Sit amet dictum sit amet justo
                  donec enim.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="f16 medium mt-2">
                5. Deportment as a Professional
              </div>
              <div className="px-4 ms-2 mt-2">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Enim ut sem viverra aliquet. Sit amet dictum sit amet justo
                  donec enim.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  {" "}
                  • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="checkboxWithText1 col-md-12 ">
              <input
                type="checkbox"
                name="conductofConduct"
                value="yes"
                id="conductofConduct"
              />
              <label for="conductofConduct" className="">
                {" "}
                I agree to this Conduct of Conduct
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
            <hr className="mt-2" />
            <div>
              <button
                type="submit"
                className="button border rounded text-white p-2"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          {requestMsgPopUp && requestMsgPopUp != "" && (
            <div className="py-2 px-3 bg-white">{requestMsgPopUp()}</div>
          )}
          <div className="row p-2">
            <p className="clo-md-12  " style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
              ut sem viverra aliquet. Sit amet dictum sit amet justo donec enim.
              Amet massa vitae tortor condimentum lacinia quis. Volutpat ac
              tincidunt vitae semper. Et netus et malesuada fames ac turpis
              egestas. Scelerisque eu ultrices vitae auctor eu augue ut lectus
              arcu. Nibh sed pulvinar proin gravida hendrerit. Scelerisque felis
              imperdiet proin fermentum leo. Sit amet nisl purus in. Accumsan
              lacus vel facilisis volutpat est velit egestas. Aenean vel elit
              scelerisque mauris pellentesque pulvinar pellentesque habitant.
              Tempus egestas sed sed risus pretium quam vulputate. Orci dapibus
              ultrices in iaculis nunc sed
            </p>
            <div className="f16 medium mt-2">1 . Respect for Persons</div>
            <div className="px-4 ms-2 mt-2">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="f16 medium mt-2">
              2. Respect for Patient Confidentiality
            </div>
            <div className="px-4 ms-2 mt-2">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="f16 medium mt-2">3. Honesty and Integrity</div>
            <div className="px-4 ms-2 mt-2">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="f16 medium mt-2">
              4. Responsibility for Patient Care
            </div>
            <div className="px-4 ms-2 mt-2">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="f16 medium mt-2">
              5. Deportment as a Professional
            </div>
            <div className="px-4 ms-2 mt-2">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                ut sem viverra aliquet. Sit amet dictum sit amet justo donec
                enim.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                {" "}
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="checkboxWithText1 col-md-12 ">
            <input
              type="checkbox"
              name="conductofConduct"
              value="yes"
              id="conductofConduct"
            />
            <label for="conductofConduct" className="">
              {" "}
              I agree to this Conduct of Conduct
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
export default CodeofConduct;
