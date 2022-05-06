import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Avatar, Button, Divider, Image } from "@mantine/core";
import { GiHollowCat } from "react-icons/gi";

import { Header } from "src/components/Layout/Header";
import { auth, db, storage } from "src/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";

const photo = () => {
  const [comment, setComment] = useState("");
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<string | null>(null);
  const [petImagePreview, setPetImagePreview] = useState<null | string>(null);
  const [petPhoto, setPetPhoto] = useState<File | null>(null);
  const [petAll, setPetAll] = useState([
    {
      id: "",
      petName: "",
      petImage: "",
    },
  ]);

  const getPet = () => {
    const q = query(collection(db, "petProfile"));
    onSnapshot(q, (snapshot) => {
      setPetAll(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
        }))
      );
    });
    console.log(petAll);
  };

  const onChangePetname = async (e: any) => {
    console.log(e.target.value);
    setPetName(e.target.value);
    const name = e.target.value;
    const q = query(collection(db, "petProfile"), where("petName", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().petImage);
      setPetImage(doc.data().petImage);
    });
  };

  const onChangeImageHandler = async (e: any) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setPetPhoto(e.target.files[0]);
    setPetImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const sendTweet = async (e: any) => {
    e.preventDefault();
    let url = "";
    if (petPhoto) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + petPhoto.name;
      await uploadBytes(ref(storage, `tweetImages/${fileName}`), petPhoto);
      url = await getDownloadURL(ref(storage, `tweetImages/${fileName}`));
    }
    console.log(url);

    await addDoc(collection(db, "tweets"), {
      petName: petName,
      petImage: petImage,
      petPhoto: url,
      comment: comment,
      timestamp: serverTimestamp(),
    });

    setPetName("");
    setPetImage(null);
    setPetImagePreview(null);
  };

  useEffect(() => {
    const q = query(collection(db, "tweets"));
    onSnapshot(q, (snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
          comment: doc.data().comment,
          petPhoto: doc.data().petPhoto,
          timestamp: doc.data().timestamp,
        }))
      );
    });

    const profile = query(collection(db, "petProfile"));
    onSnapshot(profile, (snapshot) => {
      setPetAll(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
        }))
      );
    });
  }, []);

  const [tweets, setTweets] = useState([
    {
      id: "",
      petName: "",
      petImage: "",
      comment: "",
      petPhoto: "",
      timestamp: null,
    },
  ]);
  const getTweets = () => {
    const q = query(collection(db, "tweets"));
    onSnapshot(q, (snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
          comment: doc.data().comment,
          petPhoto: doc.data().petPhoto,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  };

  return (
    <Header title="写真一覧">
      <button onClick={getPet} className="bg-gray-500 text-white p-2">
        GetPet
      </button>
      <form
        onSubmit={sendTweet}
        className="bg-primary-green w-96 m-10 px-8 py-2"
      >
        <div className="flex">
          <div>
            <Avatar src={petImage} className="rounded-full w-12 h-12" />
          </div>
          <div className="mx-1">
            <select onChange={onChangePetname}>
              {petAll.map((pet) => (
                <option key={pet.id} value={pet.petName}>
                  {pet.petName}
                </option>
              ))}
            </select>
            <input
              className="text-primary-brown bg-white w-56 rounded-md p-1"
              type="text"
              placeholder="タイトル"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="image">
          <div className="bg-gray-300 w-80 h-48 mx-auto my-3 cursor-pointer">
            {petImagePreview ? (
              <img
                src={petImagePreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <GiHollowCat size={64} className="m-auto h-32 text-center" />
            )}
          </div>
          <input
            id="image"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={onChangeImageHandler}
          />
        </label>
        <button
          type="submit"
          disabled={!comment}
          className="my-7 w-full h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl shadow-lg"
        >
          作成
        </button>
      </form>

      <Divider size="md" />

      <button onClick={getTweets} className="bg-gray-500 text-white p-2">
        getTweets
      </button>
      <div className="flex">
        {tweets.map((pet) => (
          <div key={pet.id} className="bg-primary-green w-96 m-10">
            <div className="flex">
              <div>
                <img
                  src={pet.petImage}
                  height={60}
                  width={60}
                  className="m-3 rounded-full"
                />
              </div>
              <div className="mx-1">
                <p className="text-white p-1 mt-2 mb-1">{pet.petName}</p>
                <p className="text-primary-brown bg-white w-64 rounded-md m-0 p-1">
                  {pet.comment}
                </p>
              </div>
              {/* <p>{pet.timestamp}</p> */}
            </div>
            <img
              src={pet.petPhoto}
              className="block object-cover h-48 mx-auto my-3"
            />
            <div className="flex">
              <Link href="/">
                <a className="block mx-auto text-center text-primary-orange text-lg m-4 flex-1">
                  Tap
                </a>
              </Link>
              <input type="checkbox" />
            </div>
          </div>
        ))}
      </div>
    </Header>
  );
};

export default photo;
