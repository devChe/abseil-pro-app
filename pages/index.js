import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import { auth } from '../src/config/firebase.config'
import { useState } from 'react'


export default function Home() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
      window.location = '/login';
    }).catch((error) => {
      throw error;
    });
  }

  return (
    <>
      <h1>WELCOME</h1>
      <button onClick={logout}>Sign out</button>
    </>
  )
}