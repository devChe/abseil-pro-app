/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, docs, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../src/config/firebase.config';


const print = () => {
    const [job, setJob] = useState({});

    const router = useRouter();
  
    // const refreshData = () => {
    //   router.replace(router.asPath.replace("#myModal", ""));
    // };
  
    const { number } = router.query;

    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        const getJob = async () => {
          const url = window.location.href;
          const lastSegment = url.split("/").pop();
          const q = query(jobsCollectionRef, where("number", "==", Number(lastSegment)));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setJob(res[0]);
    
        };
        getJob();
      }, []);
    
  return (
    <div>
        
    </div>
  )
}

export default print