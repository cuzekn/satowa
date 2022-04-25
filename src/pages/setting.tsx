import React from "react";
import { deleteUser, signOut } from "firebase/auth";

import { Header } from "src/components/Layout/Header";
import { auth } from "src/firebase/firebaseConfig";
import { useRouter } from "next/router";
import Link from "next/link";

const setting = () => {
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <>
      <Header title="設定">setting</Header>
      <button
        className="bg-primary-green text-white p-3 rounded-lg mx-20 my-5"
        onClick={() => {
          signOut(auth), router.push("/home");
        }}
      >
        Logout
      </button>
      <br />
      <button
        className="bg-primary-green text-white p-3 rounded-lg mx-20"
        onClick={() => {
          deleteUser(user!), router.push("/home");
        }}
      >
        退会
      </button>
      <br />
      <Link href="/addpet">
        <a>
          ペットの登録
        </a>
      </Link>
    </>
  );
};

export default setting;
