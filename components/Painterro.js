import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Painterro from "painterro";
import { useEffect } from "react";
import { v4 } from "uuid";
import { db, storage } from "../src/config/firebase.config";



const Paint = ({ onSave, photo, jobs, setJobs }) => {

  const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

  useEffect(() => {
    Painterro({
        defaultLineWidth: "5",
        defaultSize: "fill",
        fixMobilePageReloader: true,
        toolbarHeightPx: 54,
        buttonSizePx:42,
      saveHandler: (image, done) => {
        const imageRef = ref(
          storage,
          `photos_${photo.jobNum}/edited + ${v4()}`
        );
        const message4 = image.asDataURL();
        uploadString(imageRef, message4, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // setImageList((prev) => [...prev, url]);
            const id = jobs?.filter((job) => job.data.jobNumber === photo.jobNum).map((res) => res);
            console.log(id);
            const jobDoc = doc(db, "jobs", id[0].id);
            updateDoc(jobDoc, {
              photos: arrayUnion({
                id: "IMG:" + v4(),
                path: imageRef.fullPath,
                url: url,
                date: new Date(),
                client: photo.client,
                clientID: photo.clientID,
                name: photo.name,
                jobName: photo.jobName,
                jobNum: photo.jobNum,
              }),
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
