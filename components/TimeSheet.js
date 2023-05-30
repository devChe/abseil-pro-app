import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { v4 } from "uuid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../src/config/firebase.config";


const TimeSheet = ({staff, job, array2}) => {
    const [timeDate, setTimeDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeSheetNotes, setTimeSheetNotes] = useState("");
    const [task, setTask] = useState('');
    const [crew, setCrew] = useState('');
    const [week, setWeek] = useState([]);
    const [currentDate] = useState(new Date());
    const getStartOfWeek = (date) => {
      const day = date.getDay();
      const diff = (day === 0 ? 6 : day - 1); // Adjust the difference for Monday
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - diff);
      startOfWeek.setHours(0, 0, 0, 0);
      return startOfWeek;
    };
    const [weekStart, setWeekStart] = useState(getStartOfWeek(currentDate));
    const [weekEnd, setWeekEnd] = useState(getEndOfWeek(currentDate));

  const handlePrevWeek = () => {
    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    setWeekStart(getStartOfWeek(prevWeekStart));
    setWeekEnd(getEndOfWeek(prevWeekStart));
  };

  const handleNextWeek = () => {
    const nextWeekStart = new Date(weekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    setWeekStart(getStartOfWeek(nextWeekStart));
    setWeekEnd(getEndOfWeek(nextWeekStart));
  };

  const filteredLogin = job?.login?.filter((log) => {
    const logDate = new Date(log.date.seconds * 1000);
    return logDate >= weekStart && logDate <= weekEnd;
  });
  

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


    //ADD TIME LOGIN

    async function addTimelog() {
      const id = job.id;
      const jobDoc = doc(db, "jobs", id);
    
      // Convert start and end times to Date objects
      const [startHour, startMinute] = startTime.split(":");
      const startDate = new Date();
      startDate.setHours(parseInt(startHour, 10));
      startDate.setMinutes(parseInt(startMinute, 10));
      
      const [endHour, endMinute] = endTime.split(":");
      const endDate = new Date();
      endDate.setHours(parseInt(endHour, 10));
      endDate.setMinutes(parseInt(endMinute, 10));
      
      // Calculate the difference in hours
      const totalHours = Math.abs(endDate - startDate) / 36e5; // 36e5 = 60 * 60 * 1000
    
      // Format totalHours as "HH:MM" string
      const formattedTotalHours = `${Math.floor(totalHours)
        .toString()
        .padStart(2, "0")}:${Math.floor((totalHours % 1) * 60)
        .toString()
        .padStart(2, "0")}`;
    
      updateDoc(jobDoc, {
        login: arrayUnion({
          id: "time" + v4(),
          date: timeDate,
          start: startTime,
          end: endTime,
          notes: timeSheetNotes,
          task: task,
          staff: crew,
          time: formattedTotalHours,
        }),
      })
        .then((success) => {
          alert(success);
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }

    const sortedLogin = filteredLogin?.sort((a, b) => b.date.seconds - a.date.seconds);
    

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1>Time Sheet Information</h1>
      <table>
        <thead>
          <tr>
            {week.map((day) => (
              <th key={day.toISOString()}>
                {day.toLocaleDateString("en-US", { weekday: "short" })}
                <br />
                {day.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                <br />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{/* add table rows and data here */}</tbody>
      </table>
      <table>
        <tr>
          <td className="editLabel">
            <label>Date:</label>
          </td>
          <td className="editCell">
            <DatePicker
              selected={timeDate}
              onChange={(date) => setTimeDate(date)}
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <label>Staff:</label>
          </td>
          <td>
            <select
              value={crew}
              onChange={(event) => setCrew(event.target.value)}
            >
              <option>Choose Staff...</option>
              {job?.quoteTasks?.map((item) => (
                <option key={item.id} value={item.staff}>
                  {item.staff}
                </option>
              ))}
            </select>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className="editLabel">
            <label>Task:</label>
          </td>
          <td>
            <select
              value={task}
              onChange={(event) => setTask(event.target.value)}
            >
              <option>Choose Task...</option>
              {job?.quoteTasks?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <label>Start Time:</label>
          </td>
          <td>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </td>
          <td>
            <label>Finish Time:</label>
          </td>
          <td>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Notes:</label>
          </td>
          <td colSpan={3}>
            <ReactQuill value={timeSheetNotes} onChange={setTimeSheetNotes} />
          </td>
        </tr>
      </table>
      <button type="submit" onClick={addTimelog}>
        Save
      </button>
      <button type="submit">Cancel</button>
      <hr />
      <div>
        <button onClick={handlePrevWeek}>Previous Week</button>
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
      <h1>
        Week: {formatDate(weekStart)} - {formatDate(weekEnd)}
      </h1>
      <table>
        <tr>
          <th>Date</th>
          <th>Task</th>
          <th>Invoice</th>
          <th>Folder</th>
          <th>Staff</th>
          <th>Time</th>
        </tr>
        {sortedLogin?.map((log) => (
          <tr key={log.id} className="logData">
            <td className="data">
              {new Date(log.date.seconds * 1000).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td style={{ color: "blue" }}>
              {log.task}
              <br />
              <div
                style={{ color: "black" }}
                dangerouslySetInnerHTML={{
                  __html: log.notes,
                }}
              ></div>
            </td>
            <td></td>
            <td></td>
            <td className="data">{log.staff}</td>
            <td>{log.time}</td>
          </tr>
        ))}
      </table>
      <style jsx>{`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td,
        th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
          vertical-align: top;
        }

        .logData > .data {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

// Helper function to get the start of the week for a given date
const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday if necessary
  return new Date(date.setDate(diff));
};

// Helper function to get the end of the week for a given date
const getEndOfWeek = (date) => {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  return endOfWeek;
};

export default TimeSheet;
