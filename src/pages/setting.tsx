import React from "react";
import { deleteUser, signOut } from "firebase/auth";

import { Header } from "src/components/Layout/Header";
import { auth } from "src/firebase/firebaseConfig";

const setting = () => {
  const user = auth.currentUser;
  return (
    <>
      <Header title="設定">setting</Header>
      <button className="bg-primary-green text-white p-3 rounded-lg mx-20 my-5" onClick={() => signOut(auth)}>Logout</button>
      <br />
      <button className="bg-primary-green text-white p-3 rounded-lg mx-20" onClick={() =>deleteUser(user!)}>退会</button>
    </>
  );
};

export default setting;
