/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { db, storage } from '../../src/config/firebase.config'
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, query, orderBy, arrayUnion } from 'firebase/firestore'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import firebase from 'firebase/app';
import { getStorage, ref, storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import ImgMultipleUpload from '../../components/ImgMultipleUpload';


export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'jobs'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: { id: doc.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    const jobProps = docSnap.data();
    jobProps.id = id;
    return {
        props: { jobProps: JSON.stringify(jobProps) || null},
        revalidate: 10
    }
}


function jobProfile({jobProps}) {
    const job = JSON.parse(jobProps);
    
    const [jobs, setJobs] = useState([]);
    const [staff, setStaff] = useState([]);
    const [edit, isEdit] = useState(false);
    const [newClient, setNewClient] = useState("");
    const [user, setUser] = useState({});
    const [toggleState, setToggleState] = useState(1);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [imageName, setImageName] = useState("");
    const [hide, setHide] = useState("block");
    const [show, setShow] = useState("none");

    const staffCollectionRef = collection(db, "staff");

    const addPhoto = async () => {
        const id = job.id;
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
            images: arrayUnion({name: imageName, url: url})
        });
        window.location.reload(false);
    }

    useEffect(() => {
        const getStaff = async () => {
            const q = query(staffCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setStaff(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
          }
          getStaff();
    }, [])


    const editHandler = () => {
        isEdit(true)
    }

    const updateJob = async (id, name) => {
        const jobDoc = doc(db, "jobs", id);
        const newFields = { client: newClient };
        await updateDoc(jobDoc, newFields);
        window.location.reload(false)
    }

    const array2 = job.staff.map(s => s._key.path.segments[6])

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleChangeName = e => {
        setImageName(e.target.value)
    }

    const handleUpload = () => {
        if(image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then(url => {
            alert("Success!");
            setUrl(url);
            setHide("none");
            setShow("block");
          })
        })
    };

    

    console.log(job);
    return (
        <> 
            {edit ? (
                <div className='container'>
                            <label>Edit Name</label>
                            <div><input type="text" placeholder={job.client} onChange={(event) => {setNewClient(event.target.value)}} /></div>
                            <button type="submit" onClick={() => {updateJob(job.id, job.client)}}>Save</button>
                        </div>

                    ) : (
                        <div>
                            <div className='jobNameWrapper'>
                                <h4><span style={{color:"blue"}}>{job.jobNumber}</span> - {job.name}</h4>
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
                                        <div><a href={"tel:" + job.contact} className='contact'>{job.contact}<span style={{color:"blue"}}> Click to call</span></a></div>
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

                            <div className='blocTabs' style={{overflowX:"auto", marginTop:"20px"}}>
                                <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>Info</div>
                                <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>Photos</div>
                                <div className={toggleState === 3 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(3)}>Documents</div>
                            </div>

                            <div id="info" className={toggleState === 1 ? "content  activeContent" : "content"} style={{overflowX:"auto"}}>
                                <h4 style={{paddingBottom:"15px", paddingTop:"20px"}}>Description</h4>
                                <div style={{background: "#ffff", padding: "15px"}}>
                                    <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                                </div>
                                <hr />
                                <h4>Schedule  Information</h4>
                                <label>Start Date:</label>
                                <p>{new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}</p>

                                <label>Start Date:</label>
                                <p>{new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}</p>

                                <label>Priority:</label>
                                <p>{job.priority}</p> 

                                <label>Account Manager:</label>
                                <p>{job.accountManager}</p>

                                <label>Manager:</label>
                                <p>{job.manager}</p>

                                <label>Staff:</label>
                                {staff.filter(f => array2.includes(f.id)).map(f => (
                                    <li>{f.name}</li>
                                ))}

                                <hr />

                                <h4>Tasks</h4>
                            </div>
                            <div id="photos"  className={toggleState === 2 ? "content  activeContent" : "content"}>
                                <h4 style={{paddingBottom:"15px", paddingTop:"20px"}}>Image gallery</h4>
                                <ImgMultipleUpload url={url} hide={hide} imageName={imageName} image={image} handleChangeName={handleChangeName} handleChange={handleChange} handleUpload={handleUpload}  />
                                <input className="show" placeholder="Name..." value={imageName} onChange={handleChangeName} />
                                <input className="show" type="submit" value="submit" onClick={addPhoto}/>

                                <input type="hidden" value={url} onChange={(event) => {setUrl(event.target.value)}}  />
                                <hr />
                                <div className="container">
                                    {job.images ? job.images.map(img => (
                                        <img className="item" src={img.url} alt={img.name} width="200" height="200" />
                                    )) : (
                                        <h4 style={{ height:"20vh", whiteSpace:"nowrap"}}>No Images uploaded</h4>
                                    
                                    )
                                }
                                       
                                </div>
                            </div>
                            <div id="docs"  className={toggleState === 3 ? "content  activeContent" : "content"}>
                                <h5>Documents</h5>
                                <hr />
                                <center>List of documents</center>
                            </div>
                            
                        </div>
                    )}
                
                
        
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

                .blocTabs {
                    display: flex;
                }

                .tabs {
                    padding: 15px;
                    text-align: center;
                    width: 50%;
                    background: rgba(128, 128, 128, 0.075);
                    cursor: pointer;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.274);
                    box-sizing: content-box;
                    position: relative;
                    outline: none;
                }

                .tabs:not(:last-child){
                    border-right: 1px solid rgba(0, 0, 0, 0.274);
                }

                .activeTabs  {
                    background: white;
                    border-bottom: 1px solid transparent;
                }

                .activeTabs::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% + 2px);
                    height: 5px;
                    background: #E6EAEC;
                }

                .contentTabs {
                flex-grow : 1;
                }

                .content {
                    background: white;
                    width: 100%;
                    height: 100%;
                    display: none;
                }
                
                .activeContent {
                    display: block;
                }

                .container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    justify-content: center;
                    gap: 15px;
                }

                .item {
                    margin: 5px;
                }

                .hide {
                    display: ${hide}
                }

                .show {
                    display: ${show}
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