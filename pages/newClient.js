/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { collection, addDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../src/config/firebase.config'
import { async } from '@firebase/util';

const newClient = () => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newWebsite, setNewWebsite] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPostal, setNewPostal] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactPosition, setNewContactPosition] = useState("");

  
  const clientsCollectionRef = collection(db, "clients");

  const createClient = async () => {
    await addDoc(clientsCollectionRef, { 
      name: newName, 
      phone: Number(newPhone),
      email: newEmail, 
      website: newWebsite,
      physical_address: newAddress,
      postal_address: newPostal,
      contacts: arrayUnion({ 
        email: newContactEmail,
        name: newContactName,
        phone: Number(newContactPhone),
        position: newContactPosition
      }), 
    });
    window.location.pathname="/clients";
  }

  return (
    <>
      <h1>New Client</h1>
      <hr/>
      <div className='mainWrapper'>
        <div className='contentWrapper'>
          <div>
              <h5>Client Details</h5>
              <div>
                <label>Client Name</label>
                <input  onChange={(event) => {setNewName(event.target.value)}} />
              </div>
              <div>
                <label>Contact Number</label>
                <input onChange={(event) => {setNewPhone(event.target.value)}} />
              </div>
              <div>
                <label>Email</label>
                <input onChange={(event) => {setNewEmail(event.target.value)}} />
              </div>
              <div>
                <label>Website</label>
                <input onChange={(event) => {setNewWebsite(event.target.value)}} />
              </div>
              <div>
                <label>Physical Address</label>
                <input onChange={(event) => {setNewAddress(event.target.value)}} />
              </div>
              <div>
                <label>Postal Address</label>
                <input onChange={(event) => {setNewPostal(event.target.value)}} />
              </div>
            </div>
            {/* CONTACT PERSON */}
            <div>
              <h5>Contact Person</h5>
              <div>
                  <div>
                      <label>Contact Name</label>
                      <input value={newContactName} onChange={(e) => setNewContactName(e.target.value)} />
                  </div>
                  <div>
                      <label>Contact Phone</label>
                      <input value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} />
                  </div>
                  <div>
                      <label>Contact Email</label>
                      <input value={newContactEmail} onChange={(e) => setNewContactEmail(e.target.value)} />
                  </div>
                  <div>
                      <label>Contact Position</label>
                      <input value={newContactPosition} onChange={(e) => setNewContactPosition(e.target.value)} />
                  </div>
              </div>
            </div>
          
        </div>
        <div style={{textAlign:"center",padding:"5%"}}>
          <button type="submit" onClick={createClient}>Submit</button>
        </div>
        
          
      </div>
      

      <style jsx>{`
        .mainWrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100vh;
        }

        .contentWrapper {
          display: flex;
          justify-content: center;
          gap: 12%;
        }

        button:active {
          background: darkgrey;
        }

        input {
          border: 1px solid #ececec;
          padding: 9px;
          width: 100%;
          margin-bottom: 5%;
        }

        

        input:focus-visible {
          outline: none;
          border: 2px solid lightblue;
        }

        @media screen and (max-width: 990px) {
          .mainWrapper {
            height: auto;
          }
 
          .contentWrapper {
            display: block;
          }

          h5 {
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

export default newClient