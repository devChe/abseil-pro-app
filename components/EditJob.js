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

function EditJob({
    job,
    updateJob,
    updateClientName,
    setUpdateClientName,
    updateContact,
    setUpdateContact,
    updateName,
    setUpdateName,
    updateDesc,
    setUpdateDesc,
    updateBudget,
    setUpdateBudget,
    updateState,
    setUpdateState,
    updateSiteAddress,
    setUpdateSiteAddress,
    updateStartDate,
    setupdateStartDate,
    updateDueDate,
    setUpdateDueDate,
    updatePriority,
    setUpdatePriority,
    updateAccMngr,
    setUpdateAccMngr,
    updateManager,
    setUpdateManager,
    updateTeam,
    setUpdateTeam,
    edit,
    isEdit
}){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [staff, setStaff] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    

    const staffCollectionRef = collection(db, "staff");

    useEffect(() => {
        const getStaff = async () => {
            const q = query(staffCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setStaff(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
          }
          getStaff();
      }, [])

      const options = staff.map(team => (
        { label: `${team.name}`, value: `${team.id}` }
      ))
    
  return (
    <>
        <div>
            <div className="editJobContainer">
                <label>Edit Name</label>
                <div>
                    <div style={{padding:"20px 0"}}>
                        <label>Client:</label>
                        <div>
                            <input type="text" value={updateClientName} onChange={e => setUpdateClientName(e.target.value)} width="100%" />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Contact:</label>
                        <div>
                            <input type="text" value={updateContact} onChange={e => setUpdateContact(e.target.value)} width="100%" />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Name:</label>
                        <div>
                            <input type="text" value={updateName} onChange={e => setUpdateName(e.target.value)} width="100%" />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Description:</label>
                        <div>
                            <ReactQuill value={updateDesc} onChange={setUpdateDesc} height="50%" />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Budget:</label>
                        <div>
                            <input type="text" value={updateBudget} onChange={e => setUpdateBudget(e.target.value)} width="100%" />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>State:</label>
                        <select value={updateState} onChange={(event) => setUpdateState(event.target.value)} >
                            <option>Choose State...</option>
                            <option value="Planned">Planned</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="In Progress">In Progress</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Ready to Invoice">Ready to Invoice</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Site Address:</label>
                        <div>
                            <input type="text" value={updateSiteAddress} onChange={e => setUpdateSiteAddress(e.target.value)} width="100%" />
                        </div>
                    </div>
                    <h4>Schedule Information</h4>
                    <div className='row'>
                        <div className='startDate six columns'>
                        <label>Start Date</label>
                        <DatePicker
                            selected={updateStartDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            onChange={date => setupdateStartDate(date)}
                            className="six columns"
                            dateFormat={'dd/MM/yyyy'}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                        <div className='dueDate six columns'>
                        <label>Due Date</label>
                        <DatePicker
                            selected={updateDueDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            onChange={date => setUpdateDueDate(date)}
                            className="six columns"
                            dateFormat={'dd/MM/yyyy'}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Priority:</label>
                        <select value={updatePriority} onChange={(event) => setUpdatePriority(event.target.value)}>
                            <option>Choose Priority...</option>
                            <option value="Immediate">Immediate</option>
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Account Manager</label>
                        <select value={updateAccMngr} onChange={(event) => setUpdateAccMngr(event.target.value)}>
                        <option>Choose Account Manager...</option>
                        {staff.map(mngr => (
                            <option value={mngr.name}>{mngr.name}</option>
                        ))}
                        </select>
                    </div>
                    <div style={{padding:"20px 0"}}>
                        <label>Manager</label>
                        <select value={updateManager} onChange={(event) => setUpdateManager(event.target.value)}>
                        <option>Choose Manager</option>
                        {staff.map(mngr => (
                            <option value={mngr.name}>{mngr.name}</option>
                        ))}
                        </select>
                    </div>
                    
                    {isToggle ? (
                        <div style={{padding:"20px 0"}}>
                            <label>Staff</label>
                            <MultiSelect
                                onChange={(val) => setUpdateTeam(val)}
                                options={options}
                                value={updateTeam}
                            />
                        </div>
                    ) : (
                        <button type="button" onClick={e => setIsToggle(true)}>Change Team</button>
                        )
                    }
                    
                </div>
                <div style={{
                    padding: "20px 0",
                    textAlign: "center"    
                }} 
                >
                    <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
                        <button
                            type="submit"
                            onClick={() => {updateJob(
                                job.id
                            )}}
                        >
                            Save
                        </button>
                        <button type="submit" onClick={() => isEdit(false)}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <style jsx>{`
            input, select {
                width: 100%;
            }
        `}</style>
    </>
  )
}

export default EditJob