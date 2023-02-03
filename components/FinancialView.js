/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import moment from "moment/moment";
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import NewProgressInvoice from './NewProgressInvoice';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const FinancialView = ({job}) => {

  let subtitle;

  const [openNewProgressInvoice, setOpenNewProgressInvoice] = useState(false);

  function onCloseModal() {
    setOpenNewProgressInvoice(false);
  }

    const any = job ? job?.data?.quoteTasks?.map((task) => task.time) : "";
  
    const sum = any
      ? any.reduce(
          (acc, time) => acc.add(moment.duration(time)),
          moment.duration()
        )
      : "";
  
    const arrayOfCost = job ? job?.data?.quoteTasks?.map((task) => task.cost) : "";
  
    let costTotal = 0;
  
    arrayOfCost?.forEach((cost) => {
      costTotal += cost;
    });
  
    const arrayOfTotal = job ? job?.data?.quoteTasks?.map((task) => task.total) : "";
  
    let sumOfTotal = 0;
  
    arrayOfTotal?.forEach((total) => {
      sumOfTotal += total;
    });
  
    let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <button onClick={() => setOpenNewProgressInvoice(true)}>New Progress Invoice</button>
            <Modal style={{width:"100%"}} open={openNewProgressInvoice} onClose={onCloseModal} center>
              <NewProgressInvoice job={job} />
            </Modal>
        <button type="submit">New Final Invoice</button>
      </div>
      <h2>Financial Settings</h2>
      <p>The job is configured to be invoiced based on Task Billable Rates.</p>
      <p>
        To change the financial settings or setup custom rates for the job{" "}
        <a href="#">click here</a>.
      </p>
      <br />
      <h2>Estimated Billings</h2>
      <p>Note: Estimated billings based on quoted/estimated time and costs.</p>
      <br />

      <div className="taskSection">
        <table
          className="tasksTable"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th>Time</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
          {job?.quoteTasks?.map((task, index) => (
            <>
              <tr
                key={index}
                style={{
                  borderLeft: "1px solid #ececec",
                  borderRight: "1px solid #ececec",
                }}
              >
                <td style={{ textAlign: "left", fontWeight: "500" }}>
                  {task.name}
                </td>
                <td>{task.time}</td>
                <td>
                  {task.billableRate
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
                <td>
                  {task.total
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
              </tr>
              <tr
                key={index}
                style={{ border: "1px solid #ececec", borderTop: "none" }}
              >
                <td
                  style={{ textAlign: "left", padding: "8px" }}
                  className="HtmlGridCell"
                  colSpan={5}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: task.note,
                    }}
                  ></div>
                </td>
              </tr>
            </>
          ))}
          <tr style={{ border: "1px solid #ececec" }}>
            <td></td>
            <td>
              <strong>
                {[
                  Math.floor(sum ? sum.asHours() : ""),
                  sum ? sum.minutes() : "",
                ].join(":")}
              </strong>
            </td>
            <td>
              <strong>
                {costTotal
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .substring(1)}
              </strong>
            </td>
            <td>
              <strong>
                {sumOfTotal
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .substring(1)}
              </strong>
            </td>
          </tr>
        </table>
      </div>
      <style jsx>{`
        .folders {
          border: 1px solid #dddddd;
          padding: 8px;
          white-space: nowrap;
          text-align: right;
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
          vertical-align: top;
        }

        .editCellMulti {
          width: 570px;
          vertical-align: top;
          padding-top: 7px;
          padding-bottom: 7px;
        }

        input {
          border: 1px solid #cccccc;
          outline: none;
          padding: 5px;
        }

        select {
          border: 1px solid #cccccc;
          padding: 5px;
        }

        button {
          padding: 8px 12px;
          margin-left: 0;
          margin-top: 0;
          margin-bottom: 15px;
          margin-right: 0;
          display: inline-block;
          background: #fff;
          background: linear-gradient(to bottom, #fff, #e6eaec);
          border-radius: 3px;
          border-width: 1px;
          border-style: solid;
          border-color: #ccc;
          box-shadow: 0 0 0 1px inset rgb(255 255 255 / 30%);
          color: #048abb;
          font-size: 12px;
          font-weight: bold;
          text-decoration: none;
          height: auto;
          top: auto;
        }

        button:hover {
          text-decoration: none;
          background: linear-gradient(to bottom, #fcfcfc, #e0e5e8);
          border-color: #0382b3;
        }

        .taskstable {
          border-spacing: 0;
          width: 100%;
          margin: 0 0 50px;
        }

        .tasksTable > tr > th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
          background: #fff;
          background: linear-gradient(to bottom, #fff, #e6eaec);
        }

        .tasksTable > tr > td {
          text-align: center;
          padding: 8px;
        }

        .table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          margin: 50px 0;
          white-space: nowrap;
        }

        .table > tr > th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
        }

        .table > tr > td {
          text-align: center;
          padding: 5px;
        }
      `}</style>
    </div>
  );
}

export default FinancialView