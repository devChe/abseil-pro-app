/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';


function CostData({cost}) {

  return (
    <>
        <tr>
            <td>{cost.description}</td>
            <td>{cost.supplier}</td>
            <td>{cost.code}</td>
            <td>{cost.unitCost}</td>
            <td>{cost.unitPrice}</td>
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

export default CostData;