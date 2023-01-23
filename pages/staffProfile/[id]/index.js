/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import EmployeeImageUpload from '../../../components/EmployeeImageUpload';
import { db } from '../../../src/config/firebase.config';


export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, "employees"));
    const paths = snapshot.docs.map((doc) => {
      return {
        params: { id: doc.id.toString() },
      };
    });
    return {
      paths,
      fallback: true,
    };
  };
  
  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    const staffProps = docSnap.data();
    staffProps.id = id;
    return {
      props: { staffProps: JSON.stringify(staffProps) || null },
      revalidate: 1,
    };
  };


function StaffProfile({staffProps}) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const router = useRouter();

    if (router.isFallback) return <div>...Loading</div>;

    const staff = JSON.parse(staffProps);

  return (
    <div>
        <div>
            <h1>{staff.name}</h1>
        </div>
        <div className='blocTabs'>
            <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>Info</div>
            <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>Photos</div>
        </div>
        <div id="info" className={toggleState === 1 ? "content  activeContent" : "content"}>
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
        </div>
        <div id="contacts"  className={toggleState === 2 ? "content  activeContent" : "content"}>
            <h1>Photos</h1>
            <div>
                <EmployeeImageUpload staff={staff} />
            </div>
        </div>
        <style jsx>{`
            .flexWrapper {
                display: flex;
                justify-content: start;
                padding: 50px 20px;
                gap: 50px;
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
        `}</style>
    </div>
  )
}

export default StaffProfile