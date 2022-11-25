/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../src/config/firebase.config';


export const JobContext = createContext();

function JobContextProvider({children}) {
    const [jobs, setJobs] = useState([]);

    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        const getJobs = async () => {
            const q = query(jobsCollectionRef, orderBy("startDate"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobs(res);
        }
        getJobs();
    }, [])

    const values = { jobs, setJobs }

    return (
        <JobContext.Provider value={values}>
            {children}
        </JobContext.Provider>
    )
}

export default JobContextProvider;