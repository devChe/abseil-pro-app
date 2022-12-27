/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, docs, getDocs, orderBy, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { db } from '../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";

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
        <button><Link href="/newQuote">+ New</Link></button>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>Quote No.</th>
                    <th>Name</th>
                    <th>Client</th>
                    <th>State</th>
                    <th>Valid until</th>
                    <th>Amount</th>
                </tr>
            </thead>
                {quotes.map((quote) => {
                    const validDate = `${!quote.validDate ? "" : new Date(quote.date.seconds * 1000).toLocaleDateString("en-US")}`;
                    return (
                    <>
                        <tr key={quote.id}>
                        <Link  href="quoteProfile/[id]" as={`quoteProfile/${quote.id}`} key={quote.id} legacyBehavior><td className="quoteNumber">{quote.quoteNumber}</td></Link>
                            <td>{quote.name}</td>
                            <td>{quote.client}</td>
                            <td>{quote.state ? quote.state : "draft"}</td>
                            <td>{!validDate ? "DD / MM / YYYY" : dateFormat(validDate, "dd mmm yyyy")}</td>
                            <td>{quote.total}</td>
                        </tr>
                    </>
                    )
                }
            )}
            
        </table>
        <style jsx>{`
        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 1em;
            font-family: sans-serif;
            min-width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        button {
            padding: 8px 12px;
            margin-left: 0;
            margin-top: 0;
            margin-right: 0;
            display: inline-block;
            background: #fff;
            background: linear-gradient(to bottom, #fff, #e6eaec);
            border-radius: 3px;
            border-width: 1px;
            border-style: solid;
            border-color: #ccc;
            box-shadow: 0 0 0 1px inset rgb(255 255 255 / 30%);
            color: #048abb;
            font-size: 12px;
            font-weight: bold;
            text-decoration: none;
            height: auto;
            top: auto;
          }
  
          button:hover {
            text-decoration: none;
            background: linear-gradient(to bottom, #fcfcfc, #e0e5e8);
            border-color: #0382b3;
          }

          .quoteNumber:hover {
            cursor: pointer;
            color: blue;
          }

        `}</style>
    </div>
  )
}

export default Quotes