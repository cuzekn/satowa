import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

import { Header } from "src/components/Layout/Header";
import { db } from "src/firebase/firebaseConfig";

const album = () => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [albums, setAlbums] = useState([
    {
      id: "",
      preview: "",
      title: "",
      comment: "",
      username: "",
      timstamp: null,
    }
  ]);

  const handleChangeFile = (e: any) => {
    const { files } = e.target;
    setPreview(window.URL.createObjectURL(files[0]));
  };

  const newAlbum = (e: any) => {
    e.preventDefault();
    addDoc(collection(db, "albums"), {
      text: title,
      preview,
      timestanmp: serverTimestamp(),
    });
  }

  return (
    <Header title="album">
      <div className="flex fixed top-0 right-0 justify-center items-center p-3 m-8 w-6 h-6 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-praitext-primary-orange lg:bg-green-500 xl:bg-blue-500">
        <div className="block  sm:hidden md:hidden lg:hidden xl:hidden">al</div>
        <div className="hidden sm:block  md:hidden lg:hidden xl:hidden">sm</div>
        <div className="hidden sm:hidden md:block  lg:hidden xl:hidden">md</div>
        <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">lg</div>
        <div className="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
      </div>

      <form onSubmit={newAlbum} className="bg-primary-green m-10">
        <div className="flex">
          <div className="bg-white w-72 h-72 m-10">
            <img src={preview} className="w-72 h-96" />
            <div className="">
              {/* <HiOutlinePhotograph className="text-5xl" /> */}
            </div>
            <input type="file" onChange={handleChangeFile} />
          </div>
          <div className="list-inside border-2 w-2/3 h-96 m-10 text-center">
            <h1>name</h1>
            <input
              type="text"
              value={title}
              placeholder="タイトル"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-primary-thinOrange block mx-auto mb-10 text-4xl px-36 py-2 rounded-full hover:bg-primary-orange hover:text-white">
          作成
        </button>
      </form>
    </Header>
  );
};

export default album;
