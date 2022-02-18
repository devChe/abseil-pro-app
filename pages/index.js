/* eslint-disable react-hooks/rules-of-hooks */
import { async } from '@firebase/util';
import React, { useState } from 'react'
import { auth } from '../src/config/firebase.config'
import { onAuthStateChanged, currentUser, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

function login() {
    const notify = () => toast("Wow so easy!");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [textError, setTextError] = useState("")
    const [user, setUser] = useState({});

    const router = useRouter();


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
                const successful = () => toast.success("SUCCESS");
                setTextError(successful);
                router.push('/dashboard'); //After successful login, user will be redirected to home.html
            } else {
                window.location = '/';
            }
            
        } catch (error) {
            const notify = () => toast.error("Please Check Email & Password");
            setTextError(notify);
        }
        
    }
    
    return (
    
    <div className='main'>
        <ToastContainer />
        <h1 style={{ padding: "100px 0 0" }}>ABSEIL PRO</h1>
        <p>ROPE ACCESS & HEIGHT SAFETY</p>
        <div className='appForm' style={{ display: "grid", width: "500px", margin: "0 auto" }}>
          <input  type="email" placeholder="E-mail" onChange={(event) => setLoginEmail(event.target.value)} style={{marginBottom: "12px"}} />
          <input  type="password" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)} style={{marginBottom: "12px"}}  />
          <button type='submit' onClick={login}>Login</button>
          
        </div>
        <style jsx>{`
            .appForm {
                display: grid;
                width: 500px;
                margin: 0 auto;
            }

            @media only screen and (min-width: 300px) and (max-width: 375px) {
                .appForm {
                    width: auto !important;
                }
            }

            @media only screen and (min-width: 376px) and (max-width: 425px) {
                .appForm {
                    width: auto !important;
                }
            }

        `}</style>
    </div>
  )
}

export default login;