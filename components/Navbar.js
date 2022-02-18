import React from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
import { auth } from '../src/config/firebase.config'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

function Navbar() {
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
      <>
        <div className='headerContainer'>
            <h1>Abseil Pro System Management</h1>
            <div className='flex1'></div>
            <button onClick={logout}>Logout</button>
        </div>
        <style jsx>{`
          .headerContainer {
            display: flex;
            width: 100% !important;
            justify-content: space-between;
            background-color: #E6EAEC;
            align-items: center;
            padding: 0 20px;
          }

        `}</style>
      </>
  )
}

export default Navbar;
