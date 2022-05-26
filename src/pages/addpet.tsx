import { Divider, Select } from "@mantine/core";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import dayjs from "dayjs";
import { Calendar } from "@mantine/dates";

import { Header } from "src/components/Layout/Header";
import PetProfiles from "src/components/PetProfiles";
import { storage, auth, db } from "src/firebase/firebaseConfig";

const addpet = () => {
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<File | null>(null);
  const [petImagePreview, setPetImagePreview] = useState<string | undefined>(
    undefined
  );
  const [petKinds, setPetKinds] = useState<string>("");
  const [petGender, setPetGender] = useState<boolean>(false);
  const [petMeet, setPetMeet] = useState<string[] | undefined>(undefined);
  const [petBirthDay, setPetBirthDay] = useState<string[] | undefined>(
    undefined
  );
  const [petProfile, setPetProfile] = useState([
    {
      id: "",
      petName: "",
      petImage: "",
      petImageName: "",
    },
  ]);

  const onChangeImageHandler = async (e: any) => {
    console.log(e.target.files[0]);
    setPetImage(e.target.files[0]);
    setPetImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const addImage = async (petImage: any) => {
    // e.preventDefault();
    let url = "";
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");
    const fileName = randomChar + "_" + petImage.name;
    console.log(fileName);
    // console.log("jpg: " + petImageName);
    await uploadBytes(ref(storage, `petProfileImages/${fileName}`), petImage);
    url = await getDownloadURL(ref(storage, `petProfileImages/${fileName}`));
    console.log(url);

    auth.onAuthStateChanged((user) => {
      if (user) {
        addDoc(collection(db, "petProfile"), {
          user: user.uid,
          petName: petName,
          petImage: url,
          // petImageName: petImageName,
          petGender: petGender,
          petKinds: petKinds,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    });

    setPetName("");
    setPetImage(null);
    setPetImagePreview(undefined);
    // setPetImageName("");
  };

  // useEffect(() => {
  //   const q = query(collection(db, "petProfile"));

  //   onSnapshot(q, (snapshot) => {
  //     setPetProfile(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         petName: doc.data().petName,
  //         petImage: doc.data().petImage,
  //         petImageName: doc.data().petImageName,
  //       }))
  //     );
  //   });
  // }, []);

  return (
    <Header title="ペット一覧">
      <main>
        <h1 className="p-4 text-center text-xl">ペット一覧</h1>
        <PetProfiles id={""} petName={""} petImage={""} petImageName={""} />
      </main>
      <div className="w-80 rounded-xl bg-white text-center">
        <h1 className="pt-4 text-xl">ペットの登録</h1>
        <Divider my="xs" className="mx-5" />
        <form action="">
          <label htmlFor="name" className="mt-2">
            名前
          </label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="豆助"
            required
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
          />
          <br />
          <label htmlFor="image">
            <p className="pt-2">画像</p>
            <div className="mx-auto mt-3 h-32 w-32 cursor-pointer rounded-full border-2 border-primary-orange">
              {petImagePreview ? (
                <img
                  src={petImagePreview!}
                  className="h-32 w-full rounded-full object-cover"
                />
              ) : (
                <FiImage
                  size={64}
                  width={1}
                  className="mx-auto h-full text-primary-green line-through"
                />
              )}
            </div>
            <input
              id="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onChangeImageHandler}
              className="hidden"
              required
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">種類</p>
            <input
              placeholder="柴犬"
              type="text"
              required
              value={petKinds}
              onChange={(e) => setPetKinds(e.target.value)}
              className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">性別</p>
            <Select
              data={["女の子", "男の子"]}
              placeholder="女の子 or 男の子"
              variant="unstyled"
              required
              // onChange={(e) => setPetGender(e)}
              className="mt-2 ml-8 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="meetDate">
            <p className="pt-2">お迎えした日</p>
            <input
              placeholder="2020/01/01"
              id="meetDate"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="mt-2 h-10 w-64 cursor-pointer rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>
          <label htmlFor="">
            <p className="pt-2">誕生日</p>
            <input
              placeholder="2020/01/01"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="mt-2 h-10 w-64 rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
            />
          </label>

          <button
            onClick={addImage}
            disabled={!petName || !petImage}
            className="mt-4 mb-8  h-12 w-72 rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white disabled:bg-slate-300"
          >
            作成
          </button>
        </form>
      </div>
    </Header>
  );
};

export default addpet;
