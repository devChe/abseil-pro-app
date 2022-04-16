/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ImageUpload from '../components/ImageUpload'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";


function newJob() {
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [newState, setNewState] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newPriority, setNewPriority] = useState("");
  const [newAccMngr, setNewAccMngr] = useState("");
  const [newMngr, setNewMngr] = useState("");
  const [newTeam, seTNewTeam] = useState("");
  const [temps, setTemps] = useState([]);
  const [jobNumber, setJobNumber] = useState("");
  const [location, setLocation] = useState("");

  const clientsCollectionRef = collection(db, "clients");

  const staffCollectionRef = collection(db, "staff");

  const tempCollectionRef = collection(db, "jobTemplate");

    useEffect(() => {
        const getClients = async () => {
            const q = query(clientsCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setClients(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getClients();
    }, [])

    useEffect(() => {
      const getStaff = async () => {
          const q = query(staffCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          setStaff(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getStaff();
    }, [])

    useEffect(() => {
      const getTemp = async () => {
          const q = query(tempCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          setTemps(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
          console.log(data);
        }
        getTemp();
    }, [])

  
  const handleChange = e => {
      if(e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  }

  const handleTemplateChange = (e) => {
    console.log(e.target.value);
    const selectedTemplate = temps.find(temp => temp.name === e.target.value);
    setNewDesc(selectedTemplate.description);
    setName(selectedTemplate.name);
  }


  const handleUpload = () => {
    if(image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then(url => {
        alert("Success!");
        setUrl(url);
      })
    })
  };

  const jobsCollectionRef = collection(db, "jobs");

  const createJob = async () => {
    
    await addDoc(jobsCollectionRef, {
      jobNumber: jobNumber,
      imageUrl: url, 
      client: newClient,
      name: name,
      contact: Number(newContact), 
      description: newDesc,
      startDate: startDate,
      dueDate: endDate,
      priority: newPriority,
      accountManager: newAccMngr,
      manager: newMngr,
      staff: newTeam
     });
    window.location.pathname="/jobs";
  }
  return (
    <div className='wrapper'>
      <div>
        <h1>Job Information</h1>
        <hr/>
      </div>
      
      <label>Upload Cover Photo</label>
      <div style={{width:"100%",marginBottom:"15px",marginTop:"15px"}}>
        <ImageUpload image={image} handleChange={handleChange} handleUpload={handleUpload} />
        <br />
        <label>Image URL:</label>
        <input type="text" value={url} onChange={(event) => {setUrl(event.target.value)}}  />
      </div>
      <hr />
      <label>Client</label>
      <select value={newClient} onChange={(event) => {setNewClient(event.target.value)}}>
        <option>Choose client...</option>
        {clients.map(client => (
          <option value={client.name}>{client.name}</option>
        ))}
      </select>
      {/* <input type="text" onChange={(event) => {setNewClient(event.target.value)}} placeholder="Client.."/> */}

      <label>Contact</label>
      {/* <input type="tel" placeholder="Contact.." onChange={(event) => {setNewContact(event.target.value)}}/> */}
      <select value={newContact} onChange={(event) => {setNewContact(event.target.value)}}>
        <option>Choose contact...</option>
        {clients.map(client => (
          <option value={client.phone}>{client.phone}</option>
        ))}
      </select>
      <label>Template</label>
      <select onChange={handleTemplateChange}>
        <option>Choose Template...</option>
        {temps.map(temp => 
          <option key={temp.id} value={temp.name}>{temp.name}</option>
          
    
        )}
      </select>
      <label>Name</label>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
      <label>Description</label>
      <ReactQuill value={newDesc} onChange={setNewDesc} />
      <label>State</label>
      <select value={newState} onChange={(event) => setNewState(event.target.value)} >
        <option value="Planned">Planned</option>
        <option value="Scheduled">Scheduled</option>
        <option value="In Progress">In Progress</option>
        <option value="On Hold">On Hold</option>
        <option value="Ready to Invoice">Ready to Invoice</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <label>Site Address</label>
      <textarea value={location} onChange={(event) => setLocation(event.target.value)} />
      <hr />
      <h1>Schedule Information</h1>
      <div className='date'>
        <div className='startDate'>
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={date => setStartDate(date)}
          />
        </div>
        <div className='dueDate'>
          <label>Due Date</label>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={date => setEndDate(date)}
          />
        </div>
      </div>
      <label>Priority</label>
        <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)}>
          <option value="Immediate">Immediate</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <label>Account Manager</label>
        <select value={newAccMngr} onChange={(event) => setNewAccMngr(event.target.value)}>
          <option>Choose Account Manager</option>
          {staff.map(mngr => (
            <option value={mngr.name}>{mngr.name}</option>
          ))}
        </select>

        <label>Manager</label>
        <select value={newMngr} onChange={(event) => setNewMngr(event.target.value)}>
          <option>Choose Manager</option>
          {staff.map(mngr => (
            <option value={mngr.name}>{mngr.name}</option>
          ))}
        </select>

        <label>Staff</label>
        <select value={newTeam} onChange={(event) => seTNewTeam(event.target.value)}>
          <option>Choose Staff</option>
          {staff.map(team => (
            <option value={team.name}>{team.name}</option>
          ))}
        </select>
      <button type="submit" onClick={createJob}>Save</button>
      
      <style jsx>{`
        .wrapper {
          padding: 15px 0;
        }
        input {
          width: 100%;
          margin-bottom: 15px;
        }

        select {
          margin-bottom: 15px;
          width: 100%;
        }

        .date {
          display: flex;
        }
      `}</style>
    </div>
  )
}

export default newJob