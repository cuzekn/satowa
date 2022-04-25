import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GiHollowCat } from "react-icons/gi";

import { Footer } from "src/components/Layout/Footer";
import { Header } from "src/components/Layout/Header";
import { db, storage } from "src/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

const Home: NextPage = () => {
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<File | null>(null);
  const [petImagePreview, setPetImagePreview] = useState<File | null | string>(null);

  const [petProfile, setPetProfile] = useState([
    {
      id: "",
      petName: "",
      petImage: "",
    },
  ]);

  useEffect(() => {
    const q = query(collection(db, "petProfile"));
    onSnapshot(q, (snapshot) => {
      setPetProfile(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
        }))
      );
    });
  }, []);

  const onChangeImageHandler = async (e:any) => {
    console.log(e.target.files[0]);
    setPetImage(e.target.files[0]);
    setPetImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const addImage = async () => {
    let url = "";
    if (petImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + petImage.name;
      await uploadBytes(ref(storage, `petProfileImages/${fileName}`), petImage);
      url = await getDownloadURL(ref(storage, `petProfileImages/${fileName}`));
    }
    console.log(url);

    await addDoc(collection(db, "petProfile"), {
      petName: petName,
      petImage: url,
    });

    setPetName("");
    setPetImage(null);
    setPetImagePreview(null);
  };

  return (
    <>
      <Header title="satoWa">
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Header>

      <main>
        <div className="flex justify-items-center lg:mx-auto">
          <div className="lg:mx-auto">
            <Image
              src="/images/dog.jpg"
              alt="Picture of the author"
              width={1440}
              height={500}
              objectFit="contain"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="my-6 w-96 bg-white rounded-xl">
            <label htmlFor="name">ペットの名前</label>
            <br />
            <input
              id="name"
              type="text"
              placeholder="ペットの名前を入力してください"
              required
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="px-2 w-full h-10 rounded-md border-2 border-primary-orange hover:border-primary-thinOrange focus:outline-primary-brown"
            />
            <label htmlFor="image">
              <div className="w-32 h-32 rounded-full border-2 cursor-pointer">
                {petImagePreview ? (
                  <img
                    src={petImagePreview}
                    className="rounded-full h-32 w-full object-cover"
                  />
                ) : (
                  <GiHollowCat size={64} className="m-auto h-32 text-center" />
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
            <button
              onClick={addImage}
              disabled={!petName || !petImage}
              className="mt-4 mb-8 w-full h-12 text-2xl disabled:bg-slate-300 hover:text-white bg-primary-thinOrange hover:bg-primary-orange rounded-3xl shadow-lg"
            >
              作成
            </button>
          </div>
        </div>

        <div className="m-auto">
          <div>
            <div className="flex justify-center pt-3 mb-3 text-3xl underline">
              New Family
            </div>
          </div>
          <div className="text-center">
            <div className="grid grid-cols-2 gap-y-5 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {petProfile.map((post) => (
                <div className="p-4 w-40 text-center bg-green-800 rounded-lg shadow-xl">
                  <div className="flex justify-center ">
                    <img
                      src={post.petImage}
                      alt="ペットの画像"
                      className="rounded-full h-32 w-full object-cover"
                    />
                  </div>
                  <div className="py-2 text-white">{post.petName}</div>
                  <button className="text-orange-600">Tap</button>
                  <br />
                  <button
                    onClick={(e) => deleteDoc(doc(db, "petProfile", post.id))}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
            <div className="m-4">
              <Link href="/album">
                <a className="text-3xl text-orange-500">もっと見る</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="m-auto">
          <div>
            <div className="flex justify-center pt-3 mb-3 text-3xl underline">
              New Album
            </div>
          </div>
          <div className="text-center">
            <div className="m-4">
              <Link href="/album">
                <a className="text-3xl text-orange-500">もっと見る</a>
              </Link>
            </div>
          </div>
        </div>

        {/* <div>
          <div className="flex justify-center pt-3 my-3 text-3xl underline">
            New Photo
          </div>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-y-5 md:gap-5 lg:grid-cols-3 lg:gap-5">
              <div className="w-96 h-32 bg-green-800 rounded-lg">
                <div className="flex bg-sky-200">
                  <Image
                    className="bg-slate-400 object-none"
                    src="/images/onigiri.jpg"
                    width={100}
                    height={100}
                    alt="pet"
                  />
                  <div className="mx-auto">
                    <div className="text-white bg-slate-400">蘭太郎</div>
                    <p className="pl-3 w-60 h-8 bg-white">おにぎりちゃん</p>
                  </div>
                </div>
                <div className="text-center bg-blue-400">
                  <button className="text-orange-500 bg-green-300 ">Tap</button>
                </div>
              </div>
              <div className="w-96 h-32 bg-green-800 rounded-lg">
                <div className="flex bg-sky-200">
                  <Image
                    className="bg-slate-400 object-none"
                    src="/images/onigiri.jpg"
                    width={100}
                    height={100}
                    alt="pet"
                  />
                  <div className="mx-auto">
                    <div className="text-white bg-slate-400">蘭太郎</div>
                    <p className="pl-3 w-60 h-8 bg-white">おにぎりちゃん</p>
                  </div>
                </div>
                <div className="text-center bg-blue-400">
                  <button className="text-orange-500 bg-green-300 ">Tap</button>
                </div>
              </div>
            </div>

            <div className="bg-green-800 w-96">
              <div className="flex">
                <div>
                  <Image
                    src="/images/onigiri.jpg"
                    alt="pet"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div className="flex">
                  <p className="text-white px-2">Name</p>
                  <p className="text-white">time</p>
                </div>
                <div>
                  <Image
                    className="bg-slate-400 object-none"
                    src="/images/onigiri.jpg"
                    width={200}
                    height={200}
                    alt="pet"
                  />
                </div>
              </div>
              <div className="flex"></div>
            </div>

            <div>
              <div className="flex">
                <div>
                  <Image
                    src="/images/rantarou.jpg"
                    width={80}
                    height={80}
                    alt="pet"
                    className="rounded-full"
                  />
                </div>
                <div className="flex">
                  <p>name</p>
                  <p>time</p>
                </div>
                <div></div>
              </div>
              <div className="">
                <Image
                  src="/images/rantarou.jpg"
                  width={200}
                  height={200}
                  alt="pet"
                />
              </div>
            </div>
          </div>
        </div> */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
