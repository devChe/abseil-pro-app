/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { db } from '../../src/config/firebase.config'
import { collection, doc, getDocs, getDoc, updateDoc, getItem } from 'firebase/firestore'

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'heightSafety'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: { id: doc.id.toString() }
        }
    })
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const docRef = doc(db, "heightSafety", id);
    const docSnap = await getDoc(docRef);
    const heightSafetyProps = docSnap.data();
    heightSafetyProps.id = id;
    return {
        props: { heightSafetyProps: JSON.stringify(heightSafetyProps) || null}
    }
}

function heightAndSafetyProfile({heightSafetyProps}) {
    const router = useRouter();

    //so the data will go first to the fallback while loading is not done
    if(router.isFallback)
        return <div>...Loading</div>
        
    const data = JSON.parse(heightSafetyProps);

    const databaseRef = collection(db, 'heightSafety')

    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");

    const editHandler = () => {
        isEdit(true);
    }

    // Edit or Update Data
    const updateHeightSafety = async (id, site_name) => {
        const heightSafetyDoc = doc(db, "heightSafety", id);
        const newFields = { site_name: newName }
        await updateDoc(heightSafetyDoc, newFields);
        window.location.reload(false);
    }
    
    return (
        <>
            {edit ? (
                <div className='container'>
                    <label>Edit Name</label>
                    <div><input type="text" placeholder={data.site_name} onChange={(event) => setNewName(event.target.value)} /></div>
                    <button type="submit" onClick={() => {updateHeightSafety(data.id, data.site_name)}} style={{marginTop: "20px"}}>Save</button>
                </div>
            ) : (
                <div className='container'>
                    <div>Site name: {data.site_name}</div>
                    <div>Site Address: {data.site_address}</div>
                    <div>Site email: {data.email}</div> 
                    <button onClick={editHandler}>Edit</button>
                </div>
            )}
        </>       
    );
}
 
export default heightAndSafetyProfile;


