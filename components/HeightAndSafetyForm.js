/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { orderBy } from "firebase/firestore";

function HeightAndSafetyForm({
    newInspector,
    setNewInspector,
    heightStartDate,
    setHeightStartDate,
    newInspectionDate,
    setNewInspectionDate,
    heightSiteName,
    setHeightSiteName,
    heightEmail,
    setHeightEmail,
    createHeightSafety,
    startDate,
    endDate,
    other,
    setOther,
    heightSiteAddress,
    setHeightSiteAddress,
    assetGroupOneQty,
    setAssetGroupOneQty,
    assetGrpOneType,
    setAssetGrpOneType,
    assetGrpOneInspectionType,
    setAssetGrpOneInspectionType,
    assetGrpOneRating,
    setAssetGrpOneRating,
    assetGrpOneResult,
    setAssetGrpOneResult,
    assetGrpOneNotes,
    setAssetGrpOneNotes,
    assetGrpTwoQty,
    setAssetGrpTwoQty,
    assetGrpTwoType,
    setAssetGrpTwoType,
    assetGrpTwoInspectionType,
    setAssetGrpTwoInspectionType,
    assetGrpTwoRating,
    setAssetGrpTwoRating,
    assetGrpTwoResult,
    setAssetGrpTwoResult,
    assetGrpTwoNotes,
    setAssetGrpTwoNotes,
    assetGrp3Qty,
    setAssetGrp3Qty,
    assetGrp3Type,
    setAssetGrp3Type,
    assetGrp3InspectionType,
    setAssetGrp3InspectionType,
    assetGrp3Rating,
    setAssetGrp3Rating,
    assetGrp3Result,
    setAssetGrp3Result,
    assetGrp3Notes,
    setAssetGrp3Notes,
    assetGrp4Qty,
    setAssetGrp4Qty,
    assetGrp4Type,
    setAssetGrp4Type,
    assetGrp4InspectionType,
    setAssetGrp4InspectionType,
    assetGrp4Rating,
    setAssetGrp4Rating,
    assetGrp4Result,
    setAssetGrp4Result,
    assetGrp4Notes,
    setAssetGrp4Notes,
    assetGrp5Qty,
    setAssetGrp5Qty,
    assetGrp5Type,
    setAssetGrp5Type,
    assetGrp5InspectionType,
    setAssetGrp5InspectionType,
    assetGrp5Rating,
    setAssetGrp5Rating,
    assetGrp5Result,
    setAssetGrp5Result,
    assetGrp5Notes,
    setAssetGrp5Notes,
    assetGrp6Qty,
    setAssetGrp6Qty,
    assetGrp6Type,
    setAssetGrp6Type,
    assetGrp6InspectionType,
    setAssetGrp6InspectionType,
    assetGrp6Rating,
    setAssetGrp6Rating,
    assetGrp6Result,
    setAssetGrp6Result,
    assetGrp6Notes,
    setAssetGrp6Notes,
    assetGrp7Qty,
    setAssetGrp7Qty,
    assetGrp7Type,
    setAssetGrp7Type,
    assetGrp7InspectionType,
    setAssetGrp7InspectionType,
    assetGrp7Rating,
    setAssetGrp7Rating,
    assetGrp7Result,
    setAssetGrp7Result,
    assetGrp7Notes,
    setAssetGrp7Notes,
    assetGrp8Qty,
    setAssetGrp8Qty,
    assetGrp8Type,
    setAssetGrp8Type,
    assetGrp8InspectionType,
    setAssetGrp8InspectionType,
    assetGrp8Rating,
    setAssetGrp8Rating,
    assetGrp8Result,
    setAssetGrp8Result,
    assetGrp8Notes,
    setAssetGrp8Notes
}) {

  const [agotOther, setAgotOther] = useState(false);
  const [agoitOther, setAgoitOther] = useState(false);
  const [agorOther, setAgorOther] = useState(false);
  const [agoresOther, setAgoresOther] = useState(false);
  const [agonOther, setAgonOther] = useState(false);
  const [agttOther, setAgttOther] = useState(false);
  const [agtiyOther, setAgtiyOther] = useState(false);
  const [agtrOther, setAgtrOther] = useState(false);
  const [agtresOther, setAgtresOther] = useState(false);
  const [agtnOther, setAgtnOther] = useState(false);
  const [ag3tOther, setAg3tOther] = useState(false);
  const [ag3iyOther, setAg3iyOther] = useState(false);
  const [ag3rOther, setAg3rOther] = useState(false);
  const [ag3resOther, setAg3resOther] = useState(false);
  const [ag3nOther, setAg3nOther] = useState(false);
  const [ag4tOther, setAg4tOther] = useState(false);
  const [ag4iyOther, setAg4iyOther] = useState(false);
  const [ag4rOther, setAg4rOther] = useState(false);
  const [ag4resOther, setAg4resOther] = useState(false);
  const [ag4nOther, setAg4nOther] = useState(false);
  const [ag5tOther, setAg5tOther] = useState(false);
  const [ag5iyOther, setAg5iyOther] = useState(false);
  const [ag5rOther, setAg5rOther] = useState(false);
  const [ag5resOther, setAg5resOther] = useState(false);
  const [ag5nOther, setAg5nOther] = useState(false);
  const [ag6tOther, setAg6tOther] = useState(false);
  const [ag6iyOther, setAg6iyOther] = useState(false);
  const [ag6rOther, setAg6rOther] = useState(false);
  const [ag6resOther, setAg6resOther] = useState(false);
  const [ag6nOther, setAg6nOther] = useState(false);
  const [ag7tOther, setAg7tOther] = useState(false);
  const [ag7iyOther, setAg7iyOther] = useState(false);
  const [ag7rOther, setAg7rOther] = useState(false);
  const [ag7resOther, setAg7resOther] = useState(false);
  const [ag7nOther, setAg7nOther] = useState(false);
  const [ag8tOther, setAg8tOther] = useState(false);
  const [ag8iyOther, setAg8iyOther] = useState(false);
  const [ag8rOther, setAg8rOther] = useState(false);
  const [ag8resOther, setAg8resOther] = useState(false);
  const [ag8nOther, setAg8nOther] = useState(false);

  return (
    <>
      <div className="heightAndSafetyWrapper">
        <p>
          The details collected by this form will generate an inspection report.
          Please take the time to check all details thoroughly before submitting
          and ensure all fields are filled. If any fields are left blank within
          an asset group the report formatting will completely shit the bed.
          Deadset. So please, all the fields in each group need to be filled.
        </p>
        <h1>
          ABSEIL PRO <p>Rope Access & Height Safety</p>
        </h1>
        <hr />
        <label>Inspector Name</label>
        <div className="radioBtn">
          <div>
            <input
              label="Response A"
              type="radio"
              id="Jhen Storie"
              name="ab"
              value="Jhen Storie"
              checked={newInspector === "Jhen Storie"}
              onChange={(e) => setNewInspector(e.target.value, setOther(false))}
            />
            <label>Jhen Storie</label>
          </div>

          <div>
            <input
              label="Response B"
              type="radio"
              id="Jindy Debnie"
              name="ab"
              value="Jindy Debnie"
              checked={newInspector === "Jindy Debnie"}
              onChange={(e) => setNewInspector(e.target.value, setOther(false))}
            />
            <label>Jindy Debnie</label>
          </div>

          <div>
            <input
              label="Response C"
              type="radio"
              id="Vincent Geisler"
              name="ab"
              value="Vincent Geisler"
              checked={newInspector === "Vincent Geisler"}
              onChange={(e) => setNewInspector(e.target.value, setOther(false))}
            />
            <label>Vincent Geisler</label>
          </div>

          <div>
            <input
              label="Response D"
              type="radio"
              id="Emma Grace"
              name="ab"
              value="Emma Grace"
              checked={newInspector === "Emma Grace"}
              onChange={(e) => setNewInspector(e.target.value, setOther(false))}
            />
            <label>Emma Grace</label>
          </div>

          <div>
            <input
              label="Response E"
              type="radio"
              id="Daniel dos Santos Oliveira"
              name="ab"
              value="Daniel dos Santos Oliveira"
              checked={newInspector === "Daniel dos Santos Oliveira"}
              onChange={(e) => setNewInspector(e.target.value, setOther(false))}
            />
            <label>Daniel dos Santos Oliveira</label>
          </div>
          <div>
            <input
                label="Response F"
                type="radio"
                id="other"
                name="ab"
                value="type inspector here..."
                checked={newInspector === "type inspector here..."}
                onChange={(e) => setNewInspector(e.target.value, setOther(true))}
                />
            <label>Other:</label>
            {other && <input type="text" placeholder="Inspector name here ..." value={newInspector}  onChange={(e) => setNewInspector(e.target.value)}/>}
          </div>
        </div>
        <hr></hr>
        <div>
          <label>Inspection Date:</label>
          <DatePicker
            selected={heightStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setHeightStartDate(date)}
            className="six columns"
            dateFormat={"dd/MM/yyyy"}
            isClearable
            placeholderText="I have been cleared!"
          />
        </div>
        <hr></hr>
        <div>
          <label>Next Inspection Date:</label>
          <DatePicker
            selected={newInspectionDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setNewInspectionDate(date)}
            className="six columns"
            dateFormat={"dd/MM/yyyy"}
            isClearable
            placeholderText="I have been cleared!"
          />
        </div>
        <hr></hr>
        <div>
          <label>Email Address(es) to receive Working File</label>
          <input
            type="email"
            value={heightEmail}
            onChange={(e) => setHeightEmail(e.target.value)}
          />
        </div>
        <hr></hr>
        <div>
          <label>Site Name</label>
          <input
            type="text"
            value={heightSiteName}
            onChange={(e) => setHeightSiteName(e.target.value)}
          />
        </div>
        <hr></hr>
        <div>
          <label>Site Address</label>
          <input
            type="text"
            value={heightSiteAddress}
            onChange={(e) => setHeightSiteAddress(e.target.value)}
          />
        </div>
        <hr></hr>
        <div><h4>Asset Group 1</h4></div>
        <hr></hr>
        <div>
          <label>Asset Group 1 Quantity</label>
          <input
            type="text"
            placeholder="Your answer..."
            value={assetGroupOneQty}
            onChange={(e) => setAssetGroupOneQty(e.target.value)}
          />
        </div>
        <hr></hr>
        <div><label>Asset Group 1 Type</label></div>
        <div><p>Choose "Other" to add manufacturers information</p></div>
        {agotOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpOneType} onChange={(e) => setAssetGrpOneType(e.target.value) } />
        ) : (
        <select value={assetGrpOneType} onChange={(event) => {setAssetGrpOneType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Hand Rail">Ladder</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }   
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpOneType} checked={!agotOther ? false : true} onClick={() => setAgotOther(!agotOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>
      <hr></hr>

      <div><label>Asset Group 1 Inspection Type</label></div>
        
      {agoitOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpOneInspectionType} onChange={(e) => setAssetGrpOneInspectionType(e.target.value) } />
        ) : (
        <select value={assetGrpOneInspectionType} onChange={(event) => {setAssetGrpOneInspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load Test">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpOneInspectionType} checked={!agoitOther ? false : true} onClick={() => setAgoitOther(!agoitOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>
      <hr></hr>

      <div><label>Asset Group 1 Rating</label></div>
        
      {agorOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpOneRating} onChange={(e) => setAssetGrpOneRating(e.target.value) } />
        ) : (
        <select value={assetGrpOneRating} onChange={(event) => {setAssetGrpOneRating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpOneRating} checked={!agorOther ? false : true} onClick={() => setAgorOther(!agorOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 1 Result</label></div>
        
      {agoresOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpOneResult} onChange={(e) => setAssetGrpOneResult(e.target.value) } />
        ) : (
        <select value={assetGrpOneResult} onChange={(event) => {setAssetGrpOneResult(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpOneResult} checked={!agoresOther ? false : true} onClick={() => setAgoresOther(!agoresOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 1 Notes</label></div>
        
      {agonOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpOneNotes} onChange={(e) => setAssetGrpOneNotes(e.target.value) } />
        ) : (
        <select value={assetGrpOneNotes} onChange={(event) => {setAssetGrpOneNotes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpOneNotes} checked={!agonOther ? false : true} onClick={() => setAgonOther(!agonOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>
      <div><h4>Asset Group 2</h4></div>
      <hr></hr>

      <div><label>Asset Group 2 Quantity</label></div>
        
      <input type="text" value={assetGrpTwoQty} onChange={(e) => setAssetGrpTwoQty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 2 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {agttOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpTwoType} onChange={(e) => setAssetGrpTwoType(e.target.value) } />
        ) : (
        <select value={assetGrpTwoType} onChange={(event) => {setAssetGrpTwoType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpTwoType} checked={!agttOther ? false : true} onClick={() => setAgttOther(!agttOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 2 Inspection Type</label></div>
        
      {agtiyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpTwoInspectionType} onChange={(e) => setAssetGrpTwoInspectionType(e.target.value) } />
        ) : (
        <select value={assetGrpTwoInspectionType} onChange={(event) => {setAssetGrpTwoInspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpTwoInspectionType} checked={!agtiyOther ? false : true} onClick={() => setAgtiyOther(!agtiyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 2 Rating</label></div>
        
      {agtrOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpTwoRating} onChange={(e) => setAssetGrpTwoRating(e.target.value) } />
        ) : (
        <select value={assetGrpTwoRating} onChange={(event) => {setAssetGrpTwoRating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpTwoRating} checked={!agtrOther ? false : true} onClick={() => setAgtrOther(!agtrOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 2 Result</label></div>
        
      {agtresOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpTwoResult} onChange={(e) => setAssetGrpTwoResult(e.target.value) } />
        ) : (
        <select value={assetGrpTwoResult} onChange={(event) => {setAssetGrpTwoResult(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpTwoResult} checked={!agtresOther ? false : true} onClick={() => setAgtresOther(!agtresOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 2 Notes</label></div>
        
      {agtnOther ? (
          <input type="text" placeholder="Input here..." value={assetGrpTwoNotes} onChange={(e) => setAssetGrpTwoNotes(e.target.value) } />
        ) : (
        <select value={assetGrpTwoNotes} onChange={(event) => {setAssetGrpTwoNotes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrpTwoNotes} checked={!agtnOther ? false : true} onClick={() => setAgtnOther(!agtnOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      {/* ASSET GROUP 3 */}

      <hr></hr>
      <div><h4>Asset Group 3</h4></div>
      <hr></hr>

      <div><label>Asset Group 3 Quantity</label></div>
        
      <input type="text" value={assetGrp3Qty} onChange={(e) => setAssetGrp3Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 3 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag3tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp3Type} onChange={(e) => setAssetGrp3Type(e.target.value) } />
        ) : (
        <select value={assetGrp3Type} onChange={(event) => {setAssetGrp3Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp3Type} checked={!ag3tOther ? false : true} onClick={() => setAg3tOther(!ag3tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 3 Inspection Type</label></div>
        
      {ag3iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp3InspectionType} onChange={(e) => setAssetGrp3InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp3InspectionType} onChange={(event) => {setAssetGrp3InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp3InspectionType} checked={!ag3iyOther ? false : true} onClick={() => setAg3iyOther(!ag3iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 3 Rating</label></div>
        
      {ag3rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp3Rating} onChange={(e) => setAssetGrp3Rating(e.target.value) } />
        ) : (
        <select value={assetGrp3Rating} onChange={(event) => {setAssetGrp3Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp3Rating} checked={!ag3rOther ? false : true} onClick={() => setAg3rOther(!ag3rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 3 Result</label></div>
        
      {ag3resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp3Result} onChange={(e) => setAssetGrp3Result(e.target.value) } />
        ) : (
        <select value={assetGrp3Result} onChange={(event) => {setAssetGrp3Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp3Result} checked={!ag3resOther ? false : true} onClick={() => setAg3resOther(!ag3resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 3 Notes</label></div>
        
      {ag3nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp3Notes} onChange={(e) => setAssetGrp3Notes(e.target.value) } />
        ) : (
        <select value={assetGrp3Notes} onChange={(event) => {setAssetGrp3Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp3Notes} checked={!ag3nOther ? false : true} onClick={() => setAg3nOther(!ag3nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      {/* ASSET GROUP 4 */}

      <hr></hr>
      <div><h4>Asset Group 4</h4></div>
      <hr></hr>

      <div><label>Asset Group 4 Quantity</label></div>
        
      <input type="text" value={assetGrp4Qty} onChange={(e) => setAssetGrp4Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 4 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag4tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp4Type} onChange={(e) => setAssetGrp4Type(e.target.value) } />
        ) : (
        <select value={assetGrp4Type} onChange={(event) => {setAssetGrp4Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp4Type} checked={!ag4tOther ? false : true} onClick={() => setAg4tOther(!ag4tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 4 Inspection Type</label></div>
        
      {ag4iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp4InspectionType} onChange={(e) => setAssetGrp4InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp4InspectionType} onChange={(event) => {setAssetGrp4InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp4InspectionType} checked={!ag4iyOther ? false : true} onClick={() => setAg4iyOther(!ag4iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 4 Rating</label></div>
        
      {ag4rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp4Rating} onChange={(e) => setAssetGrp4Rating(e.target.value) } />
        ) : (
        <select value={assetGrp4Rating} onChange={(event) => {setAssetGrp4Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp4Rating} checked={!ag4rOther ? false : true} onClick={() => setAg4rOther(!ag4rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 4 Result</label></div>
        
      {ag4resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp4Result} onChange={(e) => setAssetGrp4Result(e.target.value) } />
        ) : (
        <select value={assetGrp4Result} onChange={(event) => {setAssetGrp4Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp4Result} checked={!ag4resOther ? false : true} onClick={() => setAg4resOther(!ag4resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 4 Notes</label></div>
        
      {ag4nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp4Notes} onChange={(e) => setAssetGrp4Notes(e.target.value) } />
        ) : (
        <select value={assetGrp4Notes} onChange={(event) => {setAssetGrp4Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp4Notes} checked={!ag4nOther ? false : true} onClick={() => setAg4nOther(!ag4nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      {/* ASSET GROUP 5 */}

      <hr></hr>
      <div><h4>Asset Group 5</h4></div>
      <hr></hr>

      <div><label>Asset Group 5 Quantity</label></div>
        
      <input type="text" value={assetGrp5Qty} onChange={(e) => setAssetGrp5Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 5 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag5tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp5Type} onChange={(e) => setAssetGrp5Type(e.target.value) } />
        ) : (
        <select value={assetGrp5Type} onChange={(event) => {setAssetGrp5Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp5Type} checked={!ag5tOther ? false : true} onClick={() => setAg5tOther(!ag5tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 5 Inspection Type</label></div>
        
      {ag5iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp5InspectionType} onChange={(e) => setAssetGrp5InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp5InspectionType} onChange={(event) => {setAssetGrp5InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp5InspectionType} checked={!ag5iyOther ? false : true} onClick={() => setAg5iyOther(!ag5iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 5 Rating</label></div>
        
      {ag5rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp5Rating} onChange={(e) => setAssetGrp5Rating(e.target.value) } />
        ) : (
        <select value={assetGrp5Rating} onChange={(event) => {setAssetGrp5Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp5Rating} checked={!ag5rOther ? false : true} onClick={() => setAg5rOther(!ag5rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 5 Result</label></div>
        
      {ag5resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp5Result} onChange={(e) => setAssetGrp5Result(e.target.value) } />
        ) : (
        <select value={assetGrp5Result} onChange={(event) => {setAssetGrp5Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp5Result} checked={!ag5resOther ? false : true} onClick={() => setAg5resOther(!ag5resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 5 Notes</label></div>
        
      {ag5nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp5Notes} onChange={(e) => setAssetGrp5Notes(e.target.value) } />
        ) : (
        <select value={assetGrp5Notes} onChange={(event) => {setAssetGrp5Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp5Notes} checked={!ag5nOther ? false : true} onClick={() => setAg5nOther(!ag5nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      {/* ASSET GROUP 6 */}

      <hr></hr>
      <div><h4>Asset Group 6</h4></div>
      <hr></hr>

      <div><label>Asset Group 6 Quantity</label></div>
        
      <input type="text" value={assetGrp6Qty} onChange={(e) => setAssetGrp6Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 6 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag6tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp6Type} onChange={(e) => setAssetGrp6Type(e.target.value) } />
        ) : (
        <select value={assetGrp6Type} onChange={(event) => {setAssetGrp6Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp6Type} checked={!ag6tOther ? false : true} onClick={() => setAg6tOther(!ag6tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 6 Inspection Type</label></div>
        
      {ag6iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp6InspectionType} onChange={(e) => setAssetGrp6InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp6InspectionType} onChange={(event) => {setAssetGrp6InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp6InspectionType} checked={!ag6iyOther ? false : true} onClick={() => setAg6iyOther(!ag6iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 6 Rating</label></div>
        
      {ag6rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp6Rating} onChange={(e) => setAssetGrp6Rating(e.target.value) } />
        ) : (
        <select value={assetGrp6Rating} onChange={(event) => {setAssetGrp6Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp6Rating} checked={!ag6rOther ? false : true} onClick={() => setAg6rOther(!ag6rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 6 Result</label></div>
        
      {ag6resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp6Result} onChange={(e) => setAssetGrp6Result(e.target.value) } />
        ) : (
        <select value={assetGrp6Result} onChange={(event) => {setAssetGrp6Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp6Result} checked={!ag6resOther ? false : true} onClick={() => setAg6resOther(!ag6resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 6 Notes</label></div>
        
      {ag6nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp6Notes} onChange={(e) => setAssetGrp6Notes(e.target.value) } />
        ) : (
        <select value={assetGrp6Notes} onChange={(event) => {setAssetGrp6Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp6Notes} checked={!ag6nOther ? false : true} onClick={() => setAg6nOther(!ag6nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      {/* ASSET GROUP 7 */}

      <hr></hr>
      <div><h4>Asset Group 7</h4></div>
      <hr></hr>

      <div><label>Asset Group 7 Quantity</label></div>
        
      <input type="text" value={assetGrp7Qty} onChange={(e) => setAssetGrp7Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 7 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag7tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp7Type} onChange={(e) => setAssetGrp7Type(e.target.value) } />
        ) : (
        <select value={assetGrp7Type} onChange={(event) => {setAssetGrp7Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp7Type} checked={!ag7tOther ? false : true} onClick={() => setAg7tOther(!ag7tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 7 Inspection Type</label></div>
        
      {ag7iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp7InspectionType} onChange={(e) => setAssetGrp7InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp7InspectionType} onChange={(event) => {setAssetGrp7InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp7InspectionType} checked={!ag7iyOther ? false : true} onClick={() => setAg7iyOther(!ag7iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 7 Rating</label></div>
        
      {ag7rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp7Rating} onChange={(e) => setAssetGrp7Rating(e.target.value) } />
        ) : (
        <select value={assetGrp7Rating} onChange={(event) => {setAssetGrp7Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp7Rating} checked={!ag7rOther ? false : true} onClick={() => setAg7rOther(!ag7rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 7 Result</label></div>
        
      {ag7resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp7Result} onChange={(e) => setAssetGrp7Result(e.target.value) } />
        ) : (
        <select value={assetGrp7Result} onChange={(event) => {setAssetGrp7Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp7Result} checked={!ag7resOther ? false : true} onClick={() => setAg7resOther(!ag7resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 7 Notes</label></div>
        
      {ag7nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp7Notes} onChange={(e) => setAssetGrp7Notes(e.target.value) } />
        ) : (
        <select value={assetGrp7Notes} onChange={(event) => {setAssetGrp7Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp7Notes} checked={!ag7nOther ? false : true} onClick={() => setAg7nOther(!ag7nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      {/* ASSET GROUP 8 */}

      <hr></hr>
      <div><h4>Asset Group 8</h4></div>
      <hr></hr>

      <div><label>Asset Group 8 Quantity</label></div>
        
      <input type="text" value={assetGrp8Qty} onChange={(e) => setAssetGrp8Qty(e.target.value)} />

      <hr></hr>

      <div><label>Asset Group 8 Type</label></div>
      <div><p>Choose "Other" to add manufacturers information</p></div>
        
      {ag8tOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp8Type} onChange={(e) => setAssetGrp8Type(e.target.value) } />
        ) : (
        <select value={assetGrp8Type} onChange={(event) => {setAssetGrp8Type(event.target.value)}}>
          <option>Choose here...</option>
          <option value="M12 Concrete Mount Anchor Point">M12 Concrete Mount Anchor Point</option>
          <option value="M16 Concrete Mount Anchor Point">M16 Concrete Mount Anchor Point</option>
          <option value="Purlin Mount Anchor Point">Purlin Mount Anchor Point</option>
          <option value="Surface Mount Abseil Anchor Point">Surface Mount Abseil Anchor Point</option>
          <option value="Surface Mount Fall Arrest Anchor Point">Surface Mount Fall Arrest Anchor Point</option>
          <option value="Static Line Span">Static Line Span</option>
          <option value="Davit Base">Davit Base</option>
          <option value="Davit Arm">Davit Arm</option>
          <option value="Raptor Rail Span">Raptor Rail Span</option>
          <option value="Bolt Through Anchor">Bolt Through Anchor</option>
          <option value="Cast In Anchor">Cast In Anchor</option>
          <option value="Soffit Tri Plate">Soffit Tri Plate</option>
          <option value="Concrete Friction Mount Soffit Anchor">Concrete Friction Mount Soffit Anchor</option>
          <option value="Ladder">Ladder</option>
          <option value="Hand Rail">Hand Rail</option>
          <option value="Stainless Steel Strop">Stainless Steel Strop</option>
          <option value="Carabiner">Carabiner</option>
          <option value="Stairway">Stairway</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp8Type} checked={!ag8tOther ? false : true} onClick={() => setAg8tOther(!ag8tOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 8 Inspection Type</label></div>
        
      {ag8iyOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp8InspectionType} onChange={(e) => setAssetGrp8InspectionType(e.target.value) } />
        ) : (
        <select value={assetGrp8InspectionType} onChange={(event) => {setAssetGrp8InspectionType(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Load">Load Test</option>
          <option value="Visual Inspection">Visual Inspection</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp8InspectionType} checked={!ag8iyOther ? false : true} onClick={() => setAg8iyOther(!ag8iyOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      <hr></hr>

      <div><label>Asset Group 8 Rating</label></div>
        
      {ag8rOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp8Rating} onChange={(e) => setAssetGrp8Rating(e.target.value) } />
        ) : (
        <select value={assetGrp8Rating} onChange={(event) => {setAssetGrp8Rating(event.target.value)}}>
          <option>Choose here...</option>
          <option value="6kN">6kN</option>
          <option value="12kN">12kN</option>
          <option value="15kN">15kN</option>
          <option value="21kN">21kN</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp8Rating} checked={!ag8rOther ? false : true} onClick={() => setAg8rOther(!ag8rOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 8 Result</label></div>
        
      {ag8resOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp8Result} onChange={(e) => setAssetGrp8Result(e.target.value) } />
        ) : (
        <select value={assetGrp8Result} onChange={(event) => {setAssetGrp8Result(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp8Result} checked={!ag8resOther ? false : true} onClick={() => setAg8resOther(!ag8resOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>


      <hr></hr>

      <div><label>Asset Group 8 Notes</label></div>
        
      {ag8nOther ? (
          <input type="text" placeholder="Input here..." value={assetGrp8Notes} onChange={(e) => setAssetGrp8Notes(e.target.value) } />
        ) : (
        <select value={assetGrp8Notes} onChange={(event) => {setAssetGrp8Notes(event.target.value)}}>
          <option>Choose here...</option>
          <option value="Failed load test">Failed load test</option>
          <option value="Failed due to missing documentation">Failed due to missing documentation</option>
          <option value="Requires engineer inspection">Requires engineer inspection</option>
          <option value="Failed due to missing or damaged fasteners">Failed due to missing or damaged fasteners</option>
          <option value="Roof - Adjacent to plant room">Roof - Adjacent to plant room</option>
          <option value="Upper roof level">Upper roof level</option>
          <option value="Podium level">Podium level</option>
          <option value="Failed due to shock absorber deployment or damage">Failed due to shock absorber deployment or damage</option>
          <option value="Failed due to improper placement">Failed due to improper placement</option>
          <option value="SAYFA">SAYFA</option>
          <option value="SafetyLink">SafetyLink</option>
          <option value="RIS">RIS</option>
          <option value="MHS">MHS</option>
          <option value="AHS">AHS</option>
        </select>
        )
      }
      <br></br>
      <div style={{display:"flex",alignItems:"baseline",paddingTop:"15px"}}>
        <input type="radio" value={assetGrp8Notes} checked={!ag8nOther ? false : true} onClick={() => setAg8nOther(!ag8nOther ? true : false)} />
        <label style={{paddingLeft:"15px"}}>Other</label>
      </div>

      


        {/* submit button */}

        <div  className="btnWrapper">
          <input
            className="button-primary"
            type="submit"
            value="submit"
            onClick={createHeightSafety}
          />
        </div>
      </div>
      <style jsx>{`
        
        .radioBtn > div {
            display:flex;
            gap: 15px;
        }

        input[type="email"],input[type="submit"],input[type="text"], inpu[type="radio"], select {
          width: 100%;
        }

        .button-primary {
          margin: 15px 0;
        }
    `}</style>
    </>
  );
}

export default HeightAndSafetyForm;
