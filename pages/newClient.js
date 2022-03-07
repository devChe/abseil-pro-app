/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/config/firebase.config'
import { async } from '@firebase/util';

const newClient = () => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const clientsCollectionRef = collection(db, "clients");

  const createClient = async () => {
    await addDoc(clientsCollectionRef, { name: newName, phone: Number(newPhone), email: newEmail  });
    window.location.pathname="/clients";
  }

  return (
    <div>
      <h1>New Client</h1>
      <hr/>
      <div>
        <input placeholder="Name..." onChange={(event) => {setNewName(event.target.value)}} />
        <input placeholder="Phone..." onChange={(event) => {setNewPhone(event.target.value)}} />
        <input placeholder="Email..." onChange={(event) => {setNewEmail(event.target.value)}} />
        <button type="submit" onClick={createClient}>Save</button>
      </div>
    </div>
  )
}

export default newClient