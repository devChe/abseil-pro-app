/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import dateFormat, { masks } from "dateformat";
import jsPDF from 'jspdf';
import Image from 'next/image'
import html2canvas from 'html2canvas';
import ImageUpload from './ImageUpload';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { db, storage  } from '../src/config/firebase.config'


function HeightSafetyAssetMap({job, dateLength}) {
    const [mapImage, setMapImage] = useState(null);
    const [imgMapUrl, setImgMapUrl] = useState("");
    
    const inspectionDate = `${!job.inspection_date ? "" : new Date(job.inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;
    const nextInspectionDue = `${!job.next_inspection_date ? "" : new Date(job.next_inspection_date.seconds * 1000).toLocaleDateString("en-US")}`;

    const generate = () => {
      const quality = 8 // Higher the better but larger file
      html2canvas(document.querySelector('#target'),
          { scale: quality }
      ).then(canvas => {
          // Document of 210mm wide and 297mm high
          const pdf = new jsPDF('p', 'mm', 'letter');
          pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 1, 5, 208, 200, 'someAlias', 'FAST');
          pdf.save("asset_map.pdf");
      });
  }

    // const generate = () => {
    //   html2canvas(document.querySelector('#target')).then((canvas) => {
    //     const base64image = canvas.toDataURL('image/jpeg');

    //     const pdf = new jsPDF('p', 'px', [1600, 1131]);
    //     pdf.addImage(base64image, 'PNG', 15, 15, 1110, 381);
    //   })
    // }

    // UPLOAD MAP IMAGE

    const handleChange = e => {
        if(e.target.files[0]) {
            setMapImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if(mapImage == null) return;
        const mapImageRef = ref(storage, `images/${mapImage.name + v4()}`);
        uploadBytes(mapImageRef, mapImage).then(() => {
          getDownloadURL(mapImageRef).then(url => {
            alert("Success!");
            setImgMapUrl(url);
          })
        })
    };

    async function addMapPhoto() {
        const id = job.id;
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
                mapImageUrl: imgMapUrl
        });
        window.location.reload(false);
      }


  return (
    <>
      <div id="target">
        <div className="wrapper">
          <div className="titleHeader" style={{pageBreakAfter:"always"}}>
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
          <div style={{ borderBottom: "1px solid black" }}>
            <h2>Height Safety Asset Map</h2>
          </div>
          <div>
            {job.mapImageUrl ? 

                <img src={job.mapImageUrl} className="jobImage" /> : 

                <div>
                <ImageUpload
                  mapImage={mapImage}
                  handleUpload={handleUpload}
                  handleChange={handleChange}
                />
                <br />
                <button onClick={addMapPhoto}>Send</button>
                <br />
                  <input type="hidden" value={imgMapUrl} onChange={(event) => {setImgMapUrl(event.target.value)}}  />
              </div>}
          </div>
          <div className='assetMapFooter'>
              <div className='box' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img src='/logo.png' width="150" />
              </div>
              <div className='box box2' style={{borderLeft:"none",borderRight:"none"}}>
                <div style={{backgroundColor:"#666666",color:"white",fontWeight:"bold",padding:"1%",fontSize:"18px"}}>Site</div>
                <div style={{borderBottom:"1px solid black",padding:"2% 1% 8%"}}>
                  <p>
                    {job.site_address}
                  </p>
                </div>
                <div style={{padding:"7% 1% 2%", fontSize:"18px"}}>
                  <span style={{fontWeight:"bold",fontSize:"20px"}}>Abseil Pro</span>
                  <p style={{fontSize:"18px"}}>0438 257 892</p>
                  <p style={{fontSize:"18px"}} >info@abseil.pro</p>
                  <p style={{fontSize:"18px"}} >www.abseil.pro</p>
                  <p>The Trustee for Abseil.Pro Trust
                  PO Box 7757 East Brisbane 4169
                  ABN 99 422 738 977</p>
                </div>
              </div>
              <div className='box box3'>
                <div style={{backgroundColor:"#666666",color:"white",fontWeight:"bold",padding:"1%",fontSize:"18px"}}>Fixed Asset Legend</div>
                <table style={{marginBottom:0}}>
                  <tr style={{width:"100%",height:"26px"}}></tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Rope Access Anchor</td>
                    <td className='symbol' style={{color:"#4A86E8"}}>&#9679;</td>
                    <td>Fall Arrest Achor</td>
                    <td className='symbol' style={{color:"#FF0000",borderRight:"none"}}>&#9679;</td>
                  </tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Fall Arrest Static Line or Wire Strop</td>
                    <td className='symbol' style={{color:"#FF0000"}}>&#9602;</td>
                    <td>Fall Arrest Achor</td>
                    <td className='symbol' style={{color:"#1CE31C",borderRight:"none"}}>&#9679;</td>
                  </tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Davit Base</td>
                    <td className='symbol' style={{color:"#4A86E8"}}>&#9670;</td>
                    <td>Abseil Rail</td>
                    <td className='symbol' style={{color:"#4A86E8",borderRight:"none"}}>&#9602;</td>
                  </tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Hand Rail</td>
                    <td className='symbol' style={{color:"#21F021"}}>&#9602;</td>
                    <td>Ladder Bracket</td>
                    <td className='symbol' style={{color:"#4A86E8",borderRight:"none"}}>&#9650;</td>
                  </tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Access Hatch/Doorway</td>
                    <td className='symbol' style={{color:"#FF0000"}}>&#9724;</td>
                    <td>Fixed Ladder</td>
                    <td className='symbol' style={{color:"#1CE31C",borderRight:"none"}}>&#9650;</td>
                  </tr>
                  <tr style={{whiteSpace:"nowrap"}}>
                    <td style={{borderLeft:"none"}}>Stairway</td>
                    <td className='symbol' style={{color:"#FF0000"}}>&#9650;</td>
                    <td></td>
                    <td className='symbol' style={{color:"#1CE31C",borderRight:"none"}}></td>
                  </tr>
                  <tr className='lastRow' style={{whiteSpace:"nowrap",borderBottom:"none"}}>
                    <td style={{borderLeft:"none"}}>Walkway</td>
                    <td className='symbol' style={{color:"#4285F4"}}>&#9724;</td>
                    <td>Failed Asset <span style={{fontWeight:"bold"}}>(Do Not Use)</span></td>
                    <td className='symbol' style={{color:"#FF0000",borderRight:"none",fontWeight:"bold"}}>&#8854;</td>
                  </tr>
                </table>
              </div>
                
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type="primary"
          onClick={generate}
          style={{ marginBottom: "15px" }}
        >
          Download PDF
        </button>
      </div>

      <style jsx>{`
        .wrapper {
          width: 80%;
          margin: 20px auto;
          background: #ffff;
          padding: 20px;
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

        td,
        th {
          border: 1px solid black;
          text-align: left;
          padding: 4px;
          font-size: 12px;
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
          height: 100%;
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

        @media screen and (max-width: 990px) {
          .titleHeader {
            display: block !important;
            width: 100%;
          }

          .contactInfo {
            text-align: center !important;
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
}

export default HeightSafetyAssetMap