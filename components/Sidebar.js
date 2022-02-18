/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import React from 'react'

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className='wrapper'>
        <div className='logo'>
            <img src='logo.png' width="100" height="100" />
        </div>
        <div className='tools'>
            <div onClick={(e) => router.push('/dashboard')}>Dashboard</div>
            <div onClick={(e) => router.push('/clients')}>Clients</div>
            <div onClick={(e) => router.push('/jobs')}>Jobs</div>
            <div onClick={(e) => router.push('/business')}>Business</div>
            <div onClick={(e) => router.push('/reports')}>Reports</div>
            
        </div>
        <style jsx>{`
            .wrapper {
                background-color: #FCFCFC;
                width: 200px;
                height: 100vh;
            }

            .logo {
                display: flex;
                justify-content: center;
                padding: 15px;
            }

            .tools {
                display: grid;
                color: #6166A0;
                font-size: 18px;
                padding: 30px 0;
            }

            .tools div {
                padding: 10px 0 10px 40px;
                cursor: pointer;
                
            }

            .tools div:hover {
                background: grey;
                color: white;
            }

            .tools div:active {
                background: lightgrey;
                color: white;
            }


        `}</style>
    </div>
  )
}

export default Sidebar