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

function newSupplier() {
    const [newName, setNewName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPostal, setNewPostal] = useState("");
    const [newContact, setNewContact] = useState("");
    const [newFax, setNewFax] = useState("");
    const [newWebsite, setNewWebite] = useState("");
    const [newZero, setNewZero] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const suppliersCollectionRef = collection(db, "suppliers");

    const addSupplier = async () => {
        setIsLoading(true);
    
    await addDoc(suppliersCollectionRef, {
      supplierName: newName,
      address: newAddress,
      postalAddress: newPostal,
      phone: Number(newContact),
      fax: newFax,
      website: newWebsite,
      zeroRatedGST: newZero
     }).then((respose) => {
        setIsLoading(false)
     })
     .catch(() => {
        setErrorMessage("Unable to submit");
        setIsLoading(false);
     });

        window.location.pathname="/newSupplier";

    }


  return (
    <>
        <div className='wrapper'>
            <h1>Edit Supplier Form</h1>
            <div >
                <h4>Edit General Information</h4>
                <div>
                    <label>Supplier Name</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                </div>
                <div>
                    <label>Postal Address</label>
                    <input type="text" value={newPostal} onChange={(e) => setNewPostal(e.target.value)} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="number" value={newContact} onChange={(e) => setNewContact(e.target.value)} />
                </div>
                <div>
                    <label>Fax</label>
                    <input type="text" value={newFax} onChange={(e) => setNewFax(e.target.value)} />
                </div>
                <div>
                    <label>Website</label>
                    <input type="text" value={newWebsite} onChange={(e) => setNewWebite(e.target.value)} />
                </div>
                <h3>Edit Financial Information</h3>
                <label>Zero Rated GST</label>
                <select value={newZero} onChange={(e) => setNewZero(e.target.value)}>
                        <option>(Select)</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                </select>
                <hr></hr>
                
                <div className='buttonWrapper'><button type='submit' onClick={addSupplier} disabled={isLoading}>{isLoading ? <Loading /> : "Submit Data"}</button></div>
                <div className='buttonWrapper'><Link href="suppliers"><button type='submit'>Go to Suppliers list</button></Link></div>

                
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

export default newSupplier