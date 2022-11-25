/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../src/config/firebase.config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  update,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ExternalQuoteToPrint from "./ExternalQuoteToPrint";
import EditQuoteTask from "./EditQuoteTask";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import EditQuoteCost from "./EditQuoteCost";
import moment from "moment/moment";
import dateFormat, { masks } from "dateformat";

function ExternalQuote({ job, closeModal }) {
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(
    `${new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}`
  );
  const [dueDate, setDueDate] = useState(
    `${new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}`
  );
  const [clientName, setClientName] = useState(`${job.client}`);
  const [contact, setContact] = useState(`${job.contact}`);
  const [desc, setDesc] = useState(`${job.description}`);
  const [siteAddress, setSiteAddress] = useState(`${job.site_address}`);
  const [taskModal, setTaskModal] = useState(false);
  const [costModal, setCostModal] = useState(false);
  const [quoteTaskName, setQuoteTaskName] = useState("");
  const [quoteTime, setQuoteTime] = useState("--:--");
  const [quoteBaseRate, setQuoteBaseRate] = useState("");
  const [quoteTaskCost, setQuoteTaskCost] = useState("");
  const [quoteBillableRate, setQuoteBillableRate] = useState("");
  const [quoteTotalRate, setQuoteTotalRate] = useState("");
  const [quoteNote, setQuoteNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [resize, setResize] = useState("70%");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [costDescription, setCostDescription] = useState("");
  const [costQty, setCostQty] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [costSupplier, setCostSupplier] = useState("");
  const [costCode, setCostCode] = useState("");
  const [tax, setTax] = useState("");
  const [costNote, setCostNote] = useState("");
  const [selectedCosts, setSelectedCosts] = useState([]);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath.replace("#myModal", ""));
  };

  const checkBoxTask = useRef();

  console.log(router.asPath);
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

  const printViewButton = () => {
    setOpenModal(true);
    setResize("100%");
  };

  const handleSelecTask = (e, id) => {
    const taskSelected = job.quoteTasks.find((task) => task.id === id);
    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedTasks((prev) => [...prev, taskSelected]);
    } else {
      setSelectedTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  console.log(selectedTasks);

  const handleSelectCost = (e, id) => {
    const costSelected = job.quoteCosts.find((cost) => cost.id === id);
    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedCosts((prev) => [...prev, costSelected]);
    } else {
      setSelectedCosts((prev) => prev.filter((cost) => cost.id !== id));
    }
  };

  const editHandler = (id) => {
    setIsEdit(id);
  };

  const tasksCollectionRef = collection(db, "tasks");

  const suppliersCollectionRef = collection(db, "suppliers");

  // GET TASKS COLLECTION
  useEffect(() => {
    const getTasks = async () => {
      const q = query(tasksCollectionRef, orderBy("name"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(res);
    };
    getTasks();
  }, []);

  // GET SUPPLIERS COLLECTION
  useEffect(() => {
    const getSuppliers = async () => {
      const q = query(suppliersCollectionRef, orderBy("supplierName"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSuppliers(res);
    };
    getSuppliers();
  }, []);

  // ADD TASK IN AN ARRAY OF TASKS

  async function addQuoteTask() {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    updateDoc(jobDoc, {
      quoteTasks: arrayUnion({
        id: "QUOTE:" + taskId,
        name: quoteTaskName,
        time: quoteTime,
        baseRate: Number(quoteBaseRate),
        cost: quoteTime.replace(":", ".") * Number(quoteBaseRate),
        billableRate: Number(quoteBillableRate),
        note: quoteNote,
        total: quoteTime.replace(":", ".") * Number(quoteBillableRate),
      }),
    }).then(() => {
      refreshData();
      
    });

    setTaskModal(false);
  }

  // ADD ARRAY OF COST
  async function addQuoteCost() {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    updateDoc(jobDoc, {
      quoteCosts: arrayUnion({
        id: "COST:" + taskId,
        description: costDescription,
        quantity: costQty,
        unitCost: Number(unitCost),
        cost: Number(costQty) * Number(unitCost),
        unitPrice: Number(unitPrice),
        supplier: costSupplier,
        code: Number(costCode),
        tax: Number(tax),
        notes: costNote,
        total: Number(costQty) * Number(unitPrice)
      }),
    }).then(() => {
      refreshData();
      setCostModal(false);
    });
  }

  const handleQuoteTaskName = (e) => {
    console.log(e.target.value);
    const selectedQuoteTemplate = tasks.find(
      (task) => task.name === e.target.value
    );
    setQuoteBaseRate(selectedQuoteTemplate.baseRate);
    setQuoteBillableRate(selectedQuoteTemplate.billableRate);
    setQuoteTaskName(selectedQuoteTemplate.name);
  };

  const any = job.quoteTasks ? job.quoteTasks.map((res) => res.time) : "";

  const sumTime = any
    ? any.reduce(
        (acc, time) => acc.add(moment.duration(time)),
        moment.duration()
      )
    : "";

  const costsArray = job.quoteTasks ? job.quoteTasks.map((q) => q.cost) : "";

  console.log(costsArray);

  let sumCosts = 0;

  for (const value of costsArray) {
    sumCosts += value;
  }

  const tasksTotalArray = job.quoteTasks
    ? job.quoteTasks.map((q) => q.total)
    : "";

  let sumTasksTotal = 0;

  for (const value of tasksTotalArray) {
    sumTasksTotal += value;
  }

  const quoteCostArray = job.quoteCosts
    ? job.quoteCosts.map((q) => q.cost)
    : "";

  let sumCostsCost = 0;

  for (const value of quoteCostArray) {
    sumCostsCost += value;
  }

  const quoteCostTotalArray = job.quoteCosts
    ? job.quoteCosts.map((q) => q.total)
    : "";

  let sumCostsTotal = 0;

  for (const value of quoteCostTotalArray) {
    sumCostsTotal += value;
  }

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div className="externalQuoteWrapper" style={{ position: "relative" }}>
      {!openModal && (
        <div>
          <h1 style={{ fontSize: "18px" }}>Quote Information</h1>
          <div>
            <label>Date:</label>
            <div>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <label>Valid date:</label>
            <div>
              <input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <label>Client name:</label>
            <div>
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <label>Contact:</label>
            <div>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <label>Site Address:</label>
            <div>
              <input
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Description:</label>
            <div style={{ margin: "15px 0" }}>
              <ReactQuill value={desc} onChange={setDesc} height="50%" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 0",
            }}
          >
            <label>Task</label>
            <button type="submit" onClick={(e) => setTaskModal(true)}>
              <a href="#myModal">+ New Task</a>
            </button>
          </div>

          {taskModal ? (
            <div
              id="myModal"
              style={{
                position: "absolute",
                zIndex: 1,
                paddingTop: 100,
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%, -50%)",
                overflow: "auto",
                backgroundColor: "rgb(0,0,0)",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fefefe",
                  margin: "auto",
                  padding: "20px",
                  border: "1px solid #888",
                  width: "100%",
                }}
              >
                <h1>Add Task</h1>
                <div className="quoteTaskFormWrapper">
                  <div className="taskField">
                    <label>Task Name:</label>
                    <br />
                    <select
                      value={quoteTaskName}
                      onChange={handleQuoteTaskName}
                    >
                      <option>Choose Task...</option>
                      {tasks.map((task) => (
                        <option value={task.name}>{task.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label for="taskTime">Time:</label>
                    <br />
                    <input
                      type="text"
                      value={quoteTime}
                      onChange={(e) => setQuoteTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label for="taskBaseRate">Base Rate:</label>
                    <br />
                    <input
                      type="number"
                      value={quoteBaseRate}
                      onChange={(e) => setQuoteBaseRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label for="taskBillableRate">Billable Rate:</label>
                    <br />
                    <input
                      type="number"
                      value={quoteBillableRate}
                      onChange={(e) => setQuoteBillableRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label for="taskNote">Note:</label>
                    <br />
                    <div style={{ margin: "15px 0" }}>
                      <ReactQuill
                        value={quoteNote}
                        onChange={setQuoteNote}
                        height="50%"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={addQuoteTask}>
                  Submit
                </button>
                <br />
                <button onClick={(e) => setTaskModal(false)}>Close</button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="tableWrapper">
            <table>
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
              {job.quoteTasks &&
                job.quoteTasks.map((quoteTask, index) => (
                  <>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelecTask(e, quoteTask.id)
                              }
                            />
                          </td>
                          <td
                            key={quoteTask.id}
                            style={{ whiteSpace: "nowrap", textAlign: "left" }}
                          >
                            <strong>{quoteTask.name}</strong>
                          </td>
                          <td key={quoteTask.id}>{quoteTask.time}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.baseRate)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.cost)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.billableRate)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.total)}</td>
                          <td>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editHandler(quoteTask.id);
                              }}
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr
                          style={{
                            textAlign: "left",
                            borderBottom: "1px solid #ececec",
                            padding: "15px",
                          }}
                        >
                          <td></td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px 15px 15px 0",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: quoteTask.note,
                              }}
                            ></div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        {isEdit === quoteTask.id ? ( <EditQuoteTask job={job} index={index} quoteTask={quoteTask} setIsEdit={setIsEdit} /> ) : ("")}
                      </>
                      
                ))
              }
              {/* {job.quoteTasks &&
                job.quoteTasks.map((quoteTask, index) => (
                  <>
                    {isEdit === quoteTask.id ? (
                      <EditQuoteTask
                        job={job}
                        index={index}
                        quoteTask={quoteTask}
                        setIsEdit={setIsEdit}
                      />
                    ) : (
                      <>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelecTask(e, quoteTask.id)
                              }
                            />
                          </td>
                          <td
                            key={quoteTask.id}
                            style={{ whiteSpace: "nowrap", textAlign: "left" }}
                          >
                            <strong>{quoteTask.name}</strong>
                          </td>
                          <td key={quoteTask.id}>{quoteTask.time}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.baseRate)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.cost)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.billableRate)}</td>
                          <td key={quoteTask.id}>{dollarUSLocale.format(quoteTask.total)}</td>
                          <td>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editHandler(quoteTask.id);
                              }}
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr
                          style={{
                            textAlign: "left",
                            borderBottom: "1px solid #ececec",
                            padding: "15px",
                          }}
                        >
                          <td></td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px 15px 15px 0",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: quoteTask.note,
                              }}
                            ></div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </>
                    )}
                  </>
                ))} */}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {sumTime
                      ? [Math.floor(sumTime.asHours()), sumTime.minutes()].join(
                          ":"
                        )
                      : ""}
                  </strong>
                </td>
                <td></td>
                <td>
                  <strong>{dollarUSLocale.format(sumCosts)}</strong>
                </td>
                <td></td>
                <td>
                  <strong>{dollarUSLocale.format(sumTasksTotal)}</strong>
                </td>
              </tr>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <label>Costs</label>
            <button type="submit" onClick={(e) => setCostModal(true)}>
              <a href="#myModal">+ New Cost</a>
            </button>
          </div>

          {costModal ? (
            <div
              id="myModal"
              style={{
                position: "absolute",
                zIndex: 1,
                paddingTop: 100,
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%, -50%)",
                overflow: "auto",
                backgroundColor: "rgb(0,0,0)",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fefefe",
                  margin: "auto",
                  padding: "20px",
                  border: "1px solid #888",
                  width: "100%",
                }}
              >
                <h1 style={{ fontSize: "18px" }}>Add Cost</h1>
                <div className="quoteCostFormWrapper">
                  <div className="costField">
                    <label>Description:</label>
                    <br />
                    <input
                      value={costDescription}
                      onChange={(e) => setCostDescription(e.target.value)}
                    />
                  </div>
                  <div className="costField">
                    <label>Quantity</label>
                    <br />
                    <input
                      type="number"
                      value={costQty}
                      onChange={(e) => setCostQty(e.target.value)}
                      style={{ width: "50%" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "15px",
                    }}
                  >
                    <div className="costField">
                      <label>Unit Cost</label>
                      <br />
                      <input
                        type="number"
                        value={unitCost}
                        onChange={(e) => setUnitCost(e.target.value)}
                      />
                    </div>
                    <div className="costField">
                      <label>Unit Price</label>
                      <br />
                      <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "15px",
                    }}
                  >
                    <div className="costField">
                      <label>Supplier</label>
                      <br />
                      <div>
                        <select
                          value={costSupplier}
                          onChange={(e) => setCostSupplier(e.target.value)}
                          style={{ padding: "8px 7px", margin: "15px 0" }}
                        >
                          <option>Choose supplier...</option>
                          {suppliers.map((supplier) => (
                            <option value={supplier.supplierName}>
                              {supplier.supplierName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="costField">
                      <label>Code</label>
                      <br />
                      <input
                        type="number"
                        value={costCode}
                        onChange={(e) => setCostCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="costField">
                    <label>Tax</label>
                    <br />
                    <select
                      value={tax}
                      onChange={(e) => setTax(e.target.value)}
                      style={{ padding: "8px 7px", margin: "15px 0" }}
                    >
                      <option value="GST (10.0%)">GST (10.0%)</option>
                      <option value="None (0.0%)">None (0.0%)</option>
                    </select>
                  </div>
                  <div>
                    <label for="taskNote">Note:</label>
                    <br />
                    <div style={{ margin: "15px 0" }}>
                      <ReactQuill
                        value={costNote}
                        onChange={setCostNote}
                        height="50%"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={addQuoteCost}>
                  Save
                </button>
                <br />
                <button onClick={(e) => setCostModal(false)}>Close</button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="tableWrapper">
            <table>
              <tr>
                <th>Bill</th>
                <th style={{ textAlign: "left"}}>
                  Description
                </th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Cost</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>

              {job.quoteCosts &&
                job.quoteCosts.map((quoteCost, index) => (
                  <>
                    {isEdit === quoteCost.id ? (
                      <EditQuoteCost
                        job={job}
                        index={index}
                        quoteCost={quoteCost}
                        setIsEdit={setIsEdit}
                      />
                    ) : (
                      <>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) => handleSelectCost(e, quoteCost.id)}
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <strong>
                              {quoteCost.description}
                              <br />
                              <span style={{ color: "blue" }}>
                                {quoteCost.supplier}
                              </span>
                            </strong>
                          </td>
                          <td>{quoteCost.quantity}</td>
                          <td>{quoteCost.unitCost}</td>
                          <td>{quoteCost.cost}</td>
                          <td>{quoteCost.unitPrice}</td>
                          <td>{quoteCost.total}</td>
                          <td>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editHandler(quoteCost.id);
                              }}
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ececec" }}>
                          <td colSpan={1}></td>
                          <td align="left" colSpan="7">
                            <div
                              style={{ textAlign: "left", width: "100%", whiteSpace: "normal" }}
                              dangerouslySetInnerHTML={{
                                __html: quoteCost.notes,
                              }}
                            ></div>
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>{dollarUSLocale.format(sumCostsCost)}</strong></td>
                  <td></td>
                  <td><strong>{dollarUSLocale.format(sumCostsTotal)}</strong></td>
                  <td></td>
                </tr>
            </table>
          </div>

          <table>
            <tr className="folders">
              <td style={{ textAlign: "left" }}>Sub Total</td>
              <td style={{ borderTop: "1px solid black", textAlign: "right" }}>
                {dollarUSLocale.format(sumCosts + sumCostsCost)}
              </td>

              <td style={{ borderTop: "1px solid black", textAlign: "right" }}>
                {dollarUSLocale.format(sumTasksTotal + sumCostsTotal)}
              </td>
            </tr>
            <tr className="folders">
              <td style={{ textAlign: "left" }}>GST (10.0%)</td>
              <td
                style={{ textAlign: "right", borderBottom: "1px solid black" }}
              >
                {dollarUSLocale.format((sumCosts + sumCostsCost) * 0.10)}
              </td>

              <td
                style={{ textAlign: "right", borderBottom: "1px solid black" }}
              >
                {dollarUSLocale.format((sumTasksTotal + sumCostsTotal) * 0.10)}
              </td>
            </tr>
            <tr className="folders">
              <td style={{ textAlign: "left" }}>Total</td>
              <td style={{ textAlign: "right" }}>
                <strong>{dollarUSLocale.format((sumCosts + sumCostsCost) + ((sumCosts + sumCostsCost) * 0.10))}</strong>
              </td>

              <td style={{ textAlign: "right" }}>
                <strong>{dollarUSLocale.format((sumTasksTotal + sumCostsTotal) + ((sumTasksTotal + sumCostsTotal) * 0.10))}</strong>
              </td>
            </tr>
            <tr className="folders">
              <td style={{ textAlign: "left" }}>Gross Profit Margin</td>
              <td></td>
              <td style={{ textAlign: "right" }}>{dollarUSLocale.format((sumTasksTotal + sumCostsTotal) - (sumCosts + sumCostsCost))}</td>
            </tr>
            <tr className="folders">
              <td style={{ textAlign: "left" }}>Gross Profit %</td>
              <td></td>
              <td style={{ textAlign: "right" }}>{dollarUSLocale.format((((sumTasksTotal + sumCostsTotal) - (sumCosts + sumCostsCost))/(sumTasksTotal + sumCostsTotal)*100).toFixed(2))}</td>
            </tr>
          </table>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginBottom: "50px",
            }}
          >
            <button type="primary" onClick={printViewButton}>
              Print View
            </button>
            <button className="modalBtn" onClick={closeModal}>
              close
            </button>
          </div>
        </div>
      )}

      {openModal && (
        <div className="preview modalBackground">
          <div className="modalContainer">
            <ExternalQuoteToPrint
              job={job}
              selectedTasks={selectedTasks}
              selectedCosts={selectedCosts}
              startDate={startDate}
              dueDate={dueDate}
              clientName={clientName}
              siteAddress={siteAddress}
              quoteTaskName={quoteTaskName}
              contact={contact}
              desc={desc}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          font-size: 12px;
        }

        .externalQuoteWrapper {
          width: ${resize};
          margin: 0 auto;
          padding: 20px;
          background: #ffff;
        }

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
          white-space: nowrap;
        }

        th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
        }

        td {
          text-align: center;
          padding: 5px;
        }

        .docs {
          transition: 0.3s;
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
          width: 100%;
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
          font-weight: 500;
        }

        input {
          width: 100%;
          line-height: 28px;
          margin: 15px 0;
        }

        p {
          margin: 0;
          font-size: 12px;
        }

        .folders {
          border: 1px solid #dddddd;
          padding: 8px;
          white-space: nowrap;
          text-align: right;
        }

        @media screen and (max-width: 990px) {
          .externalQuoteWrapper {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ExternalQuote;
