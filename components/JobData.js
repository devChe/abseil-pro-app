import React from 'react'
import Link from 'next/dist/client/link'
import { async } from '@firebase/util'
import { db } from '../src/config/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function JobData({job}) {

    const deleteJob = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await deleteDoc(jobDoc);
        window.location.reload(false)
    }

  return (
    <>
        <tr>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td style={{color:"blue"}}>{job.jobNumber}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.client}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.name}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.state}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td></Link>
            <td><FontAwesomeIcon icon={faTrashCan} onClick={() => {deleteJob(job.id)}} width="35" className='trashIcon' /></td>
        </tr>
        
        <style jsx>{`
            td, th {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
                white-space: nowrap;
                transition: .15s ease;
                
            }

            tr:hover {
                background-color: lightgrey;
                color: white;
                cursor: pointer;
            }
            
            tr:active {
                background: darkgrey;
            }
        `}</style>
    </>
  )
}

export default JobData