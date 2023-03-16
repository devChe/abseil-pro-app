/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Slick = ({ photo, photosByMonth, activeImage, openEditor }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    fade: true
    
  };
  return (
    <>
      <div>
        <Slider ref={sliderRef} {...settings} initialSlide={activeImage}>
          {photosByMonth.map((img, index) => (
            <>
              <div style={{ display: "flex" }} >
                <div key={index} style={{ position: "relative" }}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <img src={img.url} width="100%" height="500px" />
                  { isHovered && 
                  <div className="paintIcon" onClick={() => openEditor(photo.id)}>
                    <FontAwesomeIcon icon={faPaintbrush} style={{fontSize:"35px"}} />
                  </div>
                  }
                </div>
                <div style={{ width: "100%" }}>
                  <h3>{img.jobName}</h3>
                  <h4>Description</h4>
                  <div>
                    <textarea placeholder="Add a description..." rows="4" cols="50"></textarea>
                  </div>
                  
                </div>
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
          bottom: 4%;
          left: 4%;
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
