import React from 'react'
import Link from 'next/dist/client/link'

function JobData({job}) {
  return (
    <>
        
        <tr>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.jobNumber}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.client}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.name}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{job.state}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}</td></Link>
            <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`} key={job.id}><td>{new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td></Link>
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