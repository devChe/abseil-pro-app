import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Painterro from "painterro";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { db, storage } from "../src/config/firebase.config";


const Paint = ({ onSave, photo, jobs, setJobs, setIsLoading }) => {

  useEffect(() => {
    Painterro({
      colorScheme: {
        main: '#303134',
        control: '#ADC0C3'
      },
        defaultLineWidth: "5",
        defaultSize: "fill",
        fixMobilePageReloader: true,
        toolbarHeightPx: 54,
        buttonSizePx:42,
        hiddenTools: ['rect', 'ellipse', 'brush', 'resize', 'open', 'bucket', 'clear', 'settings', 'eraser'],
      saveHandler: (image, done) => {
        setIsLoading(true)
        const imageRef = ref(
          storage,
          `photos_${photo.jobNum}/edited + ${v4()}`
        );
        const message4 = image.asDataURL();
        console.log(message4)
        uploadString(imageRef, message4, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // setImageList((prev) => [...prev, url]);
            const id = jobs?.filter((job) => job.data.jobNumber === photo.jobNum).map((res) => res);
            const jobDoc = doc(db, "jobs", id[0].id);
            updateDoc(jobDoc, {
              photos: arrayUnion({
                id: "IMG:" + v4(),
                path: imageRef.fullPath,
                url: url,
                date: new Date(),
                client: photo.client,
                clientID: photo.clientID,
                createdTIme: photo.createdTIme,
                name: photo.name,
                jobName: photo.jobName,
                jobNum: photo.jobNum,
              }),
            }).then((success) => {
              if(success) {
                  setIsLoading(false);
              }
            })
          });
        });
        done(true);
      },
    }).show(photo.url);
    //eslint-disable-next-line
  }, []);
  return null;
};

export default Paint;
