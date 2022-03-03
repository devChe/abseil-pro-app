import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import '../src/config/firebase.config'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import 'react-skeleton-css/styles/normalize.3.0.2.css'
import { auth } from '../src/config/firebase.config'
import { onAuthStateChanged, currentUser, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from "firebase/app";
import { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from 'next/router'
import { AuthCheck } from '../components/AuthCheck'


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500
    });
  }, []);

  if (router.pathname != "/")
    return (
      <AuthCheck>
        <Layout>
          <Head>
            <title>ABSEIL PRO SYSTEM MANAGEMENT APP</title>
            <meta name="description" content="Abreil Pro System" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className='rightSideContent'>
            <Component {...pageProps} />
          </div>
        </Layout>
      </AuthCheck>
    )
  else {
    return (
      <>
        <Head>
          <title>ABSEIL PRO SYSTEM MANAGEMENT APP</title>
          <meta name="description" content="Abreil Pro System" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container' style={{ height: "90vh" }}>
          <Component {...pageProps} />
        </div>
      </>

    )
  }


}

export default MyApp
