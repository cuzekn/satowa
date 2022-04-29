import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Avatar } from "@mantine/core";
import { Modal } from "@mantine/core";

import { Header } from "src/components/Layout/Header";
import { auth, storage } from "src/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const setting: FC = () => {
  const user = auth.currentUser;
  const router = useRouter();
  const [username, setUsername] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [userImage, setUserImage] = useState<string | undefined>("");
  const [updataUsername, setUpdataUsername] = useState("");
  const [updataUserImage, setUpdataUserImage] = useState<File | undefined>(undefined);
  const [opened, setOpened] = useState(false);

  // const getUser = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user != null) {
  //       const displayName = user.displayName;
  //       const email = user.email;
  //       const photoURL = user.photoURL;
  //       const emailVerified = user.emailVerified;
  //       const uid = user.uid;
  //     }
  //   })
  // }

  const getUser = () => {
    const user = auth.currentUser;
    if (user != null) {
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    } else {
      console.log("No user is signed in.");
    }
  };

  const editName = async () => {
    updateProfile(auth.currentUser!, {
      displayName: updataUsername,
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const editImage = async () => {
    let url = "";
    if (updataUserImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + updataUserImage.name;
      await uploadBytes(ref(storage, `userProfile/${fileName}`), updataUserImage);
      url = await getDownloadURL(ref(storage, `userProfile/${fileName}`));
      updateProfile(auth.currentUser!, {
        photoURL: url,
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(url);
  };

  const onChangeImageHandler = async (e:any) => {
    console.log(e.target.files[0]);
    setUpdataUserImage(e.target.files[0]);
  };

  useEffect(() => {
    if (user != null) {
      user.providerData.forEach((profile) => {
        setUsername(profile.displayName);
        setEmail(profile.email);
        setUserImage(profile.photoURL!);
      });
    } else {
      console.log("No user is signed in.");
    }
  }, []);

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
      <ul>
        <li>
          <button onClick={getUser}>getUser</button>
        </li>
        <li>ユーザー名</li>
        <li className="bg-white">
          {username} <button onClick={() => setOpened(true)}>編集</button>
        </li>
        <li>メールアドレス</li>
        <li className="bg-white">{email}</li>
        <li>アイコン</li>
        <li>
          {user ? (
            <img src={userImage} alt="user icon" height={128} width={128} />
          ) : (
            <Avatar radius="xl" alt="user icon" />
          )}
        </li>
      </ul>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <div>
          <ul>
            <li>変更後の名前</li>
            <li>
              <input
                type="text"
                onChange={(e) => setUpdataUsername(e.target.value)}
              />
            </li>
            <li>変更後のアイコン</li>
            <li>
              <input type="File" onChange={onChangeImageHandler} />
            </li>
            <button onClick={editName}>名前の変更</button>
            <button onClick={editImage}>画像の変更</button>
          </ul>
        </div>
      </Modal>

    </>
  );
};

export default setting;
