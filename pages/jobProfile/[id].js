/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { db, storage } from '../../src/config/firebase.config'
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, update, query, orderBy, arrayUnion, arrayRemove } from 'firebase/firestore'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import firebase from 'firebase/app';
import { getStorage, ref, storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPhone, faLocationDot, faPenToSquare, faClose } from '@fortawesome/free-solid-svg-icons'
import ImgMultipleUpload from '../../components/ImgMultipleUpload';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import LoadingSpinner from '../../components/LoadingSpinner';

require('react-datepicker/dist/react-datepicker.css')


export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'jobs'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: { id: doc.id.toString() }
        }
    })
    return {
        paths,
        fallback: true
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
        revalidate: 1
    }
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '99999',
      background: '#ffff',
      width: '100vw',
      height: '100vh'
    },
  };


function jobProfile({jobProps}) {
    const router = useRouter();

    const tasksCollectionRef = collection(db, "task");

    const staffCollectionRef = collection(db, "staff");

    //so the data will go first to the fallback while loading is not done
    if(router.isFallback)
        return <div>...Loading</div>

    const job = JSON.parse(jobProps);
    
    const [jobs, setJobs] = useState([]);
    const [staff, setStaff] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [edit, isEdit] = useState(false);
    const [newClient, setNewClient] = useState("");
    const [user, setUser] = useState({});
    const [toggleState, setToggleState] = useState(1);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [imageName, setImageName] = useState("");
    const [hide, setHide] = useState("block");
    const [show, setShow] = useState("none");
    const [modalIsOpen, setIsOpen] = useState("");
    const [modalIsOpenJSEA, setIsOpenJSEA] = useState(false);
    const [modalIsOpenDPR, setIsOpenDPR] = useState(false);
    const [modalIsOpenTTR, setIsOpenTTR] = useState(false);
    const [modalIsOpenRB, setIsOpenRB] = useState(false);
    const [modalIsOpenIR, setIsOpenIR] = useState(false);
    const [modalIsOpenST, setIsOpenST] = useState(false);
    const [modalIsOpenHSIF, setIsOpenHSIF] = useState(false);
    const [modalIsOpenExQuote, setIsOpenExQuote] = useState(false);
    const [modalIsOpenInQuote, setIsOpenInQuote] = useState(false);
    const [imgNewId, setImgNewId] = useState("");
    const [newTaskName, setNewTaskName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [est, setEst] = useState(0);
    const [actual, setActual] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [taskId, setTaskId] = useState("");
    const [isLoading, setIsLoading] = useState("");

  let subtitle;


  function openModal(id) {
    setIsOpen(id);
  }
  

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setIsOpenJSEA(false);
    setIsOpenDPR(false);
    setIsOpenTTR(false);
    setIsOpenRB(false);
    setIsOpenIR(false);
    setIsOpenST(false);
    setIsOpenHSIF(false);
    setIsOpenExQuote(false);
    setIsOpenInQuote(false);
  }

    //   UNIQUE ID

  const uniId = () => {
    const d = new Date()
    const day = d.getDate().toString()
    const month = d.getMonth().toString()
    const yr = d.getFullYear().toString()
    const hr = d.getHours().toString()
    const min = d.getMinutes().toString()
    const sec = d.getSeconds().toString()
    const formattedDate = month + day + yr + hr + min + sec
    setImgNewId(formattedDate);
    setTaskId(formattedDate);
  }

  useEffect(() => {
    setImgNewId(uniId);
  }, [])

  useEffect(() => {
    setTaskId(uniId);
  }, [])


    

    // GET TASKS COLLECTION 

    useEffect(() => {
        const getTasks = async () => {
            const q = query(tasksCollectionRef, orderBy("startDate"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setTasks(res);
        }
        getTasks();
    }, [])

    // GET STAFF COLLECTION

    useEffect(() => {
        const getStaff = async () => {
            const q = query(staffCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setStaff(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
          }
          getStaff();
    }, [])

    // ADD PHOTO IN AN ARRAY OF IMAGES

    const addPhoto = async () => {
        const id = job.id;
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
            images: arrayUnion({id: "IMG:" + imgNewId, name: imageName, url: url})
        });
        window.location.reload(false);
    }


    const deletePhoto = async (deleteId) => {
        const id = job.id;
         //deleteId is the id from the post you want to delete
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
             images: job.images.filter(image => image.id !== deleteId )
         }).then(() => {
            setIsLoading(deleteId);
          })
        .catch(function(error) {
            console.error("Error removing document: ", error);
            setIsLoading(false);
        });

        window.location.reload(false)
    }

    // ADD TASK IN AN ARRAY OF TASKS

    async function addTask() {
        const id = job.id;
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
            tasks: arrayUnion({
                id: "TSK:" + taskId,
                name: newTaskName,
                startDate: startDate,
                dueDate: endDate,
                estimated: est,
                actual: actual,
                remaining: remaining
            })
        });
        window.location.reload(false);
    }

    // EDIT JOB FORM FUNCTION

    const editHandler = () => {
        isEdit(true)
    }

    // EDIT AND UPDATE JOB FUNCTION

    const updateJob = async (id, name) => {
        const jobDoc = doc(db, "jobs", id);
        const newFields = { client: newClient };
        await updateDoc(jobDoc, newFields);
        window.location.reload(false)
    }

    // GET THE IDS OF STAFF

    const array2 = job.staff.map(s => s._key.path.segments[6])

    // TOGGLE TAB

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

    const handleTaskChange = (e) => {
        console.log(e.target.value);
        const selectedTask = tasks.find(task => task.name === e.target.value);
        setNewDesc(selectedTask.description);
        setNewTaskName(selectedTask.name);
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

    return (
        <> 
            {edit ? (
                <div className='container'>
                            <label>Edit Name</label>
                            <div><input type="text" placeholder={job.client} onChange={(event) => {setNewClient(event.target.value)}} /></div>
                            <button type="submit" onClick={() => {updateJob(job.id, job.client)}}>Save</button>
                        </div>

                    ) : (
                        <div className='wrapper'>
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
                                <div style={{background: "#ffff", padding: "15px", overflow: "scroll",height: "300px",border: "1px solid #ecec"}}>
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
                                <button onClick={() => openModal(job.id)}>+ New Task</button>
                                <Modal
                                isOpen={modalIsOpen === job.id}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                >
                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>TASK FORM</h2>
                                    <button className='modalBtn' onClick={closeModal}>close</button>
                                    <label>Template</label>
                                    <select value={newTaskName} onChange={handleTaskChange}>
                                        <option>Choose Template...</option>
                                        {tasks.map(task => 
                                        <option key={task.id} value={task.name}>{task.name}</option>
                                        )}
                                    </select>
                                    <label>Description</label>
                                    <ReactQuill value={newDesc} onChange={setNewDesc} />
                                    <div className='row'>
                                        <div className='startDate six columns'>
                                        <label>Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={date => setStartDate(date)}
                                            className="six columns"
                                            dateFormat={'dd/MM/yyyy'}
                                            isClearable
                                            placeholderText="I have been cleared!"
                                        />
                                        </div>
                                        <div className='dueDate six columns'>
                                        <label>Due Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            onChange={date => setEndDate(date)}
                                            className="six columns"
                                            dateFormat={'dd/MM/yyyy'}
                                            isClearable
                                            placeholderText="I have been cleared!"
                                        />
                                        </div>
                                    </div>
                                    <label>Estimated</label>
                                    <input type="number" value={est} onChange={(event) => {setEst(event.target.value)}}  />
                                    <label>Actual</label>
                                    <input type="number" value={actual} onChange={(event) => {setActual(event.target.value)}}  />
                                    <label>Remaining</label>
                                    <input type="number" value={remaining} onChange={(event) => {setRemaining(event.target.value)}}  />
                                    <input type="submit" value="submit" onClick={addTask}/>

                                </Modal>
                                <div className='tableWrapper'>
                                    <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Start</th>
                                            <th>Due</th>
                                            <th>Estimated</th>
                                            <th>Actual</th>
                                            <th>Remaining</th>
                                        </tr>
                                        {job.tasks ? job.tasks.map(task => (
                                            <tr>
                                                <td>{task.name}</td>
                                                <td>{new Date(task.startDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                                                <td>{new Date(task.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td>
                                                <td>{task.estimated}</td>
                                                <td>{task.actual}</td>
                                                <td>{task.remaining}</td>
                                            </tr>
                                        )) : (
                                            <di>UPLOAD TASKS</di>
                                        )}
                                        
                                    </table>
                                </div>

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
                                        <div className='imgWrapper'>
                                            <img key={img.id} className="item" src={img.url} alt={img.name} onClick={() => openModal(img.id)} />
                                            {isLoading === img.id ? <LoadingSpinner  /> : ""}
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => deletePhoto(img.id)} disabled={isLoading} width="35" className='trashIcon' />
                                            <div className='modal'>
                                                <Modal
                                                    isOpen={modalIsOpen === img.id}
                                                    onAfterOpen={afterOpenModal}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal"
                                                >
                                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{img.name}</h2>
                                                    <button className='modalBtn' onClick={closeModal}>close</button>
                                                    <div className='modalPicture'>
                                                        <img src={img.url} alt={img.name} width="100%" height="390" />
                                                    </div>
                                                    
                                                </Modal>
                                            </div>
                                        </div>
                                    )) : (
                                        <h4 style={{ height:"20vh", whiteSpace:"nowrap"}}>No Images uploaded</h4>
                                    
                                    )
                                }
                                       
                                </div>
                            </div>
                            <div id="docs"  className={toggleState === 3 ? "content  activeContent" : "content"}>
                                <h5>Documents</h5>
                                <hr />
                                <div>
                                    <div><h3>Job Forms</h3></div>

                                    <div onClick={() => setIsOpenJSEA(true)} >JSEA, SWMS, Rescue Plan</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenJSEA}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>JSEA, SWMS, Rescue Plan</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenDPR(true)}>Daily Progress Report</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenDPR}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Daily Progress Report</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenTTR(true)}>Toolbox Talk Record</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenTTR}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Toolbox Talk Record</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenRB(true)}>Resident Balconies</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenRB}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Resident Balconies</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenIR(true)}>Incident Report</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenIR}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Incident Report</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenST(true)}>Subcontractor Timesheet</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenST}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Subcontractor Timesheet</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div><h3>Height Safety</h3></div>
                                    <div onClick={() => setIsOpenHSIF(true)}>Height Safety Inspection Form</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenHSIF}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Height Safety Inspection Form</h2>
                                            <div>
                                                <p>A site-specific Job Safety Analysis (JSEA), Safe Work Method Statement (SWMS) & Rescue Plan must be developed and agreed to by all workers at the beginning of every project. This form will collect important information to be used in the creation of this documentation. The resulting document will be automatically sent to Abseil Pro management, all workers who enter their email addresses, and to the client if their email address is entered in this form.</p>
                                                <p>The project supervisor must ensure that all workers have received the relevant training and hold the required qualifications to perform the work described in this document and that all workers have been inducted and have acknowledged their agreement to this document using the digital signature in this form. This document must be amended and reviewed by all workers as new hazards are identified throughout the course of the project.</p>
                                                <p>
                                                It is imperative that all information entered in this form is accurate and complete before submitting and commencing work. This form can collect client email address(es) which will automatically forward this information. If any portion of this form requires clarification or review from management, leave the client email field empty, submit this form, and notify the office of your concerns on <span><a href="info@abseil.pro">info@abseil.pro</a></span> or 0438 257 892. 
                                                </p>
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div><h3>Sales & Estimating</h3></div>

                                    <div onClick={() => setIsOpenExQuote(true)}>External Quote</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenExQuote}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>External Quote</h2>
                                            <div>
                                                
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>

                                    <div onClick={() => setIsOpenInQuote(true)}>Internal Quote</div>
                                    <div className='modal'>
                                        <Modal
                                            isOpen={modalIsOpenInQuote}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Internal Quote</h2>
                                            <div>
                                                
                                                <hr />
                                            </div>
                                            <button className='modalBtn' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )}
            <style jsx>{`
                .wrapper {
                    position: relative;
                }

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
                    width: 100%;
                    height: 300px;
                    opacity: 0.5;
                }

                .clientWrapper {
                    position: absolute;
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
                    padding: 15px;
                }
                
                .activeContent {
                    display: block;
                }

                .container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 50px;
                }

                .hide {
                    display: ${hide}
                }

                .show {
                    display: ${show}
                }

                .modalBtn {
                    margin-bottom: 20px;
                }

                .imgWrapper > img {
                    width: 100%;
                    height: auto;
                }

                .modalPicture > img {
                    width: 100%;
                    height: auto;
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
                }

                tr:nth-child(even) {
                    background-color: #dddddd;
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