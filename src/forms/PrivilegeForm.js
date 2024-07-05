import React from 'react'

const PrivilegeForm = () => {
    const array1=[{name:"Anesthesiologist only: Direct supervision of anesthesia services provided by qualified Licensed Providers or Allied Health Providers (i.e. CRNA’s, AA’s)",type:"anesthesiologist"},
{name:"ANESTHESIA PROCEDURE",font:"bold"},
{name:"Topical Agents",type:"topical",field:"topicalAgents"},
{name:"Peribulbar injection",type:"peribulbar",field:"peribulbarInjection"},
{name:"Retrobulbar injection",type:"retrobulbar",field:"retrobulbarInjection"},
{name:"Intravenous sedation",type:"intravenous",field:"intravenousSedation"},
{name:"Moderate sedation /analgesia (conscious sedation) including the administration of Propofol",type:"moderateSedation",field:"moderateInAnalgesia"},
{name:"Deep sedation/analgesia including the administration of Propofol",type:"deepSedation",field:"deepsedationAnalgesia"},
{name:"General Anesthesia Administration",type:"generalanesthesia",field:"generalAnesthesia"},
{name:"Regional blocks/Nerve blocks/treatments",type:"RegionalblocksNerve",field:"RegionalBlocksNerve"},
{name:"Ankle block",type:"ankle",field:"ankleBlock"},
{name:"Axillary Nerve Block",type:"axillary",field:"axillaryNerve"},
{name:"Bier Block",type:"bier",field:"bierBlock"},
{name:"Femoral Nerve Block",type:"femoral",field:"femoralNerve"},
{name:"Fornical",type:"fornical",field:"fornical1"},
{name:"Intercostal",type:"intercostal",field:"intercostal1"},
{name:"Interscalene Nerve Block",type:"interscalene",field:"interscaleneNerve"},
{name:"Local infiltration",type:"localinfiltration",field:"localInfiltration"},
{name:"Lower extremity",type:"lowerextremity",field:"lowerExtremity"},
{name:"Peripheral",type:"peripheral",field:"peripheral1"},
{name:"Spinal/Epidural",type:"spinal",field:"epidural"},
{name:"Steroid injection",type:"steroidinjection",field:"steroidInjection"},
{name:"Supraclavicular / Infraclavicular Block",type:"supraclavicular",field:"Supraclavicular1"},
{name:"Upper extremity",type:"upperextremity",field:"upperExtremity"},
{name:"OTHER ANESTHESIA",font:"bold"},
{name:"Pediatric Anesthesia care",type:"pediatricanesthesia",field:"pediatricAnesthesia"},
{name:"Pre-anesthesia assessment",type:"preanesthesia",field:"preAnesthesia"},
{name:"Request laboratory/diagnostic studies",type:"requestlaboratory",field:"requestLaboratory"},
{name:"Review of laboratory/diagnostic studies",type:"reviewoflaboratory",field:"reviewofLaboratory"},
{name:"Administer pre-anesthesia medications",type:"administerpreanesthesia",field:"administerPreanesthesia"},
{name:"Administer adjuvant drugs",type:"administeradjuvant",field:"administerAdjuvant"},
{name:"Post-anesthesia care/release procedures",type:"postanesthesia",field:"postAnesthesia"},
{name:"Medication management",type:"medicationmanagement",field:"medicationManagement"},
{name:"ANESTHESIA MANAGEMENT",font:"bold"},
{name:"Accessory drugs for homeostasis",type:"accessorydrugs",field:"accessoryDrugs"},
{name:"Mechanical ventilation/oxygen therapy",type:"mechanicalventilation",field:"mechanicalVentilation"},
{name:"Fluids, electrolytes, acid/base",type:"fluids",field:"fluids1"},
{name:"Insertion of peripheral intravenous catheter",type:"insertionofperipheral",field:"insertionofPeripheral"},
{name:"Management of patient pain: Acute",type:"managementofpatient",field:"managementofPatient"},
{name:"Chronic",type:"chronic",field:"chronic"},
{name:"MISCELLANEOUS PROCEDURES",font:"bold"},
{name:"Use of C-arm for verification/guidance/assistance with procedures",type:"useofcarm",field:"useofCarm"},
{name:"Use of Ultrasound for verification/guidance/assistance with procedures",type:"useofultrasound",field:"useofUltrasound"},
{name:"Other",type:"other1",field:"other11"},
{name:"Other",type:"other2",field:"other22"},
{name:"Other",type:"other3",field:"other33"},


]
  return (
    <div className="row p-3  bg-white mt-2">
      <div>
        <div
          className="row border text-white py-3 p-2"
          style={{ background: "#8B8B8B 0% 0% no-repeat padding-box" }}
        >
          <div className="col-md-5 f15 ">Individual Privilege</div>
          <div className="col-md-2 f15 ">Requested</div>
          <div className="col-md-5 f15 border-primary">Notes</div>
        </div>
        {array1&&array1?.map((v,i)=>{return(<>


          <div className="row border d-flex align-items-center "style={{ background:i%2==0&& "#F5F7F8" }}>
          <div className={v?.font?"col-md-5 f16 medium py-3":i==0?"col-md-5 f14 py-2":"col-md-5 f14 "}>
           {v?.name}
          </div>

          <div className="col-md-2">
          {v?.type&&<input
              type={"checkbox"}
            
              value={"yes"}
              className="me-1"
            />}
          </div>
          <div className="col-md-5 f14  mb-2">
          {v?.field&&<input
                className="form-control bg-white "
                
                placeholder="Notes..."
               
              ></input>}
          </div>

          
        </div>
        </>)})}

        
      </div>
      <hr className="mt-4" />

      <div>
        <button type="submit" className="button border rounded text-white p-2">
          Save & Continue
        </button>
      </div>
    </div>
  )
}

export default PrivilegeForm