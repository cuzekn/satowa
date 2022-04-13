import React from "react";
import { deleteUser, signOut } from "firebase/auth";

import { Header } from "src/components/Layout/Header";
import { auth } from "src/firebase/firebaseConfig";

const setting = () => {
  const user = auth.currentUser;
  return (
    <>
      <Header title="設定">setting</Header>
      <button onClick={() => signOut(auth)}>Logout</button>
      <br />
      <button onClick={() =>deleteUser(user!)}>退会</button>
    </>
  );
};

export default setting;
