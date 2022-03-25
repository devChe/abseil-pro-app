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
                        <div style={{height:"100vh"}}>
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
                                            <div className="icon">
                                            <FontAwesomeIcon icon={faPhone} />
                                            </div>
                                            <div><a href={"tel:" + job.contact} className='contact'>{job.contact}</a></div>
                                        </div>
                                        <div className='info'>
                                            <div className="icon loc">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            </div>
                                            <div>
                                                <div className='location'>{job.siteAddress}</div>
                                                <a href={job.locationURL} target="_blank" className='goMap'>Get directions</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <h2 style={{textAlign:"center", paddingBottom:"15px", paddingTop:"15px"}}>Scope</h2>
                            <div>{job.description}</div>
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
                    height: 100%;
                    width: 100%;
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
                    text-shadow: 0 1px black;
                }

                .info {
                    display: flex;
                    align-items: baseline;
                    gap: 15px;
                }

                .icon {
                    font-size: 20px;
                    width: 20px;
                    text-shadow: 0 1px black;
                }

                .contact {
                    color: #ffff;
                    text-shadow: 0 1px black;
                }

                .location {
                    padding-bottom: 8px;
                    text-shadow: 0 1px black;
                }

                .goMap {
                    color: #fff;
                    border: 1px solid #ffff;
                    padding: 5px;
                    border-radius: 5px;
                    transition: .15s ease;
                    text-shadow: 0 1px black;
                }

                .goMap:hover {
                    color: black;
                    background: #ffff;
                }

                @media screen and (max-width: 990px) {

                    .jobNameWrapper {
                        justify-content: space-between;
                    }

                    .loc {
                        width: 31px;
                    }
                }

            `}</style>
        </>
    )
}

export default jobProfile