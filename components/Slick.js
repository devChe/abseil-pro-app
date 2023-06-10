/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dateFormat, { masks } from "dateformat";
import dynamic from "next/dynamic";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../src/config/firebase.config";
const Paint = dynamic(() => import("../components/Painterro"), { ssr: false });



const Slick = ({ photo, photosByMonth, activeImage, open, setOpen, jobs, setJobs }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [description, setDescription] = useState("");
  const [writeDesc, setWriteDesc] = useState(false)
  

  const handleMouseEnter = (id) => {
    console.log(id)
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
    setCurrentSlide(currentSlide + 1)
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  

  function openEditor(id){
    setShow(id);
    setOpen(false); 
  }

  const settings = {
    infinite: true, 
    speed: 500,
    fade: true
  };

  const submitDescription = async (id, path, url, date, createdTime, client, name, clientID, jobName, jobNum, index, description) => {
    try {
      // Find the job with the specified job number
      const array = jobs?.filter(res => res?.data?.jobNumber === jobNum)
      const map = array.map(res => res.id)
      const docId = map[0]
      console.log(id)
      const jobDoc = doc(db, "jobs", docId);
      //create new field to replace the target object
      const newField = {
            id: id,
            path: path,
            url: url,
            date: date,
            createdTime: createdTime,
            client: client,
            name: name,
            clientID: clientID,
            jobName: jobName,
            jobNum: jobNum,
            description: description
      }
      // Update the description field of the specified object in the photos array
      const photos = array[0]?.data?.photos;
      photos[index] = newField
      console.log(photos)
      await updateDoc(jobDoc, {
        photos: photos
      });
      alert("Success");
      setWriteDesc(photos.description)
    } catch (error) {
     console.log(error);
    }
  }
  
  



  // const submitDescription = async (jobNum) => {
    // const array = jobs?.filter(res => res?.data?.jobNumber === jobNum)
    // const map = array.map(res => res.id)
    // const id = map[0]
    // const jobDoc = doc(db, "jobs", id);
  //   await updateDoc(jobDoc, {
  //     photos: arrayUnion({
  //       description: description
  //     }),
  //   })
  //   .then((success) => console.log(success))
  //   .catch((err) => console.log(err))
  // }

  return (
    <>
      <div>
        <Slider ref={sliderRef} {...settings} initialSlide={activeImage}>
          {photosByMonth.map((img, index) => (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "100%",
                    background: "darkgray",
                  }}
                  onMouseEnter={() => handleMouseEnter(img.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={img.url}
                    width="100%"
                    height="500px"
                    style={{ objectFit: "contain" }}
                  />
                  {isHovered === img.id && (
                    <div
                      className="paintIcon"
                      onClick={() => {
                        openEditor(img.id);
                      }}
                    >
                      <span
                        style={{ fontSize: "35px" }}
                      >
                        Edit
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <h3>{img.jobName}</h3>
                  <p>
                    {dateFormat(
                      new Date(img.createdTime.seconds * 1000),
                      "mmmm dS, yyyy h:MM TT"
                    )}
                  </p>
                  <h4>Description</h4>
                  <div>
                    {img.description !== "" ? (
                      <p>{img.description}</p>
                    ) : (
                      <>
                        <p>{writeDesc}</p>
                        <textarea
                          placeholder="Add a description..."
                          rows="4"
                          cols="50"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      ></textarea><br/>
                      <button onClick={() => {submitDescription(
                        img.id,
                        img.path,
                        img.url,
                        img.date,
                        img.createdTime,
                        img.client,
                        img.name,
                        img.clientID,
                        img.jobName,
                        img.jobNum,
                        index,
                        description
                      )}}>Update Description</button>
                      </>
                      
                    )}
                    
                  </div>
                </div>
                {show === img.id ? (
                  <Paint
                    onSave={(dataUrl) => {
                      setUrl(dataUrl);
                    }}
                    img={img}
                    jobs={jobs}
                    setJobs={setJobs}
                    setIsLoading={setIsLoading}
                  />
                ) : (
                  ""
                )}
              </div>
            </>
          ))}
        </Slider>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button className="button" onClick={previous}>
            Previous
          </button>
          <button className="button" onClick={next}>
            Next
          </button>
        </div>
      </div>

      <style jsx>{`
        .slick-slider {
          height: 400px; /* Set your preferred height */
        }

        .container {
          padding: 40px;
          background: #419be0;
        }

        .slick-slide img {
          margin: auto;
        }

        .paintIcon {
          position: absolute;
          bottom: 1%;
          left: 1%;
          background: white;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Slick;
