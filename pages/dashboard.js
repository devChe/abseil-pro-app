/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged, signOut, getAuth, updateCurrentUser } from 'firebase/auth'
import { auth } from '../src/config/firebase.config'
import { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'


function Dashboard() {

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard;