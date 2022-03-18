import React from "react";
import { signOut } from "firebase/auth";

import { Header } from "src/components/Layout/Header";
import { auth } from "src/firebase/firebase";

const setting = () => {
  return (
    <>
      <Header title="設定">setting</Header>
      <button onClick={() => signOut(auth)}>Logout</button>
    </>
  );
};

export default setting;
