import React, { useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { UseFormValidations } from "../../../validations/UseFormValidation";
const CredentialPrefrences = () => {
  const {data,headerlink}=UseFormValidations({})

  useEffect(() => {
    headerlink([
      {name:"Application Builder",link:"/outpatientpro/facility/applicationBuilder"},
      {name:"Credential Preferences",link:"/outpatientpro/facility/applicationBuilder/credpreference",active:true}
    ])
  }, []);
  return (
    <div className="container bg-white ">
      <div className="p-4">
        <h5 className=" ">Credentialing Preferences</h5>

        <div className="full-width-line"></div>
      </div>
      <div className=" p-4">
        <h6 className="">
          How to setup your Credentialing Requirements
        </h6>

    
          <div
            className="col-md-6 p-2"
            style={{ background: " #f2f2f2", color: "#333333" }}
          >
            <p>
              {" "}
              <HiInformationCircle size={25} /> To select Credentials for all
              Doctors or Allied Health Professionals, select “All” from the
              License Type menu. You can still customize the credentials for any
              type of Provider by selecting it from the menus below.
            </p>
          </div>
     

        <div className="row p-4">
          <div className="col-md-4">
            <label className="">Step 1: Provider Type </label>
            <select className="form-select" name="state">
              <option value="">Select</option>
              <option>Doctor</option>
              <option>Allied Health Professional</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="">Step 2: License Type</label>
            <select className="form-select" name="state">
              <option>All License Types</option>
              <option>CRNA</option>
              <option>DO</option>
              <option> MD</option>
              <option>PA-C</option>
              <option>RN</option>
              <option>RNFA</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="">Step 3: Specialty</label>
            <select className="form-select" name="state">
              <option>All Specialties</option>
              <option>Cardiology</option>
              <option>ENT</option>
              <option> Gastrointestinal</option>
              <option>General</option>
              <option>Neurosurgery</option>
              <option>Ophthalmology</option>
              <option>Orthopedic</option>
              <option>Pain</option>
              <option>Podiatry</option>
              <option>Urology</option>
            </select>
          </div>

         
       
      
        </div>
        <hr/>
        <div className="d-flex p-4">
            <div className="col-md-4">
              <div className="checkboxWithText">
                <input type="checkbox" name="alcs" value="yes" id="alcs" />
                <label for="alcs" className="">
                  ALCS (default)
                </label>
              </div>

              <div className="checkboxWithText">
                <input type="checkbox" name="bls" value="yes" id="bls" />
                <label for="bls"> BLS</label>
              </div>

              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="boardCertification"
                  value="yes"
                  id="boardCertification"
                />
                <label for="boardCertification"> Board Certification</label>
              </div>

              <div className="checkboxWithText">
                <input type="checkbox" name="cds" value="yes" id="cds" />
                <label for="cds">CDS</label>
              </div>

              <div className="checkboxWithText">
                <input type="checkbox" name="cv" value="yes" id="cv" />
                <label for="cv">CV</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="checkboxWithText">
                <input type="checkbox" name="dea" value="yes" id="dea" />
                <label for="dea">DEA</label>
              </div>

              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="driverLicense"
                  value="yes"
                  id="driverLicense"
                />
                <label for="driverLicense">Driver’s License</label>
              </div>

              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="flourscopy"
                  value="yes"
                  id="flourscopy"
                />
                <label for="flourscopy">Flouroscopy</label>
              </div>

              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="malpracticeinsurance"
                  value="yes"
                  id="malpracticeinsurance"
                />
                <label for="malpracticeinsurance">Malpractice Insurance</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="medicalSchool"
                  value="yes"
                  id="medicalSchool"
                />
                <label for="medicalSchool">Medical School</label>
              </div>
              <div className="checkboxWithText">
                <input type="checkbox" name="pals" value="yes" id="pals" />
                <label for="pals">PALS</label>
              </div>
              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="postgraduatetraining"
                  value="yes"
                  id="postgraduatetraining"
                />
                <label for="postgraduatetraining">Postgraduate Training</label>
              </div>
              <div className="checkboxWithText">
                <input
                  type="checkbox"
                  name="stateinsurancelicense"
                  value="yes"
                  id="stateinsurancelicense"
                />
                <label for="stateinsurancelicense">
                  State Insurance License
                </label>
              </div>
            </div>
          </div>
          <hr/>


          
        <div className=" d-flex gap-2">
          <button
         
            className="border rounded col-md-1 p-2   d-flex align-items-center justify-content-center text-center text-white"
            style={{ background: " #9d9d9d" }}
       
          >
            Save
          </button>
          <button
           className="button border p-2  text-white rounded  col-md-1"
            // className="border rounded col-md-1 p-2   d-flex align-items-center justify-content-center text-center text-white"
            style={{ background: "  #1e98d7" }}
       
          >
           Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CredentialPrefrences;
