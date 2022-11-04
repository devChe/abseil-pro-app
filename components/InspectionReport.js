/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import jsPDF from "jspdf";
import Image from "next/image";
import html2canvas from "html2canvas";
import { arrayRemove, arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db, storage } from "../src/config/firebase.config";
import { useRouter } from "next/router";

function InspectionReport({ job, dateLength }) {
  const [addField, setAddField] = useState(false);
  const [getAssets, setGetAssets] = useState([]);
  const [getAssetNotes, setGetAssetNotes] = useState([]);
  const [getAssetRating, setGetAssetRating] = useState([]);
  const [getInspectionType, setGetInspectionType] = useState([]);
  const [quantity, setQuantity] = useState(Number(0));
  const [assetType, setAssetType] = useState("");
  const [inspectionType, setInspectionType] = useState("");
  const [assetNote, setAssetNote] = useState("");
  const [assetRating, setAssetRating] = useState("");
  const [assetResult, setAssetResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // const generate = () => {
  //   const quality = 8; // Higher the better but larger file
  //   html2canvas(document.querySelector("#target"), { scale: quality }).then(
  //     (canvas) => {
  //       // Document of 210mm wide and 297mm high
  //       const pdf = new jsPDF("p", "mm", "letter");
  //       pdf.addImage(
  //         canvas.toDataURL("image/jpeg"),
  //         "JPEG",
  //         1,
  //         5,
  //         208,
  //         200,
  //         "someAlias",
  //         "FAST"
  //       );
  //       pdf.save("inspection_summary.pdf");
  //     }
  //   );
  // };

  const assetsCollectionRef = collection(db, "assets");
  const assetNotesCollectionRef = collection(db, "asset_notes");
  const assetRatingCollectionRef = collection(db, "asset_rating");
  const inspectionTypeCollectionRef = collection(db, "inspection_type");

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  console.log(router.asPath);

  useEffect(() => {
    const queryAssets = async () => {
      const q = query(assetsCollectionRef, orderBy("manufacturer"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGetAssets(res);
    };
    queryAssets();
  }, []);

  useEffect(() => {
    const queryInspectionType = async () => {
      const q = query(inspectionTypeCollectionRef, orderBy("type"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGetInspectionType(res);
    };
    queryInspectionType();
  }, []);

  useEffect(() => {
    const queryAssetRating = async () => {
      const q = query(assetRatingCollectionRef, orderBy("rating"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGetAssetRating(res);
    };
    queryAssetRating();
  }, []);

  useEffect(() => {
    const queryAssetNotes = async () => {
      const q = query(assetNotesCollectionRef, orderBy("note"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGetAssetNotes(res);
    };
    queryAssetNotes();
  }, []);


  async function addAsset() {
    setIsLoading(true);
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    updateDoc(jobDoc, {
      inspectionReport: arrayUnion({
        qty: Number(quantity),
        asset: assetType,
        inspection: inspectionType,
        notes: assetNote,
        rating: assetRating,
        result: assetResult
      }),
    }).then(() => {
      setIsLoading(false);
      refreshData();
      setAddField(false);
    }).catch(function (error) {
      console.error("Error removing document: ", error);
      setIsLoading(false);
    });

  }

  useEffect(() => {
    var qty = job.inspectionReport?.map((res) => res.qty)
    var largest = qty ? qty[0] : "";

    if(qty) {
    for (var i = 0; i < qty.length; i++) {
      if (largest < qty[i] ) {
          largest = qty[i];
      }
    }
  }
    console.log(largest);
    if(!largest) {
      setQuantity(1);
    } else {setQuantity(largest + 1);}
    
  }, [addField])

  //DELETE ASSET

  const deleteAsset = async (deleteQty) => {
    setIsLoading(true);
    const id = job.id;
    //deleteId is the id from the post you want to delete
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
      inspectionReport: job.inspectionReport.filter((res) => res.qty !== deleteQty),
    })
      .then(() => {
        setIsLoading(false);
        refreshData();
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
        setIsLoading(false);
      });

    
  };


  

  return (
    <>
      <div id="target">
        <div className="wrapper">
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
            <h2>Inspection Report</h2>
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
              <th>Action</th>
            </tr>
            {job.inspectionReport &&
              job.inspectionReport.map((report) => (
                <tr>
                  <td>{report.qty}</td>
                  <td>{report.asset}</td>
                  <td>{report.inspection}</td>
                  <td>{report.rating}</td>
                  <td>{report.notes}</td>
                  <td className="result">{report.result}</td>
                  <td><button onClick={() => deleteAsset(report.qty)}>Delete</button></td>
                </tr>
              ))}
          </table>
          <table>
            {addField ? (
              <tr>
                <td>
                  <div>
                    <label>Quantity</label>
                    <input
                      placeholder="Quantity here ..."
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{width:"30px"}}
                    />
                  </div>
                </td>
                <td>
                  <label>Type</label>
                  <select
                    value={assetType}
                    onChange={(event) => setAssetType(event.target.value)}
                  >
                    <option>Choose type</option>
                    {getAssets.map((asset) => (
                      <option value={asset.manufacturer}>
                        {asset.manufacturer}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <label>Inspection Type</label>
                  <select
                    value={inspectionType}
                    onChange={(event) => setInspectionType(event.target.value)}
                  >
                    <option>Choose type</option>
                    {getInspectionType.map((ins) => (
                      <option value={ins.type}>{ins.type}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <label>Rating</label>
                  <select
                    value={assetRating}
                    onChange={(event) => setAssetRating(event.target.value)}
                  >
                    <option>Choose rating...</option>
                    {getAssetRating.map((res) => (
                      <option value={res.rating}>{res.rating}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <label>Notes</label>
                  <select
                    value={assetNote}
                    onChange={(event) => setAssetNote(event.target.value)}
                  >
                    <option>Choose rating...</option>
                    {getAssetNotes.map((result) => (
                      <option value={result.note}>{result.note}</option>
                    ))}
                  </select>
                </td>
                <td className="result">
                  <label>Result</label>
                  <select
                      value={assetResult}
                      onChange={(event) => setAssetResult(event.target.value)}
                    >
                      <option>Choose rating...</option>
                      <option>Pass</option>
                      <option>Fail</option>
                    </select>
                </td>
              </tr>
            ) : (
              ""
            )}
          </table>
          
          {isLoading && <div style={{display: "flex", justifyContent:"center"}}>Loading asset...</div>}

          {addField ? (
            <div style={{display:"flex",justifyContent:"right"}}>
              <div>
                <button onClick={addAsset}>Save</button>
              </div>
              <div>
                <button onClick={() => setAddField(false)}>Cancel</button>
              </div>
            </div>

          ) : (
            
            <div style={{ textAlign: "right" }}>
              <button onClick={() => setAddField(true)}>Add field</button>
            </div>

          )
          }
        </div>
      </div>
      {/* <div style={{ textAlign: "center" }}>
        <button
          type="primary"
          onClick={generate}
          style={{ marginBottom: "15px" }}
        >
          Download PDF
        </button>
      </div> */}

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
          padding: 8px;
        }

        .inspection th {
          text-align: center;
        }

        .result {
          font-size: 18px;
          font-weight: bold;
        }

        select {
            width: 150px;
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

export default InspectionReport;
