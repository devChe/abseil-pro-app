/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddEmployeeForm from '../components/AddEmployeeForm';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../src/config/firebase.config';
import Link from 'next/link';


const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  const employeesCollectionRef = collection(db, "employees");

  useEffect(() => {
    const getEmployee = async () => {
      const q = query(employeesCollectionRef, orderBy("name"))
      onSnapshot(q, (snapshot) => {
        const res = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setEmployees(res);
      })
    }
    getEmployee()
  }, [])



  function onCloseModal() {
    setOpen(false);
  }

  const deleteEmployee = async (id) => {
    const employeeDoc = doc(db, "employees", id);
    await deleteDoc(employeeDoc);
  }

  return (
    <div>
      <h1>Employees</h1>
      <button onClick={() => setOpen(true)}>+ New</button>
      <Modal open={open} onClose={onCloseModal} center>
            <AddEmployeeForm setOpen={setOpen} employees={employees} />
      </Modal>
      <table className='styled-table'>
        <thead>
          <tr>
            {/* <th>
              No.
            </th> */}
            <th>
              Name
            </th>
            <th>
              Position
            </th>
            <th>
              Phone
            </th>
            <th>
              Email
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        {employees ? (
          employees.map(employee => 
            (
                <tr key={employee.id}>
                  {/* <td>{employee.data.num}</td> */}
                  <Link  href="staffProfile/[id]" as={`staffProfile/${employee.id}`} key={employee.id} className="staffName"><td>{employee.data.name}</td></Link>
                  <td>{employee.data.position}</td>
                  <td>{employee.data.phone}</td>
                  <td>{employee.data.email}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => {deleteEmployee(employee.id)}}>Delete</button>
                  </td>
                </tr>
            )
          )
        ) : (
          "Please add employee"
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

          .staffName:hover {
            color: #0382b3;
          }
        `}</style>
    </div>
  )
}

export default employees