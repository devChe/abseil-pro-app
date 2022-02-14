import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import { auth } from '../src/config/firebase.config'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/modal'


export default function Home() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {  
    const auth = getAuth();
    await signOut(auth).then(() => {
        window.location = '/login'
    }).catch((error) => {
      console.log(error.message);
    });
  }

  
  
 
  return (
    <>
      {!user ? <Modal /> : ""}
      <h1>WELCOME</h1>
      <button onClick={logout}>Sign out</button>
    </>
  )
}