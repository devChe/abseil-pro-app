/* eslint-disable react/jsx-key */
import React from 'react';
import jsPDF from 'jspdf';

function GeneratePDF({job}) {

    const generate = () => {
        const doc = new jsPDF("p","pt","a4");

        doc.html(document.querySelector('#target'), {
            callback: function(pdf) {
                pdf.save("client-quotation.pdf");
            }
        })
    }

  return (
    
    <div>
        <div id="target">
            <h5>Quote Information</h5>
            <table>
                <tr>
                    <td>Date:</td>
                    <td>
                        <div>{new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}</div>
                    </td>
                    <td>Valid to:</td>
                    <td>
                        <div>{new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}</div>
                    </td>
                </tr>
                <tr>
                    <td>Client:</td>
                    <td>
                        <div>{job.client}</div>
                    </td>
                    <td>Contact:</td>
                    <td>
                        <div>{job.contact}</div>
                    </td>
                </tr>
                <tr>
                    <td className="quoteDesc">Description:</td>
                    <td className='tdDesc'>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                        </div>
                    </td>
                </tr>
                </table>
                    <label>Budget:</label>
                    <div>Cost:</div>
                    <table>        
                        <tr>
                            <th>Name</th>
                            <th>Start</th>
                            <th>Due</th>
                            <th>Estimated</th>
                            <th>Actual</th>
                            <th>Remaining</th>
                        </tr>
                        {job.tasks.map(task => (
                            <tr>
                                <td>{task.name}</td>
                                <td>{new Date(task.startDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                                <td>{new Date(task.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                                <td>{task.estimated}</td>
                                <td>{task.actual}</td>
                                <td>{task.remaining}</td>
                            </tr>
                        ))}
                    </table>
        </div>
        <button type="primary" onClick={generate}>Download PDF</button>
        <style jsx>{`
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
        `}</style>
    </div>
  )
}

export default GeneratePDF