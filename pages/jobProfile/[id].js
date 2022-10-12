/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../src/config/firebase.config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  update,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import firebase from "firebase/app";
import {
  getStorage,
  ref,
  storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPhone,
  faLocationDot,
  faPenToSquare,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import ImgMultipleUpload from "../../components/ImgMultipleUpload";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import HeightAndSafetyForm from "../../components/HeightAndSafetyForm";
import HeightSafetyCertificate from "../../components/HeightSafetyCertificate";
import HeightSafetyBody from "../../components/HeightSafetyBody";
import InspectionSummary from "../../components/InspectionSummary";
import HeightSafetyAssetMap from "../../components/HeightSafetyAssetMap";
import InspectionReport from "../../components/InspectionReport";
import dateFormat, { masks } from "dateformat";
import EditJob from "../../components/EditJob";
import { global } from "styled-jsx/css";
import ExternalQuote from "../../components/ExternalQuote";

require("react-datepicker/dist/react-datepicker.css");

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "jobs"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "jobs", id);
  const docSnap = await getDoc(docRef);
  const jobProps = docSnap.data();
  jobProps.id = id;
  return {
    props: { jobProps: JSON.stringify(jobProps) || null },
    revalidate: 1,
  };
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99999",
    background: "#F6F7F9",
    width: "100vw",
    height: "100vh",
  },
};

const bodyCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99999",
    background: "#202124",
    width: "100vw",
    height: "100vh",
  },
};



function jobProfile({ jobProps, id }) {
  const router = useRouter();

  const tasksCollectionRef = collection(db, "tasks");

  const staffCollectionRef = collection(db, "staff");

  const heightSafetyCollectionRef = collection(db, "heightSafety");

  //so the data will go first to the fallback while loading is not done
  if (router.isFallback) return <div>...Loading</div>;

  const job = JSON.parse(jobProps);

  const START_DATE = `${!job.startDate ? "" : new Date(job.startDate.seconds * 1000).toLocaleDateString("en-US")}`;
  const DUE_DATE = `${!job.dueDate ? "" : new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")}`;

  const [jobs, setJobs] = useState([]);
  const [staff, setStaff] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [edit, isEdit] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [user, setUser] = useState({});
  const [toggleState, setToggleState] = useState(1);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [hide, setHide] = useState("block");
  const [show, setShow] = useState("none");
  const [modalIsOpen, setIsOpen] = useState("");
  const [modalIsOpenYesNo, setIsOpenYesNo] = useState("");
  const [modalIsOpenJSEA, setIsOpenJSEA] = useState(false);
  const [modalIsOpenDPR, setIsOpenDPR] = useState(false);
  const [modalIsOpenTTR, setIsOpenTTR] = useState(false);
  const [modalIsOpenRB, setIsOpenRB] = useState(false);
  const [modalIsOpenIR, setIsOpenIR] = useState(false);
  const [modalIsOpenST, setIsOpenST] = useState(false);
  const [modalIsOpenHSIF, setIsOpenHSIF] = useState(false);
  const [modalIsOpenHSIC, setIsOpenHSIC] = useState(false);
  const [modalIsOpenHSBody, setIsOpenHSBody] = useState(false);
  const [modalIsOpenHSInspectionSummary, setIsOpenHSInspectionSummary] = useState(false);
  const [modalIsOpenHSAssetMap, setIsOpenHSAssetMap] = useState(false);
  const [modalIsOpenInspectionReport, setIsOpenInspectionReport] = useState(false);
  const [modalIsOpenExQuote, setIsOpenExQuote] = useState(false);
  const [modalIsOpenInQuote, setIsOpenInQuote] = useState(false);
  const [modalIsOpenQuoteCost, setIsOpenQuoteCost] = useState(false);
  const [imgNewId, setImgNewId] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [est, setEst] = useState(0);
  const [actual, setActual] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [taskId, setTaskId] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [quoteDesc, setQuoteDesc] = useState("");
  const [qty, setQty] = useState(0);
  const [newInspector, setNewInspector] = useState("");
  const [other, setOther] = useState(false);
  const [heightStartDate, setHeightStartDate] = useState(new Date());
  const [newInspectionDate, setNewInspectionDate] = useState(new Date());
  const [heightSiteName, setHeightSiteName] = useState("");
  const [heightEmail, setHeightEmail] = useState("");
  const [heightSiteAddress, setHeightSiteAddress] = useState("");
  const [assetGroupOneQty, setAssetGroupOneQty] = useState("");
  const [assetGrpOneType, setAssetGrpOneType] = useState("");
  const [assetGrpOneInspectionType, setAssetGrpOneInspectionType] = useState("");
  const [assetGrpOneRating, setAssetGrpOneRating] = useState("");
  const [assetGrpOneResult, setAssetGrpOneResult] = useState("");
  const [assetGrpOneNotes, setAssetGrpOneNotes] = useState("");
  const [assetGrpTwoQty, setAssetGrpTwoQty] = useState("");
  const [assetGrpTwoType, setAssetGrpTwoType] = useState("");
  const [assetGrpTwoInspectionType, setAssetGrpTwoInspectionType] = useState("");
  const [assetGrpTwoRating, setAssetGrpTwoRating] = useState("");
  const [assetGrpTwoResult, setAssetGrpTwoResult] = useState("");
  const [assetGrpTwoNotes, setAssetGrpTwoNotes] = useState("");
  const [assetGrp3Qty, setAssetGrp3Qty] = useState("");
  const [assetGrp3Type, setAssetGrp3Type] = useState("");
  const [assetGrp3InspectionType, setAssetGrp3InspectionType] = useState("");
  const [assetGrp3Rating, setAssetGrp3Rating] = useState("");
  const [assetGrp3Result, setAssetGrp3Result] = useState("");
  const [assetGrp3Notes, setAssetGrp3Notes] = useState("");
  const [assetGrp4Qty, setAssetGrp4Qty] = useState("");
  const [assetGrp4Type, setAssetGrp4Type] = useState("");
  const [assetGrp4InspectionType, setAssetGrp4InspectionType] = useState("");
  const [assetGrp4Rating, setAssetGrp4Rating] = useState("");
  const [assetGrp4Result, setAssetGrp4Result] = useState("");
  const [assetGrp4Notes, setAssetGrp4Notes] = useState("");
  const [assetGrp5Qty, setAssetGrp5Qty] = useState("");
  const [assetGrp5Type, setAssetGrp5Type] = useState("");
  const [assetGrp5InspectionType, setAssetGrp5InspectionType] = useState("");
  const [assetGrp5Rating, setAssetGrp5Rating] = useState("");
  const [assetGrp5Result, setAssetGrp5Result] = useState("");
  const [assetGrp5Notes, setAssetGrp5Notes] = useState("");
  const [assetGrp6Qty, setAssetGrp6Qty] = useState("");
  const [assetGrp6Type, setAssetGrp6Type] = useState("");
  const [assetGrp6InspectionType, setAssetGrp6InspectionType] = useState("");
  const [assetGrp6Rating, setAssetGrp6Rating] = useState("");
  const [assetGrp6Result, setAssetGrp6Result] = useState("");
  const [assetGrp6Notes, setAssetGrp6Notes] = useState("");
  const [assetGrp7Qty, setAssetGrp7Qty] = useState("");
  const [assetGrp7Type, setAssetGrp7Type] = useState("");
  const [assetGrp7InspectionType, setAssetGrp7InspectionType] = useState("");
  const [assetGrp7Rating, setAssetGrp7Rating] = useState("");
  const [assetGrp7Result, setAssetGrp7Result] = useState("");
  const [assetGrp7Notes, setAssetGrp7Notes] = useState("");
  const [assetGrp8Qty, setAssetGrp8Qty] = useState("");
  const [assetGrp8Type, setAssetGrp8Type] = useState("");
  const [assetGrp8InspectionType, setAssetGrp8InspectionType] = useState("");
  const [assetGrp8Rating, setAssetGrp8Rating] = useState("");
  const [assetGrp8Result, setAssetGrp8Result] = useState("");
  const [assetGrp8Notes, setAssetGrp8Notes] = useState("");

  const [updateClientName, setUpdateClientName] = useState(`${job.client}`);
  const [updateContact, setUpdateContact] = useState(`${job.contact}`);
  const [updateName, setUpdateName] = useState(`${job.name}`);
  const [updateDesc, setUpdateDesc] = useState(`${job.description}`);
  const [updateBudget, setUpdateBudget] = useState(`${job.budget}`);
  const [updateState, setUpdateState] = useState(`${job.state}`);
  const [updateSiteAddress, setUpdateSiteAddress] = useState(`${job.site_address}`);
  const [updateStartDate, setupdateStartDate] = useState(new Date());
  const [updateDueDate, setUpdateDueDate] = useState(new Date());
  const [updatePriority, setUpdatePriority] = useState(`${job.priority}`);
  const [updateAccMngr, setUpdateAccMngr] = useState(`${job.accountManager}`);
  const [updateManager, setUpdateManager] = useState(`${job.manager}`);
  const [updateTeam, setUpdateTeam] = useState(`${job.staff}`);

  let subtitle;

  const otherShow = () => {
    setOther(true);
  };

  function openModal(id) {
    setIsOpen(id);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setIsOpenJSEA(false);
    setIsOpenDPR(false);
    setIsOpenTTR(false);
    setIsOpenRB(false);
    setIsOpenIR(false);
    setIsOpenST(false);
    setIsOpenHSIF(false);
    setIsOpenExQuote(false);
    setIsOpenInQuote(false);
    setIsOpenQuoteCost(false);
    setIsOpenHSIC(false);
    setIsOpenHSBody(false);
    setIsOpenHSInspectionSummary(false);
    setIsOpenHSAssetMap(false);
    setIsOpenInspectionReport(false);
  }

  //   UNIQUE ID

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
    setTaskId(formattedDate);
  };

  useEffect(() => {
    setImgNewId(uniId);
  }, []);

  useEffect(() => {
    setTaskId(uniId);
  }, []);

  // GET TASKS COLLECTION

  useEffect(() => {
    const getTasks = async () => {
      const q = query(tasksCollectionRef, orderBy("name"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(res);
    };
    getTasks();
  }, []);

  // GET STAFF COLLECTION

  useEffect(() => {
    const getStaff = async () => {
      const q = query(staffCollectionRef, orderBy("name"));
      const data = await getDocs(q);
      setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStaff();
  }, []);

  // ADD PHOTO IN AN ARRAY OF IMAGES

  const addPhoto = async () => {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
      images: arrayUnion({ id: "IMG:" + imgNewId, name: imageName, url: url }),
    });
    window.location.reload(false);
  };

  const deletePhoto = async (deleteId) => {
    const id = job.id;
    //deleteId is the id from the post you want to delete
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
      images: job.images.filter((image) => image.id !== deleteId),
    })
      .then(() => {
        setIsLoading(deleteId);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
        setIsLoading(false);
      });

    window.location.reload(false);
  };

  // ADD TASK IN AN ARRAY OF TASKS

  async function addTask() {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
      tasks: arrayUnion({
        id: "TSK:" + taskId,
        name: newTaskName,
        startDate: startDate,
        dueDate: endDate,
        estimated: est,
        actual: actual,
        remaining: remaining,
      }),
    });
    window.location.reload(false);
  }

  // ADD HEIGHT AND SAFETY

  async function addHeightSafety() {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
            inspector_name: newInspector,
            inspection_date: heightStartDate,
            next_inspection_date: newInspectionDate,
            email: heightEmail,
            site_name: heightSiteName,
            site_address: heightSiteAddress,
            asset_group_1_qty: assetGroupOneQty,
            asset_group_1_type: assetGrpOneType,
            asset_group_1_inspection_type: assetGroupOneQty,
            asset_group_1_rating: assetGrpOneRating,
            asset_group_1_result: assetGrpOneResult,
            asset_group_1_notes: assetGrpOneNotes,
            asset_group_2_qty: assetGrpTwoQty,
            asset_group_2_type: assetGrpTwoType,
            asset_group_2_inspection_type: assetGrpTwoInspectionType,
            asset_group_2_rating: assetGrpTwoRating,
            asset_group_2_result: assetGrpTwoResult,
            asset_group_2_notes: assetGrpTwoNotes,
            asset_group_3_qty: assetGrp3Qty,
            asset_grp_3_type: assetGrp3Type,
            asset_grp_3_inspection_type: assetGrp3InspectionType,
            asset_grp_3_rating: assetGrp3Rating,
            asset_grp_3_result: assetGrp3Result,
            asset_grp_3_notes: assetGrp3Notes,
            asset_grp_4_qty: assetGrp4Qty,
            asset_grp_4_type: assetGrp4Type,
            asset_grp_4_inspection_type: assetGrp4InspectionType,
            asset_grp_4_rating: assetGrp4Rating,
            asset_grp_4_result: assetGrp4Result,
            asset_grp_4_notes: assetGrp4Notes,
            asset_grp_5_qty: assetGrp5Qty,
            asset_grp_5_type: assetGrp5Type,
            asset_grp_5_inspection_type: assetGrp5InspectionType,
            asset_grp_5_rating: assetGrp5Rating,
            asset_grp_5_result: assetGrp5Result,
            asset_grp_5_notes: assetGrp5Notes,
            asset_grp_6_qty: assetGrp6Qty,
            asset_grp_6_type: assetGrp6Type,
            asset_grp_6_inspection_type: assetGrp6InspectionType,
            asset_grp_6_rating: assetGrp6Rating,
            asset_grp_6_result: assetGrp6Result,
            asset_grp_6_notes: assetGrp6Notes,
            asset_grp_7_qty: assetGrp7Qty,
            asset_grp_7_type: assetGrp7Type,
            asset_grp_7_inspection_type: assetGrp7InspectionType,
            asset_grp_7_rating: assetGrp7Rating,
            asset_grp_7_result: assetGrp7Result,
            asset_grp_7_notes: assetGrp7Notes,
            asset_grp_8_qty: assetGrp8Qty,
            asset_grp_8_type: assetGrp8Type,
            asset_grp_8_inspection_type: assetGrp8InspectionType,
            asset_grp_8_rating: assetGrp8Rating,
            asset_grp_8_result: assetGrp8Result,
            asset_grp_8_notes: assetGrp8Notes,
    });
  }

  // ADD QUOTE COST

  async function addCost() {
    const id = job.id;
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, {
      costs: arrayUnion({
        description: quoteDesc,
        quantity: qty,
      }),
    });
    window.location.reload(false);
  }

    const createHeightSafety = async () => {
    
        await addDoc(heightSafetyCollectionRef, {
            inspector_name: newInspector,
            inspection_date: heightStartDate,
            next_inspection_date: newInspectionDate,
            email: heightEmail,
            site_name: heightSiteName,
            site_address: heightSiteAddress,
            asset_group_1_qty: assetGroupOneQty,
            asset_group_1_type: assetGrpOneType,
            asset_group_1_inspection_type: assetGroupOneQty,
            asset_group_1_rating: assetGrpOneRating,
            asset_group_1_result: assetGrpOneResult,
            asset_group_1_notes: assetGrpOneNotes,
            asset_group_2_type: assetGrpTwoType,
            asset_group_2_inspection_type: assetGrpTwoInspectionType,
            asset_group_2_rating: assetGrpTwoRating,
            asset_group_2_result: assetGrpTwoResult,
            asset_group_2_notes: assetGrpTwoNotes,
            asset_group_3_qty: assetGrp3Qty,
            asset_grp_3_type: assetGrp3Type,
            asset_grp_3_inspection_type: assetGrp3InspectionType,
            asset_grp_3_rating: assetGrp3Rating,
            asset_grp_3_result: assetGrp3Result,
            asset_grp_3_notes: assetGrp3Notes,
            asset_grp_4_qty: assetGrp4Qty,
            asset_grp_4_type: assetGrp4Type,
            asset_grp_4_inspection_type: assetGrp4InspectionType,
            asset_grp_4_rating: assetGrp4Rating,
            asset_grp_4_result: assetGrp4Result,
            asset_grp_4_notes: assetGrp4Notes,
            asset_grp_5_qty: assetGrp5Qty,
            asset_grp_5_type: assetGrp5Type,
            asset_grp_5_inspection_type: assetGrp5InspectionType,
            asset_grp_5_rating: assetGrp5Rating,
            asset_grp_5_result: assetGrp5Result,
            asset_grp_5_notes: assetGrp5Notes,
            asset_grp_6_qty: assetGrp6Qty,
            asset_grp_6_type: assetGrp6Type,
            asset_grp_6_inspection_type: assetGrp6InspectionType,
            asset_grp_6_rating: assetGrp6Rating,
            asset_grp_6_result: assetGrp6Result,
            asset_grp_6_notes: assetGrp6Notes,
            asset_grp_7_qty: assetGrp7Qty,
            asset_grp_7_type: assetGrp7Type,
            asset_grp_7_inspection_type: assetGrp7InspectionType,
            asset_grp_7_rating: assetGrp7Rating,
            asset_grp_7_result: assetGrp7Result,
            asset_grp_7_notes: assetGrp7Notes,
            asset_grp_8_qty: assetGrp8Qty,
            asset_grp_8_inspection_type: assetGrp8InspectionType,
            asset_grp_8_rating: assetGrp8Rating,
            asset_grp_8_result: assetGrp8Result,
            asset_grp_8_notes: assetGrp8Notes,
         });
        addHeightSafety();
        window.location.pathname="/jobs";
    
      }

  // EDIT JOB FORM FUNCTION

  const editHandler = () => {
    isEdit(true);
  };

  // EDIT AND UPDATE JOB FUNCTION

  // const updateClient = async (id, name) => {
  //   const clientDoc = doc(db, "suppliers", id);
  //   const newFields = { name: newName }
  //   await updateDoc(clientDoc, newFields);
  //   window.location.reload(false);
  // }

  const updateJob = async (id) => {
    const jobDoc = doc(db, "jobs", id);
    const newFields = {
          client: updateClientName,
          contact: updateContact,
          name: updateName,
          description: updateDesc,
          budget: updateBudget,
          state: updateState,
          site_address: updateSiteAddress,
          startDate: updateStartDate,
          dueDate: updateDueDate,
          priority: updatePriority,
          accountManager: updateAccMngr,
          manager: updateManager,
          staff: updateTeam.split(",").map(staff => doc(db, "users", staff)),
    }
    await updateDoc(jobDoc, newFields);
    window.location.reload(false);
}

  // GET THE IDS OF STAFF

  const array2 = job.staff.map((s) => s._key.path.segments[6]);

  // TOGGLE TAB

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChangeName = (e) => {
    setImageName(e.target.value);
  };

  const handleTaskChange = (e) => {
    console.log(e.target.value);
    const selectedTask = tasks.find((task) => task.name === e.target.value);
    setNewDesc(selectedTask.description);
    setNewTaskName(selectedTask.name);
  };

  const handleUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        alert("Success!");
        setUrl(url);
        setHide("none");
        setShow("block");
      });
    });
  };

  return (
    <>
      {edit ? (
        <div>
          <EditJob
            job={job}
            updateJob={updateJob}
            edit={edit}
            isEdit={isEdit}
            updateClientName={updateClientName}
            setUpdateClientName={setUpdateClientName}
            updateContact={updateContact}
            setUpdateContact={setUpdateContact}
            updateName={updateName}
            setUpdateName={setUpdateName}
            updateDesc={updateDesc}
            setUpdateDesc={setUpdateDesc}
            updateBudget={updateBudget}
            setUpdateBudget={setUpdateBudget}
            updateState={updateState}
            setUpdateState={setUpdateState}
            updateSiteAddress={updateSiteAddress}
            setUpdateSiteAddress={setUpdateSiteAddress}
            updateStartDate={updateStartDate}
            setupdateStartDate={setupdateStartDate}
            updateDueDate={updateDueDate}
            setUpdateDueDate={setUpdateDueDate}
            updatePriority={updatePriority}
            setUpdatePriority={setUpdatePriority}
            updateAccMngr={updateAccMngr}
            setUpdateAccMngr={setUpdateAccMngr}
            updateManager={updateManager}
            setUpdateManager={setUpdateManager}
            updateTeam={updateTeam}
            setUpdateTeam={setUpdateTeam}
           />
        </div>
      ) : (
        <div className="wrapper">
          <div className="jobNameWrapper">
            <h4>
              <span style={{ color: "blue" }}>{job.jobNumber}</span> -{" "}
              {job.name}
            </h4>
            <div className="editBtn" onClick={() => isEdit("true")}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="editIcon"
              />
            </div>
          </div>
          <div className="heroImage">
            <div className="darken"></div>
            <img src={job.imageUrl} className="jobImage" />
            <div className="clientWrapper">
              <div className="clientName">{job.client}</div>
              <div className="info">
                <div className="icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <a href={"tel:" + job.contact} className="contact">
                    {job.contact}
                    <span style={{ color: "blue" }}> Click to call</span>
                  </a>
                </div>
              </div>
              <div className="info">
                <div className="icon loc">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <div className="location">{job.site_address}</div>
                  <a href={job.locationURL} target="_blank" className="goMap">
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="blocTabs"
            style={{ overflowX: "auto", marginTop: "20px" }}
          >
            <div
              className={toggleState === 1 ? "tabs activeTabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Info
            </div>
            <div
              className={toggleState === 2 ? "tabs activeTabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Photos
            </div>
            <div
              className={toggleState === 3 ? "tabs activeTabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Documents
            </div>
          </div>

          <div
            id="info"
            className={toggleState === 1 ? "content  activeContent" : "content"}
            style={{ overflowX: "auto" }}
          >
            <h4 style={{ paddingBottom: "15px", paddingTop: "20px" }}>
              Description
            </h4>
            <div
              className="descriptionWrapper"
              style={{
                background: "#ffff",
                padding: "15px",
                marginBottom: "20px",
                overflow: "scroll",
                height: "300px",
                border: "1px solid #ecec",
                fontSize:"12px"
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
            </div>
            <div>
              <label>Budget:</label>
              <p>{job.budget}</p>
            </div>
            <div>
              <label>State:</label>
              <p>{job.state}</p>
            </div>

            <hr />
            <h4>Schedule Information</h4>
            <label>Start Date:</label>
            <p>
              {/* {new Date(job.startDate.seconds * 1000).toLocaleDateString(
                "en-US"
              )} */}
              {!START_DATE ? "DD/MM/YYYY" : dateFormat(START_DATE, "dd mmm yyyy")}
            </p>

            <label>Due Date:</label>
            <p>
              {/* {new Date(job.dueDate.seconds * 1000).toLocaleDateString("en-US")} */}
              {!DUE_DATE ? "DD/MM/YYYY" : dateFormat(DUE_DATE, "dd mmm yyyy")}
            </p>

            <label>Priority:</label>
            <p>{job.priority}</p>

            <label>Account Manager:</label>
            <p>{job.accountManager}</p>

            <label>Manager:</label>
            <p>{job.manager}</p>

            <label>Staff:</label>
            {staff
              .filter((f) => array2.includes(f.id))
              .map((f) => (
                <li>{f.name}</li>
              ))}

            <hr />

            <h4>Tasks</h4>
            <button onClick={() => openModal(job.id)} style={{margin:"20px 0"}}>+ New Task</button>
            <Modal
              isOpen={modalIsOpen === job.id}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>TASK FORM</h2>
              <button className="modalBtn" onClick={closeModal}>
                close
              </button>
              <label>Template</label>
              <select value={newTaskName} onChange={handleTaskChange}>
                <option>Choose Template...</option>
                {tasks.map(task => (
                  <option value={task.name}>{task.name}</option>
                ))}
              </select>

              <label>Description</label>
              <ReactQuill value={newDesc} onChange={setNewDesc} />
              <div className="row">
                <div className="startDate six columns">
                  <label>Start Date</label>
                  <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setStartDate(date)}
                    className="six columns"
                    dateFormat={"dd/MM/yyyy"}
                    isClearable
                    placeholderText="I have been cleared!"
                  />
                </div>
                <div className="dueDate six columns">
                  <label>Due Date</label>
                  <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={(date) => setEndDate(date)}
                    className="six columns"
                    dateFormat={"dd/MM/yyyy"}
                    isClearable
                    placeholderText="I have been cleared!"
                  />
                </div>
              </div>
              <label>Estimated</label>
              <input
                type="number"
                value={est}
                onChange={(event) => {
                  setEst(event.target.value);
                }}
              />
              <label>Actual</label>
              <input
                type="number"
                value={actual}
                onChange={(event) => {
                  setActual(event.target.value);
                }}
              />
              <label>Remaining</label>
              <input
                type="number"
                value={remaining}
                onChange={(event) => {
                  setRemaining(event.target.value);
                }}
              />
              <input type="submit" value="submit" onClick={addTask} />
            </Modal>
            <div className="tableWrapper">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Start</th>
                  <th>Due</th>
                  <th>Estimated</th>
                  <th>Actual</th>
                  <th>Remaining</th>
                </tr>
                {job.tasks ? (
                  job.tasks.map((task) => (
                    <tr>
                      <td>{task.name}</td>
                      <td>
                        {new Date(
                          task.startDate.seconds * 1000
                        ).toLocaleDateString("en-US")}
                      </td>
                      <td>
                        {new Date(
                          task.dueDate.seconds * 1000
                        ).toLocaleDateString("en-US")}
                      </td>
                      <td>{task.estimated}</td>
                      <td>{task.actual}</td>
                      <td>{task.remaining}</td>
                    </tr>
                  ))
                ) : (
                  <di>UPLOAD TASKS</di>
                )}
              </table>
            </div>
            <button onClick={() => setIsOpenQuoteCost(true)}>+ New Cost</button>
            <div className="modal">
              <Modal
                isOpen={modalIsOpenQuoteCost}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Edit Quote Cost
                </h2>
                <button className="modalBtn" onClick={() => closeModal(true)}>
                  close
                </button>
                <label>Description:</label>
                <input
                  type="text"
                  value={quoteDesc}
                  onChange={(event) => {
                    setQuoteDesc(event.target.value);
                  }}
                />
                <label>Quantity:</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(event) => {
                    setQty(event.target.value);
                  }}
                />
                <input type="submit" value="submit" onClick={addCost} />
              </Modal>
            </div>
          </div>

          <div
            id="photos"
            className={toggleState === 2 ? "content  activeContent" : "content"}
          >
            <h4 style={{ paddingBottom: "15px", paddingTop: "20px" }}>
              Image gallery
            </h4>
            <ImgMultipleUpload
              url={url}
              hide={hide}
              imageName={imageName}
              image={image}
              handleChangeName={handleChangeName}
              handleChange={handleChange}
              handleUpload={handleUpload}
            />
            <input
              className="show"
              placeholder="Name..."
              value={imageName}
              onChange={handleChangeName}
            />
            <input
              className="show"
              type="submit"
              value="submit"
              onClick={addPhoto}
            />

            <input
              type="hidden"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
              }}
            />
            <hr />
            <div className="container">
              {job.images ? (
                job.images.map((img) => (
                  <div className="imgWrapper">
                    <img
                      key={img.id}
                      className="item"
                      src={img.url}
                      alt={img.name}
                      onClick={() => openModal(img.id)}
                    />

                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => setIsOpenYesNo(img.id)}
                      width="35"
                      className="trashIcon"
                    />
                    <div className="modal">
                      <Modal
                        isOpen={modalIsOpenYesNo === img.id}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                          Delete Photo?
                        </h2>
                        <div
                          className="modalBtn"
                          disabled={isLoading}
                          onClick={() => deletePhoto(img.id)}
                        >
                          {isLoading === img.id ? <LoadingSpinner /> : "YES"}
                        </div>
                        <div className="modalBtn" onClick={closeModal}>
                          No
                        </div>
                      </Modal>
                    </div>

                    <div className="modal">
                      <Modal
                        isOpen={modalIsOpen === img.id}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                          {img.name}
                        </h2>
                        <button className="modalBtn" onClick={closeModal}>
                          close
                        </button>
                        <div className="modalPicture">
                          <img
                            src={img.url}
                            alt={img.name}
                            width="100%"
                            height="390"
                          />
                        </div>
                      </Modal>
                    </div>
                  </div>
                ))
              ) : (
                <h4 style={{ height: "20vh", whiteSpace: "nowrap" }}>
                  No Images uploaded
                </h4>
              )}
            </div>
          </div>
          <div
            id="docs"
            className={toggleState === 3 ? "content  activeContent" : "content"}
          >
            <h5>Documents</h5>
            <hr />
            <div style={{ textAlign: "center" }}>
              <div>
                <h3>Job Forms</h3>
              </div>

              <div className="docs" onClick={() => setIsOpenJSEA(true)}>
                JSEA, SWMS, Rescue Plan
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenJSEA}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    JSEA, SWMS, Rescue Plan
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenDPR(true)}>
                Daily Progress Report
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenDPR}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Daily Progress Report
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenTTR(true)}>
                Toolbox Talk Record
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenTTR}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Toolbox Talk Record
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenRB(true)}>
                Resident Balconies
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenRB}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Resident Balconies
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenIR(true)}>
                Incident Report
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenIR}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Incident Report
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenST(true)}>
                Subcontractor Timesheet
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenST}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Subcontractor Timesheet
                  </h2>
                  <div>
                    <p>
                      A site-specific Job Safety Analysis (JSEA), Safe Work
                      Method Statement (SWMS) & Rescue Plan must be developed
                      and agreed to by all workers at the beginning of every
                      project. This form will collect important information to
                      be used in the creation of this documentation. The
                      resulting document will be automatically sent to Abseil
                      Pro management, all workers who enter their email
                      addresses, and to the client if their email address is
                      entered in this form.
                    </p>
                    <p>
                      The project supervisor must ensure that all workers have
                      received the relevant training and hold the required
                      qualifications to perform the work described in this
                      document and that all workers have been inducted and have
                      acknowledged their agreement to this document using the
                      digital signature in this form. This document must be
                      amended and reviewed by all workers as new hazards are
                      identified throughout the course of the project.
                    </p>
                    <p>
                      It is imperative that all information entered in this form
                      is accurate and complete before submitting and commencing
                      work. This form can collect client email address(es) which
                      will automatically forward this information. If any
                      portion of this form requires clarification or review from
                      management, leave the client email field empty, submit
                      this form, and notify the office of your concerns on{" "}
                      <span>
                        <a href="info@abseil.pro">info@abseil.pro</a>
                      </span>{" "}
                      or 0438 257 892.
                    </p>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>

              <div style={{ padding: "20px" }}>
                <h3>Height Safety</h3>
              </div>

              {/* HEIGHT SAFETY INSPECTION FORM */}

              <div className="docs" onClick={() => setIsOpenHSIF(true)}>
                Height Safety Inspection Form
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenHSIF}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      Height Safety Inspection Form
                    </h2>
                    <hr></hr>
                    
                    <div>
                      <HeightAndSafetyForm 
                          newInspector={newInspector}
                          setNewInspector={setNewInspector}
                          heightStartDate={heightStartDate}
                          setHeightStartDate={setHeightStartDate}
                          newInspectionDate={newInspectionDate}
                          setNewInspectionDate={setNewInspectionDate}
                          heightSiteName={heightSiteName}
                          setHeightSiteName={setHeightSiteName}
                          heightEmail={heightEmail}
                          setHeightEmail={setHeightEmail}
                          createHeightSafety={createHeightSafety}
                          startDate={startDate}
                          endDate={endDate}
                          other={other}
                          setOther={setOther}
                          heightSiteAddress={heightSiteAddress}
                          setHeightSiteAddress={setHeightSiteAddress}
                          assetGroupOneQty={assetGroupOneQty}
                          setAssetGroupOneQty={setAssetGroupOneQty}
                          assetGrpOneType={assetGrpOneType}
                          setAssetGrpOneType={setAssetGrpOneType}
                          assetGrpOneInspectionType={assetGrpOneInspectionType}
                          setAssetGrpOneInspectionType={setAssetGrpOneInspectionType}
                          assetGrpOneRating={assetGrpOneRating}
                          setAssetGrpOneRating={setAssetGrpOneRating}
                          assetGrpOneResult={assetGrpOneResult}
                          setAssetGrpOneResult={setAssetGrpOneResult}
                          assetGrpOneNotes={assetGrpOneNotes}
                          setAssetGrpOneNotes={setAssetGrpOneNotes}
                          assetGrpTwoQty={assetGrpTwoQty}
                          setAssetGrpTwoQty={setAssetGrpTwoQty}
                          assetGrpTwoType={assetGrpTwoType}
                          setAssetGrpTwoType={setAssetGrpTwoType}
                          assetGrpTwoInspectionType={assetGrpTwoInspectionType}
                          setAssetGrpTwoInspectionType={setAssetGrpTwoInspectionType}
                          assetGrpTwoRating={assetGrpTwoRating}
                          setAssetGrpTwoRating={setAssetGrpTwoRating}
                          assetGrpTwoResult={assetGrpTwoResult}
                          setAssetGrpTwoResult={setAssetGrpTwoResult}
                          assetGrpTwoNotes={assetGrpTwoNotes}
                          setAssetGrpTwoNotes={setAssetGrpTwoNotes}
                          assetGrp3Qty={assetGrp3Qty}
                          setAssetGrp3Qty={setAssetGrp3Qty}
                          assetGrp3Type={assetGrp3Type}
                          setAssetGrp3Type={setAssetGrp3Type}
                          assetGrp3InspectionType={assetGrp3InspectionType}
                          setAssetGrp3InspectionType={setAssetGrp3InspectionType}
                          assetGrp3Rating={assetGrp3Rating}
                          setAssetGrp3Rating={setAssetGrp3Rating}
                          assetGrp3Result={assetGrp3Result}
                          setAssetGrp3Result={setAssetGrp3Result}
                          assetGrp3Notes={assetGrp3Notes}
                          setAssetGrp3Notes={setAssetGrp3Notes}
                          assetGrp4Qty={assetGrp4Qty}
                          setAssetGrp4Qty={setAssetGrp4Qty}
                          assetGrp4Type={assetGrp4Type}
                          setAssetGrp4Type={setAssetGrp4Type}
                          assetGrp4InspectionType={assetGrp4InspectionType}
                          setAssetGrp4InspectionType={setAssetGrp4InspectionType}
                          assetGrp4Rating={assetGrp4Rating}
                          setAssetGrp4Rating={setAssetGrp4Rating}
                          assetGrp4Result={assetGrp4Result}
                          setAssetGrp4Result={setAssetGrp4Result}
                          assetGrp4Notes={assetGrp4Notes}
                          setAssetGrp4Notes={setAssetGrp4Notes}
                          assetGrp5Qty={assetGrp5Qty}
                          setAssetGrp5Qty={setAssetGrp5Qty}
                          assetGrp5Type={assetGrp5Type}
                          setAssetGrp5Type={setAssetGrp5Type}
                          assetGrp5InspectionType={assetGrp5InspectionType}
                          setAssetGrp5InspectionType={setAssetGrp5InspectionType}
                          assetGrp5Rating={assetGrp5Rating}
                          setAssetGrp5Rating={setAssetGrp5Rating}
                          assetGrp5Result={assetGrp5Result}
                          setAssetGrp5Result={setAssetGrp5Result}
                          assetGrp5Notes={assetGrp5Notes}
                          setAssetGrp5Notes={setAssetGrp5Notes}
                          assetGrp6Qty={assetGrp6Qty}
                          setAssetGrp6Qty={setAssetGrp6Qty}
                          assetGrp6Type={assetGrp6Type}
                          setAssetGrp6Type={setAssetGrp6Type}
                          assetGrp6InspectionType={assetGrp6InspectionType}
                          setAssetGrp6InspectionType={setAssetGrp6InspectionType}
                          assetGrp6Rating={assetGrp6Rating}
                          setAssetGrp6Rating={setAssetGrp6Rating}
                          assetGrp6Result={assetGrp6Result}
                          setAssetGrp6Result={setAssetGrp6Result}
                          assetGrp6Notes={assetGrp6Notes}
                          setAssetGrp6Notes={setAssetGrp6Notes}
                          assetGrp7Qty={assetGrp7Qty}
                          setAssetGrp7Qty={setAssetGrp7Qty}
                          assetGrp7Type={assetGrp7Type}
                          setAssetGrp7Type={setAssetGrp7Type}
                          assetGrp7InspectionType={assetGrp7InspectionType}
                          setAssetGrp7InspectionType={setAssetGrp7InspectionType}
                          assetGrp7Rating={assetGrp7Rating}
                          setAssetGrp7Rating={setAssetGrp7Rating}
                          assetGrp7Result={assetGrp7Result}
                          setAssetGrp7Result={setAssetGrp7Result}
                          assetGrp7Notes={assetGrp7Notes}
                          setAssetGrp7Notes={setAssetGrp7Notes}
                          assetGrp8Qty={assetGrp8Qty}
                          setAssetGrp8Qty={setAssetGrp8Qty}
                          assetGrp8Type={assetGrp8Type}
                          setAssetGrp8Type={setAssetGrp8Type}
                          assetGrp8InspectionType={assetGrp8InspectionType}
                          setAssetGrp8InspectionType={setAssetGrp8InspectionType}
                          assetGrp8Rating={assetGrp8Rating}
                          setAssetGrp8Rating={setAssetGrp8Rating}
                          assetGrp8Result={assetGrp8Result}
                          setAssetGrp8Result={setAssetGrp8Result}
                          assetGrp8Notes={assetGrp8Notes}
                          setAssetGrp8Notes={setAssetGrp8Notes}

                      />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>

              {/* HEIGHT SAFETY INSPECTION CERTIFICATE */}

              <div className="docs" onClick={() => setIsOpenHSIC(true)}>
                Height Safety Inspection Certificate
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenHSIC}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={bodyCustomStyles}
                    contentLabel="Example Modal"
                  >
                    
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      
                    </h2>
                    
                    <div>
                      <HeightSafetyCertificate job={job} />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>

              {/* BODY */}

              <div className="docs" onClick={() => setIsOpenHSBody(true)}>
                Height Safety - Body
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenHSBody}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={bodyCustomStyles}
                    contentLabel="Example Modal"
                  >
                    
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      
                    </h2>
                    
                    <div>
                      <HeightSafetyBody job={job} />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>

              {/* INSPECTION SUMMARY */}

              <div className="docs" onClick={() => setIsOpenHSInspectionSummary(true)}>
                Inspection Summary
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenHSInspectionSummary}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={bodyCustomStyles}
                    contentLabel="Example Modal"
                  >
                    
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      
                    </h2>
                    
                    <div>
                      <InspectionSummary job={job} />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>

              {/* HEIGHT SAFETY ASSET MAP */}

              <div className="docs" onClick={() => setIsOpenHSAssetMap(true)}>
                Height Safety Asset Map
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenHSAssetMap}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={bodyCustomStyles}
                    contentLabel="Example Modal"
                  >
                    
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      
                    </h2>
                    
                    <div>
                      <HeightSafetyAssetMap job={job} />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>


              {/* HEIGHT INSPECTION REPORT */}

              <div className="docs" onClick={() => setIsOpenInspectionReport(true)}>
                Height Inspection Report
              </div>
              <div className="modal">
                  <Modal
                    isOpen={modalIsOpenInspectionReport}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={bodyCustomStyles}
                    contentLabel="Example Modal"
                  >
                    
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      
                    </h2>
                    
                    <div>
                      <InspectionReport job={job} />
                    </div>

                    <button className="modalBtn heightSafetyBtn" onClick={closeModal}>
                      close
                    </button>
                  </Modal>
              </div>







              <div style={{ padding: "20px" }}>
                <h3 style={{ marginBottom: "10px" }}>Sales & Estimating</h3>
              </div>

              <div className="docs" onClick={() => setIsOpenExQuote(true)}>
                External Quote
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenExQuote}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    External Quote
                  </h2>
                  <ExternalQuote job={job} id="target" closeModal={closeModal} />
                </Modal>
              </div>

              <div className="docs" onClick={() => setIsOpenInQuote(true)}>
                Internal Quote
              </div>
              <div className="modal">
                <Modal
                  isOpen={modalIsOpenInQuote}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Internal Quote
                  </h2>
                  <div>
                    <hr />
                  </div>
                  <button className="modalBtn" onClick={closeModal}>
                    close
                  </button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
      <pre><code>p {
          margin-bottom: 0;
        }</code></pre>
        .wrapper {
          position: relative;
        }

        .jobNameWrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #051e34;
        }

        .editBtn {
          display: flex;
          gap: 15px;
          align-items: center;
          font-size: 23px;
          cursor: pointer
        }

        .editBtn:hover {
          color: green;
        }

        .editIcon {
          font-size: 25px;
        }

        .heroImage {
          height: 300px;
          overflow: hidden;
          position: relative;
        }

        .jobImage {
          object-fit: cover;
          object-position: center;
          height: 100%;
          width: 100%;
        }

        .darken {
          background: black;
          position: absolute;
          width: 100%;
          height: 300px;
          opacity: 0.5;
        }

        .clientWrapper {
          position: absolute;
          top: 0;
          color: #ffff;
          padding: 15px;
        }

        .clientName {
          font-size: 40px;
          text-shadow: 0 1px black;
        }

        .info {
          display: flex;
          align-items: baseline;
          gap: 15px;
        }

        .icon {
          font-size: 20px;
          width: 20px;
          text-shadow: 0 1px black;
        }

        .contact {
          color: #ffff;
          text-shadow: 0 1px black;
        }

        .location {
          padding-bottom: 8px;
          text-shadow: 0 1px black;
          width: 60%;
        }

        .goMap {
          color: #fff;
          border: 1px solid #ffff;
          padding: 5px;
          border-radius: 5px;
          transition: 0.15s ease;
          text-shadow: 0 1px black;
        }

        .goMap:hover {
          color: black;
          background: #ffff;
        }

        .blocTabs {
          display: flex;
        }

        .tabs {
          padding: 15px;
          text-align: center;
          width: 20%;
          background: rgba(128, 128, 128, 0.075);
          cursor: pointer;
          border-bottom: 1px solid rgba(0, 0, 0, 0.274);
          box-sizing: content-box;
          position: relative;
          outline: none;
        }

        .tabs:not(:last-child) {
          border-right: 1px solid rgba(0, 0, 0, 0.274);
        }

        .activeTabs {
          background: white;
          border-bottom: 1px solid transparent;
        }

        .activeTabs::before {
          content: "";
          display: block;
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% + 2px);
          height: 5px;
          background: #e6eaec;
        }

        .contentTabs {
          flex-grow: 1;
        }

        .content {
          background: white;
          width: 100%;
          height: 100%;
          display: none;
          padding: 15px;
        }

        .activeContent {
          display: block;
        }

        .container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          justify-content: center;
          gap: 15px;
          margin-bottom: 50px;
        }

        .hide {
          display: ${hide};
        }

        .show {
          display: ${show};
        }

        .modalBtn {
          margin-bottom: 20px;
        }

        .imgWrapper > img {
          width: 100%;
          height: auto;
        }

        .modalPicture > img {
          width: 100%;
          height: auto;
        }

        .tableWrapper {
          overflow-x: auto;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          margin: 0 0 50px;
        }

        td,
        th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
          white-space: nowrap;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }

        .docs {
          transition: 0.3s;
        }

        .docs:hover {
          text-decoration: underline;
          color: blue;
          cursor: pointer;
        }

        .docs:focus {
          text-decoration: underline;
          color: blue;
        }

        .quoteDesc {
          vertical-align: baseline;
        }

        .tdDesc {
          text-align: left;
          font-size: 12px;
        }

        .hide {
          display: none;
        }

        .modalBtn {
          background: #ffff;
        }

        .heightSafetyBtn {
          margin-bottom: 100px;
        }

        @media screen and (max-width: 990px) {
          .jobNameWrapper {
            justify-content: space-between;
          }

          .loc {
            width: 31px;
          }
        }
      `}</style>
    </>
  );
}

export default jobProfile;
