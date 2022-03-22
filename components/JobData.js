import React from 'react'
import Link from 'next/dist/client/link'

function JobData({job}) {
  return (
    <>
        <Link  href="jobProfile/[id]" as={`jobProfile/${job.id}`}>
        <tr>
            <td>{job.jobNumber}</td>
            <td>{job.client}</td>
            <td>{job.name}</td>
            <td>{job.state}</td>
            <td>{new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}</td>
            <td>{new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}</td>
        </tr>
        </Link>
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