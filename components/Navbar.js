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
            <div>{user.email}</div>
            <div className='flex1'></div>
            <button onClick={logout}>Logout</button>
        </div>
        <style jsx>{`
          .headerContainer {
            display: flex;
            width: 100% !important;
            justify-content: space-between;
            background-color: #F6F7F9;
            align-items: center;
            padding: 10px 20px;
          }

        `}</style>
      </>
  )
}

export default Navbar;
