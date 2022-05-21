import Head from "next/head";
import Link from "next/link";
import { ReactNode, VFC } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Divider, Menu } from "@mantine/core";

import { auth } from "src/firebase/firebaseConfig";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Header: VFC<Props> = ({ children, title = "HP by Nextjs" }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = () => {
    auth.signOut();
    router.push("/home");
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex w-screen items-center bg-primary-darkGreen ">
        <Link href="/home">
          <a className="rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green">
            satoWa
          </a>
        </Link>
        <nav className="ml-auto mr-6">
          <div className="flex h-14 items-center pl-8">
            <div className="flex space-x-4 ">
              <Link href="/about">
                <a className="hidden rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green sm:block">
                  About
                </a>
              </Link>
              <Link href="/profile">
                <a className="hidden rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green sm:block">
                  Profile
                </a>
              </Link>
              <Link href="/album">
                <a className="hidden rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green sm:block">
                  Album
                </a>
              </Link>
              <Link href="/album">
                <a className="hidden rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green sm:block">
                  <CameraIcon className="h-5 w-5" />
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
                    <a className="hidden rounded py-2 px-3 text-xl text-primary-orange hover:bg-primary-green sm:block">
                      Login
                    </a>
                  </Link>
                </>
              )}
              <Menu className="mx-5 rounded-full bg-white p-1 sm:hidden">
                <Menu.Item component="a" href="/about">
                  About
                </Menu.Item>
                <Menu.Item component="a" href="/profile">
                  Profile
                </Menu.Item>
                <Menu.Item component="a" href="/album">
                  Album
                </Menu.Item>
                {user ? (
                  <Menu.Item onClick={logout}>Logout</Menu.Item>
                ) : (
                  <>
                    <Menu.Item component="a" href="/login">
                      Login
                    </Menu.Item>
                    <Menu.Item component="a" href="/signup">
                      Signup
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
};
