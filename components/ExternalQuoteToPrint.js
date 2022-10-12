/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React,{useRef} from 'react';
import { useReactToPrint } from 'react-to-print';

function ExternalQuoteToPrint({job, 
  startDate,
  dueDate,
  clientName,
  contact,
  desc }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'test-data',
    onAfterPrint: () => alert("Print Success")
  })
  return (
    <>
      <div ref={componentRef} style={{width:"100%",padding:"3%",background:"white"}}>
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
          <h1 style={{margin:"0"}}>QUOTE</h1>
          <hr/>
        </div>
        <div style={{pageBreakAfter:"always"}}>
          <div style={{ fontSize: "12px",lineHeight:"1" }}>
            <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          </div>
          <h4>Tasks</h4>
          <table>
            <tr style={{borderBottom:"1px solid black"}}>
              <th>Description</th>
              <th>Time</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>
                Exterior Window Clean - Inaccessible Building Exterior<br/>
                Glass & Frames
              </td>
              <td>34.00</td>
              <td>111.00</td>
              <td>3,774.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Sub Total</td>
              <td>3,774.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>GST</td>
              <td>377.40</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td><strong>4,151.40</strong></td>
            </tr>
          </table>
        </div>
        <div style={{pageBreakAfter:"always",marginTop:"3%"}}>
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
          <h1>TERMS</h1>
          <hr/>
        </div>
        
        
      </div>
      <button onClick={handlePrint}>Print this out!!!</button>
      <style jsx>{`
          p {
            font-size: 12px;
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

          td, th {
            text-align: left;
            padding: 8px;
            font-size: 12px;
          }

      `}</style>
    </>
  )
}

export default ExternalQuoteToPrint