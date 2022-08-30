/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { db } from '../../src/config/firebase.config'
import { collection, doc, getDocs, getDoc, updateDoc, getItem } from 'firebase/firestore'

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'suppliers'));
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
    const docRef = doc(db, "suppliers", id);
    const docSnap = await getDoc(docRef);
    const supplierProps = docSnap.data();
    supplierProps.id = id;
    return {
        props: { supplierProps: JSON.stringify(supplierProps) || null}
    }
}

function post({supplierProps}) {
    

    const router = useRouter();

    //so the data will go first to the fallback while loading is not done
    if(router.isFallback)
        return <div>...Loading</div>
        
    const supplier = JSON.parse(supplierProps);

    const databaseRef = collection(db, 'suppliers')

    const [edit, isEdit] = useState(false);
    const [updateName, setUpdateName] = useState("");
    const [updateAddress, setUpdateAddress] = useState("");
    const [UpdatePostal, setUpdatePostal] = useState("");
    const [Updateontact, setUpdateContact] = useState("");
    const [UpdateFax, setUpdateFax] = useState("");
    const [UpdateWebsite, setUpdateWebite] = useState("");
    const [UpdateZero, setUpdateZero] = useState("");

    const editHandler = () => {
        isEdit(true);
    }

    const updateClient = async (id, name) => {
        const clientDoc = doc(db, "suppliers", id);
        const newFields = { name: newName }
        await updateDoc(clientDoc, newFields);
        window.location.reload(false);
    }
    
    return (
        <>
            {edit ? (
                <div className='container'>
                    <label>Edit Name</label>
                    <div><input type="text" placeholder={client.name} onChange={(event) => setNewName(event.target.value)} /></div>
                    <button type="submit" onClick={() => {updateClient(client.id, client.name)}}>Save</button>
                </div>
            ) : (
                // <div className='container'>
                //     <div>Client name: {client.name}</div>
                //     <div>Client phone: {client.phone}</div>
                //     <div>Client email: {client.email}</div> 
                //     <button onClick={editHandler}>Edit</button>
                // </div>
                <div>
                    <div>
                        <div className='mngrLabel'>Supplier Manager</div>
                        <h2 className='supplierName'>{supplier.supplierName}</h2>
                    </div>
                    <hr></hr>
                    <div className='info'>
                        <h3>General Information</h3>
                        <label>Supplier Name</label>
                        <div className='name'>{supplier.supplierName}</div>
                        <h3>Contact Information</h3>
                        <label>Address</label>
                        <div>{supplier.address}</div>
                        <label>Postal Address</label>
                        <div>{supplier.postalAddress}</div>
                        <label>Phone</label>
                        <div>{supplier.phone}</div>
                        <label>Fax</label>
                        <div>{supplier.fax}</div>
                        <label>Website</label>
                        <div className='site'><a href={supplier.website} target="_blank">{supplier.website}</a></div>
                        <h3>Financial Information</h3>
                        <label>Zero Rated GST</label>
                        <div>{supplier.zeroRatedGST}</div>
                        <button onClick={editHandler}>Edit</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                .mngrLabel {
                    color: blue;
                }
                .supplierName {
                    margin: 0;
                }

                .info {
                    margin-bottom: 50px;
                }

                label {
                    margin-top: 15px;
                }

                .name {
                    margin-bottom: 15px;
                }

                .site {
                    margin-bottom: 15px;
                }

            `}</style>
        </>       
    );
}
 
export default post;


