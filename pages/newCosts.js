/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc  } from 'firebase/firestore';
import { db, storage  } from '../src/config/firebase.config'
import Loading from '../components/Loading';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function newCosts() {
    const [newDesc, setNewDesc] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [newUnitCost, setNewUnitCost] = useState(0);
    const [newUnitPrice, setNewUnitPrice] = useState(0);
    const [newSupplier, setNewSupplier] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newIncomeAcc, setNewIncomeAcc] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const costsCollectionRef = collection(db, "costs");

    const addCost = async () => {
        setIsLoading(true);
    
    await addDoc(costsCollectionRef, {
      description: newDesc,
      unitCost: Number(newUnitCost),
      unitPrice: Number(newUnitPrice),
      supplier: newSupplier,
      code: newCode,
      notes: newNotes,
      incomeAccount: newIncomeAcc
     }).then((respose) => {
        setIsLoading(false)
     })
     .catch(() => {
        setErrorMessage("Unable to submit");
        setIsLoading(false);
     });

        window.location.pathname="/newCosts";

    }


  return (
    <>
        <div className='wrapper'>
            <h1>Edit Cost Form</h1>
            <div >
                <h4>General Information</h4>
                <div>
                    <label>Description</label>
                    <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                </div>
                <div>
                    <label>Unit Cost</label>
                    <input type="number" value={newUnitCost} onChange={(e) => setNewUnitCost(e.target.value)} />
                </div>
                <div>
                    <label>Unit Price</label>
                    <input type="number" value={newUnitPrice} onChange={(e) => setNewUnitPrice(e.target.value)} />
                </div>
                <div>
                    <label>Supplier</label>
                    <select value={newSupplier} onChange={(e) => setNewSupplier(e.target.value)}>
                        <option>Choose supplier...</option>
                        <option value="Brisbane Access">Brisbane Access</option>
                        <option value="Bunnings">Bunnings</option>
                    {/* {staff.map(mngr => (
                        <option value={mngr.name}>{mngr.name}</option>
                    ))} */}
                    </select>
                </div>
                <div>
                    <label>Code</label>
                    <input type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
                </div>
                <div>
                    <label>Notes</label>
                    <ReactQuill value={newNotes} onChange={setNewNotes} />
                </div>
                <div>
                    <label>Income Account</label>
                    <select value={newIncomeAcc} onChange={(e) => setNewIncomeAcc(e.target.value)}>
                        <option>(Select account)</option>
                        <option value="200 - Sales">200 - Sales</option>
                        <option value="201 - Window and Facade Cleaning">201 - Window and Facade Cleaning</option>
                        <option value="202 - Facade Inspection">202 - Facade Inspection</option>
                        <option value="203 - Maintenance">203 - Maintenance</option>
                        <option value="204 - Painting">204 - Painting</option>
                        <option value="205 - Construction Cleaning">205 - Construction Cleaning</option>
                        <option value="206 - Balcony Cleaning">206 - Balcony Cleaning</option>
                        <option value="207 - Defect Rectifications">207 - Defect Rectifications</option>
                        <option value="208 - Materials">208 - Materials</option>
                        <option value="209 - Exterior Cleaning">209 - Exterior Cleaning</option>
                        <option value="210 - Arboricultural Services">210 - Arboricultural Services</option>
                        <option value="211 - Height Safety Installation">211 - Height Safety Installation</option>
                        <option value="212 - Height Safety Inspection">212 - Height Safety Inspection</option>
                        <option value="213 - Glass Restoration">213 - Glass Restoration</option>
                        <option value="214 - Vegetation Management">214 - Vegetation Management</option>
                        <option value="220 - Rope Access Equipment Hire">220 - Rope Access Equipment Hire</option>
                        <option value="230 - Restoration">230 - Restoration</option>
                        <option value="231 - Structural Drying Equipment Hire">231 - Structural Drying Equipment Hire</option>
                        <option value="250 - Equipment Sales">250 - Equipment Sales</option>
                        <option value="260 - Other Revenue">260 - Other Revenue</option>
                        <option value="262 - Cashflow Boost">262 - Cashflow Boost</option>
                        <option value="265 - Jobkeeper Income">265 - Jobkeeper Income</option>
                        <option value="270 - Interest Income">270 - Interest Income</option>
                        <option value="271 - Stripe Fees Reimbursement">271 - Stripe Fees Reimbursement</option>
                    {/* {staff.map(mngr => (
                        <option value={mngr.name}>{mngr.name}</option>
                    ))} */}
                    </select>
                </div>
                
                <div className='buttonWrapper'><button type='submit' onClick={addCost} disabled={isLoading}>{isLoading ? <Loading /> : "Submit Data"}</button></div>
                <div className='buttonWrapper'><Link href="costs"><button type='submit'>Go to Cost list</button></Link></div>

                
            </div>

        </div>
        <style jsx>{`
            .wrapper {
                background: #ffff;
                padding: 15px;
            }

            label {
                padding-top: 15px;
            }

            input {
                width: 100%;
                padding: 5px;
                
            }

            input:focus {
                outline: none !important;
                border:1px solid red;
                box-shadow: 0 0 10px #719ECE;
            }

            .buttonWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .buttonWrapper button:hover {
                border:1px solid red;
                box-shadow: 0 0 10px #719ECE;
            }
        `}</style>
    </>
    
  )
}

export default newCosts