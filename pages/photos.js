/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { db } from '../src/config/firebase.config';

const photos = () => {
    const [jobs, setJobs] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        setLoading(true)
        const getJobs = async () => {
            const q = query(jobsCollectionRef);
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobs(res);
            setLoading(false);
        }
        getJobs();
    }, [])
    
  return (
    <div>
        {loading && <LoadingSpinner />}
        <h1>Photo Gallery</h1>
        <hr/>
        <div>
            <h2>From Job</h2>
        </div>
        <div className="imageGrid">
            {jobs?.map((job) => (
                job.images?.map((img) => (
                    <img src={img.url} style={{ width: "100%",height:"auto", margin: "10px" }} />
                ) )
              ))}
        </div>
        <div>
            <h2>From Clients</h2>
        </div>
        <div>
            <h2>From Employee</h2>
        </div>

        <style jsx>{`
            .imageGrid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                width: 100%;
                margin: 0 auto;
                grid-gap: 15px;
                padding: 20px 0;
            }

            .imageGrid img {
                border: 1px solid black;
                text-align: center;
                height: 240px;
            }
        `}</style>
    </div>
  )
}

export default photos