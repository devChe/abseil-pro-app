/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';


function HeightSafetyData({heightSafetyList}) {

  return (
    <>
        <tr style={{whiteSpace:"nowrap"}}>
            <td>{heightSafetyList.site_name}</td>
            <td>{heightSafetyList.site_address}</td>
            <td>{new Date(heightSafetyList.inspection_date.seconds * 1000).toLocaleDateString("en-US")}</td>
            <td>{new Date(heightSafetyList.next_inspection_date.seconds * 1000).toLocaleDateString("en-US")}</td>
            <td style={{ display:"flex",gap:"5px", textDecoration:"underline", color: "blue" }}>
                <Link href="heightAndSafetyProfile/[id]" as={`heightAndSafetyProfile/${heightSafetyList.id}`}><div>Open</div></Link>
                <div>Trash</div>
            </td>
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

export default HeightSafetyData;