/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

const NewProgressInvoice = ({job}) => {

  return (
    <div>
        <h1>Options</h1>
        <table>
            <tbody>
                <tr>
                    <td className='viewLabel'><label>Job:</label></td>
                    <td className='viewCell'>{job.jobNumber}</td>
                </tr>
                <tr>
                    <td className='viewLabel'><label>Invoice Type:</label></td>
                    <td className='viewCell'>
                        <div>
                            <input type="radio" name="radio"/>
                            <label>Actual Time and Costs</label>
                        </div>
                        <div>
                            <input type="radio" name="radio"/>
                            <label>Quoted/Estimated Time and Costs</label>
                        </div>
                        <div>
                            <input type="radio" name="radio"/>
                            <input type="text" value="0.00"  />
                            <label>progress amount / deposit</label>
                        </div>
                        <div>
                            <p>Description to appear on the invoice if the type is progress amount / deposit. To setup a default description, add a cost via the Business > Settings > Costs screen with the code "PROGRESS-INVOICE".</p>
                            <input name="ctl00$PageContent$ctl24" type="text" maxLength={100} className="EditTextBoxMulti"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label>Date:</label></td>
                    <td>
                        <input type="date" name="date" value={new Date()}/>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr/>
        <h1>Previous Invoices</h1>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>No.</th>
                    <th>Billing Type</th>
                    <th>Type</th>
                    <th>Progress Date</th>
                    <th>Due</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <style jsx>{`
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
                vertical-align: text-top;
            }
        `}</style>
    </div>
  )
}

export default NewProgressInvoice