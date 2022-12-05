/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react'
import { db } from '../../../src/config/firebase.config';


export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'employees'));
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
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    const staffProps = docSnap.data();
    staffProps.id = id;
    return {
        props: { staffProps: JSON.stringify(staffProps) || null}
    }
}

function StaffProfile({staffProps}) {
    const router = useRouter();

    const staff = JSON.parse(staffProps);

  return (
    <div>
        <div className='flexWrapper'>
            <div>
                <img src={staff.photo} width="300" height="300"/>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <label>Name:</label>
                        </td>
                        <td>
                            {staff.name}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Position:</label>
                        </td>
                        <td>
                            {staff.position}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Phone:</label>
                        </td>
                        <td>
                            {staff.phone}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Email:</label>
                        </td>
                        <td>
                            {staff.email}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Qualifications:</label>
                        </td>
                        <td>
                            {staff.qualifications}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>IRATA:</label>
                        </td>
                        <td>
                            <img src={staff.irata} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Working at Heights:</label>
                        </td>
                        <td>
                            <img src={staff.workingAtHeights} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>White Card:</label>
                        </td>
                        <td>
                            <img src={staff.whiteCard} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Trade 1:</label>
                        </td>
                        <td>
                            <img src={staff.tradeOne} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Trade 2:</label>
                        </td>
                        <td>
                            <img src={staff.tradeTwo} width="200" />  
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>EWP:</label>
                        </td>
                        <td>
                            <img src={staff.ewp} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Drivers License:</label>
                        </td>
                        <td>
                            <img src={staff.driversLicense} width="200" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Signature:</label>
                        </td>
                        <td>
                            <img src={staff.signature} width="200" />
                        </td>
                    </tr>

                </table>
            </div>
        </div>
        <style jsx>{`
            .flexWrapper {
                display: flex;
                justify-content: start;
                padding: 50px 20px;
                gap: 50px;
            }
        `}</style>
    </div>
  )
}

export default StaffProfile