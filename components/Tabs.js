/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import { db } from '../src/config/firebase.config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import ClientData from './ClientData';

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [clients, setClients] = useState([]);
    //THE VALUE OF THE SEARCH FIELD
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    //THE SEARCH RESULT
    const [searchResult, setSearchResult] = useState([])

    const clientsCollectionRef = collection(db, "clients");

    useEffect(() => {
        const getClients = async () => {
            const q = query(clientsCollectionRef, orderBy("name"));
            const data = await getDocs(q);
            setClients(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getClients();
    }, [])

    const toggleTab = (index) => {
        setToggleState(index);
    };


    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = clients.filter(client => {
            return client.name.toLowerCase().includes(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
          });
          setSearchResult(results);
        } else {
          setSearchResult(clients);
          // If the text field is empty, show all users
        }
    
        setName(keyword);
      };




    return (
        <>
            <div className='container'>
                <div className='row'>
                    <input className="ten columns" type="text" placeholder="Search" value={name}  onChange={filter} />
                    <Link href={'/newClient'}><button className='button-primary two columns'>+ New</button></Link>
                </div>
                <div className='blocTabs'>
                    <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>Clients</div>
                    <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>Contacts</div>
                </div>
                <div className='contentTabs'>
                    <div id="clients" className={toggleState === 1 ? "content  activeContent" : "content"}>
                        <h5>Clients</h5>
                        <hr />
                        <table>
                            <thead>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </thead>
                            {searchResult && searchResult.length > 0 ? (
                            searchResult.map((client) => (
                                <ClientData client={client} />
                            ))
                            ) : (
                                clients.map((client) => (
                                    <ClientData client={client} />
                                ))
                            )}
                            
                        </table>
                    </div>
                    <div id="contacts"  className={toggleState === 2 ? "content  activeContent" : "content"}>
                        <h5>Contacts</h5>
                        <hr />
                        <center>List of Contacts</center>
                    </div>
                </div>
            </div>
            <style jsx>{`
            *, ::before, ::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                background: #fff;
            }

            .container {
                display: flex;
                flex-direction: column;
                position: relative;
                background: #f1f1f1;
                margin: 50px auto 50px;
                word-break: break-all;
                border: 1px solid rgba(0, 0, 0, 0.274);
            }

            .row {
                padding: 10px 15px;
                display: flex;
                gap: 15px;
            }

            .blocTabs {
                display: flex;
            }



            .tabs {
                padding: 15px;
                text-align: center;
                width: 50%;
                background: rgba(128, 128, 128, 0.075);
                cursor: pointer;
                border-bottom: 1px solid rgba(0, 0, 0, 0.274);
                box-sizing: content-box;
                position: relative;
                outline: none;
            }

            .tabs:not(:last-child){
                border-right: 1px solid rgba(0, 0, 0, 0.274);
            }

            .activeTabs  {
                background: white;
                border-bottom: 1px solid transparent;
            }

            .activeTabs::before {
                content: "";
                display: block;
                position: absolute;
                top: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(100% + 2px);
                height: 5px;
                background: rgb(88, 147, 241);
            }

            button {
                border: none;
            }
            .contentTabs {
                flex-grow : 1;
            }
            .content {
                background: white;
                padding: 20px;
                width: 100%;
                height: 100%;
                display: none;
            }
            
            .activeContent {
                display: block;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
            `}</style>
        </>
    )
}

export default Tabs