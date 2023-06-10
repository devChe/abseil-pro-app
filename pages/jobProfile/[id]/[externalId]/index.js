/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { db, storage } from "../../../../src/config/firebase.config";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import moment from "moment/moment";
import NewQuoteTask from "../../../../components/NewQuoteTask";
import NewQuoteCosts from "../../../../components/NewQuoteCosts";
import Link from "next/link";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ExternalQuoteToPrint from "../../../../components/ExternalQuoteToPrint";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import dateFormat, { masks } from "dateformat";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


require("react-datepicker/dist/react-datepicker.css");
  
  
const externalId = () => {
    const [job, setJob] = useState({});
    const [clients, setClients] = useState([]);
    const [temps, setTemps] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [clientName, setClientName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
    const [userId, setUserId] = useState('');
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
          setClientName(job.data.client);
          setName(job.data.name);
          setDesc(job.data.description);
          setContactPerson(job.data.contactPerson);
          setStartDate(new Date());
          setEndDate(new Date());
          setLoading(false);
          setSelectedTasks(job.data.quoteTasks || []);
          setSelectedCosts(job.data.quoteCosts || []);
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
  
        const quoteNumbers = res.map((quote) => quote.number)
        console.log("Eto ang quotenumbers:" + quoteNumbers);
        const largest = Math.max(...quoteNumbers);
        console.log("Eto ang largest number:" + largest);
        const sum = largest + 1;
        console.log("Eto ang sum ng largest + 1:" + sum);
        const quoteNumber = sum.toString().padStart('5', 0);
        console.log("Eto ang quotenumber:" + quoteNumber);
        setQuoteUniId('Q' + quoteNumber);
        setInitialNumber(sum);
      };
      getQuotes();
    }, []);
  
    const handleSelectTask = (e, id) => {
      const taskSelected = job.data.quoteTasks.find((task) => task.id === id);
      if (e.target.checked) {
        setSelectedTasks((prev) => [...prev, taskSelected]);
      } else {
        setSelectedTasks((prev) => {
          console.log(prev);
          return prev.filter((task) => task.id !== id);
        });
      }
    };

    console.log(selectedTasks);

    const handleSelectCost = (e, id) => {
      const costSelected = job.data.quoteCosts.find((cost) => cost.id === id);
      console.log(e.target.checked);
      if (e.target.checked) {
        setSelectedCosts((prev) => [...prev, costSelected]);
      } else {
        setSelectedCosts((prev) => prev.filter((cost) => cost.id !== id));
      }
    };
  
  
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
      setDesc(selectedName.description);
      setName(selectedName.name);
    };
  
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
  
    const handleTaskChange = (e) => {
      console.log(e.target.value);
      const selectedTask = tasks.find((task) => task.name === e.target.value);
      setNewTask(selectedTask.name);
      setNewDesc(selectedTask.description);
      setNewBaseRate(selectedTask.baseRate);
      setNewBillableRate(selectedTask.billableRate);
    };
  
    // ADD TASK IN AN ARRAY OF TASKS
  
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
  
    async function addQuoteTask() {
      const id = job.id;
      console.log(id);
      const jobDoc = doc(db, "jobs", id);
      updateDoc(jobDoc, {
        quoteTasks: arrayUnion({
          id: 'TASK:'+ taskId ,
          name: newTask,
          time: newTime,
          baseRate: Number(newBaseRate),
          cost: newTime.replace(":", ".") * Number(newBaseRate),
          billableRate: Number(newBillableRate),
          note: newDesc,
          total: newTime.replace(":", ".") * Number(newBillableRate),
          state: state
        }),
      }).then(() => {
        setAddTaskOpen(false);
        setLoading(true);
      })
    }
  
    // DELETE ITEM OF TASK IN ARRAY
  
    async function deleteTask(
      jobId,
      id,
      name,
      time,
      baseRate,
      cost,
      billableRate,
      note,
      total,
      index
    ) {
      const jobDoc = doc(db, "jobs", jobId);
      await updateDoc(jobDoc, {
        quoteTasks: arrayRemove({
          id: id,
          name: name,
          time: time,
          baseRate: baseRate,
          cost: cost,
          billableRate: billableRate,
          note: note,
          total: total,
        }),
        
      }).then(() => {
        setDeleteTaskOpen(false);
      });
    }
  
  
    //ADD COST IN ARRAY OF QUOTECOSTS
  
    async function addQuoteCost() {
      const id = job.id;
      const jobDoc = doc(db, "jobs", id);
      updateDoc(jobDoc, {
        quoteCosts: arrayUnion({
          id: "COST:" + taskId,
          code: Number(newCode),
          cost: Number(newQty) * Number(newUnitCost),
          description: newCostDesc,
          notes: newNotes,
          quantity: Number(newQty),
          supplier: newSupplier,
          tax: newTax,
          total: Number(newQty) * Number(newUnitPrice),
          unitCost: Number(newUnitCost),
          unitPrice: Number(newUnitPrice)
        }),
      }).then(() => {
        setAddCostOpen(false);
        refreshData()
      });
    }
  
    const arrayOfQuoteCost = job ? job?.data?.quoteCosts?.map((cost) => cost.cost) : "";
  
    let sumOfQuoteCost = 0;
  
    arrayOfQuoteCost?.forEach((total) => {
      sumOfQuoteCost += total;
    });
  
  
    const arrayOfQuoteTotal = job ? job?.data?.quoteCosts?.map((cost) => cost.total) : "";
  
    let sumOfQuoteTotal = 0;
  
    arrayOfQuoteTotal?.forEach((total) => {
      sumOfQuoteTotal += total;
    });
  
    // DELETE QUOTE COST
  
    async function deleteQuoteCost(id,code,cost,description,notes,quantity,supplier,tax,total,unitCost,unitPrice) {
      const jobId = job.id;
      const jobDoc = doc(db, "jobs", jobId);
      updateDoc(jobDoc, {
        quoteCosts: arrayRemove({
          id: id,
          code: code,
          cost: cost,
          description: description,
          notes: notes,
          quantity: quantity,
          supplier: supplier,
          tax: tax,
          total: total,
          unitCost: unitCost,
          unitPrice: unitPrice
        }),
      }).then(() => {
        window.location.reload(false);
      });
    }
  
    // SAVE QUOTE
    const saveQuote = async () => {
      console.log(selectedTasks);
      await addDoc(quotesCollectionRef, {
        quoteNumber: quoteUniId === 'Q-Infinity' ? 'Q00001' : quoteUniId,
        number: quoteUniId === 'Q-Infinity' ? Number(1) : Number(initialNumber),
        userId: userId,
        date: startDate,
        validDate: endDate,
        client: clientName,
        contact: contactPerson || null,
        name: name,
        description: desc,
        budget: budget,
        total: (
          sumOfTotal +
            sumOfQuoteTotal +
            (sumOfTotal + sumOfQuoteTotal) * 0.1
        ),
        quoteCosts: selectedCosts,
        quoteTasks: selectedTasks
    });
    
    setPrintQuote(true);
  
    // window.location.pathname="/quotes";
  
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
                <input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
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
          <div style={{ paddingTop: "20px" }}>
            <h2>Tasks & Costs</h2>
          </div>
  
          <div className="taskSection">
            <div>
              <h3>Tasks</h3>
            </div>
            <button onClick={() => setAddTaskOpen(true)}>+ New Task</button>
            <Modal open={addTaskOpen} onClose={onCloseModal} center>
              <h2>Task Information</h2>
              <NewQuoteTask
                job={job}
                tasks={tasks}
                handleTaskChange={handleTaskChange}
                newDesc={newDesc}
                setNewDesc={setNewDesc}
                newTime={newTime}
                setNewTime={setNewTime}
                newTask={newTask}
                newBillableRate={newBillableRate}
                setNewBillableRate={setNewBillableRate}
                addQuoteTask={addQuoteTask}
              />
            </Modal>
            <table
              className="tasksTable"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <tr>
                <th>Bill</th>
                <th style={{ textAlign: "left" }}>Name</th>
                <th>Time</th>
                <th>Base Rate</th>
                <th>Cost</th>
                <th>Billable Rate</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {job?.data?.quoteTasks?.map((task, index) => (
                <>
                  <tr
                    key={index}
                    style={{
                      borderLeft: "1px solid #ececec",
                      borderRight: "1px solid #ececec",
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectTask(e, task.id)}
                        defaultChecked={true}
                      />
                    </td>
                    <td style={{ textAlign: "left", fontWeight: "500" }}>
                      {task.name}
                    </td>
                    <td>{task.time}</td>
                    <td>
                    {(task.baseRate).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                    </td>
                    <td>
                    {(task.cost).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                    </td>
                    <td>
                    {(task.billableRate).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                    </td>
                    <td>
                    {(task.total).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                    </td>
                    <td>
                      <div>
                        <button>Edit</button>
                        <button onClick={() => setDeleteTaskOpen(task.id)}>
                          Delete
                        </button>
                        <Modal
                          open={deleteTaskOpen === task.id}
                          onClose={onCloseModal}
                          center
                        >
                          <h2>Are you sure to delete?</h2>
                          <button
                            onClick={() => {
                              deleteTask(
                                job.id,
                                task.id,
                                task.name,
                                task.time,
                                task.baseRate,
                                task.cost,
                                task.billableRate,
                                task.note,
                                task.total,
                                index
                              );
                            }}
                          >
                            YES
                          </button>
                          <button onClick={onCloseModal}>NO</button>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                  <tr
                    key={index}
                    style={{ border: "1px solid #ececec", borderTop: "none" }}
                  >
                    <td></td>
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
                    <td></td>
                    <td></td>
                  </tr>
                </>
              ))}
              <tr style={{ border: "1px solid #ececec" }}>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {[
                      Math.floor(sum ? sum.asHours() : ""),
                      sum ? sum.minutes() : "",
                    ].join(":")}
                  </strong>
                </td>
                <td></td>
                <td>
                  <strong>
                  {costTotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                  </strong>
                </td>
                <td></td>
                <td>
                  <strong>
                  {sumOfTotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                  </strong>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* COSTS SECTION */}
  
          <div className="costSection">
            <div>
              <h3>Costs</h3>
            </div>
            <button onClick={() => setAddCostOpen(true)}>+ New Cost</button>
            <Modal open={addCostOpen} onClose={onCloseModal} center>
              <NewQuoteCosts
                newCostDesc={newCostDesc}
                setNewCostDesc={setNewCostDesc}
                newQty={newQty}
                setNewQty={setNewQty}
                newUnitCost={newUnitCost}
                setNewUnitCost={setNewUnitCost}
                newUnitPrice={newUnitPrice}
                setNewUnitPrice={setNewUnitPrice}
                newSupplier={newSupplier}
                setNewSupplier={setNewSupplier}
                newCode={newCode}
                setNewCode={setNewCode}
                newTax={newTax}
                setNewTax={setNewTax}
                newNotes={newNotes}
                setNewNotes={setNewNotes}
                addQuoteCost={addQuoteCost}
              />
            </Modal>
            <table
              className="tasksTable"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <tr>
                <th>Bill</th>
                <th style={{ textAlign: "left" }}>Description</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Cost</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {job?.data?.quoteCosts?.map((cost, index) => (
                <>
                  <tr
                    style={{
                      borderLeft: "1px solid #ececec",
                      borderRight: "1px solid #ececec",
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectCost(e, cost.id)}
                        defaultChecked={true}
                      />
                    </td>
                    <td style={{ textAlign: "left", fontWeight: "500" }}>
                      {cost.description}
                    </td>
                    <td>{cost.quantity}</td>
                    <td>
                      {cost.unitCost
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .substring(1)}
                    </td>
                    <td>
                      {cost.cost
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .substring(1)}
                    </td>
                    <td>
                      {cost.unitPrice
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .substring(1)}
                    </td>
                    <td>
                      {cost.total
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .substring(1)}
                    </td>
                    <td>
                      <div>
                        <button>Edit</button>
                        <button onClick={() => setDeleteCostOpen(cost.id)}>
                          Delete
                        </button>
                        <Modal
                          open={deleteCostOpen === cost.id}
                          onClose={onCloseModal}
                          center
                        >
                          <h2>Are you sure to delete?</h2>
                          <button
                            onClick={() => {
                              deleteQuoteCost(
                                cost.id,
                                cost.code,
                                cost.cost,
                                cost.description,
                                cost.notes,
                                cost.quantity,
                                cost.supplier,
                                cost.tax,
                                cost.total,
                                cost.unitCost,
                                cost.unitPrice
                              );
                            }}
                          >
                            YES
                          </button>
                          <button onClick={onCloseModal}>NO</button>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #ececec", borderTop: "none" }}>
                    <td></td>
                    <td
                      style={{ textAlign: "left", padding: "8px" }}
                      className="HtmlGridCell"
                      colSpan={5}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cost.notes,
                        }}
                      ></div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              ))}
              <tr style={{ border: "1px solid #ececec" }}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {sumOfQuoteCost
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                  </strong>
                </td>
                <td></td>
                <td>
                  <strong>
                    {sumOfQuoteTotal
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .substring(1)}
                  </strong>
                </td>
                <td></td>
              </tr>
            </table>
  
            <table className="table">
              <tr className="folders">
                <td style={{ textAlign: "left" }}>Sub Total</td>
                <td style={{ borderTop: "1px solid black", textAlign: "right" }}>
                  {(costTotal + sumOfQuoteCost)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
  
                <td style={{ borderTop: "1px solid black", textAlign: "right" }}>
                  {(sumOfTotal + sumOfQuoteTotal)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
              </tr>
              <tr className="folders">
                <td style={{ textAlign: "left" }}>GST (10.0%)</td>
                <td
                  style={{ textAlign: "right", borderBottom: "1px solid black" }}
                >
                  {((costTotal + sumOfQuoteCost) * 0.1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
  
                <td
                  style={{ textAlign: "right", borderBottom: "1px solid black" }}
                >
                  {((sumOfTotal + sumOfQuoteTotal) * 0.1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                </td>
              </tr>
              <tr className="folders">
                <td style={{ textAlign: "left" }}>Total</td>
                <td style={{ textAlign: "right" }}>
                  <strong>
                  {(costTotal + sumOfQuoteCost + (costTotal + sumOfQuoteCost) * 0.1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                  </strong>
                </td>
  
                <td style={{ textAlign: "right" }}>
                  <strong>
                    {dollarUSLocale.format(
                      sumOfTotal +
                        sumOfQuoteTotal +
                        (sumOfTotal + sumOfQuoteTotal) * 0.1
                    )}
                  </strong>
                </td>
              </tr>
              <tr className="folders">
                <td style={{ textAlign: "left" }}>Gross Profit Margin</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  {dollarUSLocale.format(
                    (sumOfTotal + sumOfQuoteTotal) - (costTotal + sumOfQuoteCost)
                  )}
                </td>
              </tr>
              <tr className="folders">
                <td style={{ textAlign: "left" }}>Gross Profit %</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                {(
                    (
                      ((costTotal +
                        sumOfQuoteCost -
                        (sumOfTotal + sumOfQuoteTotal)) /
                        (sumOfTotal + sumOfQuoteTotal)) *
                      100
                    ).toFixed(2)
                  ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .substring(1)}
                  
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div>
        <button onClick={saveQuote}>Save</button>
            <Modal open={printQuote} onClose={onCloseModal} center>
              <ExternalQuoteToPrint
                job={job}
                selectedTasks={selectedTasks}
                selectedCosts={selectedCosts}
                contactPerson={contactPerson}
                endDate={endDate}
                startDate={startDate}
                clientName={clientName}
                name={name}
                desc={desc}
                quoteUniId={quoteUniId}
                />
            </Modal>
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
    );
  };
  
  export default externalId;
  