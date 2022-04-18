import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { Header } from "src/components/Layout/Header";
import { auth, provider } from "src/firebase/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { Divider } from "@mantine/core";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      alert("ログインしました");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.push("/home");
      }
    });
  }, []);

  return (
    <>
      <Header title="Signup">
        <div className="flex fixed top-0 right-0 justify-center items-center p-3 m-8 w-6 h-6 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-praitext-primary-orange lg:bg-green-500 xl:bg-blue-500">
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

        <div className="lg:max-w-5xl mx-auto lg:flex my-28 lg:my-28 drop-shadow-xl ">
          <div className="mx-auto max-w-sm bg-white rounded-3xl lg:rounded-r-none sm:max-w-md md:max-w-lg lg:w-1/2">
            <h1 className="pt-7 text-4xl text-center text-primary-orange font-bold">
              LogIn
            </h1>
            <div className="mx-8">
              <form className="pt-8" onSubmit={onLogin}>
                <p className="my-5 text-2xl">メールアドレス</p>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-md border-2 border-primary-orange hover:border-primary-thinOrange focus:outline-primary-brown px-2"
                />
                <p className="my-5 text-2xl">パスワード</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 rounded-md border-2 border-primary-orange hover:border-primary-thinOrange focus:outline-primary-brown px-2"
                />
                <button
                  onSubmit={onLogin}
                  className="my-7 w-full h-12 text-2xl text-primary-orange bg-teal-600 hover:bg-primary-green rounded-3xl shadow-lg"
                >
                  ログイン
                </button>
                <button
                  className="my-7 w-full h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl shadow-lg"
                  onClick={signInGoogle}
                >
                  Googleでログイン
                </button>
                <button className="mb-7 w-full h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl shadow-lg">
                  Twitterでログイン
                </button>
              </form>
              <Divider my="xs" size={3} className="lg:hidden" />
              <Link href="/signup">
                <button className="mb-8 mt-4 w-full h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl shadow-lg lg:hidden ">
                  新規登録
                </button>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-sm lg:bg-primary-green rounded-r-3xl sm:max-w-md md:max-w-lg lg:w-1/2 ">
            <div className="lg:my-64">
              <p className="text-primary-orange text-4xl font-bold hidden lg:block text-center ">
                SignUp
              </p>
              <Link href="/signup">
                <button className="my-7 mx-auto w-96 h-12 text-2xl bg-primary-thinOrange hover:bg-primary-orange hover:text-white rounded-3xl hidden lg:block shadow-lg ">
                  新規登録
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Login;
