/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dateFormat, { masks } from "dateformat";

function ExternalQuoteToPrint({
  job,
  selectedTasks,
  startDate,
  dueDate,
  taskNameRadio,
  contact,
  siteAddress,
  desc,
  gst,
  amount,
}) {

  const componentRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "print-quote",
    onAfterPrint: () => alert("Print Success"),
  });

  const totalArray = selectedTasks.map((selected) => selected.total);

  let sum = 0;

  for (const value of totalArray) {
    sum += value;
  }

  let dollarUSLocale = Intl.NumberFormat("en-US");



  const totalAmount = Number(sum) + Number(gst);

  return (
    <>
      <div
        ref={componentRef}
        className='externalQuoteToPrintWrapper'
      >
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
        <div>
          <h1 style={{ margin: "0" }}>QUOTE</h1>
          <hr />
          <div className="quoteInfo">
            <div>
              <div>{contact}</div>
              <div>{siteAddress}</div>
            </div>
            <div>
              <div>
                <span className="quoteLabel">Quote No.: </span>Q0001
              </div>
              <div>
                <span className="quoteLabel">Quote Date: </span>
                {dateFormat(startDate, "dd mmm yyyy")}
              </div>
              <div>
                <span className="quoteLabel">Valid to: </span>
                {dateFormat(dueDate, "dd mmm yyyy")}
              </div>
            </div>
          </div>
        </div>
        <div style={{ pageBreakAfter: "always" }}>
          <h2 style={{margin:"0"}}>{job.name}</h2>
          <div style={{fontWeight:"bold"}}>
            {siteAddress}
          </div>
          <div style={{ fontSize: "12px", lineHeight: "1" }}>
            <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          </div>

          <table>
            <tr style={{ borderBottom: "1px solid black" }}>
              <th>Description</th>
              <td></td>
              <td></td>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
            {selectedTasks?.map((quoteTask) => (
                <>
                  <tr>
                    <td style={{fontWeight:"bold"}}>{quoteTask.name}</td>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>{dollarUSLocale.format(quoteTask.total)}</td>
                  </tr>
                  <tr style={{borderBottom:"1px solid #ececec"}}>
                    <td>{quoteTask.note}</td>
                  </tr>
                </>
              ))}

            <tr>
              <td></td>
              <td></td>
              <td style={{ textAlign: "right" }}>Sub Total</td>
              <td style={{ textAlign: "right" }}>{amount}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style={{ textAlign: "right" }}>GST</td>
              <td style={{ textAlign: "right" }}>{gst}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <strong>Total</strong>
              </td>
              <td style={{ textAlign: "right" }}>
                <strong>{dollarUSLocale.format(totalAmount)}</strong>
              </td>
            </tr>
          </table>
        </div>
        <div style={{ pageBreakAfter: "always", marginTop: "3%" }}>
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
          <h1 style={{margin:"0"}}>TERMS</h1>
          <hr />
          <ol style={{lineHeight:"1.5"}}>
            <li>
              <p className="liHeader">Services</p>
              <ol type="a">
                <li>
                  <p>
                  The Client wishes to obtain the Contractor's services to perform the works described in this Quotation ("Services"). The Services to be performed at the address listed in the Quotation above ("Property").
                  </p>
                </li>
                <li>
                  <p>
                    The Contractor agrees to furnish the labour, materials, and supplies necessary to perform the Services in accordance with the terms and conditions contained in this Contract. Upon completion of the Services, the Contractor will remove all excess materials supplies, and debris.
                  </p>
                </li>
                <li>
                  <p>
                    Installation/certification of height safety/access systems has not been included unless specifically stated.
                  </p>
                </li>
                <li>
                  <p>
                    Normal working hours are 7am-3pm Monday to Friday. Works outside of these hours will incur an additional charge. Evening, night, early morning & Saturday works will be charged at 1.5 times the normal labour rate. Sunday works will be charged at double the normal labour rate.
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <p className="liHeader">Changes in the services.</p>
              <ol type="a">
                <li>
                  <p>
                    The Client may request reasonable changes to the Services described in Section 1. Any changes to the Services must be in writing and signed by both the Contractor and the Client. The Client agrees that any changes to the Services may result in additional charges and extension of the schedule.
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <p className="liHeader">Payment Schedule.</p>
              <ol type="a">
                <li>
                  <p>
                    The Client agrees to pay the Contractor the Total in accordance with the following schedule:
                    <ol type="i">
                      <li>
                        <p>
                          Upon acceptance of this quote: 20% of Total, to be paid before works commerce
                        </p>
                      </li>
                      <li>
                        <p>
                          Upon completion of all Services: remainder of Total will be invoiced
                        </p>
                      </li>
                      <li>
                        <p>
                          For projects $20,000 or higher in value, weekly progress claims may be made
                        </p>
                      </li>
                      <li>
                        <p>
                          Weekly claims to be up to the cost of labour and materials provided at invoice date
                        </p>
                      </li>
                      <li>
                        <p>
                          Invoices are due within 14 days of the invoice date
                        </p>
                      </li>
                    </ol>
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <p className="liHeader">Events Beyond Contractor's Control.</p>
              <ol type="a">
                <li>
                  <p>
                    The Client agrees that if the Contractor is unable to complete the Services by the Completion Date because of reasons that were not caused by the Contractor (i.e., availability of necessary supplies etc.) or because of events beyond the Contractor's control (such as inclement weather, fire, flood, weather, vandalism, etc.), the Contractor will not be deemed to have breached this Contract and the time for the Contractor to complete the Services will be extended by the amount of time reasonably necessary for the Contractor to complete the Services and at a schedule agreeable to the Parties.
                  </p>
                </li>
                <li>
                  <p>
                    The time for the Client to pay the Contractor for the Services will be extended in the same manner.
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <p className="liHeader">Inclement weather</p>
              <ol type="a">
                <li>
                  <p>
                    No work will be completed and works will cease immediately if weather conditions are forecasted to be, or become unsafe due to wind, heat, rain or any other condition deemed to be unstable, unpredictable, or dangerous.
                  </p>
                </li>
                <li>
                  <p>
                    Localised wind forecasts will be assessed and conditions will be monitored regularly using an anemometer.
                  </p>
                </li>
                <li>
                  <p>
                    If forecasts are marginal and project completion is time sensitive, the Client can request an attempt be made to carry on with the works. This will be defined as Urgent Works. The Services will only be performed if safe to do so and will cease if conditions become unstable or unsafe.
                  </p>
                </li>
                <li>
                  <p>
                    In the event that the Client requests Urgent Works on a marginal forecast and work is halted due to inclement weather conditions, the Client agrees to pay the Contractor 4-hour minimum charge for each employee on site.
                  </p>
                </li>
                <li>
                  <p>
                    The Contractor will not be held liable for delays on any deadlines due to inclement weather.
                  </p>
                </li>
              </ol>
            </li>
          </ol>
        </div>
        <div className="acceptedFormBox">
            <h2 style={{margin:"0",borderBottom:"1px solid black", paddingTop:"2%",display:"inline"}}>QUOTE Q0001 ACCEPTED</h2>
            <p style={{fontSize:"16px"}}>Please complete and return to confirm acceptance of this quote & terms</p>
            <br/>
            <div className="acceptedForm">
              <div>
                <div className="inputWrapper">
                  <label>Name:</label>
                  <input className="acceptedInput" value=""  width="100%" />
                </div>
                <div className="inputWrapper">
                  <label>Position:</label>
                  <input className="acceptedInput" value=""  width="100%" />
                </div>
              </div>
              <div>
                <div className="inputWrapper">
                  <label>Sign:</label>
                  <input className="acceptedInput" value=""  width="100%" />
                </div>
                <div className="inputWrapper">
                  <label>Date:</label>
                  <input className="acceptedInput" value=""  width="100%" />
                </div>
              </div>
            </div>
          </div>
        <div style={{ pageBreakAfter: "always", marginTop: "3%" }}>
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
          <h1 style={{borderBottom:"1px solid black"}}>INSURANCE</h1>
          <p style={{fontSize:"16px"}}>The works will be covered by $20 million public liability insurance. In addition to this each
            employee will be covered by WorkCover.
          </p>
          <div className="insuranceImgBox">
            <div style={{textAlign:"center",padding:"15px"}}>
              <img src="/cert.jpg" width="300" height="300" />
            </div>
            <div style={{textAlign:"center",padding:"15px"}}>
              <img src="/cert2.png" width="300" height="300"/>
            </div>
          </div>
          
        </div>
      </div>
      <button className="printBtn" onClick={handlePrint}>PRINT</button>
      <style jsx>{`
        p {
          font-size: 10px;
          padding: 0;
          margin: 0;
        }

        .titleHeader {
          display: flex;
          justify-content: space-between;
        }
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td,
        th {
          text-align: left;
          padding: 8px;
          font-size: 12px;
        }

        .quoteInfo {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .quoteLabel {
          font-weight: bold;
        }

        ol li::marker { 
          font-size: 10px; 
        }

        li {
          padding-left: 8px;
        }

        .liHeader {
          padding: 5px;
        }

        .acceptedFormBox {
          background: #F4FFBD;
          border: 1px solid black;
          padding: 10px 15px 15px;
          page-break-after: always;
        }

        .acceptedForm {
          display: grid;
          grid-template-columns: 1fr 1fr;
          justify-content: center;
        }

        .acceptedInput {
          width: 70%;
          border: none;
          border-bottom: 1px solid black;
          background: #F4FFBD;
        }

        .inputWrapper {
          padding: 15px 0;
        }

        .printBtn {
          position: sticky;
          bottom: 0;
          right: 0;
          padding: 15px;
          cursor: pointer;
        }

        @page {
          size: A4 portrait;
          margin: 20px;
          
        }
      `}</style>
    </>
  );
}

export default ExternalQuoteToPrint;
