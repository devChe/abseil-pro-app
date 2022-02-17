import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import '../src/config/firebase.config'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
// normalize is also available
import 'react-skeleton-css/styles/normalize.3.0.2.css'
import { auth } from '../src/config/firebase.config'
import { onAuthStateChanged, currentUser, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from "firebase/app";
import { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Abreil Pro System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container' style={{ height: "90vh" }}>
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp