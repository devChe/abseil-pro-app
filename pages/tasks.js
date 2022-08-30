/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import TaskData from '../components/TaskData';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'

function tasks() {
  const [tasks, setTasks] = useState([]);

  const data = tasks.map(task => (task.name ));

    console.log(data);

    const tasksCollectionRef = collection(db, "tasks");
  

    useEffect(() => {
        const getTasks = async () => {
            const q = query(tasksCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setTasks(res);
        }
        getTasks();
    }, [])

  return (
    <>
    <div style={{background:"#ffff",padding:"15px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h1>Task</h1>
        <Link href="newTasks"><button>+New Task Template</button></Link>
      </div>
      
      <table>
        <tr>
          <th>Task Name</th>
          <th>Base Rate</th>
          <th>Billable Rate</th>
        </tr>
        {tasks.map(task => (
          <TaskData task={task} />
        ))}
        
      </table>
    </div>
    <style jsx>{`
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }

      button:hover {
        border:1px solid red;
        box-shadow: 0 0 10px #719ECE;
        cursor: pointer;
      }
    `}</style>  
    </>
  )
}

export default tasks