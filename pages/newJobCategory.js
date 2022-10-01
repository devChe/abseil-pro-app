/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { collection, addDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../src/config/firebase.config'
import { async } from '@firebase/util';

const newJobCategory = () => {
    const [newCategoryName, setNewCategoryName] = useState("");

    const jobCategoriesCollectionRef = collection(db, "jobCategories");

    const addCategory = async () => {
        await addDoc(jobCategoriesCollectionRef, { 
            name: newCategoryName
        });
        window.location.pathname="/jobCategories";
    }

  return (
    <>
        <div style={{height:"100vh"}}>
            <h1>Add Job Category</h1>
            <hr/>
            <div>
                <div>
                    <label>Category Name</label>
                    <input value={newCategoryName} width="100%" onChange={e => setNewCategoryName(e.target.value)} />
                    <div>
                        <button type="submit" onClick={addCategory}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
        <style jsx>{`
            input {
                width: 100%;
                margin-bottom: 15px;
            }

            input:focus {
                outline: none !important;
                border:1px solid red;
                box-shadow: 0 0 10px #719ECE;
            }
        `}</style>
    </>
  )
}

export default newJobCategory