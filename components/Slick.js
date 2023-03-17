/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../src/config/firebase.config";
const Paint = dynamic(() => import("../components/Painterro"), { ssr: false });



const Slick = ({ photo, photosByMonth, activeImage, open, setOpen, jobs, setJobs }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlideId, setNextSlideId] = useState(null);
  

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
    dots: true,
    infinite: true,
    speed: 500,
    fade: true
  };

  console.log(photosByMonth);
  return (
    <>
      <div>
        <Slider ref={sliderRef} {...settings} initialSlide={activeImage}>
          {photosByMonth.map((img, index) => (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <div
                  key={index}
                  style={{ position: "relative" }}
                  onMouseEnter={() => handleMouseEnter(img.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={img.url} width="100%" height="500px" />
                  {isHovered === img.id && (
                    <div
                      className="paintIcon"
                      onClick={() => {openEditor(img.id) }}
                    >
                      <FontAwesomeIcon
                        icon={faPaintbrush}
                        style={{ fontSize: "35px" }}
                      />
                    </div>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <h3>{img.jobName}</h3>
                  <h4>Description</h4>
                  <div>
                    <textarea
                      placeholder="Add a description..."
                      rows="4"
                      cols="50"
                    ></textarea>
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
