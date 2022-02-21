/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import React, { useState } from 'react'
import { cssTransition } from 'react-toastify'

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='wrapper'>
        <div className='logo'>
            <img src='logo.png' width="100" height="100" />
        </div>
        <div className='tools'>
            <Link href="/dashboard"><a>Dashboard</a></Link>
            <Link href="/clients"><a>Clients</a></Link>
            <Link href="/jobs"><a>Jobs</a></Link>
            <Link href="/business"><a>Business</a></Link>
            <Link href="/reports"><a>Reports</a></Link>
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

            .tools a {
                padding: 10px 0 10px 40px;
                cursor: pointer;
                
            }

            .tools a:hover {
                background: lightgrey;
                color: white;
            }

            .tools a:focus {
                background: grey;
                color: white;
            }

            .change {
                background: grey;
                color: white;
            }


        `}</style>
    </div>
  )
}

export default Sidebar;