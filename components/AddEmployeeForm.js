/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { getDownloadURL, listAll, ref, uploadBytes } from '@firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid';
import { auth, db, storage } from '../src/config/firebase.config';




const AddEmployeeForm = ({setOpen, employees}) => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [qualifications, setQualifications] = useState("");

    //FOR IMAGE UPLOAD
    const [imageUpload, setImageUpload] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [imageIRATAUpload, setImageIRATAUpload] = useState(null);
    const [imageIRATAURL, setImageIRATAURL] = useState("");
    const [imageWorkingHeightsUpload, setImageWorkingHeightsUpload] = useState(null);
    const [imageWorkingHeightsURL, setImageWorkingHeightsURL] = useState("");
    const [imageWhiteCardUpload, setImageWhiteCardUpload] = useState(null);
    const [imageWhiteCardURL, setImageWhiteCardURL] = useState("");
    const [imageTradeOneUpload, setImageTradeOneUpload] = useState(null);
    const [imageTradeOneURL, setImageTradeOneURL] = useState("");
    const [imageTradeTwoUpload, setImageTradeTwoUpload] = useState(null);
    const [imageTradeTwoURL, setImageTradeTwoURL] = useState("");
    const [imageEwpUpload, setImageEwpUpload] = useState(null);
    const [imageEwpURL, setImageEwpURL] = useState("");
    const [imageDriversLicenseUpload, setImageDriversLicenseUpload] = useState(null);
    const [imageDriversLicenseURL, setImageDriversLicenseURL] = useState("");
    const [imageSignatureUpload, setImageSignatureUpload] = useState(null);
    const [imageSignatureURL, setImageSignatureURL] = useState("");

   
    const employeesCollectionRef = collection(db, "employees");

    const saveEmployee = async () => {
        await addDoc(employeesCollectionRef, { 
        name: name,
        position: position, 
        phone: Number(phone),
        email: email,
        qualifications: qualifications,
        photo: imageURL,
        irata: imageIRATAURL,
        workingAtHeights: imageWorkingHeightsURL,
        whiteCard: imageWhiteCardURL,
        tradeOne: imageTradeOneURL,
        tradeTwo: imageTradeTwoURL,
        ewp: imageEwpURL,
        driversLicense: imageDriversLicenseURL,
        signature: imageSignatureURL
        }).then(() => {
            createUserWithEmailAndPassword(auth, email, password).then((res) => {
                setOpen(false);
            })
            .catch(err => setError(err.message))
          });
    }

    const imageListRef = ref(storage, `${name}/`)
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `${name}/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageURL(url);
              });
          });
        });
      }, []);

      // IRATA IMAGE UPLOAD HERE

    const imageIRATAListRef = ref(storage, `${name}/`)
    const uploadImageIRATA = () => {
        if (imageIRATAUpload == null) return;
        const imageIRATARef = ref(storage, `${name}/${imageIRATAUpload.name + v4() }`);
        uploadBytes(imageIRATARef, imageIRATAUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageIRATAURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageIRATAListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageIRATAURL(url);
              });
          });
        });
    }, []);

    // IMAGE FOR WORKING AT HEIGHTS

    const imageWorkingHeightsListRef = ref(storage, `${name}/`)
    const uploadImageWorkingHeights = () => {
        if (imageWorkingHeightsUpload == null) return;
        const imageWorkingHeightsRef = ref(storage, `${name}/${imageWorkingHeightsUpload.name + v4() }`);
        uploadBytes(imageWorkingHeightsRef, imageWorkingHeightsUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageWorkingHeightsURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageWorkingHeightsListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageWorkingHeightsURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR WHITE CARD

    const imageWhiteCardListRef = ref(storage, `${name}/`)
    const uploadImageWhiteCard = () => {
        if (imageWhiteCardUpload == null) return;
        const imageWhiteCardRef = ref(storage, `${name}/${imageWhiteCardUpload.name + v4() }`);
        uploadBytes(imageWhiteCardRef, imageWhiteCardUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageWhiteCardURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageWhiteCardListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageWhiteCardURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR TRADE 1

    const imageTradeOneListRef = ref(storage, `${name}/`)
    const uploadImageTradeOne = () => {
        if (imageTradeOneUpload == null) return;
        const imageTradeOneRef = ref(storage, `${name}/${imageTradeOneUpload.name + v4() }`);
        uploadBytes(imageTradeOneRef, imageTradeOneUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageTradeOneURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageTradeOneListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageTradeOneURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR TRADE 2

    const imageTradeTwoListRef = ref(storage, `${name}/`)
    const uploadImageTradeTwo = () => {
        if (imageTradeTwoUpload == null) return;
        const imageTradeTwoRef = ref(storage, `${name}/${imageTradeTwoUpload.name + v4() }`);
        uploadBytes(imageTradeTwoRef, imageTradeTwoUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageTradeTwoURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageTradeTwoListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageTradeTwoURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR EWP

    const imageEwpListRef = ref(storage, `${name}/`)
    const uploadImageEwp = () => {
        if (imageEwpUpload == null) return;
        const imageEwpRef = ref(storage, `${name}/${imageEwpUpload.name + v4() }`);
        uploadBytes(imageEwpRef, imageEwpUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageEwpURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageEwpListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageEwpURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR DRIVERS LICENSE

    const imageDriversLicenseListRef = ref(storage, `${name}/`)
    const uploadImageDriversLicense = () => {
        if (imageDriversLicenseUpload == null) return;
        const imageDriversLicenseRef = ref(storage, `${name}/${imageDriversLicenseUpload.name + v4() }`);
        uploadBytes(imageDriversLicenseRef, imageDriversLicenseUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageDriversLicenseURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageDriversLicenseListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageDriversLicenseURL(url);
              });
          });
        });
    }, []);

    // UPLOAD IMAGE FOR SIGNATURE

    const imageSignatureListRef = ref(storage, `${name}/`)
    const uploadImageSignature = () => {
        if (imageSignatureUpload == null) return;
        const imageSignatureRef = ref(storage, `${name}/${imageSignatureUpload.name + v4() }`);
        uploadBytes(imageSignatureRef, imageSignatureUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageSignatureURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageSignatureListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageSignatureURL(url);
              });
          });
        });
    }, []);


  return (
    <div>
      <h1>Employee Information</h1>
      <div>
        <table>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <label>Position:</label>
            </td>
            <td>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Phone:</label>
            </td>
            <td>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
            <td>
              <label>Email:</label>
            </td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Password:</label>
            </td>
            <td style={{display:"flex"}}>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" style={{whiteSpace:"nowrap"}} onClick={(e) => setPassword(v4())}>
                Generate Password
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Qualifications:</label>
            </td>
            <td colSpan={3}>
              <textarea
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                style={{ width: "100%" }}
              ></textarea>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <label>Photo:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button disabled={!imageUpload} onClick={uploadImage}>
                Upload
              </button>
            </td>
            <td>
              {imageURL ? (
                <img src={imageURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>IRATA:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageIRATAUpload(event.target.files[0]);
                }}
              />
              <button disabled={!imageIRATAUpload} onClick={uploadImageIRATA}>
                Upload
              </button>
            </td>
            <td>
              {imageIRATAURL ? (
                <img src={imageIRATAURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Working at Heights:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageWorkingHeightsUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageWorkingHeightsUpload}
                onClick={uploadImageWorkingHeights}
              >
                Upload
              </button>
            </td>
            <td>
              {imageWorkingHeightsURL ? (
                <img src={imageWorkingHeightsURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>White Card:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageWhiteCardUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageWhiteCardUpload}
                onClick={uploadImageWhiteCard}
              >
                Upload
              </button>
            </td>
            <td>
              {imageWhiteCardURL ? (
                <img src={imageWhiteCardURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Trade 1:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageTradeOneUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageTradeOneUpload}
                onClick={uploadImageTradeOne}
              >
                Upload
              </button>
            </td>
            <td>
              {imageTradeOneURL ? (
                <img src={imageTradeOneURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Trade 2:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageTradeTwoUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageTradeTwoUpload}
                onClick={uploadImageTradeTwo}
              >
                Upload
              </button>
            </td>
            <td>
              {imageTradeTwoURL ? (
                <img src={imageTradeTwoURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>EWP:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageEwpUpload(event.target.files[0]);
                }}
              />
              <button disabled={!imageEwpUpload} onClick={uploadImageEwp}>
                Upload
              </button>
            </td>
            <td>
              {imageEwpURL ? (
                <img src={imageEwpURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Drivers License:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageDriversLicenseUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageDriversLicenseUpload}
                onClick={uploadImageDriversLicense}
              >
                Upload
              </button>
            </td>
            <td>
              {imageDriversLicenseURL ? (
                <img src={imageDriversLicenseURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Signature:</label>
            </td>
            <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageSignatureUpload(event.target.files[0]);
                }}
              />
              <button
                disabled={!imageSignatureUpload}
                onClick={uploadImageSignature}
              >
                Upload
              </button>
            </td>
            <td>
              {imageSignatureURL ? (
                <img src={imageSignatureURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
          </tr>
        </table>
        <button type="submit" onClick={saveEmployee}>
          Save
        </button>
      </div>
      <style jsx>{`
        table {
          width: 100%;
        }

        label {
          font-weight: 500;
        }

        input {
          width: 100%;
          line-height: 28px;
          margin: 15px 0;
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

        .placeholder {
          border: 1px dashed green;
          color: green;
          padding: 50px 100px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

export default AddEmployeeForm