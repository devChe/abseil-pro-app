/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { db } from '../../src/config/firebase.config'
import { collection, doc, getDocs, getDoc, updateDoc, getItem, arrayUnion } from 'firebase/firestore';
import Modal from "react-modal";
import NewContactForm from '../../components/NewContactForm';

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'clients'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: { id: doc.id.toString() }
        }
    })
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const docRef = doc(db, "clients", id);
    const docSnap = await getDoc(docRef);
    const clientProps = docSnap.data();
    clientProps.id = id;
    return {
        props: { clientProps: JSON.stringify(clientProps) || null}
    }
}

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "99999",
      background: "#F6F7F9",
      width: "50vw",
      textAlign: "center"
    },
  };

function clientProfile({clientProps}) {
    const router = useRouter();

    //so the data will go first to the fallback while loading is not done
    if(router.isFallback)
        return <div>...Loading</div>
        
    const client = JSON.parse(clientProps);

    const databaseRef = collection(db, 'clients')

    const [edit, isEdit] = useState(false);
    const [newName, setNewName] = useState("");
    const [modalIsOpenContactModal, setIsOpenContactModal] = useState(false);
    const [newContactEmail, setNewContactEmail] = useState("");
    const [newContactName, setNewContactName] = useState("");
    const [newContactPhone, setNewContactPhone] = useState("");
    const [newContactPosition, setNewContactPosition] = useState("");

    const editHandler = () => {
        isEdit(true);
    }

    const updateClient = async (id, name) => {
        const clientDoc = doc(db, "clients", id);
        const newFields = { name: newName }
        await updateDoc(clientDoc, newFields);
        window.location.reload(false);
    }

    let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpenContactModal(false);
    }

    const addContact = async () => {
        const id = client.id;
        const clientDoc = doc(db, "clients", id);
        await updateDoc(clientDoc, {
          contacts: arrayUnion({ 
            email: newContactEmail,
            name: newContactName,
            phone: Number(newContactPhone),
            position: newContactPosition
        }),
        });
        window.location.reload(false);
      };
    
    return (
        <>
            {edit ? (
                <div className='clientContainer'>
                    <label>Edit Name</label>
                    <div><input type="text" placeholder={client.name} onChange={(event) => setNewName(event.target.value)} /></div>
                    <button type="submit" onClick={() => {updateClient(client.id, client.name)}}>Save</button>
                </div>
            ) : (
                <div className='clientContainer' style={{display:"flex",flexDirection:"column",justifyContent:"center",}}>
                    {/* <div>Client name: {client.name}</div>
                    <div>Client phone: {client.phone}</div>
                    <div>Client email: {client.email}</div> 
                    <button onClick={editHandler}>Edit</button> */}
                    <h1 style={{fontWeight:"bold",color:"#ff0000"}}>{client.name}</h1>
                    <div className='contentWrapper'>
                        <div className='leftSideContent'>
                            <div>
                                <a href="https://placeholder.com/200"><img src="https://via.placeholder.com/200" /></a>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div style={{width:"100%"}}>
                            <h4>Client Information</h4>
                            <div className='tableWrapper'>
                                <table>
                                    <tr>
                                        <td><label>Phone</label></td>
                                        <td>{client.phone}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Website</label></td>
                                        <td>{client.website}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Physical Address</label></td>
                                        <td>{client.physical_address}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Postal Address</label></td>
                                        <td>{client.postal_address}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <h4>Contacts</h4>
                                    <button onClick={() => setIsOpenContactModal(true)}>Add Contacts</button>
                                </div>
                                <div className="modal">
                                    <Modal
                                        isOpen={modalIsOpenContactModal}
                                        onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        
                                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                                            New Contact Form
                                        </h2>
                                        
                                        <div>
                                            <NewContactForm 
                                                client={client} 
                                                addContact={addContact} 
                                                email={newContactEmail}
                                                setEmail={setNewContactEmail}
                                                name={newContactName}
                                                setName={setNewContactName}
                                                phone={newContactPhone}
                                                setPhone={setNewContactPhone}
                                                position={newContactPosition}
                                                setPosition={setNewContactPosition}
                                            />
                                        </div>

                                        <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                                        close
                                        </button>
                                    </Modal>
                                </div>
                            </div>
                            <div className='tableWrapper'>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Contact no.</th>
                                        <th>Email</th>
                                    </tr>
                                    {client.contacts ? client.contacts.map(contact => (
                                        <tr>
                                            <td>{contact.name}</td>
                                            <td>{contact.position}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.email}</td>
                                        </tr>
                                    )): 
                                        <div style={{padding:"20px",position:"absolute",transform: "translate(200%, 10px)"}}>ADD CONTACTS</div>
                                    
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx="true">{`
                .contentWrapper {
                    height: 100vh; 
                    display: flex;
                    padding: 20px;
                    gap: 40px;
                    margin-bottom: 50px;
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
                    padding: 8px;
                    white-space: nowrap;
                }
    
                tr:nth-child(even) {
                    background-color: #dddddd;
                }

                @media screen and (max-width: 990px) {
                    .contentWrapper {
                        flex-direction: column;
                    }

                    .leftSideContent {
                        text-align: center;
                    }
                }
            `}</style>        
        </>       
    );
}
 
export default clientProfile;


