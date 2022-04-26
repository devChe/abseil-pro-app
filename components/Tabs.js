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

    console.log(clients);
    

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
            <div className='row'>
                <input className="ten columns" type="text" placeholder="Search name here..." value={name}  onChange={filter} />
                <Link href={'/newClient'}><button className='button-primary two columns'>+ New</button></Link>
            </div>
            <div className='blocTabs'>
                <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>Clients</div>
                <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>Contacts</div>
            </div>
            <div id="clients" className={toggleState === 1 ? "content  activeContent" : "content"} style={{overflowX:"auto"}}>
                <h5>Clients</h5>
                <div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
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
            </div>
            <div id="contacts"  className={toggleState === 2 ? "content  activeContent" : "content"}>
                <h5>Contacts</h5>
                <hr />
                <center>List of Contacts</center>
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

        
            h5 {
                padding: 15px;
            }

            .row {
                padding: 15px 0;
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
                background: #E6EAEC;
            }

            button {
                border: none;
            }
            .contentTabs {
                flex-grow : 1;
            }
            .content {
                background: white;
                width: 100%;
                height: 100%;
                display: none;
            }
            
            .activeContent {
                display: block;
            }

            .tableWrapper {
                overflow-x: auto;
            }

            table {
                border-collapse: collapse;
                border-spacing: 0;
                width: 100%;
                margin: 0 0 50px;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }

            .isMobile {
                display: none;
            }

            @media screen and (min-width: 991px) {
                
            }

            @media screen and (max-width: 990px) {

                .isMobile {
                    display: block;
                }

                .container {
                    width: auto;
                }

                .row {
                    padding: 20px 15px;
                }

                .button-primary {
                    width: fit-content;
                    padding: 5px;
                }
            }
            `}</style>
        </>
    )
}

export default Tabs