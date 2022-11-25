/* eslint-disable react/jsx-key */
import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const NewQuoteTask = ({ job, tasks, newDesc, setNewDesc, newTask, newTime, setNewTime, newBillableRate, setNewBillableRate, handleTaskChange, addQuoteTask }) => {
  return (
    <div>
      <table>
        <tr>
          <td><label>Task:</label></td>
          <td>
            <select value={newTask} onChange={handleTaskChange}>
              <option>Choose Task...</option>
              {tasks.map((task) => (
                <option value={task.name}>
                  {task.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
            <td>
                <label>Estimated Time:</label>
            </td>
            <td><input placeholder="00:00" value={newTime} onChange={(e) => setNewTime(e.target.value)} /></td>
        </tr>
        <tr>
            <td><label>Description:</label></td>
            <td colSpan={3}>
                <ReactQuill value={newDesc} onChange={setNewDesc} />
            </td>
        </tr>
      </table>
      <h2>Billing Information</h2>
      <table>
        <tr>
            <td>
                <label>Billable Rate</label>
            </td>
            <td>
                <input value={newBillableRate} onChange={(e) => setNewBillableRate(e.target.value)} /> 
            </td>
        </tr>
        <tr>
          <td>
            <label>Tax:</label>
          </td>
          <td>
            <select>
              <option value="10.0%">GST (10.0%)</option>
              <option value="0.0%">None (0.0%)</option>
            </select>
          </td>
        </tr>
      </table>
      <button type="submit" onClick={addQuoteTask}>Save</button>
      <style jsx>{`
        table {
          font-size: 12px;
        }

        label {
          font-weight: bold;
        }

        select {
          padding: 5px;
        }

        input {
          padding: 5px;
        }

        `}</style>
    </div>
  );
};

export default NewQuoteTask;
