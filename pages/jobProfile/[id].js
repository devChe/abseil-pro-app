/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { db, auth } from '../../src/config/firebase.config'
import { collection, doc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import firebase from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


function jobProfile() {
    const [jobs, setJobs] = useState([]);
    const [staff, setStaff] = useState([]);
    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    
    const jobsCollectionRef = collection(db, "jobs");

    const staffCollectionRef = collection(db, "staff");

    useEffect(() => {
        const getJobs = async () => {
            const data = await getDocs(jobsCollectionRef);
            setJobs(data.docs.filter((doc) => doc.id === window.location.pathname.substring(12)).map((doc) => ({...doc.data(), id: doc.id })))
           
        }
        getJobs();
    }, [])

    useEffect(() => {
        const getStaff = async () => {
            const q = query(staffCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setStaff(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
          }
          getStaff();
    }, [])

    const updateJob = async (id, name) => {
        const jobDoc = doc(db, "jobs", id);
        const newFields = { name: newName };
        await updateDoc(jobDoc, newFields);
        window.location.reload(false)
    }

    

    // const array2 = jobs.map(ass => (
    //     ass.staff.map(user => (
    //         user.id
    //     ))
    // ))

    const array1 = staff.map(team => (
        team.id
    ));

    const array2 = jobs.map(men => men.staff.map(ass => ass.id) );


    // const values = array1.filter(value => array2.includes(value))

    

    // const users = staff.filter((staffA)=> {
    //     return !staffId.find((staffB)=> {
    //         return staffA.id === staffB.id;
    //     })
    //   })

    return (
        <div> 
            {jobs.map((job) => {
                return (
                <div>
                    {edit ? (
                        <div className='container'>
                            <label>Edit Name</label>
                            <div><input type="text" placeholder={job.name} onChange={(event) => {setNewName(event.target.value)}} /></div>
                            <button type="submit" onClick={() => {updateJob(job.id, job.name)}}>Save</button>
                        </div>

                    ) : (
                        <div>
                            <div className='jobNameWrapper'>
                                <h4>{job.jobNumber} - {job.name}</h4>
                                <div className='editBtn'>
                                    <div>Edit</div>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => isEdit("true")} className='editIcon' />
                                </div>
                            </div>
                            <div className="heroImage">
                                <div className='darken'></div>
                                <img src={job.imageUrl} className='jobImage' />
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
                            <h4 style={{paddingBottom:"15px", paddingTop:"20px"}}>Description</h4>
                            <div style={{background: "#ffff", padding: "15px"}}>
                                <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                            </div>
                            <hr />
                            <h4>Schedule  Information</h4>
                            <label>Start Date:</label>
                            <p>{job.startDate.toDate().toDateString()}</p>

                            <label>Start Date:</label>
                            <p>{job.dueDate.toDate().toDateString()}</p>

                            <label>Priority:</label>
                            <p>{job.priority}</p>

                            <label>Account Manager:</label>
                            <p>{job.accountManager}</p>

                            <label>Manager:</label>
                            <p>{job.manager}</p>

                            <label>Staff:</label>
                            {staff.filter(f => array2[0].map(e => e ).includes(f.id)).map(f => (
                                <li>{f.name}</li>
                            ))}

                            <hr />

                            <h4>Tasks</h4>
                            
                        </div>
                    )}
                </div>
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
                    opacity: 0.5;
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
                    width: 60%;
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
        </div>
    )
}

export default jobProfile