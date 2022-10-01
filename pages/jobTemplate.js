/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import JobTempData from '../components/JobTempData';

function jobTemplate() {
  const [jobTemp, setJobTemp] = useState([]);

    const jobTempCollectionRef = collection(db, "jobTemplates");
  

    useEffect(() => {
        const getJobTemp = async () => {
            const q = query(jobTempCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobTemp(res);
        }
        getJobTemp();
    }, [])

  return (
    <>
      <div style={{background:"#ffff",padding:"15px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1>Job Template</h1>
          <Link href="newJobTemplate"><button>+Add Job Template</button></Link>
        </div>
        <div className='tableWrapper'>
          <table>
            <tr>
              <th>Name</th>
              <th>Category</th>
            </tr>
            {jobTemp.map(temp => (
              <JobTempData temp={temp} />
            ))}
          </table>
        </div>
        
      </div>
    <style jsx>{`
      .tableWrapper {
        overflow-x: auto;
      }

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

      button:hover {
        border:1px solid red;
        box-shadow: 0 0 10px #719ECE;
        cursor: pointer;
      }
    `}</style>  
    </>
  )
}

export default jobTemplate;