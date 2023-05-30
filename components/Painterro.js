import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Painterro from "painterro";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { db, storage } from "../src/config/firebase.config";


const Paint = ({ onSave, img, jobs, setJobs, setIsLoading }) => {

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
        hiddenTools: ['brush', 'resize', 'open', 'bucket', 'clear', 'settings', 'eraser','zoomin', 'zoomout'],
      saveHandler: (image, done) => {
        setIsLoading(true)
        const imageRef = ref(
          storage,
          `photos_${img.jobNum}/edited + ${v4()}`
        );
        const message4 = image.asDataURL();
        console.log(message4)
        uploadString(imageRef, message4, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // setImageList((prev) => [...prev, url]);
            const id = jobs?.filter((job) => job.data.jobNumber === img.jobNum).map((res) => res);
            const jobDoc = doc(db, "jobs", id[0].id);
            updateDoc(jobDoc, {
              photos: arrayUnion({
                id: "IMG:" + "Edited" + v4(),
                path: imageRef.fullPath,
                url: url,
                date: img.date,
                client: img.client,
                clientID: img.clientID,
                createdTime: img.createdTime,
                name: img.name,
                jobName: img.jobName,
                jobNum: img.jobNum,
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
    }).show(img.url);
    //eslint-disable-next-line
  }, []);
  return null;
};

export default Paint;
