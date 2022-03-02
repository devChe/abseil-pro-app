/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { db } from '../src/config/firebase.config'
import { collection, getDocs } from 'firebase/firestore'


function post() {
    const [clients, setClients] = useState([]);
    const clientsCollectionRef = collection(db, "clients");

    useEffect(() => {
        const getClients = async () => {
            const data = await getDocs(clientsCollectionRef);
            setClients(data.docs.filter((doc) => doc.id === window.location.pathname.substring(1)).map((doc) => ({...doc.data(), id: doc.id })))
            console.log(data)
        }
        getClients();
    }, [])

    return (
        <> 
            {clients.map((client) => {
                return (
                    <>
                        <div className='container'>
                            <div>Client name: {client.name}</div>
                            <div>Client phone: {client.phone}</div>
                            <div>Client email: {client.email}</div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default post