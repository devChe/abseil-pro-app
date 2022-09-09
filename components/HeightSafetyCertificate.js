/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import dateFormat, { masks } from "dateformat";
import jsPDF from 'jspdf';
import Image from 'next/image'
import html2canvas from 'html2canvas';

function HeightSafetyCertificate({job, dateLength}) {
    
    const inspectionDate = `${!job.inspection_date ? "" : new Date(job.inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;
    const nextInspectionDue = `${!job.next_inspection_date ? "" : new Date(job.next_inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;

    const generate = () => {
        const quality = 1 // Higher the better but larger file
        html2canvas(document.querySelector('#target'),
            { scale: quality }
        ).then(canvas => {
            // Document of 210mm wide and 297mm high
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 1, 5, 208, 280, 'someAlias', 'FAST');
            pdf.save("height_safety_certificate.pdf");
        });
    }

    


  return (
    <>
        <div id="target">
            <div className='mainWrapper'>
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
                    <h2>Height Safety Inspection Certificate</h2>
                </div>
                {/* <div className='bg' style={{ backgroundImage:"url('/BG.png')",height:"434px",width:"100%"}}></div> */}
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <img
                        src="/BG.png"
                        alt="Picture of the author"
                        width="100%"
                        height="300px"
                        />
                </div>
                <div style={{background:"#666666",color:"#ffff",padding: "15px 10px 3px"}}>
                    <div style={{fontSize:"50px"}}>{job.name}</div>
                    <div style={{fontSize:"30px"}}>{job.site_address}</div>
                </div>
                <div style={{fontSize:"40px", paddingTop:"40px"}}>
                    Inspection Date
                </div>
                <div style={{background:"#FF9900",color:"#ffff",fontSize:"50px",paddingLeft:"10px"}}>
                    {!inspectionDate ? "DD / MM / YYYY" : dateFormat(inspectionDate, "dd mmm yyyy")}
                </div>
                <div style={{fontSize:"40px", paddingTop:"40px"}}>
                    Next Inspection Due
                </div>
                <div style={{background:"#FF9900",color:"#ffff",fontSize:"50px", marginBottom:"50px",paddingLeft:"10px"}}>
                    {!nextInspectionDue ? "DD / MM / YYYY" : dateFormat(nextInspectionDue, "dd mmm yyyy")}
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
                width: 99%
                margin: 20px auto;
            }

            .titleHeader {
                display: flex;
                justify-content: space-between;
            }
            p {
                margin-bottom: 1%;
                line-height: 1;
                font-size: 12px;
            }

            button {
                background: #ffff;
            }

            @media screen and (max-width: 990px) {
                .mainWrapper {
                    width: 100%;
                }

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

export default HeightSafetyCertificate