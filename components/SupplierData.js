/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';


function SupplierData({supplier}) {

  return (
    <>
        <tr>
            <Link href="supplier/[id]" as={`supplier/${supplier.id}`}><td>{supplier.supplierName}</td></Link>
            <Link href="supplier/[id]" as={`supplier/${supplier.id}`}><td>{supplier.address}</td></Link>
            <Link href="supplier/[id]" as={`supplier/${supplier.id}`}><td>{supplier.phone}</td></Link>
            <Link href="supplier/[id]" as={`supplier/${supplier.id}`}><td>{supplier.fax}</td></Link>
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
                white-space: nowrap;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        `}</style>
        

    </>
    
  )
}

export default SupplierData;