/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import React, {useState, useEffect, useRef} from 'react';
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
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ExternalQuoteToPrint from './ExternalQuoteToPrint';
import EditQuoteTask from './EditQuoteTask';
import { useRouter } from 'next/router';


function ExternalQuote({job, closeModal}) {
    const [openModal, setOpenModal] = useState(false);
    const [startDate, setStartDate] = useState(`${new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}`);
    const [dueDate, setDueDate] = useState(`${new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}`);
    const [clientName, setClientName] = useState(`${job.client}`);
    const [contact, setContact] = useState(`${job.contact}`);
    const [desc, setDesc] = useState(`${job.description}`);
    const [siteAddress, setSiteAddress] = useState(`${job.site_address}`)
    const [gst, setGst] = useState(Number(377.40));
    const [taskModal, setTaskModal] = useState(false);
    const [quoteTaskName, setQuoteTaskName] = useState("");
    const [quoteTime, setQuoteTime] = useState("--:--");
    const [quoteBaseRate, setQuoteBaseRate] = useState("");
    const [quoteCost, setQuoteCost] = useState("");
    const [quoteBillableRate, setQuoteBillableRate] = useState("");
    const [quoteTotalRate, setQuoteTotalRate] = useState("");
    const [quoteNote, setQuoteNote] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState("");
    const [resize, setResize] = useState("50%");
    const [taskNameRadio, setTaskNameRadio] = useState("");
    const [selectedTasks, setSelectedTasks] = useState([]);

    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath.replace("#myModal", ""));
    }

    const checkBoxTask=useRef();

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
    }

    const handleSelecTask = (e, id) => {
      const taskSelected = job.quoteTasks.find(task => task.id === id);
      console.log(e.target.checked)
      if(e.target.checked){
        setSelectedTasks(prev => [...prev, taskSelected]);
      }else {
        setSelectedTasks(prev => prev.filter(task => task.id !== id))
      }
    }

    console.log(selectedTasks);

    const editHandler = (id) => {
        setIsEdit(id);
    }

    const tasksCollectionRef = collection(db, "tasks");

    useEffect(() => {
      const getTasks = async () => {
        const q = query(tasksCollectionRef, orderBy("name"));
        const data = await getDocs(q);
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTasks(res);
      };
      getTasks();
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
        cost: Number(quoteCost),
        billableRate: Number(quoteBillableRate),
        total: Number(quoteTotalRate),
        note: quoteNote
      }),
    }).then(() => {
      refreshData();
      setTaskModal(false);
    });


    // window.location.reload(false);

  }

  

  return (
    <div className='externalQuoteWrapper' style={{ position: "relative" }}>
      {!openModal && (
        <div>
          <h5>Quote Information</h5>
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
            <div style={{margin:"15px 0"}}>
              <ReactQuill value={desc} onChange={setDesc} height="50%" />
            </div>
          </div>
          <div>
            <label>GST:</label>
            <input
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
          </div>
          {/* <div>
                <label>Task Name</label>
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div> 
            <div>
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>  */}
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <label>Task</label>
            <button type="submit" onClick={(e) => setTaskModal(true)}>
              <a href="#myModal">Add Task</a>
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
                    <select value={quoteTaskName} onChange={(e) => setQuoteTaskName(e.target.value)}>
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
                    <label for="taskCost">Cost:</label>
                    <br />
                    <input
                      type="number"
                      value={quoteCost}
                      onChange={(e) => setQuoteCost(e.target.value)}
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
                    <label for="taskTotal">Total:</label>
                    <br />
                    <input
                      type="number"
                      value={quoteTotalRate}
                      onChange={(e) => setQuoteTotalRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label for="taskNote">Note:</label>
                    <br />
                    <div style={{margin:"15px 0"}}>
                      <ReactQuill value={quoteNote} onChange={setQuoteNote} height="50%" />
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
                <th>#</th>
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
                    {isEdit === quoteTask.name ? (
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
                                onChange={(e) => handleSelecTask(e, quoteTask.id)}
                              />
                          </td>
                          <td
                            key={quoteTask.name}
                            style={{ whiteSpace: "nowrap", textAlign: "left" }}
                          >
                            <strong>{quoteTask.name}</strong>
                          </td>
                          <td key={quoteTask.name}>{quoteTask.time}</td>
                          <td key={quoteTask.name}>{quoteTask.baseRate}</td>
                          <td key={quoteTask.name}>{quoteTask.cost}</td>
                          <td key={quoteTask.name}>{quoteTask.billableRate}</td>
                          <td key={quoteTask.name}>{quoteTask.total}</td>
                          <td><a style={{cursor:"pointer"}} onClick={() => {editHandler(quoteTask.name)}}>Edit</a></td>
                        </tr>
                        <tr style={{ textAlign:"left",borderBottom:"1px solid #ececec",padding:"15px"}} >
                          <td></td>
                          <td style={{ textAlign: "left", padding:"15px 15px 15px 0"}}>
                            <div dangerouslySetInnerHTML={{ __html: quoteTask.note }}></div>
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                ))}
            </table>
          </div>

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
              startDate={startDate}
              dueDate={dueDate}
              clientName={clientName}
              siteAddress={siteAddress}
              taskNameRadio={taskNameRadio}
              quoteTaskName={quoteTaskName}
              contact={contact}
              desc={desc}
              gst={gst}
            />
          </div>
        </div>
      )}

      <style jsx>{`
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
          text-align: right;
          padding: 8px;
        }

        td {
          text-align: right;
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
          width: 100vw;
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

        @media screen and (max-width: 990px) {
          .externalQuoteWrapper {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ExternalQuote