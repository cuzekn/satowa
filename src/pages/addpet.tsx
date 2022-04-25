import React, { useCallback, useEffect, useRef, useState } from "react";
import { GiHollowCat } from "react-icons/gi";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { Header } from "src/components/Layout/Header";
import { db, storage } from "src/firebase/firebaseConfig";

const Addpet = () => {
  const [petname, setPetname] = useState("");
  const [petImage, setPetImage] = useState<File | null>(null);
  const [petImagePreview, setPetImagePreview] = useState<File | null>(null);

  const iconInputRef = useRef<HTMLInputElement | null>(null);

  // const handlePreviewFile = (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, "images/" + file.name);
  //     uploadBytes(storageRef, file).then((snapshot) => {
  //       console.log(file)
  //     });
  //   console.log(file);

  //   }

  // const handleChangeImage = (e) => {

  // }

  const getURL = async(e:any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(file);
    });
    await addDoc(collection(db, "pets"), {
      petImage: storageRef
    })
  };

  const handlePreviewFile = (e) => {
    const { files } = e.target;
    setPetImagePreview(window.URL.createObjectURL(files[0]));
    const storageRef = ref(storage, "images/" + files[0].name);
    uploadBytes(storageRef, files[0]).then((snapshot) => {
      console.log(files[0]);
      setPetImage(files[0]);
    });
  };

  const addPetProfile = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "pets"), {
      petname: petname,
      petImage: petImage,
    });
    uploadBytesResumable(ref(storage, `images/${petImage.name}`), petImage);

    // const uploadPetImg = uploadBytesResumable(
    //   ref(storage, `images/` + petImage.name),
    //   petImage
    // );
    // uploadPetImg.on("state_changed");
    // console.log(petImage);
    setPetImage(null);
    setPetname("");

    // await addDoc(collection(db, "pets"), {
    //   petname: petname,
    //   petImage: petImage,
    //   timestamp:serverTimestamp(),
    // });
    // console.log(petname);
    // console.log(petImaKge);

    //     const S =
    //       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //     const N = 16;
    //     const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    //       .map((n) => S[n % S.length])
    //       .join("");
    //     const fileName = randomChar + "_" + setPetImageName;
    //     const uploadPetImg = uploadBytesResumable(
    //       ref(storage, `images/${fileName}`),
    //       petImageName
    //     );
    //     uploadPetImg.on(
    //       "state_changed",

    //       () => {},
    //       (err) => {
    //         alert(err.message);
    //       },
    //       async () => {
    //         await getDownloadURL(ref(storage, `images/${fileName}`)).then(
    //           async () => {
    //             addDoc(collection(db, "pets"), {
    //               petname: petname,
    //               petimage: petImageName,
    //               timestamp: serverTimestamp(),
    //             });
    //           }
    //         );
    //       }
    //     );

    //   setPetImage(null);
    //   setPetname("")
  };

  return (
    <Header>
      <input
        id="image"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={getURL}
        required
      />
      <div className="my-6 w-96 bg-white rounded-xl">
        <form action="" onSubmit={addPetProfile}>
          <label htmlFor="name">ペットの名前</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="たま"
            required
            value={petname}
            onChange={(e) => setPetname(e.target.value)}
            className="px-2 w-full h-10 rounded-md border-2 border-primary-orange hover:border-primary-thinOrange focus:outline-primary-brown"
          />
          <label htmlFor="image">
            <div className="w-32 h-32 rounded-full border-2 cursor-pointer">
              {petImagePreview ? (
                <img
                  src={petImagePreview}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <GiHollowCat size={64} className="m-auto h-32 text-center" />
              )}
            </div>
            <input
              id="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handlePreviewFile}
              className="hidden"
              required
            />
          </label>
          <button
            onClick={addPetProfile}
            onChange={handlePreviewFile}
            className="mt-4 mb-8 w-full h-12 text-2xl hover:text-white bg-primary-thinOrange hover:bg-primary-orange rounded-3xl shadow-lg"
          >
            作成
          </button>
        </form>
      </div>
    </Header>
  );
};

export default Addpet;
