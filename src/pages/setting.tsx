import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Avatar, Divider } from "@mantine/core";
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
  const [updataUserImage, setUpdataUserImage] = useState<File | undefined>(
    undefined
  );
  const [petImagePreview, setPetImagePreview] = useState<string | undefined>(
    ""
  );
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
    setOpened(false);
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
      await uploadBytes(
        ref(storage, `userProfile/${fileName}`),
        updataUserImage
      );
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
    setOpened(false);
  };

  const onChangeImageHandler = async (e: any) => {
    console.log(e.target.files[0]);
    setUpdataUserImage(e.target.files[0]);
    setPetImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const user = auth.currentUser;
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
      <Header title="設定">
        <div className="w-full">
          <h1 className="m-3 text-center text-xl">ユーザー情報</h1>
          <div className="m-5 mx-auto w-80 rounded-xl bg-white p-5 text-center">
            <button
              onClick={() => setOpened(true)}
              className="rounded-3xl py-1 px-3"
            >
              プロフィールを編集
            </button>
            <Divider my="md" className="mx-3 text-primary-brown" />
            <Link href="/addpet">
              <a>ペットを登録・編集</a>
            </Link>
            <Divider my="md" className="mx-3 text-primary-brown" />
            <button
              onClick={() => {
                signOut(auth), router.push("/home");
              }}
            >
              ログアウト
            </button>
            <Divider my="md" className="mx-3 text-primary-brown" />
            <button
              onClick={() => {
                deleteUser(user!), router.push("/home");
              }}
            >
              退会
            </button>
            <Divider my="md" className="mx-3 text-primary-brown" />
            <dl>
              <dt>
                <button onClick={getUser}>getUser</button>
              </dt>
              <dt>ユーザー名</dt>
              <dd className="bg-white">{username}</dd>
              <dt>メールアドレス</dt>
              <dd className="bg-white">{email}</dd>
              <dt>アイコン</dt>
              <dd>
                {user ? (
                  <img
                    src={userImage}
                    alt="user icon"
                    height={128}
                    width={128}
                    className="rounded-full"
                  />
                ) : (
                  <Avatar radius="xl" alt="user icon" />
                )}
              </dd>
            </dl>

            <br />
          </div>
        </div>

        <Modal centered opened={opened} onClose={() => setOpened(false)}>
          <div>
            <h1 className="text-xl ">プロフィールを編集</h1>
            <ul>
              <li>変更後の名前</li>
              <li>
                <input
                  type="text"
                  onChange={(e) => setUpdataUsername(e.target.value)}
                  className="h-10 w-full rounded-md border-2 border-primary-orange px-2 hover:border-primary-thinOrange focus:outline-primary-orange"
                />
              </li>
              <button
                onClick={editName}
                className="my-7 h-12 w-full rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white"
              >
                名前の変更
              </button>
              <li>変更後のアイコン</li>
              <li>
                <label htmlFor="image">
                  <div className="h-32 w-32 cursor-pointer rounded-full border-2">
                    {user ? (
                      <img
                        src={petImagePreview}
                        alt="user icon"
                        height={128}
                        width={128}
                        className="rounded-full"
                      />
                    ) : (
                      <img
                        src={userImage}
                        alt="user icon"
                        height={128}
                        width={128}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <input
                    id="image"
                    type="File"
                    onChange={onChangeImageHandler}
                    className="hidden"
                  />
                </label>
              </li>
              <button
                onClick={editImage}
                className="my-7 h-12 w-full rounded-3xl bg-primary-thinOrange text-2xl shadow-lg hover:bg-primary-orange hover:text-white"
              >
                画像の変更
              </button>
            </ul>
          </div>
        </Modal>
      </Header>
    </>
  );
};

export default setting;
