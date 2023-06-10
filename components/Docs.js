import { useState } from 'react';
import { db, storage, storageRef } from '../src/config/firebase.config';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';



const DocumentPage = ({job}) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (file) {
      const fileRef = ref(storageRef, file.name);
  
      uploadBytes(fileRef, file)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(fileRef).then((downloadURL) => {
            setUploadedFiles((prevFiles) => [
              ...prevFiles,
              { name: file.name, url: downloadURL },
            ]);
            setUploadProgress(0);
  
            // Update Firestore document
            const id = job.id; // Replace with the actual job ID
            const jobDoc = doc(db, 'jobs', id);
            updateDoc(jobDoc, {
              documents: arrayUnion({ url: downloadURL }),
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



  return (
    <div>
      <h1>Document Page</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {uploadProgress > 0 && (
        <p>Uploading: {uploadProgress}% completed</p>
      )}
      <h2>Uploaded Files</h2>
      <ul>
        
        {uploadedFiles.map((uploadedFile, index) => (
          <li key={index}>
            <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
              {uploadedFile.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPage;
