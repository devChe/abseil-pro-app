/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";
import Link from 'next/link';


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
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const router = useRouter();

  //so the data will go first to the fallback while loading is not done
  if (router.isFallback) return <div>...Loading</div>;

  const quote = JSON.parse(quoteProps);

  const date = `${
    !quote.date
      ? ""
      : new Date(quote.date.seconds * 1000).toLocaleDateString("en-US")
  }`;
  const validTo = `${
    !quote.validDate
      ? ""
      : new Date(quote.validDate.seconds * 1000).toLocaleDateString(
          "en-US"
        )
  }`;

  const clientsCollectionRef = collection(db, "clients");

    useEffect(() => {
        const getClients = async () => {
            const clientName = quote.client;
            const q = query(clientsCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
            console.log(res);
            const currentClient = res.find((client) => client.name === clientName);
            setClientId(currentClient.id);
            
        }
        getClients();
    }, [])
  
  return (
    <div>
      <h1>
        {quote.quoteNumber} - {quote.name}
      </h1>
      <hr/>
      <div>
        <h2>Quote Information</h2>
        <table border='0' cellPadding='0'>
          <tbody>
            <tr>
              <td className='viewLabel'>
                <label>Quote No.:</label>
              </td>
              <td className='viewCell'>
                {quote.quoteNumber}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Date:</label>
              </td>
              <td className='viewCell'>
                <div>
                  {!date ? "DD / MM / YYYY" : dateFormat(date, "dd mmm yyyy")}
                </div>
              </td>
              <td className='viewLabel'>
                <label>Valid To:</label>
              </td>
              <td className='viewCell'>
                <div>
                  {!validTo ? "DD / MM / YYYY" : dateFormat(validTo, "dd mmm yyyy")}
                </div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Client:</label>
              </td>
              <td className='viewCell' style={{color:"blue"}}>
                <Link href="/clientProfile/[id]" as={`/clientProfile/${clientId}`} onClick={() => window.location.href.replace("quoteProfile/","" )}>
                    {quote.client}
                </Link>
              </td>
              <td className='viewLabel'>
                <label>Contact:</label>
              </td>
              <td className='viewCell' style={{color:"blue"}}>
                <div>{quote.contact}</div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Name:</label>
              </td>
              <td className='viewCell'>
                {quote.name}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Description:</label>
              </td>
              <td colSpan={3} className='viewCellmulti'>
                <div style={{lineHeight:"normal"}} dangerouslySetInnerHTML={{ __html: quote.description,}}></div>
              </td>
            </tr>
            <tr>
              <td className='viewLabel'>
                <label>Budget:</label>
              </td>
              <td className='viewCell'>
                {quote.budget}
              </td>
              <td className='viewLabel'></td>
              <td className='viewCell'></td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <style jsx>{`
        .viewLabel {
          color: #333;
          font-weight: bold;
          width: 170px;
          vertical-align: text-top;
          padding-left: 0;
          padding-top: 7px;
          padding-bottom: 7px;
        }

        .viewCell {
          width: 200px;
          vertical-align: text-top;
        }

        .viewCellmulti {
          width: 570px;
          padding-top: 7px;
          padding-bottom: 7px;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  )
}

export default quoteProfile