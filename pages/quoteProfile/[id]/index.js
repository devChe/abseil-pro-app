/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";
import Link from 'next/link';
import NewQuoteTask from '../../../components/NewQuoteTask';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import moment from "moment/moment";
import NewQuoteCosts from '../../../components/NewQuoteCosts';
import ExternalQuoteToPrint from '../../../components/ExternalQuoteToPrint';


export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "quotes"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "quotes", id);
  const docSnap = await getDoc(docRef);
  const quoteProps = docSnap.data();
  quoteProps.id = id;
  return {
    props: { quoteProps: JSON.stringify(quoteProps) || null },
  };
};
const quoteProfile = ({quoteProps}) => {
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [clientId, setClientId] = useState("");
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBaseRate, setNewBaseRate] = useState("");
  const [newBillableRate, setNewBillableRate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addCostOpen, setAddCostOpen] = useState(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
  const [deleteCostOpen, setDeleteCostOpen] = useState(false);
  const [deleteQuoteOpen, setDeleteQuoteOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [state, setState] = useState('Draft');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);

  const [newCostDesc, setNewCostDesc] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newUnitCost, setNewUnitCost] = useState("");
  const [newUnitPrice, setNewUnitPrice] = useState("");
  const [newSupplier, setNewSupplier] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTax, setNewTax] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [printQuote, setPrintQuote] = useState(false);
  const [printQuoteIssue, setPrintQuoteIssue] = useState(false);
  const [quoteUniId, setQuoteUniId] = useState('');

  function onCloseModal() {
    console.log("CLOSE MODAL");
    setOpen(false);
    setAddTaskOpen(false);
    setAddCostOpen(false);
    setDeleteTaskOpen(false);
    setDeleteCostOpen(false);
    setDeleteQuoteOpen(false);
    setPrintQuote(false);
    setPrintQuoteIssue(false);
  }

  const router = useRouter();

  //so the data will go first to the fallback while loading is not done
  if (router.isFallback) return <div>...Loading</div>;

  const quote = JSON.parse(quoteProps);

  const date = `${
    !quote.date
      ? ""
      : new Date(quote.date.seconds * 1000).toLocaleDateString("en-US")
  }`;
  const validTo = `${
    !quote.validDate
      ? ""
      : new Date(quote.validDate.seconds * 1000).toLocaleDateString(
          "en-US"
        )
  }`;

  const clientsCollectionRef = collection(db, "clients");

  const tasksCollectionRef = collection(db, "tasks");

  const quotesCollectionRef = collection(db, "quotes");

    useEffect(() => {
        const getClients = async () => {
            const clientName = quote.client;
            const q = query(clientsCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
            console.log(res);
            const currentClient = res.find((client) => client.name === clientName);
            setClientId(currentClient.id);
        }
        getClients();
    }, [])

    useEffect(() => {
        const getTasks = async () => {
            const clientName = quote.client;
            const q = query(tasksCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
            setTasks(res)
        }
        getTasks();
    }, [])

    useEffect(() => {
      setLoading(true);
      const getQuotes = async () => {
        const client = quote.name;
        const q = query(quotesCollectionRef, where("name", "==", client))
        onSnapshot(q, (snapshot) => {
          const res = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          const quote = res[0]
          setQuotes(quote);
          setSelectedTasks(quote.data.quoteTasks || []);
          setSelectedCosts(quote.data.quoteCosts || []);
        })
      }
      getQuotes()
    }, [])

    const handleTaskChange = (e) => {
      console.log(e.target.value);
      const selectedTask = tasks.find((task) => task.name === e.target.value);
      setNewTask(selectedTask.name);
      setNewDesc(selectedTask.description);
      setNewBaseRate(selectedTask.baseRate);
      setNewBillableRate(selectedTask.billableRate);
    };

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

    const handleSelectTask = (e, id) => {
      const taskSelected = quotes.data.quoteTasks.find((task) => task.id === id);
      if (e.target.checked) {
        setSelectedTasks((prev) => [...prev, taskSelected]);
      } else {
        setSelectedTasks((prev) => {
          console.log(prev);
          return prev.filter((task) => task.id !== id);
        });
      }
    };

    const handleSelectCost = (e, id) => {
      const costSelected = quotes.data.quoteCosts.find((cost) => cost.id === id);
      console.log(e.target.checked);
      if (e.target.checked) {
        setSelectedCosts((prev) => [...prev, costSelected]);
      } else {
        setSelectedCosts((prev) => prev.filter((cost) => cost.id !== id));
      }
    };

    async function addQuoteTask() {
      const id = quote.id;
      console.log(id);
      const quoteDoc = doc(db, "quotes", id);
      updateDoc(quoteDoc, {
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

    const any = quotes ? quotes?.data?.quoteTasks?.map((task) => task.time) : "";
  
    const sum = any
      ? any.reduce(
          (acc, time) => acc.add(moment.duration(time)),
          moment.duration()
        )
      : "";

      const arrayOfCost = quotes ? quotes?.data?.quoteTasks?.map((task) => task.cost) : "";
  
      let costTotal = 0;
    
      arrayOfCost?.forEach((cost) => {
        costTotal += cost;
      });
    
      const arrayOfTotal = quotes ? quotes?.data?.quoteTasks?.map((task) => task.total) : "";
    
      let sumOfTotal = 0;
    
      arrayOfTotal?.forEach((total) => {
        sumOfTotal += total;
      });
    
      let dollarUSLocale = Intl.NumberFormat("en-US");



      const deleteTask = async (delSelected) => {
        setLoading(true);
        const id = quote.id;
        //deleteId is the id from the post you want to delete
        const quoteDoc = doc(db, "quotes", id);
        await updateDoc(quoteDoc, {
          quoteTasks: quotes.data.quoteTasks.filter((res) => res.id !== delSelected),
        })
          .then(() => {
            setLoading(false);
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
            setLoading(false);
          });
      };

      // DELETE QUOTE COST
  
    async function deleteQuoteCost(id,code,cost,description,notes,quantity,supplier,tax,total,unitCost,unitPrice,index) {
      const quoteId = quote.id;
      const quoteDoc = doc(db, "quotes", quoteId);
      updateDoc(quoteDoc, {
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
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
        setLoading(false);
      });
    }


      //ADD COST IN ARRAY OF QUOTECOSTS
  
    async function addQuoteCost() {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      updateDoc(quoteDoc, {
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
      });
    }

    const arrayOfQuoteCost = quotes ? quotes?.data?.quoteCosts?.map((cost) => cost.cost) : "";
  
    let sumOfQuoteCost = 0;
  
    arrayOfQuoteCost?.forEach((total) => {
      sumOfQuoteCost += total;
    });
  
  
    const arrayOfQuoteTotal = quotes ? quotes?.data?.quoteCosts?.map((cost) => cost.total) : "";
  
    let sumOfQuoteTotal = 0;
  
    arrayOfQuoteTotal?.forEach((total) => {
      sumOfQuoteTotal += total;
    });

    const saveAsRevise = async () => {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      await updateDoc(quoteDoc, {
        state: "Revise",
      });
      window.location.pathname="/quotes";
    };

    const saveAsAccepted = async () => {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      await updateDoc(quoteDoc, {
        state: "Accepted",
      });
      window.location.pathname="/quotes";
    };

    const saveAsDeclined = async () => {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      await updateDoc(quoteDoc, {
        state: "Declined",
      });
      window.location.pathname="/quotes";
    };

    const saveAsDraft = async () => {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      await updateDoc(quoteDoc, {
        state: "Draft",
      });
      window.location.pathname="/quotes";
    };

    
    const saveAsIssuePrint = async () => {
      const id = quote.id;
      const quoteDoc = doc(db, "quotes", id);
      await updateDoc(quoteDoc, {
        state: "Issued",
      }).then(() => {
        alert("Quote ISSUED");
      }).then(() => {
        setPrintQuoteIssue(true);
      });
      
    };

    const deleteQuote = async () => {
      const id = quote.id
      const quoteDoc = doc(db, "quotes", id);
      await deleteDoc(quoteDoc);
      window.location.pathname="/quotes";
    }
  
  return (
    <div>
      <h1>
        {quote.quoteNumber} - {quote.name}
      </h1>
      <hr/>
      <div>
        <h2>Quote Information</h2>
        <table border='0' cellPadding='0'>
          <tbody>
            <tr>
              <td className='viewLabel'>
                <label>Quote No.:</label>
              </td>
              <td className='viewCell'>
                {quote.quoteNumber}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Date:</label>
              </td>
              <td className='viewCell'>
                <div>
                  {!date ? "DD / MM / YYYY" : dateFormat(date, "dd mmm yyyy")}
                </div>
              </td>
              <td className='viewLabel'>
                <label>Valid To:</label>
              </td>
              <td className='viewCell'>
                <div>
                  {!validTo ? "DD / MM / YYYY" : dateFormat(validTo, "dd mmm yyyy")}
                </div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Client:</label>
              </td>
              <td className='viewCell' style={{color:"blue"}}>
                <Link href="/clientProfile/[id]" as={`/clientProfile/${clientId}`} onClick={() => window.location.href.replace("quoteProfile/","" )}>
                    {quote.client}
                </Link>
              </td>
              <td className='viewLabel'>
                <label>Contact:</label>
              </td>
              <td className='viewCell' style={{color:"blue"}}>
                <div>{quote.contact}</div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Name:</label>
              </td>
              <td className='viewCell'>
                {quote.name}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Description:</label>
              </td>
              <td colSpan={3} className='viewCellmulti'>
                <div style={{lineHeight:"normal"}} dangerouslySetInnerHTML={{ __html: quote.description,}}></div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Budget:</label>
              </td>
              <td className='viewCell'>
                {quote.budget}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
          </tbody>
        </table>

        {/* <-------- TASKS AND COSTS ----------> */}

        <div>
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
              {quotes?.data?.quoteTasks?.map((task, index) => (
                <>
                  <tr
                    key={task.id}
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
                    {(task.cost)?.toLocaleString("en-US", {
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
                    {(task.total)?.toLocaleString("en-US", {
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
                          <button onClick={() => deleteTask(task.id)}>
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
        </div>

        {/* <-------- COSTS ---------> */}

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
              {quotes?.data?.quoteCosts?.map((cost, index) => (
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
                                cost.unitPrice,
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
          {quote.state === "Draft" ? ( 
            <div style={{display:"flex", justifyContent:"right", gap: "5px"}}>
              <button type="submit" onClick={() => setPrintQuote(true)}>Save Draft & Print</button>
              <Modal open={printQuote} onClose={onCloseModal} center>
                <ExternalQuoteToPrint
                  selectedTasks={selectedTasks}
                  selectedCosts={selectedCosts}
                  contactPerson={quote.contact}
                  endDate={validTo}
                  startDate={date}
                  clientName={quote.client}
                  name={quote.name}
                  desc={quote.description}
                  quoteUniId={quote.quoteNumber}
                  />
              </Modal>
              <button type="submit" onClick={saveAsDraft}>Save Draft</button>
              <button type="submit" onClick={saveAsIssuePrint}>Issue & Print</button>
              <Modal open={printQuoteIssue} onClose={onCloseModal} center>
                <ExternalQuoteToPrint
                  selectedTasks={selectedTasks}
                  selectedCosts={selectedCosts}
                  contactPerson={quote.contact}
                  endDate={validTo}
                  startDate={date}
                  clientName={quote.client}
                  name={quote.name}
                  desc={quote.description}
                  quoteUniId={quote.quoteNumber}
                  />
              </Modal>
              <button type="submit">Issue</button>
              <button type="submit">Issue & Accept</button>
              <button type="submit" style={{background: "linear-gradient(to bottom, #bbbec2, #949a9e)", color:"#fff"}}  onClick={() => setDeleteQuoteOpen(true)}>Cancel</button>
              <Modal
                open={deleteQuoteOpen}
                onClose={onCloseModal}
                center
              >
                <h2>Are you sure to delete?</h2>
                <button onClick={deleteQuote}>
                  YES
                </button>
                <button onClick={onCloseModal}>NO</button>
              </Modal>
            </div>
          ) : (
            
            <div style={{display:"flex", justifyContent:"right"}}>
              <button type="submit" onClick={saveAsRevise}>Revise</button>
              <button type="submit" onClick={saveAsAccepted}>Accepted</button>
              <button type="submit" onClick={saveAsDeclined}>Declined</button>
            </div>
          ) }
          
      </div>
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
          width: 200px;
          vertical-align: text-top;
        }

        .viewCellmulti {
          width: 570px;
          padding-top: 7px;
          padding-bottom: 7px;
          word-wrap: break-word;
        }

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

export default quoteProfile