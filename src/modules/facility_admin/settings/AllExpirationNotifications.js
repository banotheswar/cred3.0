import React, { useEffect } from "react";
import { UseFormValidations } from "../../../validations/UseFormValidation";

const AllExpirationNotifications = () => {
  const { headerlink } = UseFormValidations({});

  useEffect(() => {
    headerlink(sessionStorage?.getItem("roleId")==2?[
      { name: "Settings", link: "/outpatientpro/enterprise/settings" },
      {
        name: "Expiration Notification",
        link: "/outpatientpro/enterprise/settings/expiration_notification",
        active: true,
      },
    ]:[
      { name: "Settings", link: "/outpatientpro/facility/settings" },
      {
        name: "Expiration Notification",
        link: "/outpatientpro/facility/settings/expiration_notification",
        active: true,
      },
    ]);
  }, []);
  return (
    <div className="">
      <div className="bg-white mb-2">
        <div className="f30 px-4 py-4  regular">Expiration Notifications</div>
      </div>
      <div className="row bg-white px-4 py-4  ">
        
        <div className="col-lg-6 ">
          <div className="d-flex  gap-2">
            <div className="f20">Appointment Expirations </div>
            <label className="f14 py-1 ">
              {" "}
              (Days before the Reappointment Date)
            </label>
          </div>
          <div className="mt-2 ms-2 settings-text  " style={{ opacity: "0.6" }}>
            When the Provider’s appointment is set to expire, both your Facility
            and the <br /> Provider will be notified on the days selected below.
          </div>
        </div>
        <div className="row p-4">
          <div className="col-md-6">
            <div className="row">
              <div className="light-width-line"></div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="ninetydayscred"
                    className="pointer  "
                  />
                  <label className=" " for="ninetydayscred">
                    90 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="sixtydayscred"
                  />
                  <label className="" for="sixtydayscred">
                    60 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="thirtydayscred"
                  />
                  <label className="" for="thirtydayscred">
                    {" "}
                    45 days
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="light-width-line"></div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="thirtydayscredcred"
                    className="pointer  "
                  />
                  <label className=" " for="thirtydayscredcred">
                    30 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="fifteencred"
                  />
                  <label className="" for="fifteencred">
                    15 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="sevencred"
                  />
                  <label className="" for="sevencred">
                    {" "}
                    7 days
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="light-width-line"></div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="sixcred"
                    className="pointer  "
                  />
                  <label className=" " for="sixcred">
                    6 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="fivecred"
                  />
                  <label className="" for="fivecred">
                    5 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="threedayscred"
                  />
                  <label className="" for="threedayscred">
                    {" "}
                    3 days
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="light-width-line"></div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="twodayscred"
                    className="pointer  "
                  />
                  <label className=" " for="twodayscred">
                    2 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="onedaycred"
                  />
                  <label className="" for="onedaycred">
                    1 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="onedayscred"
                  />
                  <label className="" for="onedayscred">
                    {" "}
                    1 days
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-5  ms-5">
            {" "}
            <div className="label ">Reappointment Reminder Email</div>
            <div
              className="settings-text "
              style={{ opacity: "0.6", textAlign: "justify" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div class="expiration-edit p-2 d-flex justify-content-center mt-4  rounded">
              Customize
            </div>
          </div> */}
          <div className="col-md-5 ms-md-5 ms-3">
    <div className="label">Reappointment Reminder Email</div>
    <div className="settings-text" style={{ opacity: 0.6, textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <div className="expiration-edit p-2 d-flex justify-content-center mt-4 rounded">
        Customize
    </div>
</div>

        </div>

        {/* <div class="col-xl-4 col-lg-4 col-md-12 ">
          <div className="label f14 mt-2">Add a Reminder</div>

          <div class="d-flex flex-column flex-md-row align-items-center mt-1">
            <div class="d-flex align-items-center col-xl-2 col-lg-3 col-md-2 col-sm-12">
              <input class="form-control" type="text" name="reminder" />
            </div>
            <div className="label ms-3 col-12" style={{ fontWeight: "400" }}>
              days before the reappointment date
            </div>
          </div>
          <div
            class="add p-2 mb-4 d-flex justify-content-center text-white rounded mt-3"
            style={{ background: "rgba(117, 117, 117, 0.62)",width:"76px" }}
          >
            Add
          </div>
        </div> */}
        <div class="col-xl-4 col-lg-4 col-md-12">
    <div className="label f14 mt-2 reminder_mobile">Add a Reminder</div>

    <div class="d-flex flex-column flex-md-row align-items-center mt-1">
        <div class="d-flex align-items-center col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <input class="form-control" type="text" name="reminder" />
        </div>
        <div class="label ms-md-3 ms-0 mt-md-0 mt-2 col-md-8 col-sm-6 col-xs-12" style={{ fontWeight: "400" }}>
            days before the reappointment date
        </div>
    </div>

    <div
        class="add p-2 mb-4 d-flex justify-content-center text-white rounded mt-3"
        style={{ background: "rgba(117, 117, 117, 0.62)", width: "100%", maxWidth: "76px" }}
    >
        Add
    </div>
</div>

        <div className="  mb-3">
        <hr className="mb-5"/>
        <div class="save-settings p-3 mr-3 d-flex justify-content-center   rounded ">Settings</div>
      </div>
      </div>
   
      <div className="row bg-white p-4 mt-2">
        <div className="col-lg-6 ">
          <div className="d-flex  gap-2">
            <div className="f20">Credential Expirations</div>
            <label className="f14 py-1 ">
              {" "}
              (Days before the Reappointment Date)
            </label>
          </div>
          <div className="mt-2 ms-2 settings-text  " style={{ opacity: "0.6" }}>
            When the Provider’s appointment is set to expire, both your Facility
            and the <br /> Provider will be notified on the days selected below.
          </div>
        </div>
        <div className="row p-4">
          <div className="col-md-6">
            <div className="row">
              <div className="light-width-line"></div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="ninetydayscred"
                    className="pointer  "
                  />
                  <label className=" " for="ninetydayscred">
                    90 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="sixtydayscred"
                  />
                  <label className="" for="sixtydayscred">
                    60 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="thirtydayscred"
                  />
                  <label className="" for="thirtydayscred">
                    {" "}
                    45 days
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="light-width-line"></div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="thirtydayscredcred"
                    className="pointer  "
                  />
                  <label className=" " for="thirtydayscredcred">
                    30 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="fifteencred"
                  />
                  <label className="" for="fifteencred">
                    15 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="sevencred"
                  />
                  <label className="" for="sevencred">
                    {" "}
                    7 days
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="light-width-line"></div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="sixcred"
                    className="pointer  "
                  />
                  <label className=" " for="sixcred">
                    6 days
                  </label>
                </div>
              </div>
               <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="fivecred"
                  />
                  <label className="" for="fivecred">
                    5 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="threedayscred"
                  />
                  <label className="" for="threedayscred">
                    {" "}
                    3 days
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="light-width-line"></div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="ninetydays"
                    value="yes"
                    id="twodayscred"
                    className="pointer  "
                  />
                  <label className=" " for="twodayscred">
                    2 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="sixtydays"
                    value="yes"
                    id="onedaycred"
                  />
                  <label className="" for="onedaycred">
                    1 days
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="checkboxWithText1">
                  <input
                    type="checkbox"
                    name="thirtydays"
                    value="yes"
                    id="onedayscred"
                  />
                  <label className="" for="onedayscred">
                    {" "}
                    1 days
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-5 ms-5">
            {" "}
            <div className="label ">Expiration Reminder Email</div>
            <div
              className="settings-text"
              style={{ opacity: "0.6", textAlign: "justify" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div class="expiration-edit p-2 d-flex justify-content-center mt-4  rounded">
              Customize
            </div>
          </div> */}
                    <div className="col-md-5 ms-md-5 ms-3">
    <div className="label">Expiration Reminder Email</div>
    <div className="settings-text" style={{ opacity: 0.6, textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <div className="expiration-edit p-2 d-flex justify-content-center mt-4 rounded">
        Customize
    </div>
</div>
        </div>

{/*       
         <div class="col-xl-4 col-lg-4 col-md-12 ">
          <div className="label f14 mt-2">Add a Reminder</div>

          <div class="d-flex flex-column flex-md-row align-items-center mt-1">
            <div class="d-flex align-items-center col-xl-2 col-lg-3 col-md-2 ">
              <input class="form-control" type="text" name="reminder" />
            </div>
            <div className="label ms-3 col-12" style={{ fontWeight: "400" }}>
              days before the reappointment date
            </div>
          </div>
          <div
            class="add p-2 mb-4 d-flex justify-content-center text-white rounded mt-3"
            style={{ background: "rgba(117, 117, 117, 0.62)",width:"76px" }}
          >
            Add
          </div>
        </div> */}
             <div class="col-xl-4 col-lg-4 col-md-12">
    <div className="label f14 mt-2 reminder_mobile">Add a Reminder</div>

    <div class="d-flex flex-column flex-md-row align-items-center mt-1">
        <div class="d-flex align-items-center col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <input class="form-control" type="text" name="reminder" />
        </div>
        <div class="label ms-md-3 ms-0 mt-md-0 mt-2 col-md-8 col-sm-6 col-xs-12" style={{ fontWeight: "400" }}>
            days before the reappointment date
        </div>
    </div>

    <div
        class="add p-2 mb-4 d-flex justify-content-center text-white rounded mt-3"
        style={{ background: "rgba(117, 117, 117, 0.62)", width: "100%", maxWidth: "76px" }}
    >
        Add
    </div>
</div>
        <div className="  mb-3">
        <hr className="mb-5"/>
        <div class="save-settings p-3 mr-3 d-flex justify-content-center   rounded ">Settings</div>
      </div>
      </div>

     
    </div>
  );
};

export default AllExpirationNotifications;
