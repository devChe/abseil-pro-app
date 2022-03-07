/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { db } from '../src/config/firebase.config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'


function post() {
    const [clients, setClients] = useState([]);
    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");
    const clientsCollectionRef = collection(db, "clients");

    useEffect(() => {
        const getClients = async () => {
            const data = await getDocs(clientsCollectionRef);
            setClients(data.docs.filter((doc) => doc.id === window.location.pathname.substring(1)).map((doc) => ({...doc.data(), id: doc.id })))
            console.log(data)
        }
        getClients();
    }, [])

    const editHandler = () => {
        isEdit(true)
    }

    const updateClient = async (id, name) => {
        const clientDoc = doc(db, "clients", id);
        const newFields = { name: newName };
        await updateDoc(clientDoc, newFields);
        window.location.reload(false)
    }

    return (
        <> 
            {clients.map((client) => {
                return (
                    <>
                    {edit ? (
                        <div className='container'>
                            <label>Edit Name</label>
                            <div><input type="text" placeholder={client.name} onChange={(event) => {setNewName(event.target.value)}} /></div>
                            <button type="submit" onClick={() => {updateClient(client.id, client.name)}}>Save</button>
                        </div>

                    ) : (
                        <div className='container'>
                            <div>Client name: {client.name}</div>
                            <div>Client phone: {client.phone}</div>
                            <div>Client email: {client.email}</div>
                            <button onClick={() => isEdit("true")}>Edit</button>
                        </div>
                    )}
                    
                        
                </>
                )
            })}
        </>
    )
}

export default post