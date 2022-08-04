/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from '../components/LoadingSpinner';

function newTasks() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [baseRate, setBaseRate] = useState(0);
    const [billableRate, setBillableRate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const tasksCollectionRef = collection(db, "tasks");

    const createTask = async () => {
        setIsLoading(true);
    
    await addDoc(tasksCollectionRef, {
      name: name,
      description: desc,
      baseRate: Number(baseRate),
      billableRate: Number(billableRate),
     }).then((respose) => {
        setIsLoading(false)
     })
     .catch(() => {
        setErrorMessage("Unable to submit");
        setIsLoading(false);
     });

        window.location.pathname="/newTasks";

    }


  return (
    <>
        <div className='wrapper'>
            <h1>Task Form</h1>
            <label>Task Name</label>
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
            </div>
            
            <label>Description</label>
            <div>
                <ReactQuill value={desc} onChange={setDesc} />
            </div>
            
            <label>Base rate</label>
            <div>
                <input type="text" value={baseRate} onChange={(e) => setBaseRate(e.target.value)}  />
            </div>
            
            <label>Billable Rate</label>
            <div>
                <input type="text" value={billableRate} onChange={(e) => setBillableRate(e.target.value)}  />
            </div>
            {isLoading && <LoadingSpinner/>}
            <div className='buttonWrapper'><button type='submit' onClick={createTask} disabled={isLoading}>Submit Template</button></div>
        </div>
        <style jsx>{`
            .wrapper {
                height: 100vh;
                background: #ffff;
                padding: 15px;
            }

            label {
                padding-top: 15px;
            }

            input {
                width: 100%;
                padding: 5px;
                
            }

            input:focus {
                outline: none !important;
                border:1px solid red;
                box-shadow: 0 0 10px #719ECE;
            }

            .buttonWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .buttonWrapper button:hover {
                border:1px solid red;
                box-shadow: 0 0 10px #719ECE;
            }
        `}</style>
    </>
  )
}

export default newTasks