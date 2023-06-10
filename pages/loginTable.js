/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../src/config/firebase.config';
import WeeklyTable from '../components/WeeklyTable';





const LoginTable = () => {
  const [jobs, setJobs] = useState([]);
  const [staff, setStaff] = useState([]);

  const jobsCollectionRef = collection(db, "jobs");

  const staffCollectionRef = collection(db, "employees");

  useEffect(() => {
    const getJobs = async () => {
        const q = query(jobsCollectionRef);
        const data = await getDocs(q);
        const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
        setJobs(res);
    }
    getJobs();
 }, [])

 console.log(jobs)

 useEffect(() => {
    const getStaff = async () => {
        const q = query(staffCollectionRef);
        const data = await getDocs(q);
        const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
        setStaff(res);
    }
    getStaff();
 }, [])

 


  return (
    <div>
      <h1>Time Sheet</h1>
      <WeeklyTable staff={staff} jobs={jobs} />
      <style jsx>{`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td {
          text-align: center;
        }

        th {
                border: 1px solid #dddddd;
                padding: 8px;
                white-space: nowrap;
                transition: .15s ease;
                
            }

            tr:hover {
                background-color: lightgrey;
                color: white;
                cursor: pointer;
            }
            
            tr:active {
                background: darkgrey;
            }

      `}</style>
    </div>
  );
};

export default LoginTable;
