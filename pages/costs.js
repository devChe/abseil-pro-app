/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import CostData from '../components/CostData';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'

function costs() {
  const [costs, setCosts] = useState([]);

    const costsCollectionRef = collection(db, "costs");
  

    useEffect(() => {
        const getCosts = async () => {
            const q = query(costsCollectionRef, orderBy("description"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setCosts(res);
        }
        getCosts();
    }, [])

  return (
    <>
      <div style={{background:"#ffff",padding:"15px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1>Costs</h1>
          <Link href="newCosts"><button>+New Cost</button></Link>
        </div>
        <div className='tableWrapper'>
          <table>
            <tr>
              <th>Description</th>
              <th>Supplier</th>
              <th>Code</th>
              <th>Unit Cost</th>
              <th>Unit Price</th>
            </tr>
            {costs.map(cost => (
              <CostData cost={cost} />
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

export default costs;