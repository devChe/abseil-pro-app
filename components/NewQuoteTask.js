/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../src/config/firebase.config";



const NewQuoteTask = ({
  job,
  tasks,
  newDesc,
  setNewDesc,
  newTask,
  estimatedTime,
  setEstimatedTime,
  newBillableRate,
  setNewBillableRate,
  handleTaskChange,
  addQuoteTask,
  crew,
  setCrew,
}) => {
  const [employees, setEmployees] = useState([]);

  const staffCollectionRef = collection(db, "employees");

  useEffect(() => {
    const getStaff = async () => {
      const q = query(staffCollectionRef, orderBy("name"));
      const data = await getDocs(q);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStaff();
  }, [setCrew, staffCollectionRef]);


  useEffect(() => {
    const estimatedTimeInput = document.getElementById('estimated-time-input');

    const handleBlur = () => {
      const value = estimatedTimeInput.value.trim();

      // Check if the value has a colon (:) separator
      if (value.indexOf(':') === -1) {
        // If there's no colon, format the value as "HH:00"
        const hours = parseInt(value, 10);
        const formattedValue = `${hours.toString().padStart(2, '0')}:00`;
        setEstimatedTime(formattedValue);
      } else {
        // If the value has a colon separator, split the value into hours and minutes
        const [hours, minutes] = value.split(':');

        // Format the hours and minutes with leading zeros and rejoin them with a colon separator
        const formattedValue = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setEstimatedTime(formattedValue);
      }
    };

    estimatedTimeInput.addEventListener('blur', handleBlur);

    return () => {
      estimatedTimeInput.removeEventListener('blur', handleBlur);
    };
  }, [setEstimatedTime]);


  return (
    <div>
      <table>
        <tr>
          <td>
            <label>Task:</label>
          </td>
          <td>
            <select value={newTask} onChange={handleTaskChange}>
              <option>Choose Task...</option>
              {tasks.map((task) => (
                <option value={task.name}>{task.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Estimated Time:</label>
          </td>
          <td>
            <input
              placeholder="00:00"
              id="estimated-time-input"
              value={estimatedTime}
              onChange={e => setEstimatedTime(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Staff:</label>
          </td>
          <td>
            <select value={crew} onChange={e => setCrew(e.target.value)}>
              <option>Choose Task...</option>
              {employees.map((staff) => (
                <option key={staff.num} value={staff.name}>{staff.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Description:</label>
          </td>
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
            <input
              value={newBillableRate}
              onChange={(e) => setNewBillableRate(e.target.value)}
            />
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
      <button type="submit" onClick={addQuoteTask}>
        Save
      </button>
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
