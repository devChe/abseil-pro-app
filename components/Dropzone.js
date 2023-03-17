/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getStorage } from '@firebase/storage';
import { addDoc, arrayUnion, collection, serverTimestamp, doc, getDocs, onSnapshot, query, updateDoc, where, arrayRemove } from 'firebase/firestore';
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 } from 'uuid';
import { auth, db, storage } from '../src/config/firebase.config';
import LoadingSpinner from './LoadingSpinner';
import { faScribble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Dropzone = ({job}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [jobs, setJobs] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [staff, setStaff] = useState([]);

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

      // const imageListRef = ref(storage, `photos_${job.jobNumber}/`);

      // const uploadImage = async () => {
      //   await Promise.all(
      //     selectedImages.map((image) => {
      //       const imageRef = ref(storage, `photos_${job.jobNumber}/${image.path + v4() }`);
      //       uploadBytes(imageRef, image, "data_url").then( async ()=>{
      //         const downloadURL = await getDownloadURL(imageRef)
      //         const id = job.id;
      //         const jobDoc = doc(db, "jobs", id);
      //         updateDoc(jobDoc, {
      //           photos: arrayUnion({
      //             id: "IMG:" + new Date() + v4(),
      //             path: imageRef.fullPath,
      //             url: downloadURL,
      //             date: new Date(),
      //             client: job.client,
      //             clientID: job.clientID[0],
      //             name: staff
      //               .filter((el) => el.email === user)
      //               .map((emp) => emp.name),
      //             jobName: job.name,
      //             jobNum: job.jobNumber
      //           }),
      //         });
      //       })
      //     })
      //   )
      //   setSelectedImages([]);
      // } 

      
      

      const uploadImage = async () => {
        await Promise.all(
          selectedImages.map(async (image) => {
            const imageRef = ref(storage, `photos_${job.jobNumber}/${image.path + v4()}`);
            await uploadBytes(imageRef, image, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            const file = image instanceof File && image;
            const createdTime = file && file.lastModified && new Date(file.lastModified);
            const id = job.id;
            const jobDoc = doc(db, "jobs", id);
            updateDoc(jobDoc, {
              photos: arrayUnion({
                id: "IMG:" + v4(),
                path: imageRef.fullPath,
                url: downloadURL,
                date: new Date(),
                createdTime,
                client: job.client,
                clientID: job.clientID[0],
                name: staff.filter((el) => el.email === user).map((emp) => emp.name),
                jobName: job.name,
                jobNum: job.jobNumber
              }),
            });
          })
        )
        setSelectedImages([]);
      } 


      const deletePhoto = async (deleteId, path, url, date, createdTime, client, name, clientID, jobName, jobNum) => {
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
            createdTime: createdTime,
            client: client,
            name: name,
            clientID: clientID,
            jobName: jobName,
            jobNum: jobNum,

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
      
      
      


    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file=>
            Object.assign(file,{
                preview:URL.createObjectURL(file)
            })
            ))
      }, [])

      
      const {getRootProps, getInputProps} = useDropzone({onDrop})

      const selected_images = selectedImages?.map(file=>(
        <div>
           <Image src={file.preview} width={100} height="150px" style={{borderRadius:"8px"}} alt="" />
        </div>
      ))
      return (
        <div style={{minHeight:"100vh"}} className="wrapper">
          <div {...getRootProps()} className="uploader">
            <input {...getInputProps()} />
            <label for="file-input" className="drag">
              
              <div style={{display:"flex",gap:"15px"}}>{selected_images}</div>
              <span>Drag and drop files here or click to select files</span>
            </label>
            
          </div>
          <button onClick={uploadImage}>Upload Image</button>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridGap:"10px",marginTop:"50px"}}>
                {jobs?.data?.photos?.map((item) => {
                    return (
                        <div style={{position: "relative"}}>
                            {loading && <LoadingSpinner /> }
                            <img key={item.id} src={item.url} className="photo" />
                            <button type="submit" onClick={() => deletePhoto(item.id, item.path, item.url, item.date, item.createdTime, item.client, item.name, item.clientID, item.jobName, item.jobNum)}>Delete</button>
                        </div>
                    )
                })}
            </div>
          <style jsx>{`
          .uploader {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 200px;
              border: 2px dashed #ccc;
              border-radius: 10px;
              overflow: hidden;
            }

            .drag {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100%;
              width: 100%;
              font-size: 1.2rem;
              color: #666;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
            }

            .drag:hover {
              background-color: #f2f2f2;
            }

            .drag img {
              max-height: 100%;
              max-width: 100%;
            }

            #file-input {
              display: none;
            }

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
        </div>

        
      );
}

export default Dropzone