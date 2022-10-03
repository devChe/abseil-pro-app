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
    setUpdateTeam
}){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
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
                        <div>
                            <input type="text" value={updateState} onChange={e => setUpdateState(e.target.value)} width="100%" />
                        </div>
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
                </div>
                <button
                    type="submit"
                    onClick={() => {updateJob(
                        job.id,
                        job.client,
                        job.contact,
                        job.name,
                        job.description,
                        job.budget,
                        job.state,
                        job.site_address,
                        job.startDate,
                        job.dueDate,
                        job.priority,
                        job.accountManager,
                        job.manager,
                        job.staff
                    )}}
                >
                    Save
                </button>
            </div>
        </div>
    </>
  )
}

export default EditJob