/* eslint-disable @next/next/link-passhref */
import React from 'react'
import Link from 'next/link'

const ClientData = ({client}) => {
  return (
    <>
        <Link href={"/" + client.id} key={client.id}>
            <tr>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
            </tr>
        </Link>
        <style jsx>{`
            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }

            tr:hover {
              background: lightgrey;
              color: white;
              cursor: pointer;
            }

            tr:active {
              background: darkgrey;
            }

        `}</style>
    </>
  )
}

export default ClientData