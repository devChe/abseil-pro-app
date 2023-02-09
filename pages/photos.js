/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { auth, db } from '../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import dynamic from 'next/dynamic';
const PhotoEditor = dynamic(() => import("../components/PhotoEditor"), { ssr: false });


const photos = () => {
    const [jobs, setJobs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
        setUser(currentUser);
    })


    function openEditor(id){
        setOpen(id)
    }

    function onCloseModal() {
        setOpen(false);
    }
    

    const jobsCollectionRef = collection(db, "jobs");
    const employeesCollectionRef = collection(db, "employees")

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

    useEffect(() => {
        setLoading(true)
        const getEmployees = async () => {
            const q = query(employeesCollectionRef);
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setEmployees(res);
            setLoading(false);
        }
        getEmployees();
    }, [])

    
    const photosByMonth = {};

      jobs?.map((job) => {
        job?.photos?.forEach(photo => {
            const convertedDate = dateFormat(new Date(photo.date.seconds * 1000), "mm/dd/yyyy");
            
            if(photosByMonth[convertedDate]){
                photosByMonth[convertedDate].push(photo);}
            else{
                photosByMonth[convertedDate] = [photo]}
        });
      })

      console.log(photosByMonth)
    
  return (
    <div>
        {loading && <LoadingSpinner />}
        <h1>Photo Feed</h1>
        <hr/>
        
        <div>
            {Object.keys(photosByMonth).sort().reverse().map(month => {
                return (
                    <>
                        <h1>{dateFormat(month, "fullDate")}</h1>
                        <div className='imageGrid'>
                            {photosByMonth[month].map((photo) => {
                                    return (
                                      <>
                                        <div className="column">
                                          <div className="content">
                                            <img
                                              onClick={() => openEditor(photo.id)}
                                              src={photo.url}
                                              style={{
                                                width: "100%",
                                                height: "150px",
                                                borderRadius: "8px",
                                              }}
                                            />
                                            <h3>{photo.jobName}</h3>
                                            <Link href="/clientProfile/[id]" as={`clientProfile/${photo.clientID}`}><h4 className="a" style={{color:"blueviolet"}}>{photo.client}</h4></Link>
                                            <Link href="/staffProfile/[id]" as={`staffProfile/${employees?.filter((employee) => employee.num === photo.userNum)?.map((res) => res.id)}`}><p className='b'>{photo.name[0]}</p></Link>
                                            <p style={{color:"steelblue"}}>{dateFormat(new Date(photo.date.seconds * 1000), "h:MM TT")}</p>
                                          </div>
                                        </div>
                                        <Modal open={open === photo.id} onClose={onCloseModal} style={{width:"100%"}} center>
                                            <h2>Upload by: {photo.name}</h2>
                                            <PhotoEditor photo={photo} />
                                            {/* <img
                                              src={photo.url}
                                              style={{
                                                width: "100%",
                                                borderRadius: "8px",
                                              }}
                                            /> */}

                                        </Modal>
                                      </>
                                    );
                                }
                            )}
                        </div>
                    </>
                )
            })}

            {/* {jobs?.map((job) => (
                job.photos?.map((img) => (
                    <div className='column'>
                        <div className="content">
                            <img src={img.url} style={{width:"100%", height: "150px",borderRadius:"8px"}}  />
                            <h4>Mountains</h4>
                            <p>Lorem ipsum dolor..</p>
                        </div>
                    </div>
                ) )
              ))} */}
        </div>
        

        <style jsx>{`
            .a:hover {
                cursor: pointer;
                color: red !important;
            }

            .b:hover {
                cursor: pointer;
                text-decoration: underline;
            }

            p {
                margin: 0;
            }

            h3, h4, h5 {
                margin: 0;
            }

            .imageGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
            }

            .content {
                background-color: white;
                padding: 10px;
            }

            .column {
                float: left;
            }


        `}</style>
    </div>
  )
}

export default photos