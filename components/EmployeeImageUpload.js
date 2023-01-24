/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getStorage } from '@firebase/storage';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid';
import { db, storage } from '../src/config/firebase.config';
import LoadingSpinner from './LoadingSpinner';

const EmployeeImageUpload = ({staff}) => {
    const [employee, setEmployee] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [imgNewId, setImgNewId] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [loading, setLoading] = useState(false);

    const uniId = () => {
        const d = new Date();
        const day = d.getDate().toString();
        const month = d.getMonth().toString();
        const yr = d.getFullYear().toString();
        const hr = d.getHours().toString();
        const min = d.getMinutes().toString();
        const sec = d.getSeconds().toString();
        const formattedDate = month + day + yr + hr + min + sec;
        setImgNewId(formattedDate);
      };
    
      useEffect(() => {
        setImgNewId(uniId);
      }, []);

    const imageListRef = ref(storage, `employees_${staff.id}/`);

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `employees_${staff.id}/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
                const id = staff.id;
                const staffDoc = doc(db, "employees", id);
                updateDoc(staffDoc, {
                    photos: arrayUnion({ id: "IMG:" + imgNewId, path: imageRef.fullPath, url: url}),
                });
                alert("save to Employees collection");
            })
        });
        
    };


    useEffect(() => {
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
        });
      });
    }, []);


    const employeesCollectionRef = collection(db, "employees");


    useEffect(() => {
        setLoading(true)
        const getClient = async () => {
          const id = staff.name;
          const q = query(employeesCollectionRef, where("name", "==", id ))
          onSnapshot(q, (snapshot) => {
            const res = snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }));
            setEmployee(res[0]);
            setLoading(false);
          })
        }
        getClient()
      }, [])


      const deletePhoto = async (deleteId, path, url) => {
        setLoading(true)
        const id = staff.id;
        //deleteId is the id from the post you want to delete
        const staffDoc = doc(db, "employees", id);
        await updateDoc(staffDoc, {
          photos: arrayRemove({
            id: deleteId,
            path: path,
            url: url
          })
        })
          .then((success) => {
            if(success) {
                setLoading(false);
            }
            
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      };


  return (
    <>
        <div className='wrapper'>
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}} />
            <button onClick={uploadImage}>Upload Image</button>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridGap:"10px",marginTop:"50px"}}>
                {employee?.data?.photos?.map((item) => {
                    return (
                        <div>
                            {loading && <LoadingSpinner /> }
                            <img key={item.id} src={item.url} />
                            <button type="submit" onClick={() => deletePhoto(item.id, item.path, item.url)}>Delete</button>
                        </div>
                            
                        
                    )
                })}
                {/* {imageList.map((url) => {
                    return (
                        <>
                        <div>
                            {loading && <LoadingSpinner /> }
                            <img key={url} src={url} />
                            <button type="submit" onClick={deletePhoto(url)}>Delete</button>
                        </div>
                            
                        </>
                    )
                })} */}
            </div>
            
            
        </div>
        <style jsx>{`
            .wrapper {
                display: flex;
                align-items: center;
                flex-direction: column;
                padding-bottom: 50px;
                min-height: 100vh;
            }

            img {
                width: 300px;
                height: 300px;
                margin: 10px;
            }
        `}</style>
    </>
  )
}

export default EmployeeImageUpload;