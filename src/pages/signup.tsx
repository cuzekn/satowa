import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Divider } from "@mantine/core";

import { Header } from "src/components/Layout/Header";
import { auth, db, provider } from "src/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = auth.currentUser;

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log(uid);
          } else {
            console.log("user is null");
          }
        })
      )
      .catch((err) => alert(err.message));
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (authUser.user) {
        await updateProfile(authUser.user, {
          displayName: username,
          photoURL: "",
        });
        await setDoc(doc(db, `users/${authUser.user.uid}`), {
          uid: authUser.user.uid,
          username: username,
          email: email,
          photoURL: "",
        });
        console.log(authUser.user);
      }
    } catch (error) {
      alert("登録失敗");
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.push("/home");
      }
    });
  }, [signUp, signInGoogle]);

  return (
    <>
      <Header title="Signup">
        <div className="md:bg-praitext-primary-orange fixed top-0 right-0 m-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 p-3 font-mono text-xs text-white sm:bg-pink-500 lg:bg-green-500 xl:bg-blue-500">
          <div className="block  sm:hidden md:hidden lg:hidden xl:hidden">
            al
          </div>
          <div className="hidden sm:block  md:hidden lg:hidden xl:hidden">
            sm
          </div>
          <div className="hidden sm:hidden md:block  lg:hidden xl:hidden">
            md
          </div>
          <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">
            lg
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block">
            xl
          </div>
        </div>

        <div className="mx-auto my-28 drop-shadow-xl lg:my-28 lg:flex lg:max-w-5xl ">
          <div className="mx-auto max-w-sm rounded-l-3xl sm:max-w-md md:max-w-lg lg:w-1/2 lg:bg-primary-green ">
            <div className="lg:my-64">
              <p className="hidden text-center text-4xl font-bold text-primary-orange lg:block ">
                Login
              </p>
              <Link href="/login">
                <button className="my-7 mx-auto hidden h-12 w-96 rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white lg:block ">
                  ログイン
                </button>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-sm rounded-3xl bg-white sm:max-w-md md:max-w-lg lg:w-1/2 lg:rounded-l-none">
            <h1 className="pt-7 text-center text-4xl font-bold text-primary-orange">

              SignUp
            </h1>
            <div className="mx-8">
              <form className="pt-8" onSubmit={signUp}>
                <p className="my-5 text-2xl">ユーザー名</p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-10 w-full rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-orange"
                />
                <p className="my-5 text-2xl">メールアドレス</p>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
                />
                <p className="my-5 text-2xl">パスワード</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-brown"
                />
                <button
                  onSubmit={signUp}
                  className="my-7 h-12 w-full rounded-3xl bg-teal-600 text-2xl text-primary-orange shadow-lg hover:bg-primary-green"
                >
                  新規登録
                </button>
                <button
                  className="my-7 h-12 w-full rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white"
                  onClick={signInGoogle}
                >
                  Googleで登録
                </button>
                <button className="mb-7 h-12 w-full rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white">
                  Twitterで登録
                </button>
              </form>
              <Divider my="xs" size={3} className="lg:hidden" />
              <Link href="/login">
                <button className="mb-8 mt-4 h-12 w-full rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white lg:hidden ">

                  ログイン
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Signup;
