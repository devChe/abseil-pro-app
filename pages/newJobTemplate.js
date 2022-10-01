/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db, storage } from "../src/config/firebase.config";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const newJobTemplate = () => {
  const [newTempName, setNewTempName] = useState("");
  const [newTempDesc, setNewTempDesc] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [jobCategories, setJobCategories] = useState([]);

  const categoryCollectionRef = collection(db, "jobCategories");
  const jobTemplateCollectionRef = collection(db, "jobTemplates");

  useEffect(() => {
    const getCategories = async () => {
      const q = query(categoryCollectionRef, orderBy("name"));
      const data = await getDocs(q);
      setJobCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCategories();
  }, []);

  const addJobTemplate = async () => {
    await addDoc(jobTemplateCollectionRef, {
      name: newTempName,
      description: newTempDesc,
      category: category,
      costs: cost
    });
    window.location.pathname = "/jobTemplate";
  };

  return (
    <>
      <div>
        <h1>New Job Template</h1>
        <hr />
        <div className="formWrapper">
          <div>
            <label>Template Name</label>
            <input
              value={newTempName}
              width="100%"
              onChange={(e) => setNewTempName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <ReactQuill value={newTempDesc} onChange={setNewTempDesc} />
          </div>
          <div>
            <label>Job Category</label>
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option>Choose category...</option>
              {jobCategories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Job Costs are</label>
            <select
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            >
              <option>Estimated</option>
              <option>Actual</option>
            </select>
          </div>
          <div>
            <p>
              When this template is applied directly to a job, are the costs
              added to the job as actual costs or estimated costs?
            </p>
          </div>
        </div>
        <div>
          <button type="submit" onClick={addJobTemplate}>
            Submit
          </button>
        </div>
      </div>
      <style jsx>{`
        .formWrapper div {
          padding: 15px;
        }

        .ql-editor {
          height: 500px;
        }
      `}</style>
    </>
  );
};

export default newJobTemplate;
