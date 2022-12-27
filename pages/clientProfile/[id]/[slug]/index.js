/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { db } from '../../../../src/config/firebase.config';
import DatePicker from "react-datepicker"; 
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


require("react-datepicker/dist/react-datepicker.css");

const ClientQuote = () => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(false);
    const [quoteUniId, setQuoteUniId] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [clientName, setClientName] = useState("");
    const [contactPerson, setContactPerson] = useState([]);
    const [temps, setTemps] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [budget, setBudget] = useState(0);
    const [job, setJob] = useState({});
    const [tasks, setTasks] = useState([]);
    const [newDesc, setNewDesc] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newBillableRate, setNewBillableRate] = useState("");
    const [quotes, setQuotes] = useState([]);

    const router = useRouter();

    const clientsCollectionRef = collection(db, "clients");

    const quotesCollectionRef = collection(db, "quotes");

    const tempsCollectionRef = collection(db, "jobTemplates");

    useEffect(() => {
        setLoading(true);
        const getClient = async () => {
            const url = window.location.href;
            const lastSegment = url.split("/").pop();
            const q = query(clientsCollectionRef, where("slug", "==", lastSegment));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setClient(res[0]);
            setClientName(res[0].name);
            setLoading(false);
        }
        getClient();
    }, [])

    useEffect(() => {
      const getQuotes = async () => {
        const q = query(quotesCollectionRef, orderBy("quoteNumber"));
        const data = await getDocs(q);
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setQuotes(res);
  
        const quoteNumbers = res.map((quote) => quote.number)
        const largest = Math.max(...quoteNumbers);
        const sum = largest + 1;
        const quoteNumber = sum.toString().padStart('5', 0);
        setQuoteUniId('Q' + quoteNumber);
        // setInitialNumber(sum);
      };
      getQuotes();
    }, []);

    useEffect(() => {
      const getTemp = async () => {
        const q = query(tempsCollectionRef, orderBy("name"));
        const data = await getDocs(q);
        setTemps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getTemp();
    }, []);

    const handleNameChange = (e) => {
      console.log(e.target.value);
      const selectedName = temps.find((temp) => temp.name === e.target.value);
      setDesc(selectedName.description);
      setName(selectedName.name);
    };

    const handleClientChange = (e) => {
      console.log(e.target.value);
      const selectedClient = client.find((staff) => staff.name === e.target.value);
      setClientName(selectedClient.name)
      setContactPerson(selectedClient);
    };


    const saveQuote = async () => {
      await addDoc(quotesCollectionRef, {
        quoteNumber: quoteUniId === 'Q-Infinity' ? 'Q00001' : quoteUniId,
        date: startDate,
        validDate: endDate,
        client: clientName,
        contact: contactPerson || null,
        name: name,
        description: desc,
        budget: budget
    });
    window.location.pathname="/quotes";
  
    }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "50px" }}>
        {loading && <LoadingSpinner />}
        <h1 style={{ borderBottom: "1px solid #ececec" }}>Quote Information - {quoteUniId === "Q-Infinity" ? "Q00001" : quoteUniId}</h1>
  
        <div style={{ fontSize: "12px" }}>
          <table>
            <tr>
              <td className="editLabel">
                <label>Date:</label>
              </td>
              <td className="editCell">
                {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> */}
                <DatePicker
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={date => setStartDate(date)}
                  dateFormat={'dd/MM/yyyy'}
                  className="newQuoteDate"
                />
              </td>
              <td className="editLabel">
                <label>Valid Date:</label>
              </td>
              <td className="editCell">
                {/* <input
                  type="date"
                  value={validDate}
                  onChange={(e) => setValidDate(e.target.value)}
                /> */}
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  onChange={date => setEndDate(date)}
                  dateFormat={'dd/MM/yyyy'}
                  minDate={startDate}
                  className="newQuoteDate"
                />
              </td>
            </tr>
            <tr>
              <td className="editLabel">
                <label>Client:</label>
              </td>
              <td className="editCell">
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </td>
              <td className="editLabel">
                <label>Contact:</label>
              </td>
              <td className="editCell">
                <select value={contactPerson} onChange={(e) => setContactPerson(e.target.value)}>
                    <option>Choose Contact...</option>
                    {client?.contacts?.map((person) => (
                      <option value={person.name}>{person.name}</option>
                    ))}
                  </select>
                {/* <input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                /> */}
              </td>
            </tr>
            <tr>
              <td className="editLabel">
                <label>Template:</label>
              </td>
              <td className="editCell">
                <select onChange={handleNameChange}>
                  <option>Choose Template...</option>
                  {temps.map((temp) => (
                    <option key={temp.id} value={temp.name}>
                      {temp.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="editLabel">
                <label>Name:</label>
              </td>
              <td className="editCell">
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="editLabel">
                <label>Description:</label>
              </td>
              <td colSpan={3} className="editCellMulti">
                <ReactQuill value={desc} onChange={setDesc} />
              </td>
            </tr>
            <tr>
              <td className="editLabel">
                <label>Budget:</label>
              </td>
              <td className="editCell">
                <input
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </td>
            </tr>
          </table>
        </div>
        <div>
        <button onClick={saveQuote}>Save</button>
          {/* <button type="submit" onClick={saveQuote}>Save</button> */}
          {/* <Link href="[externalId]/[number]" as={`${job.jobNumber}/${job.number}`}>Save</Link> */}
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
  )
}

export default ClientQuote