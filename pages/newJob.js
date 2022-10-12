/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import dateFormat, { masks } from "dateformat";
import React, {useState, useEffect, useMemo } from 'react'
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
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
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
require('react-datepicker/dist/react-datepicker.css')


function newJob() {
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [newState, setNewState] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newPriority, setNewPriority] = useState("");
  const [newAccMngr, setNewAccMngr] = useState("");
  const [newMngr, setNewMngr] = useState("");
  const [newTeam, setNewTeam] = useState("");
  const [temps, setTemps] = useState([]);
  const [jobUniId, setJobUniId] = useState("0000");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({lat: null, lng: null})

  const clientsCollectionRef = collection(db, "clients");

  const jobsCollectionRef = collection(db, "jobs");

  const staffCollectionRef = collection(db, "staff");

  const tempCollectionRef = collection(db, "jobTemplates");

  const usersRef = collection(db, "users");


    useEffect(() => {
        const getClients = async () => {
            const q = query(clientsCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setClients(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getClients();
    }, []) 
    

    useEffect(() => {
      const getJobs = async () => {
          const q = query(jobsCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          setJobs(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
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


    useEffect(() => {
      const getTemp = async () => {
          const q = query(tempCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          setTemps(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
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

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(value);
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

  const createJob = async () => {
    
    await addDoc(jobsCollectionRef, {
      jobNumber: "J" + jobUniId,
      imageUrl: url, 
      client: newClient,
      name: name,
      contact: Number(newContact), 
      description: newDesc,
      site_address: address,
      budget: newBudget,
      startDate: startDate,
      dueDate: endDate,
      priority: newPriority,
      accountManager: newAccMngr,
      manager: newMngr,
      staff: newTeam.split(",").map(staff => doc(db, "users", staff)),
      state: newState,
      images: null
     });

    window.location.pathname="/jobs";

  }

  const uniId = () => {
    const d = new Date()
    const day = d.getDate().toString()
    const month = d.getMonth().toString()
    const yr = d.getFullYear().toString()
    const hr = d.getHours().toString()
    const min = d.getMinutes().toString()
    const sec = d.getSeconds().toString()
    const formattedDate = month + day + yr + hr + min + sec
    setJobUniId(formattedDate);
  }

  useEffect(() => {
    setJobUniId(uniId);
  }, [])

  const options = staff.map(team => (
    { label: `${team.name}`, value: `${team.id}` }
  ))


  return (
    <div className='wrapper'>
      <div>
        <h5>{"J" + jobUniId}</h5>
        <h1>Job Information</h1>
      </div>
      <hr />
      {/* <input  value={"J" + jobUniId} onChange={(event) => {setJobUniId(event.target.value)}} /> */}
      {/* <button onClick={uniId}>Generate ID</button><span>{"J" + jobUniId}</span> */}
      <label>Upload Cover Photo</label>
      <div style={{width:"100%",marginBottom:"15px",marginTop:"15px"}}>
        <ImageUpload image={image} handleChange={handleChange} handleUpload={handleUpload} />
        <br />
        <input type="hidden" value={url} onChange={(event) => {setUrl(event.target.value)}}  />
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
      <label>Budget</label>
      <input type="text" value={newBudget} onChange={e => setNewBudget(e.target.value)} />
      <label>State</label>
      <select value={newState} onChange={(event) => setNewState(event.target.value)} >
        <option>Choose State...</option>
        <option value="Planned">Planned</option>
        <option value="Scheduled">Scheduled</option>
        <option value="In Progress">In Progress</option>
        <option value="On Hold">On Hold</option>
        <option value="Ready to Invoice">Ready to Invoice</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <label>Site Address</label>
      
      <div>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => ( 
            <div>
              <p>Latitude: {coordinates.lat}</p>
              <p>Longitude: {coordinates.lng}</p>
              <input {...getInputProps({placeholder: "Search address"})} />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#E6EAEC" : "#fff",
                    cursor: "pointer"
                  }
                  return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                })}
              </div>
            </div> )}
        </PlacesAutocomplete>
      </div>
      <hr />
      <h6 className='docsHeader'>SCHEDULE INFORMATION</h6>
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
      <label>Priority</label>
        <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)}>
          <option>Choose Priority...</option>
          <option value="Immediate">Immediate</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <label>Account Manager</label>
        <select value={newAccMngr} onChange={(event) => setNewAccMngr(event.target.value)}>
          <option>Choose Account Manager...</option>
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
        <MultiSelect
          onChange={(val) => setNewTeam(val)}
          options={options}
          value={newTeam}
        />

        <br />

        
        {/* {staff.map(team => (
          <div>
            <label htmlFor={team.id}>{team.name}</label>
            <input type="radio" key={team.id} value={newTeam} checked={ value === newTeam } onChange={(event) => seTNewTeam(event.target.value)} />
          </div>
        ))} */}
        
        {/* <select value={newTeam} onChange={(event) => seTNewTeam(event.target.value)}>
          <option>Choose Staff</option>
          {staff.map(team => (
            <option value={team.name}>{team.name}</option>
          ))}
        </select> */}
        <div className='btnWrapper'><input className="button-primary" type="submit" value="submit" onClick={createJob}/></div>
      
      
      <style jsx>{`
        .wrapper {
          padding: 15px 0;
        }
        input {
          width: 100%;
          margin-bottom: 15px;
        }

        input:focus {
            outline: none !important;
            border:1px solid red;
            box-shadow: 0 0 10px #719ECE;
        }

        select {
          margin-bottom: 15px;
          width: 100%;
        }

        .docsHeader {
          text-transform: uppercase;
          font-size: 1.4rem;
          letter-spacing: .2rem;
          font-weight: 600;
        } 

        .btnWrapper {
          text-align: center;
          margin-bottom: 100px;
        }

      `}</style>
    </div>
  )
}

export default newJob