/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../../src/config/firebase.config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  getItem,
  arrayUnion,
  query,
  orderBy,
} from "firebase/firestore";
import Modal from "react-modal";
import NewContactForm from "../../../components/NewContactForm";
import dateFormat, { masks } from "dateformat";
import ClientImageUpload from "../../../components/ClientImageUpload";


export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "clients"));
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
  const docRef = doc(db, "clients", id);
  const docSnap = await getDoc(docRef);
  const clientProps = docSnap.data();
  clientProps.id = id;
  return {
    props: { clientProps: JSON.stringify(clientProps) || null },
    revalidate: 1
  };
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99999",
    width: "50vw",
    textAlign: "center",
  },
};

function clientProfile({ clientProps }) {
  const router = useRouter();

  //so the data will go first to the fallback while loading is not done
  if (router.isFallback) return <div>...Loading</div>;

  const client = JSON.parse(clientProps);

  const databaseRef = collection(db, "clients");

  const [edit, isEdit] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [newName, setNewName] = useState("");
  const [modalIsOpenContactModal, setIsOpenContactModal] = useState(false);
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactPosition, setNewContactPosition] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [quoteNumber, setQuoteNumber] = useState("");

  const editHandler = () => {
    isEdit(true);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const updateClient = async (id, name) => {
    const clientDoc = doc(db, "clients", id);
    await updateDoc(clientDoc, {
      name: newFields,
    });
    window.location.reload(false);
  };

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
        position: newContactPosition,
      }),
    });
    window.location.reload(false);
  };

  const quotesCollectionRef = collection(db, "quotes");

  useEffect(() => {
    const getQuotes = async () => {
      const q = query(quotesCollectionRef, orderBy("quoteNumber"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuotes(res);
      setQuoteNumber(res.map(r => r.number))
    };
    getQuotes();
  }, []);
  

  return (
    <>
      <div>
        <div>
          <h1 style={{ fontWeight: "bold", color: "#ff0000" }}>
            {client.name}
          </h1>
          <Link href="[id]/[slug]" as={`${client.id}/${client.slug}`}>
            <button>+ New Quote</button>
          </Link>
          <Link href="[id]/edit/[slug]" as={`${client.id}/edit/${client.slug}`}>
            <button>Edit Client</button>
          </Link>
          
        </div>
        <div className="blocTabs">
          <div
            className={toggleState === 1 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Detail
          </div>
          <div
            className={toggleState === 2 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Quote
          </div>
          <div
            className={toggleState === 3 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Photo
          </div>
        </div>
        <div
          id="clients"
          className={toggleState === 1 ? "content  activeContent" : "content"}
          style={{ overflowX: "auto" }}
        >
          <h1>Details</h1>
          {edit ? (
            <div className="clientContainer">
              <label>Edit Name</label>
              <div>
                <input
                  type="text"
                  placeholder={client.name}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={() => {
                  updateClient(client.id, client.name);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <div
              className="clientContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="contentWrapper">
                <div className="leftSideContent">
                  <div>
                    <a href="https://placeholder.com/200">
                      {client.image ? (<img src={client.image} width={200}/>) : (
                        <img src="https://via.placeholder.com/200" />
                      )}
                      
                    </a>
                  </div>
                  <div></div>
                </div>
                <div style={{ width: "100%" }}>
                  <h4>Client Information</h4>
                  <div className="tableWrapper">
                    <table>
                      <tr>
                        <td>
                          <label>Phone</label>
                        </td>
                        <td>{client.phone}</td>
                      </tr>
                      <tr>
                        <td>
                          <label>Website</label>
                        </td>
                        <td>{client.website}</td>
                      </tr>
                      <tr>
                        <td>
                          <label>Physical Address</label>
                        </td>
                        <td>{client.physical_address}</td>
                      </tr>
                      <tr>
                        <td>
                          <label>Postal Address</label>
                        </td>
                        <td>{client.postal_address}</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4>Contacts</h4>
                      <button onClick={() => setIsOpenContactModal(true)}>
                        Add Contacts
                      </button>
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

                        <button
                          className="modalBtn heightSafetyBtn"
                          onClick={closeModal}
                        >
                          close
                        </button>
                      </Modal>
                    </div>
                  </div>
                  <div className="tableWrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                      {client.contacts ? (
                        client.contacts.map((contact) => (
                          <tr>
                            <td>{contact.name}</td>
                            <td>{contact.position}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                          </tr>
                        ))
                      ) : (
                        <div
                          style={{
                            padding: "20px",
                            position: "absolute",
                            transform: "translate(200%, 10px)",
                          }}
                        >
                          ADD CONTACTS
                        </div>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          id="clients"
          className={toggleState === 2 ? "content  activeContent" : "content"}
          style={{ overflowX: "auto" }}>
            <h1>Active Quotes</h1>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>Quote No.</th>
                        <th>Name</th>
                        <th>Client</th>
                        <th>State</th>
                        <th>Valid until</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                    {quotes?.filter((q) => (q?.client === client?.name) && (q?.state === "Issued" || q?.state === "Draft")).map((quote) => {
                        const validDate = `${!quote.validDate ? "" : new Date(quote.date.seconds * 1000).toLocaleDateString("en-US")}`;
                        return (
                        <>
                            <tr key={quote.id}>
                            <td className="quoteNumber"><Link href="/quoteProfile/[id]" as={`/quoteProfile/${quote.id}`} onClick={() => window.location.href.replace("clientProfile/","" )} key={quote.id}>{quote.quoteNumber}</Link></td>
                                <td>{quote.name}</td>
                                <td>{quote.client}</td>
                                <td>{quote.state}</td>
                                <td>{!validDate ? "DD / MM / YYYY" : dateFormat(validDate, "dd mmm yyyy")}</td>
                                <td>{quote.total}</td>
                            </tr>
                        </>
                        )
                    }
                )}
                
            </table>

            <h1>Archived Quotes</h1>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>Quote No.</th>
                        <th>Name</th>
                        <th>Client</th>
                        <th>State</th>
                        <th>Valid until</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                    {quotes?.filter((q) => (q?.client === client?.name) && (q?.state === "Accepted" || q?.state === "Declined" || q?.state === "Revise")).map((quote) => {
                        const validDate = `${!quote.validDate ? "" : new Date(quote.date.seconds * 1000).toLocaleDateString("en-US")}`;
                        return (
                        <>
                            <tr key={quote.id}>
                            <td className="quoteNumber"><Link  href="/quoteProfile/[id]" as={`/quoteProfile/${quote.id}`} onClick={() => window.location.href.replace("quoteProfile/","" )} key={quote.id}>{quote.quoteNumber}</Link></td>
                                <td>{quote.name}</td>
                                <td>{quote.client}</td>
                                <td>{quote.state}</td>
                                <td>{!validDate ? "DD / MM / YYYY" : dateFormat(validDate, "dd mmm yyyy")}</td>
                                <td>{quote.total}</td>
                            </tr>
                        </>
                        )
                    }
                )}
                
            </table>
        </div>
        <div
          id="clients"
          className={toggleState === 3 ? "content  activeContent" : "content"}
          style={{ overflowX: "auto" }}
        >
          <h1>Photos</h1>
          <hr/>
          <ClientImageUpload client={client} />
        </div>
      </div>

      <style jsx>{`
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

        .blocTabs {
            display: flex;
            margin-top: 40px;
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

        .tableWrapper {
            overflow-x: auto;
        }

        .quoteNumber {
          color: blue;
        }

        .quoteNumber:hover {
          text-decoration: underline;
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
