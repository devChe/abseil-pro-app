/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import dateFormat, { masks } from "dateformat";
import jsPDF from 'jspdf';
import Image from 'next/image'
import html2canvas from 'html2canvas';

function InspectionSummary({job, dateLength}) {
    
    const inspectionDate = `${!job.inspection_date ? "" : new Date(job.inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;
    const nextInspectionDue = `${!job.next_inspection_date ? "" : new Date(job.next_inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;

    const generate = () => {
        const quality = 1 // Higher the better but larger file
        html2canvas(document.querySelector('#target'),
            { scale: quality }
        ).then(canvas => {
            // Document of 210mm wide and 297mm high
            const pdf = new jsPDF('p', 'mm', [297, 210]);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 1, 3, 208, 294);
            pdf.save("height_safety_certificate.pdf");
        });
    }


  return (
    <>
        <div id="target">
            <div className='wrapper'>
                <div className='titleHeader'>
                    <img src="/LOGO_CERT.png" style={{display:"block",width:"443px",height:"69px"}}/>
                    <div className='contactInfo' style={{textAlign:"right"}}>
                        <p>The Trustee for Abseil.Pro Trust</p>
                        <p>PO Box 7757 East Brisbane 4169</p>
                        <p>ABN 99 422 738 977</p>
                        <br></br>
                        <p>0438 257 892</p>
                        <p>info@abseil.pro</p>
                        <p>www.abseil.pro</p>
                    </div>
                </div>
                <div style={{borderBottom:"1px solid black"}}>
                    <h2>Inspection Summary</h2>
                </div>
                <table className='flexBox'>
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
                        <td>{!inspectionDate ? "DD / MM / YYYY" : dateFormat(inspectionDate, "dd mmm yyyy")}</td>
                    </tr>
                    <tr>
                        <td>Next Inspection Date</td>
                        <td>{!nextInspectionDue ? "DD / MM / YYYY" : dateFormat(nextInspectionDue, "dd mmm yyyy")}</td>
                    </tr>
                </table>
                <table>
                    <tr className='inspection'>
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
                        <td>{job.asset_group_1_result}</td>
                    </tr>
                </table>
            </div>
        </div>
        <button type="primary" onClick={generate} style={{marginBottom:"15px"}}>Download PDF</button>
        <style jsx>{`
            .wrapper {
                width: 1000px;
                margin: 0 auto;
            }

            .titleHeader {
                display: flex;
                justify-content: space-between;
            }

            .flexBox {
                width: 100%;
            }

            p {
                margin-bottom: 1%;
                line-height: 1;
                font-size: 12px;
            }

            button {
                background: #ffff;
            }

            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid black;
                text-align: left;
                padding: 8px;
            }

            .inspection th {
                text-align: center;
            }

            @media screen and (max-width: 990px) {
                .titleHeader {
                    display: block!important;
                    width: 100%;
                }

                .contactInfo {
                    text-align: center!important;
                    padding: 15px;
                }
            }
        `}</style>
    </>
    
  )
}

export default InspectionSummary