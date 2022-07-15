import React from 'react'
import Link from 'next/dist/client/link'

function TaskData() {
  return (
    <>
        <tr>
            <td>Admin</td>
            <td>77.00</td>
            <td>95.00</td>
        </tr>
        <style jsx>{`
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        `}</style>
        

        </>
    
  )
}

export default TaskData;