import { Avatar, Button, Image } from "@mantine/core";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Header } from "src/components/Layout/Header";
import { auth, db } from "src/firebase/firebaseConfig";

const photo = () => {
  const [comment, setComment] = useState("");
  const [petName, setPetName] = useState("");
  const [petAll, setPetAll] = useState([
    {
      id: "",
      petName: "",
      petImage: "",
    },
  ]);

  useEffect(() => {
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
  }, []);

  return (
    <Header title="写真一覧">
      <form className="bg-primary-green w-96 m-10 px-8 py-2">
        <div className="flex">
          <div>
            <Avatar src={petName} className="rounded-full w-12 h-12" />
          </div>
          <div className="mx-1">
            <select name="" id="">
              {petAll.map((pet) => (
                <option key={pet.id} value={pet.petName}>
                  {pet.petName}
                </option>
              ))}
            </select>
            <input
              className="text-primary-brown bg-white w-56 rounded-md p-1"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-gray-300 w-80 h-48 mx-auto my-3">img</div>
        <button
          type="submit"
          disabled={!comment}
          className="my-7 w-full h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl shadow-lg"
        >
          作成
        </button>
      </form>
    </Header>
  );
};

export default photo;
