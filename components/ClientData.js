/* eslint-disable @next/next/link-passhref */
import React, {useState} from 'react'
import Link from 'next/link'
import { async } from '@firebase/util'
import { db } from '../src/config/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'


const ClientData = ({client}) => {

  const [modal, setModal] = useState(false)

  const deleteClient = async (id) => {
    const clientDoc = doc(db, "clients", id);
    await deleteDoc(clientDoc);
    window.location.reload(false)
  }
  
  return (
    <>
        
            <tr key={client.id} >
                <Link href={"/" + client.id}><td>{client.name}</td></Link>
                <Link href={"/" + client.id}><td>{client.phone}</td></Link>
                <Link href={"/" + client.id}><td>{client.email}</td></Link>
                <td><button type='submit' onClick={() => {deleteClient(client.id)}}>Delete</button></td>
            </tr>
        <style jsx>{`
            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:hover {
              background: lightgrey;
              color: white;
              cursor: pointer;
            }

            tr:active {
              background: darkgrey;
            }

            button:hover {
              background: red;
              
            }

        `}</style>
    </>
  )
}

export default ClientData