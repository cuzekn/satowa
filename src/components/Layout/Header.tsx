import Head from "next/head";
import Link from "next/link";
import { ReactNode, VFC } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Divider, Menu } from "@mantine/core";

import { auth } from "src/firebase/firebaseConfig";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Header: VFC<Props> = ({ children, title = "HP by Nextjs" }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex items-center w-screen bg-primary-darkGreen ">
        <Link href="/home">
          <a className="py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded">
            satoWa
          </a>
        </Link>
        <nav className="ml-auto mr-6">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4 ">
              <Link href="/about">
                <a className="hidden py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded sm:block">
                  About
                </a>
              </Link>
              <Link href="/profile">
                <a className="hidden py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded sm:block">
                  Profile
                </a>
              </Link>
              <Link href="/album">
                <a className="hidden py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded sm:block">
                  Album
                </a>
              </Link>
              <Link href="/album">
                <a className="hidden py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded sm:block">
                  <CameraIcon className="w-5 h-5" />
                </a>
              </Link>
              {user ? (
                <div>
                  <Link href="/setting">
                    <a>
                      <Avatar radius="xl" alt="user icon" />
                      {/* auth.currentUser?.photoURL! */}
                    </a>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <a className="hidden py-2 px-3 text-xl text-primary-orange hover:bg-primary-green rounded sm:block">
                      Login
                    </a>
                  </Link>
                </>
              )}
              <Menu className="mx-5 p-1 bg-white rounded-full sm:hidden">
                <Menu.Item component="a" href="/about">
                  About
                </Menu.Item>
                <Menu.Item component="a" href="/profile">
                  Profile
                </Menu.Item>
                <Menu.Item component="a" href="/album">
                  Album
                </Menu.Item>
                <Menu.Item component="a" href="/login">
                  Login
                </Menu.Item>
                <Menu.Item component="a" href="/signup">
                  Signup
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
    </>
  );
};
