/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import { auth } from '../src/config/firebase.config'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { AuthCheck } from '../components/AuthCheck'


function Dashboard() {

  const [user, setUser] = useState({});

  const router = useRouter();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {  
    const auth = getAuth();
    await signOut(auth).then(() => {
        router.push('/');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <AuthCheck>  
      <h1>WELCOME</h1>
      <button onClick={logout}>Sign out</button>
    </AuthCheck>
  )
}

export default Dashboard;
