/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid';
import { storage } from '../src/config/firebase.config';


function HeightAndSafetyImages({job}) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, `${job.jobNumber}/`)
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `${job.jobNumber}/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            })
           
        })
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
    

  return (
    <>
        <div className='wrapper'>
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}} />
            <button onClick={uploadImage}>Upload Image</button>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridGap:"10px",marginTop:"50px"}}>
                {imageList.map((url) => {
                    return <img src={url} />
                })}
            </div>
            
        </div>
        <style jsx>{`
            .wrapper {
                width: 100vw;
                height: auto;
                display: flex;
                align-items: center;
                flex-direction: column;
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

export default HeightAndSafetyImages