import Head from "next/head";
import Link from "next/link";
import { VFC } from "react";

type Props = {
  children: any;
  title?: string;
};

export const Header: VFC<Props> = ({ children, title = "HP by Nextjs" }) => {
  return (
    <div className="flex flex-col items-center text-sm text-green-900">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="w-screen bg-green-900">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  satoWa
                </a>
              </Link>
              <Link href="/about">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  About
                </a>
              </Link>
              <Link href="/profile">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  Profile
                </a>
              </Link>
              <Link href="/album">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  Album
                </a>
              </Link>
              <Link href="/login">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a className="py-2 px-3 text-orange-500 hover:bg-green-800 rounded">
                  Signup
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* <main className="flex flex-1 justify-center items-center flex-col w-screen bg-orange-100">
        {children}
      </main> */}
    </div>
  );
};
