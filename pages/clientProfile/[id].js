/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { db } from '../../src/config/firebase.config'
import { collection, doc, getDocs, getDoc, updateDoc, getItem } from 'firebase/firestore'

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'clients'));
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
    const docRef = doc(db, "clients", id);
    const docSnap = await getDoc(docRef);
    const clientProps = docSnap.data();
    clientProps.id = id;
    return {
        props: { clientProps: JSON.stringify(clientProps) || null}
    }
}

function post({clientProps}) {
    const router = useRouter();

    //so the data will go first to the fallback while loading is not done
    if(router.isFallback)
        return <div>...Loading</div>
        
    const client = JSON.parse(clientProps);

    const databaseRef = collection(db, 'clients')

    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");

    const editHandler = () => {
        isEdit(true);
    }

    const updateClient = async (id, name) => {
        const clientDoc = doc(db, "clients", id);
        const newFields = { name: newName }
        await updateDoc(clientDoc, newFields);
        window.location.reload(false);
    }
    
    return (
        <>
            {edit ? (
                <div className='container'>
                    <label>Edit Name</label>
                    <div><input type="text" placeholder={client.name} onChange={(event) => setNewName(event.target.value)} /></div>
                    <button type="submit" onClick={() => {updateClient(client.id, client.name)}}>Save</button>
                </div>
            ) : (
                <div className='container'>
                    <div>Client name: {client.name}</div>
                    <div>Client phone: {client.phone}</div>
                    <div>Client email: {client.email}</div> 
                    <button onClick={editHandler}>Edit</button>
                </div>
            )}
        </>       
    );
}
 
export default post;


