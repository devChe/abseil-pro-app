/* eslint-disable react-hooks/rules-of-hooks */
import { async } from '@firebase/util';
import React, { useState } from 'react'
import { auth } from '../src/config/firebase.config'
import { onAuthStateChanged, currentUser, signOut, signInWithEmailAndPassword } from 'firebase/auth';

function login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            if(user) {
                window.location = '/'; //After successful login, user will be redirected to home.html
            } else {
                window.location = '/login'
            }
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
        
    }
    
    return (
    <div className='main'>
        <h1 style={{ padding: "100px 0 0" }}>ABSEIL PRO</h1>
        <p>ROPE ACCESS & HEIGHT SAFETY</p>
        <div style={{ display: "grid", width: "500px", margin: "0 auto" }}>
          <input  type="email" placeholder="E-mail" onChange={(event) => setLoginEmail(event.target.value)} style={{marginBottom: "12px"}} />
          <input  type="password" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)} style={{marginBottom: "12px"}}  />
          <button type='submit' onClick={login}>Login</button>
        </div>
    </div>
  )
}

export default login