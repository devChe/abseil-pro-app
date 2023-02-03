/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../src/config/firebase.config'
import dateFormat, { masks } from "dateformat";


const invoice = () => {
    const [loading, setLoading] = useState("")
    const [job, setJob] = useState({});
    const [quote, setQuote] = useState({});

    const router = useRouter()

    const jobsCollectionRef = collection(db, "jobs");

    const quotesCollectionRef = collection(db, "quotes");

    useEffect(() => {
        setLoading(true);
        const getJob = async () => {
            const url = window.location.href;
            const id = url.split("/").pop();
            const q = query(jobsCollectionRef, where("jobNumber", "==", id));
            const data = await getDocs(q)
            const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setJob(res[0]);
        }
        getJob();
    }, [])

    useEffect(() => {
        setLoading(true);
        const getQuote = async () => {
            const url = window.location.href;
            const jobNumber = url.split("/").pop();
            const q = query(quotesCollectionRef, where("jobNumber", "==", jobNumber));
            const data = await getDocs(q)
            const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setQuote(res[0]);
        }
        getQuote();
    }, [])

    const startDate = `${
        !job.startDate
          ? ""
          : new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")
      }`;

    const dueDate = `${
        !job.dueDate
          ? ""
          : new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")
    }`;
      

  return (
    <div>
        <div className='tabContainer'>
            <div className='LayoutSubHeading'>
                Invoice Information
            </div>
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td className="viewLabel">Invoice No.:</td>
                        <td className="viewCell"><div>Draft</div></td>
                        <td className="viewLabel"></td>
                        <td className="viewCell"></td>
                    </tr>
                    <tr>
                        <td id="ctl00_PageContent_ctl12" className="viewLabel">Date:</td>
                        <td className="viewCell"><div aria-labelledby="ctl00_PageContent_ctl12">{dateFormat(startDate, "dd-mmm-yyyy")}</div></td>
                        <td id="ctl00_PageContent_ctl15" className="viewLabel">Type:</td>
                        <td className="viewCell"><div aria-labelledby="ctl00_PageContent_ctl15">Progress Invoice</div></td>
                    </tr>
                    <tr>
                        <td className="viewLabel">Due Date:</td>
                        <td className="viewCell"><div>{dateFormat(dueDate, "dd-mmm-yyyy")}</div></td>
                        <td className="viewLabel"></td>
                        <td className="viewCell"></td>
                    </tr>
                    <tr>
                        <td className="editLabel"><label for="ctl00_PageContent_ctlxlayoutClient">Client:</label></td>
                        <td className="editCell"><a href="../client/clientview.aspx?id=29977348" id="ctl00_PageContent_ctlxlayoutClient" className="link">{job.client}</a></td>
                        <td className="editLabel">Contact:</td>
                        <td className="editCell"><a href="../client/contactview.aspx?id=18165884" id="ctl00_PageContent_ctlxlayoutContact" className="link">{job.contact}</a></td>
                    </tr>
                    <tr>
                        <td className="viewLabel">Description:</td>
                        <td colspan="3" className="viewCellmulti"></td>
                    </tr>
                    <tr>
                        <td className="editLabel">Pricing Mode:</td>
                        <td className="editCell">
                            <select name="ctl00$PageContent$ctlxlayoutPricingMode" id="ctl00_PageContent_ctlxlayoutPricingMode" className="EditTextBox">
                                <option selected="selected" value="CALCULATED">Calculated Price</option>
                                <option value="FIXED">Fixed Price</option>
                            </select></td>
                        <td className="editLabel"></td>
                        <td className="editCell"></td>
                    </tr>
                </tbody>
            </table>
            <div className="LayoutSubHeading">Job Information</div>
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td className="editLabel"><label for="ctl00_PageContent_ctlxjobLayout389143533Job">Job:</label></td>
                        <td className="editCellMulti" colspan="3"><a href="#" className="link" style={{color:"blue"}}>{job.jobNumber} - {job.name}</a></td>
                    </tr>
                    <tr>
                        <td className="viewLabel">Name:</td>
                        <td colspan="3" className="viewCellMulti">
                            <div className="viewCellMulti">
                                <div>{job.name}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="viewLabel">Description:</td>
                        <td colspan="3" className="viewCellMulti">
                            <div className="viewCellMulti" dangerouslySetInnerHTML={{__html: job.description,}}></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="viewLabel">Client Order No.:</td>
                        <td colspan="3" className="viewCellMulti"></td>
                    </tr>
                </tbody>
            </table>
            <div className="LayoutSubHeading">Tasks</div>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center",gap:"5px"}}>
                <button type="submit">+New Task</button>
                <button type="submit">+Add Multiple Tasks</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => handleSelectTask(e, task.id)}
                                defaultChecked={true}
                            />
                        </th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    
                    
                </tbody>
            </table>

        </div>
        <style jsx>{`
            .tabContainer {
                padding-bottom: 50px;
            }

            .LayoutSubHeading {
                padding-top: 0;
                margin-top: 30px;
                padding-bottom: 5px;
                margin-bottom: 5px;
                padding-left: 0px;
                font-weight: bold;
                font-size: 18px;
                color: #333;
            }

            .viewLabel {
                color: #333;
                font-weight: bold;
                width: 170px;
                vertical-align: text-top;
                padding-left: 0;
                padding-top: 7px;
                padding-bottom: 7px;
            }

            .viewCell {
                width: 200px;
                vertical-align: text-top;
            }

            .editLabel {
                width: 170px;
                padding-left: 0;
                font-weight: bold;
                color: #333;
            }

            .editCell {
                width: 200px;
                padding-top: 7px;
                padding-bottom: 7px;
            }

            .EditTextBox {
                box-sizing: border-box;
                font-size: 12px;
                font-family: Helvetica,sans-serif;
            }

            .viewCellMulti {
                width: 570px;
                padding-top: 7px;
                padding-bottom: 7px;
                word-wrap: break-word;
            }
            
        `}</style>
    </div>
  )
}

export default invoice