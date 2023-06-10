/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import dateFormat, { masks } from "dateformat";
import ImageUpload from "./ImageUpload";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../src/config/firebase.config";

function HeightAndSafetyToPrint({ job }) {
  const [imageList, setImageList] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print Height and Safety Docs",
    onAfterPrint: () => alert("Print Success"),
  });

  const inspectionDate = `${
    !job.inspection_date
      ? ""
      : new Date(job.inspection_date.seconds * 1000).toLocaleDateString("en-US")
  }`;
  const nextInspectionDue = `${
    !job.next_inspection_date
      ? ""
      : new Date(job.next_inspection_date.seconds * 1000).toLocaleDateString(
          "en-US"
        )
  }`;

  const imageListRef = ref(storage, `${job.jobNumber}/`);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <div style={{ width: "80vw", margin: "0 auto" }}>
        <div ref={componentRef} className="heightSafetyToPrintWrapper">
          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <div style={{ borderBottom: "1px solid black" }}>
              <h2>Height Safety Inspection Certificate</h2>
            </div>
            {/* <div className='bg' style={{ backgroundImage:"url('/BG.png')",height:"434px",width:"100%"}}></div> */}
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <img
                src="/BG.png"
                alt="Picture of the author"
                width="100%"
                height="300px"
              />
            </div>
            <div
              style={{
                background: "#666666",
                color: "#ffff",
                padding: "15px 10px 3px",
              }}
            >
              <div style={{ fontSize: "40px", whiteSpace: "nowrap" }}>
                {job.name}
              </div>
              <div style={{ fontSize: "30px" }}>{job.site_address}</div>
            </div>
            <div style={{ fontSize: "40px", paddingTop: "20px" }}>
              Inspection Date
            </div>
            <div
              style={{
                background: "#FF9900",
                color: "#ffff",
                fontSize: "50px",
                paddingLeft: "10px",
              }}
            >
              {!inspectionDate
                ? "DD / MM / YYYY"
                : dateFormat(inspectionDate, "dd mmm yyyy")}
            </div>
            <div style={{ fontSize: "40px", paddingTop: "20px" }}>
              Next Inspection Due
            </div>
            <div
              style={{
                background: "#FF9900",
                color: "#ffff",
                fontSize: "50px",
                marginBottom: "50px",
                paddingLeft: "10px",
              }}
            >
              {!nextInspectionDue
                ? "DD / MM / YYYY"
                : dateFormat(nextInspectionDue, "dd mmm yyyy")}
            </div>
          </div>

          {/* Height Safety Body */}

          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <div className="mainWrapper">
              <div className="paragraphHeader">Important Information</div>
              <div className="content">
                <p>
                  Abseil Pro is a rope access & height safety company
                  specializing in rope access and height safety operations
                  including installation and inspection of height safety
                  equipment. The height safety system at Arcadia North Gallery
                  21 Mollison St, West End, Brisbane has been inspected
                  according to Australian Standards. This report provides
                  details on installation, certification and operation of safety
                  systems.
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Permanently installed anchorages must be inspected by a
                  competent person at intervals not exceeding 12 months.
                  Adequate inspection records shall be kept. Wherever
                  practicable a plate indicating the date of the last inspection
                  should be placed near the anchorage.
                </p>
                <p>
                  In the selection of the components of a system for any
                  particular task, care should be taken that the equipment gives
                  the operator, as far as is compatible with safety, the maximum
                  degree of comfort, freedom of movement and, in the event of a
                  limited free fall, the greatest protection from injury.
                </p>
                <p>
                  The purchaser and operator should be aware of the intended
                  uses and use limitations of the various system components and
                  the forms they may take. In any situation in rope suspension
                  work where a free fall of more than 600 mm could occur, e.g.
                  when moving into position but prior to connection to the rope,
                  the need for fall-arrest equipment or devices in accordance
                  with AS/NZS 1891.1 or AS/NZS 1891.3 should be considered.
                </p>
                <p>
                  Selection of the type of anchorage will depend on the nature
                  and location of the task and the type of construction of the
                  building or supporting structure. The operator should make an
                  inspection by both sight and touch, before and after each use
                  of the equipment and anchorages to ensure that they are in a
                  serviceable condition. Anchorages should be visually inspected
                  before each use and not used unless they are free from signs
                  of damage, corrosion and other defects.
                </p>
                <p>
                  It should be impressed upon operators that their lives depend
                  upon the continued efficiency and durability of this
                  equipment.
                </p>
                <p>
                  Any piece of equipment which shows any defect shall be
                  withdrawn from service immediately and a replacement obtained
                  if necessary. A label indicating the defect should be attached
                  to the defective equipment, and it should be examined by a
                  competent person who will decide whether the equipment is
                  either to be destroyed or repaired as necessary and returned
                  to service.
                </p>
              </div>
              <div className="paragraphHeader">Responsibility</div>
              <div className="content">
                <p style={{ fontWeight: "bold" }}>
                  It is the responsibility of the building owners and management
                  to ensure the safety of workers by maintaining height safety
                  systems and associated components. This responsibility
                  includes certifying systems annually through documented
                  inspections performed by certified, competent technicians.
                  Building owners and management should ensure that:
                </p>
                <ol className="resOrder">
                  <li>
                    Locations of anchors comply with the requirements for safe
                    use, safe access, the pendulum effect and signage, as
                    stipulated in clause 3.2 of AS 1891.4.
                  </li>
                  <li>
                    Structural supports for anchors are assessed separately, by
                    a suitably qualified engineer (as stipulated in AS/NZS
                    1891.4, clause 3.1.2.) or by a competent person, as
                    appropriate, and the assessment documented.
                  </li>
                  <li>
                    Anchors are inspected for compliance within the requirements
                    in clause 9.3.3 of AS/NZS 1891.4 and the inspection
                    documented. The documentation should specify any ongoing
                    requirement to carry out testing of anchor points.
                  </li>
                  <li>
                    Anchors are suitably labelled with a test tag, stating when
                    the anchors are due to be tested or the last test date
                    specified.
                  </li>
                </ol>
              </div>
            </div>
            <div className="paragraphHeader">Emergency Procedures</div>
            <div className="content">
              <p>
                Under the Australian Standards and Regulations, emergency
                procedures must be developed and in place to ensure that, in the
                event of a fall, or other emergency, any employee using a travel
                arrest, fall restraint system or rope access system is rescued
                as quickly as possible to prevent injury from prolonged
                suspension trauma.
              </p>
              <p>
                All contractors and employees who use this system must provide a
                site specific Job Safety & Environmental Analysis (JSEA), Safe
                Work Method Statement (SWMS), and a rescue plan that can be
                implemented swiftly in case of an incident. All operators must
                be trained in the procedures they are undertaking and all users
                must operate within their level of competency.
              </p>
            </div>
          </div>

          <div style={{ pageBreakAfter: "always" }}>
            <div className="paragraphHeader">Training & Supervision</div>
            <div className="content">
              <p>
                Employees using travel arrest, fall restraint or rope access
                systems must be adequately trained and / or supervised in their
                correct use. Instructions supplied with the system should
                specify the level of competence required for safe use.
              </p>
            </div>
            <div className="paragraphHeader">Compliance</div>
            <div className="content">
              <p style={{ fontWeight: "bold" }}>
                The following documents were used in the creation of this report
              </p>
              <ul>
                <li>
                  <p>
                    AS/NZS 1891 - Industrial fall arrest systems and devices
                  </p>
                </li>
                <li>
                  <p>AS/NZS 1891.1 - Safety belts and Harnesses</p>
                </li>
                <li>
                  <p>AS/NZS 1891.2 - Horizontal life line and rail systems</p>
                </li>
                <li>
                  <p>AS/NZS 1891.3 - Fall arrest devices</p>
                </li>
                <li>
                  <p>AS/NZS 1891.4 - Selection, use and maintenance</p>
                </li>
                <li>
                  <p>AS/NZS 4488 - Industrial Rope Access Systems</p>
                </li>
                <li>
                  <p>AS/NZS 4488.2:1997- Selection, use and maintenance</p>
                </li>
                <li>
                  <p>
                    AS/NZS ISO 22846.2:2020 - Personal equipment for protection
                    against falls - Rope access systems
                    <div className="part2">Part 2: Code of practice</div>
                  </p>
                </li>
                <li>
                  <p>
                    Australian Rope Access Association (ARAA) Code of Practice
                  </p>
                </li>
                <li>
                  <p>
                    Industrial Rope Access Trade Association (IRATA) Code of
                    Practice
                  </p>
                </li>
                <li>
                  <p>
                    Managing the risk of falls at workplaces Workplace Health
                    and Safety Act 2011
                  </p>
                </li>
                <li>
                  <p>Queensland Workplace Health and Safety Act 2011</p>
                </li>
                <li>
                  <p>Queensland Workplace Health and Safety Regulations 2011</p>
                </li>
              </ul>
            </div>
          </div>

          {/* INSPECTION SUMMARY */}

          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <div>
              <h2>Inspection Summary</h2>
            </div>
            <table className="flexBox">
              <tr>
                <td>Site</td>
                <td>{job.site_name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{job.site_address}</td>
              </tr>
              <tr>
                <td>Inspected By</td>
                <td>{job.inspector_name}</td>
              </tr>
              <tr>
                <td>Inspection Date</td>
                <td>
                  {!inspectionDate
                    ? "DD / MM / YYYY"
                    : dateFormat(inspectionDate, "dd mmm yyyy")}
                </td>
              </tr>
              <tr>
                <td>Next Inspection Date</td>
                <td>
                  {!nextInspectionDue
                    ? "DD / MM / YYYY"
                    : dateFormat(nextInspectionDue, "dd mmm yyyy")}
                </td>
              </tr>
            </table>
            <table>
              <tr className="inspection">
                <th>QTY</th>
                <th>Asset</th>
                <th>Inspection</th>
                <th>Rating</th>
                <th>Notes</th>
                <th>Result</th>
              </tr>
              <tr>
                <td>{job.asset_group_1_qty}</td>
                <td>{job.asset_group_1_type}</td>
                <td>{job.asset_group_1_inspection_type}</td>
                <td>{job.asset_group_1_rating}</td>
                <td>{job.asset_group_1_notes}</td>
                <td className="result">{job.asset_group_1_result}</td>
              </tr>
              <tr>
                <td>{job.asset_group_2_qty}</td>
                <td>{job.asset_group_2_type}</td>
                <td>{job.asset_group_2_inspection_type}</td>
                <td>{job.asset_group_2_rating}</td>
                <td>{job.asset_group_2_notes}</td>
                <td className="result">{job.asset_group_2_result}</td>
              </tr>
              <tr>
                <td>{job.asset_group_3_qty}</td>
                <td>{job.asset_grp_3_type}</td>
                <td>{job.asset_grp_3_inspection_type}</td>
                <td>{job.asset_grp_3_rating}</td>
                <td>{job.asset_grp_3_notes}</td>
                <td className="result">{job.asset_grp_3_result}</td>
              </tr>
              <tr>
                <td>{job.asset_grp_4_qty}</td>
                <td>{job.asset_grp_4_type}</td>
                <td>{job.asset_grp_4_inspection_type}</td>
                <td>{job.asset_grp_4_rating}</td>
                <td>{job.asset_grp_4_notes}</td>
                <td className="result">{job.asset_grp_4_result}</td>
              </tr>
              <tr>
                <td>{job.asset_grp_5_qty}</td>
                <td>{job.asset_grp_5_type}</td>
                <td>{job.asset_grp_5_inspection_type}</td>
                <td>{job.asset_grp_5_rating}</td>
                <td>{job.asset_grp_5_notes}</td>
                <td className="result">{job.asset_grp_5_result}</td>
              </tr>
              <tr>
                <td>{job.asset_grp_6_qty}</td>
                <td>{job.asset_grp_6_type}</td>
                <td>{job.asset_grp_6_inspection_type}</td>
                <td>{job.asset_grp_6_rating}</td>
                <td>{job.asset_grp_6_notes}</td>
                <td className="result">{job.asset_grp_6_result}</td>
              </tr>
              <tr>
                <td>{job.asset_grp_7_qty}</td>
                <td>{job.asset_grp_7_type}</td>
                <td>{job.asset_grp_7_inspection_type}</td>
                <td>{job.asset_grp_7_rating}</td>
                <td>{job.asset_grp_7_notes}</td>
                <td className="result">{job.asset_grp_7_result}</td>
              </tr>
              <tr>
                <td>{job.asset_grp_8_qty}</td>
                <td>{job.asset_grp_8_type}</td>
                <td>{job.asset_grp_8_inspection_type}</td>
                <td>{job.asset_grp_8_rating}</td>
                <td>{job.asset_grp_8_notes}</td>
                <td className="result">{job.asset_grp_8_result}</td>
              </tr>
            </table>
          </div>

          {/* HEIGHT AND SAFETY ASSET MAP */}

          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <div style={{ borderBottom: "1px solid black" }}>
              <h2>Height Safety Asset Map</h2>
            </div>
            <div>
              {job.mapImageUrl ? (
                <img src={job.mapImageUrl} className="jobImage" />
              ) : (
                <div>
                  <ImageUpload
                    mapImage={mapImage}
                    handleUpload={handleUpload}
                    handleChange={handleChange}
                  />
                  <br />
                  <button onClick={addMapPhoto}>Send</button>
                  <br />
                  <input
                    type="hidden"
                    value={imgMapUrl}
                    onChange={(event) => {
                      setImgMapUrl(event.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="assetMapFooter">
              <div
                className="box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/logo.png" width="100" />
              </div>
              <div
                className="box box2"
                style={{ borderLeft: "none", borderRight: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "#666666",
                    color: "white",
                    fontWeight: "bold",
                    padding: "1%",
                    fontSize: "18px",
                  }}
                >
                  Site
                </div>
                <div
                  style={{
                    borderBottom: "1px solid black",
                    padding: "2% 1% 8%",
                  }}
                >
                  <p>{job.site_address}</p>
                </div>
                <div style={{ padding: "7% 3% 2%", fontSize: "18px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Abseil Pro
                  </span>
                  <p style={{ fontSize: "18px" }}>0438 257 892</p>
                  <p style={{ fontSize: "18px" }}>info@abseil.pro</p>
                  <p style={{ fontSize: "18px" }}>www.abseil.pro</p>
                  <p>
                    The Trustee for Abseil.Pro Trust PO Box 7757 East Brisbane
                    4169 ABN 99 422 738 977
                  </p>
                </div>
              </div>
              <div className="box box3">
                <div
                  style={{
                    backgroundColor: "#666666",
                    color: "white",
                    fontWeight: "bold",
                    padding: "1%",
                    fontSize: "18px",
                  }}
                >
                  Fixed Asset Legend
                </div>
                <table style={{ marginBottom: 0 }}>
                  <tr style={{ width: "100%", height: "26px" }}></tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>Rope Access Anchor</td>
                    <td className="symbol" style={{ color: "#4A86E8" }}>
                      &#9679;
                    </td>
                    <td>Fall Arrest Achor</td>
                    <td
                      className="symbol"
                      style={{ color: "#FF0000", borderRight: "none" }}
                    >
                      &#9679;
                    </td>
                  </tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>
                      Fall Arrest Static Line or Wire Strop
                    </td>
                    <td className="symbol" style={{ color: "#FF0000" }}>
                      &#9602;
                    </td>
                    <td>Fall Arrest Achor</td>
                    <td
                      className="symbol"
                      style={{ color: "#1CE31C", borderRight: "none" }}
                    >
                      &#9679;
                    </td>
                  </tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>Davit Base</td>
                    <td className="symbol" style={{ color: "#4A86E8" }}>
                      &#9670;
                    </td>
                    <td>Abseil Rail</td>
                    <td
                      className="symbol"
                      style={{ color: "#4A86E8", borderRight: "none" }}
                    >
                      &#9602;
                    </td>
                  </tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>Hand Rail</td>
                    <td className="symbol" style={{ color: "#21F021" }}>
                      &#9602;
                    </td>
                    <td>Ladder Bracket</td>
                    <td
                      className="symbol"
                      style={{ color: "#4A86E8", borderRight: "none" }}
                    >
                      &#9650;
                    </td>
                  </tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>Access Hatch/Doorway</td>
                    <td className="symbol" style={{ color: "#FF0000" }}>
                      &#9724;
                    </td>
                    <td>Fixed Ladder</td>
                    <td
                      className="symbol"
                      style={{ color: "#1CE31C", borderRight: "none" }}
                    >
                      &#9650;
                    </td>
                  </tr>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <td style={{ borderLeft: "none" }}>Stairway</td>
                    <td className="symbol" style={{ color: "#FF0000" }}>
                      &#9650;
                    </td>
                    <td></td>
                    <td
                      className="symbol"
                      style={{ color: "#1CE31C", borderRight: "none" }}
                    ></td>
                  </tr>
                  <tr
                    className="lastRow"
                    style={{ whiteSpace: "nowrap", borderBottom: "none" }}
                  >
                    <td style={{ borderLeft: "none" }}>Walkway</td>
                    <td className="symbol" style={{ color: "#4285F4" }}>
                      &#9724;
                    </td>
                    <td>
                      Failed Asset{" "}
                      <span style={{ fontWeight: "bold" }}>(Do Not Use)</span>
                    </td>
                    <td
                      className="symbol"
                      style={{
                        color: "#FF0000",
                        borderRight: "none",
                        fontWeight: "bold",
                      }}
                    >
                      &#8854;
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          {/* IMAGES */}

          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <h1>Images</h1>
            <hr />
            <div className="imageGrid">
              {imageList.map((url) => {
                return (
                  <img src={url} style={{ width: "300px",height:"300px", margin: "10px" }} />
                );
              })}
            </div>
          </div>

          {/* Inspection Report */}


          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <h1>Inspection Report</h1>
            <hr />
            <table className="flexBox">
              <tr>
                <td>Site</td>
                <td>{job.site_name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{job.site_address}</td>
              </tr>
              <tr>
                <td>Inspected By</td>
                <td>{job.inspector_name}</td>
              </tr>
              <tr>
                <td>Inspection Date</td>
                <td>
                  {!inspectionDate
                    ? "DD / MM / YYYY"
                    : dateFormat(inspectionDate, "dd mmm yyyy")}
                </td>
              </tr>
              <tr>
                <td>Next Inspection Date</td>
                <td>
                  {!nextInspectionDue
                    ? "DD / MM / YYYY"
                    : dateFormat(nextInspectionDue, "dd mmm yyyy")}
                </td>
              </tr>
            </table>
            <table>
              <tr className="inspection">
                <th>QTY</th>
                <th>Asset</th>
                <th>Inspection</th>
                <th>Rating</th>
                <th>Notes</th>
                <th>Result</th>
              </tr>
              {job?.inspectionReport?.map((report) => {
                return <tr>
                  <td>{report.qty}</td>
                  <td>{report.asset}</td>
                  <td>{report.inspection}</td>
                  <td>{report.rating}</td>
                  <td>{report.notes}</td>
                  <td style={{fontSize:"18px",fontWeight:"bold"}}>{report.result}</td>
                </tr>
              })}
            </table>
            
          </div>

          <div className="titleHeader">
            <img
              src="/LOGO_CERT.png"
              style={{ display: "block", width: "443px", height: "69px" }}
            />
            <div className="contactInfo" style={{ textAlign: "right" }}>
              <p>The Trustee for Abseil.Pro Trust</p>
              <p>PO Box 7757 East Brisbane 4169</p>
              <p>ABN 99 422 738 977</p>
              <br></br>
              <p>0438 257 892</p>
              <p>info@abseil.pro</p>
              <p>www.abseil.pro</p>
            </div>
          </div>
          <div style={{ pageBreakAfter: "always" }}>
            <h1>Calibration Certificates</h1>
            <hr />
            <div style={{display: "flex",justifyContent:"center",alignItems:"center", margin:"50px",padding:"20px"}}>
              <img src="/calibration_pic.jpg" width="300" />
            </div>
            
            
          </div>






        </div>
      </div>

      <button className="printBtn" onClick={handlePrint}>
        PRINT
      </button>
      <style jsx>{`
        .heightSafetyToPrintWrapper {
          background: white;
        }

        p {
          font-size: 12px;
          padding: 0;
          margin: 0;
        }

        .titleHeader {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .paragraphHeader {
          font-size: 18px;
          font-weight: 500;
          border-bottom: 1px solid #000;
        }

        .content {
          padding: 15px 2px;
        }

        li {
          text-align: justify;
          font-size: 12px;
        }

        .flexBox {
          width: 100%;
        }

        p {
          margin-bottom: 1%;
          line-height: 1;
          font-size: 12px;
        }

        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
          font-size: 12px;
        }

        td,
        th {
          border: 1px solid black;
          text-align: left;
          padding: 8px;
        }

        .inspection th {
          text-align: center;
        }

        .result {
          font-size: 18px;
          font-weight: bold;
        }

        .jobImage {
          object-fit: cover;
          object-position: center;
          height: 300px;
          width: 100%;
        }

        .assetMapFooter {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr;
          justify-content: center;
        }

        .assetMapFooter .box {
          border: 1px solid black;
          width: 100%;
        }

        .symbol {
          font-size: 20px;
          text-align: center;
        }

        .lastRow td {
          border-bottom: none;
        }

        .mapImage {
          background-image: linear-gradient(
              146deg,
              rgba(0, 0, 0, 0.2) 52%,
              #fff
            ),
            url("/BG.png");
          background-color: rgba(14, 14, 14, 0.9);
          background-position: 0px 0px, 0px 0px;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .imageGrid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          width: 100%;
          margin: 0 auto;
          grid-gap: 15px;
          padding: 20px 0;
        }

        .imageGrid div {
          border: 1px solid black;
          text-align: center;
          height: 240px;
        }

        .printBtn {
          position: sticky;
          bottom: 0;
          right: 0;
          padding: 15px;
          cursor: pointer;
        }

        @page {
          size: auto;
          margin: 20px;
        }
      `}</style>
    </>
  );
}

export default HeightAndSafetyToPrint;
