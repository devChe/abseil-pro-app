/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';


function JobTempData({temp}) {

  return (
    <>
        <tr>
            <td>{temp.name}</td>
            <td>{temp.category}</td>
            
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
        `}</style>
        

    </>
    
  )
}

export default JobTempData;