/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { auth, db } from '../src/config/firebase.config';
import dateFormat, { masks } from "dateformat";
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import dynamic from 'next/dynamic';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slick from '../components/Slick';
const Paint = dynamic(() => import("../components/Painterro"), { ssr: false });

const Photos = () => {
  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(null);
  const [url, setUrl] = useState(null);
  const [slideshow, setSlideshow] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [openModalReport, setOpenModalReport] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  function openSlick(id) {
    setOpen(id)
  }

  function onCloseModal() {
    setOpen(false);
    setOpenModalReport(false);
  }

  function openModal() {
    setOpen(true)
  }

  const jobsCollectionRef = collection(db, "jobs");
  const employeesCollectionRef = collection(db, "employees")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [isLoading])

  useEffect(() => {
    setIsLoading(true)
    const getJob = async () => {
      const q = query(jobsCollectionRef)
      onSnapshot(q, (snapshot) => {
        const res = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setJobs(res);
        setIsLoading(false);
      })
    }
    getJob()
  }, [])

  useEffect(() => {
    const getEmployees = async () => {
      const q = query(employeesCollectionRef);
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEmployees(res);
    }
    getEmployees();
  }, [])

  const photosByMonth = {};

  jobs?.map((job) => {
    job?.data?.photos?.forEach(photo => {
      const convertedDate = dateFormat(new Date(photo.date.seconds * 1000), "mm/dd/yyyy");

      if (photosByMonth[convertedDate]) {
        photosByMonth[convertedDate].push(photo);
      } else {
        photosByMonth[convertedDate] = [photo]
      }
    });
  })

  const handleCheckboxChange = (photo) => {
    if (selectedPhotos.includes(photo.id)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
    } else {
      setSelectedPhotos([...selectedPhotos, photo.id]);
    }
  };

  const handleReportButtonClick = (id, ) => {
    console.log(selectedPhotos);
    setOpenModalReport(true)
    // TODO: Implement your logic to generate the report with the selected photos
  };



  const filteredPhotos = jobs.flatMap(job => job.data.photos.filter(photo => selectedPhotos.includes(photo.id)));
  
  return (
    <div>
      <h1>Photo Feed</h1>
      <hr />
      <button onClick={handleReportButtonClick}>Generate Report</button>
      <Modal open={openModalReport} onClose={onCloseModal} center={true}>
        <div>
          <h1>REPORT</h1>
          {filteredPhotos.map(photo => (
            <div>
              <div>
                <img key={photo.id} src={photo.url} alt="Job Photo" width={200} height={200} />
                <div>
                  {photo.description}
                </div>
                <div>
                  {photo.jobName}
                </div>
              </div>
              
              <br/>
            </div>
        
      ))}
        </div>
      </Modal>
      <div>
        {Object.keys(photosByMonth)
          .sort()
          .reverse()
          .map((month) => {
            return (
              <>
                <h1>{dateFormat(month, "fullDate")}</h1>
                <div className="imageGrid">
                  {photosByMonth[month].map((photo, index) => {
                    return (
                      <>
                        <div className="column" key={index}>
                          {isLoading === photo.id ? (
                            <div>Uploading...</div>
                          ) : (
                            ""
                          )}
                          <div className="content">
                            <LazyLoadImage
                              onClick={() => {
                                openSlick(photo.id);
                                setActiveImage(index);
                              }}
                              src={photo.url}
                              style={{
                                width: "100%",
                                height: "150px",
                                borderRadius: "8px",
                              }}
                              PlaceholderSrc={PlaceholderImage}
                              loading="lazy"
                              effect="blur"
                            />

                            <Link
                              href="/jobProfile/[id]"
                              as={`/jobProfile/${jobs
                                ?.filter(
                                  (job) => job?.data?.jobNumber === photo.jobNum
                                )
                                .map((res) => res.id)}`}
                            >
                              <h3 className="photoJobName">{photo.jobName}</h3>
                            </Link>
                            <Link
                              href="/clientProfile/[id]"
                              as={`/clientProfile/${photo.clientID}`}
                            >
                              <h4 className="a" style={{ color: "blueviolet" }}>
                                {photo.client}
                              </h4>
                            </Link>
                            <Link
                              href="/staffProfile/[id]"
                              as={`/staffProfile/${employees
                                ?.filter(
                                  (employee) => employee.name === photo.name[0]
                                )
                                .map((staff) => staff.id)}`}
                            >
                              <p className="b">{photo.name[0]}</p>
                            </Link>
                            <p style={{ color: "steelblue" }}>
                              {dateFormat(
                                new Date(photo.createdTime.seconds * 1000),
                                "mmmm dS, yyyy h:MM TT"
                              )}
                            </p>
                            <input
                              type="checkbox"
                              checked={selectedPhotos.includes(photo.id)}
                              onChange={() => handleCheckboxChange(photo)}
                            />
                          </div>
                        </div>
                        <Modal
                          open={open === photo.id}
                          onClose={onCloseModal}
                          center={true}
                        >
                          <div className="custom-modal">
                            <div className="custom-modal_body">
                              <Slick
                                setJobs={setJobs}
                                jobs={jobs}
                                photo={photo}
                                photosByMonth={photosByMonth[month]}
                                activeImage={activeImage}
                                setOpen={setOpen}
                                open={open}
                              />
                            </div>
                          </div>
                        </Modal>
                        {url && <img src={url} alt="editedImage" />}
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
      </div>

      <style jsx>{`
        .a:hover {
          cursor: pointer;
          color: red !important;
        }

        .b:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        p {
          margin: 0;
        }

        h3,
        h4,
        h5 {
          margin: 0;
        }

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

        .photoJobName:hover {
          cursor: pointer;
          color: red;
        }

        .custom-modal_body {
          height: auto;
        }
      `}</style>
    </div>
  );
}

export default Photos;
