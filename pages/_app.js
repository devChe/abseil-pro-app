/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../src/config/firebase.config";
// import "react-skeleton-css/styles/skeleton.2.0.4.css";
// import "react-skeleton-css/styles/normalize.3.0.2.css";
import { auth } from "../src/config/firebase.config";
import {
  onAuthStateChanged,
  currentUser,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/app";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { AuthCheck } from "../components/AuthCheck";
import "react-datepicker/dist/react-datepicker.css";
import ErrorBoundary from "../components/ErrorBoundary";
import JobContextProvider from "../context/jobContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url) => (url !== router.asPath) && setLoading(true);
      const handleComplete = (url) => (url === router.asPath) && setLoading(false);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  
  return loading && (<LoadingSpinner />);
}

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500,
    });
  }, []);

  if (router.pathname != "/")
    return (
      <AuthCheck>
        <Layout>
          <Head>
            <title>ABSEIL PRO SYSTEM MANAGEMENT APP</title>
            <meta name="description" content="Abseil Pro System" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {/* <script src="https://use.fontawesome.com/e6c3f5247b.js" /> */}
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4clmPx_bEwSwrVgprTEQYbRZgc7CKGcM&libraries=places" />
          </Head>
          <div className="rightSideContent">
            <ErrorBoundary>
              <JobContextProvider>
                <Loading/><Component {...pageProps} />
              </JobContextProvider>
            </ErrorBoundary>
          </div>
        </Layout>
      </AuthCheck>
    );
  else {
    return (
      <>
        <Head>
          <title>ABSEIL PRO SYSTEM MANAGEMENT APP</title>
          <meta name="description" content="Abreil Pro System" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container" style={{ height: "90vh" }}>
          <ErrorBoundary>
            <JobContextProvider>
              <Component {...pageProps} />
            </JobContextProvider>
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export default MyApp;
