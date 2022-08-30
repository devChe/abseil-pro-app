/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import HeightSafetyData from '../components/HeightSafetyData';

function costs() {
  const [heightSafety, setHeightSafety] = useState([]);

  const heightSafetyCollectionRef = collection(db, "heightSafety");
  

    useEffect(() => {
        const getHeightSafety = async () => {
            const q = query(heightSafetyCollectionRef, orderBy("site_name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setHeightSafety(res);
        }
        getHeightSafety();
    }, [])

  return (
    <>
      <div style={{background:"#ffff",padding:"15px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1>Height and Safety Lists</h1>
          <Link href="newCosts"><button>+New Height and Safety</button></Link>
        </div>
        <div className='tableWrapper'>
          <table>
            <tr>
              <th>Site Name</th>
              <th>Site Address</th>
              <th>Inspection Date</th>
              <th>Next Inspection Date</th>
              <th>Action</th>
            </tr>
            {heightSafety.map(heightSafetyList => (
              <HeightSafetyData heightSafetyList={heightSafetyList} />
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