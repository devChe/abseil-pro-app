/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { db } from '../../src/config/firebase.config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import firebase from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


function jobProfile() {
    const [jobs, setJobs] = useState([]);
    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");
    
    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        const getJobs = async () => {
            const data = await getDocs(jobsCollectionRef);
            setJobs(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
            console.log(window.location.pathname)

        }
        getJobs();
    }, [])

    const updateJob = async (id, name) => {
        const jobDoc = doc(db, "jobs", id);
        const newFields = { name: newName };
        await updateDoc(jobDoc, newFields);
        window.location.reload(false)
    }

    return (
        <> 
            {jobs.map((job) => {
                return (
                    <>
                    {edit ? (
                        <div className='container'>
                            <label>Edit Name</label>
                            <div><input type="text" placeholder={job.name} onChange={(event) => {setNewName(event.target.value)}} /></div>
                            <button type="submit" onClick={() => {updateJob(job.id, job.name)}}>Save</button>
                        </div>

                    ) : (
                        <div>
                            <div className='jobNameWrapper'>
                                <h1>{job.name}</h1>
                                <div className='editBtn'>
                                    <div>Edit</div>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => isEdit("true")} className='editIcon' />
                                </div>
                            </div>
                            <div className="heroImage">
                                    <div className='darken'></div>
                                    <img src={job.image} className='jobImage' />
                                    <div className='clientWrapper'>
                                        <div className='clientName'>{job.client}</div>
                                        <div className='info'>
                                            <FontAwesomeIcon icon={faPhone} className="icon" />
                                            <div><a href={"tel:" + job.contact}>{job.contact}</a></div>
                                        </div>
                                        <div className='info'>
                                            <FontAwesomeIcon icon={faLocationDot} className="icon" />
                                            <div><a href={job.locationURL} target="_blank">{job.siteAddress}</a></div>
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                    )}
                    
                        
                </>
                )
            })}
            <style jsx>{`
                .jobNameWrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #051E34;
                }

                .editBtn {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    font-size: 23px;
                }

                .editIcon {
                    font-size: 25px;
                }

                .heroImage {
                    height: 300px;
                    overflow: hidden;
                    position: relative;
                }

                .jobImage {
                    object-fit: cover;
                    object-position: center;
                }

                .darken {
                    background: black;
                    position: absolute;
                    z-index: 999;
                    width: 100%;
                    height: 300px;
                    opacity: 0.3;
                }

                .clientWrapper {
                    position: absolute;
                    z-index: 9999;
                    top: 0;
                    color: #ffff;
                    padding: 15px;
                }

                .clientName {
                    font-size: 40px;
                }

                .info {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                }

                .icon {
                    font-size: 20px;
                    width: 20px;
                }

                @media screen and (max-width: 990px) {
                    .jobNameWrapper {
                        justify-content: space-between;
                    }
                }

            `}</style>
        </>
    )
}

export default jobProfile