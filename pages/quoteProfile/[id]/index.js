/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../../src/config/firebase.config';



export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "quotes"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "quotes", id);
  const docSnap = await getDoc(docRef);
  const quoteProps = docSnap.data();
  quoteProps.id = id;
  return {
    props: { quoteProps: JSON.stringify(quoteProps) || null },
  };
};
const quoteProfile = ({quoteProps}) => {
  const router = useRouter();

  //so the data will go first to the fallback while loading is not done
  if (router.isFallback) return <div>...Loading</div>;

  const quote = JSON.parse(quoteProps);
  
  return (
    <div>
      <h1>ALL QUOTES DATA FROM <span style={{color:"blue"}}>{quote.client}</span></h1>
    </div>
  )
}

export default quoteProfile