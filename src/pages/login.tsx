import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "src/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Header } from "src/components/Layout/Header";

const login = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Login">login</Header>
        <div className="fixed top-0 right-0 m-8 p-3 text-xs font-mono text-white h-6 w-6 rounded-full flex items-center justify-center bg-gray-700 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500">
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
        <main>
          <div className="w-96 mx-auto">
            <div className="text-5xl text-orange-500 text-center py-7">
              LOGIN
            </div>
            <form action="">
              <p className="text-2xl">メールアドレス</p>
              <input type="text" className="my-5 h-12 w-80 rounded-md" />
              <p className="text-2xl">パスワード</p>
              <input type="password" className="my-5 h-12 w-80 rounded-md" />
            </form>
            <div className="bg-white w-80 h-12 ">
              {user ? (
                <>                  
                  <button onClick={() => auth.signOut()}>
                    <p>Googleからログアウトする</p>
                  </button>
                </>
              ) : (
                <button onClick={signInWithGoogle}>
                  <p className="text-2xl ">Googleでログインする</p>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default login;
