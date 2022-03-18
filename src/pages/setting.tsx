import React from "react";
import { Header } from "src/components/Layout/Header";
import { auth } from "src/firebase/firebase";

const setting = () => {
  return (
    <>
      <Header title="設定">setting</Header>
      <button onClick={() => auth.signOut()}>Logout</button>
    </>
  );
};

export default setting;
