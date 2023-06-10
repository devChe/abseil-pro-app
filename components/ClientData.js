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
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td>{client.name}</td></Link>
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td>{client.phone}</td></Link>
        <Link href="clientProfile/[id]" as={`clientProfile/${client.id}`}><td>{client.email}</td></Link>
        <td style={{textAlign:"center"}}><span onClick={() => {deleteClient(client.id)}} className='trashIcon' />Delete</td>
      </tr>
      <style jsx>{`
          td, th {
            border: 1px solid #dddddd;
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