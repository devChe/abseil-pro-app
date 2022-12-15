/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../src/config/firebase.config';


const ClientQuote = () => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const clientsCollectionRef = collection(db, "clients");

    useEffect(() => {
        setLoading(true);
        const getClients = async () => {
            const url = window.location.href;
            const lastSegment = url.split("/").pop();
            const q = query(clientsCollectionRef, where("slug", "==", lastSegment));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setClient(res[0]);
        }
        getClients();
    }, [])

  return (
    <div>
        <h1>{client.name}</h1>
    </div>
  )
}

export default ClientQuote