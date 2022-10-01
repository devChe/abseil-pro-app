/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import JobTempData from '../components/JobTempData';
import JobCategoriesData from '../components/JobCategoriesData';

function jobCategories() {
  const [jobCategories, setJobCategories] = useState([]);

    const jobCategoriesCollectionRef = collection(db, "jobCategories");
  

    useEffect(() => {
        const getJobCategories = async () => {
            const q = query(jobCategoriesCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobCategories(res);
        }
        getJobCategories();
    }, [])

  return (
    <>
      <div style={{background:"#ffff",padding:"15px",height:"100vh"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1>Job Category</h1>
          <Link href="newJobCategory"><button>+Add Job Category</button></Link>
        </div>
        <div className='tableWrapper'>
          <table>
            <tr>
              <th>Name</th>
            </tr>
            {jobCategories && jobCategories.map(category => (
              <JobCategoriesData category={category} />
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

export default jobCategories