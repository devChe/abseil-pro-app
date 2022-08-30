/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SupplierData from '../components/SupplierData';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'

function suppliers() {
  const [suppliers, setSuppliers] = useState([]);

    const suppliersCollectionRef = collection(db, "suppliers");
  

    useEffect(() => {
        const getSuppliers = async () => {
            const q = query(suppliersCollectionRef, orderBy("supplierName"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setSuppliers(res);
        }
        getSuppliers();
    }, [])

  return (
    <>
      <div style={{background:"#ffff",padding:"15px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1>Suppliers</h1>
          <Link href="newSupplier"><button>+New Supplier</button></Link>
        </div>
        <div className='tableWrapper'>
          <table>
            <tr>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Fax</th>
            </tr>
            {suppliers.map(supplier => (
              <SupplierData supplier={supplier} />
            ))}
          </table>
        </div>
        
      </div>
    <style jsx>{`
      .tableWrapper {
        overflow-x: auto;
      }

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

      button:hover {
        border:1px solid red;
        box-shadow: 0 0 10px #719ECE;
        cursor: pointer;
      }
    `}</style>  
    </>
  )
}

export default suppliers;