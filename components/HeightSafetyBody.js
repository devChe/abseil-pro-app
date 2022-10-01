/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import dateFormat, { masks } from "dateformat";
import jsPDF from "jspdf";
import Image from "next/image";
import html2canvas from "html2canvas";

function HeightSafetyBody({ job }) {

  const generate = () => {
    const quality = 8 // Higher the better but larger file
    html2canvas(document.querySelector('#target'),
        { scale: quality }
    ).then(canvas => {
        // Document of 210mm wide and 297mm high
        const pdf = new jsPDF('p', 'mm', 'letter');
        pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 1, 3, 208, 280);
        pdf.save("height_safety_body.pdf");
    });
  }

  return (
    <>
      <div id="target">
        <div className="mainWrapper">
          <div className="titleHeader">Important Information</div>
          <div className="content">
            <p>
              Abseil Pro is a rope access & height safety company specializing
              in rope access and height safety operations including installation
              and inspection of height safety equipment. The height safety
              system at Arcadia North Gallery 21 Mollison St, West End, Brisbane
              has been inspected according to Australian Standards. This report
              provides details on installation, certification and operation of
              safety systems.
            </p>
            <p style={{fontWeight:"bold"}}>
              Permanently installed anchorages must be inspected by a competent
              person at intervals not exceeding 12 months. Adequate inspection
              records shall be kept. Wherever practicable a plate indicating the
              date of the last inspection should be placed near the anchorage.
            </p>
            <p>
              In the selection of the components of a system for any particular
              task, care should be taken that the equipment gives the operator,
              as far as is compatible with safety, the maximum degree of
              comfort, freedom of movement and, in the event of a limited free
              fall, the greatest protection from injury.
            </p>
            <p>
              The purchaser and operator should be aware of the intended uses
              and use limitations of the various system components and the forms
              they may take. In any situation in rope suspension work where a
              free fall of more than 600 mm could occur, e.g. when moving into
              position but prior to connection to the rope, the need for
              fall-arrest equipment or devices in accordance with AS/NZS 1891.1
              or AS/NZS 1891.3 should be considered.
            </p>
            <p>
              Selection of the type of anchorage will depend on the nature and
              location of the task and the type of construction of the building
              or supporting structure. The operator should make an inspection by
              both sight and touch, before and after each use of the equipment
              and anchorages to ensure that they are in a serviceable condition.
              Anchorages should be visually inspected before each use and not
              used unless they are free from signs of damage, corrosion and
              other defects.
            </p>
            <p>
              It should be impressed upon operators that their lives depend upon
              the continued efficiency and durability of this equipment.
            </p>
            <p>
              Any piece of equipment which shows any defect shall be withdrawn
              from service immediately and a replacement obtained if necessary.
              A label indicating the defect should be attached to the defective
              equipment, and it should be examined by a competent person who
              will decide whether the equipment is either to be destroyed or
              repaired as necessary and returned to service.
            </p>
          </div>
          <div className="titleHeader">Responsibility</div>
          <div className="content">
            <p style={{fontWeight:"bold"}}>
              It is the responsibility of the building owners and management to
              ensure the safety of workers by maintaining height safety systems
              and associated components. This responsibility includes certifying
              systems annually through documented inspections performed by
              certified, competent technicians. Building owners and management
              should ensure that:
            </p>
            <ol className="resOrder">
              <li>
                
                  Locations of anchors comply with the requirements for safe
                  use, safe access, the pendulum effect and signage, as
                  stipulated in clause 3.2 of AS 1891.4.
                
              </li>
              <li>
                
                  Structural supports for anchors are assessed separately, by a
                  suitably qualified engineer (as stipulated in AS/NZS 1891.4,
                  clause 3.1.2.) or by a competent person, as appropriate, and
                  the assessment documented.
                
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
          <div className="titleHeader">Emergency Procedures</div>
          <div className="content">
            <p>
              Under the Australian Standards and Regulations, emergency
              procedures must be developed and in place to ensure that, in the
              event of a fall, or other emergency, any employee using a travel
              arrest, fall restraint system or rope access system is rescued as
              quickly as possible to prevent injury from prolonged suspension
              trauma.
            </p>
            <p>
              All contractors and employees who use this system must provide a
              site specific Job Safety & Environmental Analysis (JSEA), Safe
              Work Method Statement (SWMS), and a rescue plan that can be
              implemented swiftly in case of an incident. All operators must be
              trained in the procedures they are undertaking and all users must
              operate within their level of competency.
            </p>
          </div>
          <div className="titleHeader">Training & Supervision</div>
          <div className="content">
            <p>
              Employees using travel arrest, fall restraint or rope access
              systems must be adequately trained and / or supervised in their
              correct use. Instructions supplied with the system should specify
              the level of competence required for safe use.
            </p>
          </div>
          <div className="titleHeader">Compliance</div>
          <div className="content">
            <p style={{fontWeight:"bold"}}>
              The following documents were used in the creation of this report
            </p>
            <ul>
              <li>
                <p>AS/NZS 1891 - Industrial fall arrest systems and devices</p>
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
                  Managing the risk of falls at workplaces Workplace Health and
                  Safety Act 2011
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
      </div>
      <div style={{textAlign:"center", padding:"30px 20px"}}>
        <button
          type="primary"
          onClick={generate}
          style={{ marginBottom: "15px" }}
        >
          Download PDF
        </button>
      </div>
      
      <style jsx>{`
        .mainWrapper {
          width: 1200px;
          margin: 0 auto;
          background-color: white;
          z-index: 9999;
        }

        .titleHeader {
          background-color: #D9D9D9;
          font-size: 20px;
          padding-left: 5px;
        }

        .content {
          padding: 15px 2px;
        }

        p, li {
          text-align: justify;
          font-size: 13px;
        }

        ul {
          list-style-type: none;
          padding-left: 50px;
        }

        ol {
          padding: 0 153px;
        }

        .part2 {
          font-size: 13px;
        }

        button {
          background: #ffff;
        }

        @media screen and (max-width: 990px) {
                .mainWrapper {
                  width: 100%;
                }

                .part2 {
                  text-align: center;
                }

                ol, ul {
                  padding: 0;
                }
          }
      `}</style>
    </>
  );
}

export default HeightSafetyBody;
