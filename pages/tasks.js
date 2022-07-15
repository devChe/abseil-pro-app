import React from 'react'
import TaskData from '../components/TaskData';

function tasks() {
  return (
    <>
      <table>
        <tr>
          <th>Task Name</th>
          <th>Base Rate</th>
          <th>Billable Rate</th>
        </tr>
        <TaskData />
        
      </table>
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

export default tasks