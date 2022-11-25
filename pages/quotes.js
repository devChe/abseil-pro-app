/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, docs, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../src/config/firebase.config';



const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [job, setJob] = useState([]);
    const [quoteNumber, setQuoteNumber] = useState('');


    const quotesCollectionRef = collection(db, "quotes");
    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        const getQuotes = async () => {
          const q = query(quotesCollectionRef, orderBy("quoteNumber"));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQuotes(res);
          setQuoteNumber(res.map(r => r.number))

    
        };
        getQuotes();
      }, []);

      useEffect(() => {
        const getJobs = async () => {
          const q = query(jobsCollectionRef, orderBy("name"));
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log(res);
    
        };
        getJobs();
      }, []);

  return (
    <div>
        <h1>Quotes</h1>
        <table>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Client</th>
                <th>State</th>
                <th>Valid until</th>
                <th>Amount</th>
            </tr>
            
                {quotes.map((quote) => (
                    <>
                        <tr key={quote.id}>
                            <td>{quote.quoteNumber}</td>
                            <td>{quote.name}</td>
                            <td>{quote.client}</td>
                            <td>draft</td>
                            <td>{quote.validDate}</td>
                            <td>{quote.total}</td>
                        </tr>
                    </>
                )
            )}
            
        </table>
        <style jsx>{`
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        `}</style>
    </div>
  )
}

export default Quotes