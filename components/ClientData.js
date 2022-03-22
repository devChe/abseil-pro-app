/* eslint-disable @next/next/link-passhref */
import React, {useState} from 'react'
import Link from 'next/link'
import { async } from '@firebase/util'
import { db } from '../src/config/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


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
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td style={{textAlign:"center"}}>{client.name}</td></Link>
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td>{client.phone}</td></Link>
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td>{client.email}</td></Link>
        <td><FontAwesomeIcon icon={faTrashCan} onClick={() => {deleteClient(client.id)}} width="35" className='trashIcon' /></td>
      </tr>
      <style jsx>{`
          td, th {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;
            white-space: nowrap;
          }
          
          tr:hover {
            background: lightgrey;
            color: white;
            cursor: pointer;
          }
          
          tr:active {
            background: darkgrey;
          }

          trashIcon:active {
            background: red;
          }
          
        `}</style>
    </>
  )
}

export default ClientData