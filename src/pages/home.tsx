import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

import { Footer } from "src/components/Layout/Footer";
import { Header } from "src/components/Layout/Header";
import { db, storage } from "src/firebase/firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

// export type Pet = {
//   id: string;
//   petimage: string;
//   petname: string;
//   userName: string;
// };

// export async function getPets(): Promise<Pet[]> {
//   const pets = new Array<Pet>();
//   const petsSnapshot = await getDocs(collection(db, "/pets"));
//   const listRef = ref(storage, "images/");

//   petsSnapshot.forEach((doc) => {
//     const pet = doc.data() as Pet;
//     pets.push({ ...pet, id: doc.id });
//   });

//   listAll(listRef)
//     .then((res) => {
//       res.items.forEach((itemRef) => {
//         const starsRef = ref(storage, itemRef.fullPath);
//         getDownloadURL(starsRef).then((url) => {
//           pets.forEach((pet) => {
//             if (pet.petimage === itemRef.name) {
//               pet.petimage = url;
//             }
//           });
//         });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return pets;
// }

// export type UsePetsOutput = {
//   isLoading: boolean;
//   pets: Pet[];
// };

// const DEFAULT_OUTPUT: UsePetsOutput = {
//   isLoading: true,
//   pets: [],
// };

// export function usePets(): UsePetsOutput {
//   const [output, setOutput] = useState(DEFAULT_OUTPUT);

//   useEffect(() => {
//     void (async () => {
//       const pets = await getPets();
//       setOutput({ isLoading: false, pets });
//     })();
//   }, []);

//   return output;
// }

// export async function getPets(): Promise<Pet[]> {
//   const pets = new Array<Pet>();
//   const petsSnapshot = await getDocs(collection(db, "/pets"));
//   const listRef = ref(storage, "images/");

//   petsSnapshot.forEach((doc) => {
//     const pet = doc.data() as Pet;
//     pets.push({ ...pet, id: doc.id});
//     console.log(pet.petname);
//   });

//   listAll(listRef)
//     .then((res) => {
//       res.items.forEach((itemRef) => {
//         const starsRef = ref(storage, itemRef.fullPath);
//         getDownloadURL(starsRef).then((url) => {
//           pets.forEach((pet) => {
//             if (pet.petimage === itemRef.name) {
//               pet.petimage = url;
//             }
//           });
//         });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return pets;

// }

const Home = () => {
  const [fromId, setFromId] = useState("");
  const [petName, setPetName] = useState<string[]>();
  const [petImage, setPetImage] = useState<string[]>();

  // const listpet = () => {
  //   const listRef = ref(storage, "images/");
  //   listAll(listRef)
  //     .then((res) => {
  //       res.items.forEach((itemRef) => {
  //         const starsRef = ref(storage, itemRef.fullPath);
  //         getDownloadURL(starsRef)
  //           .then((url) => {
  //             if (petImage === undefined) {
  //               setPetImage([url]);
  //             } else {
  //               setPetImage([...petImage, url]);
  //             }
  //           })
  //           .catch((error) => {
  //             <p>画像がありません</p>;
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   const petAll = async () => {
  //     const q = query(collection(db, "pets"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, " => ", doc.data());
  //       console.log(doc.data().petname);
  //       setPetName(doc.data().petname);
  //     });

  //     const listRef = ref(storage, "images/");
  //     listAll(listRef)
  //       .then((res) => {
  //         res.items.forEach((itemRef) => {
  //           const starsRef = ref(storage, `images/${itemRef.name}`);
  //           getDownloadURL(starsRef)
  //             .then((url) => {
  //               console.log(url);
  //               setPetImage(url);
  //             })
  //             .catch((error) => {
  //               <p>画像がありません</p>;
  //             });
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   return petAll();
  // }, []);

  // const { isLoading, pets } = usePets();
  // if (isLoading) return <p>Loading...</p>;

  // const fetch = async () => {
  //   const docRef = await addDoc(collection(db, "cities"), {
  //     name: "Tokyo",
  //     country: "Japan",
  //   });
  //   console.log("Document written with ID: ", docRef.id, docRef);
  //   setFromId(docRef.id);
  // };

  const [pets, setPets] = useState([
    {
      id: "",
      petname: "",
      petImage: "",
    },
  ]);

  const onquery = async () => {
    const q = query(collection(db, "pets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setPets([
        ...pets,
        {
          id: doc.id,
          petname: doc.data().petname,
          petImage: doc.data().petimage,
        },
      ]);
    });

    // const listRef = ref(storage, "images/");
    // listAll(listRef)
    //   .then((res) => {
    //     res.items.forEach((itemRef) => {
    //       const starsRef = ref(storage, `images/${itemRef.name}`);
    //       getDownloadURL(starsRef)
    //       .then((url) => {
    //         console.log(url);
    //         const newPets = [...pets];
    //         console.log(newPets);
    //       })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
        {/* <div className="flex justify-items-center lg:mx-auto">
          <div className="lg:mx-auto">
            <Image
              src="/images/dog.jpg"
              alt="Picture of the author"
              width={1440}
              height={500}
              objectFit="contain"
            />
          </div>
        </div> */}
        <button onClick={onquery}>petname</button>
        {pets.map((post) => (
          <ul>
            <li
              key={post.id}
              className="grid grid-cols-2 gap-y-5 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
            >
              <div className="p-4 w-40 mx-10 my-3 text-center bg-green-800 rounded-lg shadow-xl">
                <div className="bg-white h-32 w-32 rounded-full">
                  {/* <img src={post.petImage} className="h-32 w-32 rounded-full" /> */}
                </div>
                <div className="py-2 text-white">{post.petname}</div>
                <button className="text-orange-600">Tap</button>
              </div>
              {console.log(post.petname)}
            </li>
          </ul>
        ))}

        <div className="m-auto">
          <div>
            <div className="flex justify-center pt-3 mb-3 text-3xl underline">
              New Family
            </div>
          </div>
          <div className="text-center">
            {}
            <div className="grid grid-cols-2 gap-y-5 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {/* <div className="p-4 w-40 mx-10 my-3 text-center bg-green-800 rounded-lg shadow-xl">
                <div className="bg-white h-32 w-32 rounded-full">
                  <img src={petImage} className="h-32 w-32 rounded-full" />
                </div>
                <div className="py-2 text-white">{petName}</div>
                <button className="text-orange-600">Tap</button>
              </div> */}
              {/* {pets.map((pet) => (
                <div
                  className="p-4 w-40 mx-10 my-3 text-center bg-green-800 rounded-lg shadow-xl"
                  key={pet.id}
                >
                  <div className="bg-white h-32 w-32 rounded-full">
                    <img src={pet.petimage} className="h-32 w-32 rounded-full" />
                  </div>
                  <div className="py-2 text-white" key={pet.id}>
                    {pet.petname}
                  </div>
                  <button className="text-orange-600">Tap</button>
                </div>
              ))} */}
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
            <div className="grid grid-cols-2 gap-y-5 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"></div>
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
