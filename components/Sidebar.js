/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import React, { useState } from 'react'
import { cssTransition } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const [toggle, isToggle] = useState(false)
    const router = useRouter();

  return (
    <div className='wrapper'>
        <div className='logo'>
            <img src='/logo.png' width="100" height="100" />
        </div>
        <div className='tools'>
            <Link href="/dashboard"><a>Dashboard</a></Link>
            <Link href="/clients"><a>Clients</a></Link>
            <Link href="/jobs"><a>Jobs</a></Link>
            <Link href="/business"><a>Business</a></Link>
            <Link href="/reports"><a>Reports</a></Link>
        </div>
        <div className='mobileLogo' style={{display:'none'}}>ABSEIL PRO</div>
        <div>
            <div className='menuBurger' style={{position:"relative", display: 'none'}} onClick={() => isToggle(!toggle)}>
                <FontAwesomeIcon icon={faBurger} style={{fontSize:"25px"}} />
            </div>
            <div className={toggle ? "mobileTools" : "hide"} style={{display:'none',zIndex:"99999"}}>
                <Link href="/dashboard"><a>Dashboard</a></Link>
                <Link href="/clients"><a>Clients</a></Link>
                <Link href="/jobs"><a>Jobs</a></Link>
                <Link href="/business"><a>Business</a></Link>
                <Link href="/reports"><a>Reports</a></Link>
            </div>
        </div>
        
        <style jsx>{`
            .wrapper {
                background-color: #051E34;
                width: 200px;
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
                transition: background-color .15s ease;
                
            }

            .tools a:hover {
                background-color: #253D53;
            }

            .tools a:focus {
                background: grey;
                color: white;
            }

            .change {
                background: grey;
                color: white;
            }

            @media screen and (min-width: 991px) {
                
            }

            @media screen and (max-width: 990px) {
                .logo {
                    display: none;
                }

                .tools {
                    display: none;
                }

                .wrapper {
                    display: flex;
                    width: 100%;
                    height: 40px;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 15px;
                    padding-left: 15px;
                }

                .mobileLogo {
                    display: block !important;
                    color: #ffff;
                }

                .menuBurger {
                    display: block !important;
                    color: #ffff;
                }

                .mobileTools {
                    display: grid !important;
                    position: absolute;
                    right: 20px;
                    padding: 23px;
                    background: #fff;
                    gap: 5px;
                    text-align: center;
                    font-size: 18px;
                }

                .hide {
                    display: none;
                }
            }


        `}</style>
    </div>
  )
}

export default Sidebar;