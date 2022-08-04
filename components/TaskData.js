/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Link from 'next/dist/client/link'


function TaskData({task}) {

  return (
    <>
        <tr>
            <td>{task.name}</td>
            <td>{task.baseRate}</td>
            <td>{task.billableRate}</td>
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