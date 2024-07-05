import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { UseFormValidations } from "../../validations/UseFormValidation";
import moment from "moment";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
const Attestations = ({
  values,
  formData,
  formname,
  DoctorFormsView,
  requestMsgPopUp,
}) => {
  const submit = async () => {
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
  console?.log(data,"ssssss")
  let fields = [
    { label: "First Name", value: data?.firstName },
    { label: "Middle Initial", value: data?.middleName },
    { label: "Last Name", value: data?.lastName },
    {
      label: "Today’s Date",
      value: data?.todaydate && moment(data?.todaydate)?.format("MM/DD/YYYY"),
    },
  ];

  useEffect(() => {
    setValues(formData?.documentData);
  }, [formData]);
  console?.log(data, "formData11111111111111111", formData);
  const isCheck = (key, value) => {
    return key == value ? true : false;
  };
  const emailErrorColor = (key) => {
    return errors && errors?.[key]
      ? "form-control bg-white  border-danger"
      : "form-control  bg-white ";
  };

  return (
    <>
      {DoctorFormsView ? (
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-2 mt-2">
            <div className="row p-3 ">
              <p className="col-md-12">
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
                Orci dapibus ultrices in iaculis nunc sed.
              </p>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationOne"
                  checked={isCheck(data?.authorizationOne, "yes")}
                  value="yes"
                  id="authorizationOne"
                  onChange={handleCheckbox("authorizationOne", "yes")}
                />
                <label for="authorizationOne" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationTwo"
                  checked={isCheck(data?.authorizationTwo, "yes")}
                  value="yes"
                  id="authorizationTwo"
                  onChange={handleCheckbox("authorizationTwo", "yes")}
                />
                <label for="authorizationTwo" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>

              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationThree"
                  checked={isCheck(data?.authorizationThree, "yes")}
                  value="yes"
                  id="authorizationThree"
                  onChange={handleCheckbox("authorizationThree", "yes")}
                />
                <label for="authorizationThree" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationFour"
                  checked={isCheck(data?.authorizationFour, "yes")}
                  value="yes"
                  id="authorizationFour"
                  onChange={handleCheckbox("authorizationFour", "yes")}
                />
                <label for="authorizationFour" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationFive"
                  checked={isCheck(data?.authorizationFive, "yes")}
                  value="yes"
                  id="authorizationFive"
                  onChange={handleCheckbox("authorizationFive", "yes")}
                />
                <label for="authorizationFive" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationSix"
                  checked={isCheck(data?.authorizationSix, "yes")}
                  value="yes"
                  id="authorizationSix"
                  onChange={handleCheckbox("authorizationSix", "yes")}
                />
                <label for="authorizationSix" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationSeven"
                  checked={isCheck(data?.authorizationSeven, "yes")}
                  value="yes"
                  id="authorizationSeven"
                  onChange={handleCheckbox("authorizationSeven", "yes")}
                />
                <label for="authorizationSeven" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>
              <div className="checkboxWithText1 col-md-12 mt-1">
                <input
                  type="checkbox"
                  name="authorizationEight"
                  checked={isCheck(data?.authorizationEight, "yes")}
                  value="yes"
                  id="authorizationEight"
                  onChange={handleCheckbox("authorizationEight", "yes")}
                />
                <label for="authorizationEight" className="">
                  Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed
                  libero enim sed. Non quam lacus suspendisse faucibus interdum
                  posuere lorem. Aliquam ut porttitor leo a diam sollicitudin
                  tempor id.
                </label>
              </div>

              <div className="col-md-3">
                <label className="f15 medium">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  className={emailErrorColor("firstName")}
                  value={data?.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="First Name"
                ></input>
              </div>
              <div className="col-md-2">
                <label className="f15 medium">Middle Initial</label>
                <input
                  className="form-control bg-white"
                  value={data?.middleName}
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
                  value={data?.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Last Name"
                ></input>
              </div>
              <div className="col-md-4">
                <label className="f15 medium">Today’s Date</label>
                <DatePicker
                  className="py-2 form-control"
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
          <p className="col-md-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut
            sem viverra aliquet. Sit amet dictum sit amet justo donec enim. Amet
            massa vitae tortor condimentum lacinia quis. Volutpat ac tincidunt
            vitae semper. Et netus et malesuada fames ac turpis egestas.
            Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Nibh
            sed pulvinar proin gravida hendrerit. Scelerisque felis imperdiet
            proin fermentum leo. Sit amet nisl purus in. Accumsan lacus vel
            facilisis volutpat est velit egestas. Aenean vel elit scelerisque
            mauris pellentesque pulvinar pellentesque habitant. Tempus egestas
            sed sed risus pretium quam vulputate. Orci dapibus ultrices in
            iaculis nunc sed.
          </p>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationOne"
              checked={isCheck(data?.authorizationOne, "yes")}
              value="yes"
              id="authorizationOne"
              onChange={handleCheckbox("authorizationOne", "yes")}
            />
            <label for="authorizationOne" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationTwo"
              checked={isCheck(data?.authorizationTwo, "yes")}
              value="yes"
              id="authorizationTwo"
              onChange={handleCheckbox("authorizationTwo", "yes")}
            />
            <label for="authorizationTwo" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>

          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationThree"
              checked={isCheck(data?.authorizationThree, "yes")}
              value="yes"
              id="authorizationThree"
              onChange={handleCheckbox("authorizationThree", "yes")}
            />
            <label for="authorizationThree" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationFour"
              checked={isCheck(data?.authorizationFour, "yes")}
              value="yes"
              id="authorizationFour"
              onChange={handleCheckbox("authorizationFour", "yes")}
            />
            <label for="authorizationFour" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationFive"
              checked={isCheck(data?.authorizationFive, "yes")}
              value="yes"
              id="authorizationFive"
              onChange={handleCheckbox("authorizationFive", "yes")}
            />
            <label for="authorizationFive" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationSix"
              checked={isCheck(data?.authorizationSix, "yes")}
              value="yes"
              id="authorizationSix"
              onChange={handleCheckbox("authorizationSix", "yes")}
            />
            <label for="authorizationSix" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationSeven"
              checked={isCheck(data?.authorizationSeven, "yes")}
              value="yes"
              id="authorizationSeven"
              onChange={handleCheckbox("authorizationSeven", "yes")}
            />
            <label for="authorizationSeven" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
            </label>
          </div>
          <div className="checkboxWithText1 col-md-12 mt-1">
            <input
              type="checkbox"
              name="authorizationEight"
              checked={isCheck(data?.authorizationEight, "yes")}
              value="yes"
              id="authorizationEight"
              onChange={handleCheckbox("authorizationEight", "yes")}
            />
            <label for="authorizationEight" className="">
              Nisi porta lorem mollis aliquam ut porttitor. Mi proin sed libero
              enim sed. Non quam lacus suspendisse faucibus interdum posuere
              lorem. Aliquam ut porttitor leo a diam sollicitudin tempor id.
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

          {/* {editModal&&<UnlockAndEditmodal saveData={funData}  show={editModal} onHide={()=>setEditModal(false)} />} */}
        </>
      )}
    </>
  );
};
export default Attestations;
