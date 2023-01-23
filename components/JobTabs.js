/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../src/config/firebase.config';
import { collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import ClientData from './ClientData';
import JobData from './JobData';
import { onAuthStateChanged } from 'firebase/auth';

function JobTabs() {
    const [toggleState, setToggleState] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [staff, setStaff] = useState([]);
    const [user, setUser] = useState({});
    //THE VALUE OF THE SEARCH FIELD
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    //THE SEARCH RESULT
    const [searchResult, setSearchResult] = useState([])

    const jobsCollectionRef = collection(db, "jobs");

    const staffCollectionRef = collection(db, "staff");

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    useEffect(() => {
        const getJobs = async () => {
            const q = query(jobsCollectionRef, orderBy("jobNumber"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobs(res);
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

    // const array2 = jobs.map(men => men.staff.map(ass => ass.id) );
    // const arrayStaff = jobs.map(ass => ass.staff.map(men => men.id)); // [Array(3), Array(3), Array(3)]

    // const userID = `${user.uid}`;

    // const play = jobs.map(job => job.staff.map(e => e.id));

    // console.log(arrayStaff);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const admin = staff.map(user => user.role);


    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = clients.filter(client => {
            return client.name.toLowerCase().includes(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
          });
          setSearchResult(results);
        } else {
          setSearchResult(clients);
          // If the text field is empty, show all users
        }
    
        setName(keyword);
      };

    return (
        <>
            <div className='row'>
                <input className="ten columns" type="text" placeholder="Search name here..." value={name}  onChange={filter} />
                <Link href={'/newJob'}><button className='button-primary two columns'>+ New</button></Link>
            </div>
            <div className='blocTabs' style={{overflowX:"auto"}}>
                <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>All</div>
                <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>My</div>
                <div className={toggleState === 3 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(3)}>Managed By</div>
                <div className={toggleState === 4 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(4)}>Important Dates</div>
                <div className={toggleState === 5 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(5)}>Staff Allocation</div>
                <div className={toggleState === 6 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(6)}>Archive</div>
                <div className={toggleState === 7 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(7)}>Recurring</div>
                <div className='tabs'></div>
            </div>
            <div id="all" className={toggleState === 1 ? "content  activeContent" : "content"} style={{overflowX:"auto"}}>
                <h5>All Jobs</h5>
                <div>
                    <table>
                        <tr>
                            <th>Job No.</th>
                            <th>Client</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>Start</th>
                            <th>Due</th>
                            <th>Action</th>
                        </tr>
                        
                        {/* {jobs.filter(job => {
                            let isAssigned = false;
                            job.staff.forEach(s => {
                                if(s._key.path.segments[6]  === user.uid) isAssigned = true;
                            })
                            return isAssigned
                            }).map(job => 
                            <JobData job={job} />
                        )} */}

                        {jobs.map(job => (
                            <JobData job={job} />
                        ))}

                        
                        {/* {searchResult && searchResult.length > 0 ? (
                            searchResult.map((client) => (
                                <ClientData client={client} />
                            ))
                        ) : (
                            clients.map((client) => (
                                <ClientData client={client} />
                            ))
                        )} */}
                    </table>
                </div>
            </div>
            <div id="my"  className={toggleState === 2 ? "content  activeContent" : "content"}>
                <h5>MY</h5>
                <hr />
                <center>List of my</center>
            </div>
            <div id="managedBy"  className={toggleState === 3 ? "content  activeContent" : "content"}>
                <h5>MY MANAGED BY</h5>
                <hr />
                <center>List of managed by</center>
            </div>
            <div id="importantDates"  className={toggleState === 4 ? "content  activeContent" : "content"}>
                <h5>IMPORTANT DATES</h5>
                <hr />
                <center>List of Important Dates</center>
            </div>
            <div id="staffAllocation"  className={toggleState === 5 ? "content  activeContent" : "content"}>
                <h5>STAFF ALLOCATION</h5>
                <hr />
                <center>List of Staff Allocation</center>
            </div>
            <div id="archive"  className={toggleState === 6 ? "content  activeContent" : "content"}>
                <h5>ARCHIVE</h5>
                <hr />
                <center>List of Archives</center>
            </div>
            <div id="recurring"  className={toggleState === 7 ? "content  activeContent" : "content"}>
                <h5>RECURRING</h5>
                <hr />
                <center>recurring content</center>
            </div>
            <style jsx>{`
            *, ::before, ::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                background: #fff;
            }

            .container {
                display: flex;
                flex-direction: column;
                position: relative;
                background: #f1f1f1;
                margin: 50px auto 50px;
                word-break: break-all;
                border: 1px solid rgba(0, 0, 0, 0.274);
            }

        
            h5 {
                padding: 15px;
            }

            .row {
                padding: 15px 0;
                display: flex;
                gap: 15px;
            }

            .blocTabs {
                display: flex;
            }

            .tabs {
                padding: 15px;
                text-align: center;
                width: 50%;
                background: linear-gradient(#ffffff, #f5f7f8);
                cursor: pointer;
                border-bottom: 1px solid rgba(0, 0, 0, 0.274);
                box-sizing: content-box;
                position: relative;
                outline: none;
                white-space: nowrap;
            }

            .tabs:not(:last-child){
                border-right: 1px solid rgba(0, 0, 0, 0.274);
            }

            .activeTabs  {
                background: white;
                border-bottom: 1px solid transparent;
                white-space: nowrap;
            }

            .activeTabs::before {
                content: "";
                display: block;
                position: absolute;
                top: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(100% + 2px);
                height: 10px;
                background: #E6EAEC;
            }

            button {
                border: none;
            }
            .contentTabs {
                flex-grow : 1;
            }
            .content {
                background: white;
                width: 100%;
                height: 100vh;
                display: none;
            }
            
            .activeContent {
                display: block;
            }

            .tableWrapper {
                overflow-x: auto;
            }

            table {
                border-collapse: collapse;
                border-spacing: 0;
                width: 100%;
                margin: 0 0 50px;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
                white-space: nowrap;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }

            .isMobile {
                display: none;
            }

            @media screen and (min-width: 991px) {
                
            }

            @media screen and (max-width: 990px) {

                .isMobile {
                    display: block;
                }

                .container {
                    width: auto;
                }

                .row {
                    padding: 20px 15px;
                }

                .button-primary {
                    width: fit-content;
                    padding: 5px;
                }

                .tabs {
                    width: 50%;
                }
            }
            `}</style>
        </>
    )
}

export default JobTabs