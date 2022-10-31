import React, { useState } from "react";
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
import { useRouter } from "next/router";

function EditQuoteTask({
  index,
  job,
  quoteTask,
  setIsEdit
}) {

    const [newName, setNewName] = useState(`${quoteTask.name}`);
    const [newTime, setNewTime] = useState(`${quoteTask.time}`);
    const [newBaseRate, setNewBaseRate] = useState(`${quoteTask.baseRate}`);
    const [newCost, setNewCost] = useState(`${quoteTask.cost}`);
    const [newBillableRate, setNewBillableRate] = useState(`${quoteTask.billableRate}`);
    const [newTotal, setNewTotal] = useState(`${quoteTask.total}`);
    const [newNote, setNewNote] = useState(`${quoteTask.note}`);


    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }
    console.log(router.asPath);

  // UPDATE QUOTE TASK

  const updateQuoteTask = async (id,index) => {
    const jobDoc = doc(db, "jobs", id);
    const newField = { 
      name: newName, 
      time: newTime, 
      baseRate: Number(newBaseRate),
      cost: Number(newCost),
      billableRate: Number(newBillableRate),
      total: Number(newTotal),
      note: newNote 
    }
    const newTasks  = [...job.quoteTasks ]
    newTasks[index] = newField;
    updateDoc(jobDoc, {
      quoteTasks: newTasks
    }).then(() => {
      refreshData();
      setIsEdit(false);
    } );
    // window.location.reload(false);
}

  return (
    <>
      <tr>
        <td style={{ whiteSpace: "nowrap", textAlign: "left" }}>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
        </td>
        <td><input type="text" value={newTime} onChange={e => setNewTime(e.target.value)}/></td>
        <td><input type="text" value={newBaseRate} onChange={e => setNewBaseRate(e.target.value)}/></td>
        <td><input type="text" value={newCost} onChange={e => setNewCost(e.target.value)}/></td>
        <td><input type="text" value={newBillableRate} onChange={e => setNewBillableRate(e.target.value)}/></td>
        <td><input type="text" value={newTotal} onChange={e => setNewTotal(e.target.value)}/></td>
        <td>
          <div className="btn" onClick={() => {updateQuoteTask(job.id,index)}}>Save</div>
          <div className="btn" onClick={() => setIsEdit(false)}>Cancel</div>
        </td>
        
      </tr>
      <div>
        <div style={{ textAlign: "left", width:"max-content" }}>
          <ReactQuill value={newNote} onChange={setNewNote} height="50%" />
        </div>
      </div>
      <style jsx>{`
          .btn {
            cursor: pointer;
          }
      `}</style>
    </>
  );
}

export default EditQuoteTask;
