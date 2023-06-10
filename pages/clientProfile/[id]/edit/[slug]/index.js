/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../../../../../src/config/firebase.config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';



function EditClient() {
  const [client, setClient] = useState({});
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const router = useRouter();

  const clientsCollectionRef = collection(db, "clients");

  useEffect(() => {
    setLoading(true);
    const getClient = async () => {
      const url = window.location.href;
      const lastSegment = url.split("/").pop();
      const q = query(clientsCollectionRef, where("slug", "==", lastSegment));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setClient(res[0]);
      setLoading(false);
    };
    getClient();
  }, []);

  const imageListRef = ref(storage, `client/${client.name}`)
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `${client.name}/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageURL(url)
            })
           
        })
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                  setImageURL(url);
              });
          });
        });
      }, []);
  
  

  async function updateClient() {
    setLoading(true);
  
    const updatedClient = {
      phone: phone == "" ? client.phone : phone ,
      email: email == "" ? client.email : email ,
      website: website == "" ? client.website : website,
      physical_address: address == "" ? client.physical_address : address,
      postal_address: postal == "" ? client.postal_address : postal,
      image: imageURL == null ? client.image : imageURL
    };
  
    const id = client.id;
    const clientDoc = doc(db, 'clients', id);
    await updateDoc(clientDoc, updatedClient);
    setLoading(false);
    router.push(`/clientProfile/${client.id}`);
  }
  

  return (
    <div>
      {loading && <LoadingSpinner />}
      <h1>Client Information</h1>
      <hr />
      <table>
        <tbody>
          <tr>
            <td><label>Phone</label></td>
            <td><input placeholder={client.phone} type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label>Email</label></td>
            <td><input placeholder={client.email} type="tel" value={email} onChange={e => setEmail(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label>Website</label></td>
            <td><input placeholder={client.website} type="url" value={website} onChange={e => setWebsite(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label>Physical Address</label></td>
            <td><input placeholder={client.physical_address} value={address} onChange={e => setAddress(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label>Postal Address</label></td>
            <td><input placeholder={client.postal_address} value={postal} onChange={e => setPostal(e.target.value)} /></td>
          </tr>
          <tr>
        <td><label>Image</label></td>
        <td>
          {client.image && (
            <img src={client.image} alt="Client" style={{ width: '100px', height: 'auto' }} />
          )}
        </td>
      </tr>
      <tr>
        <td><label>Upload New Image</label></td>
        <td>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button disabled={!imageUpload} onClick={uploadImage}>
                Upload
              </button>
            </td>
            <td>
              {imageURL ? (
                <img src={imageURL} width="200" />
              ) : (
                <div className="placeholder">Upload file</div>
              )}
            </td>
      </tr>
        </tbody>
      </table>
      <button type="submit" onClick={updateClient}>Save</button>
      <style jsx>{`
        label {
          min-width: 200px;
        }
      `}</style>
    </div>
  );
}

export default EditClient;
