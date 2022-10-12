/* eslint-disable react/jsx-key */
import React, {useState, useRef} from 'react';
import jsPDF from 'jspdf';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ExternalQuoteToPrint from './ExternalQuoteToPrint';

function ExternalQuote({job, closeModal}) {
    const [openModal, setOpenModal] = useState(false);
    const [startDate, setStartDate] = useState(`${new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}`);
    const [dueDate, setDueDate] = useState(`${new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}`);
    const [clientName, setClientName] = useState(`${job.client}`);
    const [contact, setContact] = useState(`${job.contact}`);
    const [desc, setDesc] = useState(`${job.description}`);

  return (
    
    <div>
        {!openModal && 
        <div>
            <h5>Quote Information</h5>
            <div>
                <label>Date:</label>
                <div>
                    <input value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <label>Valid date:</label>
                <div>
                    <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <label>Client name:</label>
                <div>
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} />
                </div>
                <label>Contact:</label>
                <div>
                    <input value={contact} onChange={(e) => setClientName(e.target.value)} />
                </div>
                
            </div>
            <div>
                <label>Description:</label>
                    <div>
                        <ReactQuill value={desc} onChange={setDesc} height="50%" />
                            {/* <div dangerouslySetInnerHTML={{ __html: job.description }}></div> */}
                    </div>
            </div>
            <label>Budget:</label>
            <div>Cost:</div>      
                
                
            
            <div className='tableWrapper'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Start</th>
                        <th>Due</th>
                        <th>Estimated</th>
                        <th>Actual</th>
                        <th>Remaining</th>
                    </tr>
                {job.tasks && job.tasks.map(task => (
                    <tr>
                        <td>{console.log(task.name)}</td>
                        <td>{new Date(task.startDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                        <td>{new Date(task.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                        <td>{task.estimated}</td>
                        <td>{task.actual}</td>
                        <td>{task.remaining}</td>
                    </tr>
                ))}
                </table>
            </div>
            <div style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center", gap:"15px", marginBottom:"50px"}}>
                <button type="primary" onClick={() => setOpenModal(true)}>Print View</button>
                <button className='modalBtn' onClick={closeModal}>close</button>
            </div>
        </div>}
        
        
        {openModal && 
         <div className='preview modalBackground'>
            <div className='modalContainer'>

                <ExternalQuoteToPrint
                    job={job} 
                    startDate={startDate}
                    dueDate={dueDate}
                    clientName={clientName}
                    contact={contact}
                    desc={desc}  
                />
            </div>
            
         </div> 
        }
       
        <style jsx>{`
                .tableWrapper {
                    overflow-x: auto;
                }

                .titleHeader {
                    display: flex;
                    justify-content: space-between;
                }

                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                    width: 100%;
                    margin: 0 0 50px;
                }

                td, th {
                    border: 1px solid #dddddd;
                    text-align: center;
                    padding: 8px;
                }

                tr:nth-child(even) {
                    background-color: #dddddd;
                }

                .docs {
                    transition: .3s;
                }

                .docs:hover {
                    text-decoration: underline;
                    color: blue;
                    cursor: pointer;
                }

                .docs:focus {
                    text-decoration: underline;
                    color: blue;

                }

                .quoteDesc {
                    vertical-align: baseline;
                }

                .tdDesc {
                    text-align: left;
                    font-size: 12px;
                }

                .modalBackground {
                    width: 100vw;
                    background-color: rgba(200, 200, 200);
                    position: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modalContainer {
                    width: 80%;
                    border-radius: 12px;
                    background-color: white;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    display: flex;
                    flex-direction: column;
                    padding: 25px;
                    margin-top: 15px;
                    margin-bottom: 15px;
                }

                label {
                    padding: 15px 0;
                }

                input { 
                    width: 100%;
                    padding: 10px; 
                    line-height: 28px; 
                }

                p {
                    margin: 0;
                    font-size: 12px;
                }

        `}</style>
    </div>
  )
}

export default ExternalQuote