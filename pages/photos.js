/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { auth, db } from '../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";
import { onAuthStateChanged } from 'firebase/auth';


const photos = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
        setUser(currentUser);
    })
    

    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        setLoading(true)
        const getJobs = async () => {
            const q = query(jobsCollectionRef);
            const data = await getDocs(q);
            const res = data.docs.map((doc) => ({...doc.data(), id: doc.id })); 
            setJobs(res);
            setLoading(false);
        }
        getJobs();
    }, [])

    
    const photosByMonth = {};

      jobs?.map((job) => {
        job.photos.forEach(photo => {
            const convertedDate = dateFormat(new Date(photo.date.seconds * 1000), "fullDate");
            
            if(photosByMonth[convertedDate]){
                photosByMonth[convertedDate].push(photo);}
            else{
                photosByMonth[convertedDate] = [photo]}
        });
      })

    
  return (
    <div>
        {loading && <LoadingSpinner />}
        <h1>Photo Feed</h1>
        <hr/>
        
        <div>
            {Object.keys(photosByMonth).map(month => {
                return (
                    <>
                        <h1>{month}</h1>
                        <div className='imageGrid'>
                            {photosByMonth[month].map((photo) => {
                                    return (
                                      <>
                                        <div className="column">
                                          <div className="content">
                                            <img
                                              src={photo.url}
                                              style={{
                                                width: "100%",
                                                height: "150px",
                                                borderRadius: "8px",
                                              }}
                                            />
                                            <h4>{photo.client}</h4>
                                            <p>{photo.name[0]}</p>
                                          </div>
                                        </div>
                                      </>
                                    );
                                }
                            )}
                        </div>
                    </>
                )
            })}

            {/* {jobs?.map((job) => (
                job.photos?.map((img) => (
                    <div className='column'>
                        <div className="content">
                            <img src={img.url} style={{width:"100%", height: "150px",borderRadius:"8px"}}  />
                            <h4>Mountains</h4>
                            <p>Lorem ipsum dolor..</p>
                        </div>
                    </div>
                ) )
              ))} */}
        </div>
        

        <style jsx>{`
            .imageGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
            }

            .content {
                background-color: white;
                padding: 10px;
            }

            .column {
                float: left;
            }


        `}</style>
    </div>
  )
}

export default photos