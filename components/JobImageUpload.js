/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getStorage } from '@firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { userAgent } from 'next/server';
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid';
import { auth, db, storage } from '../src/config/firebase.config';
import LoadingSpinner from './LoadingSpinner';


const JobImageUpload = ({job}) => {
    const [jobs, setJobs] = useState({});
    const [staff, setStaff] = useState([]);
    const [user, setUser] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [imgNewId, setImgNewId] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [loading, setLoading] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.email);
    })

    const employeesCollectionRef = collection(db, "employees");

    useEffect(() => {
      const getEmployees = async () => {
          const q = query(employeesCollectionRef);
          const data = await getDocs(q);
          const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
          setStaff(res);
      }
      getEmployees();
  }, [])

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

    const imageListRef = ref(storage, `photos_${job.jobNumber}/`);

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `photos_${job.jobNumber}/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
                const id = job.id;
                const jobDoc = doc(db, "jobs", id);
                updateDoc(jobDoc, {
                  photos: arrayUnion({
                    id: "IMG:" + imgNewId,
                    path: imageRef.fullPath,
                    url: url,
                    date: new Date(),
                    client: job.client,
                    clientID: job.clientID[0],
                    name: staff
                      .filter((el) => el.email === user)
                      .map((emp) => emp.name),
                    jobName: job.name,
                    jobNum: job.jobNumber
                  }),
                });
                alert("save to jobs collection");
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


    const jobsCollectionRef = collection(db, "jobs");


    useEffect(() => {
        setLoading(true)
        const getJob = async () => {
          const jobNumber = job.jobNumber;
          const q = query(jobsCollectionRef, where("jobNumber", "==", jobNumber ))
          onSnapshot(q, (snapshot) => {
            const res = snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }));
            setJobs(res[0]);
            setLoading(false);
          })
        }
        getJob()
      }, [])


      const deletePhoto = async (deleteId, path, url, date, client, name) => {
        setLoading(true)
        const id = job.id;
        //deleteId is the id from the post you want to delete
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, {
          photos: arrayRemove({
            id: deleteId,
            path: path,
            url: url,
            date: date,
            client: client,
            name: name
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
                {jobs?.data?.photos?.map((item) => {
                    return (
                        
                        <div>
                            {loading && <LoadingSpinner /> }
                            <img key={item.id} src={item.url} />
                            <button type="submit" onClick={() => deletePhoto(item.id, item.path, item.url, item.date, item.client, item.name)}>Delete</button>
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

export default JobImageUpload