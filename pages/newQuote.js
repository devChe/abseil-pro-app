/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import dateFormat, { masks } from "dateformat";
import {
    addDoc,
      arrayRemove,
      arrayUnion,
      collection,
      doc,
      docs,
      Firestore,
      getDoc,
      getDocs,
      onSnapshot,
      orderBy,
      query,
      setDoc,
      updateDoc,
      where,
    } from "firebase/firestore";
    import { useRouter } from "next/router";
    import React, { useState, useEffect } from "react";
    import dynamic from "next/dynamic";
    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
    import "react-quill/dist/quill.snow.css";
    import "react-responsive-modal/styles.css";
    import { Modal } from "react-responsive-modal";
    import moment from "moment/moment";
    import Link from "next/link";
    import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
    import { v4 } from "uuid";
    import NewQuoteTask from "../components/NewQuoteTask";
    import { db, storage } from "../src/config/firebase.config";
    import NewQuoteCosts from "../components/NewQuoteCosts";
    import LoadingSpinner from "../components/LoadingSpinner";
    import ExternalQuoteToPrint from "../components/ExternalQuoteToPrint";

    require('react-datepicker/dist/react-datepicker.css')
    
    const externalId = () => {
      const [job, setJob] = useState({});
      const [clients, setClients] = useState([]);
      const [temps, setTemps] = useState([]);
      const [tasks, setTasks] = useState([]);
      const [quotes, setQuotes] = useState([]);
      const [clientName, setClientName] = useState("");
      const [contactPerson, setContactPerson] = useState([]);
      const [contact, setContact] = useState("");
      const [desc, setDesc] = useState("");
    //   const [date, setDate] = useState("");
    //   const [validDate, setValidDate] = useState("");
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [name, setName] = useState("");
      const [budget, setBudget] = useState(0);
      const [state, setState] = useState('draft');
      const [selectedTasks, setSelectedTasks] = useState([]);
      const [selectedCosts, setSelectedCosts] = useState([]);
      const [open, setOpen] = useState(false);
      const [newTime, setNewTime] = useState("");
      const [newDesc, setNewDesc] = useState("");
      const [newTask, setNewTask] = useState("");
      const [newBaseRate, setNewBaseRate] = useState("");
      const [newCost, setNewCost] = useState("");
      const [newBillableRate, setNewBillableRate] = useState("");
      const [newTotal, setNewTotal] = useState("");
      const [taskId, setTaskId] = useState("");
      const [addTaskOpen, setAddTaskOpen] = useState(false);
      const [addCostOpen, setAddCostOpen] = useState(false);
      const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
      const [deleteCostOpen, setDeleteCostOpen] = useState(false);
      const [quoteUniId, setQuoteUniId] = useState('');
      const [initialNumber, setInitialNumber] = useState('');
      const [printQuote, setPrintQuote] = useState(false);
      // State for New Cost
      const [newCostDesc, setNewCostDesc] = useState("");
      const [newQty, setNewQty] = useState("");
      const [newUnitCost, setNewUnitCost] = useState("");
      const [newUnitPrice, setNewUnitPrice] = useState("");
      const [newSupplier, setNewSupplier] = useState("");
      const [newCode, setNewCode] = useState("");
      const [newTax, setNewTax] = useState("");
      const [newNotes, setNewNotes] = useState("");
      const [isChecked, setIsChecked] = useState(true);
      const [loading, setLoading] = useState(false);
    
      // const onOpenModal = () => setOpen(true);
      // const onCloseModal = () => setOpen(false);
    
      function onCloseModal() {
        setOpen(false);
        setAddTaskOpen(false);
        setAddCostOpen(false);
        setDeleteTaskOpen(false);
        setDeleteCostOpen(false);
        setPrintQuote(false);
      }
    
      const router = useRouter();
    
      const refreshData = () => {
        router.replace(router.asPath.replace("#myModal", ""));
      };
  
      console.log(router.asPath);
    
      const { externalId } = router.query;
    
      const jobsCollectionRef = collection(db, "jobs");
      const clientsCollectionRef = collection(db, "clients");
      const tempsCollectionRef = collection(db, "jobTemplates");
      const tasksCollectionRef = collection(db, "tasks");
      const quotesCollectionRef = collection(db, "quotes");
  
      useEffect(() => {
        setLoading(true);
        const getJob = async () => {
          const url = window.location.href;
          const lastSegment = url.split("/").pop();
          const q = query(jobsCollectionRef, where("jobNumber", "==", lastSegment))
          onSnapshot(q, (snapshot) => {
            const res = snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }));
            const job = res[0];
            setJob(job);
            setLoading(false);
          })
        }
        getJob()
      }, [])
    
      useEffect(() => {
        const getQuotes = async () => {
          const q = query(quotesCollectionRef, orderBy("quoteNumber"));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQuotes(res);
          console.log(res);
    
          const quoteNumbers = res.map((quote) => quote.number)
          console.log(quoteNumbers)
          const largest = Math.max(...quoteNumbers);
          console.log(largest)
          const sum = largest + 1;
          console.log(sum);
          const quoteNumber = sum.toString().padStart('5', 0);
          console.log(quoteNumber);
          setQuoteUniId('Q' + quoteNumber);
          console.log('Q' + quoteNumber);
          setInitialNumber(sum);
        };
        getQuotes();
      }, []);

      const uniId = () => {
        const d = new Date();
        const day = d.getDate().toString();
        const month = d.getMonth().toString();
        const yr = d.getFullYear().toString();
        const hr = d.getHours().toString();
        const min = d.getMinutes().toString();
        const sec = d.getSeconds().toString();
        const formattedDate = month + day + yr + hr + min + sec;
        setTaskId(formattedDate);
      };
    
      useEffect(() => {
        setTaskId(uniId);
      }, []);
    
      // const handleSelectTask = (e, id) => {
      //   const taskSelected = job.data.quoteTasks.find((task) => task.id === id);
        
      //   if (e.target.checked) {
      //     setSelectedTasks((prev) => [...prev, taskSelected]);
      //   } else {
      //     setSelectedTasks((prev) => {
      //       console.log(prev);
      //       return prev.filter((task) => task.id !== id);
      //     });
      //   }
      // };
  
      // const handleSelectCost = (e, id) => {
      //   const costSelected = job.data.quoteCosts.find((cost) => cost.id === id);
      //   console.log(e.target.checked);
      //   if (e.target.checked) {
      //     setSelectedCosts((prev) => [...prev, costSelected]);
      //   } else {
      //     setSelectedCosts((prev) => prev.filter((cost) => cost.id !== id));
      //   }
      // };
    
    
      useEffect(() => {
        const getClients = async () => {
          const q = query(clientsCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setClients(res);
        };
        getClients();
      }, []);
    
      useEffect(() => {
        const getTemp = async () => {
          const q = query(tempsCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          setTemps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTemp();
      }, []);
    
      useEffect(() => {
        const getTasks = async () => {
          const q = query(tasksCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setTasks(res);
        };
        getTasks();
      }, []);
    
      const handleNameChange = (e) => {
        console.log(e.target.value);
        const selectedName = temps.find((temp) => temp.name === e.target.value);
        const selectedTasks = tasks.find((task) => task.name.includes(e.target.value));
        setDesc(selectedName.description);
        setName(selectedName.name);
        setSelectedTasks(selectedTasks);
        
      };
    
      let dollarUSLocale = Intl.NumberFormat("en-US");
    
      const handleClientChange = (e) => {
        console.log(e.target.value);
        const selectedClient = clients.find((client) => client.name === e.target.value);
        setClientName(selectedClient.name)
        setContactPerson(selectedClient);
      };
    
      // SAVE QUOTE
    
      const saveQuote = async () => {
        await addDoc(quotesCollectionRef, {
          quoteNumber: quoteUniId === 'Q-Infinity' ? 'Q00001' : quoteUniId,
          number: quoteUniId === 'Q-Infinity' ? Number(1) : Number(initialNumber),
          date: startDate,
          validDate: endDate,
          client: clientName,
          contact: contact || null,
          name: name,
          description: desc,
          budget: budget,
          state: "Draft",
          quoteTasks: arrayUnion(selectedTasks)
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
                <select value={clientName} onChange={handleClientChange}>
                  <option>Choose Client...</option>
                  {clients.map(client => 
                    <option key={client.id} value={client.name}>{client.name}</option>
                  )}
                </select>
                  {/* <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  /> */}
                </td>
                <td className="editLabel">
                  <label>Contact:</label>
                </td>
                <td className="editCell">
                  <select value={contact} onChange={(e) => setContact(e.target.value)}>
                    <option>Choose Contact...</option>
                    {contactPerson?.contacts?.map((contact) => (
                      <option value={contact.name}>{contact.name}</option>
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
    };
    
    export default externalId;
    